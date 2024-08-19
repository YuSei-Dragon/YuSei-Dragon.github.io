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
const usingList = computed(()=>store.state.usingList)


//名称和示范        伤害    补牌   压制回牌   回血
//一对 11            2      1        0       0
//三条 111           3      2        0       3
//骷髅 3-2           6      3        1       5
//顺子 12345         7      3        1       5 
// 炸弹 1111         8      3        2       6
//同花顺 12345同色   10      5        3       8
//从下往上压制        0      
//
// 血条 20
//起始手牌 6
//回合抽卡 2
// let modeCards =[
//   {num:1,type:'hongtao'},
//   {num:2,type:'hongtao'},
//   {num:3,type:'hongtao'},
//   {num:3,type:'heitao'},
//   {num:3,type:'meihua'},
//   {num:3,type:'fangkuai'},
//   {num:4,type:'hongtao'},
//   {num:5,type:'hongtao'},
//   {num:6,type:'hongtao'},
//   {num:6,type:'heitao'},
// ]

const AsyncComponent = defineAsyncComponent(() =>
  import("./PokeTestView.vue")
)

const cards = ref([])
const types = ref(["hongtao","heitao","meihua","fangkuai"])
const index = ref(0)
const myCards = ref([])
const uCards = ref([])
const firStep = ref("")
const myCost = ref(20)
const uCost = ref(20)
const inputText = ref("")
const doList = ref([])
const disabled = ref(false)
const usedList = ref([])
const cardNowLength = ref(52)
const isLoseStep = ref(false)
const stop = ref(false)
const caozuoIndex = ref(-1)
const caozuoName = ref("")
const uEveryGetNum = ref(2)
const myEveryGetNum = ref(2)
const myCanReflsh = ref(false)
const fightNum = ref(0)
const myFightNum = ref(0)
const uFightNum = ref(0)

const sonRef = ref()
const sonUsingList = ref([])

