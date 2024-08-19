<script setup>
//stronger monster need more pay
//you can ure your monster power to take the pay
//first trun every one can choice one monster stand to the ground
//first trun can not fight
//one turn only one monster you can summon
//all your monster starts added should less or amount 12

//the number of cards can use will base on the number of turn
//one monster one fight
//20 power
//the number of cards can keep 8
//first turn everyone get 6 cards, every turn get 2 caeds
//easy to play is important
//everyone can find their own way to win
//more strong monster should take more dangerouse
//attack with A ,defend with D
//change mode to defend can miss this attack to your power
//use poke to control the speed of the game


//Spade: attack card
//Heart: heal your power
//Club:  Special effects i hope this type of cards can use to attack/heal/defend
//diamonds: defend card

//装备卡equip，主动卡active，反击卡counterattack
//12start monster attack design 8 ,because 3*8 = 24 3truns to lose
//we can use 'kill' whithout num limit,because it is so cool to otk after many turns to prepare
//monster attack should spend one 'kill' ,but u can just u 'kill' to attack
import {
  nextTick,
  ref,
  watch,
} from 'vue'
const cardsList = ref([
    //黑桃攻击卡 13   5装备 3挑衅 2神兵 3禁忌
    {cardType:'spade',num:1,name:'双刀',type:'equip',desc:'装备的怪兽一回合能打两刀'},
    {cardType:'spade',num:2,name:'神弓',type:'equip',desc:'装备的怪兽攻击时可以攻击力减半(向下取整)，直接攻击玩家'},
    {cardType:'spade',num:3,name:'照妖镜',type:'equip',desc:'装备的怪兽攻击时可以查看对方一张卡，并让其同名卡本回合无法发动'},
    {cardType:'spade',num:4,name:'战斧',type:'equip',desc:'装备的怪兽攻击时对方防具失效'},
    {cardType:'spade',num:5,name:'战锤',type:'equip',desc:'装备的怪兽攻击对方造成伤害翻倍'},
    {cardType:'spade',num:6,name:'挑衅',type:'active',desc:'强制选取一只我方怪兽和一只敌方怪兽进行战斗处理,此时将对比双方攻击力'},
    {cardType:'spade',num:7,name:'挑衅',type:'active',desc:'强制选取一只我方怪兽和一只敌方怪兽进行战斗处理,此时将对比双方攻击力'},
    {cardType:'spade',num:8,name:'挑衅',type:'active',desc:'强制选取一只我方怪兽和一只敌方怪兽进行战斗处理,此时将对比双方攻击力'},
    {cardType:'spade',num:9,name:'神兵天降',type:'active',desc:'当我方怪兽数量少于对方时可以发动，不需要生命值献祭进行一只怪兽召唤并在回合结束破坏该怪兽'},
    {cardType:'spade',num:10,name:'神兵天降',type:'active',desc:'当我方怪兽数量少于对方时可以发动，不需要生命值献祭进行一只怪兽召唤并在回合结束破坏该怪兽'},
    {cardType:'spade',num:11,name:'禁忌仪式',type:'active',desc:'进行一次判定，然后翻开牌堆顶三张卡加入手卡，每出现一张不同花色失去一点生命值'},
    {cardType:'spade',num:12,name:'禁忌仪式',type:'active',desc:'进行一次判定，然后翻开牌堆顶三张卡加入手卡，每出现一张不同花色失去一点生命值'},
    {cardType:'spade',num:13,name:'禁忌仪式',type:'active',desc:'进行一次判定，然后翻开牌堆顶三张卡加入手卡，每出现一张不同花色失去一点生命值'},
    
    //红桃恢复卡 13   2生命汲取 3生生不息 2灵魂解放 2时间倒流 4鸿门宴
    {cardType:'heart',num:1,name:'生命汲取',type:'counterattack',desc:'恢复对方场上一只怪兽的攻击力数值的生命值'},
    {cardType:'heart',num:2,name:'生命汲取',type:'counterattack',desc:'恢复对方场上一只怪兽的攻击力数值的生命值'},
    {cardType:'heart',num:3,name:'生生不息',type:'active',desc:'恢复我方手牌数量的生命值'},
    {cardType:'heart',num:4,name:'生生不息',type:'active',desc:'恢复我方手牌数量的生命值'},
    {cardType:'heart',num:5,name:'生生不息',type:'active',desc:'恢复我方手牌数量的生命值'},
    {cardType:'heart',num:6,name:'灵魂解放',type:'active',desc:'解放一只我方怪兽，恢复其攻击力/防御力较高的一方，并抽一张卡'},
    {cardType:'heart',num:7,name:'灵魂解放',type:'active',desc:'解放一只我方怪兽，恢复其攻击力/防御力较高的一方，并抽一张卡'},
    {cardType:'heart',num:8,name:'时间倒流',type:'counterattack',desc:'恢复本回合收到的全部伤害，并不需要生命值献祭召唤一只星级不大于受到伤害数值的怪兽'},
    {cardType:'heart',num:9,name:'时间倒流',type:'counterattack',desc:'恢复本回合收到的全部伤害，并不需要生命值献祭召唤一只星级不大于受到伤害数值的怪兽'},
    {cardType:'heart',num:10,name:'鸿门宴',type:'active',desc:'双方恢复2点生命值，双方抽一张卡后,你选一张卡，对方随机出一张卡进行拼点，赢的人获得两张拼点卡'},
    {cardType:'heart',num:11,name:'鸿门宴',type:'active',desc:'双方恢复2点生命值，双方抽一张卡后,你选一张卡，对方随机出一张卡进行拼点，赢的人获得两张拼点卡'},
    {cardType:'heart',num:12,name:'鸿门宴',type:'active',desc:'双方恢复2点生命值，双方抽一张卡后,你选一张卡，对方随机出一张卡进行拼点，赢的人获得两张拼点卡'},
    {cardType:'heart',num:13,name:'鸿门宴',type:'active',desc:'双方恢复2点生命值，双方抽一张卡后,你选一张卡，对方随机出一张卡进行拼点，赢的人获得两张拼点卡'},
    
    //梅花特殊卡13    4血腥 3移花 3梁上 3投石  
    {cardType:'club',num:1,name:'血腥镇压',type:'counterattack',desc:'支付两点生命值，无效对方一张卡的发动，并抽一张卡'},
    {cardType:'club',num:2,name:'血腥镇压',type:'counterattack',desc:'支付两点生命值，无效对方一张卡的发动，并抽一张卡'},
    {cardType:'club',num:3,name:'血腥镇压',type:'counterattack',desc:'支付两点生命值，无效对方一张卡的发动，并抽一张卡'},
    {cardType:'club',num:4,name:'血腥镇压',type:'counterattack',desc:'支付两点生命值，无效对方一张卡的发动，并抽一张卡'},
    {cardType:'club',num:5,name:'移花接木',type:'active',desc:'双方场上都有怪兽才能发动，夺取对方场上怪兽一张装备卡，装备到自己怪兽身上'},
    {cardType:'club',num:6,name:'移花接木',type:'active',desc:'双方场上都有怪兽才能发动，夺取对方场上怪兽一张装备卡，装备到自己怪兽身上'},
    {cardType:'club',num:7,name:'移花接木',type:'active',desc:'双方场上都有怪兽才能发动，夺取对方场上怪兽一张装备卡，装备到自己怪兽身上'},
    {cardType:'club',num:8,name:'梁上君子',type:'active',desc:'抽取对方一张手卡，并进行一次判定，红色双方抽一张卡，黑色你弃置一张卡'},
    {cardType:'club',num:9,name:'梁上君子',type:'active',desc:'抽取对方一张手卡，并进行一次判定，红色双方抽一张卡，黑色你弃置一张卡'},
    {cardType:'club',num:10,name:'梁上君子',type:'active',desc:'抽取对方一张手卡，并进行一次判定，红色双方抽一张卡，黑色你弃置一张卡'},
    {cardType:'club',num:11,name:'投石问路',type:'active',desc:'弃置对方一张手卡，或者清除对方一张反击区域的卡，不能对装备卡使用'},
    {cardType:'club',num:12,name:'投石问路',type:'active',desc:'弃置对方一张手卡，或者清除对方一张反击区域的卡，不能对装备卡使用'},
    {cardType:'club',num:13,name:'投石问路',type:'active',desc:'弃置对方一张手卡，或者清除对方一张反击区域的卡，不能对装备卡使用'},
    
    //方块防御卡13    5装备 2砸脚 3背水 3金汤
    {cardType:'diamond',num:1,name:'反甲',type:'equip',desc:'装备的怪兽在对方回合，对方怪兽攻击会受到双倍反伤，装备怪兽受到伤害不会结算到玩家上'},
    {cardType:'diamond',num:2,name:'护心镜',type:'equip',desc:'装备的怪兽即将被破坏时，破坏此卡并免疫这次破坏'},
    {cardType:'diamond',num:3,name:'八卦阵',type:'equip',desc:'装备的怪兽被攻击时，进行一次判定，如果为红则取消这次攻击'},
    {cardType:'diamond',num:4,name:'火焰甲',type:'equip',desc:'被攻击造成的伤害由对方承受'},
    {cardType:'diamond',num:5,name:'血铠',type:'equip',desc:'装备的怪兽被攻击时，我方恢复发起攻击怪兽的攻击力'},
    {cardType:'diamond',num:6,name:'搬石砸脚',type:'counterattack',desc:'对方攻击时发动，变为对对方造成攻击怪兽的攻击力伤害'},
    {cardType:'diamond',num:7,name:'搬石砸脚',type:'counterattack',desc:'对方攻击时发动，变为对对方造成攻击怪兽的攻击力伤害'},
    {cardType:'diamond',num:8,name:'背水一战',type:'counterattack',desc:'我方怪兽被攻击时可以发动，该回合该怪兽使用攻击力进行防御结算并不会破坏'},
    {cardType:'diamond',num:9,name:'背水一战',type:'counterattack',desc:'我方怪兽被攻击时可以发动，该回合该怪兽使用攻击力进行防御结算并不会破坏'},
    {cardType:'diamond',num:10,name:'背水一战',type:'counterattack',desc:'我方怪兽被攻击时可以发动，该回合该怪兽使用攻击力进行防御结算并不会破坏'},
    {cardType:'diamond',num:11,name:'固若金汤',type:'counterattack',desc:'我方怪兽被攻击时可以发动，对方抽一张卡并结束战斗阶段'},
    {cardType:'diamond',num:12,name:'固若金汤',type:'counterattack',desc:'我方怪兽被攻击时可以发动，对方抽一张卡并结束战斗阶段'},
    {cardType:'diamond',num:13,name:'固若金汤',type:'counterattack',desc:'我方怪兽被攻击时可以发动，对方抽一张卡并结束战斗阶段'},

    //基础卡50 20急袭 20格挡 3决斗 
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"},
    {cardType:"basic",num:3,name:"决斗",type:'active',desc:"从对方开始轮流出 急袭卡，直到一方无法再出，则收到这次决斗累计的杀数量的伤害+1"},
    {cardType:"basic",num:3,name:"决斗",type:'active',desc:"从对方开始轮流出 急袭卡，直到一方无法再出，则收到这次决斗累计的杀数量的伤害+1"},
])
//未加入卡片 
//{cardType:'',num:,name:'反守为攻',type:'counterattack',desc:'我方怪兽被攻击时可以发动，我方此怪兽本回合用攻击力进行防御'},
const botCardList = ref([{},{},{},{},{}])
const cardsListNow = ref([])
const usedCardsList = ref([])
const mesList = ref([])
//历史操作记录
const monsterCallNum = ref(0)
//双方通用的每回合可召唤次数/回合数量记录
const whosTurn = ref("")
const outOfOrder = ((list)=>{
    let len = list.length;
    for (let i = 0; i < len - 1; i++) {
        let index = parseInt(Math.random() * (len - i));
        let temp = list[index];
        list[index] = list[len - i - 1];
        list[len - i - 1] = temp;
    }
    return list;
}) //打乱数组的排列并返回处理完成的数组
const usedCardsNum = ref(0)
//每回合使用的卡总数
const monsterNameList = ref([
  {id:0,name:"无尽假日"},
  {id:1,name:"吸血鬼-尼古拉斯"},
  {id:2,name:"幽灵水鬼"},
  {id:3,name:"初级boss-嗜血树精"},
])
const monstersListOnlyRead = ref([
  {name: monsterNameList.value[0].name,start: 7,cost:1,type:"monster",num:0,attack:4,defense:3,
  desc:"当这张卡出场后开始记录，我方回合每使用五张卡发动，从牌堆摸两张卡",},
  {name: monsterNameList.value[1].name,start: 4,cost:1,type:"monster",num:0,attack:2,defense:3,
  desc:"这样卡每次我方回合结束攻击力上升一点，这张卡被破坏时随机失去一张手牌免于破坏。",},
  {name: monsterNameList.value[2].name,start: 5,cost:0,type:"monster",num:0,attack:5,defense:5,
  desc:"这样卡将在下一个我方回合到来时破坏。",},
  {name: monsterNameList.value[3].name,start: 8,cost:0,type:"monster",num:0,attack:5,defense:6,
  desc:"这样卡将在回合结束时对对方造成2点伤害，并为我方恢复2点生命值。",},
])
const monstersList = ref([])
const resetAll = ()=>{
  nextTick(()=>{
    monstersList.value = monstersListOnlyRead.value
    //读取全部怪兽信息
    mesList.value = []
    //清空操作记录
    deg.value = -90
    top.value = -100
    //收起功能按钮

    usedCardsList.value = []
    cardsListNow.value = []
    botHandCardList.value = []
    myHandCardList.value = []
    //清空牌堆/弃牌堆和双方手牌

    myMonsterList.value = [{},{},{},{},{}]
    botMonsterList.value = [{},{},{},{},{}]
    myCardList.value = [{},{},{},{},{}]
    botCardList.value = [{},{},{},{},{}]
    //清空场上双方卡牌

    botLifeNum.value = 20
    myLifeNum.value = 20
    //重置双方血量
    cardsListNow.value = outOfOrder(cardsList.value)
    //新的牌堆
  })
  
}
const showDialogMes = (title,time,then)=>{
  showDialogCardList.value = false
  //关掉怪兽选取框
  dialogWidth.value = 0
  dialogLeft.value = 200
  showDialog.value = false
  dialogText.value = ""
  //清空提示框数据
  nextTick(()=>{
  //title设置显示的文字  time设置显示的时间
    setTimeout(()=>{
      showDialog.value = true
      dialogText.value = title
      dialogWidth.value = 200
      nextTick(()=>{
        setTimeout(()=>{
          dialogLeft.value = 400
          dialogWidth.value = 0
          then()
          showDialog.value = false
        },time)
      })
    },300)

  })
}
const reStartGame = (()=>{
  resetAll()
  nextTick(()=>{
    setTimeout(()=>{
      myHandCardList.value = getCardFormList(myHandCardList.value,6)
      botHandCardList.value = getCardFormList(botHandCardList.value,6)
      // botHandCardList.value.push({cardType:"basic",num:3,name:"决斗",type:'active',desc:"从对方开始轮流出 急袭卡，直到一方无法再出，则收到这次决斗累计的杀数量的伤害+1"},) 
      // myHandCardList.value.push({cardType:"basic",num:3,name:"决斗",type:'active',desc:"从对方开始轮流出 急袭卡，直到一方无法再出，则收到这次决斗累计的杀数量的伤害+1"},) 
      // myHandCardList.value.push({cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},) 
      // myHandCardList.value.push({cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},) 
      // botHandCardList.value.push({cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},) 
      // botHandCardList.value.push({cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},) 
      // botHandCardList.value.push({cardType:"basic",num:1,name:"急袭",type:'active',desc:"对敌方造成两点伤害"},)
      // myHandCardList.value.push({cardType:"basic",num:2,name:"格挡",type:'counterattack',desc:"无效对方一张急袭，或者一次怪兽攻击"})
      // botHandCardList.value = []
      // myHandCardList.value.push({cardType:'diamond',num:2,name:'护心镜1',type:'equip',desc:'装备的怪兽即将被破坏时，破坏此卡并免疫这次破坏'})
      // myHandCardList.value.push({cardType:'spade',num:2,name:'护心镜2',type:'equip',desc:'装备的怪兽即将被破坏时，破坏此卡并免疫这次破坏'})
      // myHandCardList.value.push({cardType:'diamond',num:2,name:'护心镜3',type:'equip',desc:'装备的怪兽即将被破坏时，破坏此卡并免疫这次破坏'})
      // botHandCardList.value.push({cardType:'spade',num:2,name:'护心镜2',type:'equip',desc:'装备的怪兽即将被破坏时，破坏此卡并免疫这次破坏'})
      //双方发牌
      //确认先后攻 进行第一只召唤
      if(Math.random()>0.5){
        showDialogMes("对方先攻",1500,()=>{
          mesList.value.push("对方先攻")
          botChoiceMonster(monsterNameList.value[3].name,()=>{
            nextTick(()=>{
              setTimeout(()=>{
                myChoiceMonster()
              },2000)
            })
          }
          )
        })
      }else{
        showDialogMes("我方先攻",1500,()=>{
          mesList.value.push("我方先攻")
          myChoiceMonster()
          // botChoiceMonster(monsterNameList.value[3].name,()=>{})
          // myTrun()
        })
      }
    },300)
  })
})
const showDialog = ref(false)
const showDialogCardList = ref(false)
const dialogText = ref("")
const myChoiceMonster = ()=>{
  dialogWidth.value = 0
  dialogLeft.value = 200
  showDialog.value = false
  showDialogCardList.value = false
  choiceType.value = "choiceCard"
  //清空提示框数据
  nextTick(()=>{
    setTimeout(()=>{
      showDialogCardList.value = true
      dialogWidth.value = 200
      mesList.value.push("我方查看可召唤怪兽")
      //展示可选怪兽
    },300)

  })
}
const botChoiceMonster =(monsterName,then)=>{
  let monster
  monstersListOnlyRead.value.forEach(item=>{
    if(item.name == monsterName){
      monster = item
    }
  })
  showDialogMes("对方召唤了 "+monster.name,1500,()=>{
    mesList.value.push("对方召唤了 "+monster.name)
  })
  setBotMonster(monster)
  then()

}
const setBotMonster = (monster)=>{
  if(!botMonsterList.value[1]?.name){
    botMonsterList.value[1] = monster
  }else if(!botMonsterList.value[0]?.name){
    botMonsterList.value[0] = monster
  }else if(!botMonsterList.value[2]?.name){
    botMonsterList.value[2] = monster
  }else if(!botMonsterList.value[3]?.name){
    botMonsterList.value[3] = monster
  }else if(!botMonsterList.value[4]?.name){
    botMonsterList.value[4] = monster
  }else{
    mesList.value.push("没有位置可以进行召唤！")
  }
}
const checkCard = (cardList)=>{
  //bot出牌逻辑 暂时只有一张卡设置为优先使用
  let nokillList = []
  let killNum = 0
  cardList.forEach(item=>{
    if(item.name!='急袭'){
      nokillList.push(item)
    }else{
      killNum++
    }
  })
  if(killNum*2>myLifeNum.value){
    //如果一套 急袭 打完能斩杀
    //什么都不做，直接正常走下去
  }else{
    cardList = nokillList
    //留下 急袭卡，用于怪兽攻击，和下次斩杀
  }
  cardList.forEach(item=>{
    if(item.name == '生生不息'){
      return item
    }
  })
  console.log(cardList,"当前处理的数组")
  let result = {}
  if(cardList.length<=0){
    return result
  }
  console.log(botCardList.value)
  botCardList.value.map(item=>{
    console.log(item,"当前对方出牌区域")
    if(item?.name){
      console.log("这个位置被占用了")
      //如果是已经有数据
    }else{
      //空的
      result = cardList[0]
      //默认就出第一张
    }
  })
  return result

  //如果没牌出了 就进战阶
}
const addBotCardToArea = (card)=>{
  if(!botCardList.value[1]?.mode){
    botCardList.value[1] = card
    return true
  }else if(!botCardList.value[0]?.mode){
    botCardList.value[0] = card
    return true
  }else if(!botCardList.value[2]?.mode){
    botCardList.value[2] = card
    return true
  }else if(!botCardList.value[3]?.mode){
    botCardList.value[3] = card
    return true
  }else if(!botCardList.value[4]?.mode){
    botCardList.value[4] = card
    return true
  }else{
    return false
  }
}
const botFight = ()=>{
  console.log("进入对方战斗阶段")
  let killNum = 0
  botHandCardList.value.forEach(item=>{
    if(item.name=="急袭"){
      killNum++
    }
  })
  if(monsterCallNum.value==1||killNum<=0){
    mesList.value.push("第一回合不能攻击，自动结束战斗阶段")
    showDialogMes("首回合不能攻击，结束战斗阶段",1500,()=>{botEndTurn()})
  }else{
    botMonsterList.value = botMonsterList.value.map((item,index)=>{
      item.index = index
      return item
    })
    let attackMonsterList = getMaxtList(botMonsterList.value,[],"attack")
    //按照攻击力排序对方怪兽 从低到高
    let defenseMyMonsterList = getMaxtList(myMonsterList.value,[],"defense")
    //按照防御力排序我方怪兽
    attackMonsterList.forEach(item=>{
        let myDefenseMonsterList = []
        if(Array.isArray(defenseMyMonsterList)&&defenseMyMonsterList.length<=0){
          mesList.value.push("对方直接攻击，造成"+item.attack+"点伤害")
          myLifeNum.value-=item.attack
          botHandCardList.value = delOneCard("急袭",botHandCardList.value)
          //消耗一张 急袭
        }//处理多出来的进行直接攻击
        defenseMyMonsterList.forEach(item1=>{
          if(item.attack>item1.defense){
              mesList.value.push("对方的"+ item.name +"对我方的"+item1.name+"进行了攻击")
              mesList.value.push("造成了"+ (item.attack-item1.defense) +"点伤害")
              myLifeNum.value -= (item.attack-item1.defense)
              botHandCardList.value = delOneCard("急袭",botHandCardList.value)
              //消耗一张 急袭
              if(item1.name==monsterNameList.value[1].name&&Array.isArray(myHandCardList.value)&&myHandCardList.value.length>0){
                //如果是吸血鬼，自动发动不死之身效果
                myLifeNum.value-=item1.cost
                //支付生命值发动效果
                let handCards = []
                let randomNum = Math.ceil(Math.random()*myHandCardList.value.length)
                mesList.value.push("随机丢弃的牌是第"+randomNum+"张")
                myHandCardList.value.forEach((item3,index3)=>{
                    if(index3==randomNum-1){
                      //去掉随机丢弃这张
                    }else{
                      handCards.push(item3)
                    }
                })
                myHandCardList.value = handCards
              }else{
                myMonsterList.value = myMonsterList.value.map(item2=>{
                  if(item2.name == item1.name){
                    item2 = {}
                  }
                  return item2
                })//去掉被攻击的我方怪兽
                myCardList.value = myCardList.value.map(item3=>{
                  if(item3==item1?.monsterLinkEquipAttack){
                    item3 = {}
                  }
                  if(item3==item1?.monsterLinkEquipDefense){
                    item3 = {}
                  }
                  return item3
                })
              }
              
              // showDialogMes(("对方使用 "+ item.name + " 攻击我方 " + item1.name),1500,()=>{})
          }else{
            myDefenseMonsterList.push(item1)
          }
        })
        defenseMyMonsterList = myDefenseMonsterList
      
    })
    nextTick(()=>{
      showDialogMes("对方结束战斗阶段",1500,()=>{botEndTurn()})
    })
  }

}//为了方便处理，所有怪兽限一
const getMaxtList = (list,resultList,ability)=>{
  //根据数据内某个指定的数据进行排序
  console.log(ability)
  let max
  let resList = []
  let isFirst = true
  list.forEach((item)=>{
    if(item?.name){
      if(isFirst){
        max = item
        max.index = item.index
        isFirst = false
      }else{
        if(max[ability]){
          if(max[ability]<item[ability]){
            max = item,
            max.index = item.index
          }
        }else{
          max = item
          max.index = item.index
        }
      }
      
    }
  })
  console.log(max)
  list.forEach(item=>{
    if(item?.name){
      if(item.name!=max.name){
      resList.push(item)
    }
    }
  })
  console.log(resList)
  resultList.push(max)
  if(Array.isArray(resList) && resList?.length>0){
    return getMaxtList(resList,resultList,ability)
  }else{
    return resultList
  }
}

