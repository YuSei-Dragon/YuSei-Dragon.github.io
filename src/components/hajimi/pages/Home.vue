<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
} from 'vue'
const Battlefield = defineAsyncComponent(() =>
  import("./Battlefield.vue")
)
import myMonster from "@/components/hajimi/myMonster.js"
import basicCardList from '../basicCardList'
import {useStore} from 'vuex'
const store = useStore()

const bullFightTip = computed(() => {
    return store.state.bullFightTip
})
const isShowTip = ref(false)
const showTipMes = (text)=>{
  tipText.value = text
  isShowTip.value = true
  setTimeout(()=>{
    isShowTip.value = false
    tipText.value = ""
  },2000)
}
const tipText = ref("")
watch(bullFightTip, (newValue, oldValue) => {
 console.log("===================>监听到了提示文字变化")
 if(newValue===""){
    //如果是初始化的“”，就不管他
 }else{
    showTipMes(newValue)
 }
}, { immediate: true, deep: true })

const allMes = ref({
  allMesMy:{
    monsterList:[],//我的所有精灵
    monsterNow:{},//当前上场的精灵
    playerNow:{},//当前上场的玩家的数据
    handCardList:[],//我的手牌
    cardGroundList:[],//我的场上卡片
    playerMes:{
      name:"我"
    }//玩家存档数据
  },//我的所有信息
  allMesBot:{
    monsterList:[],//BOT的所有精灵
    monsterNow:{},//当前上场的精灵
    playerNow:{},//当前上场的玩家的数据
    handCardList:[],//BOT的手牌
    cardGroundList:[],//BOT的场上卡片
    playerMes:{
      name:"Bot"
    }//玩家存档数据
  },//bot的所有信息
  roundNum:0,//回合数
  cardList:[],//卡池
  cardUsedList:[],//墓地
  stepName:"准备阶段",
  playingNow:"我",//当前操作的玩家
  chain:[],//连锁链
})
onMounted(()=>{
  init()
})
const init = ()=>{
  
  allMes.value.stepName = "开始阶段"
  // allMes.value.allMesMy.cardGroundList = basicCardList.getTestUsedCardList()
  allMes.value.allMesMy.monsterList = myMonster.getTestMyMonsterList()
  allMes.value.allMesMy.monsterNow = myMonster.getTestMyMonsterList()[0]
  allMes.value.allMesMy.monsterNow = myMonster.getTestMyMonsterOn()
  allMes.value.allMesMy.playerNow = {
    name: allMes.value.allMesMy.playerMes.name,
    life:100,
    lifeNow:100,
    power:3,//当前玩家的气
  }

  // allMes.value.allMesBot.cardGroundList = basicCardList.getTestUsedCardList()
  allMes.value.allMesBot.monsterList = myMonster.getTestBotList()
  allMes.value.allMesBot.monsterNow = myMonster.getTestBotList()[0]
  allMes.value.allMesBot.monsterNow = myMonster.getTestBotOn()
  allMes.value.allMesBot.playerNow = {
    name: allMes.value.allMesBot.playerMes.name,
    life:100,
    lifeNow:100,
    power:3,//当前玩家的气
  }
  allMes.value.cardList = basicCardList.getTestUsedCardList()
  allMes.value.stepName = "主要阶段"
  page.value = "battle"
 
}//初始化测试方法
const page = ref("home")
</script>
<template lang="pug">
.all-block
  .home-block(v-if = "page == 'home'")
    div 123
  .main-block(v-if = "page == 'battle'")
    .tip-block(v-if="isShowTip")
      .tip {{tipText}}
    Battlefield( :allMes="allMes")
</template>
<style scoped lang="scss">
.all-block{
    width: 100wh;
    height: 100vh;
    position: relative;
}
.tip-block{
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 10;
  .tip{
    width: 300px;
    height: 100%;
    padding: 0 100px;
    background-color: rgba(0,0,0,0.5);
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 400px;
  }
}
.main-block{
    position: absolute;
    bottom: 0;
    left: 0;
    width:500px;
    height: 400px;
    opacity:0.5;
}
.main-block:hover{
    opacity: 1;
}
</style>