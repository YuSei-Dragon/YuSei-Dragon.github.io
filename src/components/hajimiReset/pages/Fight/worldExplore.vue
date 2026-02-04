<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineEmits,
  defineProps,
  inject,
  reactive
} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const monsterName = ref("")
const map = ref(null)
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
})
const mapPosition = ref({ x: -300, y: -200 })
const getMapStyle = ()=>{
    return {
        top: mapPosition.value.y + "px",
        left: mapPosition.value.x + "px",
    }
}
const isDragging = ref(false)
//是否正在拖动地图
const startX = ref(0)
const startY = ref(0)
const handleMouseDown = (e) => {
    isDragging.value = true
    startX.value = e.pageX - mapPosition.value.x
    startY.value = e.pageY - mapPosition.value.y
}// 鼠标按下事件
const handleMouseMove = (e) => {
    if (!isDragging.value) return
    e.preventDefault()
    
    let newX = e.pageX - startX.value
    let newY = e.pageY - startY.value
    if(newX<-600){
        newX = -600
    }else if(newX>0){
        newX = 0
    }
    if(newY<-400){
        newY = -400
    }else if(newY>0){
        newY = 0
    }
    mapPosition.value.x = newX
    mapPosition.value.y = newY
    // 限制地图拖拽范围
    
}// 鼠标移动事件
const handleMouseUp = () => {
    isDragging.value = false
}// 鼠标释放事件
const handleMouseLeave = () => {
    isDragging.value = false
}// 鼠标离开容器事件
const getMapPosition = (x,y)=>{
    return {
        left: x + "px",
        top: y + "px",
    }
}
const handleClickStart = (name)=>{
    store.commit("hajimiReset/setAllMes", allMes.value)
    //fight/worldExplore/saier
    router.push('/hajimiReset/fight/worldExplore/saier')
}// 点击地图事件
const changePage = (title) => {
    router.push('/hajimiReset/fight')
}
</script>

<template lang="pug">
.world-explore-block
    .world-explore-back(@click="changePage()") 返回
    .world-explore-map(ref="map" :style="getMapStyle()"
        @mousedown="handleMouseDown",
        @mousemove="handleMouseMove",
        @mouseup="handleMouseUp",
        @mouseleave="handleMouseLeave")
        .world-explore-map-relative
            .world-explore-map-saier(:style="getMapPosition(500,300)" @click="handleClickStart('赛尔号')")
                .world-explore-map-name 赛尔号
</template>
<style scoped lang="scss">
.world-explore-block{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    //600*400
    .world-explore-back{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #500a92;
        border: 1px solid #ee33ff;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        z-index: 3;
    }
    .world-explore-map{
        width: 1200px;
        height: 800px;
        position: absolute;
        .world-explore-map-relative{
            width:100%;
            height:100%;
            position:relative;
            .world-explore-map-saier{
                position:absolute;
                width: 60px;
                height: 50px;
                background: url(../../img/星球.png) no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
                .world-explore-map-name{
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                    line-height: 120px;
                }
            }
        }
    }
}
</style>