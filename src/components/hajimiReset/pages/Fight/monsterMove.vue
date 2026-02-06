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
import standBy from '../../img/standbygif.gif'
import atk from '../../img/atk.gif'
import atkMagic from '../../img/penhuo.gif'
import effect from '../../img/dance2.gif'
import atkUp from '../../img/baimei.gif'
import miss from '../../img/打拳猫咪.gif'
import haveUsed from '../../img/xiucai.gif'
import lock from '../../img/head.jpg'

const store = useStore()
onMounted(() => {
    
})
const props = defineProps({
    status:{
        type:String,
        default:"standBy",
    },
})
const isShowMiss = ref(false)
watch(() => props.status, (newVal, oldVal) => {
    console.log("status改变了", newVal)
    moveImg.value = newVal
    if(newVal === "miss"){
        isShowMiss.value = true
    }
    if(newVal !== "standBy"){
        setTimeout(() => {
            moveImg.value = "standBy"
        }, 3000)
        setTimeout(() => {
            isShowMiss.value = false
        }, 2000)
        //自动播放3秒相应的gif
    }
}, { deep: true })
const moveImg = ref("standBy")
const getMonsterMoveStyle = () => {
    let style = {}
    let transformObj = {
        standBy: standBy,
        atk: atk,
        atkMagic: atkMagic,
        effect: effect,
        atkUp: atkUp,
        miss: miss,
        haveUsed: haveUsed,
        lock: lock,
    }
    style = {
        backgroundImage: `url(${transformObj[moveImg.value]})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    }
    return style
}
</script>

<template lang="pug">
.monster-move-block(:style="getMonsterMoveStyle()")
    .monster-miss(v-if="isShowMiss") miss
</template>
<style scoped lang="scss">
.monster-move-block{
    position: relative;
    width: 100%;
    height: 100%;
    .monster-miss{
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        height: 24px;
        line-height: 20px;
        top: 10px;
        font-size: 16px;
        background: #00abff7d;
    }
}
</style>