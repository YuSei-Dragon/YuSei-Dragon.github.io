<script setup>

//大纲 
//公共卡组50
//公共卡组会微调，不同地图里面的元素不一样，但是整体不会大改
//每回合 抽2公共 1个人
//玩家初始体力1000，体力流失完毕就失败
//初始手卡6
//
//伤害计算看怪兽的攻击力（不存在直接攻击）
//伤害计算= 100*攻击者攻击力/被攻击者防御力 *（攻击怪兽生命值/被攻击怪兽生命值）
//生命值，可理解为体力，故对攻击力有影响
//种族值：数值不会大于自身种族值+20，初始三项数据计算公式
//三项种族值都-33，然后攻击力随机+5~-5，定好攻击力后， 得出来的数加到生命值上，防御力同理 
//大师模式，所有怪直接视为满级
//公共卡组一般 10金 10木 10水 10火 10土 根据地图会有变化，而且地形有增益 -属性卡（基本卡）
//基本卡的属性不是固定的，根据地形会变，从而影响不同角色的强度
//根据不同的地形，不同属性的总数会变
//属性克制伤害*1.5，防御伤害*0.5
//角色可以带3只上场，换角色回合不能出牌
//每只怪兽技能只能选3个
//手卡上限6
//金杀：3
//木杀：3
//水杀：3
//火杀：3
//土杀：3
//闪：12
//桃：4 修订：改为回复场上怪兽生命值数量的生命值
//决斗：2 修订，伤害计算为（杀+1）*100
//南蛮：3 修订，出一张杀相应，不然失去150生命值
//万箭：2 修订，出一张闪相应，不然失去150生命值
//酒：8 修订 下一张杀伤害结算伤害翻倍,可叠加
//无懈：4 
//拆桥：4
//顺手：3
//桃园：1
//五谷：2
//以上60张 锦囊/基本牌
//取消所有武器和防具
//取消距离机制

//以下是多人模式追加卡池
//铁索：4 
//借刀：2 

//火龙-幼崽形态1~20级 种族值： 攻88 防78 生70
//1级-炽焰 发动火杀的时候可以发动，丢弃一张火属性卡，这次攻击攻击力翻倍，一回合一次
//5级-火墙 火杀当闪用
//10级-涅槃 丢弃一张火属性卡，从公共卡组摸一张卡，一回合一次
//15级-展翅 丢弃一张木属性卡，回复一点生命，一回合一次
//20级-烈焰金爪 发动杀的时候可以发动， 丢弃一张金一张火，对方不能用闪相应
//火龙-少年形态20~40级
//火龙-成熟形态40~60级
//火龙-大师形态60~80级
//火龙-巅峰形态80~100级

//map1 教学关-仙人引路
//小怪-10血-5级
//

import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  defineProps,
  nextTick,
} from 'vue'
const props = defineProps({
    playerName:{
        type:String,
        default:"",
    },

})
const something = ref()
onMounted(()=>{
    init()
})
const init = ()=>{
  setTimeout(()=>{
    isLoaded.value = true
  },100)
}
const isLoaded = ref(false)
const getBackGroundStyle = ()=>{
  if(isLoaded.value){
    return "opacity:1;"
  }else{
    return "opacity:0.2"
  }
}
const isShowChoices = ref(true)
const isShowLearn = ref(false)
const learn = ()=>{
  isShowChoices.value = false
  isShowLearn.value = true
  playMesList.value = [
    {
      name:"呆猫王中王",
      monsterList:[
        {
          name:"呆猫",
          level:10,
          attack:40,
          defense:19,
          life:28,
        },
        {
          name:"呆猫",
          level:10,
          attack:38,
          defense:19,
          life:30,
        },
        {
          name:"呆猫王",
          level:10,
          attack:40,
          defense:19,
          life:28,
        },
      ],
      firstMonster: {
        name:"呆猫",
          level:10,
          attack:40,
          defense:19,
          life:28,
      }

    }
  ]
}
const playerList = ref([
  props.playerName,"呆猫王中王"
])
const FightBlock = defineAsyncComponent(() =>
  import("./FightBlock.vue")
)
const playMesList = ref([])
</script>
<template lang="pug">
.background(:style="getBackGroundStyle()")
  .choices-block(v-if="isShowChoices")
    .class-block(@click="learn()") 教学
    .explore-block 探险
  .learn-block(v-if="isShowLearn")
    FightBlock(:isFirst="false" :playerList="playerList" :playMesList="playMesList" :playerName="playerName")

</template>
<style scoped lang="scss">
.background{
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.3s;
  .choices-block{
    margin-top: 90px;
    width: 100%;
    height: 200px;
    .class-block{
      float: left;
      width: 160px;
      height: 160px;
      border: 1px #fff solid;
      border-radius: 10px;
      margin-left: 60px;
      background: #ffcdf954;
      text-align: center;
      line-height: 150px;
      font-size: 24px;
      color: #dc84c3;
      box-shadow: 1px 1px 5px 1px #bababa;
      transition: 0.3s;
      cursor: pointer;
    }
    .class-block:hover{
      background: #eeeeee86;
      color: #fff;
      box-shadow: none;
    }
    .explore-block{
      float: left;
      width: 160px;
      height: 160px;
      border: 1px #fff solid;
      border-radius: 10px;
      margin-left: 60px;
      background: #d0cdff54;
      text-align: center;
      line-height: 150px;
      font-size: 24px;
      color: #8487dc;
      box-shadow: 1px 1px 5px 1px #bababa;
      transition: 0.3s;
      cursor: pointer;
    }
    .explore-block:hover{
      background: #eeeeee80;
      color: #fff;
      box-shadow: none;
    }
  }
  .learn-block{
    width: 100%;
    height: 100%;
  }
}
</style>
