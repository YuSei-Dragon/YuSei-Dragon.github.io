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
const router = useRouter()
const route = useRoute()
const store = useStore()
const allMes = ref({})
const MyDialog = defineAsyncComponent(() =>
  import("./Common/Dialog.vue")
)
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const changePage = (title) => {
    router.push('/hajimiReset/navigation')
}
onMounted(() => {
    selectOne("精灵卡")
    allMes.value = store.state.hajimiReset.allMes
})
const selectType = ref("精灵卡")
const showList = ref([])
const allShopList = [
    {
        typeName:"精灵卡",
        list:[
            {
                name:"普通卡",
                realName:"normal",
                price:100,
                desc:"1倍捕捉率"
            },
            {
                name:"强化卡",
                realName:"fortify",
                price:200,
                desc:"1.5倍捕捉率"
            },
            {
                name:"超强化卡",
                realName:"superFortify",
                price:500,
                desc:"2倍捕捉率"
            },
            {
                name:"至尊卡",
                realName:"supreme",
                price:10000,
                desc:"捕捉必定成功"
            },
        ],
    },
    {
        typeName:"其他",
        list:[
            {
                name:"空气",
                price:50,
                desc:"纯消遣"
            },
        ]
    }
]//商店信息

const getTabStyle = (type) => {
    return "color: "+(selectType.value === type ? '#ee33ff' : '#fff')
}
const selectOne = (type) => {
    selectType.value = type
    showList.value = allShopList.find(item => item.typeName === type).list
}
const dialogVisible = ref(false)
const buyItem = ref({
    name:"",
    price:0,
    allPrice:0,
    num:1
})
const handleChange = (val) => {
    buyItem.value.allPrice = val * buyItem.value.price
}
const buy = (item)=>{
    buyItem.value.name = item.name
    buyItem.value.realName = item.realName
    dialogVisible.value = true
    buyItem.value.num = 1
    buyItem.value.price = item.price
    buyItem.value.allPrice = item.price * buyItem.value.num
    console.log(buyItem.value)
}
const sureBuy = ()=>{
    if(allMes.value.playerMes.money < buyItem.value.allPrice){
        store.commit("hajimiReset/setTipList",["余额不足"])
        return
    }
    allMes.value.playerMes.money -= buyItem.value.allPrice
    allMes.value.playerMes.rune[buyItem.value.realName] += buyItem.value.num
    store.commit("hajimiReset/setAllMes",allMes.value)
    dialogVisible.value = false
}
</script>

<template lang="pug">
.shop-block
    .shop-back(@click="changePage") 返回
    .shop-tabs 
        .shop-tab-item(name="shop" @click="selectOne('其他')"
            :style="getTabStyle('其他')") 其他
        .shop-tab-item(name="shop" @click="selectOne('精灵卡')"
            :style="getTabStyle('精灵卡')") 精灵卡
        .shop-tab-money(v-if="allMes.playerMes") 余额：{{allMes.playerMes.money}}
    .shop-content
        .shop-content-item( v-for="item in showList" ) 
            el-tooltip(:content="item.desc" placement="top" effect="dark")
                .shop-one(@click="buy(item)") {{item.name}}
MyDialog( v-if="dialogVisible" @close="dialogVisible = false")
    template( #body)
        .dialog-padding
            .dialog-content {{buyItem.name}}
            .dialog-content 总价格：{{buyItem.allPrice}}
            .dialog-content 
                el-input-number(v-model="buyItem.num" :min="1" @change="handleChange") 
            .dialog-footer
                el-button(@click="dialogVisible = false") 取消
                el-button(type="primary" @click="sureBuy()") 确认
</template>
<style scoped lang="scss">
.shop-block{
    width: 100%;
    height: 100%;
    position: relative;
    .shop-back{
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
    .shop-tabs {
        position: absolute;
        top: 20px;
        left: 90px;
        width: 420px;
        height: 30px;
        .shop-tab-item{
            float: right;
            margin-left: 10px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
        }
        .shop-tab-money{
            float: left;
            margin-left: 10px;
            color: #fff;
            font-size: 14px;
        }
    }
    .shop-content{
        position: absolute;
        top: 70px;
        left: 90px;
        width: 420px;
        height: 280px;
        .shop-content-item{
            float: left;
            width:70px;
            height: 70px;
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
            }
        }
    }
}
.dialog-padding{
    padding: 20px;
    .dialog-content{
        padding: 10px 0px;
    }
    .dialog-footer{
        padding: 10px 0px;
        position: absolute;
        bottom: 40px;
        right: 50px;
    }
}
</style>