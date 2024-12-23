import { createRouter, createWebHistory } from 'vue-router'
 
const routes = [
    // Home是父级
    {
        path: '/fish',
        name: 'Home',
        component: () => import('@/components/fishing/index'),
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
    }
]
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router