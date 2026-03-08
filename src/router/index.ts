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
      beforeEnter: (to) => {
        const data = to.params.data as string
        // Reject share URLs over 20KB to prevent DoS
        if (!data || data.length > 20_000) return { name: 'home' }
        return true
      },
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
