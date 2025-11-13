<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
  watch,
} from 'vue'
import {useStore} from 'vuex'
import basicCardList from '../../basicCardList'
import cardMethod from '../../cardMethod'
const store = useStore()
const props = defineProps({
    allMes:{
        type:Object,
        default:{}
    },
    cardChoiceTabList:{
      type:Array,
      default:['我方手卡','我方盖卡','对方手卡','对方盖卡']
    },
    selectCardName:{
      type:String,
      default:""
    }
})
watch(()=>props.cardChoiceTabList,(newVal,oldVal)=>{
  // console.log('cardChoiceTabList 发生变化:', newVal)
  // 当cardChoiceTabList变化时，如果当前选中的tab不在新列表中，则重置为第一个选项
  if (newVal && newVal.length > 0 && 
      (!choicedTab.value || !newVal.includes(choicedTab.value))) {
    choicedTab.value = newVal[0]
  }
}, { deep: true })
const allMes = ref({})
const cardUsedListCZQG = ref([])
const cardUsedListBlackMagic = ref([])
onMounted(()=>{
  allMes.value = props.allMes
  nextTick(()=>{
    choicedTab.value = props.cardChoiceTabList[0]
    console.log(allMes.value.cardUsedList)
    allMes.value.cardUsedList.forEach(item=>{
      if(item.type==="basic"){
        cardUsedListCZQG.value.push(item)
      }else if(item.type==="strategy"){
        cardUsedListBlackMagic.value.push(item)
      }
    })
  })
})
const makeSure = ()=>{
    if(choiceCardList.value.length === 0){
      return store.commit("setBullFightTip","请先选择一张卡片")
    }else{
      if(props.selectCardName === "了如指掌"||props.selectCardName === "如法炮制"||props.selectCardName === "党同伐异"||props.selectCardName === "各怀鬼胎"||props.selectCardName === "重整旗鼓"||props.selectCardName === "黑魔法"){
        if(choiceCardList.value.length!== 1){
          return store.commit("setBullFightTip","只能选择一张卡片")
        }
      }
      emit('selectSure',choiceCardList.value)
      choiceCardList.value = []
    }
}

const emit = defineEmits(['makeSure','selectSure'])
const isInChoicedList = (type,index)=>{
  return choiceCardList.value.some(item=>item.type === type && item.index === index)
}
const delChoicedList = (type,index)=>{
  choiceCardList.value = choiceCardList.value.filter(item=>item.type !== type || item.index !== index)
}
const botHandChoicedClick = (index)=>{
    if(isInChoicedList('botHand',index)){
      delChoicedList('botHand',index)
    }else{
      choiceCardList.value.push({
        type:'botHand',
        index
      })
    }
}
const botGroundChoicedClick = (index)=>{
    if(isInChoicedList('botGround',index)){
      delChoicedList('botGround',index)
    }else{
      choiceCardList.value.push({
        type:'botGround',
        index
      })
    }
}
const myHandChoicedClick = (index)=>{
    if(isInChoicedList('myHand',index)){
      delChoicedList('myHand',index)
    }else{
      choiceCardList.value.push({
        type:'myHand',
        index
      })
    }
}
const myGroundChoicedClick = (index)=>{
    if(isInChoicedList('myGround',index)){
      delChoicedList('myGround',index)
    }else{
      choiceCardList.value.push({
        type:'myGround',
        index
      })
    }
}
const cardUsedListCZQGChoicedClick = (index)=>{
    if(isInChoicedList('cardUsedListCZQG',index)){
      delChoicedList('cardUsedListCZQG',index)
    }else{
      choiceCardList.value.push({
        type:'cardUsedListCZQG',
        index
      })
    }
}
const cardUsedListBlackMagicChoicedClick = (index)=>{
    if(isInChoicedList('cardUsedListBlackMagic',index)){
      delChoicedList('cardUsedListBlackMagic',index)
    }else{
      choiceCardList.value.push({
        type:'cardUsedListBlackMagic',
        index
      })
    }
}
const cardUsedListChoicedClick = (index)=>{
    if(isInChoicedList('cardUsedList',index)){
      delChoicedList('cardUsedList',index)
    }else{
      choiceCardList.value.push({
        type:'cardUsedList',
        index
      })
    }
}
const choicedTab = ref('')
const tabClick = (item)=>{
  choicedTab.value = item
}
const choiceCardList = ref([])
const getChoicedClass = (type,index)=>{
  return isInChoicedList(type,index)?'battle-chain-card-choiced':''
}
const getChoicedCardListName = (card)=>{
  console.log(card)
  if(card.type === 'myHand'){
    return allMes.value.allMesMy.handCardList[card.index].name
  }else if(card.type === 'myGround'){
    return allMes.value.allMesMy.cardGroundList[card.index].name
  }else if(card.type === 'botHand'){
    return allMes.value.allMesBot.handCardList[card.index].name
  }else if(card.type === 'botGround'){
    return allMes.value.allMesBot.cardGroundList[card.index].name
  }else if(card.type === 'cardUsedList'){
    return allMes.value.cardUsedList[card.index].name
  }else if(card.type === 'cardUsedListCZQG'){
    return cardUsedListCZQG.value[card.index].name
  }else if(card.type === 'cardUsedListBlackMagic'){
    return cardUsedListBlackMagic.value[card.index].name
  }
}
const cardUsedShow = (card)=>{
  if(props.selectCardName === "如法炮制"){
    return card.type === 'basic'?true:false
  }return true
}
</script>

