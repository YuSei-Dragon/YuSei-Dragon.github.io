<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
} from 'vue'
import deskMes from "./desk.js"
import otherMethods from "./otherMethods.js"
import cardsMethods from "./cardsMethods.js"
const props = defineProps({
    playerList:{
        type:Array,
        default:[],
    },
    playMesList:{
        type:Array,
        default:[],
    },
    playerName:{
        type:String,
        default:"",
    },
    isFirst:{
      type:Boolean,
      default:false
    },//是否打开教程和提示
})
const killNum = ref(1)
//当前回合出牌人可以使用的杀的数量，每回合刷新
const myBlock = defineAsyncComponent(() =>
  import("./myBlock.vue")
)
onMounted(()=>{
  init()
})
const something = ref()
const isShowStart = ref(false)
const StartMove = ref(false)
const StartMoveEnd = ref(false)
const myHandCardList = ref([])
//我的手卡
const myBlood = ref(1000)
//我的血量
const isShowMyBlock = ref(false)
const isShowFirst = ref(false)
//要不要播放新手教程
const isShowWatchBack = ref(false)
const isShowWatchBackStyle = ref(false)
//当前选中准备要使用的手卡
const choicedCard = ref({})
const choiceMes = ref({
  // type:"player",//选取里面数据的类型 玩家/牌
  type:"",//选取里面数据的类型 玩家/牌
  list:[]//里面的数据
  // list:[1,1,1,1,1,1,1,1]//里面的数据
})

