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
import jin from "./img/jin.png"
import mu from "./img/mu.png"
import shui from "./img/shui.png"
import huo from "./img/huo.png"
import tu from "./img/tu.png"
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
    myMonster:{
        type:Object,
        default:{
          name:"小火龙",
          level:10,
          attack:58,
          defense:48,
          life:40,
        },
    },
    myMonsterList:{
        type:Array,
        default:[{
          name:"小火龙",
          level:10,
          attack:58,
          defense:48,
          life:40,
        }],
    },
    isFirst:{
      type:Boolean,
      default:false
    },//是否打开教程和提示
})
const killNum = ref(1)
//当前回合出牌人可以使用的杀的数量，每回合刷新
const newPlayTips = defineAsyncComponent(()=>{
  return import("./FightBlockImport/newPlayTips.vue")
}
)
const myBlock = defineAsyncComponent(() =>{
  return import("./FightBlockImport/myBlock.vue")
}
)
const animation = defineAsyncComponent(() =>{
  return import("./FightBlockImport/animation.vue")
}
)
const biggerAnimation = defineAsyncComponent(() =>{
  return import("./FightBlockImport/biggerAnimation.vue")
}
)
const biggerAnimationNumberVue = defineAsyncComponent(() =>{
  return import("./FightBlockImport/biggerAnimationNumber.vue")
}
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
const isUsedDrink = ref(false)
//这回合的出牌人是否使用了酒
const haveDrinkKill = ref(false)
//这回合的出牌人的酒杀强化用过没
const isShowMyBlock = ref(false)
const isShowFirst = ref(false)
//要不要播放新手教程
const isShowWatchBack = ref(false)
const isShowWatchBackStyle = ref(false)
//当前选中准备要使用的手卡
const settlementList = ref([])
//卡牌效果等待处理区
const isShowSettle = ref(false)
//是否展示等待区
const isShowSettleStyle = ref(false)
const choicedCard = ref({})
const choiceMes = ref({
  // type:"player",//选取里面数据的类型 玩家/牌
  type:"",//选取里面数据的类型 玩家/牌
  list:[]//里面的数据
  // list:[1,1,1,1,1,1,1,1]//里面的数据
})
const restart = ()=>{
  HandCardList.value = []
  props.playerList.forEach(item=>{
    if(item == props.playerName){
      myHandCardList.value = [
      // {name:"顺手牵羊",text:"选对方一张手卡，加入我方手卡"},
      // {name:"过河拆桥",text:"选对方一张手卡，送入弃卡堆"},
      {name:"五谷丰登",text:"从卡堆翻开场上玩家数量 数量的卡，从发动者 顺时针轮流一人选一张加入手卡"},
      ]
      // getCard(6)
    }else{
      let monster
      props.playMesList.forEach(item1=>{
        if(item == item1.name){
          monster = item1
        }
      })
      HandCardList.value.push({
        name:item,
        // list:getCard(6),
        list:[
        {name:"桃",text:"回复自己场上怪兽生命值数量+100 的生命值"},
        // {name:"杀",attribute:"土",text:"对其他玩家发起一次攻击，可以被闪抵消"},
        // {name:"无懈可击",attribute:"土",text:"无效一张锦囊牌的发动 对我方造成效果"},
        ],
        life: 1000,
        firstMonster:monster.firstMonster,
        //当前选中出战的怪兽
        monsterList: monster.monsterList
        //所有怪兽数组
      })
    }
  })
  isDuelMode.value = false
  myBlood.value = 1000
  isShowMyBlock.value = true
  isShowWatchBack.value = false
  isShowWatchBackStyle.value = false
  settlementList.value = []
  isShowSettleStyle.value = false
  choicedCard.value = {}
  choiceMes.value = {
    type:"",//选取里面数据的类型 玩家/牌
    list:[]//里面的数据
  }

}

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
}//开始游戏方法
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
//除我以外全有人手卡/生命值集合
//我的手卡
const myMonster = ref({})
const myMonsterList = ref([])
//我选中的怪兽/我的怪兽数组
const getData = ()=>{
  desk.value = deskMes.getDesk()
  console.log(desk.value)
  // console.log(props.myMonster)
  myMonster.value = props.myMonster
  myMonsterList.value = props.myMonsterList
  //把数据转移出来
  props.playerList.forEach(item=>{
    if(item == props.playerName){
      myHandCardList.value = [
        {name:"杀",attribute:"金",text:"对其他玩家发起一次攻击，可以被闪抵消"},
      ]
      // getCard(6)
    }else{
      let monster
      props.playMesList.forEach(item1=>{
        if(item == item1.name){
          monster = item1
        }
      })
      HandCardList.value.push({
        name:item,
        // list:getCard(6),
        list:[
          {name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "}
        ],
        life: 1000,
        firstMonster:monster.firstMonster,
        //当前选中出战的怪兽
        monsterList: monster.monsterList
        //所有怪兽数组
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
  if(num>1000){
    num= 1000
  }
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
const playerDoing = ref("")
const showOtherWords = ()=>{
  props.playerList.forEach((item)=>{
    showOtherWordsByname(item)
  })
}//根据流程一个一个发话
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
        botUseCard(playerDoing,playerIndex)

      }
      canChangeTurn.value = true
    })
    
  }
  
}//回合转换
const botUseCard = async (playerDoing,playerIndex)=>{
  //电脑的公用逻辑(不考虑技能)
  let botcardList = []
  HandCardList.value.forEach(item=>{
    if(item.name == playerDoing){
      botcardList = item.list
    }
  })

  if(botcardList.length>0&& botCanUserCard(botcardList)){
    //如果手卡不为0 并且可以出牌
    let resIndex = botUserCardMethod(playerDoing,botcardList)
    //获取要出的卡
    console.log("bot准备使用:"+botcardList[resIndex].name)
    const withoutChoice = cardsMethods.meCanUseWithoutChoice(botcardList[resIndex])
    //是否需要选取目标才能发动
    if(withoutChoice){
      let res = await cardsMethods.botWithoutChoice(botcardList[resIndex],resIndex,playerDoing,getAllMes())
      setAllMes(res)
      if(res.userCard == "桃"){
        //不需要后续处理,只需要进行效果结算
        biggerNumberName.value = playerDoing
        //设置血量变化的对象
        biggerAnimationNumber.value = 200
        //设置血量变化的数值
        isShowBiggerAnimationNumber.value = true
        await wait(1500,()=>{
          isShowBiggerAnimationNumber.value = false
        })
      }
    }else{
      cardsMethods.botWithChoice(botcardList[resIndex],resIndex,playerDoing,getAllMes())
    }
    botUseCard(playerDoing,playerIndex)
    //自循环 继续跑直到没有牌可以出
  }else{
    botEndTurn()
  }
}//电脑使用卡逻辑
const botCanUserCard = (list)=>{
  let can = false
  list.forEach(item=>{
    if(item.name!="闪"&&item.name!="无懈可击"){
      if(item.name=="酒"&&isUsedDrink.value == true){
        //无事发生,酒不能重复喝
      }else{
        can = true
      }
    }
  })
  return can
}
//检查电脑能不能出牌
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
}//电脑结束回合方法
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
}//回合开始动画
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
}//发话样式
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
}//回合转换动画
const waitMe = ref(false)//敌方是否正在等待我出牌
const isShowChoiceBlock = ref(false)
const showChoicecanSee = ref(true)
const choiceBlockStyle = ref(false)
const myUseCards = async(card)=>{
  if(isShowSureButton.value==true&&card.id == choicedCard.value.id&&!isDuelMode.value){
    await cancelSureButtons()
    //如果已经点过，再点就是清除
  }else{
    ButtonblockStyle.value = false
    choiceBlockStyle.value = false
    isShowSureButton.value = false
    isShowChoiceBlock.value = false
    if(isMyTrun.value){
      if(isDuelMode.value){
        //决斗中，出了杀其他都不能选
        if(card.name=="杀"){
          choicedCard.value = card
          showSure(true)
        }else{
          console.log("处于决斗状态，只能出杀")
        }
      }else{
        choicedCard.value = card
        //更新选中的卡牌
        console.log("我在我的回合内准备使用"+ card.name)
        console.log(haveDrinkKill.value)
        if(cardsMethods.meCanUse(card,getAllMes())){
          if(cardsMethods.meCanUseWithoutChoice(card)){
            //如果可以直接发动
            showSure(true)
          }else{
            //需要选取目标
            getChoiceMes(card)
            showChoiceBlock()
            showSure(false)
          }
        }else{
          //不满足发动条件
        }
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
  
}//我方用卡
const myReadCard = ref({
  card:{},
  playerList:[]
})//用来记录我即将对其他玩家使用的卡
const getChoiceMes = (card)=>{
  myReadCard.value.card = card
  //选中我即将使用的卡
  if(otherMethods.getChoiceMes(card)=="card"){
    choiceMes.value.type = "card"
    choiceMes.value.list = otherMethods.getChoiceList(card)
  }else if(otherMethods.getChoiceMes(card)=="player"){
    choiceMes.value.type = "player"
    choiceMes.value.list = props.playMesList
    choiceMes.value.list.map(item=>{
      item.isChoice = false
    })
  }
}//弹窗信息，是选人还是选卡
const showChoiceBlock = async() =>{
  
  isShowChoiceBlock.value = true
  await wait(100,()=>{
    choiceBlockStyle.value = true
  })
}//选择弹窗动画
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
}//展示确认/取消按钮，并决定要不要禁用确认按钮
const showSureClose = async()=>{
  ButtonblockStyle.value = false
  await wait(100,()=>{
    isShowSureButton.value = false
  })
}//单独关闭确认框
const getSureButtonsStyle = ()=>{
  let result = ""
  if(showSureButton.value == true){
    //
  }else{[
    result += "cursor:not-allowed"//显示表现为无法点击,必须选取了目标才能点
  ]}
  return result
}//获取确认按钮样式
const choicePlayer = (player)=>{
  showSureButton.value = true //选中目标 解开确认按钮的封锁
 
  choiceMes.value.list.map(item=>{
    if(player.name == item.name){
      item.isChoice = !item.isChoice
      // console.log(item.isChoice)
      if(item.isChoice){
        if(checkCardChoiceMore()){
              //如果可以多选就不管他
        }else{
          myReadCard.value.playerList = []
          //只能单选，去掉前面选的
          if(choicedCard.value.name=="过河拆桥"||choicedCard.value.name == "顺手牵羊"){
            //目标手卡为0的时候无法发动
            let canDo = true
            HandCardList.value.forEach(item1=>{
              if(item1.name == player.name){
                if(item1.list.length<=0){
                  canDo = false
                }
              }
            })
            if(!canDo){
              showSureButton.value = false
              myReadCard.value.playerList = []
            }
          }
        }
        myReadCard.value.playerList.push(player.name) //选中我即将使用卡的对象
      }else{
        let playerList = []
        myReadCard.value.playerList.forEach(playerItem=>{
          if(player.name == playerItem){
            //不加入
          }else{
            //加入
            playerList.push(playerItem)
          }
        })
        myReadCard.value.playerList = playerList
        if(myReadCard.value.playerList.length==0){
          showSureButton.value = false
        }
      }
    }
  })
}//选择使用卡的对象
const checkCardChoiceMore = ()=>{
  return cardsMethods.checkCardChoiceMore(myReadCard.value.card)
}//检查卡的效果能不能对多人使用
const isShowBiggerAnimation = ref(false)
//是否展示 放大动画（默认出闪）
const isShowBiggerAnimationNumber = ref(false)
//是否展示 放大动画（血量变化）
const biggerName = ref("")
//放大动画使用者
const biggerText = ref("")
//放大动画的展示文字
const biggerNumberName = ref("")
//放大动画使用者(血量变化)
const biggerAnimationNumber = ref(0)
//血量变化数字
const discardCardList = ref([])
//弃牌堆的数组
const showBiggerCard = async(cardName,text)=>{
  biggerName.value = cardName
  biggerText.value = text
  isShowBiggerAnimation.value = true
  await wait(1500,()=>{
    isShowBiggerAnimation.value = false
  })
}
//放大动画的简易使用
const choiceSureClick = async()=>{
  if(showSureButton.value==false){
    //如果按钮没解锁就拦截住
    if(choicedCard.value.name=="过河拆桥"||choicedCard.value.name == "顺手牵羊"){
      console.log("不能选择没有手卡的玩家使用"+choicedCard.value.name+"!")
    }else{
      console.log("需要先选择目标，再确认发动！")
    }
  }else{
    //正常提交
  if(isDuelMode.value == true){
    console.log(choicedCard.value)
    if(choicedCard.value.name!="杀"){
      console.log("决斗中！请选择杀或者取消放弃决斗！")
      //如果选的不是杀，拦住
    }else{
      console.log("我出杀，延续决斗效果",duelPlayers.value)
      loseCardByName(duelPlayers.value.target,choicedCard.value,true)
      getOneUseDuel(duelPlayers.value.target,duelPlayers.value.user)

    }
  }else if(isNMRQMode.value ==true){
    console.log(choicedCard.value)
    if(choicedCard.value.name!="杀"&&choicedCard.value.name!="无懈可击"){
      console.log("南蛮入侵中！请选择杀/无懈可击或者取消放弃响应南蛮入侵！")
      //如果选的不是杀，拦住
    }else{
      //出杀响应南蛮入侵
      if(choicedCard.value.name == "杀"){
        await showBiggerCard(props.playerName,"杀")
      }else if(choicedCard.value.name == "无懈可击"){
        await showBiggerCard(props.playerName,"无懈可击")
      }
      await wait(1000,()=>{})
      loseCardByName(props.playerName,choicedCard.value,true)
      //将出的杀/无懈可击置入处理区
      let cardIndex = 0
      playerListSort.value.forEach((item,index)=>{
        if(item == props){
          cardIndex = index
        }
      })
      if(playerListSort.value.length>cardIndex+1){
        await DealWithNMRQ(cardIndex+1,playerListSort.value)
      }else{
        //南蛮入侵处理完成
        console.log("南蛮入侵处理完成")
        isShowSettleStyle.value = false
        await wait(300,()=>{
          settlementList.value = []
          isShowSettle.value = false
          //清空待办区
        })
      }
    }
  }else if(choiceCardType.value.name == "过河拆桥"){
    desk.value.push(choiceCardType.value.card)
    //加入弃牌堆
    othersLoseCard(choiceCardType.value.card,myReadCard.value.playerList[0])
    //去掉目标手上的卡
    choiceMes.value.list = []
    //清空数据
    choiceBlockStyle.value = false
    ButtonblockStyle.value = false
    await wait(300,()=>{
      isShowChoiceBlock.value = false
      isShowSureButton.value = false
    })//隐藏确认/取消按钮
    console.log("完成 过河拆桥 的处理")

  }else if(choiceCardType.value.name == "顺手牵羊"){
    myHandCardList.value.push(choiceCardType.value.card)
    //加入手卡
    othersLoseCard(choiceCardType.value.card,myReadCard.value.playerList[0])
    //去掉目标手上的卡
    choiceMes.value.list = []
    //清空数据
    choiceBlockStyle.value = false
    ButtonblockStyle.value = false
    await wait(300,()=>{
      isShowChoiceBlock.value = false
      isShowSureButton.value = false
    })//隐藏确认/取消按钮
    console.log("完成 顺手牵羊 的处理")
  }else if(isWGFD.value == true){
    //处理当前玩家的五谷丰登选取
    console.log("正在处理五谷丰登")
    myHandCardList.value.push(choiceCardType.value.card)
    //选中的牌加入我的手卡
    let done = false
    let list = []
    choiceMes.value.list.forEach(item=>{
      if(!done&&item.name == choiceCardType.value.card.name&&choiceCardType.value.card.attribute == item.attribute){
        //去掉选中的那张
        done = true
      }else{
        list.push(item)
        //其他的保留
      }
    })
    choiceMes.value.list = list
    //把选中的去掉
    if(WGFDindex.value+1<playerListSort.value.length){
      await wait(2000,()=>{})
      //2秒模拟思考时间
      WGFDindex.value++
      dealWGFD()
    }else{
      WGFDindex.value = 0
      //重置数据
    }
    //继续处理（如果还有的选）
  }
  else{
    if(Array.isArray(myReadCard.value.playerList)&&myReadCard.value.playerList.length>0){
      let playerList = ""
      myReadCard.value.playerList.forEach(item=>{
        if(playerList!=""){
          playerList+=","
        }
          playerList+=item
      })
      console.log("我对"+playerList+"使用了"+myReadCard.value.card.name)
      settlementList.value = []
      //清空待处理数据
      loseCardByName(props.playerName,myReadCard.value.card,true)
      //把使用的卡 从手上移出 加入待处理区
      await cancelSureButtons()
      //关闭选取框
      //关闭确认框
      
        for(let userCard of myReadCard.value.playerList){
          let cardUseRes = await cardUseMethod(props.playerName,userCard,myReadCard.value.card)
          //使用者 选取对象 使用的卡
          console.log(cardUseRes)
          if(cardUseRes.userCard == "决斗"){
            console.log(userCard + "出杀响应了决斗")
            //如果对面出杀响应
            countDuel.value = 1
            if(cardUseRes.isUserCard){
              await getOneUseDuel(userCard,props.playerName)
            }else{
              //对方不响应，处理伤害结算
              console.log(userCard+"没有响应"+props.playerName+"的决斗，开始进行伤害结算")
              biggerNumberName.value = userCard
              //设置血量变化的对象
              biggerAnimationNumber.value = -100
              //设置血量变化的数值
              isShowBiggerAnimationNumber.value = true
              await wait(1500,()=>{
                isShowBiggerAnimationNumber.value = false
              })
              console.log("我对"+ userCard +"造成了"+100 + "点伤害！")
              HandCardList.value.map(item=>{
                if(item.name == userCard){
                  item.life = item.life-100
                }
              })
              //其他玩家生命值处理
              isShowSettleStyle.value  = false
              await wait(1000,()=>{
                settlementList.value.forEach(item=>{
                  discardCardList.value.push(item.cardMes)
                })
                settlementList.value = []
                isShowSettleStyle.value  = false
                isShowSettle.value = false
                //隐藏等待区
              })
            }
            //user,target,num(当前叠加的次数)
          }else if(cardUseRes.userCard == "过河拆桥"){
            choiceCardType.value.name = "过河拆桥"
            isShowSettleStyle.value  = false
            await wait(300,()=>{
              isShowSettle.value = false
            })
            //隐藏等待区
            console.log("开始选择过河拆桥的对象",choiceMes.value)
            isShowChoiceBlock.value = true
            await wait(1000,()=>{
              choiceBlockStyle.value = true
            })
          }else if(cardUseRes.userCard == "顺手牵羊"){
            choiceCardType.value.name = "顺手牵羊"
            isShowSettleStyle.value  = false
            await wait(300,()=>{
              isShowSettle.value = false
            })
            //隐藏等待区
            console.log("开始选择顺手牵羊的对象",choiceMes.value)
            isShowChoiceBlock.value = true
            await wait(1000,()=>{
              choiceBlockStyle.value = true
            })
          }else{
            console.log(cardUseRes.isUserCard)
            if(cardUseRes.isUserCard){
            //如果出了卡进行了相应
            //则播放出卡动画
            //在这里处理被抵消后有技能可以发动的情况
            biggerName.value = userCard
            //设置展示使用者的名称
            isShowBiggerAnimation.value = true
            await wait(1500,()=>{
              isShowBiggerAnimation.value = false
              isShowSettleStyle.value = false
            })
            await wait(1000,()=>{
              settlementList.value.forEach(item=>{
                discardCardList.value.push(item.cardMes)
              })
              settlementList.value = []
              isShowSettle.value = false
              //隐藏等待区
            })
            //处理完成，处理区的卡移入弃牌堆
            // console.log(HandCardList.value,myHandCardList.value,settlementList.value,discardCardList.value)

            }else{
              //抵消后无事发生
              //如果手上没闪,则进入伤害结算，此时可以触发伤害结算时点的技能
              //伤害计算= 100*攻击者攻击力/被攻击者防御力 *（攻击怪兽生命值/被攻击怪兽生命值）
              let monster = {}
              
              HandCardList.value.forEach(item=>{
                if(item.name == userCard){
                  monster = item.firstMonster
                }
              })
              console.log(monster)
              let demage = 100* myMonster.value.attack / monster.defense * (myMonster.value.life/monster.life)
              demage = Math.floor(demage)
              if(isUsedDrink.value == true&&haveDrinkKill.value==false){
                demage+=100
                haveDrinkKill.value = true
              }
              biggerNumberName.value = userCard
              //设置血量变化的对象
              biggerAnimationNumber.value = -demage
              //设置血量变化的数值
              isShowBiggerAnimationNumber.value = true
              await wait(1500,()=>{
                isShowBiggerAnimationNumber.value = false
              })
              console.log("我对"+ userCard +"造成了"+demage + "点伤害！")
              HandCardList.value.map(item=>{
                if(item.name == userCard){
                  item.life = item.life-demage
                }
              })
              //其他玩家生命值处理
              isShowSettleStyle.value  = false
              await wait(1000,()=>{
                settlementList.value.forEach(item=>{
                  discardCardList.value.push(item.cardMes)
                })
                settlementList.value = []
                isShowSettle.value = false
                //隐藏等待区
              })
              //处理完成，处理区的卡移入弃牌堆
            }
          }
          
        }
    }else{
      //如果是不需要选取对象的卡
      let cardUseRes = await cardUseMethodWithout(props.playerName,choicedCard.value)
        //使用者 选取对象 使用的卡
        console.log(cardUseRes)
        await cancelSureButtons()
        //关闭选取框
        //关闭确认框
        if(cardUseRes.userCard == "南蛮入侵"){
          //如果有返回待办
          await loseCardByName(props.playerName,choicedCard.value,true)
          //设置并打开待办
          //开始循环
          console.log("开始处理南蛮入侵")
          playerListSort.value = cardUseRes.playerListSort
          await DealWithNMRQ(0,cardUseRes.playerListSort)
        }else if(cardUseRes.userCard == "五谷丰登"){
          console.log("开始处理五谷丰登",choiceMes.value)
          showChoiceBlock()
          //开始展示可以选的卡
          console.log(isShowChoiceBlock.value)
          loseCardByName(props.playerName,choicedCard.value,false)
          //从手牌中去掉这张卡
          desk.value.push(choicedCard.value)
          WGFDindex.value = 0
          dealWGFD()
          //五谷丰登的处理方法
        }else if(cardUseRes.userCard == "桃园结义"){
        console.log("开始处理桃园结义")
        biggerNumberName.value = "全体玩家"
        //设置血量变化的对象
        biggerAnimationNumber.value = 200
        //设置血量变化的数值
        isShowBiggerAnimationNumber.value = true
        await wait(1500,()=>{
          isShowBiggerAnimationNumber.value = false
        })
        desk.value.push(choicedCard.value)
        loseCardByName(props.playerName,choicedCard.value,false)
        console.log(desk.value)
        } else{
          await loseCardByName(props.playerName,choicedCard.value,false)
        }
    }
  }
  }
}//提交使用卡
const playerListSort = ref([])
const loseCardByName = async(name,card,isWait=true)=>{
  //需要手动处理进入弃卡堆
  let myHand = []
  let find = true
  myHandCardList.value.forEach(async(item)=>{
    if(card.name == item.name&&item.attribute == card.attribute&&find){
      //去掉使用的卡
      //把使用的卡放进待处理位置
      if(isWait){
        settlementList.value.push({
          card: card.name,
          cardMes:card,
          user:name,
        })
        isShowSettle.value = true//展现待处理位置
        await wait(1000,()=>{
          isShowSettleStyle.value = true
        })
        
      }
      //如果需要后续处理,加入待办位置
      find = false//避免出现重复去除
    }else{
      myHand.push(item)//收集其他所有不使用的手卡
    }
  })
  myHandCardList.value = myHand//更新我的手卡
  console.log( settlementList.value,myHandCardList.value)
}//我使用卡的逻辑处理
const checkHaveCard = (card,handList)=>{
  let result = false
  handList.forEach(item=>{
      if(item.name == card){
        result = true
      }
    })
    return result
}
const countDuel = ref(0)
//记录决斗一共出了几张卡
const getOneUseDuel = async(user,target)=>{
  countDuel.value++
  let canDo = false
  if(target == props.playerName){
    myHandCardList.value.forEach(item=>{
      if(item.name=="杀"){
        canDo = true
      }
    })
    //检查我手上有没有杀
  }else{
    HandCardList.value.forEach(item=>{
      if(item.name == target){
        item.list.forEach(item1=>{
          if(item1.name=="杀"){
            canDo = true
          }
        })
      }
    })
  }//检查被决斗的对象有没有杀
  if(canDo){
    console.log(target+"手上还有杀，正在思考是否继续决斗")
    if(target == props.playerName){
      isDuelMode.value = true
      showSureButton.value = false
      isShowSureButton.value = true
      await wait(300,()=>{
        ButtonblockStyle.value = true
      })
      duelPlayers.value = {
        user:user,
        target:target
      }
    }else{
      //处理其他玩家的事项
      console.log("等待其他玩家的处理")
      ButtonblockStyle.value = false
      await wait(300,()=>{
        isShowSureButton.value = false
      })//隐藏确认/取消按钮
      let haveFind = false
      HandCardList.value.map(item=>{
        if(item.name == target){
          let list = []
          item.list.forEach(item1=>{
            if(item1.name=="杀"&&!haveFind){
              settlementList.value.push(
                {
                  card: item1.name,
                  cardMes:item1,
                  user:target,
                }
              )
              console.log(target+"继续出杀响应决斗!")
              haveFind = true
            }else{
              list.push(item1)
            }
          })
          item.list = list
        }
      })
      duelPlayers.value = {
        user:target,
        target:user
      }
      getOneUseDuel(duelPlayers.value.user,duelPlayers.value.target)

    }
  }else{
    await wait(1000,()=>{
      //模拟处理时间
    })
    console.log(target+"手上没有杀，进入伤害结算")
    let demage = 0
    if(target == props.playerName){
      myBlood.value-= 100*countDuel.value
      demage = 100*countDuel.value
    }else{
      HandCardList.value.map(item=>{
        if(item.name == target){
          item.life-= 100*countDuel.value
          demage = 100*countDuel.value
        }
      })
    }
    biggerNumberName.value = target
    //设置血量变化的对象
    biggerAnimationNumber.value = -demage
    //设置血量变化的数值
    isShowBiggerAnimationNumber.value = true
    await wait(1500,()=>{
      isShowBiggerAnimationNumber.value = false
    })
    await wait(1000,()=>{
      settlementList.value.forEach(item=>{
        discardCardList.value.push(item.cardMes)
      })
      settlementList.value = []
      isShowSettleStyle.value  = false
      //隐藏等待区
      ButtonblockStyle.value = false
      choiceBlockStyle.value = false
    })
    await wait(300,()=>{
      isShowSettle.value = false
      isShowSureButton.value = false
      isShowChoiceBlock.value = false
    })//隐藏确认/取消按钮和弹窗
  }
}//决斗的处理函数
const duelPlayers  = ref({
  user:"",
  target:""
})
const cardUseMethodWithout = async(user,card)=>{
  await showBiggerCard(user,card.name)
  
  let allMes = await cardsMethods.cardUseMethodWithout(user,card,getAllMes())
  if(allMes.resNum!=0){
    biggerNumberName.value = user
    //设置血量变化的对象
    biggerAnimationNumber.value = allMes.resNum
    //设置血量变化的数值
    isShowBiggerAnimationNumber.value = true
    await wait(1500,()=>{
      isShowBiggerAnimationNumber.value = false
    })
  }

  console.log(allMes)
  setAllMes(allMes)
  return allMes
}
const getSettleStyle = ()=>{
  if(isShowSettleStyle.value){
    return "opacity:1;"
  }else{
    return "opacity: 0;"
  }
}
const isShowAnimation = ref(false)
const isShowAnimationText = ref("")
const killName = ref("")
const killedName = ref("")
//是否开启使用卡的动画
const cardUseMethod = async(user,target,card)=>{
  console.log("使用卡",user,target,card)
  isShowAnimationText.value = card.name
  killName.value = user
  killedName.value = target
  isShowAnimation.value = true
  let allMes = await cardsMethods.cardUseMethod(user,target,card,getAllMes())
  console.log(allMes)
  setAllMes(allMes)
  await wait(1000,()=>{
    isShowAnimation.value = false
  })
  return allMes
//涉及cardsMethods的方法必须加await进行同步
}//卡牌效果执行
const getAllMes = ()=>{
  return {
    otherPlayerMes: HandCardList.value,
    //其他玩家 的所有数据
    myMes:{
      life: myBlood.value,
      handCard:myHandCardList.value,
      monster:myMonster.value,
      //选中怪兽
      monsterList:myMonsterList.value
      //我有的怪兽数组
    },
    cardList: desk.value,
    //公共卡组
    settlementList:settlementList.value,
    // 待办列表,用于存放准备进行处理的卡
    isUserCard: false,
    userCard:"",
    //如果有使用响应的卡,就保存在这里
    resNum: 0,
    //如果有需要返回的Number，就放在这里
    isUsedDrink: isUsedDrink.value,
    //是否使用了酒
    haveDrinkKill: haveDrinkKill.value,
    //酒的强化效果本回合用了没
    playerList:props.playerList,
    //所有玩家
    playerListSort:[],
    //所有玩家顺序
    isShowChoiceBlock:isShowChoiceBlock.value,
    //是否展示可选 玩家/牌
    choiceBlockStyle:choiceBlockStyle.value,
    //展示可选动画
    showChoicecanSee:showChoicecanSee.value,
    //可选的 牌 是否可看到具体是什么
    choiceMes: choiceMes.value,
    //当前待选的 数据 和类型
  }
}//获取所有数据
const setAllMes = (allMes)=>{
  HandCardList.value = allMes.otherPlayerMes
  myBlood.value = allMes.myMes.life
  myHandCardList.value = allMes.myMes.handCard
  myMonster.value = allMes.myMes.monster
  myMonsterList.value = allMes.myMes.myMonsterList
  desk.value = allMes.cardList
  settlementList.value = allMes.settlementList
  isUsedDrink.value = allMes.isUsedDrink
  haveDrinkKill.value = allMes.haveDrinkKill
  isShowChoiceBlock.value = allMes.isShowChoiceBlock
  choiceBlockStyle.value = allMes.choiceBlockStyle
  showChoicecanSee.value = allMes.showChoicecanSee
  choiceMes.value = allMes.choiceMes
  playerListSort.value = allMes.playerListSort
}//设置所有数据
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
}//结束回合的样式
const getChoiceBlockStyle = ()=>{
  let result = ""
  if(choiceBlockStyle.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}//选择弹窗的样式
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
}//回合结束的动画
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
}//结束我的回合
const getSureButtonsBlockStyle = ()=>{
  let result = ""
  if(ButtonblockStyle.value){
    result+= "opacity:1;"
  }else{
    result+="opacity:0;"
  }
  return result
}//确认按钮的动画样式
const isDuelMode = ref(false)
//是否处于决斗状态
const isNMRQMode = ref(false)
//是否处于南蛮入侵状态
const cancelSureButtons = async()=>{
  if(isDuelMode.value){
    console.log(duelPlayers.value.target+"放弃继续决斗，开始进行伤害结算")
    biggerNumberName.value = duelPlayers.value.target
    //设置血量变化的对象
    biggerAnimationNumber.value = -(100*countDuel.value)
    //设置血量变化的数值
    isShowBiggerAnimationNumber.value = true
    await wait(1500,()=>{
      isShowBiggerAnimationNumber.value = false
    })
    console.log(duelPlayers.value.user+"对"+ duelPlayers.value.target +"造成了"+biggerAnimationNumber.value + "点伤害！")
    myBlood.value+=biggerAnimationNumber.value
    //我的生命值处理
    isShowSettleStyle.value  = false
    await wait(1000,()=>{
      settlementList.value.forEach(item=>{
        discardCardList.value.push(item.cardMes)
      })//加入弃牌堆
      settlementList.value = []
      isShowSettle.value = false
      //隐藏等待区
    })
    isDuelMode.value = false
    //重置决斗状态

  }
  ButtonblockStyle.value = false
  choiceBlockStyle.value = false
  await wait(300,()=>{
    isShowSureButton.value = false
    isShowChoiceBlock.value = false
  })//隐藏确认/取消按钮和弹窗
}//点击取消按钮的消失动画
const getChoiceListStyle = (player)=>{
  let result = ""
  if(player.isChoice){
    result+="background:rgb(255 243 243)"
  }
  return result
}//选择弹窗内选中样式
const DealWithNMRQ = async(cardIndex,playerListSort)=>{
  //弹簧 待办已打开
  await wait(1000,()=>{
    console.log(playerListSort[cardIndex] +"思考中...")
  })
  if(playerListSort[cardIndex]==props.playerName){
    //如果是当前玩家
    if(!checkHaveCard("杀",myHandCardList.value)&&!checkHaveCard("无懈可击",myHandCardList.value)){
      //如果没有杀/无懈可击，直接扣血
      myBlood.value-=150
      console.log(playerListSort[cardIndex]+"受到了南蛮入侵的伤害!")
      biggerNumberName.value = props.playerName
      //设置血量变化的对象
      biggerAnimationNumber.value = -150
      //设置血量变化的数值
      isShowBiggerAnimationNumber.value = true
      await wait(1500,()=>{
        isShowBiggerAnimationNumber.value = false
      })
    }else{
      isNMRQMode.value = true
    }
  }else{
    HandCardList.value.map(async(item1)=>{
      if(!checkHaveCard("杀",item1.list)&&!checkHaveCard("无懈可击",item1.list)){
        item1.life-=150
        //如果没有杀，直接扣血
        console.log(playerListSort[cardIndex]+"受到了南蛮入侵的伤害!")
        biggerNumberName.value = item1.name
        //设置血量变化的对象
        biggerAnimationNumber.value = -150
        //设置血量变化的数值
        isShowBiggerAnimationNumber.value = true
        await wait(1500,()=>{
          isShowBiggerAnimationNumber.value = false
        })
      }else{
        //进入模拟思考是否出杀
        await wait(1000,()=>{
          let resList = []
          let done = false
          if(checkHaveCard("无懈可击",item1.list)){
            //优先使用无懈可击
            item1.list.forEach(async(item2)=>{
              if(item2.name == "无懈可击"){
                if(!done){
                  //去掉一张无懈可击
                  await showBiggerCard(item1.name,"无懈可击")
                  settlementList.value.push({
                    card:item2.name,
                    cardMes:item2,
                    user:item1.name
                  })
                  //把去掉的那张无懈可击加入待办
                }else{
                  resList.push(item2)
                }
                done = true
              }else{
                resList.push(item2)
              }
            })
            item1.list = resList
          }else if(checkHaveCard("杀",item1.list)){
            //没有无懈可击 才用杀
            item1.list.forEach(async(item2)=>{
              if(item2.name == "杀"){
                if(!done){
                  //去掉一张杀
                  await showBiggerCard(item1.name,"杀")
                  settlementList.value.push({
                    card:item2.name,
                    cardMes:item2,
                    user:item1.name
                  })
                  //把去掉的那张杀加入待办
                }else{
                  resList.push(item2)
                }
                done = true
              }else{
                resList.push(item2)
              }
            })
            item1.list = resList
          }
        })
      }
    })
    await wait(1000,()=>{})
    await wait(2000,async()=>{
      if(playerListSort.length>cardIndex+1){
        await DealWithNMRQ(cardIndex+1,playerListSort.value)
        //如果还有下一个待处理玩家，则继续处理
      }else{
        //南蛮入侵处理完成
        console.log("南蛮入侵处理完成")
        isShowSettleStyle.value = false
        await wait(300,()=>{
          settlementList.value = []
          isShowSettle.value = false
          //清空待办区
        })
      }
    })
  }
}
const choiceCardType = ref({
  name:"",
  card:{}
})
//记录等待选取处理的卡名
const choiceCardFormOther = async(card)=>{
  let done = false
  choiceMes.value.list.map(item=>{
    if(card.name == item.name&&card.attribute == item.attribute&&!done){
      item.isChoice = true
      done = true
    }else{
      item.isChoice = false
    }
  })
  choiceCardType.value.card = card
  console.log(card)
  if(!isShowSureButton.value){
    isShowSureButton.value = true
    await wait(300,()=>{
      ButtonblockStyle.value = true
    })
  }
}
const isShowChoiceName = ()=>{
  if(choiceCardType.value.name == "过河拆桥"||choiceCardType.value.name == "顺手牵羊"){
    return false
  }else{
    return true
  }
}
const getAttributeStyle = (attribute)=>{
  let result = ""
  if(attribute=="金"){
    result+="background:url("+jin+") no-repeat;"
  }
  if(attribute=="木"){
    result+="background:url("+mu+") no-repeat;"
  }
  if(attribute=="水"){
    result+="background:url("+shui+") no-repeat;"
  }
  if(attribute=="火"){
    result+="background:url("+huo+") no-repeat;"
  }
  if(attribute=="土"){
    result+="background:url("+tu+") no-repeat;"
  }
  result+="background-size:100% 100%;"
  // console.log(result)
  return result
}
const othersLoseCard = (card,target)=>{
  console.log(card,target)
  HandCardList.value.map(item=>{
    if(target == item.name){
      let list = []
      item.list.forEach(item1=>{
        if(item1.name == card.name&&item1.attribute==card.attribute){
          //去掉
        }else{
          list.push(item1)
        }
      })
      item.list = list
    }
  })
  //去掉目标中的某张卡
}
const isWGFD = ref(false)
//是否正在处理五谷丰登
const WGFDindex = ref(0)
const dealWGFD = async()=>{
  console.log("确认当前玩家排序：",playerListSort.value)
  if(playerListSort.value[WGFDindex.value]== props.playerName){
    //如果是当前玩家先选
    //不用动，等选中点确认那边处理
    console.log("处理当前玩家的 五谷丰登")
    isWGFD.value = true
  }else{
    //其他玩家选择
    console.log("处理其他玩家的五谷丰登")
    HandCardList.value.map(item=>{
      if(item.name == playerListSort.value[WGFDindex.value]){
        item.list.push(choiceMes.value.list[0])
        //暂时默认拿第一张
        let list = []
        choiceMes.value.list.forEach((item1,index1)=>{
          if(index1!=0){
            list.push(item1)
          }
        })
        choiceMes.value.list = list
        //把选中的卡从待选中去掉
      }
    })
    if(WGFDindex.value+1<playerListSort.value.length){
      await wait(2000,()=>{})
      //2秒模拟思考时间
      WGFDindex.value++
      dealWGFD()
    }else{
      isWGFD.value = false
      WGFDindex.value = 0
      choiceBlockStyle.value = false
      ButtonblockStyle.value = false
      await wait(300,()=>{
        isShowChoiceBlock.value = false
        isShowSureButton.value = false
      })//隐藏确认/取消按钮 展示弹窗
    }
  }
}
//五谷丰登统一处理方法
const botUserCardMethod = (playerDoing,botcardList)=>{
  let useIndex = deskMes.botUserCardMethod(botcardList,getAllMes())
  //根据优先级 获取使用的卡的索引
  return useIndex
  //返回出的卡
}
//bot的统一出牌处理方法
</script>
<template lang="pug">
  .background
    .restart(@click="restart()")
    .start-block(v-if="isShowStart" :style="getStartBlock()") fight
    myBlock(class="my-block" :style="getMyBlockStyle()" :myCardsList="myHandCardList" :bloodNum="myBlood" @myUseCards="myUseCards" @enMyTurn="enMyTurn")
    .other-block(v-for="(otherBlock,index) in otherBlockList" :style="getOtherBlockStyle(otherBlock)" :key="index")
      .other
        .other-card-name {{getOtherCardsName(index)}}
        .other-card-num {{getOtherCardsNum(index)}}
        .other-card-life-block(:style="getOtherCardsLifeStyle(index)")
        .other-card-life {{getOtherCardsLife(index)}}
    .watch-back(v-if="isShowWatchBack" :style="getWatchBack()")
    newPlayTips(class="newplayer-block" :isShowFirst="isShowFirst" :isShowWatchBackStyle="isShowWatchBackStyle" @finishTip="closeNewPlayBlock")
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
    animation(class="animation-block" v-if="isShowAnimation" :showText="isShowAnimationText" :killName="killName" :killedName="killedName")
    biggerAnimation(class="animation-block" v-if="isShowBiggerAnimation" :userName="biggerName" :showText="biggerText")
    biggerAnimationNumberVue(class="animation-block" v-if="isShowBiggerAnimationNumber" :userName="biggerNumberName" :showText="biggerAnimationNumber" )
    .sure-buttons-block(v-if="isShowSureButton" :style="getSureButtonsBlockStyle()")
      .sure-buttons-sure(:style="getSureButtonsStyle()" @click="choiceSureClick()") 确认
      .sure-buttons-cancel(@click="cancelSureButtons()") 取消
    .choice-block(v-if="isShowChoiceBlock" :style="getChoiceBlockStyle()")
      .choice-player-block(v-if="choiceMes.type=='player'")
        .choice-player(v-for="player in choiceMes.list" @click="choicePlayer(player)" :style="getChoiceListStyle(player)")
          .choice-player-name {{player.name}}
      .choice-card-block(v-if="choiceMes.type=='card'")
        .choice-card(v-for="card in choiceMes.list" @click="choiceCardFormOther(card)" :style="getChoiceListStyle(card)")
          .choice-card-name(v-if="isShowChoiceName()") {{card.name}}
          .choice-card-attribute(v-if="isShowChoiceName()" :style="getAttributeStyle(card.attribute)")
    .settle-block(v-if="isShowSettle" :style="getSettleStyle()")
      .settle(v-for="settle in settlementList")
        .settle-user {{settle.user}}
        .settle-card {{settle.card}}