onMounted(() => {
  init()
  // firstTurn()
  //如果不注释的话可以直接进行文字版游玩，但是交互版要打断流程给思考时间
})
const init = (()=>{
  //设置基本牌库
  let a = 0
  cards.value = []
  //清空牌堆
  for(let w = 0;w<4;w++){
    for(let q= 1;q<=13;q++){
    cards.value.push({
    num:q,
    type:types.value[a],
  })
  }
    a++
    //四种花色
  }
  // console.log(cards.value)
  cards.value = daluan(cards.value)
  //每回合可以操作出牌的次数，等于当前回合数
  //洗牌
  myCards.value = getInitCards(cards,index)
  uCards.value = getInitCards(cards,index)
  myCards.value = sortCards(myCards.value)
  uCards.value = sortCards(uCards.value)
  initSetting()
})
const initSetting = (()=>{
  //设置电脑难度
  uEveryGetNum.value = 3
  //敌方每回合抽卡
  //我方选择技能
  //英姿 
  myEveryGetNum.value = 3
  //制衡(一回合一次)
  myCanReflsh.value = true
  fightNum.value++
})
const whoFirst = (()=>{
  if(Math.random()>0.5){
    firStep.value = "me"
  }else{
    firStep.value = "u"
  }
})
const mefirstTurn = (()=>{

    iGetCards(myEveryGetNum.value)
    firStep.value = "me"
    console.log("获得先攻")
    console.log("你摸了"+myEveryGetNum.value+"张卡")
    myCards.value = sortCards(myCards.value)
    //我先手，对牌组进行处理
  //   firStep.value = "u"
  //   console.log("电脑先攻")
  //   // uGetCards(uEveryGetNum.value)
  //   // uTrun()
  // }
  // console.log("电脑剩余生命值："+uCost.value)
  // console.log("我方剩余生命值："+myCost.value)
  // console.log("我方手牌为: ")
  // // showCards(myCards.value)
  // // // console.log(myCards.value,uCards.value)
  // // startGame()
})
const ufirstTurn = (()=>{
    // console.log("电脑先攻")
    uGetCards(uEveryGetNum.value)
    uCards.value = sortCards(uCards.value)
    // uTrun()
})
const startGame = (()=>{
  if(firStep.value=="me"){

  }else{
    // logic()
  }
})
const showCards = ((list)=>{
  let result = ''
  let indexs = ""
  list.forEach((item,index)=>{
    let showNum = ''
    if(item.num<10){
      showNum = "0"+item.num
    }else if(item.num == 10){
      showNum = "10"
    }else if(item.num==11){
      showNum = "_J"
    }else if(item.num==12){
      showNum = "_Q"
    }else if(item.num==13){
      showNum = "_K"
    }
    if(item.type=="hongtao"){
      result = result + "红桃"+ showNum +"/ "
    }else if(item.type=="heitao"){
      result = result + "黑桃"+ showNum +"/ "
    }else if(item.type=="meihua"){
      result = result + "梅花"+ showNum +"/ "
    }else if(item.type=="fangkuai"){
      result = result + "方块"+ showNum +"/ "
    }
    indexs = indexs + "一一_"+ index  +"/ "
  })
  console.log(result)
  console.log(indexs)
})
const daluan= ((list)=>{
    let len = list.length;
    for (let i = 0; i < len - 1; i++) {
        let index = parseInt(Math.random() * (len - i));
        let temp = list[index];
        list[index] = list[len - i - 1];
        list[len - i - 1] = temp;
    }
    return list;
}) 
const getInitCards = ((cards,index)=>{
  let list = []
  for(let i=0;i<6;i++){
    list.push(cards.value[index.value])
    //console.log(cards.value[index.value])
    index.value++
  }
  return list
})
const iGetCards=((num)=>{
     for(let i=0;i<num;i++){
      // console.log(cards.value,index.value,"----------------------------")
      //  console.log(cards.value[index.value])
       myCards.value.push(cards.value[index.value])
       index.value++
       if(index.value>=cardNowLength.value){
        console.log("牌堆已经刷新")
        // console.log(usedList.value)
        cards.value = daluan(usedList.value)
        index.value = 0
        cards.value = usedList.value
        cardNowLength.value = cards.value.length
        usedList.value = []
        // console.log(cards.value)
       }
     }
})
const uGetCards= ((num)=>{
  	for(let i=0;i<num;i++){
      //  console.log(cards.value,index.value,"----------------------------")
      //  console.log(cards.value[index.value])
       uCards.value.push(cards.value[index.value])
       index.value++
       if(index.value>=cardNowLength.value){
        // console.log(usedList.value)
        console.log("牌堆已经刷新")
        usedList.value = daluan(usedList.value)
        index.value = 0
        cards.value = usedList.value
        cardNowLength.value = cards.value.length
        usedList.value = []
        // console.log(cards.value)
       }
     }
})
const loseCards=((cards,list)=>{
  //用于出牌,删除使用的牌
  // console.log(cards,list)
  let res = []
	list.map(item=>{
    let i = 0
    cards.map(item1=>{
      if(item==item1){
        i = 1
      }
    })
    if(i==0){
      res.push(item)
    }
  })
  cards.forEach(item=>{
    usedList.value.push(item)
  })
  return res
})

const checkTonghuashun =((list)=>{
  let res =[]
  let q = 0
  //用于检测最小同花顺达成条件
  list.map(item=>{
	let result = []
		if(item.num<=9&&q==0){
      result.push(item)
      list.map(item1=>{
        if(item1.num == item.num+1&&item.type==item1.type){					
          result.push(item1)
          list.map(item2=>{
            if(item2.num == item1.num+1&&item1.type==item2.type){
              result.push(item2)
              list.map(item3=>{
                if(item3.num == item2.num+1&&item2.type==item3.type){
                  result.push(item3)
									list.map(item4=>{
                    if(item4.num == item3.num+1&&item4.type==item3.type){
											result.push(item4)
                      res = result
                      q = 1
                    }
                  })
                }
              })
            }
          })
        }
      
      })
    }
  })
  // console.log(res)
  if(res.length<=0){
    //不出牌
    return false
  }else{
    doList.value = res
    return true
    //出同花顺
  }
})

