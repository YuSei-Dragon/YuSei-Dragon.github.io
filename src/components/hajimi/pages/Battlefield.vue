<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
import basicCardList from '@/components/hajimi/basicCardList.js'
import fightMethods from '@/components/hajimi/fightMethods.js'
import cardMethod from '../cardMethod'
const Botfield = defineAsyncComponent(() =>
  import("./Battlefield/Botfield.vue")
)
const Myfield = defineAsyncComponent(() =>
  import("./Battlefield/Myfield.vue")
)
const Step = defineAsyncComponent(() =>
  import("./Battlefield/Step.vue")
)
const FightGround = defineAsyncComponent(() =>
  import("./Battlefield/FightGround.vue")
)
const ChainDialog = defineAsyncComponent(() =>
  import("./Battlefield/chainDialog.vue")
)
const ChangeMonsterDialog = defineAsyncComponent(() =>
  import("./Battlefield/changeMonsterDialog.vue")
)
const props = defineProps({
    allMes:{
        type:Object,
        default:{},
    },
})
const allMes = ref({})
const dialogCallback = ref(null)
const isShowChainDialog = ref(false)
onMounted(()=>{
  fightMethods.showChainDialog = (allMes,callBack)=>{
    if (typeof callBack === 'function') {
      allMes.value = {...allMes.value}
      //刷新连锁链
      dialogCallback.value = callBack
      isShowChainDialog.value = true
      console.log("连锁链初始化状态",allMes.chain)
    } else {
      console.error("callBack不是一个函数")
    }
  }
  cardMethod.showChainDialog = (allMes,callBack)=>{
    if (typeof callBack === 'function') {
      allMes.value = {...allMes.value}
      //刷新连锁链
      dialogCallback.value = callBack
      isShowChainDialog.value = true
      console.log("连锁链初始化状态",allMes.chain)
    } else {
      console.error("callBack不是一个函数")
    }
  }
  init()
})
const init = ()=>{
  allMes.value = {
    ...props.allMes,
    // cardList : basicCardList.getAllCardList(),
    cardList : basicCardList.getTestAllCardList(),
  }
  allMes.value = basicCardList.drawCard(allMes.value,"allMesMy",4)
  allMes.value = basicCardList.drawCard(allMes.value,"allMesBot",4)
  // console.log(allMes.value)
  //默认开局双方摸4
  //决定先后攻
  turnStart(fightMethods.whoFirst(allMes.value))
}
const isShowStep = computed(()=>{
  console.log(props.allMes.playingNow === props.allMes.allMesMy.playerNow.name)
  if(props.allMes.playingNow === props.allMes.allMesMy.playerNow.name){
    return true
  }
  return false
})
const choiceCard = (data)=>{
  //选择卡的外部接收方法
  //得到卡牌/技能的名称
  //二次获取详细信息
  step.value.setType("card")
  step.value.resetChoiced(data.data)
  step.value.resetChoicedCover(data.data)
  step.value.choiceCardIndex(data.index)
  // console.log(data)
}//手卡选中
const choiceSkill = (data)=>{
  //选择技能的外部接收方法
  //得到技能的名称
  //二次获取详细信息
  step.value.setType("skill")
  step.value.resetChoiced(data.data)
  step.value.choiceCardIndex(data.index)
  // console.log(data)
}//技能选中
const choiceCardCover = (data)=>{
  step.value.setType("cardCover")
  step.value.resetChoiced(data.data)
  step.value.choiceCardIndex(data.index)
  // console.log(data)
}//盖卡选中
const fightGround = ref(null)
const step = ref(null)
const changeStep = (data)=>{
  allMes.value.stepName = data
  if(data === "结束阶段"){
    //如果我方点击结束阶段，则结束我方回合，进入对方回合
    showTip("我方结束回合")
    waitToDo(1000,async()=>{
      allMes.value.playingNow = allMes.value.allMesBot.playerMes.name
      //当前操作玩家改变
      allMes.value = await fightMethods.botTurn(allMes.value)
      showTip("对方结束回合")
      allMes.value = await fightMethods.myTurn(allMes.value)
      //我方回合开始的处理
      console.log("我方回合开始处理完毕")
      allMes.value.playingNow = allMes.value.allMesMy.playerMes.name
      //当前操作玩家改变
    })
  }
}//阶段控制方法
const turnStart = async(data)=>{
  //回合开始
  allMes.value.playingNow = data
  allMes.value.stepName = "主要阶段"
  allMes.value.roundNum++
  // console.log(data+"的回合")
  showTip(data+"的回合")
  if(data === allMes.value.allMesMy.playerNow.name){
    //如果是我方回合，则先执行我方回合
    allMes.value = await fightMethods.myTurn(allMes.value)
  }else{
    //如果是对方回合，则先执行对方回合
    allMes.value = await fightMethods.botTurn(allMes.value)
    showTip( "对方结束回合")
    allMes.value = await fightMethods.myTurn(allMes.value)
  }
}
const showTip = (text)=>{
  store.commit("setBullFightTip",text)
}
const pending = ref(false)
const waitToDo = async(time,fun)=>{
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
    if (typeof fun === 'function') {
        await fun();
    }
}
const chainYes = (allMes)=>{
  console.log("连锁链确认后状态",allMes.chain)
  if (dialogCallback.value) {
    // 正确调用回调函数
    dialogCallback.value(allMes);
    // 调用完成后关闭弹窗并清空回调
    setTimeout(() => {
      isShowChainDialog.value = false;
      dialogCallback.value = null;
    }, 100);
  }
}
const chainNo = (allMes)=>{
  if (dialogCallback.value) {
    // 正确调用回调函数
    dialogCallback.value(allMes);
    // 调用完成后关闭弹窗并清空回调
    setTimeout(() => {
      isShowChainDialog.value = false;
      dialogCallback.value = null;
    }, 100);
  }
}
const myfield  = ref(null)
const cleanChoiced = ()=>{
  console.log("cleanChoiced")
  myfield.value.cleanChoiced()
}
const sureUse = async(data)=>{
  console.log(data)
  //使用的卡/技能数据
  cleanChoiced()//清除选中
  allMes.value = await cardMethod.useCardAndSkill(allMes.value,data)
  console.log("使用卡/技能后状态",allMes.value.chain)
  allMes.value = await cardMethod.botUseChain(allMes.value)
  console.log("本次卡牌发动连锁处理完成",allMes.value.chain)
}
const showChangeMonster = ref(false)
const changeMonster = ()=>{
  showChangeMonster.value = true
}
const cancleChange = ()=>{
  showChangeMonster.value = false
}
const changeMonsterSure = async(data)=>{
  console.log("我方换人：",data.name)
  allMes.value.allMesMy.monsterNow = data
  showChangeMonster.value = false
  showTip("我方结束回合")
  waitToDo(1000,async()=>{
    allMes.value = await fightMethods.botTurn(allMes.value)
    showTip( "对方结束回合")
    allMes.value = await fightMethods.myTurn(allMes.value)
  })
}//我方换人方法
</script>

