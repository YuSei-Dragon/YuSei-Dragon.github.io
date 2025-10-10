
<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent,
  defineProps,
  nextTick,
  defineEmits,
} from 'vue'
import strategyApi from "../../strategyCard"
import {useStore} from 'vuex'
import strategyCard from '../../strategyCard'
const store = useStore()
const props = defineProps({
    buyCardList:{
        type:Array,
        default:()=>[],
    } ,
})
const typeList = ["aa","aaa","aaabb"]
const introduceText = ref("")
const onFocus = (main)=>{
    introduceText.value = main.dec
}
const choicedList = ref([])
const choiceOneCard = (main)=>{
    if(choicedList.value.includes(main.name)){
        choicedList.value = choicedList.value.filter(item=>item!=main.name)
    }else{
        choicedList.value.push(main.name)
    }
}
const usedNum = computed(()=>{
    let res = 0
    choicedList.value.forEach(item=>{
        res+=Number(strategyApi.getStrategyByName(item).cost)

    })

    return res
})
onBeforeUnmount(()=>{
    close()
})
const sure = ()=>{
    if(choicedCardList.value.length<usedNum.value){
        store.commit("setBullFightTip","点数不足！")
    }else{
        let list = []
        props.buyCardList.forEach((buy,index)=>{
            if(choicedCardList.value.includes(index)){
                //
            }else{
                list.push(buy)
            }
        })
        emit("sure",{
            strategyCardList:choicedList.value,
            cardList:list
        })
    }
}
const emit = defineEmits(['closeDialogBuy','sure'])
const close = ()=>{
    emit("closeDialogBuy")
}
const cardIncludes = (list,index)=>{
    let res = false
    // console.log(list)
    if(Array.isArray(list)){
        list.forEach(item=>{
            // console.log(item)
            if(item === index){
                res = true
            }
        })
    }
    return res
}
const getHandClass = (index)=>{
    if(cardIncludes(choicedCardList.value,index)){
        return "hand-choice"
    }else{
        return ""
    }
}
const choicedCardList = ref([])
const getHandType = (hand)=>{
    if(hand.type==="diamond"){
        return '♦'
    }else if(hand.type==="club"){
        return '♣'
    }else if(hand.type==="heart"){
        return '♥'
    }else if(hand.type==="spades"){
        return '♠'
    }else{
        return "未知属性"
    }
}
const getHandColor = (hand)=>{
    if(hand.type==="diamond"||hand.type==="heart"){
        return 'color:#ffa0a0'
    }else if(hand.type==="club"||hand.type==="spades"){
        return 'color:#bbb'
    }
}
const choiceCard= (main,index)=>{

    if(choicedCardList.value.includes(index)){
        choicedCardList.value = choicedCardList.value.filter(item=>item!=index)
    }else{
        choicedCardList.value.push(index)
    }
}

</script>
<template lang="pug">
.dialog-block
    .dialog-border
        div(style="height:100%;width:100%;position:relative")
            .dialog-introduce {{introduceText}}
            .dialog-num {{usedNum}}
            div(style="width:100%;height:180px;")
                .dialog-type-block(v-for="item in typeList" :key="item")
                    .dialog-main
                        .dialog-main-for( :style="choicedList.includes(main.name)?'background:#eee;color:#666;':''" @click="choiceOneCard(main)" @mouseenter="onFocus(main)" v-for="main in strategyApi.getListByCondition(item)") {{main.name}} - {{main.cost}}
                        div(style="clear:both;")
                    .dialog-type {{item}}
            div(style="height:50px;width:100%; padding: 0 10px;box-sizing: border-box;padding-right: 24px;position:relative;")
                .hand-one(v-for="(hand,index) in props.buyCardList" @click="choiceCard(hand,index)" :class="getHandClass(index)" :style="'width:'+315/props.buyCardList.length + 'px;'")
                    .hand-num {{hand.num}}
                    .hand-type(:style="getHandColor(hand)") {{getHandType(hand)}}
                .dialog-card-num {{choicedCardList.length}}
    .dialog-cancel(@click="close()") × 取 消
    .dialog-sure(@click="sure()") √ 确 定
</template>
<style scoped lang="scss">
/* 定义滚动条的整体样式 */
::-webkit-scrollbar {
width: 4px; /* 对于垂直滚动条 */
height: 6px; /* 对于水平滚动条 */
background-color: #fff; /* 滚动条的背景色 */
}

/* 定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(216, 216, 216, 0.3); /* 轨道的阴影 */
border-radius: 10px; /* 轨道的圆角 */
background-color: #fff; /* 轨道的背景色 */
}

/* 定义滑块的样式 */
::-webkit-scrollbar-thumb {
border-radius: 10px; /* 滑块的圆角 */
-webkit-box-shadow: inset 0 0 6px rgba(226, 226, 226, 0.3); /* 滑块的阴影 */
background-color: #eee; /* 滑块的背景色 */
}
.dialog-block{
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #eeeeee7a;
    opacity: 0.8;
    .dialog-border{
        border: 1px solid #666;
        border-radius: 10px;
        width: 400px;
        height: 270px;
        position: absolute;
        top: 117px;
        left: 50px;
        overflow: hidden;
        background-color: #fff;
    }
    .dialog-introduce{
        height: 40px;
        width: 100%;
        font-size: 12px;
        color: #999;
        padding: 4px 10px;
        padding-right: 24px;
        box-sizing: border-box;
    }
    .dialog-num{
        position: absolute;
        right: 4px;
        top: 10px;
        font-size: 12px;
        color: #999;
    }
    .dialog-type-block{
        height: 180px;
        width: 130px;
        padding: 0 10px;
        box-sizing: border-box;
        float: left;
        font-size: 12px;
        color: #999;
        .dialog-main{
            height: 150px;
            width: 100%;
            .dialog-main-for{
                padding: 4px 0;
                cursor: pointer;
                text-indent: 4px;
            }
            .dialog-main-for:hover{
                color: #fff;
                background-color: #bbb;
            }
        }
        .dialog-type{
            height: 30px;
            width: 100%;
            text-indent: 4px;
        }
    }
    .dialog-cancel{
        position: absolute;
        right: 10px;
        top: 116px;
        height: 80px;
        width: 14px;
        border-radius: 4px;
        background-color: #ccc;
        font-size: 14px;
        padding: 9px;
        color: #fff;
        cursor: pointer;
    }
    .dialog-sure{
        position: absolute;
        right: 10px;
        top:220px;
        height: 80px;
        width: 14px;
        border-radius: 4px;
        border: 1px #999 solid;
        background-color: #fff;
        font-size: 14px;
        padding: 9px;
        color: #ccc;
        cursor: pointer;
    }
}
.hand-choice{
    background:#eee;
    border-right: 1px #fff solid;
}
.hand-one{
    max-width: 56px;
    float: left;
    height: 100%;
    font-size: 12px;
    color: #bbb;
    cursor: pointer;
    .hand-num{
        padding-left: 3px;
    }
}
.hand-one:hover{
    background-color: #eee;
}
.dialog-card-num{
    position: absolute;
    right: 4px;
    top: 10px;
    font-size: 12px;
    color: #999;
}
</style>