const checkBoom=((list)=>{
  if(list.length<=3){
    return 
  }
  let checkList = []
  for(let i=1;i<14;i++){
    checkList.push({
      num:i,
      many:0
    })
  }//建立数组计算每个数字出现的次数
  list.map(item=>{
    checkList.map(item1=>{
      if(item1.num == item.num){
        item1.many +=1
      }
    })
  })
  let resultNum = 0
  let a = 0
  checkList.map(item=>{
    if(item.many>=4&a==0){
      resultNum = item.num
      // console.log(resultNum,"boomNum")
      a = 1
      //取最小的优先
    }
  })
  if(resultNum!=0){
    let resultList = []
    list.map(item=>{
      if(item.num==resultNum&&resultList.length<=4){
        resultList.push(item)
      }
    })
    // console.log(resultList,"boomList")
    doList.value = resultList
    //失去boom
    // console.log(uCards.value,"使用boom")
    return true
  }else{
    return false
  }
})

const checkShunzi =(list=>{
  let res =[]
  let q = 0
  //用于检测最小顺子达成条件
  list.map(item=>{
	let result = []
		if(item.num<=9&&q==0){
      result.push(item)
      list.map(item1=>{
        if(item1.num == item.num+1){					
          result.push(item1)
          list.map(item2=>{
            if(item2.num == item1.num+1){
              result.push(item2)
              list.map(item3=>{
                if(item3.num == item2.num+1){
                  result.push(item3)
									list.map(item4=>{
                    if(item4.num == item3.num+1){
											result.push(item4)
                      res = result
                      q = 1
                    }
                  })
                }
              })
            }
          })
        }
      
      })
    }
  })
  if(res.length>5){
    let resList = []
    res.map(item=>{
      if(resList.length<5){
        resList.push(item)
      }
    })
    res = resList
  }
  // console.log(res,"顺子")
  if(res.length<=0){
    //不出牌
    return false
  }else{
    doList.value = res
    // loseCards(res,list)
    //出顺子
    // console.log(uCards.value,"使用顺子后")
    return true
  }
})

const checkKuLou = ((list)=>{
  let resultList = []
  let num = 0
  //num控制不重复查询
	list.map(item=>{
   	list.map(item1=>{
      if(item.num==item1.num&&item.type!=item1.type&&num==0){
        list.map(item2=>{
          if(item2.num==item1.num && item2.type!=item1.type && item2.type!=item.type&&num==0){
            resultList.push(item)
            resultList.push(item1)
            resultList.push(item2)
            //检查前置条件3条
            num = item.num
            //设置三条用的数
        }
    	})
      }       
  })
})
if(num!= 0){
  list.forEach(item=>{
    list.forEach(item1=>{
      if(item.num == item1.num&&item.type!=item1.type && item.num!=num&&resultList.length==3){
          resultList.push(item)
          resultList.push(item1)
      }
    })
  })
  // console.log(resultList,"存在骷髅") 
  // loseCards(uCards.value,resultList)
  // console.log(uCards.value)
  doList.value = resultList
  return true
}else{
  return false
}
})

const checkSantiao = ((list)=>{
  let resultList = []
  let num = 0
	list.map(item=>{
   	list.map(item1=>{
      if(item.num==item1.num&&item.type!=item1.type){
        list.map(item2=>{
          if(item2.num==item1.num && item2.type!=item1.type && item2.type!=item.type){
            resultList.push(item)
            resultList.push(item1)
            resultList.push(item2)
            //检查前置条件3条
            num = item.num
            //设置三条用的数
        }
    	})
      }
  })
})
if(resultList.length>0){
  // console.log(resultList,"存在三条")
  doList.value = resultList
  return true
}else{
  return false
}
  // loseCards(uCards.value,resultList)
  // console.log(uCards.value)
})    

const checkYidui = ((list)=>{
  let resultList = []
  list.forEach(item=>{
    list.forEach(item1=>{
      if(item.num == item1.num&&item.type!=item1.type&&resultList.length==0){
        resultList.push(item)
        resultList.push(item1)
      }
    })
  })
  if(resultList.length>0){
    // console.log(resultList)
    doList.value = resultList
    // console.log(resultList,"存在一对")
    return true
  }else{
    return false
  }
  // loseCards(uCards.value,resultList)
  // console.log(uCards.value)
})

const checkAll = ((list)=>{
  if(checkTonghuashun(list)){
      return "同花顺"
    }//如果有同花顺
  if(checkBoom(list)){
      return "炸弹"
    }//如果有炸弹
  if(checkShunzi(list)){
      return "顺子"
    }//如果有顺子
  if(checkKuLou(list)){
      return "骷髅"
    }//如果有骷髅
  if(checkSantiao(list)){
      return "三条"
    }//如果有三条
  if(checkYidui(list)){
      return "一对"
    }//如果有一对
  return "no"
})