const botEndTurn= ()=>{
  mesList.value.push("对方进入弃牌阶段")
  showDialogMes("对方进入弃牌阶段",1500,()=>{botHandCardList.value = endTurnLostCard(botHandCardList.value,"对方");myTrun()})
}
const botHasMonster = ()=>{
  let result = false
  botMonsterList.value.forEach(item=>{
    if(item?.name){
      result = true
    }
  })
  return result
}
const botUseCard =()=>{
  console.log("处理bot的出牌逻辑")
  // console.log(botCardList.value)
    nextTick(()=>{
      let card = checkCard(botHandCardList.value)
      let canGo = true
    //确认bot要出的牌
    console.log(card)
    if(!card?.type){
      //如果当前没牌能出，则进战)
      showDialogMes("对方战斗阶段",1500,()=>{botFight()})
    }else{
      if(card.type =="counterattack"){
        //如果是反击卡
        card.mode = "back"
      }else if(card.type =="equip"){
        //如果是装备卡(装备卡也可以伏盖，bot暂时没这种逻辑)
        if(botHasMonster()){
          //如果有对应的怪兽可以挂装备
        }else{
          //中断这次的逻辑，因为没有怪兽给你挂装备
          canGo = false
        }
        card.mode = "equip"
      }else if(card.type =="active"){
        //如果是装备卡(装备卡也可以伏盖，bot暂时没这种逻辑)
        card.mode = "active"
      }
      if(canGo){
        if(addBotCardToArea(card)){
        //如果成功放入
        let botHandResult = []
        botHandCardList.value.forEach(item=>{
          if(item==card){
            //从手卡去除当前使用的卡
          }else{
            botHandResult.push(item)
          }
        })
        botHandCardList.value = botHandResult
        if(card.mode=="back"){
          mesList.value.push("对方伏盖了一张卡")
          showDialogMes("对方伏盖了一张卡",1500,()=>{botUseCard()})
          //伏盖卡片不需要马上处理
        }else if(card.mode=="equip"){
          mesList.value.push("对方装备了"+card.name)

          botMonsterList.value =  botMonsterList.value.map(item=>{
            if(item.name==monsterNameList.value[0].name){
              //处理用五摸二的怪物能力
              item.num++//标记加1
              if(item.num>=5){
                //如果够五张,触发摸牌能力
                botHandCardList.value = getCardFormList(botHandCardList.value,2)
                mesList.value.push("触发了" +monsterNameList.value[0].name+"能力，摸两张牌")
                item.num = 0
                botLifeNum.value-=1
                //支付生命值
              }
            }
            return item
          })
          //只有装备或者使用算，伏盖不算入本回合使用的卡
          
          console.log(botCardList.value)
          nextTick(()=>{
            //绑定装备的怪兽名称
            botCardList.value = checkEquip(card,botCardList.value)
            console.log(botCardList.value)
            showDialogMes("对方装备了"+card.name,1500,()=>{botUseCard()})
            //装备卡片只需要在伤害结算或者装备顶掉了的时候才需要改动
          })
          
        }else if(card.mode=="active"){
          mesList.value.push("对方发动了"+card.name)
          botMonsterList.value =  botMonsterList.value.map(item=>{
            if(item.name==monsterNameList.value[0].name){
              //处理用五摸二的怪物能力
              item.num++//标记加1
              if(item.num>=5){
                //如果够五张,触发摸牌能力
                botHandCardList.value = getCardFormList(botHandCardList.value,2)
                mesList.value.push("触发了" +monsterNameList.value[0].name+"能力，摸两张牌")
                item.num = 0
                botLifeNum.value-=1
                //支付生命值
              }
            }
            return item
          })
          //只有装备或者使用算，伏盖不算入本回合使用的卡
          showDialogMes("对方发动了"+card.name,1300,()=>{
            //只有装备或者使用算，伏盖不算入本回合使用的卡
          useActive(card,botCardList.value)
          })
          
        }
        
      }else{
        showDialogMes("对方战斗阶段",1500,()=>{botFight()})
        //结束循环
      }
      }
    }
    })
}
const checkEquip = (card,cardList)=>{
  // nextTick(()=>{
  let hasInput = false
    botMonsterList.value = botMonsterList.value.map(item=>{
      if(item?.name&&!hasInput){
        card.equipLinkMonster = {
          name:item.name,start:item.start,cost:item.cost,type:item.type,num:item.num,attack:item.attack,defense:item.defense,
        }
        if(card.cardType=="spade"){
          item.monsterLinkEquipAttack = {cardType:card.cardType,num:card.type,name:card.name,type:card.type,desc:card.desc,}
        }else if(card.cardType=="diamond"){
          item.monsterLinkEquipDefense = {cardType:card.cardType,num:card.type,name:card.name,type:card.type,desc:card.desc,}
        }
        hasInput = true
      }
      return item
    })
    console.log(card,cardList)
    let newCardList = []
    let cancel = false
    for(let i =0;i<cardList.length;i++){
      if(cancel&&card.cardType==cardList[i].cardType&&card.type==cardList[i].type){
        newCardList.push({card})
        recycleList.value.push()
        //直接顶掉同类型的装备
        recycleList.value.push(cardList[i])
        //加入弃牌堆
      }else if(card.cardType==cardList[i].cardType&&card.type==cardList[i].type){
        //确保顶掉的是装备而且是同为防御/进攻装备
        cancel = true
        newCardList.push(card)
      }else{
        newCardList.push(cardList[i])
      }
      console.log(newCardList)
    }

    cardList = newCardList
    console.log(cardList)
    return cardList
  // })
  
  
}
const delectCardActive = (card,usedManList)=>{
  let usedList = []
      usedManList.forEach(item=>{
        if(item!=card){
          //因为人机不会盖放除了反击外的卡，所以这里一定是唯一的
          usedList.push(item)
        }else{
          usedList.push({})
        }
      })
      botCardList.value = usedList
      //去掉卡片占用的发动占位
      recycleList.value.push(card)
      //加入弃牌堆
}
const activeCard = ref({})
const useActive = (card,usedManList)=>{
  //active类型卡的操作处理
  activeCard.value = card
  botHandCardList.value
  if(card.name == "急袭"){
    choiceType.value="defenseCard"
    monstersList.value = []
    recycleList.value.push(card)
    //发动后加入弃牌堆
    myCardList.value.forEach(item=>{
      if(item.name=="格挡"){
        monstersList.value.push(item)
      }
    })
    monstersList.value.push({name:"不响应"})
    showDialogCardList.value = true
    dialogWidth.value = 200
    dialogLeft.value = 200
  }else if(card.name == "决斗"){
    duelNum.value = 2
    //重置决斗伤害
    choiceType.value="duel"
    monstersList.value = []
    recycleList.value.push(card)
    //发动后加入弃牌堆
    myHandCardList.value.forEach(item=>{
      if(item.name=="急袭"){
        monstersList.value.push(item)
      }
    })
    monstersList.value.push({name:"不响应"})
    showDialogCardList.value = true
    dialogWidth.value = 200
    dialogLeft.value = 200
  }else{
    delectCardActive(activeCard.value,botCardList.value)
    //清除卡片（仅用于卡片效果梅全部完成）
    botUseCard()
    //继续对方出牌
  }
}
const botTurn = ()=>{
  monsterCallNum.value++
  whosTurn.value = "bot"
  mesList.value.push("对方的回合")
  botHandCardList.value = getCardFormList(botHandCardList.value,2)
  mesList.value.push("对方抽了两张卡")
  usedCardsNum.value = 0
  let hasMonster = false
  botMonsterList.value.forEach(item=>{
    if(item?.name){
      hasMonster = true
    }
  })
  if(!hasMonster){
    //如果场上没有怪兽，那么就要进行召唤
    //(除了第一次拉出来的怪，后面的都需要支付对应等级的生命值)
    let cost
    monstersList.value.forEach(item=>{
      if(item.name == monsterNameList.value[3].name){
        cost = item.start
      }
    })
    botLifeNum.value -=cost
    //支付生命值
    botChoiceMonster(monsterNameList.value[3].name,()=>{
      botUseCard()
    })
  }else{
    botUseCard()
  }
  

}
const myCardAreaCan = ref([])
const myCardIndex = ref(-1)
const showMyCardArea =()=>{
  myCardAreaCan.value = []
  let isOver = true
  if(!myCardList.value[0]?.name){
    myCardAreaCan.value.push(true)
    isOver = false
  }else{
    myCardAreaCan.value.push(false)
  }
  if(!myCardList.value[1]?.name){
    myCardAreaCan.value.push(true)
    isOver = false
  }else{
    myCardAreaCan.value.push(false)
  }
  if(!myCardList.value[2]?.name){
    myCardAreaCan.value.push(true)
    isOver = false
  }else{
    myCardAreaCan.value.push(false)
  }
  if(!myCardList.value[3]?.name){
    myCardAreaCan.value.push(true)
    isOver = false
  }else{
    myCardAreaCan.value.push(false)
  }
  if(!myCardList.value[4]?.name){
    myCardAreaCan.value.push(true)
    isOver = false
  }else{
    myCardAreaCan.value.push(false)
  }
  if(isOver){
    mesList.value.push("没有位置可以使用或者伏盖卡片！")
  }
}
const isMyturn = ref(false)
const showMyHandCardButton = ref(false)
const myHandCardUsedList = ref([])
const myUseCardIndex = ref(-1)
const myUseCards = (item,index)=>{
  myUseCardIndex.value = index
  showMyHandCardButton.value = !showMyHandCardButton.value
  if(item.type == "equip"){
    myHandCardUsedList.value = ["伏盖"]
    let haveMonster = false
    myMonsterList.value.forEach(item=>{
      if(item?.name){
        haveMonster = true
      }
    })
    if(haveMonster){
      myHandCardUsedList.value.push("装备")
    }
  }
  if(item.type == "counterattack"){
    myHandCardUsedList.value = ["伏盖"]
  }
  if(item.type == "active"){
    myHandCardUsedList.value = ["发动","伏盖"]
  }
  // if()
}
const usingCard = ref({})
const tipsValue = ref("")
const getTipsStyle =()=>{
  if(tipsValue.value.length<=0){
    return "opacity:0"
  }else{
    return "opacity:1"
  }
}
const showTipsMes = (title,then)=>{
  nextTick(()=>{
    tipsValue.value = title
    nextTick(()=>{
      setTimeout(()=>{
        tipsValue.value = ""
        then()
      },5000)
    })
  })
}
const canUseCard = (list)=>{
  let result = false
  list.forEach(item=>{
    if(!item?.name){
      result = true
    }//有一个空位就返回可以
  })
  return result
}
const useMyHandCards = (name,item)=>{
  usingCard.value = item
  if(canUseCard(myCardList.value)){
    if(name=="伏盖"){
      isShowSureCancelBlock.value = true
      showMyCardArea()//控制可选区域变色
      choiceType.value = "cover"
    }else if(name == "装备"){
      choiceType.value = "equip"
      if(myMonsterList.value.length<1){
        console.log("触发了装备")
        showTipsMes("没有可以装备的怪兽，无法使用装备卡",()=>{})

      }else{
        let monsterList = []
        myMonsterList.value.forEach(item=>{
          if(item?.name){
            monsterList.push(item)
          }
        })
        myMonsterList.value =  myMonsterList.value.map(item=>{
            if(item.name==monsterNameList.value[0].name){
              //处理用五摸二的怪物能力
              item.num++//标记加1
              if(item.num>=5){
                //如果够五张,触发摸牌能力
                myHandCardList.value = getCardFormList(myHandCardList.value,2)
                mesList.value.push("触发了" +monsterNameList.value[0].name+"能力，摸两张牌")
                item.num = 0
                botLifeNum.value-=1
                //支付生命值
              }
            }
            return item
          })
          //只有装备或者使用算，伏盖不算入本回合使用的卡
        monstersList.value = monsterList
        isMonsterEquip.value = true
        showDialogCardList.value = true
        dialogWidth.value = 0
        dialogLeft.value = 200
        dialogWidth.value = 200

        // console.log(choiceIndex.value)//当前选中的卡牌的index
        
        console.log()
      }

    }else if(name == "发动"){
      myMonsterList.value =  myMonsterList.value.map(item=>{
            if(item.name==monsterNameList.value[0].name){
              //处理用五摸二的怪物能力
              item.num++//标记加1
              if(item.num>=5){
                //如果够五张,触发摸牌能力
                myHandCardList.value = getCardFormList(myHandCardList.value,2)
                mesList.value.push("触发了" +monsterNameList.value[0].name+"能力，摸两张牌")
                item.num = 0
                botLifeNum.value-=1
                //支付生命值
              }
            }
            return item
          })
          //只有装备或者使用算，伏盖不算入本回合使用的卡
      myActiveCard()
    }
  }else{
    //没有格子可以使用卡片
  }
  
}
const myActiveCard = ()=>{
  //在这处理所有卡的发动逻辑
  // console.log("我方发动了"+usingCard.value.name)
  mesList.value.push("我方发动了"+usingCard.value.name)
  if(usingCard.value.name == "急袭"){
    let result = []
    let hasdel = false
    recycleList.value.push(usingCard.value)
    botCardList.value.forEach(item=>{
      if(item.name== "格挡"&&!hasdel){
        recycleList.value.push(item)
        result.push({})
        hasdel = true
      }else{
        result.push(item)
      }
    })
    botCardList.value =result
    if(hasdel){
      //进行了格挡
      showDialogMes("对方格挡",1000,()=>{
        mesList.value.push("对方进行了格挡")
      })
    }else{
      botLifeNum.value-=2
      showDialogMes("成功命中",1000,()=>{
        mesList.value.push("对方没有进行格挡，失去两点生命值.")
      })
    }
    myHandCardList.value = cleanCard(myHandCardList.value,usingCard.value)
  }else if(usingCard.value.name == "决斗"){
    duelNum.value = 2
    console.log("我方发动决斗")
    //重置决斗基础伤害
    // mesList.value.push("我方发动决斗")
    botCheckDuel()
    myHandCardList.value = cleanCard(myHandCardList.value,usingCard.value)
    //清除卡片 决斗
  }else{
    myHandCardList.value = cleanCard(myHandCardList.value,usingCard.value)
    //清除卡片（仅用于卡片效果梅全部完成）
  }
}

