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
const props = defineProps({
    life: {
        type: Number,
        default: 0
    }
})
const isShowNum = ref(false)
const lifeNum = ref(0)
const showLifeChange = (newVal, oldVal) => {
    setTimeout(() => {
        lifeNum.value = newVal-oldVal
        if(lifeNum.value>0){
            lifeNum.value = '+'+lifeNum.value
        }
        isShowNum.value = true
        setTimeout(() => {
            isShowNum.value = false
        }, 1500)
    }, 1000)
}
onMounted(() => {

})
watch(() => props.life, (newVal, oldVal) => {
    showLifeChange(newVal, oldVal)
    console.log("life数据变化")
})//监听monsterLevel变化
//全部数据通过这个检测更新
</script>

<template lang="pug">
.life-change-block(v-if="isShowNum")
    .life-change-num(:class="LifeNum>0?'life-change-num-plus':'life-change-num-minus'") {{lifeNum}}
</template>
<style scoped lang="scss">
.life-change-block{
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 10px;
    text-align: center;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #0000007b;
    line-height: 20px;
    // text-shadow: #666 1px 0 0, #666 0 1px 0, #666 -1px 0 0, #666 0 -1px 0;
    .life-change-num-plus{
        color: #33e35d;
    }
    .life-change-num-minus{
        color: #ff3333;
    }
}
</style>