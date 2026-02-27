<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineEmits,
  defineProps,
  inject,
  reactive
} from 'vue'
import api from "./classicalChallengeApi.js"
import skillApi from "./skillList.js"
import runeApi from "./rune.js"
import wildMonsterApi from "./wildMonster.js"
import {useStore} from 'vuex'
import { useRouter,useRoute } from 'vue-router'
import atkIcon from '../../img/atkIcon.png'
import atkMagicIcon from '../../img/atkMagicIcon.png'
import effectIcon from '../../img/effect.png'
import normalAttributeIcon from '../../img/normal.png'
import jinAttributeIcon from '../../img/jin.png'
import muAttributeIcon from '../../img/mu.png'
import shuiAttributeIcon from '../../img/shui.png'
import huoAttributeIcon from '../../img/huo.png'
import tuAttributeIcon from '../../img/tu.png'
import planetApi from "../Planet/planetApi.js"
const MonsterMove = defineAsyncComponent(() =>
  import("./monsterMove.vue")
)
const rune = defineAsyncComponent(() =>
  import("./rune.vue")
)
const Animation = defineAsyncComponent(() =>
  import("./animation.vue")
)
const LifeChange = defineAsyncComponent(() =>
  import("./LifeChange.vue")
)
const router = useRouter()
const route = useRoute() // 添加useRoute来获取当前路由信息
const store = useStore()
const allMes = ref({})
onMounted(()=>{
    console.log("ground mounted")
    allMes.value = store.state.hajimiReset.allMes
    // 数据本地化，方便后续使用
    // console.log(allMes.value)
    let myMonsterList = []
    allMes.value.playerMes.monsterFightList.forEach(monIndex=>{
        myMonsterList.push(allMes.value.playerMes.monsterList[monIndex])
    })//设置出战精灵
    let level = route.query.level
    let type = route.query.type
    let lockLevel = route.query?.lockLevel||0
    //是否锁等级
    let ground = planetApi.getGroundByName(route.query.ground)
    let botMes = {}
    // console.log(route.query)
    if(type==="climb"){
        botMes = api.getMonsterMesByLevel(level)
    }else if(type==="wildBattle"){
        console.log("野生精灵对战")
        botMes = wildMonsterApi.getWildMonster(allMes.value.wildMonster)
        console.log(botMes)
    }else if(type==="campaign"){
        botMes = {
            name : allMes.value.campaignMes.botMonsterList[0].name,
            level : allMes.value.campaignMes.botMonsterList[0].level,
            monsterList:allMes.value.campaignMes.botMonsterList,//战役对决
        }
    }
    let fightMes = {
        myMes:{
            life: 1000,
            allLife: 1000,
            monsterList: api.getMonsterFightList(myMonsterList),//出战精灵
            power: 2,//初始灵力
        },
        botMes:{
            life: 1000,
            allLife: 1000,
            monsterList: api.getMonsterFightList(botMes.monsterList),//对手精灵
            power: 2,//初始灵力
        },
        ground: ground,
        turn:0,
        whosTurn:"",
        result:"",
    }
    if(lockLevel>0){
        fightMes.myMes.monsterList.map(item=>{
            if(item.level>lockLevel){
                item.level = lockLevel
                item.atk = Math.round(item.atk*lockLevel/item.level)
                item.def = Math.round(item.def*lockLevel/item.level)
                item.atkMagic = Math.round(item.atkMagic*lockLevel/item.level)
                item.defMagic = Math.round(item.defMagic*lockLevel/item.level)
                item.speed = Math.round(item.speed*lockLevel/item.level)
                //五项能力和等级同步下降到锁定等级同步水平
            }
        })
    }
    if(type==="campaign"){
        let myMonsterList = api.getMonsterFightList(allMes.value.campaignMes.myMonsterList)
        let oldLength = fightMes.myMes.monsterList.length
        myMonsterList.forEach(item=>{
            fightMes.myMes.monsterList.push({...item,
                isTemporary:true,
            })
        })
        allMes.value.fightMes = fightMes
        fightMes.myMes.monsterList.forEach((item,index)=>{
            if((oldLength>0)&&(index>(oldLength-1))){
                allMes.value.fightMes.myMes.power+=2
                allMes.value = api.callMonster("myMes",index,allMes.value,store)
            }
        })
        if(allMes.value.campaignMes.botPower>-1){
            fightMes.botMes.power = allMes.value.campaignMes.botPower
        }
    }//战役模式如果有友军的话先把友军召唤上场
    allMes.value.fightMes = fightMes
    console.log(fightMes)
    allMes.value = api.callMonster("botMes",0,allMes.value,store)
    api.gameStart(allMes.value,store)
    //开始游戏
})
const runAway = ()=>{
    
    router.push(`/hajimiReset/fight`)
}
const getLifeStyle = (who)=>{
    if(!allMes.value?.fightMes){
        return {}
    }//如果没有战斗数据，直接返回
    let width = 1
    if(who==="my"){
        width = allMes.value.fightMes.myMes.life/allMes.value.fightMes.myMes.allLife
    }else if(who==="bot"){
        width = allMes.value.fightMes.botMes.life/allMes.value.fightMes.botMes.allLife
    }
    if(width>1){
        width = 1
    }
    return {
        width: `${width *230}px`
    }
}
const getWidthFromLength = (list)=>{
    if(Array.isArray(list)&&list.length>0){
        let i = 0
        list.forEach(item=>{
            if(item.onGround){
                i++
            }
        })
        return {
            width: `${i *80}px`
        }
    }return ""
}
const getMonsterLifeStyle = (monster)=>{
    if(!monster){
        return {}
    }//如果没有战斗数据，直接返回
    let width = 1
    width = monster.nowLife/monster.life
    if(width>1){
        width = 1
    }
    return {
        width: `${width *50}px`
    }
}//控制场上精灵的血条
const selectedMonster = ref({
    name: "名字" ,
    attribute:"属性",
    level:1,
    skillList:[],
    atk:0,
    atkMagic:0,
    def:0,
    defMagic:0,
    life:1,
    // nowLife:Math.floor(Math.random()*200),
    nowLife:0,
    speed:0,
    groundIndex:-1,
    haveUseSkill:false,
    lock:0,
    healTurn:0,
    hurtTurn:0,
    healValue:0,
    hurtValue:0,
})
const selectMonster = (monster,groundIndex)=>{
    selectedMonster.value = monster
    selectedMonster.value.groundIndex = groundIndex
    let skillListDetail = []
    selectedMonster.value.skillList.forEach(skill=>{
        skillListDetail.push(skillApi.getSkillDetailByName(skill))
    })
    selectedMonster.value.skillListDetail = skillListDetail
}//选择场上精灵
const getMonsterIconStyle = (skill)=>{
    let url = ""
    if(skill.type==="atk"){
        url = atkIcon
    }else if(skill.type==="atkMagic"){
        url = atkMagicIcon
    }else{
        url = effectIcon
    }
    return {
        background: `url(${url}) no-repeat`,
        backgroundSize: "100% 100%",
    }
}
const getMonsterAttributeStyle = (skill)=>{
    let url = ""
    if(skill.attribute==="普通"){
        url = normalAttributeIcon
    }else if(skill.attribute==="金"){
        url = jinAttributeIcon
    }else if(skill.attribute==="木"){
        url = muAttributeIcon
    }else if(skill.attribute==="水"){
        url = shuiAttributeIcon
    }else if(skill.attribute==="火"){
        url = huoAttributeIcon
    }else if(skill.attribute==="土"){
        url = tuAttributeIcon
    }
    return {
        background: `url(${url}) no-repeat`,
        backgroundSize: "100% 100%",
    }
}
const selectMonsterOnHand = (index)=>{
    if(index === monsterChoicedIndex.value){
        monsterChoicedIndex.value = -1
    }else{
        monsterChoicedIndex.value = index
    }
}//选择手上的精灵
const monsterChoicedIndex = ref(-1)
const getMonsterOnHandStyle = (index)=>{
    if(index === monsterChoicedIndex.value){
        return "background-color: #666;"
    }return ""
}//控制选中手上精灵的样式
const callMonster = ()=>{
    let num = 0
    allMes.value.fightMes.myMes.monsterList.forEach(item=>{
        if(item.onGround&&item.onGround===true){
            num++
        }
    })
    if(num>=6){
        return store.commit("hajimiReset/setTipList",["最多只能召唤6只精灵！"])
    }
    if(monsterChoicedIndex.value<0){
        return store.commit("hajimiReset/setTipList",["请选择要召唤的精灵！"])
    }
    allMes.value = api.callMonster("myMes",monsterChoicedIndex.value,allMes.value,store)
    showMySkillTip.value = true
    mySkillTipBottom.value = "召唤了：" + allMes.value.fightMes.myMes.monsterList[monsterChoicedIndex.value].name + " !"
    setTimeout(() => {
        showMySkillTip.value = false
        mySkillTipTop.value = ""
        mySkillTipBottom.value = ""
    }, 2000)
}
const isShowDialog = ref(false)
// 添加一个Promise相关的ref来处理异步等待
const skillSelectionPromise = ref(null)
const selectedTarget = ref(null)
const useSkill = async(name)=>{
    let needChoice = skillApi.checkNeedChoice(name)
    if(needChoice){
        useSituation.value = skillApi.getSkillSituation("botMes",name,allMes.value)
        if(useSituation.value.length>0){
            isShowDialog.value = true
            // 创建Promise等待用户选择目标
            const promise = new Promise((resolve) => {
                skillSelectionPromise.value = resolve
            })
             // 等待用户选择目标
            const targetIndex = await promise
            selectedTarget.value = targetIndex
            // 隐藏弹窗
            isShowDialog.value = false
            executeSkill(name, targetIndex)
        }else{
            //没有可选目标，直接对玩家进行攻击
            executeSkill(name)
        }
    }else{
        //不需要选取目标，直接执行技能
        executeSkill(name)
    }
}//使用精灵技能,打开目标弹窗
const selectTarget = (target) => {
    selectedTarget.value = target.index
    // 如果有等待的Promise，则resolve它
    if (skillSelectionPromise.value) {
        skillSelectionPromise.value(target.index)
        skillSelectionPromise.value = null
    }
}// 目标选择方法
const executeSkill = async(name, target=null)=>{
    allMes.value = await skillApi.useSkill(name,"botMes",selectedMonster.value, target, allMes.value, store)
    console.log(allMes.value)
    showMySkillTip.value = true
    //展示技能发动提示
    mySkillTipTop.value = selectedMonster.value.name
    mySkillTipBottom.value = "使用了：" + name + " !"
    setTimeout(() => {
        showMySkillTip.value = false
        mySkillTipTop.value = ""
        mySkillTipBottom.value = ""
    }, 2000);
    if(allMes.value.fightMes.result!==""){
        console.log("获取到结果",allMes.value.fightMes.result)
        store.commit("hajimiReset/setTipList",
        [allMes.value.fightMes.result==="win"?"你赢了":"你输了"])
        store.commit("hajimiReset/setAllMes",allMes.value)
        router.push('/hajimiReset/fight/result')
    }
}
const useSituation = ref([])
const endTrun = ()=>{
    api.endTrun(allMes.value,store)
    api.botTurn(allMes.value,store,(name,skill)=>{
        showBotSkillTip.value = true
        //展示技能发动提示
        botSkillTipTop.value = name
        botSkillTipBottom.value = "使用了：" + skill + " !"
        setTimeout(() => {
            showBotSkillTip.value = false
            botSkillTipTop.value = ""
            botSkillTipBottom.value = ""

        }, 2000);
    },router)
}
const getDelayTip = (delayList)=>{
    let text = ""
    delayList.forEach((item,index) => {
        let textOne = ""
        if(item.type==="hurt"){
            if(item.valueType === "percent"){
                textOne += `${item.turn}回合后受到最大生命值${item.value}%伤害`
            }
        }
        if(item.type==="atk"){
            textOne += `${item.turn}回合后攻击等级${item.value>0?("+"+item.value):item.value}`
        }
        if(item.type === "atkMagic"){
            textOne += `${item.turn}回合后特殊攻击等级${item.value>0?("+"+item.value):item.value}`
        }
        if(item.type==="def"){
            textOne += `${item.turn}回合后防御等级${item.value>0?("+"+item.value):item.value}`
        }
        if(item.type === "defMagic"){
            textOne += `${item.turn}回合后特殊防御等级${item.value>0?("+"+item.value):item.value}`
        }
        if(item.type==="speed"){
            textOne += `${item.turn}回合后移动速度等级${item.value>0?("+"+item.value):item.value}`
        }
        if(text!==""){
            text += "，" + textOne
        }else{
            text += textOne
        }
    })
    return text

}
const getLvColor = (lv)=>{
    if(lv>0){
        return "color:#33e35d;"
    }else if(lv<0){
        return "color:#ff6868;"
    }return "color:#fff;"
}
const functionType = ref("monster")
const changeFunction = (type)=>{
    functionType.value = type
}
const animationRes = ref(false)
const animationNum = ref(0)
const isShowAnimation = ref(false)
const useRune = async(type)=>{
    useSituation.value = skillApi.getSkillSituation("botMes","",allMes.value)
    isShowDialog.value = true
    // 创建Promise等待用户选择目标
    const promise = new Promise((resolve) => {
        skillSelectionPromise.value = resolve
    })
    // 等待用户选择目标
    const targetIndex = await promise
    selectedTarget.value = targetIndex
    // 隐藏弹窗
    isShowDialog.value = false
    //得到要捕捉的对象
    console.log(type,targetIndex)
    let runeRes = runeApi.useRune(type,allMes.value,targetIndex,store)
    allMes.value = runeRes.allMes
    console.log(allMes.value)
    // 执行动画
    animationNum.value = runeRes?.percent||0
    animationRes.value = runeRes?.res||false
    if(animationNum.value>0){
        isShowAnimation.value = true
    }
}
const animationEnd = (res)=>{
    isShowAnimation.value = false
    if(res){
        store.commit("hajimiReset/setTipList",["捕捉成功！"])
        allMes.value.fightMes.result = "catch"
    }else{
        store.commit("hajimiReset/setTipList",["捕捉失败！"])
        endTrun()
    }
    if(allMes.value.fightMes.result==="catch"){
        //捕捉成功，添加到精灵列表
        // allMes.value = runeApi.catchMonster(allMes.value)
        // console.log(allMes.value)
        store.commit("hajimiReset/setAllMes",allMes.value)
        router.push('/hajimiReset/fight/result')
    }
}
const getMagnificationStyle = (monster)=>{
    if(monster.magnification>0){
        return "background-color:#ab1717;border-radius:4px;"
    }return ""
}
const showMySkillTip = ref(false)
const showBotSkillTip = ref(false)
const mySkillTipTop = ref("")
const mySkillTipBottom = ref("")
const botSkillTipTop = ref("")
const botSkillTipBottom = ref("")
</script>