const myTrun = ()=>{
  whosTurn.value = "me"
  monsterCallNum.value++
  nowStep.value = 0
  //进入我方主1
  mesList.value.push("我方的回合")
  myHandCardList.value = getCardFormList(myHandCardList.value,2)
  mesList.value.push("我方抽了两张卡")
  usedCardsNum.value = 0
  isMyturn.value = true
}
const getCardFormList = (list,num)=>{
  if(cardsListNow.value<=num){
    console.log("牌堆的牌过少，弃牌堆中的牌将进行回收")
    console.log("弃牌堆：",recycleList.value.length)
    console.log("牌堆：",cardsListNow.value.length)
    recycleList.value.forEach(item=>{
      cardsListNow.value.push(item)
    })
    cardsListNow.value = outOfOrder(cardsListNow.value)
    recycleList.value = []
    //清空弃牌堆
  }
  let listNow = []
  for(let i=0;i<cardsListNow.value.length;i++){
    if(i<num){
      list.push(cardsListNow.value[i])
    }else{
      listNow.push(cardsListNow.value[i])
    }
  }
  cardsListNow.value = listNow
  //更新牌堆
  console.log("牌堆剩下:",listNow.length)
  return list
  //返回处理后的数组
}
const recycleList = ref([])
const endTurnLostCard = (list,who)=>{
  mesList.value.push(who+"进行弃牌处理")
  let num = list.length-6
  if(num<0){
    num = 0
  }
  let result = []
  mesList.value.push(who+"需要弃置"+num+'张牌')
  for(let i= 0;i<list.length ;i++){
    if(i>=6){
      recycleList.value.push(list[i])
    }else{
      result.push(list[i])
    }
  }
  return result 
}