</template>
<style scoped lang="scss">
.background{
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.3s;
  overflow: hidden;
  .restart{
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    z-index: 100;
    background: #eee;
  }
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
  .newplayer-block{
    position: absolute;
    z-index: 101;
    top: 100px;
    left: 100px;
    width: 300px;
    height: 200px;
    background: #f3eff9;
    border-radius: 12px;
    // overflow: hidden;
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
  .animation-block{
    position: absolute;
    top: 100px;
    left: 150px;
    width: 200px;
    height: 200px;
    transition: 0.3s;
    z-index: 102;
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
      .choice-player:hover{
        background: #f5f0f0;
      }
      .choice-player-name{
        font-size: 12px;
        width: 60px;
        padding: 4px;
        color: #ccc;
      }
      .choice-player-name:hover{
        color: #999;
      }
    }
    .choice-card-block{
      padding-left: 5px;
      .choice-card{
        margin-right: 4px;
        margin-top: 4px;
        width: 68px;
        height: 93px;
        border: 1px #d3d3d3 solid;
        border-radius: 6px;
        float: left;
        position: relative;
      }
      .choice-card-name{
        font-size: 12px;
        width: 60px;
        padding: 4px;
        color: #ccc;
      }
      .choice-card-attribute{
        position: absolute;
        width: 10px;
        height: 10px;
        bottom: 0;
        right: 0;
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .settle-block{
    border-radius: 10px;
    border: 1px #ffffff66 solid;
    background: #ffffff24;
    position: absolute;
    width: 200px;
    top: 130px;
    left: 150px;
    height: 120px;
    z-index: 101;
    transition: 0.3s;
    .settle{
      width: 40px;
      height: 50px;
      padding: 5px;
      float: left;
      border-radius: 4px;
      background: #eee;
      position: relative;
      box-shadow: 0px 0px 1px 1px #d4d4d4 inset;
      .settle-user{
        float: left;
        text-align: right;
        width: 100%;
        font-size: 12px;
        height: 100%;
        color: #999;
        word-break: break-all;
      }
      .settle-card{
        position: absolute;
        bottom: 2px;
        right: 6px;
        font-size: 12px;
        color: #999;
        word-break: break-all;
      }
    }
  }
}
</style>