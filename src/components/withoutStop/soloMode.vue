<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch
} from 'vue'
import botFuction from './soloMode/botFuction.js'
import cardFuction from './soloMode/cardFuction.js'
import gameFuction from "./soloMode/gameFuction.js"
import meFuction from './soloMode/meFuction.js'

onMounted(()=>{
  init()
})
const botLife = ref(800)
const meLife = ref(800)
const botHaveKill = ref(false)
const meHaveKill = ref(false)
const botCardList = ref([])
const meCardList = ref([])
const botMonsterList = ref([
    {
        id:1,
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:"",
        armor:"",
        house1:"",
        house2:"",
        haveKill:false,
    },
    {
        id:2,
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:"",
        armor:"",
        house1:"",
        house2:"",
        haveKill:false,
    },
    {
        id:3,
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:"",
        armor:"",
        house1:"",
        house2:"",
        haveKill:false,
    },
])
const botMonsterUsedList = ref([])
const meMonsterUsedList = ref([])
//used怪兽墓地，被击败的卡会进入这里
const meMonsterList = ref([
    {
        id:1,
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:"",
        armor:"",
        house1:"",
        house2:"",
        haveKill:false,
    },
    {
        id:2,
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:"",
        armor:"",
        house1:"",
        house2:"",
        haveKill:false,
    },
    {
        id:3,
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:"",
        armor:"",
        house1:"",
        house2:"",
        haveKill:false,
    },
])
const outputList = ref([])
const deck = ref([])
const discardPile = ref([])
const disabled = ref(false)
const botAllMonsterList = ref([])
const meAllMonsterList = ref([])
const gameTurns = ref(0)
const meStatus = ref("")
//me的当前状态
const monsterCanList = ref([])
//保留我当前能召唤的怪兽的集合
const meJudge = ref([-1])
const botJudge = ref([-1])
//双方的判定选择属性
const init = ()=>{
    reLoadGame()
    setAllMes(gameFuction.initTest(getAllMes()))
    focusInput()
}//初始化设置的地方，用于测试
const reLoadGame = ()=>{
    botLife.value = 800
    meLife.value = 800
    deck.value = cardFuction.getDeck()
    botCardList.value = []
    meCardList.value = []
    botMonsterList.value = [{
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:{
            name:""
        },
        armor:{
            name:""
        },
        house1:{
            name:""
        },
        house2:{
            name:""
        },
        haveUsed:false,
        haveLe:false,
        haveBing:false,
    },
    {
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:{
            name:""
        },
        armor:{
            name:""
        },
        house1:{
            name:""
        },
        house2:{
            name:""
        },
        haveUsed:false,
        haveLe:false,
        haveBing:false,
    },
    {
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:{
            name:""
        },
        armor:{
            name:""
        },
        house1:{
            name:""
        },
        house2:{
            name:""
        },
        haveUsed:false,
        haveLe:false,
        haveBing:false,
    },]
    meMonsterList.value = [{
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:{
            name:""
        },
        armor:{
            name:""
        },
        house1:{
            name:""
        },
        house2:{
            name:""
        },
        haveUsed:false,
        haveLe:false,
        haveBing:false,
    },
    {
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:{
            name:""
        },
        armor:{
            name:""
        },
        house1:{
            name:""
        },
        house2:{
            name:""
        },
        haveUsed:false,
        haveLe:false,
        haveBing:false,
    },
    {
        name:"",
        atk:"",
        def:"",
        life:"",
        weapon:{
            name:""
        },
        armor:{
            name:""
        },
        house1:{
            name:""
        },
        house2:{
            name:""
        },
        haveUsed:false,
        haveLe:false,
        haveBing:false,
    },]
    botAllMonsterList.value = cardFuction.getBotAllMonsters()
    meAllMonsterList.value = cardFuction.getMeAllMonsters()
    outputList.value = []
    disabled.value = false
    gameTurns.value = 0
    outputList.value.push("重置完成...")
    startGame()
    //重置数据并开启游戏
}//重载方法
const startGame = ()=>{
    //开始游戏需要进行的额外配置在这里写
}
const getAllMes = ()=>{
    return {
        botLife:botLife.value,//bot生命值
        meLife:meLife.value,//me生命值
        botCardList:botCardList.value,//bot的手卡
        meCardList:meCardList.value, //me的手卡
        botMonsterList:botMonsterList.value,//bot场上的怪
        botAllMonsterList:botAllMonsterList.value,//bot全部的怪
        botMonsterUsedList:botMonsterUsedList.value,//bot用过的怪
        meMonsterList:meMonsterList.value,//me场上的怪
        meAllMonsterList:meAllMonsterList.value,//bot全部的怪
        meMonsterUsedList:meMonsterUsedList.value,//me用过的怪
        outputList:outputList.value,//信息记录
        deck:deck.value,//卡组
        discardPile:discardPile.value,//弃牌堆
        gameTurns:gameTurns.value,//当前回合
        botHaveKill:botHaveKill.value,//bot当前回合有没有打人
        meHaveKill:meHaveKill.value,//me当前回合有没有打人
        meStatus:meStatus.value,//me的当前状态
        monsterCanList:monsterCanList.value,//可以召唤的怪兽的集合
        meJudge:meJudge.value,//me选择的判定属性
        botJudge:botJudge.value,//me选择的判定属性
    }
}//获取所有信息
const setAllMes = (allMes)=>{
    // console.log(allMes)
    botLife.value = allMes.botLife
    meLife.value = allMes.meLife
    botCardList.value = allMes.botCardList
    meCardList.value = allMes.meCardList
    botMonsterList.value = allMes.botMonsterList
    botMonsterUsedList.value = allMes.botMonsterUsedList
    meMonsterList.value = allMes.meMonsterList
    meMonsterUsedList.value = allMes.meMonsterUsedList
    outputList.value = allMes.outputList
    deck.value = allMes.deck
    discardPile.value = allMes.discardPile
    gameTurns.value = allMes.gameTurns
    botHaveKill.value = allMes.botHaveKill
    meHaveKill.value = allMes.meHaveKill
    meStatus.value = allMes.meStatus
    monsterCanList.value = allMes.monsterCanList
    meJudge.value = allMes.meJudge//me选择的判定属性
    botJudge.value = allMes.botJudge//me选择的判定属性
}//更新所有信息
const getInputText = async()=>{
    disabled.value = true
    //封住输入框，避免在处理的途中再次数据导致不可控的bug
    const mes = inputText.value.trim()
    inputText.value = ""
    //清空数据框
    // console.log(mes)
    let result = await gameFuction.getInputText(mes,getAllMes())
    // console.log(result)
    if(result.allMes){
        setAllMes(result.allMes)
        //无论成功/失败都要刷新一次数据
    }
    if(result.mes == "error"||result.result == "error"){
        disabled.value = false
        //解开输入框（指令错误）
        gameFuction.waitToDo(300,()=>{
            focusInput()
        })//自动聚焦
    }
    if(result.result == "endGame"){
        console.log("重置游戏")
        reLoadGame()
        disabled.value = false
        //解开输入框
    }
    if(result.result == "startGame"){
        console.log("开始游戏")
        disabled.value = false
        //解开输入框
        gameFuction.waitToDo(300,()=>{
            focusInput()
        })//自动聚焦
    }
    if(result.result == "meEnd"){
        console.log("我的回合结束")
        reflashCardsList()
        //把弃牌堆的卡收回放入卡组
        disabled.value = true
        //封印输入框
        await gameFuction.waitToDo(300,()=>{
            outputList.value.push("bot的回合开始...")
        })
        await gameFuction.waitToDo(1000,async()=>{
            //轮到bot，下一步
            await botTurnAll(getAllMes())
        })//一直运行直到没有可以操作的空间
    }
    if(result.result == "done"){
        disabled.value = false
        //me操作成功，解开输入框,并聚焦
        gameFuction.waitToDo(300,()=>{
            focusInput()
        })//自动聚焦
    }
    if(result.mes == "startWithBot"){
        //bot开启了他的回合，并且还没有结束
        outputList.value.push("思考中...")
        await gameFuction.waitToDo(1000,async()=>{
            //下一步
            let allMes =await botTurnAll(getAllMes())
            console.log(allMes)
            setAllMes(allMes) 
        })//一直运行直到没有可以操作的空间
    }
    if(result.mes == "startWithBotEnd"){
        //bot开启了他的回合，并且结束
        outputList.value.push("bot回合结束...")
        setAllMes(botFuction.botStart(getAllMes()))
        reflashCardsList()
        //把弃牌堆的卡放回去卡池
        await gameFuction.waitToDo(1000,()=>{
            //处理我的回合
            setAllMes(meFuction.startMyTurn(getAllMes()))
            //处理我的回合的初始化
            disabled.value = false
            //解开输入框
        })
    }
    if(result.mes == "showMonstersCanSummon"){
        //展示可以召唤的怪兽
        // console.log("展示可召唤怪兽完毕，取消输入框限制")
        meStatus.value = "readyToSummon"
        disabled.value = false
        //解开输入框
        gameFuction.waitToDo(300,()=>{
            focusInput()
        })//自动聚焦
    }
    if(result.mes == "showMonstersCanSummonFail"){
        //展示可以召唤的怪兽
        // console.log("召唤失败")
        meStatus.value = ""
        disabled.value = false
        //解开输入框
        gameFuction.waitToDo(300,()=>{
            focusInput()
        })//自动聚焦
    }
    if(result.mes == "cancelSummonChoice"){
        //展示可以召唤的怪兽
        // console.log("展示可召唤怪兽完毕，取消输入框限制")
        disabled.value = false
        //解开输入框
        gameFuction.waitToDo(300,()=>{
            focusInput()
        })//自动聚焦
    }

}
const botTurnAll = async(allMes)=>{
    let res = botFuction.botTrun(allMes)
    console.log("botTrun结果",res)
    allMes = res.allMes
    // console.log("botturnAll：",res)
    setAllMes(allMes) 
    return await gameFuction.waitToDo(1000,()=>{
        if(res.result){
            return botTurnAll(allMes)
            //如果成功，继续循环
        }else{
            //返回结果
            allMes.outputList.push("bot回合结束...")
            allMes.botMonsterList.map(item=>{
                item.haveLe = false
                //重置bot方所有怪兽 le状态
            })
            allMes.meMonsterList.map(item=>{
                item.haveBing = false
                //重置me方所有怪兽 bing状态
            })
            setAllMes(botFuction.botStart(getAllMes()))
            // disabled.value = false
            // //解开输入框,这个只能单独控制
            reflashCardsList()
            //把弃牌堆的卡放回去卡池
            gameFuction.waitToDo(1000,()=>{
                //处理我的回合
                setAllMes(meFuction.startMyTurn(getAllMes()))
                //处理我的回合的初始化
                disabled.value = false
                //解开输入框
                focusInput()
                //自动聚焦
            })
            return allMes
        }
    })
}
const inputText = ref("")
const reflashCardsList = ()=>{
    discardPile.value.forEach(item=>{
        deck.value.push(item)
    })
    discardPile.value = []
}//把弃牌堆的卡放回去卡池
const focusInput = ()=>{
    document.getElementById("myInput").focus()
}//自动聚焦input
watch(outputList,(newValue,oldValue)=>{
    toOutputBottom()
    //展示文字自动去到最下方
}, { deep: true })
const toOutputBottom = ()=>{
    let container = document.querySelector("#scrollContainer")
    let height = 0
    height = container.scrollHeight
    container.scrollTop =  height + 20
    // console.log("滚动条位置自动变化",container.scrollTop)
    // container.scrollIntoView({ behavior: 'smooth' })
}
</script>
<template lang="pug">
.all-block 
    .text-block
        .text-bot
            .mes name: bot
            .mes botLife: {{botLife}}
            .mes cardNum: {{botCardList.length}}
            .monster(v-for="botMonster in botMonsterList")
                .monster-mes name:{{botMonster.name}}
                .monster-mes atk:{{botMonster.atk}}
                .monster-mes def:{{botMonster.def}}
                .monster-mes liv:{{botMonster.liv}}
                .monster-mes weapon:{{botMonster.weapon.name}}
                .monster-mes armor:{{botMonster.armor.name}}
                .monster-mes house1:{{botMonster.house1.name}}
                .monster-mes house2:{{botMonster.house2.name}}
                .monster-kill {{botMonster.haveKill?"已杀":"未杀"}}
                .monster-le {{botMonster.haveLe?"乐":""}}
                .monster-bing {{botMonster.haveBing?"兵":""}}
        .text-me
            .mes name: me
            .mes meLife: {{meLife}}
            .mes cardNum: {{meCardList.length}}
            .monster(v-for="meMonster in meMonsterList")
                .monster-mes name:{{meMonster.name}}
                .monster-mes atk:{{meMonster.atk}}
                .monster-mes def:{{meMonster.def}}
                .monster-mes liv:{{meMonster.liv}}
                .monster-mes weapon:{{meMonster.weapon.name}}
                .monster-mes armor:{{meMonster.armor.name}}
                .monster-mes house1:{{meMonster.house1.name}}
                .monster-mes house2:{{meMonster.house2.name}}
                .monster-kill {{meMonster.haveKill?"已杀":"未杀"}}
                .monster-le {{meMonster.haveLe?"乐":""}}
                .monster-bing {{meMonster.haveBing?"兵":""}}
        .text-record
            .record-output(id="scrollContainer")
                .record-output-for(v-for="outputItem in outputList") {{outputItem}}
            .hand-card
                .hand-card-for(v-for="handCard in meCardList")
                    .hand-card-for-name {{handCard.name}}
                    .hand-card-for-attribute {{handCard.attribute}}

            input(class="record-input" v-model="inputText" type="text" @keyup.enter="getInputText" :disabled="disabled" id="myInput")
