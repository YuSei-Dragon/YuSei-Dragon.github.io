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

} from 'vue'
import {useStore} from 'vuex'
import runeApi from "./rune.js"
import skillListApi from './skillList.js'
import planetApi from '../Planet/planet.js'

const store = useStore()
const allMes = ref({})
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    // 数据本地化，方便后续使用
    init()
})
const experienceText = ref(0)
const upgradeList = ref([])
const goldNum = ref(0)
const init = () => {
    console.log("allMes", allMes.value)
    if(allMes.value?.fightMes){
        //结算经验
        console.log("allMes", allMes.value)
        const experience = runeApi.calculateExperience(allMes.value)
        console.log("experience", experience)
        let updataMonsterLvRes = runeApi.updateMonsterLv(allMes.value,experience)
        allMes.value = updataMonsterLvRes.allMes
        console.log("upgradeList", updataMonsterLvRes.upgradeList)
        if(updataMonsterLvRes.upgradeList.length>0){
            upgradeList.value = updataMonsterLvRes.upgradeList
        }
        console.log("allMes", allMes.value)
        experienceText.value = experience
        if(allMes.value.fightMes.result==="catch"){
            //捕捉精灵成功
            allMes.value = runeApi.catchMonster(allMes.value)
            //加入精灵列表
        }else if(allMes.value.fightMes.result==="win"){
            allMes.value = runeApi.checkBossMonster(allMes.value)
            //击败精灵,检查是否是boss
            store.commit("hajimiReset/setAllMes",allMes.value)
        }else{
            //战斗失败
        }
        allMes.value.fightMes.botMes.monsterList.forEach(item=>{
            if(item.isDead&&item.isDead===true){
                goldNum.value += item.level*50
            }
        })
        allMes.value.playerMes.money += goldNum.value
        //其实每次战斗开始都会重置，这里是为了避免在外面使用数据的时候出现异常情况不好排查
    }else{
        console.log("战斗结果不存在")
    }
}
const confirm = ()=>{
    console.log("完成结算")
    allMes.value.fightMes = null
    allMes.value.wildMonster = {}
    store.commit("hajimiReset/setAllMes",allMes.value)
    window.history.go(-2)

}
const getSkillList = (oldLv,lv,name) => {
    console.log("oldLv", oldLv, "lv", lv, "name", name)
    let skillList = []
    for(let i = oldLv+1;i<=lv;i++){
        let resList = skillListApi.getSkillListByLv(name,i)
        // console.log("resList", resList)
        if(resList.length>0){
            resList.forEach(item=>{
                skillList.push(item)
            })
        }
    }
    console.log("skillList", skillList)
    return skillList
}
const checkCanEvolution = (name) => {
    // console.log("name", name, "level", level)
    let res = planetApi.getWildMonsterMesByName(name)
    let level = 0
    upgradeList.value.forEach(item=>{
        if(item.name===name){
            level = item.lv
        }
    })
    console.log("res", res,level)
    if(res.evolveLv!==-1&&res.evolveLv<=level){
        return true
    }
    return false
}
</script>

<template lang="pug">
.result-block(v-if="allMes.fightMes")
   .result-tips(v-if="allMes.wildMonster?.name&&!allMes.fightMes.result==='win'") 捕捉 {{allMes.wildMonster.name}} {{allMes.fightMes.result==="catch"?"成功":"失败"}}!
   .result-tips(v-if="allMes.fightMes.result==='win'" )
        div(v-for="monster in allMes.fightMes.botMes.monsterList" :key="monster.name") 你击败了 {{monster.name}}!
   .result-tips(v-if="allMes.fightMes.result==='lose'") 你被击败了!
   .result-tips 获取金币：{{goldNum}}
   .result-tip-for-block
        .result-tip-for(v-for="item in allMes.fightMes.myMes.monsterList" :key="item.name")
            .result-tips(v-if="item.onGround") {{item.name}} 获得 {{experienceText}} 经验
            .result-tips(v-show="(upgradeList.length>0)&&(one.name===item.name)" v-for="one in upgradeList" :key="one.name")
                .result-tips-one {{item.name}} 从 {{one.oldLv}} 级 升级到 {{one.lv}} 级!
                .result-tips-one(v-for="skill in getSkillList(one.oldLv,one.lv,one.name)") 学会了技能 {{skill}}
            .result-tips-evolution(v-if="checkCanEvolution(item.name)") {{item.name}}可以进化了！
   .result-button(@click="confirm()") 确认
</template>
<style scoped lang="scss">
.result-block{
    position: relative;
    width: 100%;
    height: 100%;
    .result-tips{
        font-size: 12px;
        color: #999;
        padding: 20px;
    }
    .result-tips-evolution{
        font-size: 12px;
        color: #999;
        padding: 10px 20px;
    }
    .result-tip-for-block{
        max-height: 296px;
        overflow: auto;
    }
    .result-button{
        color: #999;
        font-size: 16px;
        padding: 10px 20px;
        cursor: pointer;    
        background: linear-gradient(90deg, rgba(50, 50, 50, 1) 0%, rgba(0, 0, 0, 1) 5%, rgba(58, 58, 60, 1) 35%, rgba(60, 60, 60, 1) 100%);
    }
    .result-button:hover{
        color: #333;
        background: linear-gradient(90deg, rgba(138,138,138,1) 0%, rgba(204,204,204,1) 5%, rgba(134,134,134,1) 35%, rgba(38,38,38,1) 100%);
    }
}
/* 定义滚动条宽度和背景颜色 */
::-webkit-scrollbar {
width: 10px;
height: 8px;
background-color: #222;
}

/* 定义滚动条轨道的阴影和圆角 */
::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
border-radius: 4px;
background-color: #222;
}

/* 定义滑块的圆角和阴影 */
::-webkit-scrollbar-thumb {
border-radius: 4px;
-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,.3);
background-color: #666;
}
</style>