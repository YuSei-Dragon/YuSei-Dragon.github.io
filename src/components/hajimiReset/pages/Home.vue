<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeMount,
  nextTick,
  watch,
  reactive,
  provide,
} from 'vue'
import basicSetting from '../basicSetting.js'
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()

let handelTip = null

onBeforeMount(() => {
    console.log("Home created")
    store.commit("hajimiReset/setAllMes",basicSetting.getBasicSetting())
    //初始化allMes
})

const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    allMes.value = store.state.hajimiReset.allMes
  //把数据本地化，方便后续使用
  if(store.state.hajimiReset.allMes?.playerMes){
    haveLogin.value = true
  }//如果有登陆数据，就改变状态
}, {deep: true})

onMounted(() => {
    startTipTimer()
    //初始化提示文字
})

const hajimiTipList = ref([])
watch(() =>store.state.hajimiReset.tipList, (newVal, oldVal) => {
  if(newVal.length>0){
    hajimiTipList.value = newVal
  }//如果提示列表有值，就赋值给hajimiTipList
}, {deep: true})

watch(hajimiTipList, (newVal, oldVal) => {
  // console.log("提示列表改变")
  startTipTimer()
  if(hajimiTipList.value.length===0){
    store.commit("hajimiReset/setTipList",[])
  }
  },
  { deep: true } )

// 创建一个统一的定时器函数
const startTipTimer = () => {
  // 清除之前的定时器
  if (handelTip) {
    clearInterval(handelTip)
  }
  
  // 如果还有提示，设置新的定时器
  if (hajimiTipList.value.length > 0) {
    // console.log("启动一个新的定时器")
    handelTip = setInterval(() => {
      if (hajimiTipList.value.length > 0) {
        hajimiTipList.value.shift()
      } else {
        clearInterval(handelTip)
      }
    }, 2000)
  }
}

const haveLogin = ref(false)
</script>

<template lang="pug">
.all-block
    .hajimi-block
        .hajimi-tip(v-if="hajimiTipList.length>0")
            .hajimi-tip-item(v-for="tip in hajimiTipList" :key="tip") {{tip}}
        // 使用router-view显示当前路由对应的组件
        router-view
</template>

<style scoped lang="scss">
.all-block{
    width: 100wh;
    height: 100vh;
    position: relative;
    background: #222;
    .hajimi-block{
        position: absolute;
        bottom: 0;
        left: 0;
        width:600px;
        height: 400px;
        background-color: #111;
    }
    .hajimi-tip{
        position: absolute;
        top: 10px;
        left: 110px;
        width: 380px;
        z-index: 100;
        background-color: #222;
        .hajimi-tip-item{
            min-width: 300px;
            font-size: 12px;
            text-align: center;
            margin: 0 auto;
            color: #eee;
            padding: 5px 10px;
            border-radius: 4px;
            position: relative;
            overflow: hidden;
            animation: shimmer 2s infinite;
            
        }
    }
}
// 高光闪烁动画关键帧
@keyframes shimmer {
    0% {
        color: #eee;
        opacity: 0.2;
    }
    30% {
        color: #999;
        opacity: 1;
    }
    50% {
        color: #999;
        opacity: 1;
    }
    80% {
        color: #999;
        opacity: 1;
    }
    100% {
        color: #eee;
        opacity: 0;
    }
}
</style>