const deg = ref(-90)
const top = ref(-100)
const changeTest = (()=>{
  
  let testList = [{name:3,attack:3},{name:5,attack:5},{name:1,attack:1},{},{}]
  testList = testList.map((item,index)=>{
      item.index = index
      return item
    })
  console.log(getMaxtList(testList,[],"attack"))
  // if(dialogWidth.value ==0){
  //   dialogWidth.value =200
  // }else{
  //   dialogWidth.value = 0
  // }
  // if(deg.value == -90){
  //   deg.value = 0
  //   top.value = 0
  // }else{
  //   deg.value = -90
  //   top.value = -100
  // }
  // myHandCardList.value = getCardFormList(myHandCardList.value,6)
  // botHandCardList.value = getCardFormList(botHandCardList.value,6)
  // //模拟摸6，然后弃牌测试自循环逻辑
  // myHandCardList.value = endTurnLostCard(myHandCardList.value,"我方")
  // botHandCardList.value = endTurnLostCard(botHandCardList.value,"对方")
})
const getDeg = (()=>{
  return "transform:rotate( "+ deg.value +"deg);top:"+ top.value+"px;"
})

const leftToplock = ref(true)

const showLeftTopButtons =(()=>{
  deg.value = 0
  top.value = 0
  nextTick(()=>{
    setTimeout(()=>{
    leftToplock.value = false
  },200)
  })
})
const closeLeftTopButtons =(()=>{
  if(!leftToplock.value){
    deg.value = -90
    top.value = -100
    leftToplock.value = true
  }
  
})