const logic=((list)=>{
  if(list.length == 5){
    if(checkTonghuashun(list)){
      return "同花顺"
    }//如果有同花顺
    if(checkShunzi(list)){
      return "顺子"
    }//如果有顺子
    if(checkKuLou(list)){
      return "骷髅"
    }//如果有骷髅
  }else if(list.length==4){
    if(checkBoom(list)){
    return "炸弹"
  }//如果有炸弹
  }else if(list.length==3){
    if(checkSantiao(list)){
      return "三条"
    }//如果有三条
  }else if(list.length==2){
    if(checkYidui(list)){
      return "一对"
    }//如果有一对
  }

  return "非法操作"
  
})

const sortCards = ((list)=>{
  let result = []
  let sortList = []
  let min = 14
  list.forEach(item=>{
    let typeNum = 0
    if(item.type == "heitao"){
      typeNum = 0.4
    }else if(item.type == "hongtao"){
      typeNum = 0.3
    }else if(item.type == "meihua"){
      typeNum = 0.2
    }else if(item.type == "fangkuai"){
      typeNum = 0.1
    }
    sortList.push({
      ...item,
      index:item.num+ typeNum
    })
  })
  //对手牌进行大小排序
  sortList.forEach(item=>{
    min = 14
    sortList.forEach(item1=>{
      let isIn = false
      result.forEach(item2=>{
        if(item1.num == item2.num&&item1.type == item2.type){
          isIn = true
        }
      })
      if(item1.index<min&&!isIn){
        min = item1.index
      }
    })
    sortList.forEach(item=>{
      if(item.index == min){
        result.push({
          type:item.type,
          num:item.num,
        })
      }
    })

  })
  // console.log(result)
  return result
})