<template lang="pug">
  .battle-block(v-loading = "pending")
    .battle-tip
    .battle-chain-block(v-show="isShowChainDialog")
      ChainDialog(:allMes="allMes"  @chainYes="chainYes" @chainNo="chainNo")
    .change-monster-block(v-show="showChangeMonster")
      ChangeMonsterDialog(:allMes="allMes" @cancleChange="cancleChange" @changeMonster="changeMonsterSure")
    .bot-block 
      Botfield(:allMes="allMes") 
    .fight-block
      FightGround(ref="fightGround" :allMes="allMes" @choiceCard="choiceCardCover")
      Step(ref="step" @changeStep="changeStep" @cleanChoiced="cleanChoiced" @sureUse="sureUse" :allMes="allMes" v-show="isShowStep")
    .me-block
      Myfield(ref="myfield" :allMes="allMes" @choiceCard="choiceCard" @choiceSkill="choiceSkill" @changeMonster="changeMonster")
</template>
<style scoped lang="scss">
.battle-block{
  width: 100%;
  height: 100%;
  position: relative;
}
 .battle-tip{
  position: absolute;
  top: 0px;
  left: 0px;
 }
.battle-chain-block{
  width: 300px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 9;
  border: 1px #ddd solid;
}
.change-monster-block{
  width: 300px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 9;
  border: 1px #ddd solid;
}
.bot-block{
  width: 100%;
  height: 80px;
}
.fight-block {
  width: 100%;
  height: 240px;
}
.me-block{
  width: 100%;
  height: 80px;
}
</style>