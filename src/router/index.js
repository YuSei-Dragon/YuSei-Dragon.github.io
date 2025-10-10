import { createRouter, createWebHistory } from 'vue-router'
 
const routes = [
    // Home是父级
    {
        path: '/fish',
        name: 'Home',
        component: () => import('@/components/fishing/Index'),
        // about是子级
        children: [
            // {
 
            //     path: 'about',
            //     name: 'about',
            //     component: () => import('../views/about.vue'),
            // }
        ]
    },
    {
        path: '/desk',
        component: () => import('@/components/desk')
    },
    {
        path: '/testBlock',
        component: () => import('@/components/testBlock')
    },
    {
        path: "/without",
        component: () => import('@/components/withoutStop/index')
    },
    {
        path: "/city",
        component: () => import('@/components/city/index')
    },
    {
        path: "/bullfight",
        component: () => import('@/components/bullfight/pages/Home'),
    },
    {
        path: "/hajimi",
        component: () => import('@/components/hajimi/pages/Home'),
    }
]
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router