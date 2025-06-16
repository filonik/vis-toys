import { createRouter, createWebHashHistory } from 'vue-router'

import EditorView from '@/views/EditorView.vue'
//import CanvasView from '@/views/CanvasView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EditorView
    },
    {
      path: '/parametric-surface/',
      name: 'parametric-surface',
      component: () => import('../views/ParametricSurfaceView.vue')
    },
    {
      path: '/simplicial-mesh/',
      name: 'simplicial-mesh',
      component: () => import('../views/SimplicialMeshView.vue')
    },
    {
      path: '/instanced-simplicial-mesh/',
      name: 'instanced-simplicial-mesh',
      component: () => import('../views/InstancedSimplicialMeshView.vue')
    },
    {
      path: '/glsl-transform/',
      name: 'glsl-transform',
      component: () => import('../views/WebGlPlotView.vue')
    },
  ]
})

export default router
