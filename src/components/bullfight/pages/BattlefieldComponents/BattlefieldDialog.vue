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
import {useStore} from 'vuex'
const store = useStore()
import monsterMesApi from "../../monsterMes"
import monsterShowApi from "../../monsterShow"
import strategyApi from "../../strategyCard"
const props = defineProps({
    skillObj:{
        type:Object,
        default:()=>{},
    } ,
})
const skillMes = ref({})
onMounted(()=>{
    init()
})
const init = ()=>{
    console.log(props.skillObj)
    skillMes.value = monsterMesApi.getSkillDetailMes(props.skillObj.skill)
}
onBeforeUnmount(()=>{
    close()
})
const close = ()=>{
    emit("closeDialog")
}
const emit = defineEmits(['closeDialog','sure'])
const getIcon = (type)=>{
    if(type === "diamond")
        return "♦"
    if(type === "club")
        return "♣"
    if(type === "heart")
        return "♥"
    if(type === "spades")
        return "♠"
    return "未知类型"
}//显示四种花色
const choicedCardList = ref([])
const choiceOneCard = (hand)=>{
    if(cardIncludes(choicedCardList.value,hand)){
        let res = []
        choicedCardList.value.forEach(item=>{
            if(item.num === hand.num && item.type === hand.type){
                //
            }else{
                res.push(item)
            }
        })
        choicedCardList.value = res
    }else{
        choicedCardList.value.push(hand)
    }

    reflashPokeNum()
}
const cardIncludes = (list,hand)=>{
    let res = false
    // console.log(list,hand)
    if(Array.isArray(list)){
        list.forEach(item=>{
            // console.log(item)
            if(item.num === hand.num&&item.type === hand.type){
                res = true
            }
        })
    }
    return res
}//检查是否存在同样卡牌方法
const reflashPokeNum = ()=>{
    pokeNum.value = 0
    choicedCardList.value.forEach(item=>{
        pokeNum.value+=Number(item.realNum)
    })
}
const strategyDec = ref("")
const onFocus = (strategy)=>{
    strategyDec.value = strategy.dec
    // console.log("mouseEnter")
}
const pokeNum = ref(0)
const getStrategyStyle = (data)=>{
    if(strategyApi.checkStrategy(choicedCardList.value,data.condition)){
        return "background: #d8f0ff;color: #666;"
    }else{
        return ""
    }
    
}//检查卡牌的排列组合生效了几个
const sure = ()=>{
    console.log("确认方法")
    let allPoint = 0
    choicedCardList.value.forEach(item=>{
        allPoint+=Number(item.realNum)
    })
    if(skillMes.value.cost>allPoint){
        console.log("点数不足")
        // return 
        store.commit("setBullFightTip","点数不足！")
        // console.log(store.state.bullFightTip)
        return 
    }
    // let strategyList = []
    // props.skillObj.strategyList.forEach(item=>{
    //     if(strategyApi.checkStrategy(choicedCardList.value,item.condition)){
    //         strategyList.push(item)
    //     }
    // })
    emit("sure",{
        skill:skillMes.value.name,
        cardList:choicedCardList.value,
        strategyList:choiceStrategyList.value,
    })
}
const choiceStrategyList = ref([])
const choiceStrategy = (strategy)=>{
    // console.log(strategy)
    if(choiceStrategyList.value.includes(strategy.name)){
        choiceStrategyList.value = choiceStrategyList.value.filter(item=>item!==strategy.name)
    }else if(strategyApi.checkStrategy(choicedCardList.value,strategy.condition)){
        choiceStrategyList.value.push(strategy.name)
    }
}
</script>
<template lang="pug">
.dialog-block
    .dialog-border
        .dialog-one-monster-block
            .dialog-one-monster
                .dialog-one-monster-skill {{skillMes.name}}
                .dialog-one-monster-cost 消耗点数：{{skillMes.cost}}
            .dialog-one-monster-dec {{skillMes.dec}}
        .dialog-one-poke-block
            .dialog-one-poke(v-for="poke in skillObj.cardList" @click="choiceOneCard(poke)" :style="cardIncludes(choicedCardList,poke)?'background:#ccc;color:#fff;':''")
                .dialog-one-poke-num {{poke.num}}
                .dialog-one-poke-type(:style="poke.type==='diamond'||poke.type==='heart'?'color:#ff8181;':''") {{getIcon(poke.type)}}
        .dialog-one-strategy-block
            .dialog-one-strategy(style="height:70px;") 策略卡能力：{{strategyDec}}
            .dialog-one-num 当前点数: {{pokeNum}}
            .dialog-one-strategy
                .dialog-one-strategy-for(v-for="strategy in skillObj.strategyList" @mouseenter="onFocus(strategy)" :style="getStrategyStyle(strategy)" @click="choiceStrategy(strategy)")
                    .dialog-one-check(v-show="choiceStrategyList.includes(strategy.name)") 选中
                    .dialog-one-name {{strategy.name}}
                    img(class="dialog-one-attribute" :src="monsterShowApi.attributeJudge(strategy)")
                    .dialog-one-condition {{strategy.condition}}
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
        .dialog-one-monster-block{
            width: 200px;
            height: 100%;
            background-color: #eee;
            color: #999;
            .dialog-one-monster{
                width: 100%;
                height: 90px;
                .dialog-one-monster-skill{
                    height: 100%;
                    width: 100px;
                    float: left;
                    font-size: 14px;
                    box-sizing: border-box;
                    padding: 10px;
                    padding-right: 4px;
                }
                .dialog-one-monster-cost{
                    height: 100%;
                    width: 100px;
                    float: left;
                    font-size: 14px;
                    box-sizing: border-box;
                    padding: 10px;
                    padding-left: 4px;
                }
            }
            .dialog-one-monster-dec{
                width: 100%;
                height: 180px;
                font-size: 14px;
                box-sizing: border-box;
                padding: 10px;
                text-align: justify;
            }
        }
        .dialog-one-poke-block{
            width: 200px;
            height: 90px;
            position: absolute;
            top: 0px;
            right: 0px;
            overflow: auto;
            .dialog-one-poke{
                height: 45px;
                width: 38px;
                float: left;
                color: #999;
                font-size: 12px;
                box-sizing: border-box;
                padding: 4px;
                position: relative;
                background: linear-gradient(-90deg, #eee, #fff);
                cursor: pointer;
                .dialog-one-poke-type{
                    color: #aaa;
                    position: absolute;
                    bottom: 4px;
                    left: 2px;
                }
            }
            .dialog-one-poke:hover{
                background: #fff;
            }
        }
        .dialog-one-strategy-block{
            width: 200px;
            height: 180px;
            position: absolute;
            bottom: 0px;
            right: 0px;
            .dialog-one-strategy{
                height: 90px;
                width: 100%;
                box-sizing: border-box;
                padding: 4px;
                font-size: 12px;
                color: #999;
                .dialog-one-strategy-for{
                    height: 100%;
                    width: 52px;
                    float: left;
                    position: relative;
                    background: linear-gradient(-90deg, #eee, #fff);
                    box-sizing: border-box;
                    padding: 4px 0px;
                    cursor: pointer;
                    .dialog-one-check{
                        position: absolute;
                        bottom: 2px;
                        right: 4px;
                        font-size: 10px;
                        color: #999;
                    }
                    .dialog-one-attribute{
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        bottom: 4px;
                        left: 0px;
                    }
                    .dialog-one-condition{
                        position: absolute;
                        bottom: 24px;
                        left: 0px;
                    }
                }
            }
            .dialog-one-num{
                width: 100%;
                height: 20px;box-sizing: border-box;
                padding: 4px;
                font-size: 12px;
                color: #999;
            }
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

</style>