import { createRouter, createWebHistory } from 'vue-router'

// 定义hajimiReset模块的所有路由
const routes = [
  {
    path: '/hajimiReset',
    name: 'HajimiReset',
    component: () => import('../pages/Home.vue'),
    children: [
      {
        path: '',
        redirect: '/hajimiReset/navigation'
      },
      {
        path: 'navigation',
        name: 'HajimiResetNavigation',
        component: () => import('../pages/Navigation.vue')
      },
      {
        path: 'fight',
        name: 'HajimiResetFight',
        component: () => import('../pages/Fight.vue')
      },
      // 将Fight的子路由提升到与Fight同级
      {
        path: 'fight/climb',
        name: 'HajimiResetFightClimb',
        component: () => import('../pages/Fight/classicalChallenge.vue')
      },
      {
        path: 'fight/worldExplore',
        name: 'HajimiResetFightWorldExplore',
        component: () => import('../pages/Fight/worldExplore.vue')
      },
      {
        path: 'fight/worldExplore/saier',
        name: 'HajimiResetFightWorldExploreSaier',
        component: () => import('../pages/Planet/saier.vue')
      },
      {
        path: 'fight/ground',
        name: 'HajimiResetFightGround',
        component: () => import('../pages/Fight/ground.vue')
      },
      {
        path: 'fight/result',
        name: 'HajimiResetFightResult',
        component: () => import('../pages/Fight/resultPage.vue')
      },
      {
        path: 'hometown',
        name: 'HajimiResetHometown',
        component: () => import('../pages/Hometown.vue')
      },
      // 将Hometown的子路由提升到与Hometown同级
      {
        path: 'hometown/monster',
        name: 'HajimiResetHometownMonster',
        component: () => import('../pages/Hometown/MonsterShow.vue')
      }
    ]
  }
]

// 创建并导出路由配置
export default routes