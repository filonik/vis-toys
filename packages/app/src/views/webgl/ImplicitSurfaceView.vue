<script setup lang="ts">
import { ref, watch } from "vue"
import { useEventListener, toReactive } from '@vueuse/core';

import PageHeader from '@/components/PageHeader.vue'
import PageMain from '@/components/PageMain.vue'
import CodeEditor from '@/components/CodemirrorEditor.vue'
import WebGlCanvas from '@/components/WebGlCanvas.vue'

import type { WebGlResource, WebGlState, UseWebGlOptions } from "@/composables/useWebGl"

import useCamera from '@/composables/useCamera'

import { mat4f } from "@/lib/tensors"

import { basicSetup } from 'codemirror'

import { StreamLanguage } from "@codemirror/language"
import { shader } from "@codemirror/legacy-modes/mode/clike"

import {createShader, createProgram} from "@/lib/graphics/glsl/utilities"
import {passthroughShader, raymarchImplicitShader, type ShaderInfo} from "@/lib/graphics/glsl/shaders/surfaces"

import { process } from '@/lib/graphics/glsl/shaders/utilities'

type WebGlStatefulResource<T> = WebGlResource & {value: T|null}

const editorConfig = {
  extensions: [basicSetup, StreamLanguage.define(shader)]
}

const DEFAULT_SOURCE = `@plot_implicit
d2e3 f(in d2e3vec3 x) {
  return sin(x[0]) + cos(x[1]) + x[2];
}
`
/*
const DEFAULT_SOURCE = `@plot_implicit
d2e3 f(in d2e3vec3 x) {
  return x[0]*x[0] + x[1]*x[1] + x[2]*x[2] - 1.;
}
`
*/
/*
const DEFAULT_SOURCE = `@plot_implicit
d2e3 f(in d2e3vec3 x) {
  float R = 2.;
  float r = 1.;
  d2e3 lhs = x[0]*x[0] + x[1]*x[1] + x[2]*x[2] + R*R -  r*r;
  d2e3 rhs = 4.*R*R * (x[0]*x[0] + x[1]* x[1]);
  return lhs*lhs - rhs;
}
`
*/
/*
const DEFAULT_SOURCE = `@plot_implicit
d2e3 f(in d2e3vec3 x) {
  float c2 = 2.;
  d2e3 f1 = pow(x[0] - c2, 2.)*pow(x[0] + c2, 2.);
  d2e3 f2 = pow(x[1] - c2, 2.)*pow(x[1] + c2, 2.);
  d2e3 f3 = pow(x[2] - c2, 2.)*pow(x[2] + c2, 2.);
  
  d2e3 f4 = 3.*(x[0]*x[0]*x[1]*x[1] + x[0]*x[0]*x[2]*x[2] + x[1]*x[1]*x[2]*x[2]);

  d2e3 f5 = 6.*(x[0]*x[1]*x[2]);
  d2e3 f6 = -10.*(x[0]*x[0] + x[1]*x[1] + x[2]*x[2]);

  return f1 + f2 + f3 + f4 + f5 + f6 + 22.;
}
`
*/

type State = {
  source: string
}

const stateRef = ref<State>({
    source: DEFAULT_SOURCE
})

const state = toReactive(stateRef)

const options: UseWebGlOptions = {
    options:{
        alpha: true,
        premultipliedAlpha: false
    },
    size: [1920, 1080],
}

const defaultShader: {
    source: {vs:string, fs:string},
    attributes: Record<string, {type:string, location: number}>
    uniforms: Record<string, {type:string, location: WebGLUniformLocation|null}>
} = {
    source: {
        vs: `#version 300 es
in vec4 aPosition;
in vec4 aColor;

uniform mat4 uView;
uniform mat4 uProjection;

out vec4 vsColor;

void main() {
    gl_Position = uProjection*(uView*aPosition).yzwx;
    vsColor = aColor;
}
`,
        fs: `#version 300 es
precision highp float;
in vec4 vsColor;
out vec4 fsColor;
void main() {
    fsColor = vsColor;
}
`,
    },
    attributes: {
        aPosition: {
            type: "vec4",
            location: -1,
        },
        aColor: {
            type: "vec4",
            location: -1,
        }
    },
    uniforms: {
        uProjection: {
            type: "mat4",
            location: null,
        },
        uView: {
            type: "mat4",
            location: null,
        }
    }
}

let shaderInfo: ShaderInfo | null = null

const uniformData = {
    data: new Float32Array([
        // projection
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1,
        // view
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1,
        // args
        0,0,0,0,
        // resolution
        options.size?.[0] ?? 0, options.size?.[1] ?? 0,
        // time
        0, 0
    ])
}

