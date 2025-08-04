<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  reactive,
} from 'vue'
import {useStore} from 'vuex'
import challengeApi from "../challengeMonsters"
import apiTrun from "../turnMethod.js"
const store = useStore()
const SelectPage = defineAsyncComponent(() =>
  import("./BattlefieldComponents/SelectPage.vue")
)
const BeforePage = defineAsyncComponent(()=>
    import("./BattlefieldComponents/BeforePage.vue")
)
const StartPage = defineAsyncComponent(()=>
    import("./BattlefieldComponents/StartPage.vue")
)
const Dialog = defineAsyncComponent(()=>
    import("./BattlefieldComponents/BattlefieldDialog.vue")
)
const props = defineProps({
    myMonsterList_:{
        type:Array,
        default:[],
    } ,
})
const bullFightTip = computed(() => {
    return store.state.bullFightTip
})
watch(bullFightTip, (newValue, oldValue) => {
 console.log("===================>监听到了提示文字变化")
 if(newValue===""){
    //如果是初始化的“”，就不管他
 }else{
    showTipMes(newValue)
 }
}, { immediate: true, deep: true })
const showTipText = ref("")
const isShowTip = ref(false)
const showTipMes = (data)=>{
    showTipText.value = data
    isShowTip.value = true
    setTimeout(()=>{
        isShowTip.value = false
        showTipText.value = ""
        store.commit("setBullFightTip","")
    },2000)
}

onMounted(()=>{
    init()
})
const init = ()=>{
    myMonsterList_.value = []
    props.myMonsterList_.forEach(item=>{
        myMonsterList_.value.push(item)
    })
}
const myMonsterList_ = ref([])
const botMonsterList_ = ref([])
//双方怪物list
const stageNoew = ref("before")
const stageList = ref(["before","prepare","start","end"])
const monsterOnGroundMy = ref("")
//当前上场的怪兽
const handleChildSure = (monsterId)=>{
    console.log("进入开始阶段",monsterId)
    monsterOnGroundMy.value = monsterId
    stageNoew.value = "start"
    //进入 开始阶段
}//获取当前上场的第一只怪兽
const monsterOnGroundBot = ref("")
const handleEnemySure = (monsterId)=>{
    console.log("进入准备阶段",monsterId)
    monsterOnGroundBot.value = monsterId
    botMonsterList_.value.push(challengeApi.getMonsterById(monsterId))
    stageNoew.value = "prepare"
    //进入 准备阶段
}//获取对方出场怪兽
const mesList = ref([])
//记录传出打的游戏进程
const substitution = (data)=>{
    console.log(data.myMonster.id)
    let myMonsterList = []
    myMonsterList_.value.map(item=>{
        if(item.id === data.myMonster.id){
            console.log("修改我方怪物数据")
            myMonsterList.push(data.myMonster)
        }else{
            myMonsterList.push(item)
        }
    })
    let botMonsterList = []
    botMonsterList_.value.map(item=>{
        if(item.id === data.botMonster.id){
            console.log("修改对方怪物数据")
            botMonsterList.push(data.botMonster)
        }else{
            botMonsterList.push(item)
        }
    })
    myMonsterList_.value = myMonsterList
    botMonsterList_.value = botMonsterList
    console.log(myMonsterList_.value,botMonsterList_.value)
    stageNoew.value = "prepare"
    mesList.value = data.mesList
}//替换上场怪兽
const startPage = ref(null)
const botSubstitution = (data)=>{
    let myMonsterList = []
    myMonsterList_.value.map(item=>{
        if(item.id === data.myMonster.id){
            console.log("修改我方怪物数据")
            myMonsterList.push(data.myMonster)
        }else{
            myMonsterList.push(item)
        }
    })
    let botMonsterList = []
    botMonsterList_.value.map(item=>{
        if(item.id === data.botMonster.id){
            console.log("修改对方怪物数据")
            botMonsterList.push(data.botMonster)
        }else{
            botMonsterList.push(item)
        }
    })
    myMonsterList_.value = myMonsterList
    botMonsterList_.value = botMonsterList
    apiTrun.waitToDo(1000,()=>{
        startPage.value.mesListAdd({text:"对方正在选择替换的怪兽",type:"default"})
        apiTrun.waitToDo(1000,()=>{
            let end = true
            botMonsterList_.value.forEach(item=>{
                console.log(item,item.lifeNow)
                if(item.lifeNow!==undefined){
                    if(item.lifeNow>0){
                        monsterOnGroundBot.value = item.id
                    end = false
                    }
                }else{
                    monsterOnGroundBot.value = item.id
                    end = false
                }
            })//对方选出一只生命值不为0的
            if(end){
                startPage.value.mesListAdd({text:"对方没有可用的怪兽，我方获胜",type:"default"})
            }
        })
        
    })
    
}//怪物换人
const isShowDialog = ref(false)
//是否弹窗
const useSkill = (data)=>{
    skillObj.value = data
    // skillObj.value.cardList.sort((a,b)=>Number(a.realNum)-Number(b.realNum))
    // console.log(skillObj.value.cardList,)
    isShowDialog.value = true
}
const skillObj = ref({})
const closeDialog = ()=>{
    isShowDialog.value = false
}
const handleSure = (data)=>{
    startPage.value.useSkillDialog(data)
    isShowDialog.value = false
}
</script>
<template lang="pug">
.battlefield-block
    .battlefield-tip( :style="isShowTip?'top:0px;':'top:-36px;'") {{showTipText}}
    .battlefield-dialog(v-if="isShowDialog")
        Dialog(:skillObj="skillObj" @closeDialog="closeDialog" @sure="handleSure")
    .battlefield-one(v-if="stageNoew==='before'")
        BeforePage(@decideMonster="handleEnemySure")
    .battlefield-one(v-if="stageNoew==='prepare'")
        SelectPage(:myMonsterList_="myMonsterList_" @makeSure="handleChildSure")
    .battlefield-one(v-if="stageNoew==='start'")
        StartPage(ref="startPage" :mesList="mesList" @useSkill="useSkill" @substitution="substitution" @botSubstitution="botSubstitution" :myMonsterList_="myMonsterList_" :botMonsterList_="botMonsterList_" :monsterOnGroundBot="monsterOnGroundBot" :monsterOnGroundMy="monsterOnGroundMy")

</template>
<style scoped lang="scss">
.battlefield-block{
    width: 100%;
    height: 100%;
    position: relative;
}
.battlefield-one{
    width: 100%;
    height: 100%;
}
.battlefield-dialog{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
}
.battlefield-tip{
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-indent: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    background-color: #fff;
    transition: 0.3s;
    text-align: left;
    font-size: 14px;
    color: #999;
}

</style>