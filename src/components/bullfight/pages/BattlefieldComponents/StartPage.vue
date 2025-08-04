<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineEmits,
  defineExpose,
} from 'vue'
import challengeMonsters from "../../challengeMonsters.js"
import { ElMessage } from 'element-plus'
import strategyApi from "../../strategyCard.js"
import apiMes from "../../monsterMes.js"
import apiPoke from "../../pokeList.js"
import apiTrun from "../../turnMethod.js"
const StartPageCard = defineAsyncComponent(() =>
  import("./StartPageCard.vue")
)
const StartFight = defineAsyncComponent(() =>
  import("./StartFight.vue")
)
onMounted(()=>{
  init()
})
const props = defineProps({
    monsterOnGroundBot:{
        type:String,
        default:"未知",
    },
    monsterOnGroundMy:{
        type:String,
        default:"未知",
    },
    myMonsterList_:{
        type:Array,
        default:[],
    } ,
    botMonsterList_:{
        type:Array,
        default:[],
    } ,
    mesList:{
        tyoe:Array,
        default:[]
    }
})
const turnNum = ref(0)
//当前回合数
const mesList = ref([])
//定义右边所有信息记录
const mesListAdd = (data)=>{
    mesList.value.push(data)
}//添加信息
const allMesMy = ref({
    plies:{...apiMes.getPlies()},
    id:"",
    name:"",
    life:1,
    lifeNow:0,
    atk:0,
    atkMagic:0,
    def:0,
    defMagic:0,
    speed:0,
    skillListName:[],
    skillList:[],
    cardList:[],
    attribute:"",
    size:0,
})
const allMesBot = ref({
    plies:{...apiMes.getPlies()},
    id:"",
    name:"",
    life:1,
    lifeNow:0,
    atk:0,
    atkMagic:0,
    def:0,
    defMagic:0,
    speed:0,
    skillListName:[],
    skillList:[],
    cardList:[],
    attribute:"",
    size:0,
})
const getLifeNow = (mes)=>{
    return Number(Number(Number(mes.lifeNow/mes.life)*100).toFixed(2))
}
const pokeList = ref([])
const init = ()=>{
    console.log(props.mesList)
    if(Array.isArray(props.mesList)&&props.mesList.length>0){
        props.mesList.forEach(item=>{
            mesList.value.push(item)
        })
    } //传承上一只的战斗记录
    if(mesList.value.length===0){
        mesList.value.push({text:"战斗开始",type:"default"})
    }
    let allMESMy = {}
    props.myMonsterList_.forEach(item=>{
        if(item.id === props.monsterOnGroundMy){
            allMESMy = item
        }
    })
    allMesMy.value.id = allMESMy.id
    allMesMy.value.name = allMESMy.name
    allMesMy.value.life = allMESMy.life
    allMesMy.value.lifeNow = allMESMy?.lifeNow?allMESMy.lifeNow:allMESMy.life
    allMesMy.value.atk = allMESMy.atk
    allMesMy.value.atkMagic = allMESMy.atkMagic
    allMesMy.value.def = allMESMy.def
    allMesMy.value.defMagic = allMESMy.defMagic
    allMesMy.value.speed = allMESMy.speed
    allMesMy.value.attribute = allMESMy.attribute
    allMesMy.value.skillListName = allMESMy.skillListName
    allMesMy.value.size = allMESMy.size
    allMesMy.value.strategyList = []
    allMESMy.skillListName.forEach(skill=>{
        const detail = apiMes.getSkillDetailMes(skill)
        allMesMy.value.skillList.push({
            ...detail,
            surplus:detail.num,//可用次数
        })
    })

    let allMESBot = {}
    props.botMonsterList_.forEach(item=>{
        if(item.id === props.monsterOnGroundBot){
            allMESBot = item
        }
    })
    allMesBot.value.id = allMESBot.id
    allMesBot.value.name = allMESBot.name
    allMesBot.value.life = allMESBot.life
    allMesBot.value.lifeNow = allMESBot?.lifeNow?allMESBot.lifeNow:allMESBot.life
    allMesBot.value.atk = allMESBot.atk
    allMesBot.value.atkMagic = allMESBot.atkMagic
    allMesBot.value.def = allMESBot.def
    allMesBot.value.defMagic = allMESBot.defMagic
    allMesBot.value.speed = allMESBot.speed
    allMesBot.value.attribute = allMESBot.attribute
    allMesBot.value.skillListName = allMESBot.skillListName
    allMesBot.value.size = allMESBot.size
    allMesBot.value.strategyList = []
    allMESBot.skillListName.forEach(skill=>{
        const detail = apiMes.getSkillDetailMes(skill)
        allMesBot.value.skillList.push({
            ...detail,
            surplus:detail.num
        })
    })
    // console.log(allMesBot.value,allMesMy.value
    pokeList.value = apiPoke.getPokeCardList()
    //初始化扑克
    getPoke("my",10)
    // getPoke("bot",10)
    allMesBot.value.cardList = apiPoke.getBotTest()
    allMesMy.value.cardList.sort((a,b)=>Number(a.realNum)-Number(b.realNum))
    allMesBot.value.cardList.sort((a,b)=>Number(a.realNum)-Number(b.realNum))
    getStrategy("my",1)
    getStrategy("bot",1)
    turnNum.value++
    //回合数+1
    console.log(allMesMy.value)
}
const getPoke = (who,many)=>{
    if(who === "my"){
        for(let i = 0 ; i < many ; i++){
            allMesMy.value.cardList.push(pokeList.value[i])
        }//获得对应数量的卡
    }else if(who === "bot"){
        for(let i = 0 ; i < many ; i++){
            allMesBot.value.cardList.push(pokeList.value[i])
        }//获得对应数量的卡
    }
    delpokeList(many)
}
const delpokeList = (num)=>{
    let result = []
    pokeList.value.forEach((item,index)=>{
        if(num<=index){
            result.push(item)
        }else{
            //从牌库中删去对应数量的卡
        }
    })
    pokeList.value = result
}
const getStrategy = (who,many)=>{
    if(who === "my"){
        for(let i = 0 ; i < many ; i++){
            allMesMy.value.strategyList.push(strategyApi.getOneStrategy())
        }//获得对应数量的卡
    }else if(who === "bot"){
        for(let i = 0 ; i < many ; i++){
            allMesBot.value.strategyList.push(strategyApi.getOneStrategy())
        }//获得对应数量的卡
    }
}
const formatMy = (percentage) => {
    console.log(percentage)
    return (percentage/100)*allMesMy.value.lifeNow
}
const formatBot = (percentage) => {
    return (percentage/100)*allMesBot.value.lifeNow
}
const fightPlace = ref(null)
const myBlock = ref(null)
const onFocusSkill = (data)=>{
    //skill回调详情数据展示方法
    fightPlace.value.showDetailSkill(data,"skill")
}
const onFocusHand = (data)=>{
    //hand回调详情数据展示方法
    fightPlace.value.showDetailSkill(data,"hand")
}
const onFocusStrategy = (data)=>{
    //strategy回调详情数据展示方法
    fightPlace.value.showDetailSkill(data,"strategy")
}
const myTurnMes = ref({
    skill:"",//使用技能
    cardList:[],//使用手牌
    strategyList:[],//使用策略
})
const onClickSkill = (data)=>{
    myTurnMes.value.skill = data
    // data = data + " - " + apiMes.getSkillDetailMes(data).cost
    // fightPlace.value.changeSkill(data)
    // //二次转接选中的技能名字，并传入展示的地方
    // myBlock.value.choiceCard()
    //老的处理逻辑
    let mes = {
        skill:data,
        cardList: allMesMy.value.cardList,
        strategyList: allMesMy.value.strategyList,
    }
    emit("useSkill",mes)
}
const onClickHand = (list)=>{
    console.log("得到数据：",list)
    myTurnMes.value.cardList = list
    // let point = 0
    // list.forEach(item=>{
    //     point+=Number(item.realNum)
    // })
    // fightPlace.value.reflashHand(point)
    //老的处理逻辑
}
const  setAllMes = (data)=>{
    allMesMy.value = data.allMesMy
    allMesBot.value = data.allMesBot
    turnNum.value = data.turnNum
    //跑完动画后更新数据
    mesList.value = data.mesList
    if(allMesMy.value.lifeNow===0 && allMesBot.value.lifeNow === 0){
        //平局
        substitution()
    }else if(allMesMy.value.lifeNow===0 ){
        //我方败了
        substitution()
    }else if(allMesBot.value.lifeNow===0 ){
        //敌方败了
        emit("botSubstitution",{
            myMonster:allMesMy.value,
            botMonster:allMesBot.value,
        })
    }
}
const emit = defineEmits(['substitution','botSubstitution','useSkill'])
const substitution = (mesList)=>{
    emit('substitution',{
        myMonster:allMesMy.value,
        botMonster:allMesBot.value,
        mesList:mesList
    })
}//替换上场的怪兽
const onSumbit = ()=>{
    let thisSkill = {}
    allMesMy.value.skillList.forEach(item=>{
        if(item.name === myTurnMes.value.skill){
            thisSkill = item
        }
    })
    try{
        // if(fightPlace.value.standBySkill===""){
        //     throw "请选择技能"
        // }
        // if(fightPlace.value.standByNum===0){
        //     throw "请选择手牌"
        // }
        // let allPoint = 0
        // myTurnMes.value.cardList.forEach(item=>{
        //     allPoint+=Number(item.realNum)
        // })
        // if(thisSkill.cost>allPoint){
        //     throw "点数不足！"
        // }
        if(thisSkill.surplus<=0){
            throw "技能没有可用次数"
        }else{
            allMesMy.value.skillList.map(item=>{
                if(item.name === myTurnMes.value.skill){
                    item.surplus--//可用次数-1
                }
            })
        }
        if(allMesMy.value.speed>allMesBot.value.speed){
            let res = apiTrun.sumbit(allMesBot.value,allMesMy.value,turnNum.value,apiMes.getSkillDetailMes(myTurnMes.value.skill),myTurnMes.value.cardList,mesList.value)
            console.log("本回合处理结果：",res)
            myTurnMes.value.cardList.forEach(item=>{
                pokeList.value.push(item)
            })//回收卡牌
            if(res?.myMove&&res.myMove?.move==="atk"){
                fightPlace.value.changeMyStatus("attack")
                apiTrun.waitToDo(500,()=>{
                    fightPlace.value.showBotHit()
                })
            }else if(res?.myMove&&res.myMove?.move==="attribute"){
                fightPlace.value.changeMyStatus("haqi")
            }
            apiTrun.waitToDo(500,()=>{
                res = showMyMove(res)
                apiTrun.waitToDo(2000,()=>{
                    if(res.allMesMy.lifeNow===0||res.allMesBot.lifeNow===0){
                        console.log("胜负已分，中断后续运行")
                        //如果运行前一段就已经分出胜负，就不运行后面这一段
                    }else{
                        if(res?.botMove&&res.botMove?.move==="atk"){
                            fightPlace.value.changeBotStatus("attack")
                            apiTrun.waitToDo(500,()=>{
                                fightPlace.value.showMyHit()
                            })
                        }else if(res?.botMove&&res.botMove?.move==="attribute"){
                            fightPlace.value.changeBotStatus("haqi")
                        }
                        apiTrun.waitToDo(500,()=>{
                            res = showBotMove(res)
                        })
                    }
                    
                })
            })
        }else{
            let res = apiTrun.sumbit(allMesBot.value,allMesMy.value,turnNum.value,apiMes.getSkillDetailMes(myTurnMes.value.skill),myTurnMes.value.cardList,mesList.value)
            console.log("本回合处理结果：",res)
            myTurnMes.value.cardList.forEach(item=>{
                pokeList.value.push(item)
            })//回收卡牌
            if(res?.botMove&&res.botMove?.move==="atk"){
                fightPlace.value.changeBotStatus("attack")
                apiTrun.waitToDo(500,()=>{
                    fightPlace.value.showMyHit()
                })
            }else if(res?.botMove&&res.botMove?.move==="attribute"){
                fightPlace.value.changeBotStatus("haqi")
            }
            apiTrun.waitToDo(500,()=>{
                res =  showBotMove(res)
                apiTrun.waitToDo(2000,()=>{
                    if(res.allMesMy.lifeNow===0||res.allMesBot.lifeNow===0){
                        console.log("胜负已分，中断后续运行")
                        //如果运行前一段就已经分出胜负，就不运行后面这一段
                    }else{
                        if(res?.myMove&&res.myMove?.move==="atk"){
                            fightPlace.value.changeMyStatus("attack")
                            apiTrun.waitToDo(500,()=>{
                                fightPlace.value.showBotHit()
                            })
                        }else if(res?.myMove&&res.myMove?.move==="attribute"){
                            fightPlace.value.changeMyStatus("haqi")
                        }
                        apiTrun.waitToDo(500,()=>{
                            res =  showMyMove(res)
                        })
                    }
                    
                })
            })
        }
        getPoke("my",2)
        getPoke("bot",2)
        if(turnNum.value%3===0){
            //每三个回合摸一张策略卡
            getStrategy("my",1)
            getStrategy("bot",1)
        }
    }catch(e){
        mesList.value.push({
            text:e,
            type:"warn"
        })
        myTurnMes.value = {
            skill:"",
            cardList:[]
        }
        console.log("出现错误，回合处理失败")

    }finally{
        myBlock.value.backToSkill()
        allMesMy.value.lifeChangeBot = 0
        allMesMy.value.lifeChangeMy = 0
        allMesBot.value.lifeChangeBot = 0
        allMesBot.value.lifeChangeMy = 0

        clearSelectCard()
    }
}
const clearSelectCard = ()=>{
    myBlock.value.clearSelectCard()
}
const showMyMove = (res)=>{
    if(res.myMove.miss===true){
        console.log("我的技能落空了！")
        // res.mesList.push({
        //     text:"我的技能落空了！",
        //     type:"default"
        // })
    }else{
        if(res?.myMove&&res.myMove?.lifeChangeMy!==0){
            res.allMesMy.lifeNow += res.myMove.lifeChangeMy
            if(res.allMesMy.lifeNow<0){
                res.allMesMy.lifeNow = 0
            }
            if(res.allMesMy.lifeNow>res.allMesMy.life){
                res.allMesMy.lifeNow = res.allMesMy.life
            }
        }
        if(res?.myMove&&res.myMove?.lifeChangeBot!==0){
            res.allMesBot.lifeNow += res.myMove.lifeChangeBot
            if(res.allMesBot.lifeNow<0){
                res.allMesBot.lifeNow = 0
            }
            if(res.allMesBot.lifeNow>res.allMesBot.life){
                res.allMesBot.lifeNow = res.allMesBot.life
            }
        }
        if(res.myMove.move==="atk"&&res.myMove?.lifeChangeBot===0&&res.myMove?.lifeChangeMy===0){
            res.mesList.push({
                text:"对方技能无事发生...",
                type:"default"
            })
        }
    }
    setAllMes(res) 
    return res 
}
const showBotMove = (res)=>{
    if(res.botMove.miss===true){
        console.log("对方技能落空了！")
        // res.mesList.push({
        //     text:"对方技能落空了！",
        //     type:"default"
        // })
    }else if(res.botMove.isNotEnough) {
        console.log("对方技能点数不足！")
    }else{
        if(res?.botMove&&res.botMove?.lifeChangeMy!==0){
            res.allMesMy.lifeNow += res.botMove.lifeChangeMy
            if(res.allMesMy.lifeNow<0){
                res.allMesMy.lifeNow = 0
            }
            if(res.allMesMy.lifeNow>res.allMesMy.life){
                res.allMesMy.lifeNow = res.allMesMy.life
            }
        }
        if(res?.botMove&&res.botMove?.lifeChangeBot!==0){
            res.allMesBot.lifeNow += res.botMove.lifeChangeBot
            if(res.allMesBot.lifeNow<0){
                res.allMesBot.lifeNow = 0
            }
            if(res.allMesBot.lifeNow>res.allMesBot.life){
                res.allMesBot.lifeNow = res.allMesBot.life
            }
        }
        if(res.botMove.move==="atk"&&res.botMove?.lifeChangeBot===0&&res.botMove?.lifeChangeMy===0){
            res.mesList.push({
                text:"对方技能无事发生...",
                type:"default"
            })
        }
    }
    setAllMes(res) 
    return res 
}
const getPliesName = (name)=>{
    return apiMes.getPliesName(name)
}
const useSkillDialog = (data)=>{
    console.log(data)
    myTurnMes.value.skill = data.skill
    myTurnMes.value.cardList = data.cardList
    myTurnMes.value.strategyList = data.strategyList
    onSumbit()
}
defineExpose({
mesListAdd,
useSkillDialog,
})
</script>
<template lang="pug">
.start-block
    .bot-position
        .head-block
            el-tooltip( effect="light" placement="right-start")
                img(class="head-img" src="../../img/unknow.png")
                template(#content)
                    .head-name-tooltip 攻{{allMesBot.atk}}  防{{allMesBot.def}}  血{{allMesBot.life}}
                    .head-name-tooltip 特攻{{allMesBot.atkMagic}} 特防{{allMesBot.defMagic}}
                    .head-name-tooltip 状态栏
                    .head-name-tooltip(v-for="plies in Object.keys(allMesBot.plies)" v-show="allMesBot.plies[plies]") {{getPliesName(plies)}}: {{allMesBot.plies[plies]}}
            el-tooltip( effect="light" placement="right-start")
                .head-name {{allMesBot.name}}
                template(#content)
                    .head-name-tooltip {{allMesBot.name}}
            .head-progress
                el-progress(style="position:relative;" :percentage="getLifeNow(allMesBot)" :text-inside="true" :stroke-width="16" :format="formatBot" color="#ffe3e3")
                    .progress-position() {{allMesBot.lifeNow}}
                .head-cards    
                    StartPageCard(:strategyList="allMesBot.strategyList" :skillList="allMesBot.skillList" :cardList="allMesBot.cardList" @onFocusSkill="onFocusSkill" @onFocusHand="onFocusHand" @onFocusStrategy="onFocusStrategy")
    .main-block
        StartFight(ref="fightPlace" :mesList="mesList" :turnNum="turnNum" @onSumbit="onSumbit" @substitution="substitution")
    .me-position
        .head-block
            el-tooltip( effect="light" placement="right-start")
                img(class="head-img" src="../../img/unknow.png")
                template(#content)
                    .head-name-tooltip 攻{{allMesMy.atk}}  防{{allMesMy.def}}  血{{allMesMy.life}}
                    .head-name-tooltip 特攻{{allMesMy.atkMagic}} 特防{{allMesMy.defMagic}}
                    .head-name-tooltip 状态栏
                    .head-name-tooltip(v-for="plies in Object.keys(allMesMy.plies)" v-show="allMesMy.plies[plies]>0") {{getPliesName(plies)}}: {{allMesMy.plies[plies]}}
            el-tooltip( effect="light" placement="right-start")
                .head-name {{allMesMy.name}}
                template(#content)
                    .head-name-tooltip {{allMesMy.name}}
            .head-progress
                el-progress(style="position:relative;" :percentage="getLifeNow(allMesMy)" :text-inside="true" :stroke-width="16" :format="formatMy" color="#c5f6fa")
                    .progress-position() {{allMesMy.lifeNow}}
                .head-cards    
                    StartPageCard(ref="myBlock" :strategyList="allMesMy.strategyList" :skillList="allMesMy.skillList" :cardList="allMesMy.cardList" @onFocusSkill="onFocusSkill" @onFocusHand="onFocusHand" @onFocusStrategy="onFocusStrategy"  @onClickSkill="onClickSkill" @onClickHand="onClickHand" @onSumbit="onSumbit")
</template>
<style scoped lang="scss">
.head-name-tooltip{
    font-size: 12px;
    color: #bbb;
}
.start-block{
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #eee;
    .bot-position{
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
        width: 480px;
        height: 100px;
    }
    .me-position{
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 10px;
        width: 480px;
        height: 100px;
    }
    .head-block{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 1px #bbb solid;
        background-color: #fff;
        position: relative;
        .head-img{
            width: 60px;
            height: 60px;
            border-bottom-right-radius: 10px;
            border-top-left-radius: 10px;
            border-bottom: 1px #bbb solid;
            border-right: 1px #bbb solid;
            float: left;
        }
        .head-name {
            position: absolute;
            bottom: 20px;
            left: 0px;
            font-size: 12px;
            width: 52px;
            padding: 0px 4px;
            transform: translateY(50%);
            text-align: center;
            color: #bbb;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .head-progress{
            width: 410px;
            height: 100%;
            padding-left: 64px;
            padding-top: 4px;
            .progress-position{
                position: absolute;
                top: 0;
                right: 0px;
                padding: 0px 10px;
                margin: 0;
                height: 100%;
                line-height: 16px;
                display: block;
                color:#aaa;
            }
            .head-cards{
                width: 100%;
                height: 74px;
            }
        }
    }
    .main-block{
        width: 100%;
        height: 174px;
        padding: 112px 0px;
    }
}

</style>