const meshData = {
    mode: 0,
    count: 6,
    attributes: {
        aPosition: {
            data: new Float32Array([
                1,1,1,0,
                1,-1,1,0,
                1,1,-1,0,
                1,-1,-1,0
            ])
        },
        aColor: {
            data: new Float32Array([
                1,1,0,1,
                0,1,0,1,
                1,0,0,1,
                0,0,0,1
            ])
        },
        aIndex: {
            data: new Int32Array([
                0,1,2,3,2,1
            ])
        }
    }
}

const program: WebGlStatefulResource<WebGLProgram> & {valid: boolean} = {
    value: null,
    valid: false,
    onCreate({context: gl}) {
        console.log("Program::onCreate")

        if (!shaderInfo) return

        program.value = createProgram(gl, [
            createShader(gl, shaderInfo.source.vs, gl.VERTEX_SHADER),
            createShader(gl, shaderInfo.source.fs, gl.FRAGMENT_SHADER),
        ])

        // TODO: Multiple states? (needsCreate/needsUpdate/error)
        program.valid = true

        if (!program.value) return

        for (let key of Object.keys(shaderInfo.attributes)) {
            shaderInfo.attributes[key].location = gl.getAttribLocation(program.value, key)
        }

        for (let key of Object.keys(shaderInfo.uniforms)) {
            shaderInfo.uniforms[key].location = gl.getUniformLocation(program.value, key)
        }

        for (let key of Object.keys(shaderInfo.uniformBlocks)) {
            shaderInfo.uniformBlocks[key].location = gl.getUniformBlockIndex(program.value, key)
        }

        program.valid = true
    },
    onUpdate(args) {
        if (!program.valid) {
            program.onDelete?.(args)
            program.onCreate?.(args)
        }
    },
    onDelete({context: gl}) {
        console.log("Program::onDelete")
        gl.deleteProgram(program.value)
        program.value = null
    }
}

const uniforms: WebGlStatefulResource<WebGLBuffer> = {
    value: null,
    onCreate({context: gl}) {
        uniforms.value = gl.createBuffer()
    },
    onUpdate({context: gl}) {
        if (!shaderInfo) return

        if(!uniforms.value) return

        gl.bindBuffer(gl.UNIFORM_BUFFER, uniforms.value)
        gl.bufferData(gl.UNIFORM_BUFFER, uniformData.data, gl.DYNAMIC_DRAW)
        gl.bindBuffer(gl.UNIFORM_BUFFER, null)

        const boundLocation = 0
        gl.bindBufferBase(gl.UNIFORM_BUFFER, boundLocation, uniforms.value)

        if (!program.value) return

        if (shaderInfo.uniformBlocks.Global.location != -1) {
            gl.uniformBlockBinding(program.value, shaderInfo.uniformBlocks.Global.location, boundLocation);
        }
    },
    onDelete({context: gl}) {
        gl.deleteBuffer(uniforms.value)
        uniforms.value = null
    }
}

//gl.uniformBlockBinding(program,, perScene.boundLocation);
//gl.uniformBlockBinding(program, gl.getUniformBlockIndex(program, "perModel"), perModel.boundLocation);


const buffers: {
    aPosition: WebGlStatefulResource<WebGLBuffer>,
    aColor: WebGlStatefulResource<WebGLBuffer>,
    aIndex: WebGlStatefulResource<WebGLBuffer>,
} = {
    aPosition: {
        value: null,
        onCreate({context: gl}) {
            buffers.aPosition.value = gl.createBuffer()
        },
        onUpdate({context: gl}) {
            if(!buffers.aPosition.value) return

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.aPosition.value)
            gl.bufferData(gl.ARRAY_BUFFER, meshData.attributes.aPosition.data, gl.STATIC_DRAW)
        },
        onDelete({context: gl}) {
            gl.deleteBuffer(buffers.aPosition.value)
            buffers.aPosition.value = null
        }
    },
    aColor: {
        value: null,
        onCreate({context: gl}) {
            buffers.aColor.value = gl.createBuffer()
        },
        onUpdate({context: gl}) {
            if(!buffers.aColor.value) return

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.aColor.value)
            gl.bufferData(gl.ARRAY_BUFFER, meshData.attributes.aColor.data, gl.STATIC_DRAW)
        },
        onDelete({context: gl}) {
            gl.deleteBuffer(buffers.aColor.value)
            buffers.aColor.value = null
        }
    },
    aIndex: {
        value: null,
        onCreate({context: gl}) {
            buffers.aIndex.value = gl.createBuffer()
        },
        onUpdate({context: gl}) {
            if(!buffers.aIndex.value) return

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.aIndex.value)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, meshData.attributes.aIndex.data, gl.STATIC_DRAW)
        },
        onDelete({context: gl}) {
            gl.deleteBuffer(buffers.aIndex.value)
            buffers.aIndex.value = null
        }
    }
}

