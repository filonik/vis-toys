
export const createShader = (gl: WebGL2RenderingContext, shaderSource: string, shaderType: GLenum) => {
  const shader = gl.createShader(shaderType)

  if (!shader) {
    console.error(`Error creating shader.`)
    return null
  }

  gl.shaderSource(shader, shaderSource)

  gl.compileShader(shader)

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!compiled) {
    const lastError = gl.getShaderInfoLog(shader)
    console.error(`Error compiling shader: ${lastError}`)
    gl.deleteShader(shader)
    return null
  }

  return shader
}

export const createProgram = (gl: WebGL2RenderingContext, shaders: Array<WebGLShader | null>) => {
  const program = gl.createProgram();

  if (!program) return null
  
  shaders.forEach((shader) => {
    if (shader) {
      gl.attachShader(program, shader)
    }
  })

  gl.linkProgram(program)

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
      const lastError = gl.getProgramInfoLog(program)
      console.error(`Error in program linking: ${lastError}`)
      gl.deleteProgram(program)
      return null
  }

  return program
}