<template lang="pug">
.fight-ground-block
    .fight-ground-turn-block(v-if="allMes?.fightMes?.whosTurn==='bot'")
    .fight-ground-header
        .fight-ground-header-head
        .fight-ground-header-life
            .fight-ground-header-life-line(:style="getLifeStyle('my')")
            .fight-ground-header-life-number {{allMes?.fightMes?.myMes?.life||"???"}}
            .fight-ground-header-power
                .fight-ground-header-power-point(v-for="i in (allMes?.fightMes?.myMes?.power || 0)" v-show="i>0")
            .fight-ground-header-skill-use-tip(v-if="showMySkillTip")
                .fight-ground-header-skill-use-tip-text {{mySkillTipTop}}
                .fight-ground-header-skill-use-tip-text {{mySkillTipBottom}}
        .fight-ground-header-head
        .fight-ground-header-life
            .fight-ground-header-life-line(:style="getLifeStyle('bot')")
            .fight-ground-header-life-number {{allMes?.fightMes?.botMes?.life||"???"}}
            .fight-ground-header-power
                .fight-ground-header-power-point(v-for="i in (allMes?.fightMes?.botMes?.power || 0)" v-show="i>0")
            .fight-ground-header-skill-use-tip(v-if="showBotSkillTip")
                .fight-ground-header-skill-use-tip-text {{botSkillTipTop}}
                .fight-ground-header-skill-use-tip-text {{botSkillTipBottom}}
    .fight-ground-turn 回合{{allMes?.fightMes?.turn}}
    .fight-ground-whosturn {{allMes?.fightMes?.whosTurn==="my"?"我":"对方"}}回合
    .fight-ground-catch-block(v-if="isShowAnimation" )
        Animation(:type="animationNum" :res="animationRes" @animationEnd="animationEnd")
    .fight-ground-monsters.my-monsters(v-if="allMes?.fightMes?.myMes?.monsterList?.length>0"
        :style="getWidthFromLength(allMes?.fightMes?.myMes?.monsterList)")
        .fight-ground-monster-block( v-for="(myMonster,groundIndex) in allMes?.fightMes?.myMes?.monsterList")
            .fight-ground-monster(v-if="myMonster.onGround" :style="getMagnificationStyle(myMonster)")
                MonsterMove(class="fight-ground-monster-img" :status="myMonster.status"
                    @click="selectMonster(myMonster,groundIndex)")
                .fight-ground-monster-life(:style="getMonsterLifeStyle(myMonster)")
                .fight-ground-monster-name(v-if="myMonster.name.length<=6") {{myMonster.name}}
                el-tooltip(effect="dark" :content="myMonster.name" placement="top" v-if="myMonster.name.length>6")
                    .fight-ground-monster-name {{myMonster.name}}
                .fight-ground-monster-level {{myMonster.level}}
                .fight-ground-monster-status
                    el-tooltip(effect="dark" :content="myMonster.lock+'自身回合无法使用技能'" placement="left-start")
                        .fight-ground-monster-lock(v-show="myMonster.lock>0")
                    el-tooltip(effect="dark" :content="myMonster.healTurn+'回合回复'+myMonster.healValue" placement="left-start")
                        .fight-ground-monster-heal(v-show="myMonster.healTurn>0")
                    el-tooltip(effect="dark" :content="myMonster.hurtTurn+'回合受伤'+myMonster.hurtValue" placement="left-start")
                        .fight-ground-monster-hurt(v-show="myMonster.hurtTurn>0")
                    el-tooltip(effect="dark" :content="myMonster.clean+'回合不受能力降低效果影响'" placement="left-start")
                        .fight-ground-monster-clean(v-show="myMonster.clean>0")
                    el-tooltip(effect="dark" content="护盾保护" placement="left-start")
                        .fight-ground-monster-protect(v-show="myMonster.protect>0")
                    el-tooltip(v-if="myMonster.delay&&myMonster.delay.length>0" effect="dark" :content="getDelayTip(myMonster.delay)" placement="left-start")
                        .fight-ground-monster-delay()
                .fight-ground-monster-lv
                    .fight-ground-monster-lv-one(:style="getLvColor(myMonster.atkLv)" v-show="myMonster.atkLv!==0") A:{{myMonster.atkLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(myMonster.defLv)" v-show="myMonster.defLv!==0") D:{{myMonster.defLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(myMonster.atkMagicLv)" v-show="myMonster.atkMagicLv!==0") Am:{{myMonster.atkMagicLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(myMonster.defMagicLv)" v-show="myMonster.defMagicLv!==0") Dm:{{myMonster.defMagicLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(myMonster.speedLv)" v-show="myMonster.speedLv!==0") S:{{myMonster.speedLv}}
                LifeChange(class="fight-ground-monster-life-change" :life="myMonster.nowLife")
    .fight-ground-monsters.bot-monsters(v-if="allMes?.fightMes?.botMes?.monsterList?.length>0"
        :style="getWidthFromLength(allMes?.fightMes?.botMes?.monsterList)")
        .fight-ground-monster-block( v-for="botMonster in allMes?.fightMes?.botMes?.monsterList")
            .fight-ground-monster(v-if="botMonster.onGround" :style="getMagnificationStyle(botMonster)")    
                MonsterMove(class="fight-ground-monster-img" :status="botMonster.status")
                .fight-ground-monster-life(:style="getMonsterLifeStyle(botMonster)")
                .fight-ground-monster-name(v-if="botMonster.name.length<=6") {{botMonster.name}}
                el-tooltip(effect="dark" :content="botMonster.name" placement="top" v-if="botMonster.name.length>6")
                    .fight-ground-monster-name {{botMonster.name}}
                .fight-ground-monster-level {{botMonster.level}}
                .fight-ground-monster-status
                    el-tooltip(effect="dark" :content="botMonster.lock+'自身回合无法使用技能'" placement="left-start")
                        .fight-ground-monster-lock(v-show="botMonster.lock>0")
                    el-tooltip(effect="dark" :content="botMonster.healTurn+'回合回复'+botMonster.healValue" placement="left-start")
                        .fight-ground-monster-heal(v-show="botMonster.healTurn>0")
                    el-tooltip(effect="dark" :content="botMonster.hurtTurn+'回合受伤'+botMonster.hurtValue" placement="left-start")
                        .fight-ground-monster-hurt(v-show="botMonster.hurtTurn>0")
                    el-tooltip(effect="dark" :content="botMonster.clean+'回合不受能力降低效果影响'" placement="left-start")
                        .fight-ground-monster-clean(v-show="botMonster.clean>0")
                    el-tooltip(effect="dark" content="护盾保护" placement="left-start")
                        .fight-ground-monster-protect(v-show="botMonster.protect>0")
                .fight-ground-monster-lv
                    .fight-ground-monster-lv-one(:style="getLvColor(botMonster.atkLv)" v-show="botMonster.atkLv!==0") A:{{botMonster.atkLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(botMonster.defLv)" v-show="botMonster.defLv!==0") D:{{botMonster.defLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(botMonster.atkMagicLv)" v-show="botMonster.atkMagicLv!==0") Am:{{botMonster.atkMagicLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(botMonster.defMagicLv)" v-show="botMonster.defMagicLv!==0") Dm:{{botMonster.defMagicLv}}
                    .fight-ground-monster-lv-one(:style="getLvColor(botMonster.speedLv)" v-show="botMonster.speedLv!==0") S:{{botMonster.speedLv}}
                LifeChange(class="fight-ground-monster-life-change" :life="botMonster.nowLife")
    .fight-ground-monster-ready-block
        .fight-ground-monster-ready-list-block
            .fight-ground-monster-ready-list(v-if="functionType==='monster'")
                el-popover(
                    effect="dark"
                    placement="top-end"
                    v-for="(monster,index) in allMes?.fightMes?.myMes?.monsterList"
                )
                    template(#reference)
                        .fight-ground-monster-ready-list-for(
                            :style="getMonsterOnHandStyle(index)"
                            @click="selectMonsterOnHand(index)" v-show="!monster.onGround&&monster.life>0" )
                            .fight-ground-monster-ready-list-for-name {{monster.name}}
                            .fight-ground-monster-ready-list-for-level {{monster.level}}
                            .fight-ground-monster-ready-list-for-dead(v-show="monster.isDead===true")
                    template(#default)
                        .fight-ground-monster-ready-list-for-detail(
                            style="width:150px;padding:0px;margin:0px;max-height:240px;overflow-y: auto;position: relative;"
                        )
                            .fight-ground-monster-ready-list-for-detail-name(
                                style="font-size: 12px;color: #fff;"
                            ) {{monster.name}}
                            .fight-ground-monster-ready-list-for-detail-level(
                                style="font-size: 10px;color: #fff;"
                            ) lv:{{monster.level}}
                            .fight-ground-monster-ready-list-for-detail-attribute(
                               :style="getMonsterAttributeStyle(monster)"
                            )
                            .fight-ground-monster-ready-list-for-detail-skill(v-for="skill in monster.skillList"
                            style="width:120px;margin-top:4px;")
                                .fight-ground-monster-ready-list-for-detail-skill-name(
                                    style="font-size: 10px;color: #fff;float: left;width: 100px;"
                                ) {{skillApi.getSkillDetailByName(skill).name}}
                                .fight-ground-monster-ready-list-for-detail-skill-cost(
                                    style="font-size: 10px;color: #fff;text-align:right;float: left;width: 20px;"
                                ) {{skillApi.getSkillDetailByName(skill).cost}}
                                .fight-ground-monster-ready-list-for-detail-skill-text(
                                    style="font-size: 10px;color: #fff;float: left;width: 120px;"
                                ) {{skillApi.getSkillDetailByName(skill).text}}
                                div(style="clear: both")
            .fight-ground-item-block(v-if="functionType==='item'")
                rune(:runeMes="allMes?.playerMes?.rune" @useRune="useRune")
        .fight-ground-monster-ready-skill(v-if="selectedMonster.skillList.length>0")
            el-popover(
                effect="dark"
                placement="left-end"
                v-for="skill in selectedMonster.skillListDetail"
            )
                template(#reference)
                    .fight-ground-monster-ready-skill-for(@click="useSkill(skill.name)")
                        .fight-ground-monster-ready-skill-name {{skill.name}}
                        .fight-ground-monster-ready-skill-cost {{skill.cost}}
                        .fight-ground-monster-ready-skill-icon(:style="getMonsterIconStyle(skill)")
                        .fight-ground-monster-ready-skill-attribute(:style="getMonsterAttributeStyle(skill)")
                template(#default)
                    .fight-ground-monster-ready-skill-text(
                        style="font-size: 10px;color: #fff;max-width: 150px;"
                    ) {{skill.text}}
        .fight-ground-monster-change-button-block
                .fight-ground-monster-change-button(@click="changeFunction('monster')"
                    :style="functionType==='monster'?'background-color: #3391ff;':''") 精灵
                .fight-ground-monster-change-button(@click="changeFunction('item')"
                    :style="functionType==='item'?'background-color: #3391ff;':''") 物品
                div(style="clear: both")
    .fight-ground-monster-useskill-block(v-if="isShowDialog" @click="isShowDialog=false")
        .fight-ground-monster-useskill(@click.stop="")
            .fight-ground-monster-useskill-for(v-for="(situation,index) in useSituation"
                @click="selectTarget(situation)") 
                .fight-ground-monster-useskill-for-name {{situation.data.name}}
                .fight-ground-monster-useskill-for-mes level:{{situation.data.level}}
                .fight-ground-monster-useskill-for-mes life:{{situation.data.life}}
    .fight-ground-button-call(@click="callMonster()") 召唤
    .fight-ground-button-end(@click="endTrun()") 结束
    .fight-ground-button(@click="runAway()") 逃跑
</template>
<style scoped lang="scss">
.fight-ground-block{
    width: 100%;
    height: 100%;
    position: relative;
    .fight-ground-turn-block{
        position: absolute;
        top:0px;
        left:0px;
        width: 100%;
        height: 100%;
        z-index: 9;
    }
    .fight-ground-header{
        width: 100%;
        .fight-ground-header-head{
            float: left;
            width: 30px;
            height: 30px;
            margin: 10px;
            border-radius: 4px;
            background: url(../../img/header.png) no-repeat;
            background-size: 100% 100%;
        }
        .fight-ground-header-life{
            float: left;
            width: 230px;
            margin: 10px;
            height: 6px;
            border-radius: 6px;
            background-color: #075744;
            position: relative;
            transition: 0.3s;
            .fight-ground-header-life-line{
                position: absolute;
                top: 0px;
                left: 0px;
                height: 6px;
                border-radius: 6px;
                background-color: #ee33ff;
                transition: 0.3s;
            }
            .fight-ground-header-life-number{
                position: absolute;
                top: 6px;
                right: 0px;
                color: #fff;
                font-size: 12px;
            }
            .fight-ground-header-power{
                position: absolute;
                top: 20px;
                left: 0px;
                color: #fff;
                font-size: 12px;
                .fight-ground-header-power-point{
                    float: left;
                    width: 10px;
                    height: 10px;
                    margin-right: 2px;
                    background-color: #00ffe9;
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                }
            }
            .fight-ground-header-skill-use-tip{
                position: absolute;
                top: 40px;
                left: 0px;
                color: #fff;
                font-size: 12px;
                transition: 0.3s;
            }
        }
    }
    .fight-ground-button{
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: 12px;
        border-radius: 4px;
        background-color: #ee33ff;
        color: #fff;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        padding: 2px 12px;
    }
    .fight-ground-button-call{
        position: absolute;
        right: 10px;
        bottom: 66px;
        font-size: 12px;
        border-radius: 4px;
        background-color: #3361ff;
        color: #fff;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        padding: 2px 12px;
    }
    .fight-ground-button-end{
        position: absolute;
        right: 10px;
        bottom: 38px;
        font-size: 12px;
        border-radius: 4px;
        background-color: #ff3d33;
        color: #fff;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        padding: 2px 12px;
    }
    .fight-ground-catch-block{
        position: absolute;
        top: 150px;
        left: 250px;
        width: 100px;
        height: 100px;
        background-color: #333;
        border-radius: 50%;
    }
    .fight-ground-monsters{
        height: 80px;
        margin: 10px 0px;
        border-radius: 4px;
        background: #333;
        .fight-ground-monster-block{
            float: left;
        }
        .fight-ground-monster{
            width: 50px;
            height: 50px;
            margin: 0px 15px;
            margin-top: 25px;
            margin-bottom: 5px;
            position: relative;
            .fight-ground-monster-img{
                width: 100%;
                height: 100%;
                border-radius: 4px;
                background: url(../../img/standbygif.gif) no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .fight-ground-monster-life{
                position: absolute;
                bottom: 54px;
                left: 0px;
                width: 50px;
                height: 3px;
                border-radius: 3px;
                background-color: #ff4b33;
                transition: 0.3s;
            }
            .fight-ground-monster-name{
                position: absolute;
                top: -22px;
                left: 0px;
                width: 50px;
                border-radius: 3px;
                font-size: 8px;
                color:#fff;
                white-space: nowrap; /* 禁止换行 */
                overflow: hidden; /* 隐藏溢出部分 */
                text-overflow: ellipsis;/* 显示省略号 */
            }
            .fight-ground-monster-level{
                position: absolute;
                bottom: 0px;
                right: 0px;
                font-size: 8px;
                color: #fff;
                border-radius: 4px;
                background-color: #00000073;
                padding: 2px 4px;
            }
            .fight-ground-monster-status{
                position: absolute;
                top: -22px;
                left: -14px;
                width: 16px;
                .fight-ground-monster-lock{
                    width: 12px;
                    height: 12px;
                    background: url(../../img/lock.png) no-repeat;
                    background-size: 100% 100%;
                    margin-bottom:4px;
                }
                .fight-ground-monster-heal{
                    width: 12px;
                    height: 12px;
                    background: url(../../img/heal.png) no-repeat;
                    background-size: 100% 100%;
                    margin-bottom:4px;
                }
                .fight-ground-monster-hurt{
                    width: 12px;
                    height: 12px;
                    background: url(../../img/hurt.png) no-repeat;
                    background-size: 100% 100%;
                    margin-bottom:4px;
                }
                .fight-ground-monster-clean{
                    width: 12px;
                    height: 12px;
                    background: url(../../img/clean.png) no-repeat;
                    background-size: 100% 100%;
                    margin-bottom:4px;
                }
                .fight-ground-monster-protect{
                    width: 12px;
                    height: 12px;
                    background: url(../../img/protect.png) no-repeat;
                    background-size: 100% 100%;
                    margin-bottom:4px;
                }
                .fight-ground-monster-delay{
                    width: 12px;
                    height: 12px;
                    background: url(../../img/delay.png) no-repeat;
                    background-size: 100% 100%;
                    margin-bottom:4px;
                }
            }
            .fight-ground-monster-lv{
                position: absolute;
                top: -4px;
                left: 52px;
                font-size: 8px;
            }
            .fight-ground-monster-life-change{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 50px;
                height: 50px;
            }
        }
    }
    .my-monsters{
        position: absolute;
        top: 200px;
        left: 10px;
    }
    .bot-monsters{
        position: absolute;
        top: 100px;
        right: 10px;
    }
    .fight-ground-monster-ready-block{
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 520px;
        height: 80px;
        border-radius: 4px;
        background-color: #172334;
        .fight-ground-monster-ready-list-block{
            float: left;
            width: 300px;
            height: 100%;
            position: relative;
            .fight-ground-monster-ready-list{
                width: 100%;
                height: 100%;
                position: relative;
                    .fight-ground-monster-ready-list-for{
                        width: 38px;
                        margin: 10px 5px;
                        height: 58px;
                        border: 1px solid #ee33ff;
                        float: left;
                        position: relative;
                        border-radius: 4px;
                        background-color: #333;
                        .fight-ground-monster-ready-list-for-name{
                            font-size: 8px;
                            color: #fff;
                            width: 10px;
                            height: 100%;
                            padding-left: 4px;
                            cursor: pointer;
                        }
                        .fight-ground-monster-ready-list-for-level{
                            font-size: 8px;
                            color: #fff;
                            position: absolute;
                            top: 0px;
                            right: 4px;
                        }
                        .fight-ground-monster-ready-list-for-dead{
                            width: 16px;
                            height: 16px;
                            background: url(../../img/dead1.png) no-repeat;
                            background-size: 100% 100%;
                            position: absolute;
                            bottom: 2px;
                            right: 2px;
                        }
                    }
            }
            .fight-ground-item-block{
                width: 100%;
                height: 100%;
                position: relative;

            }
        }
        .fight-ground-monster-ready-skill{
            float: left;
            width: 220px;
            height: 100%;
            padding: 5px;
            box-sizing: border-box;
            .fight-ground-monster-ready-skill-for{
                float: left;
                margin: 5px;
                width: 95px;
                height: 25px;
                border-radius: 4px;
                background-color: #333;
                position: relative;
                cursor: pointer;
                .fight-ground-monster-ready-skill-name{
                    font-size: 10px;
                    color: #aaa;
                    text-indent: 4px;
                }
                .fight-ground-monster-ready-skill-cost{
                    font-size: 8px;
                    color: #aaa;
                    position: absolute;
                    top: 0px;
                    right: 4px;
                }
                .fight-ground-monster-ready-skill-text{
                    font-size: 8px;
                    color: #fff;
                    max-width: 100px;
                }
                .fight-ground-monster-ready-skill-icon{
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    bottom: 2px;
                    right: 4px;
                }
                .fight-ground-monster-ready-skill-attribute{
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    bottom: 2px;
                    left: 4px;
                }
            }
        }
        .fight-ground-monster-change-button-block{
            position: absolute;
            bottom: 84px;
            right: 0px;
            .fight-ground-monster-change-button{
                font-size: 10px;
                border-radius: 4px;
                background-color: #aaa;
                color: #fff;
                cursor: pointer;
                height: 20px;
                line-height: 20px;
                padding: 2px 10px;
                margin-left: 4px;
                float: left;
            }
        }
    }
    .fight-ground-monster-useskill-block{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 600px;
        height: 400px;
        background-color: #d7d7d730;
        z-index: 3;
        .fight-ground-monster-useskill{
            position: absolute;
            top: 150px;
            left: 150px;
            width: 300px;
            height: 100px;
            border-radius: 4px;
            background-color: #172334;
            border: 1px solid #ee33ff;
            z-index: 10;
            .fight-ground-monster-useskill-for{
                float: left;
                width: 50px;
                height: 80px;
                margin-left: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
                position: relative;
                border-radius: 4px;
                background-color: #333;
                cursor: pointer;
                .fight-ground-monster-useskill-for-name{
                    width: 100%;
                    font-size: 12px;
                    color: #fff;
                    padding: 2px 4px;
                    box-sizing: border-box;
                }
                .fight-ground-monster-useskill-for-mes{
                    width: 100%;
                    font-size: 10px;
                    color: #fff;
                    padding: 2px 4px;
                    box-sizing: border-box;
                }
            }
        }
    }
    .fight-ground-turn{
        font-size: 12px;
        color: #fff;
        position: absolute;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
    }
    .fight-ground-whosturn{
        font-size: 12px;
        color: #fff;
        position: absolute;
        top: 46px;
        left: 50%;
        transform: translateX(-50%);
    }
}
.fight-ground-monster-ready-list-for-detail-attribute{
    position:absolute;
    top:0px;
    right:20px;
    height:16px;
    width:16px;
}
</style>