const getInputText = ((e)=>{
  // console.log(inputText.value)
  const mes = inputText.value.trim()
  inputText.value = ""
  //清空数据框
  
  if(isLoseStep.value){
    if(mes.startsWith("lost")){
      let mesList = mes.split(" ")
      //通过空格分隔切割字符串
      mesList = Array.from(new Set(mesList))
      let isIndexCurrent = true
      mesList.forEach(item=>{
        if(Number(item)>myCards.value.length){
          isIndexCurrent = false
          console.log("你输入要操作的索引不存在")
        }
      })
      if(isIndexCurrent){
        let indexList =[]
      for(let i=0;i<mesList.length;i++){
        if(i>0){
          indexList.push(Number(mesList[i]) )
        }
      }
      // console.log(indexList)
      let list = []
      indexList.forEach(item=>{
        list.push(myCards.value[item])
      })
      // console.log(list)
      myCards.value = loseCards(list,myCards.value)
      showCards(myCards.value)
      isLoseStep.value = false
      fightNum.value++
      uGetCards(uEveryGetNum.value)
      myCanReflsh.value = true
       //刷新制衡
      uTrun()
      return
    }else{
      console.log("请使用lost 指令进行弃牌选择")
    }
    }
    
  }
  if(fightNum.value<=myFightNum.value&&(!isLoseStep.value)){
      console.log("你本回合进攻机会已经用完","请进入弃牌阶段!")
      isLoseStep.value = true
      return
    }//拦截进攻次数
  if(mes=="showMyCards"){
    showCards(myCards.value)
  }else if(mes=="sortMyCards"){
    myCards.value = sortCards(myCards.value)
    showCards(myCards.value)
  }else if(mes == "showCost"){
    console.log("电脑剩余生命值："+uCost.value)
    console.log("我方剩余生命值："+myCost.value)
  }else if(mes == "end"){
    console.log("我方结束回合")
    // console.log(myCards.value.length,myCost.value)
    if((myCards.value.length+myCost.value)>25){
        let cardNum = myCards.value.length- (25-myCost.value)
        console.log("请弃牌"+ cardNum +"张(手牌数量和血量的和不超过25)")
        isLoseStep.value = true
      }else{
         fightNum.value++
         uGetCards(uEveryGetNum.value)
         myCanReflsh.value = true
         //刷新制衡
         uTrun()
      }
   
  }else if(mes.startsWith("go")){
    console.log("进行出牌操作")
    console.log("我方本回合能进行"+fightNum.value+"次进攻","当前为第"+(myFightNum.value+1)+"次")
    let mesList = mes.split(" ")
    //通过空格分隔切割字符串
    mesList = Array.from(new Set(mesList))
    let isIndexCurrent = true
    mesList.forEach(item=>{
      if(Number(item)>myCards.value.length){
        isIndexCurrent = false
        console.log("你输入要操作的索引不存在")
      }
    })
    if(isIndexCurrent){
      let indexList =[]
    for(let i=0;i<mesList.length;i++){
      if(i>0){
        indexList.push(Number(mesList[i]) )
      }
    }
    mesList = []
    indexList.forEach(item=>{
      mesList.push(myCards.value[item])
    })//获取实际要操作的数据

    // console.log(mesList)
    const caozuo = logic(mesList)
    console.log("你使用了: "+ caozuo)
    showCards(mesList)
    if(caozuo!=="非法操作"){
       myCards.value = loseCards(mesList,myCards.value)
    //去除使用了的牌
    let cost = countCost(caozuo)
    uCost.value = uCost.value - cost
    console.log("造成了"+ cost + "点伤害！")
    if(uCost.value<=0){
      console.log("对方生命值已清零！")
      return
    }
    if(caozuo == "同花顺"){
      iGetCards(5)
      console.log("触发了抽卡同花顺5张奖励！")
    }else if(caozuo == "炸弹"){
      iGetCards(3)
      console.log("触发了抽卡炸弹3张奖励！")
    }else if(caozuo == "顺子"){
      iGetCards(3)
      console.log("触发了抽卡顺子3张奖励！")
    }else if(caozuo == "骷髅"){
      iGetCards(3)
      console.log("触发了抽卡骷髅3张奖励！")
    }else if(caozuo == "三条"){
      iGetCards(2)
      console.log("触发了抽卡三条2张奖励！")
    }else if(caozuo == "一对"){
      iGetCards(1)
      console.log("触发了抽卡一对1张奖励！")
    }
    myCards.value = sortCards(myCards.value)
    console.log("对方剩余生命值:" + uCost.value)
    // showCards(myCards.value)
    console.log("-----------------------")
    console.log("我方剩余手牌:")
    showCards(myCards.value)
    myFightNum.value++
    //记录出牌次数
    if(checkAll(myCards.value)=="no"){
      console.log("我方没有可以进行的操作，自动结束回合")
      if((myCards.value.length+myCost.value)>25){
        let cardNum = myCards.value.length- (25-myCost.value)
        console.log("请弃牌"+ cardNum +"张(手牌数量和血量的和不超过25)")
        isLoseStep.value = true
      }else{
        fightNum.value++
        //进入下一回合
        uGetCards(uEveryGetNum.value)
        myCanReflsh.value = true
         //刷新制衡
        uTrun()
      }
    } 
    }else{
      console.log("你出的牌不满足规则限制，请重新选择。")
    }
    }
   
     
  }else if(mes == "not defense"){
    stop.value = false
    //不进行防御
    let cost = countCost(caozuoName.value)
      myCost.value = myCost.value - cost
      console.log("造成了"+ cost + "点伤害！")
      if(myCost.value<=0){
        console.log("我方生命值已清零！")
        return
      }
      if(caozuoName.value == "同花顺"){
        uGetCards(5)
        console.log("触发了抽卡同花顺5张奖励！")
      }else if(caozuoName.value == "炸弹"){
        uGetCards(3)
        console.log("触发了抽卡炸弹3张奖励！")
      }else if(caozuoName.value == "顺子"){
        uGetCards(3)
        console.log("触发了抽卡顺子3张奖励！")
      }else if(caozuoName.value == "骷髅"){
        uGetCards(3)
        console.log("触发了抽卡骷髅3张奖励！")
      }else if(caozuoName.value == "三条"){
        uGetCards(2)
        console.log("触发了抽卡三条2张奖励！")
      }else if(caozuoName.value == "一对"){
        uGetCards(1)
        console.log("触发了抽卡一对1张奖励！")
      }
      uCards.value = sortCards(uCards.value)
      console.log("我方剩余生命值:" + myCost.value)
      // showCards(myCards.value)
      console.log("-----------------------")
      uTrun()
      //重新回到对方回合
  }else if(mes.startsWith("defense")){
    
    let mesList = mes.split(" ")
    //通过空格分隔切割字符串
    mesList = Array.from(new Set(mesList))
    let isIndexCurrent = true
    mesList.forEach(item=>{
      if(Number(item)>myCards.value.length){
        isIndexCurrent = false
        console.log("你输入要操作的索引不存在")
      }
    })
    if(isIndexCurrent){
      let indexList =[]
      for(let i=0;i<mesList.length;i++){
        if(i>0){
          indexList.push(Number(mesList[i]) )
        }
      }
    mesList = []
    indexList.forEach(item=>{
      mesList.push(myCards.value[item])
    })//获取实际要操作的数据
    let DefenseName = checkAll(mesList)
    let DefenseNun
    if(DefenseName=="三条"){
      DefenseNun = 1
    }if(DefenseName == "骷髅"){
      DefenseNun = 2
    }if(DefenseName == "炸弹"){
      DefenseNun = 3
    }if(DefenseName == "顺子"){
      DefenseNun = 4
    }if(DefenseName == "同花顺"){
      DefenseNun = 5
    }
    if(DefenseNun>caozuoIndex.value){
      //如果操作的数能进行防御，则进行处理
      myCards.value = loseCards(mesList,myCards.value)
      //去掉防御使用的卡牌
      let num
      if(DefenseName=="三条"){
        num = 0
      }if(DefenseName == "骷髅"){
        num = 1
      }if(DefenseName == "炸弹"){
        num = 2
      }if(DefenseName == "顺子"){
        num = 1
      }if(DefenseName == "同花顺"){
        num = 3
      }
      console.log("我方防御成功，并抽了"+ num +"张卡。")
      iGetCards(num)
      stop.value = false
      //提示进行了防御，不进行伤害处理
      uTrun()
      //重新回到对方回合
      }else{
        console.log("你选中的防御不足以对抗对方的进攻,操作无效。")
      }

    }else{
      console.log("输入指令错误，请检查输入")
    }
  }else if(mes.startsWith("reflash")){
    if(myCanReflsh.value){
        let mesList = mes.split(" ")
      //通过空格分隔切割字符串
      mesList = Array.from(new Set(mesList))
      let isIndexCurrent = true
      mesList.forEach(item=>{
        if(Number(item)>myCards.value.length){
          isIndexCurrent = false
          console.log("你输入要操作的索引不存在")
        }
      })
      if(isIndexCurrent){
        let indexList =[]
          for(let i=0;i<mesList.length;i++){
            if(i>0){
              indexList.push(Number(mesList[i]) )
            }
          }
        mesList = []
        indexList.forEach(item=>{
          mesList.push(myCards.value[item])
        })//获取实际要操作的数据
      }
      console.log("你发动了制衡")
      showCards(mesList)
      myCards.value = loseCards(mesList,myCards.value)
      iGetCards(mesList.length)
      myCanReflsh.value = false
      console.log("你的手牌：")
      myCards.value = sortCards(myCards.value)
      showCards(myCards.value)
    }else{
      console.log("你没有权限或者已经使用制衡。")
    }
  }else if(mes.startsWith("heal")){
    if(myCanReflsh.value){
        let mesList = mes.split(" ")
      //通过空格分隔切割字符串
      mesList = Array.from(new Set(mesList))
      let isIndexCurrent = true
      mesList.forEach(item=>{
        if(Number(item)>myCards.value.length){
          isIndexCurrent = false
          console.log("你输入要操作的索引不存在")
        }
      })
      if(isIndexCurrent){
        let indexList =[]
          for(let i=0;i<mesList.length;i++){
            if(i>0){
              indexList.push(Number(mesList[i]) )
            }
          }
        mesList = []
        indexList.forEach(item=>{
          mesList.push(myCards.value[item])
        })//获取实际要操作的数据
        console.log("你进行了回血操作。")
        showCards(mesList)
        myCards.value = loseCards(mesList,myCards.value)
        myCards.value = sortCards(myCards.value)
        showCards(myCards.value)
        let Name = checkAll(mesList)
        let healNum = 0
        if(Name=="三条"){
          healNum = 3
        }if(Name == "骷髅"){
          healNum = 5
        }if(Name == "炸弹"){
          healNum = 6
        }if(Name == "顺子"){
          healNum = 5
        }if(Name == "同花顺"){
          healNum = 8
        }
          myCost.value+=healNum
          console.log("你成功恢复了"+healNum+"点体力！","你现在的体力为："+myCost.value)
          }
    }
  }else{
    console.log("你输入了未知命令。")
  }
    

})

