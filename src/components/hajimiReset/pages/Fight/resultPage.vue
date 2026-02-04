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

const store = useStore()
const allMes = ref({})
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    // 数据本地化，方便后续使用
    init()
})
const experienceText = ref(0)
const init = () => {
    console.log("allMes", allMes.value)
    if(allMes.value?.fightMes){
        //结算经验
        console.log("allMes", allMes.value)
        const experience = runeApi.calculateExperience(allMes.value)
        console.log("experience", experience)
        allMes.value = runeApi.updateMonsterLv(allMes.value,experience)
        console.log("allMes", allMes.value)
        experienceText.value = experience
        if(allMes.value.fightMes.result==="catch"){
            //捕捉精灵成功
            allMes.value = runeApi.catchMonster(allMes.value)
            //加入精灵列表
        }else if(allMes.value.fightMes.result==="win"){
            //击败精灵
        }else{
            //战斗失败
        }
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
</script>

<template lang="pug">
.result-block(v-if="allMes.fightMes")
   .result-tips(v-if="allMes.wildMonster?.name&&!allMes.fightMes.result==='win'") 捕捉 {{allMes.wildMonster.name}} {{allMes.fightMes.result==="catch"?"成功":"失败"}}!
   .result-tips(v-if="allMes.fightMes.result==='win'" )
        .result-tips(v-for="monster in allMes.fightMes.botMes.monsterList" :key="monster.name") 你击败了 {{monster.name}}!
   .result-tips(v-if="allMes.fightMes.result==='lose'") 你被击败了!
   .result-tip-for(v-for="item in allMes.fightMes.myMes.monsterList" :key="item.name")
        .result-tips(v-if="item.onGround") {{item.name}} 获得 {{experienceText}} 经验
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
</style>