const botLifeNum= ref(20)
const getBotLive = (()=>{
  let css 
  css = "width:" + 404 * botLifeNum.value/20 + "px;"
  return css
})
const myLifeNum= ref(20)
const getMyLive = (()=>{
  let css 
  css = "width:" + 400 * myLifeNum.value/20 + "px;"
  return css
})
watch(botLifeNum,(newVal,oldVal)=>{
  if(newVal<=0){
    mesList.value.push("对方生命值耗尽，游戏结束")
  }
})
watch(myLifeNum,(newVal,oldVal)=>{
  if(newVal<=0){
    mesList.value.push("我方生命值耗尽，游戏结束")
  }
})

const botMonsterList = ref([{},{},{},{},{}])
const myMonsterList = ref([{},{},{},{},{}])
const myCardList = ref([{},{},{},{},{}])
const detailMes = ref({})
const showCardDetail = ((item)=>{
  detailMes.value = {}
  detailMes.value.name = item.name
  detailMes.value.desc = item.desc
  detailMes.value.type = item.type
  detailMes.value.equipLinkMonster = item?.equipLinkMonster?item.equipLinkMonster:null
  detailMes.value.monsterLinkEquipAttack = item?.monsterLinkEquipAttack?item.monsterLinkEquipAttack:null
  detailMes.value.monsterLinkEquipDefense = item?.monsterLinkEquipDefense?item.monsterLinkEquipDefense:null
  if(detailMes.value.type=="monster"){
    detailMes.value.start = item.start
    detailMes.value.cost = item.cost
    detailMes.value.attack = item.attack
    detailMes.value.defense = item.defense
    detailMes.value.num = item.num
  }

})
const getTypeText = (type)=>{
  if(type == "equip"){
    return "装备"
  }else if(type == "active"){
    return "主动"
  }else if(type == "counterattack"){
    return "反击"
  }else if(type == "monster"){
    return "怪兽"
  }
}
const myHandCardList = ref([])
const getMyHandCardStyle =()=>{
  let border = 1
  if(myHandCardList.value.length>=9){
    border = 2
  }
  if(myHandCardList.value.length>=16){
    border = 3
  }
  let width = 360/myHandCardList.value.length-border
  if(myHandCardList.value.length<=6){
    width = 60
  }
  let result = "width:"+width +"px;"
  if(width<15){
    result+= "font-size:"+ width +"px;"
  }
  return result
}

