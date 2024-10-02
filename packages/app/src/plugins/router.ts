import { createRouter, createWebHashHistory } from 'vue-router'

//import EditorView from '@/views/EditorView.vue'
//import CanvasView from '@/views/CanvasView.vue'
//import BasicMeshView from '@/views/BasicMeshView.vue'
import SimplicialMeshView from "@/views/SimplicialMeshView.vue"
import InstancedSimplicialMeshView from "@/views/InstancedSimplicialMeshView.vue"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SimplicialMeshView
    },
    {
      path: '/simplicial-mesh/',
      name: 'simplicial-mesh',
      component: SimplicialMeshView
    },
    {
      path: '/instanced-simplicial-mesh/',
      name: 'instanced-simplicial-mesh',
      component: InstancedSimplicialMeshView
    },
  ]
})

export default router
