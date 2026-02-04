import { createRouter, createWebHistory } from 'vue-router'
// 导入hajimiReset的路由配置
import hajimiResetRoutes from '@/components/hajimiReset/router/index'

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
    },
    // 使用展开运算符导入hajimiReset的所有路由
    ...hajimiResetRoutes
]
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router