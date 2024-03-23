import path from "node:path"
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

//import monacoEditorPlugin from 'vite-plugin-monaco-editor'

//TODO: Changed in Vite 5? Fix this mess?
import _monacoEditorPlugin, { type IMonacoEditorOpts } from 'vite-plugin-monaco-editor'
const monacoEditorPlugin: (opts: IMonacoEditorOpts) => Plugin = (_monacoEditorPlugin as any).default

const publicPath = "monacoeditorwork"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monacoEditorPlugin({
      publicPath,
      customDistPath(root, buildOutDir) {
        return path.join(root, buildOutDir, publicPath)
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
