import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/parametric-surface/',
      name: 'parametric-surface',
      component: () => import('../views/webgpu/ParametricSurfaceView.vue')
    },
    {
      path: '/implicit-surface/',
      name: 'implicit-surface',
      component: () => import('../views/webgl/ImplicitSurfaceView.vue')
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
      path: '/shader-transform/',
      name: 'shader-transform',
      component: () => import('../views/webgl/ShaderTransformView.vue')
    },
  ]
})

export default router
