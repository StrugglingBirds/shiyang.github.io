import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/document/home.vue'),
    redirect: '/document/git.md'
  },
  {
    name: 'document',
    path: '/document/:doc',
    component: () => import('../views/document/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
