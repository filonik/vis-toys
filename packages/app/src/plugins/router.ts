import { createRouter, createWebHashHistory } from 'vue-router'

//import EditorView from '../views/EditorView.vue'
//import CanvasView from '../views/CanvasView.vue'
import BasicMeshView from '../views/BasicMeshView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BasicMeshView
    },
    {
      path: '/mesh/',
      name: 'mesh',
      component: BasicMeshView
    },
  ]
})

export default router