<template lang="pug">
.chain-block
  .card-choice-tab-block
    .card-choice-tab-item(:class="choicedTab===item?'card-choice-tab-item-choiced':''" v-for="(item,index) in props.cardChoiceTabList" @click="tabClick(item)") {{item}}
  .battle-chain-cards(v-if="choicedTab==='对方手卡'")
    .battle-chain-card(:class="getChoicedClass('botHand',index)" v-for="(card,index) in allMes.allMesBot.handCardList" @click="botHandChoicedClick(index)")
      .battle-chain-card-name {{card.name}}
    div(style="clear:both;")
  .battle-chain-cards(v-if="choicedTab==='对方盖卡'")
    .battle-chain-card(:class="getChoicedClass('botGround',index)" v-for="(card,index) in allMes.allMesBot.cardGroundList" @click="botGroundChoicedClick(index)")
      .battle-chain-card-name ???
    div(style="clear:both;")
  .battle-chain-cards(v-if="choicedTab==='我方手卡'")
    .battle-chain-card(:class="getChoicedClass('myHand',index)" v-for="(card,index) in allMes.allMesMy.handCardList" @click="myHandChoicedClick(index)")
      .battle-chain-card-name {{card.name}}
    div(style="clear:both;")
  .battle-chain-cards(v-if="choicedTab==='我方盖卡'")
    .battle-chain-card(:class="getChoicedClass('myGround',index)" v-for="(card,index) in allMes.allMesMy.cardGroundList" @click="myGroundChoicedClick(index)")
      .battle-chain-card-name {{card.name}}
    div(style="clear:both;")
  .battle-chain-cards(v-if="choicedTab==='墓地'")
    .battle-chain-card(:class="getChoicedClass('cardUsedList',index)" v-for="(card,index) in allMes.cardUsedList" @click="cardUsedListChoicedClick(index)" v-show="cardUsedShow(card)")
      .battle-chain-card-name {{card.name}}
    div(style="clear:both;")
  .battle-chain-cards(v-if="choicedTab==='墓地(重整旗鼓)'")
    .battle-chain-card(:class="getChoicedClass('cardUsedListCZQG',index)" v-for="(card,index) in cardUsedListCZQG" @click="cardUsedListCZQGChoicedClick(index)" v-show="cardUsedShow(card)")
      .battle-chain-card-name {{card.name}}
    div(style="clear:both;")
  .battle-chain-cards(v-if="choicedTab==='墓地(黑魔法)'")
    .battle-chain-card(:class="getChoicedClass('cardUsedListBlackMagic',index)" v-for="(card,index) in cardUsedListBlackMagic" @click="cardUsedListBlackMagicChoicedClick(index)" v-show="cardUsedShow(card)")
      .battle-chain-card-name {{card.name}}
    div(style="clear:both;")
  .battle-chain-title 已选
  .battle-chain-cards(v-if="choiceCardList.length>0")
    .battle-chain-card(v-for="(card,index) in choiceCardList" @click="delChoicedList(card.type,card.index)" )
      .battle-chain-card-name {{getChoicedCardListName(card)}}
    div(style="clear:both;")
  .battle-chain-buttons 
    el-button(class="battle-chain-button" type="default" :disabled="choiceCardList.length===0" @click="makeSure()") 确认
    div(style="clear:both;")
</template>
<style scoped lang="scss">
.chain-block{
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .card-choice-tab-block{
    width:100%;
    height: 30px;
    .card-choice-tab-item{
      float: left;
      padding: 4px 10px;
      font-size: 12px;
      color: #999;
      cursor: pointer;
    }
    .card-choice-tab-item-choiced{
      color: #666;
      font-weight: bold;
    }
  }
  .battle-chain-cards{
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    margin-top: 10px;
    // height: 50px;
    min-height: 62px;
    white-space: nowrap;  /* 父容器禁止换行 */
    overflow-x: auto;     /* 父容器添加横向滚动条 */
    /* WebKit滚动条样式 */
    &::-webkit-scrollbar {
      height: 8px; /* 水平滚动条高度 */
    }
    &::-webkit-scrollbar-track {
      background: #f0f0f0;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
    
    /* 标准CSS滚动条样式 */
    scrollbar-width: thin;
    scrollbar-color: #ccc #f0f0f0;
    
    .battle-chain-card{
      display: inline-block; /* 子元素横向排列 */
      width: 36px;
      height: 46px;
      // float: left;
      margin-right: 12px;
      border-radius: 4px;
      border: 1px #ddd solid;
      cursor: pointer;
      .battle-chain-card-name{
        display: block;
        font-size: 10px;
        width: 10px;
        // text-align: center;
        padding-top: 4px;
        padding-left: 8px;
        color: #999;
        writing-mode: vertical-rl; // 添加这个属性实现文字竖排
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
    padding-top: 4px;
  }
  .battle-chain-buttons{
    position: absolute;
    right: 0px;
    top: 104px;
    .battle-chain-button{
      height: 24px;
      line-height: 24px;
      float: right;
      font-size: 12px;
      padding: 0 10px;
      color: #999;
    }
  }
}
</style>