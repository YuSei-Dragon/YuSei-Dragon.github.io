<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
  defineExpose,
} from 'vue'
const props = defineProps({
    skillList:{
        type:Array,
        default:[],
    },
    cardList:{
        type:Array,
        default:[],
    },
    strategyList:{
        type:Array,
        default:[]
    }
})
const choiced = ref("skill")
const emit = defineEmits(['onFocus','onFocusSkill','onFocusHand','onFocusStrategy','onClickSkill'])
const onFocus = (obj,type)=>{
    //数据obj 传入的是怪兽/扑克牌/对策卡
    // console.log("触发展示详情信息")
    if(type === "skill"){
        emit('onFocusSkill',obj)
    }else if(type === "hand"){
        emit('onFocusHand',obj)
    }else if(type === "strategy"){
        emit('onFocusStrategy',obj)
    }
}
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
const selectSkill = (skill)=>{
    emit('onClickSkill',skill.name)
    //往外传选中的技能名字
}
const choiceCard = ()=>{
    choiced.value = 'hand'
}
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
    emit('onClickHand',choicedCardList.value)
}
const cardIncludes = (list,hand)=>{
    let res = false
    // console.log(list)
    if(Array.isArray(list)){
        list.forEach(item=>{
            // console.log(item)
            if(item.num === hand.num&&item.type === hand.type){
                res = true
            }
        })
    }
    return res
}
const getHandClass = (hand)=>{
    if(cardIncludes(choicedCardList.value,hand)){
        return "hand-choice"
    }else{
        return ""
    }
}
const backToSkill = ()=>{
    choiced.value = 'skill'
}
const clearSelectCard = ()=>{
    choicedCardList.value = []
}
defineExpose({
    choiceCard,
    backToSkill,
    clearSelectCard,
})
</script>
<template lang="pug">
.start-card-block
    .card-position 
        .card-skill-block.card-block(v-show="choiced==='skill'")
            .card-skill-one(v-for="skill in props.skillList" @mouseenter="onFocus(skill,'skill')" @click="selectSkill(skill)")
                .card-skill-name {{skill.name}}
                .card-skill-num {{skill.surplus}}/{{skill.num}}
                .card-skill-cost {{skill.cost}}
        .card-hand-block.card-block(v-show="choiced==='hand'" )
            .hand-one(v-for="hand in props.cardList" @click="choiceOneCard(hand)" :class="getHandClass(hand)" :style="'width:'+315/props.cardList.length + 'px;'")
                .hand-num {{hand.num}}
                .hand-type(:style="getHandColor(hand)") {{getHandType(hand)}}
        .card-strategy-block.card-block(v-show="choiced==='strategy'" )
            .card-strategy-one(v-for="strategy in props.strategyList" :style="'width:'+315/props.strategyList.length + 'px;'" @mouseenter="onFocus(strategy,'strategy')")
                .card-strategy-name {{strategy.name}}
    .choice-position
        .choice-one(:class="choiced==='skill'?'choice':''" @click="choiced='skill'") 技能
        .choice-one(:class="choiced==='hand'?'choice':''" @click="choiced='hand'") 手牌
        .choice-one(:class="choiced==='strategy'?'choice':''" @click="choiced='strategy'") 策略卡
</template>
<style scoped lang="scss">
.hand-choice{
    background:#eee;
    border-right: 1px #fff solid;
}
.start-card-block{
    width: 100%;
    height: 100%;
    position: relative;
    .card-position {
        float: left;
        width: 320px;
        height: 100%;
        .card-block{
            width: 100%;
            height: 100%;
            .card-skill-one{
                width: 50%;
                float: left;
                height: 37px;
                position: relative;
                background:#fff;
                color: #bbb;
                cursor: pointer;
                .card-skill-name{
                    font-size: 14px;
                    height: 100%;
                    padding-top: 4px;
                    padding-left: 10px;
                }
                .card-skill-num{
                    position: absolute;
                    right: 10px;
                    bottom: 4px;
                    font-size: 10px;
                }
                .card-skill-cost{
                    position: absolute;
                    right: 10px;
                    top: 4px;
                    font-size: 10px;
                }
            }
            .card-skill-one:hover{
                color: #fff;
                background: #89bfeb;
                border-radius: 4px;
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
            .card-strategy-one{
                max-width: 56px;
                float: left;
                height: 100%;
                font-size: 12px;
                color: #bbb;
                cursor: pointer;
                .card-strategy-name{
                    width:12px;
                    height:100%;
                    float: left;
                    padding-left: 4px;
                }
            }
            .card-strategy-one:hover{
                background-color: #eee;
            }
        }
    }
    .choice-position {
        float: left;
        width: 84px;
        height: 100%;
        .choice-one{
            font-size: 14px;
            color: #bbb;
            text-align: center;
            padding: 3px 0px;
            cursor: pointer;
        }
        .choice{
            // border-left: 2px #d0ebff solid;
            border-right: 2px #89bfeb solid;
            color: #89bfeb;
        }
    }
}
</style>