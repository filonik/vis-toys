import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'

import * as monaco from 'monaco-editor'

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  comments: 'ignore',
  trailingCommas: 'ignore',
})

const app = createApp(App)

app.use(router)

app.mount('#app')