const botHandCardList = ref([])
const getBotHandCardStyle = ()=>{
  let border = 1
  if(botHandCardList.value.length>=8){
    border = 2
  }
  if(myHandCardList.value.length>=16){
    border = 3
  }
  let width = 364/botHandCardList.value.length-border
  if(botHandCardList.value.length<=7){
    width = 45
  }
  let result = "width:"+width +"px;"
  if(width<11.5){
    result+= "font-size:"+ width +"px;"
  }
  return result
}
const dialogWidth = ref(0)
// 0~200
const dialogLeft = ref(200)
// 200~400
const dialogStyle = ()=>{
  let result
  result = "width:" + dialogWidth.value + "px;"
  result += "left:" +dialogLeft.value +"px;"
  return result 
}
const getMonsterName = (name)=>{
  if(!name)return ""
  let list = name.split("-")
  if(list.length==1){
    return list[0]
  }else{
    return list[1]
  }
}
const getStartNum = (start)=>{
  let result = ""
  for(let i=0; i<start;i++){
    result+="♥"
  }
  return result
}
const choiceType = ref("")
const isShowSureCancelBlock = ref(false)
const showSureAndCancel = ()=>{
  isShowSureCancelBlock.value = true
}
const choiceIndex = ref(-1)
const choiceCardIndex = (index)=>{
  choiceIndex.value = index
}
const isChoiceCard = (index)=>{
  if(index == choiceIndex.value){
    return "background:#eee;"
  }else{
    return ""
  }
}
const isMonsterEquip = ref(false)
const makeSure = ()=>{
  console.log("choiceType:", choiceType.value)
  if(choiceType.value == "choiceCard"){
    if(!isMonsterEquip.value){
      mesList.value.push("我方选择了："+monstersList.value[choiceIndex.value].name)
      choiceType.value = "choiceArea"
      dialogWidth.value = 0
      dialogLeft.value = 200
      showDialog.value = false
      showDialogCardList.value = false
      //清空提示框数据
      showDialogMes("我方选择了 "+monstersList.value[choiceIndex.value].name,1500,()=>{
        showMyMonsterArea()

      })
    }
    
  }else if(choiceType.value == "choiceArea"){
    mesList.value.push("我方召唤了"+monstersList.value[choiceIndex.value].name)
    isShowSureCancelBlock.value = false
    if(myMonsterCardIndex.value==-1){
      myMonsterCardIndex.value = 0
      myMonsterAreaCan.value = [false,false,false,false,false]
    }//如果不选直接点确定 默认召唤到第一个位置
    myMonsterList.value[myMonsterCardIndex.value] = monstersList.value[choiceIndex.value]
    myMonsterCardIndex.value = -1//重置选择我方怪兽位置
    myMonsterAreaCan.value = [false,false,false,false,false]//重置可选怪兽区域（背景色)
    choiceIndex.value = -1
    //重置选中阴影
    console.log(botMonsterList.value.length)
    let botHasMonster = false
    botMonsterList.value.forEach(item=>{
      console.log(item)
      if(item?.name){
        //检查name属性确认是否存在数据
        botHasMonster = true
      }
    })
    if(botHasMonster){
      nextTick(()=>{
        setTimeout(()=>{
          mesList.value.push("对方出牌阶段")
          showDialogMes("对方出牌阶段",1500,()=>{botTurn()})
        },2000)
      })
    }else{
      showDialogMes("对方进行召唤",1500,()=>{
          mesList.value.push("对方进行召唤")
          botChoiceMonster(monsterNameList.value[3].name,()=>{
            nextTick(()=>{
              setTimeout(()=>{
                mesList.value.push("我方出牌阶段")
                showDialogMes("我方出牌阶段",1500,()=>{myTrun()})
              },2000)
            })
          }
          )
          })
    }
    
  }else if(choiceType.value == "cover"){
    usingCard.value.cover = true
    MyCarnArea()
    //展示可选的位置
    console.log(usingCard.value )
    mesList.value.push("我方伏盖了"+usingCard.value.name)
    myCardAreaCan.value = [false,false,false,false,false]
    myCardIndex.value = -1
    isShowSureCancelBlock.value = false
    myHandCardList.value=cleanCard(myHandCardList.value,usingCard.value)

  }else if(choiceType.value == "equip"){
    //是装备方法的话，走这里
      mesList.value.push("我方装备" + myHandCardList.value[myUseCardIndex.value].name+" 给"+monstersList.value[choiceIndex.value].name)
      
      showDialogCardList.value = false
      //关掉卡片选择，下一步选择装备卡放的位置
      dialogLeft.value = 400
      dialogWidth.value = 0
      choiceType.value = "choiceEquipArea"
      //关闭提示框,改变确认按钮的功能为选择区域
      showMyCardArea()
      //展示可选的位置
  }else if(choiceType.value == "choiceEquipArea"){
    if(myCardIndex.value==-1){
      mesList.value.push("请先选择卡片放置的位置!")
    }else{
      myCardAreaCan.value = [false,false,false,false,false]
      //关掉展示可放位置
      console.log(myCardIndex.value,myHandCardList.value[myUseCardIndex.value])
      myCardList.value = myCardList.value.map((item,index)=>{
        if(index == myCardIndex.value){
          item = myHandCardList.value[myUseCardIndex.value]
          item.equipLinkMonster = monstersList.value[choiceIndex.value]
          //保存绑定的怪兽数据
        }
        if(index != myCardIndex.value && item.cardType==myHandCardList.value[myUseCardIndex.value].cardType){
          recycleList.value.push(item)
          mesList.value.push("我方装备了同类装备，前者自动进入弃牌堆")
          item = {}
        }
        return item
      })
      console.log(myMonsterCardIndex.value)
      myMonsterList.value = myMonsterList.value.map((item)=>{
        if(item?.name){
          if(choiceIndex.value==0){
            myCardList.value.forEach((item1,index1)=>{
            if(index1 == myCardIndex.value){
              if(item1.cardType =="spade"){
                item.monsterLinkEquipAttack = item1
              }else if(item1.cardType =="diamond"){
                item.monsterLinkEquipDefense = item1
              }
            }//保存绑定的装备数据
          })
          }else{
            choiceIndex.value--
          }
        }
        return item
      })
      console.log(myMonsterList.value)
      myCardIndex.value = -1
      isShowSureCancelBlock.value = false//关闭确认和取消按钮
      let handList = []
      myHandCardList.value = myHandCardList.value.forEach(item=>{
        if(item == myHandCardList.value[myUseCardIndex.value]){
          //从手卡去掉这张卡
        }else{
          handList.push(item)
        }
      })
      myHandCardList.value = handList
    }
  }else if(choiceType.value == "attack"){
    //myMonsterCardIndex
    console.log(attackMyMonsterIndex.value)
    let result
    myMonsterList.value.forEach((item,index)=>{
      if(index == attackMyMonsterIndex.value){
        result = item
      }
    })
    mesList.value.push("我方使用"+result.name+"攻击对方"+ monstersList.value[choiceIndex.value].name )
    let damage = result.attack-monstersList.value[choiceIndex.value].defense
    delOneCard("急袭",myHandCardList.value)
    //消耗掉一张急袭
    if(monstersList.value[choiceIndex.value].name=="直接攻击"){
      damage = result.attack
    }
    if(damage>0){
      mesList.value.push("我方对对方造成了"+damage+"点伤害")
      botLifeNum.value -= damage
      botMonsterList.value = botMonsterList.value.map(item=>{
        if(monstersList.value[choiceIndex.value].name == item.name){
          console.log(item)
          if(item?.monsterLinkEquipAttack){
            //如果有装备，则装备也一起去掉
            botCardList.value = botCardList.value.map(item1=>{
              if(item1.name==item.monsterLinkEquipAttack.name){
                item1 = {}
              }
              return item1
            })
          }
          if(item?.monsterLinkEquipDefense){
            //如果有装备，则装备也一起去掉
            botCardList.value = botCardList.value.map(item1=>{
              if(item1.name==item.monsterLinkEquipDefense.name){
                item1 = {}
              }
              return item1
            })
          }
         item = {} 
        }
        return item
      })//去掉被攻击的怪物
    }else if(damage==0){
      mesList.value.push("我方未能击穿对方防御")
      botLifeNum.value -= damage
    }else if(damage<0){
      mesList.value.push("我方收到了对方反击，受到了"+(-1*damage)+"点伤害")
      myLifeNum.value -= damage
    }
    isShowSureCancelBlock.value = false
    monstersList.value = []
    showDialogCardList.value = false
    dialogLeft.value = 400
    dialogWidth.value = 0
  }else if(choiceType.value=="defenseCard"){

    delectCardActive(activeCard.value,botCardList.value)
    //清除卡片
    let useCard = monstersList.value[choiceIndex.value]
    mesList.value.push("我方选择"+ useCard.name)
    let backcards = []
    if(useCard.name!="不响应"){
      myCardList.value.forEach(item=>{
        if(useCard == item){
          //找到那一张格挡
          recycleList.value.push(item)
          //加入弃牌堆
          backcards.push({})
        }else{
          backcards.push(item)
        }
      })
      myCardList.value = backcards
      
      //去掉用掉的格挡卡
      mesList.value.push("我方进行了格挡")
    }else{
      //如果选择不响应
      myLifeNum.value-=2
      mesList.value.push("我方未进行格挡，失去两点生命值")
      //失去两点生命值
    }
    nextTick(()=>{
      
      botUseCard()
      // showDialogMes("对方发动了"+activeCard.value.name,1500,()=>{botUseCard()})
    })//继续对方出牌
  }else if(choiceType.value=="duel"){
    delectCardActive(activeCard.value,botCardList.value)
    //清除卡片 决斗
    let useCard = monstersList.value[choiceIndex.value]
    mesList.value.push("对方发动决斗")
    isShowSureCancelBlock.value = false
    //关掉确认和取消按钮
    if(useCard.name!="不响应"){
      isShowSureCancelBlock.value = false
      //去掉手牌中使用的 急袭
      duelNum.value++
      //增加本次决斗的伤害
      myHandCardList.value = delOneCard(useCard.name,myHandCardList.value)
      botCheckDuel()
    }else{
      //如果选择不响应
      myLifeNum.value-=duelNum.value
      mesList.value.push("我方未进行回击，失去"+duelNum.value+"点生命值")
      //失去两点生命值
      nextTick(()=>{
      botUseCard()
    })//继续对方出牌
    }
  }else if(choiceType.value == "keepDuel"){
    let useCard = monstersList.value[choiceIndex.value]
    //得到我方对 回应决斗的 选择
    // console.log("keepDuel",useCard)
    
    if(useCard.name == "急袭"){
      //继续回击
      duelNum.value++
      myHandCardList.value = delOneCard(useCard.name,myHandCardList.value)
      //继续增加本次决斗的伤害
      botCheckDuel()
      
    }else{
      //放弃回击
      myLifeNum.value-=duelNum.value
      //结算本次决斗的伤害
      isShowSureCancelBlock.value = false
      if(whosTurn.value=="bot"){
        botUseCard()
      }
      //继续对方出牌
    }
  }else if(choiceType.value == "choiceMoreMonster"){
    //进行怪物召唤
    let useCard = monstersList.value[choiceIndex.value]
    //得到我方对 怪物的 选择
    myLifeNum.value -=useCard.start
    //支付对应生命值
    choiceType.value = "choiceMyMonsterArea"
    showDialogCardList.value = false
    dialogWidth.value = 0
    dialogLeft.value = 400
    showMyMonsterArea()
  }else if(choiceType.value == "choiceMyMonsterArea"){
    if(myMonsterCardIndex.value==-1){
      myMonsterAreaCan.value = [false,false,false,false,false]
      //如果不选直接点确定 卡住
      showTipsMes("请选择召唤位置",()=>{})
    }else{
      mesList.value.push("我方召唤了"+monstersList.value[choiceIndex.value].name)
      isShowSureCancelBlock.value = false
      myMonsterList.value[myMonsterCardIndex.value] = monstersList.value[choiceIndex.value]
      myMonsterCardIndex.value = -1//重置选择我方怪兽位置
      myMonsterAreaCan.value = [false,false,false,false,false]//重置可选怪兽区域（背景色)
      choiceIndex.value = -1
      //重置选中阴影
    }
  }
}
const botCheckDuel = ()=>{
  let list = []
  botHandCardList.value.forEach(item=>{
    if(item.name=="急袭"){
      list.push(item)
    }
  })
  console.log(list)
  if(list.length>0){
    //如果还有 急袭 可以反击
    isShowSureCancelBlock.value = false
    showDialogCardList.value  = false
    dialogWidth.value = 0
    dialogLeft.value = 400
    //清除弹出框
    duelNum.value++
    //增加本次决斗的伤害
    mesList.value.push("对方继续回应决斗")
    choiceType.value = "keepDuel"
    //进入对拼循环
    showDialogMes("对方继续回应决斗",1000,()=>{
    botHandCardList.value = delOneCard("急袭",botHandCardList.value)
    //去掉手卡中一张

    monstersList.value = []
    myHandCardList.value.forEach(item=>{
      if(item.name=="急袭"){
        monstersList.value.push(item)
      }
    })
    monstersList.value.push({name:"不响应"})
      dialogWidth.value = 200
      dialogLeft.value = 200
      isShowSureCancelBlock.value = true
      showDialogCardList.value  = true
      //重新展示
    })
    
  }else{
    //如果对方没有反击用的 急袭 了
    showDialogMes("决斗成功",1000,()=>{
      mesList.value.push("对方没有可用的 急袭，结算决斗伤害"+duelNum.value+"点")
      botLifeNum.value-=duelNum.value
      isShowSureCancelBlock.value = false
      //关掉确认和取消按钮
      if(whosTurn.value=="bot"){
        botUseCard()
        //继续对方出牌
      }
    })
    
  }
}
const delOneCard = (name,list)=>{
  let hasfind = false
  let result = []
  list.forEach(item=>{
    if(item.name==name&&!hasfind){
      //去掉
      recycleList.value.push(item)
      //加入弃牌堆
      hasfind = true
    }else{
      result.push(item)
    }
  })
  return result
}
const duelNum = ref(-1)
const attackMyMonsterIndex = ref(-1)
const MyCarnArea = ()=>{
  let resultList = []
  if(myCardIndex.value!=-1){
    for(let i = 0;i<myCardList.value.length;i++){
      if(i ==  myCardIndex.value){
        resultList.push(usingCard.value)
      }else{
        resultList.push(myCardList.value[i])
      }
    }
  }else{
    let hasinput = false
    for(let i = 0;i<myCardList.value.length;i++){
      if(myCardList.value[i]=={}&&!hasinput){
        resultList.push(usingCard.value)
        hasinput = true
      }else{
        resultList.push(myCardList.value[i])
      }
    }
  }
    
    myCardList.value = resultList
    //更新我方后场
}
const cleanCard = (list,card)=>{
  let resultList = []
  let hasmove = false
  list.forEach(item=>{
    if(item.name==card.name&&!hasmove){
      //跳过一张这个同名卡。从手卡中移出
      hasmove = true
    }else{
      resultList.push(item)
    }
  })
  return resultList
}
const myMonsterAreaCan = ref([])
const showMyMonsterArea =()=>{
  myMonsterAreaCan.value = []
  let isOver = true
  if(!myMonsterList.value[0]?.name){
    myMonsterAreaCan.value.push(true)
    isOver = false
  }else{
    myMonsterAreaCan.value.push(false)
  }
  if(!myMonsterList.value[1]?.name){
    myMonsterAreaCan.value.push(true)
    isOver = false
  }else{
    myMonsterAreaCan.value.push(false)
  }
  if(!myMonsterList.value[2]?.name){
    myMonsterAreaCan.value.push(true)
    isOver = false
  }else{
    myMonsterAreaCan.value.push(false)
  }
  if(!myMonsterList.value[3]?.name){
    myMonsterAreaCan.value.push(true)
    isOver = false
  }else{
    myMonsterAreaCan.value.push(false)
  }
  if(!myMonsterList.value[4]?.name){
    myMonsterAreaCan.value.push(true)
    isOver = false
  }else{
    myMonsterAreaCan.value.push(false)
  }
  if(isOver){
    mesList.value.push("没有位置可以进行召唤！")
  }
}
const getMyMonsterBackground = (index)=>{
  let result = ""
  if(myMonsterAreaCan.value[index]){
    result+= "background:#e9f8ff"
  }else{
    result += ""
  }
  if(index == myMonsterCardIndex.value){
    return "background: rgb(189 234 255);"
  }
  return result
}
const getMyCardBackground = (index)=>{
  let result = ""
  if(myCardAreaCan.value[index]){
    result+= "background:#e9f8ff"
  }else{
    result += ""
  }
  if(index == myCardIndex.value){
    return "background: rgb(189 234 255);"
  }
  return result
}
const myMonsterCardIndex = ref(-1)
const choiceMyMonsterCardIndex = (index)=>{
  if(myMonsterCardIndex.value == index){
    myMonsterCardIndex.value = -1
  }else{
    myMonsterCardIndex.value = index
  }
}
const choiceMyCardIndex = (index)=>{
  if(myCardIndex.value == index){
    myCardIndex.value = -1
  }else{
    myCardIndex.value = index
  }
}
const nowStep = ref(-1)
const enterFight = ()=>{
  //进战阶
  showDialogMes("战斗阶段",1000,()=>{
  nowStep.value = 1
  mesList.value.push("我方进入战斗阶段")
  if(monsterCallNum.value==1){
    mesList.value.push("第一回合不能攻击，自动结束战斗阶段")
    showDialogMes("首回合不能攻击，结束战斗阶段",1500,()=>{endMyTurn()})
  }else{
    //我方进行进攻
  }

  })
}
const enterMainTwo = ()=>{
  //进主2
  showDialogMes("主要阶段2",1000,()=>{
  nowStep.value = 2
  mesList.value.push("我方进入主要阶段2")
  })
}
const endMyTurn = ()=>{
  //结束阶段
  showDialogMes("结束阶段",1000,()=>{
  nowStep.value = -1
  mesList.value.push("我方结束阶段")
  myMonsterList.value = myMonsterList.value.map(item=>{

    if(item.name==monsterNameList.value[1].name){

      item.attack++
      mesList.value.push(item.name+"发动了能力，攻击力上升了一点")
      console.log(item)
    }//处理吸血鬼回合结束加攻击

    if(item.name==monsterNameList.value[2].name){
      if(item?.monsterLinkEquipAttack){
        myCardList.value = myCardList.value.map(item1=>{
          if(item1.name==item.monsterLinkEquipAttack.name){
            item1 = {}
          }
          return item1
        })
      }
      if(item?.monsterLinkEquipDefense){
        myCardList.value = myCardList.value.map(item1=>{
          if(item1.name==item.monsterLinkEquipDefense.name){
            item1 = {}
          }
          return item1
        })
      }
      item = {}
    }
    //处理回合结束自动破坏
    return item
  })
  myEndTurn()
  })
}
const myEndTurn= ()=>{
  mesList.value.push("我方进入弃牌阶段")
  showDialogMes("我方进入弃牌阶段",1500,()=>{myHandCardList.value = endTurnLostCard(myHandCardList.value,"我方");botTurn() })
}
const getAttackStyle=(index,item) =>{
  let killNum = 0
  myHandCardList.value.forEach(item=>{
    if(item.name=="急袭"){
      killNum++
    }
  })
  if(nowStep.value==1&&index == myMonsterCardIndex.value&&item?.name&&killNum>0){
    return true
  }else{
    return false
  }
  
}
const attack = (item,index)=>{
  let list = []
  botMonsterList.value.forEach((item1)=>{
    if(item1?.name){
      list.push(item1)
    }
  })
  if(list.length==0){
    list.push({name:"直接攻击"})
  }
  monstersList.value = list
  choiceType.value = "attack"
  dialogLeft.value = 200
  dialogWidth.value = 200
  showDialogCardList.value = true
  isShowSureCancelBlock.value = true
  attackMyMonsterIndex.value = index
}
const choiceMoreMonster = ()=>{
  if(!showDialogCardList.value){
    choiceType.value = "choiceMoreMonster"
    dialogWidth.value = 200
    dialogLeft.value = 200
    monstersList.value = monstersListOnlyRead.value
    showDialogCardList.value = true
  }else{
    dialogWidth.value = 0
    dialogLeft.value = 400
    monstersList.value = []
    showDialogCardList.value = false
  }
}

