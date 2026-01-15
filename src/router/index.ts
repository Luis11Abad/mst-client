import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => HomeView,
            meta: {
                layout: MainLayout,
            },
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import('@/views/CalendarView.vue'),
            meta: {
                layout: MainLayout,
            },
        },
        {
            path: '/contacts',
            name: 'contacts',
            component: () => import('@/views/ContactsView.vue'),
            meta: {
                layout: MainLayout,
            },
        },
        {
            path: '/inventory',
            name: 'inventory',
            component: () => import('@/views/InventoryView.vue'),
            meta: {
                layout: MainLayout,
            },
        },
        {
            path: '/new-email',
            name: 'new-email',
            component: () => import('@/views/NewEmailLayout.vue'),
            meta: {
                layout: MainLayout,
            },
        },
        {
            path: '/promotions',
            name: 'promotions',
            component: () => import('@/views/PromotionsView.vue'),
            meta: {
                layout: MainLayout,
            },
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/Auth/LoginView.vue'),
            meta: {
                layout: AuthLayout,
            },
        },
        {
            path: '/auth/reset-password',
            name: 'reset-password',
            component: () => import('@/views/Auth/ResetPasswordView.vue'),
            meta: {
                layout: AuthLayout,
            },
        },
    ],
})

export default router