const countCost=((caozuo)=>{
  if(caozuo == "同花顺"){
    return 10
  }else if(caozuo == "炸弹"){
    return 8
  }else if(caozuo == "顺子"){
    return 7
  }else if(caozuo == "骷髅"){
    return 6
  }else if(caozuo == "三条"){
    return 3
  }else if(caozuo == "一对"){
    return 2
  }
})

const countHealCost = ((caozuo)=>{
  if(caozuo == "同花顺"){
    return 8
  }else if(caozuo == "炸弹"){
    return 6
  }else if(caozuo == "顺子"){
    return 5
  }else if(caozuo == "骷髅"){
    return 5
  }else if(caozuo == "三条"){
    return 3
  }else{
    return 2
  }
})

const uTrun=(()=>{
  disabled.value = true
  uFightNum.value = 0
  console.log("电脑摸了"+uEveryGetNum.value+"张卡")
  //电脑回合，摸两张
  // console.log(uCards.value)
  let end = false
  while(!end){
    uCards.value = sortCards(uCards.value)
    //排序
    let caozuo = checkAll(uCards.value)
  //按照优先级进行操作判断
    while(caozuo!=="no"&&uCost.value<=10){
        let mesList = []
            doList.value.forEach(item=>{
              uCards.value.forEach(item1=>{
                if(item1.type==item.type&&item1.num==item.num){
                  mesList.push(item1)
                }
              })
            })
            caozuo = logic(mesList)
            console.log("电脑使用了: "+ caozuo + "回血!")
            showCards(mesList)
            let cost = countHealCost(caozuo)
            uCost.value = uCost.value + cost
            console.log("恢复了点"+cost+"血量","对方当前血量为"+uCost.value)

      }
    console.log("对方本回合能进行"+fightNum.value+"次进攻","当前为第"+(uFightNum.value+1)+"次")
  
  // console.log(uCards.value)
  
  
  if(caozuo!=="no"&&uFightNum.value<fightNum.value){
    let mesList = []
    doList.value.forEach(item=>{
      uCards.value.forEach(item1=>{
        if(item1.type==item.type&&item1.num==item.num){
          mesList.push(item1)
        }
      })
    })
    caozuo = logic(mesList)
    console.log("电脑使用了: "+ caozuo)
    uFightNum.value++
    showCards(mesList)
    uCards.value = loseCards(mesList,uCards.value)
    // console.log(uCards.value)
    stop.value = false
    //重置stop状态

    if(Defense(caozuo,myCards.value)){
      stop.value = true
    }

    if(stop.value){
      console.log("等待我方思考是否拦截...")
      caozuoName.value = caozuo
      disabled.value = false
      return
    }else{
      let cost = countCost(caozuo)
      myCost.value = myCost.value - cost
      console.log("造成了"+ cost + "点伤害！")
      if(myCost.value<=0){
        console.log("我方生命值已清零！")
        return
      }
      if(caozuo == "同花顺"){
        uGetCards(5)
        console.log("触发了抽卡同花顺5张奖励！")
      }else if(caozuo == "炸弹"){
        uGetCards(3)
        console.log("触发了抽卡炸弹3张奖励！")
      }else if(caozuo == "顺子"){
        uGetCards(3)
        console.log("触发了抽卡顺子3张奖励！")
      }else if(caozuo == "骷髅"){
        uGetCards(3)
        console.log("触发了抽卡骷髅3张奖励！")
      }else if(caozuo == "三条"){
        uGetCards(2)
        console.log("触发了抽卡三条2张奖励！")
      }else if(caozuo == "一对"){
        uGetCards(1)
        console.log("触发了抽卡一对1张奖励！")
      }
      uCards.value = sortCards(uCards.value)
      console.log("我方剩余生命值:" + myCost.value)
      // showCards(myCards.value)
      console.log("-----------------------")
    }
    
  }else{
    end = true
    console.log("电脑没有可用操作或用完了出牌次数，已自动结束回合。")
    disabled.value = false
  }
  
  }
  fightNum.value++
  //进入下一回合
  iGetCards(myEveryGetNum.value)
  myFightNum.value = 0
  console.log("你摸了"+myEveryGetNum.value+"张卡")

  myCards.value = sortCards(myCards.value)
  showCards(myCards.value)
  //电脑结束回合，我摸两张然后开始动
  
})
const Defense = ((caozuo,list)=>{
  if(caozuo=="一对"){
    caozuoIndex.value = 0
  }if(caozuo=="三条"){
    caozuoIndex.value = 1
  }if(caozuo == "骷髅"){
    caozuoIndex.value = 2
  }if(caozuo == "炸弹"){
    caozuoIndex.value = 3
  }if(caozuo == "顺子"){
    caozuoIndex.value = 4
  }if(caozuo == "同花顺"){
    caozuoIndex.value = 5
  }
  let caozuoDefense = checkAll(list)
  let defenseIndex = 0
  if(caozuoDefense=="三条"){
    defenseIndex = 1
  }if(caozuoDefense == "骷髅"){
    defenseIndex = 2
  }if(caozuoDefense == "炸弹"){
    defenseIndex = 3
  }if(caozuoDefense == "顺子"){
    defenseIndex = 4
  }if(caozuoDefense == "同花顺"){
    defenseIndex = 5
  }
  if(defenseIndex>caozuoIndex.value){
    console.log("能拦得住")
    return true
  }else{
    //没有可以相应的牌
    return false
  }
})

