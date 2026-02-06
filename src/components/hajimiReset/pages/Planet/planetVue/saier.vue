<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineProps,
  inject,
  reactive
} from 'vue'
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import planetApi from '../planetApi.js'
const Planet = defineAsyncComponent(() =>
  import("../Planet.vue")
)
const router = useRouter()
const route = useRoute()
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const monsterShowList = ref([])
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    // 数据本地化，方便后续使用
})
const groundList = ref(planetApi.getGroundList("赛尔号"))
</script>

<template lang="pug">
    Planet(:groundList="groundList")
</template>
<style scoped lang="scss">
.saier-block{
    width: 100%;
    height: 100%;
    position: relative;
    padding: 50px;
    box-sizing: border-box;
    .saier-back{
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
    }
    .saier-monster-block{
        width: 500px;
        height: 300px;
        position: relative;
        .saier-monster{
            width: 30px;
            height: 30px;
            border-radius: 4px;
            position: absolute;
            background: url("../../../img/baimei.gif") no-repeat;
            background-size: 100% 100%;
            transition: 2s;
            cursor: pointer;
            .saier-monster-name{
                position: absolute;
                top: -16px;
                left: 0px;
                color: #fff;
                font-size: 10px;
            }
            .saier-monster-level{
                position: absolute;
                top: -28px;
                left: -0px;
                color: #fff;
                font-size: 10px;
            }
        } 
    }
    
    .saier-select{
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #333;
        color: #fff;
        :deep(.el-select__wrapper) {
            background-color: #333;
            color: #fff;
        }:deep(.is-focused) {
            box-shadow: 0 0 0 1px #ee33ff;
        }
    }
    
}
</style>