const mesh: WebGlStatefulResource<WebGLVertexArrayObject> & {valid: boolean} = {
    value: null,
    valid: false,
    onCreate(args) {
        const { context: gl } = args

        mesh.value = gl.createVertexArray()

        buffers.aPosition.onCreate?.(args)
        buffers.aColor.onCreate?.(args)
        buffers.aIndex.onCreate?.(args)

        mesh.onUpdate?.(args)
    },
    onUpdate(args) {
        if (!shaderInfo) return

        if (!mesh.value) return 

        const { context: gl } = args

        gl.bindVertexArray(mesh.value)

        buffers.aPosition.onUpdate?.(args)

        if (shaderInfo.attributes.aPosition.location != -1) {
            gl.enableVertexAttribArray(shaderInfo.attributes.aPosition.location)
            gl.vertexAttribPointer(shaderInfo.attributes.aPosition.location, 4, gl.FLOAT, false, 0, 0)
        }

        buffers.aColor.onUpdate?.(args)

        if (shaderInfo.attributes.aColor.location != -1) {
            gl.enableVertexAttribArray(shaderInfo.attributes.aColor.location)
            gl.vertexAttribPointer(shaderInfo.attributes.aColor.location, 4, gl.FLOAT, false, 0, 0)
        }

        buffers.aIndex.onUpdate?.(args)

        mesh.valid = true
    },
    onDelete({context: gl}) {
        gl.deleteVertexArray(mesh.value)
        mesh.value = null
    }
}

const projection = mat4f.perspective(Math.PI/4, 1920/1080, 0.1, 1000.0)

const { listeners, transformInplace } = useCamera([-8, 0, 0])

const renderer: WebGlResource = {
    onCreate(args) {
        console.log("Renderer::onCreate")

        program.onCreate?.(args)
        
        uniforms.onCreate?.(args)

        mesh.onCreate?.(args)
    },
    onRender(args) {
        if (!shaderInfo) return

        const { context: gl, timestamp } = args

        program.onUpdate?.(args)

        if (!program.value) return

        transformInplace(uniformData.data.subarray(16,32))

        uniformData.data[38] = timestamp/1000.0

        uniforms.onUpdate?.(args)

        if (!uniforms.value) return
        
        gl.clearColor(0,0,0,0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.useProgram(program.value)

        gl.bindVertexArray(mesh.value)

        gl.drawElements(gl.TRIANGLES, meshData.count, gl.UNSIGNED_INT, 0)
    },
    onDelete(args) {
        console.log("Renderer::onDelete")

        mesh.onDelete?.(args)

        program.onDelete?.(args)
    }
}


type ProcessedSource = {
  source: string,
  //info: SourceInfo
}


const preprocess: (source: string) => ProcessedSource = (source) => {
  return {
    source: source.replaceAll("@plot_implicit", "/*@plot_implicit*/"),
    //info: reflect(source)
  }
}

const save = (state: State) => {
    const result = preprocess(state.source)

    result.source = process(result.source, {
        quiet: true
    })

    shaderInfo = raymarchImplicitShader(result.source)

    program.valid = false
}

const isShortcutSave: (event: KeyboardEvent) => boolean = (event) => {
  switch(event.key) {
    case "Enter":
      return event.shiftKey
    case "s":
    case "S":
      return event.ctrlKey || event.metaKey
    default:
      return false
  }
}

useEventListener(document, 'keydown', (event) => {
  if (isShortcutSave(event)) {
    event.stopPropagation()
    event.preventDefault()
    save(state)
  }
})

watch(stateRef, save, { immediate: true })
</script>

<template>
  <PageHeader title="Implicit Surface" v-model="stateRef"></PageHeader>
  <PageMain>
    <template v-slot:input>
      <CodeEditor class="h-full" v-model="state.source" :options="editorConfig"/>
    </template>
    <template v-slot:output>
      <div class="flex flex-col">
        <WebGlCanvas :renderer :listeners :options/>
      </div>
    </template>
  </PageMain>
</template>

<style scoped>
.show-focus-within {
  @apply focus-within:outline-none focus-within:ring focus-within:ring-inset focus-within:ring-border-hover;
}
</style>