//it is obviously that attack card less than defend/heal card
//so i think control the monsters attribute is a good chioce to balance it 
//monster attack need not any card 

</script>
<template>
    <div class="background">
      <div class="more-button" @click="showLeftTopButtons">三</div>
      <div class="bot-life-block">
        <div class="bot-head-block"></div>
        <div class="bot-life" :style="getBotLive()"></div>
        <div class="bot-life-corner"></div>
        <div class="bot-hand-card-block">
          <div class="bot-hand-card" v-for="(item,index) in botHandCardList" :key="index" :style="getBotHandCardStyle()" @click="showCardDetail(item)">
            <div class="bot-hand-card-text" v-for="(item1,index) in item.name" :key="index">{{item1}}</div>
          </div>
        </div>
      </div>
      <div class="body-block">
          <div class="dialog-block" :style="dialogStyle()">
            <div v-if="showDialog" class="dialog-text">{{dialogText}}</div>
            <div v-for="(item,index) in monstersList" :key="index" v-show="showDialogCardList" class="dialog-cards-block" :style="isChoiceCard(index)"  @click="showCardDetail(item);showSureAndCancel();choiceCardIndex(index)">
                <div v-for="(item,index) in item.name" :key="index">{{item}}</div>
            </div>
          </div>
          <div class="meslist-block">
            <div v-for="(item,index) in mesList" :key="index" class="meslist-text">{{item}}</div>
          </div>
          <div class="card-block">
            <div class="bot-card-block">
              <div class="bot-monster-block" v-for="(item,index) in botCardList" :key="index" @click="(item.mode=='equip'||item.mode=='active')?showCardDetail(item):{} ">
                <div v-if="item.mode=='equip'||item.mode=='active'">{{item.name}}</div>
                <div v-if="item.mode=='back'">盖卡</div>
              </div>
              <div class="bot-monster-block" v-for="(item,index) in botMonsterList" :key="index" @click="showCardDetail(item)">{{item.name}}</div>
            </div>
            <div class="my-card-block">
              <div class="bot-monster-block" v-for="(item,index) in myMonsterList" :key="index" :style="getMyMonsterBackground(index)" @click="showCardDetail(item);choiceMyMonsterCardIndex(index)">
                {{item.name}}
                <div v-show="getAttackStyle(index,item)" class="attack-button" @click="attack(item,index)">攻击</div>
              </div>
              <div class="bot-monster-block" v-for="(item,index) in myCardList" :key="index" :style="getMyCardBackground(index)" @click="showCardDetail(item);choiceMyCardIndex(index)">{{item.name}}
                <div v-show="item?.cover" class="card-cover">c</div>
              </div>
            </div>
          </div>
          <div class="detail-block">
            <div class="detail-title">{{getMonsterName(detailMes.name)}}</div>
            <div v-if="detailMes.cost" class="detail-cost">💀{{detailMes.cost}}</div>
            <div class="detail-type">{{getTypeText(detailMes.type)}}</div>
            <div v-if="detailMes.start" class="detail-start-block">
              <div v-if="detailMes.start" class="detail-start">{{getStartNum(detailMes.start)}}</div>
            </div>
            <div v-if="detailMes.equipLinkMonster" class="detail-link" >B:{{detailMes.equipLinkMonster.name}}</div>
            <div v-if="detailMes.monsterLinkEquipAttack" class="detail-link" >B:{{detailMes.monsterLinkEquipAttack.name}}</div>
            <div v-if="detailMes.monsterLinkEquipDefense" class="detail-link1" >B:{{detailMes.monsterLinkEquipDefense.name}}</div>
            <div v-if="detailMes.attack" class="detail-attack">A: {{detailMes.attack}}</div>
            <div v-if="detailMes.defense" class="detail-defense">D: {{detailMes.defense}}</div>
            <div v-if="detailMes.type=='monster'" class="detail-num">N: {{detailMes.num}}</div>
            <div class="detail-text">{{detailMes.desc}}</div>
          </div>
          <div v-show="isShowSureCancelBlock" class="sure-cancel-block">
            <div  class="sure-block" @click="makeSure">确认</div>
            <div  class="cancel-block" @click="isShowSureCancelBlock = false;choiceIndex=-1">取消</div>
          </div>
      </div>
      <div class="my-block">
        <div class="tips" :style="getTipsStyle()">{{tipsValue}}</div>
        <div class="my-head-block">
          
        </div>
        <div class="my-hand-card-block">
          <div class="my-hand-card" v-for="(item,index) in myHandCardList" :key="index" :style="getMyHandCardStyle()" @click="showCardDetail(item);myUseCards(item,index)">
            <div class="my-hand-card-text" v-for="(item1,index1) in item.name" :key="index1">{{item1}}
            <div class="my-hand-card-buttons-block" v-show="showMyHandCardButton&&index==myUseCardIndex">
                <div class="my-hand-card-buttons" v-for="(item2,index2) in myHandCardUsedList" :key="index2" @click="useMyHandCards(item2,item)">
                  {{item2}}
                </div>
            </div>
            </div>
          </div>
        </div>
        <div class="my-life" :style="getMyLive()"></div>
        <div class="my-function">
          <div class="ex-cardlist-block" @click="choiceMoreMonster">EX</div>
          <div v-show="nowStep==0" @click="enterFight" class="ex-cardlist-block">战阶</div>
          <div v-show="nowStep==1" @click="enterMainTwo" class="ex-cardlist-block">主2</div>
          <div v-show="nowStep==0||nowStep==1||nowStep==2" @click="endMyTurn" class="ex-cardlist-block">结束</div>
        </div>
      </div>
      
      <div class="left-top-block" @mouseleave="closeLeftTopButtons" :style="getDeg()">
        <div v-show="top==0" class="begin-button" > 开始</div>
        <div v-show="top==0" class="restart-button" @click="reStartGame"> 重开</div>
      </div>
      <button class="test-button" @click="changeTest()">123</button>
    </div>
