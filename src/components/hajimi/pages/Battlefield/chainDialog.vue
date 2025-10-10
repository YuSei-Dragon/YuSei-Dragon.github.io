<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
} from 'vue'
import {useStore} from 'vuex'
import basicCardList from '../../basicCardList'
const store = useStore()
const props = defineProps({
    allMes:{
        type:Object,
        default:{}
    }
})
const allMes = ref({})
onMounted(()=>{
  allMes.value = props.allMes
})
const chainYes = ()=>{
    if(choiced.value === -1){
      return store.commit("setBullFightTip","请先选择一张卡片")
    }
    allMes.value.chain.push({
      card:basicCardList.getMesByCardName(allMes.value.allMesMy.cardGroundList[choiced.value].name),
      user:"allMesMy",
    })
    allMes.value.allMesMy.cardGroundList.splice(choiced.value,1)
    choiced.value = -1
    emit('chainYes',allMes.value)
}
const chainNo = ()=>{
  choiced.value = -1
  emit('chainNo',allMes.value)
}
const emit = defineEmits(['chainYes','chainNo'])
const choiced = ref(-1)
const clickCard = (index)=>{
    if(choiced.value === index){
      choiced.value = -1
    }else{
      choiced.value = index
    }
}
const isShowUse = ()=>{
  if(choiced.value !== -1&&props.allMes.allMesMy.cardGroundList[choiced.value].speed>=props.allMes.chain[props.allMes.chain.length-1].card.speed){
    return false
  }
  return true
}
</script>

<template lang="pug">
.chain-block
  .battle-chain-title(style="padding-top:4px;")  可用卡牌：
  .battle-chain-cards
    .battle-chain-card(:class="choiced===index?'battle-chain-card-choiced':''" v-for="(card,index) in props.allMes.allMesMy.cardGroundList" @click="clickCard(index)")
      .battle-chain-card-name {{card.name}}
    div(style="clear:both;")
  .battle-chain-title  连锁链：
  .battle-chain-cards
    .battle-chain-card(v-for="(item,index) in allMes.chain")
      .battle-chain-card-name {{item.card.name}}
    div(style="clear:both;")
  .battle-chain-buttons 
    el-button(class="battle-chain-button" type="default" :disabled="isShowUse()" @click="chainYes()") 发动
    el-button(class="battle-chain-button" type="default" @click="chainNo()") 忽略
    div(style="clear:both;")
</template>
<style scoped lang="scss">
.chain-block{
  width: 100%;
  width: 100%;
  .battle-chain-cards{
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
    margin-top: 10px;
    height: 50px;
    overflow: auto;
    .battle-chain-card{
      width: 36px;
      height: 46px;
      float: left;
      margin-right: 12px;
      border-radius: 4px;
      border: 1px #ddd solid;
      cursor: pointer;
      .battle-chain-card-name{
        font-size: 10px;
        text-align: center;
        padding-top: 10px;
        color: #999;
      }
    }
    .battle-chain-card-choiced{
      background: #f5f5f5;
    }
  }
  .battle-chain-title{
    color: #999;
    padding-left: 10px;
    font-size: 12px;
  }
  .battle-chain-buttons{
    width: 100%;
    margin-top: 6px;
    .battle-chain-button{
      width: 40px;
      // height: 60px;
      float: right;
      margin: 0 10px;
      color: #999;
    }
  }
}
</style>