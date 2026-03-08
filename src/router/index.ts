import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/dnd-character-builder/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/builder',
      name: 'builder',
      component: () => import('@/views/BuilderView.vue'),
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/CharacterListView.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/PrivacyView.vue'),
    },
    {
      path: '/share/:data',
      name: 'share',
      component: () => import('@/views/ShareView.vue'),
    },
    // WSG 4.4: Setup error pages and redirection
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/HomeView.vue'),
    },
  ],
})

export default router