</template>

<style scoped>
.background{
  padding: 0;
  margin: 0;
  width: 600px;
  height: 400px;
  position: relative;
  /* background: #eee; */
      border: 1px #ddd solid;
  opacity: 0.5;
}
.more-button{
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.more-button:hover{
  cursor: pointer;
}
.bot-life-block{
  width: 84%;
  height: 80px;
  margin-left: 16%;
  /* background: #888; */
  position: relative;
}
.bot-life-corner{
  width: 20px;
  height: 50px;
  float: left;
  background: #ffeada;
}
.bot-hand-card-block{
  position: absolute;
  top: 4px;
  left: 20px;
  width: 384px;
  height: 56px;
  background: #f6f6f6;
  padding: 10px;
}
.bot-hand-card{
  text-align: center;
  height: 60px;
  width: 50px;
  border: 1px #444 solid;
  float: left;
  margin-right: 2px;
  font-size: 11.5px;
}
.bot-life{
  width: 404px;
  height: 5px;
  background: #f1dddd;
  float: right;
  border-bottom-left-radius: 2px;
  transition: 0.5s;
}
.bot-head-block{
  width: 80px;
  height: 80px;
  float: right;
  background: #eee;
  border-bottom-left-radius: 5px;
}
.left-top-block{
  position: absolute;
  top: -100px;
  left: 0;
  width: 100px;
  height: 100px;
  background: #eee;
  border-bottom-right-radius: 100%;
  overflow: hidden;
  /* transform:rotate(-90deg); */
  transition: 0.3s;
}
.begin-button{
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  padding-left: 18px;
  margin-top: 5px;
  color: #444;
}
.begin-button:hover{
  background: #f8f8f8;
  cursor: pointer;
}
.restart-button{
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  color: #888;
  padding-left: 18px;
}
.restart-button:hover{
  background: #f8f8f8;
  color: #444;
  cursor: pointer;
}
.test-button{
  position: absolute;
  right: 0;
  top: 0;
}
.body-block{
  width: 100%;
  height: 200px;
  position: relative;
}
.dialog-block{
  overflow-y: auto;
  overflow-x: hidden;
  white-space:nowrap;
  position: absolute;
  top: 60px;
  left: 200px;
  height: 80px;
  /* width: 200px; */
  background: #fff;
  border-top: 1px red solid;
  border-bottom: 1px red solid;
  transition: 0.2s;
  z-index: 9;
}
.dialog-text{
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 18px;
  color: #b97a7a;
}
.dialog-cards-block{
  overflow: hidden;
  text-align: center;
  width: 50px;
  height: 60px;
  border: 1px #888 solid;
  border-radius: 5px;
  font-size: 12px;
  margin: 5px;
  float: left;
  /* background: #888; */
}
.meslist-block{
  width: 160px;
  padding: 10px;
  height: 180px;
  background: #f7f7f7;
  float: left;
  display: block;
  overflow: auto;
}
.meslist-text{
  font-size: 12px;
}
.card-block{
  width: 40%;
  height: 100%;
  float: left;
}
.bot-card-block{
  width: 100%;
  height: 50%;
  /* border-bottom: 1px #ccc solid; */
}
.bot-monster-block{
  position: relative;
  width: 40px;
  height: 48px;
  margin-left: 6px;
  float: left;
  border: 1px #888 solid;
  /* margin-top: 1px; */
  color: #5a5050;
  font-size: 10px;
  text-align: center;
  /* overflow: hidden; */
  text-overflow: ellipsis;
}
.card-cover{
  position: absolute;
  bottom: 0;
  left: 20px;
  transform: translateX(-50%);
}
.attack-button{
  position: absolute;
  top: -20px;
  left: 0;
  width: 40px;
  background: #fff;
  border: 1px #444 solid;
  font-size: 14px;
  z-index: 3;
}
.attack-button:hover{
  cursor: pointer;
  background: #b3aeae;
  color: #fff;
}
.my-card-block{
  width: 100%;
  height: 50%;
}
.detail-block{
  width: 160px;
  height: 180px;
  float: left;
  background: #e4e4e4;
  padding: 10px;
  position: relative;
}
.detail-title{
  color: #b29e9e;
  font-weight: bold;
}
.detail-cost{
  color: #741313;
  position: absolute;
  top: 10px;
  right: 50px;
  font-size: 12px;
}
.detail-type{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 12px;
  color: #588693;
}
.detail-text{
  margin-top: 10px;
  font-size: 14px;
}
.sure-cancel-block{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
}
.sure-block{
  margin-left: 120px;
  height: 30px;
  width: 50px;
  line-height: 30px;
  text-align: center;
  color: #2991d8;
  float: left;
  cursor: pointer;
}
.cancel-block{
  cursor: pointer;
  float:right;
  height: 30px;
  width: 50px;
  line-height: 30px;
  text-align: center;
  color: #e75757;
  margin-right: 130px;
}
.detail-start-block{
  width: 100%;
  height: 16px;
  position: relative;
  margin-top: 5px;
  top: 0;
  right: 0;
}
.detail-start{
  float: left;
  padding: 0 1px;
  font-size: 16px;
  color: #800f0f;
}
.detail-link{
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 14px;
  color: #4c7e8a;
}
.detail-link1{
  position: absolute;
  bottom: 30px;
  left: 10px;
  font-size: 14px;
  color: #4c7e8a;
}
.detail-attack{
  position: absolute;
  bottom: 10px;
  right: 50px;
  font-size: 14px;
  color: #e86565;
}
.detail-defense{
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  color: #6597e8;
}
.detail-num{
  position: absolute;
  bottom: 30px;
  right: 10px;
  font-size: 14px;
  color: #6597e8;
}
.my-block{
  width: 100%;
  height: 120px;
  position: relative;
}
.tips{
  position: absolute;
  text-align: center;
  top: 5px;
  left: 120px;
  width: 400px;
  height: 15px;
  font-size: 12px;
  color: rgb(228, 152, 152);
  transition: 0.3s;
}
.my-head-block{
  height: 120px;
  width: 120px;
  float: left;
  background: #eee;
}
.my-hand-card-block{
  width: 380px;
  height: 80px;
  position: absolute;
  top: 20px;
  left: 120px;
  background: #f2fbfd;
  padding: 10px;
}
.my-hand-card{
  position: relative;
  text-align: center;
  width: 60px;
  height: 80px;
  border: 1px #444 solid;
  float: left;
  margin-right: 2px;
  font-size: 15px;
}
.my-hand-card-text{
  color: #ab8c8c;
}
.my-hand-card-buttons-block{
  position: absolute;
  top: -60px;
  left: 0;
  width: 50px;
  height: 40px;
  background: #fff;
}
.my-hand-card-buttons{
  text-align: center;
  width: 100%;
  height: 20px;
  cursor: pointer;
}
.my-hand-card-buttons:hover{
  color: #FFF;
  background: #6e6e6e;
}
.my-life{
  width: 400px;
  height: 5px;
  background: #f1dddd;
  float: left;
  border-top-right-radius: 2px;
  transition: 0.5s;
}
.my-function{
  width: 80px;
  height: 120px;
  float: right;
  background: #f7f9f9;
}
.ex-cardlist-block{
  font-size: 14px;
  text-align: center;
  height: 30px;
  width: 100%;
  line-height: 30px;
  color: #888;
  cursor: pointer;
}
.ex-cardlist-block:hover{
  color: #444;
  background: #fcf5f5;
}
</style>