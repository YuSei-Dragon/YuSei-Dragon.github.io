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
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    // console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
onMounted(() => {
    initMes()
})
const initMes = ()=>{
    allMes.value = store.state.hajimiReset.allMes
    //在watch生效前初始化
    console.log(allMes.value)
    stopList.value.forEach(item=>{
        item.num = allMes.value.playerMes.rune[item.realName]
    })
}
const stopList = ref([
    {
        name:"普通卡",
        realName:"normal",
        desc:"1倍捕捉率",
        num:0,
    },
    {
        name:"强化卡",
        realName:"fortify",
        desc:"1.5倍捕捉率",
        num:0,
    },
    {
        name:"超强化卡",
        realName:"superFortify",
        desc:"2倍捕捉率",
        num:0,
    },
    {
        name:"至尊卡",
        realName:"supreme",
        desc:"捕捉必定成功",
        num:0,
    },
    {
        name:"升级卡",
        realName:"upgrade",
        desc:"精灵直接升级一级",
        num:0,
    },
])
const emit = defineEmits([ "closeShop",])
const closeShop = ()=>{
    emit('closeShop')
}
</script>

<template lang="pug">
.stop-block(@click="closeShop()")
    .shop-content
        .shop-for(v-for="item in stopList")
            el-tooltip(:content="item.desc" placement="top" effect="dark")
                .shop-one()
                    .shop-name() {{item.name}}    
                    .shop-num(style="margin-top: 16px;") 剩余：{{item.num}}

</template>
<style scoped lang="scss">
.stop-block{
    position: relative;
    width: 100%;
    height: 100%;
    .shop-content{
        position: absolute;
        top: 70px;
        left: 90px;
        width: 420px;
        height: 280px;
        border-radius: 6px;
        border: 1px solid #ee33ff;
        background-color: #333;
        .shop-for{
            float: left;
            width:84px;
            height: 100px;
            padding: 10px;
            box-sizing: border-box;
            .shop-one{
                font-size: 10px;
                text-align: center;
                background-color: #fff1e4;
                width: 100%;
                height: 100%;
                cursor: pointer;
                border-radius: 4px;
                .shop-name{
                    font-size: 12px;
                    padding: 10px 0px;
                }
            }
        }
    }
}
</style>