const init = async()=>{
  getData()
  isShowStart.value = true
  await wait(1000,()=>{
    StartMove.value = true
  })
  await wait(1000,()=>{
    StartMoveEnd.value = true
  })
  await wait(1000,()=>{
    isShowStart.value = false
    isShowMyBlock.value = true
  })
  // testBlood()
  if(props.isFirst){
    isShowWatchBack.value = true
    await wait(100,()=>{
    isShowWatchBackStyle.value = true
    })
    isShowFirst.value = true
  }else{
    //播放赛前发话
    showOtherWords()
    startGame()
  }
}//初始化方法
const startGame = async()=>{
  const firstPlay = Math.floor(Math.random()*props.playerList.length)
  //决定第一名出牌的玩家位置
  playerDoing.value = props.playerList[firstPlay]
  //记录当前出牌的人
  console.log("当前先攻：",playerDoing.value)
  await wait(2700*(props.playerList.length-1),()=>{
    turnChange(playerDoing.value,firstPlay)
  })//决定先后攻 
}
const testBlood = ()=>{
  wait(1000,()=>{
    myBlood.value = 500
  })
}//测试血量动画
const wait = (howLong,method)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      method()
      resolve(howLong)
      // console.log(method)
    },howLong)
  })
}//同步化
const desk = ref([])
//公用卡组
const HandCardList = ref([])
//除我以外全有人手卡集合
//我的手卡
const getData = ()=>{
  desk.value = deskMes.getDesk()
  console.log(desk.value)
  props.playerList.forEach(item=>{
    if(item == props.playerName){
      myHandCardList.value = [
          {name:"杀",attribute:"金",text:"对其他玩家发起一次攻击，可以被闪抵消",id:1},
        ]
      // getCard(6)
    }else{
      HandCardList.value.push({
        name:item,
        list:getCard(6),
        life: 1000,
      })
    }
  })
  // console.log(HandCardList.value)
  otherBlockList.value = otherMethods.getOtherBlockPosition(props.playerList.length-1)
  //设置其他玩家的位置
}//初始化卡组和 所有玩家的手卡 生命值
const getCard = (num)=>{
  let result = []
  let cardDesk = []
  desk.value.forEach((item,index)=>{
    if(index<num){
      result.push(item)
    }else{
      cardDesk.push(item)
    }
  })
  desk.value = cardDesk
  return result
}//从卡组中抽卡
const getStartBlock = ()=>{
  let result = ""
  if(StartMove.value){
    result+="opacity:1;left:50%;"
  }else{
    result+="opacity:0.2;left:-100px;"
  }
  if(StartMoveEnd.value){
    result = ""
    result+="opacity:0;left:100%"
  }
  return result
}//fight开场动画
const getMyBlockStyle = ()=>{
  let result = ""
  if(isShowMyBlock.value){
    result+= "bottom:0;opacity:1;"
  }else{
    result+="bottom:-100px;opacity:0.2;"
  }
  return result
}//获取我的手卡范围的style
const otherBlockList = ref([])
const getOtherBlockStyle = (otherBlock)=>{
  let result = ""
  result+="top:"+otherBlock.top+"px;left:"+otherBlock.left+"px;"
  if(isShowMyBlock.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0.1;"
  }
  return result
}//获取other手卡范围的style
const getOtherCardsName = (indexFind)=>{
  let result = ""
  HandCardList.value.forEach((item, index )=>{
    if(indexFind==index){
      result = item.name
    }
  })
  return result
}//获取other的名字
const getOtherCardsNum = (indexFind)=>{
  let result = ""
  HandCardList.value.forEach((item, index )=>{
    if(indexFind==index){
      result = item.list.length
    }
  })
  return result
}//获取other 的手卡数量
const getOtherCardsLife = (indexFind)=>{
  let result = ""
  HandCardList.value.forEach((item, index )=>{
    if(indexFind==index){
      result = item.life
    }
  })
  return result
}//获取other的生命值
const getOtherCardsLifeStyle = (indexFind)=>{
  let num = 0
  let result = ""
  HandCardList.value.forEach((item, index )=>{
    if(indexFind==index){
      num = item.life
    }
  })
  result+="width:"+(num/10)+"%;"
  // console.log(result)
  return result
}//获取other的生命值长度
const getWatchBack = ()=>{
  let result = ""
  if(isShowWatchBackStyle.value){
    result+="opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}//获取低亮度背景
const tipText = ref("")
//提示文字
const tipChoice = ref("背景设定")
const getWatchChoiceStyle = (name)=>{
  let result = ""
  if(name == tipChoice.value){
    result+="background: #fff;border-radius: 4px;color: #888dd3;"
  }else{
    //
  }
  if(name == "规则介绍"){
    result+="width:34%;"
  }
  return result
}//获取新手提示三个选项的style
const changeTipChoice = (name)=>{
  console.log(name)
  tipChoice.value = name
}//改变新手提示的文本
const getTipText = ()=>{
  if(tipChoice.value=="背景设定"){
    return otherMethods.getStory()
  }
}//获取新手提示文字
const closeNewPlayBlock = async()=>{
  isShowFirst.value = false
  isShowWatchBackStyle.value = false
  await wait(300,()=>{
    isShowWatchBack.value = false
    showOtherWords()
    //展示other的赛前放话
  })
  startGame()
}//关闭新手提示
const playerDoing = ref("")
const showOtherWords = ()=>{
  props.playerList.forEach((item)=>{
    showOtherWordsByname(item)
  })
}//根据流程一个一个发话
const isMyTrun = ref(false)
const canChangeTurn = ref(true)
const turnChange = async(playerDoing,playerIndex)=>{
  if(canChangeTurn.value){
    canChangeTurn.value = false
    console.log(playerDoing,playerIndex)
    StartTrun()
    //加载回合开始动画
    killNum.value = 1
    //重置每个人回合开始可以出的杀的数量
    await wait(2000,()=>{
      //等待2秒，让回合开始动画放完
      if(playerDoing==props.playerName){
        console.log("到我出牌了")
      //如果是 我 出牌
      isMyTrun.value = true

      
      }else{
        //电脑玩家出牌
        console.log("到电脑出牌了")
        isMyTrun.value = false
        botUseCard()

      }
      canChangeTurn.value = true
    })
    
  }
  
}
const botUseCard = ()=>{
  //电脑的公用逻辑(不考虑技能)
  if(false){
    //
  }else{
    botEndTurn()
  }
}
const botEndTurn = async()=>{
  //电脑结束回合
  //播放结束回合动画
  EndTrun()
  await wait(2000,()=>{
    //等待2秒让动画放完
    // console.log(playerDoing.value)
    for(let playerIndex = 0 ; playerIndex< props.playerList.length; playerIndex++){
      if(props.playerList[playerIndex] == playerDoing.value){
        if((playerIndex+1)<props.playerList.length){
          //如果不是最后一个
          playerDoing.value = props.playerList[playerIndex+1]
          turnChange(playerDoing.value,playerIndex+1)
          break
        }else{
          //是最后一个
          playerDoing.value = props.playerList[0]
          turnChange(playerDoing.value,0)
          break
        }
      }
    }
  })
}
const StartTrun = async()=>{
  console.log(playerDoing.value,111)
  await wait(300,()=>{
    isShowTurnChange.value = true
  })
  await wait(300,()=>{
    isShowTurnChangeStyle.value = true
  })
  await wait(1000,()=>{
    isShowTurnChangeStyle.value = false
  })
  await wait(300,()=>{
    isShowTurnChange.value = false
  })
  console.log(playerDoing.value,222)
}
const isShowOtherWords = ref(false)
const otherWordText = ref("")
const otherWordName = ref("")
const isShowOtherWordsStyle = ref(false)
const showOtherWordsByname = async(name)=>{
  let word = otherMethods.getWordsTextByName(name)
  await wait(300,()=>{
    otherWordText.value = word
    otherWordName.value = name
    isShowOtherWords.value = true
  })
  await wait(100,()=>{
    isShowOtherWordsStyle.value = true
  })
  await wait(2000,()=>{
    isShowOtherWordsStyle.value = false
  })
  await wait(300,()=>{
    isShowOtherWords.value = false
  })
}//根据名字进行发话的数据设置
const getOtherWordBlockStyle = ()=>{
  let result = ""
  if(isShowOtherWordsStyle.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}
const isShowTurnChange = ref(false)
const isShowTurnChangeStyle = ref(false)
const getTurnChangeStyle = ()=>{
  let result = ""
  if(isShowTurnChangeStyle.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}
const waitMe = ref(false)//敌方是否正在等待我出牌
const isShowChoiceBlock = ref(false)
const choiceBlockStyle = ref(false)
const myUseCards = (card)=>{
  if(isShowSureButton.value==true&&card.id == choicedCard.value.id){
    cancelSureButtons()
    //如果已经点过，再点就是清除
  }else{
    ButtonblockStyle.value = false
    choiceBlockStyle.value = false
    isShowSureButton.value = false
    isShowChoiceBlock.value = false
    if(isMyTrun.value){
      choicedCard.value = card
      //更新选中的卡牌
      console.log("我在我的回合内准备使用"+ card.name)
      if(cardsMethods.meCanUse(card)){
        if(cardsMethods.meCanUseWithoutChoice(card)){
          //如果可以直接发动
          showSure(true)
        }else{
          //需要选取目标
          showChoiceBlock()
          showSure(false)
        }
      }else{
        //不满足发动条件
      }
    }else{
      console.log("我在我的回合外准备使用"+ card.name)
      if(waitMe.value){
        //如果正在敌方回合等待我出牌
      }else{
        //无事发生
      }
    }
  }
  
}
const showChoiceBlock = async() =>{
  isShowChoiceBlock.value = true
  await wait(100,()=>{
    choiceBlockStyle.value = true
  })
}
const showSureButton = ref(true)//控制确认按钮能不能直接点
const isShowSureButton = ref(false)
const ButtonblockStyle = ref(false)
const showSure = async(isShow)=>{
  if(isShow){
    showSureButton.value = true
  }else{
    showSureButton.value = false
  }
  isShowSureButton.value = true
  await wait(100,()=>{
    ButtonblockStyle.value = true
  })
}
const getSureButtonsStyle = ()=>{
  let result = ""
  if(showSureButton.value == true){
    //
  }else{[
    result += "cursor:not-allowed"//显示表现为无法点击,必须选取了目标才能点
  ]}
  return result
}
const choicePlayer = (player)=>{
  showSureButton.value = true //选中目标 解开确认按钮的封锁
}
const choiceSureClick = ()=>{
  if(showSureButton.value==false){
    //如果按钮没解锁就拦截住
    console.log("需要先选择目标，再确认发动！")
  }else{
    //正常提交
  }
}
const isShowTurnEnd = ref(false)
const isShowTurnEndStyle = ref(false)
const getTurnEndStyle = ()=>{
  let result = ""
  if(isShowTurnEndStyle.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}
const getChoiceBlockStyle = ()=>{
  let result = ""
  if(choiceBlockStyle.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}
const EndTrun = async()=>{
  await wait(300,()=>{
    isShowTurnEnd.value = true
  })
  await wait(300,()=>{
    isShowTurnEndStyle.value = true
  })
  await wait(1000,()=>{
    isShowTurnEndStyle.value = false
  })
  await wait(300,()=>{
    isShowTurnEnd.value = false
  })
}
const enMyTurn = async()=>{
  //结束我的回合
  if(isMyTrun.value){
    EndTrun()//播放结束动画
    await wait(2000,()=>{
      //等待2秒让动画放完
      // console.log(playerDoing.value)
      for(let playerIndex = 0 ; playerIndex< props.playerList.length; playerIndex++){
        if(props.playerList[playerIndex] == playerDoing.value){
          if((playerIndex+1)<props.playerList.length){
            //如果不是最后一个
            playerDoing.value = props.playerList[playerIndex+1]
            turnChange(playerDoing.value,playerIndex+1)
            break
          }else{
            //是最后一个
            playerDoing.value = props.playerList[0]
            turnChange(playerDoing.value,0)
            break
          }
        }
      }
    })
  }else{
    console.log("当前不是我的回合，无法结束回合！")
  }
}
const getSureButtonsBlockStyle = ()=>{
  let result = ""
  if(ButtonblockStyle.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}
const cancelSureButtons = async()=>{
  ButtonblockStyle.value = false
  choiceBlockStyle.value = false
  await wait(300,()=>{
    isShowSureButton.value = false
    isShowChoiceBlock.value = false
  })
}

</script>
<template lang="pug">
  .background
    .start-block(v-if="isShowStart" :style="getStartBlock()") fight
    myBlock(class="my-block" :style="getMyBlockStyle()" :myCardsList="myHandCardList" :bloodNum="myBlood" @myUseCards="myUseCards" @enMyTurn="enMyTurn")
    .other-block(v-for="(otherBlock,index) in otherBlockList" :style="getOtherBlockStyle(otherBlock)" :key="index")
      .other
        .other-card-name {{getOtherCardsName(index)}}
        .other-card-num {{getOtherCardsNum(index)}}
        .other-card-life-block(:style="getOtherCardsLifeStyle(index)")
        .other-card-life {{getOtherCardsLife(index)}}
    .watch-back(v-if="isShowWatchBack" :style="getWatchBack()")
    .newplay-watch(v-if="isShowFirst")
      .newplay-watch-title 新手提示
      .newplay-watch-text {{getTipText()}}
      .newplay-watch-choice-block
        .newplay-watch-choice(:style="getWatchChoiceStyle('背景设定')" @click="changeTipChoice('背景设定')") 背景设定
        .newplay-watch-choice(:style="getWatchChoiceStyle('规则介绍')" @click="changeTipChoice('规则介绍')") 规则介绍
        .newplay-watch-choice(:style="getWatchChoiceStyle('属性克制')" @click="changeTipChoice('属性克制')") 属性克制
    .newplay-watch-close(v-if="isShowFirst" @click="closeNewPlayBlock()") ×
    .other-word-text-block(v-if="isShowOtherWords" :style="getOtherWordBlockStyle()")
      .other-word-text-block1
        .other-word-text {{otherWordText}}
    .other-word-name(v-if="isShowOtherWords" :style="getOtherWordBlockStyle()") {{otherWordName}}
    .turn-change-block(v-if="isShowTurnChange" :style="getTurnChangeStyle()")
      .turn-change
        .turn-change-left-h
        .turn-change-left-v
        .turn-change-right-h
        .turn-change-right-v
        .turn-change-text {{playerDoing}}的回合
    .turn-change-block(v-if="isShowTurnEnd" :style="getTurnEndStyle()")
      .turn-change
        .turn-change-left-h
        .turn-change-left-v
        .turn-change-right-h
        .turn-change-right-v
        .turn-change-text {{playerDoing}}的回合结束
    .sure-buttons-block(v-if="isShowSureButton" :style="getSureButtonsBlockStyle()")
      .sure-buttons-sure(:style="getSureButtonsStyle()" @click="choiceSureClick()") 确认
      .sure-buttons-cancel(@click="cancelSureButtons()") 取消
    .choice-block(v-if="isShowChoiceBlock" :style="getChoiceBlockStyle()")
      .choice-player-block(v-if="choiceMes.type=='player'")
        .choice-player(v-for="player in choiceMes.list" @click="choicePlayer(player)")
      .choice-card-block(v-if="choiceMes.type=='card'")
        .choice-card(v-for="card in choiceMes.list")

</template>
<style scoped lang="scss">
.background{
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.3s;
  overflow: hidden;
  .start-block{
    position: absolute;
    top:42%;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    transition: 0.3s;
    transform: translate(-50%);
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  }
  .my-block{
    position: absolute;
    left: 0;
    height: 100px;
    width: 500px;
    background: #f5f2f9;
    transition: 0.3s;
  }
  .other-block{
    position: absolute;
    width: 100px;
    height: 100px;
    background: #e2dbe9;
    transition: 0.3s;
    .other{
      position: relative;
      width: 100%;
      height: 100%;
      .other-card-num{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        height: 16px;
        width: 16px;
        text-align: center;
        color: #d59898;
      }
      .other-card-name{
        position: absolute;
        left: 4px;
        bottom: 0px;
        font-size: 12px;
        height: 20px;
        color: #d59898;
      }
      .other-card-life-block{
        position: absolute;
        background: #eee;
        left: 0;
        bottom: 20px;
        height: 2px;
      }
      .other-card-life{
        position: absolute;
        font-size: 10px;
        left: 4px;
        bottom: 22px;
        color: #d59898;
      }
    }
  }
  .watch-back{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgb(110 110 110 / 34%);
    transition: 0.3s;
  }
  .newplay-watch{
    position: absolute;
    z-index: 101;
    top: 100px;
    left: 100px;
    width: 300px;
    height: 200px;
    background: #f3eff9;
    border-radius: 12px;
    overflow: hidden;
    .newplay-watch-title{
      width: 100%;
      padding: 4px;
      text-align: center;
      color: #ff9e9e;
      height: 22px;
    }
    .newplay-watch-text{
      width: 100%;
      height: 140px;
      color: #b7b7ce;
      font-size: 10px;
      overflow: auto;
      padding-left: 6px;
      text-indent: 20px;
    }
    .newplay-watch-text::-webkit-scrollbar {
        width: 17px;
    }
    .newplay-watch-text::-webkit-scrollbar-corner {
        background: rgba(0,0,0,0);
    }
    .newplay-watch-text::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 6px;
        border: 4px solid rgba(0,0,0,0);
        background-clip: content-box;
        min-width: 32px;
        min-height: 32px;
    }
    .newplay-watch-text::-webkit-scrollbar-track {
        background-color: rgba(0,0,0,0);
    }
    .newplay-watch-choice-block{
      width: 100%;
      height: 30px;
      .newplay-watch-choice{
        float: left;
        width: 33%;
        height: 100%;
        text-align: center;
        line-height: 30px;
        color: #c1a8bf;
        font-size: 12px;
      }
      .newplay-watch-choice:hover{
        cursor: pointer;
        background: #f3fbff;
        border-radius: 4px;
        color: #888dd3;
      }
    }
  }
  .newplay-watch-close{
    position: absolute;
    top: 80px;
    right: 80px;
    width: 20px;
    height: 20px;
    font-size: 24px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    z-index: 101;
  }
  .newplay-watch-close:hover{
    cursor: pointer;
  }
  .other-word-text-block{
    position: absolute;
    left: 0;
    top: 100px;
    height: 100px;
    width: 100%;
    text-align: center;
    padding: 40px 0;
    background: linear-gradient(to bottom, transparent, #fff, transparent);
    z-index: 101;
    transition: 0.3s;
    .other-word-text-block1{
      width:100%;
      height: 100%;
      position: relative;
      .other-word-text{
        font-size: 16px;
        transform: translateY(-50%);
        width: 75%;
        text-align: right;
        position: absolute;
        top: 50%;
        left: 0;
        color: #ffb9b9;
      }
    }
  }
  .other-word-name{
    position: absolute;
    right: 15%;
    top: 100px;
    width: 14px;
    font-size: 14px;
    z-index: 101;
    color: #b44c4c;
  }
  .turn-change-block{
    position: absolute;
    top: 120px;
    left: 0;
    width: 300px;
    height: 100px;
    padding: 0 100px;
    transition: 0.3s;
    .turn-change{
      width: 100%;
      height: 100%;
      position: relative;
      .turn-change-left-h{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 1px;
        width: 20px;
        background: #aaa;
      }
      .turn-change-left-v{
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        height: 20px;
        width: 1px;
        background: #aaa;
      }
      .turn-change-right-h{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 1px;
        width: 20px;
        background: #aaa;
      }
      .turn-change-right-v{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        height: 20px;
        width: 1px;
        background: #aaa;
      }
      .turn-change-text{
        width: 100%;
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        text-align: center;
        color: #8db3ff;
      }
    }
  }
  .sure-buttons-block{
    position: absolute;
    bottom: 104px;
    right: 0;
    width: 200px;
    height: 30px;
    // background: #fff;
    transition: 0.3s;
    .sure-buttons-sure{
      float: left;
      width: 80px;
      height: 30px;
      border: 1px #ddd solid;
      border-radius: 6px;
      text-align: center;
      line-height: 30px;
      background: #c6c8e7;
      margin-left: 16px;
      color: #fff;
    }
    .sure-buttons-sure:hover{
      cursor: pointer;
    }
    .sure-buttons-cancel{
      float: left;
      width: 80px;
      height: 30px;
      border: 1px #ddd solid;
      border-radius: 6px;
      text-align: center;
      line-height: 30px;
      background: #e0c5c5;
      margin-left: 16px;
      color: #fff;
    }
    .sure-buttons-cancel:hover{
      cursor: pointer;
    }
  }
  .choice-block{
    position: absolute;
    bottom: 150px;
    right: 100px;
    width: 300px;
    height: 200px;
    background: rgba(255, 255, 255, 0.662745098);
    transition: 0.3s;
    z-index: 10;
    border-radius: 6px;
    .choice-player-block{
      padding-left: 5px;
      .choice-player{
        margin-right: 4px;
        margin-top: 4px;
        width: 68px;
        height: 93px;
        border: 1px #d3d3d3 solid;
        border-radius: 6px;
        float: left;
      }
    }
  }
}
</style>