const sortMyCards=(()=>{
  myCards.value = sortCards(myCards.value)
  console.log(myCards.value)
})
const sortBotCards=(()=>{
  uCards.value = sortCards(uCards.value)
  console.log(uCards.value)
})
const checkUsingList=(()=>{
  const result =  checkAll(usingList.value)
  console.log(result)
  if(result!="no"){
    console.log(myCards.value,usingList.value)
    myCards.value = loseCards(usingList.value,myCards.value)
    //从手牌中去掉选取的卡
    console.log(myCards.value)
    store.commit('setMyList',myCards.value)
    //剩余手牌
    const cost = countCost(result)
    uCost.value-= cost
    store.commit("setBotLive",uCost.value)
    console.log(uCost.value)
  }
})
const checkMyAllCards=(()=>{
  //检查还有没有出牌可能性
  const result = checkAll(myCards.value)
  if(result == 'no'){
    store.commit("IshouldEnd",true)
  }
})

const checkBotAllCards=(()=>{
  //检查还有没有出牌可能性
  const result = checkAll(uCards.value)
  if(result == 'no'){
    store.commit("BotshouldEnd",true)
  }
})

const botTurn=(()=>{
  let result = checkAll(uCards.value)
  //跑一遍刷新doList
  //已经经过过滤，这里是必有可操作的
  let mesList = []
    doList.value.forEach(item=>{
      uCards.value.forEach(item1=>{
        if(item1.type==item.type&&item1.num==item.num){
          mesList.push(item1)
        }
      })
    })
    result = logic(mesList)
    console.log("电脑使用了: "+ result)
    uCards.value = loseCards(mesList,uCards.value)
    //刷新剩余电脑手牌
    store.commit("changeBotUsingList",mesList)
    //传出使用的组合
    
    myCost.value-=countCost(result)
    store.commit('setMyLive',myCost.value)
    //修改我方生命值

})


</script>

<template>
<div>
  <AsyncComponent ref="sonRef" :botLiveNumNow_="uCost" :myLiveNumNow_="myCost"  :myCardsList_="myCards" :uCardsList_="uCards" @megetFirst="mefirstTurn" @botgetFirst="ufirstTurn"  @init="init" @checkAll="checkAll" @sortMyCards="sortMyCards" @sortBotCards="sortBotCards" @checkUsingList="checkUsingList" @checkMyAllCards="checkMyAllCards" @checkBotAllCards="checkBotAllCards" @botTurn="botTurn" />
  <input type="text" name="" id="" v-model="inputText" @keyup.enter="getInputText" :disabled="disabled" >
</div>

</template>