</template>
<style scoped lang="scss">
.all-block{
    width: 100%;
    height: 100%;
    .text-block{
        width: 100%;
        height: 400px;
        color: #999;
        .text-bot{
            width: 30%;
            height: 100%;
            float: left;
        }
        .text-me{
            width: 30%;
            height: 100%;
            float: left;
        }
        .text-record{
            width: 40%;
            height: 100%;
            float: left;
            .record-output{
                width: 100%;
                height: 260px;
                overflow: auto;
                .record-output-for{
                    // height: 24px;
                    width: 100%;
                    line-height: 24px;
                    font-size: 12px;
                    color:#999;
                }
            }
            .hand-card{
                height: 100px;
                width: 100%;
                overflow: auto;
            }
            .hand-card::-webkit-scrollbar {
                display: none;
            }
            .hand-card-for{
                width: 100%;
                height: 20px;
                line-height: 20px;
                .hand-card-for-name{
                    float: left;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: #999;
                }
                .hand-card-for-attribute{
                    float: right;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: #999;
                }
            }
            .record-input{
                text-indent: 10px;
                width: 100%;
                height: 30px;
                line-height: 30px;
            }
        }
        .monster{
            height: 100px;
            width: 100%;
            position: relative;
            .monster-mes{
                width: 100%;
                height: 12px;
                font-size: 10px;
                color: #999;
            }
            .monster-kill{
                position: absolute;
                right: 10px;
                top: 0;
                color: #aaa;
                font-size: 10px;
            }
            .monster-le{
                position: absolute;
                right: 10px;
                top: 20px;
                color: #aaa;
                font-size: 10px;
            }
            .monster-bing{
                position: absolute;
                right: 10px;
                top: 40px;
                color: #aaa;
                font-size: 10px;
            }
        }
    }
    .mes{
        height: 30px;
        line-height: 30px;
        color: #999;
        font-size: 14px;
    }
}
</style>