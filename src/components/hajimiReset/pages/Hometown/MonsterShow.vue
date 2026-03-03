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
import {useStore} from 'vuex'
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    // console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const playerMes = ref({})
onMounted(() => {
    initMes()
})
const initMes = ()=>{
    allMes.value = store.state.hajimiReset.allMes
    //在watch生效前初始化
    console.log(allMes.value)
    playerMes.value = allMes.value.playerMes
}
const emit = defineEmits([ "closeMonsterList",])
const closeMonsterList = ()=>{
    emit('closeMonsterList','confirmFight')
}
const selectMonsterUse = ref(-1)
const selectMonster = ref(-1)
//记录当前选中index

const fightListOut = ()=>{
    // console.log(selectMonsterUse.value)
    if(selectMonsterUse.value == -1){
        return 
    }
    playerMes.value.monsterFightList = playerMes.value.monsterFightList
        .filter(item=>item!==selectMonsterUse.value)
    //去除这个选中
}//加入
const fightListIn = ()=>{
    if(selectMonster.value == -1||playerMes.value.monsterFightList.includes(selectMonster.value)){
        return
    }
    playerMes.value.monsterList.map((item,index)=>{
        if(index== selectMonster.value){
            playerMes.value.monsterFightList.push(index)
        }
    })
}//退出
const confirmFight = ()=>{
    allMes.value.playerMes = playerMes.value
    store.commit("hajimiReset/setAllMes", allMes.value)
    emit("confirmFight")
}//确认保存
</script>

<template lang="pug">
.monster-block(@click="closeMonsterList()")
    .monster-list-block
        .monster-list(@click.stop="()=>{}")
            .monster-list-item(v-for="monsterUse in playerMes.monsterFightList"
                @click="selectMonsterUse = monsterUse")
                .monster-list-item-name {{playerMes.monsterList[monsterUse].name}}
                .monster-list-item-level {{playerMes.monsterList[monsterUse].level}}
                .monster-select-icon-top(v-if="monsterUse == selectMonsterUse") ⬇
                .monster-select-icon-bottom(v-if="monsterUse == selectMonsterUse") ⬆
        .monster-botton-use(@click.stop="fightListOut()") 退出出战队列
    .monster-list-block
        .monster-list(@click.stop="()=>{}")
            .monster-list-item(:class="playerMes.monsterFightList.includes(index) ? 'monster-list-item-active' : ''" 
                v-for="(monster,index) in playerMes.monsterList"
                @click="selectMonster = index")
                .monster-list-item-name {{monster.name}}
                .monster-list-item-level {{monster.level}}
                .monster-select-icon-top(v-if="index == selectMonster") ⬇
                .monster-select-icon-bottom(v-if="index == selectMonster") ⬆
        .monster-botton(@click.stop="fightListIn()") 加入出战队列
    .monster-botton-confirm(@click.stop="confirmFight()") 保存
</template>
<style scoped lang="scss">
.monster-block{
    position: relative;
    width: 100%;
    height: 100%;
    .monster-list-block{
        width: 50%;
        float: left;
        height: 100%;
        box-sizing: border-box;
        padding: 50px 25px;
        .monster-list{
            width: 100%;
            height: 100%;
            border-radius: 6px;
            border: 1px solid #ee33ff;
            background-color: #333;
            position: relative;
            .monster-list-item{
                width: 44px;
                margin-left: 5px;
                margin-top: 5px;
                height: 60px;
                float: left;
                border-radius: 4px;
                border: 1px solid #b5f830;
                box-sizing: border-box;
                position: relative;
                cursor: pointer;
                .monster-list-item-name{
                    font-size: 10px;
                    color: #fff;
                    text-align: left;
                    line-height: 12px;
                    padding: 2px;
                }
                .monster-list-item-level{
                    font-size: 8px;
                    color: #fff;
                    position: absolute;
                    bottom: 4px;
                    right: 4px;
                }
                .monster-select-icon-top{
                    position: absolute;
                    font-size: 12px;
                    color: #fff;
                    bottom: 62px;
                    left: 16px;
                }
                .monster-select-icon-bottom{
                    position: absolute;
                    font-size: 12px;
                    color: #fff;
                    top: 62px;
                    left: 16px;
                }
            }
            .monster-list-item-active{
                border: 1px solid #ff4646;
                background-color: #a10909;
            }
        }
    }
    .monster-botton-use{
        position: absolute;
        bottom: 12px;
        right: 324px;
        font-size: 14px;
        color: aqua;
        border-radius: 4px;
        border: 1px solid aqua;
        padding: 4px 10px;
        background-color: #a63535;
        cursor: pointer;
    }
    .monster-botton{
        position: absolute;
        bottom: 12px;
        right: 24px;
        font-size: 14px;
        color: aqua;
        border-radius: 4px;
        border: 1px solid aqua;
        padding: 4px 10px;
        background-color: #78477d;
        cursor: pointer;
    }
    .monster-botton-confirm{
        position: absolute;
        top: 12px;
        right: 24px;
        font-size: 14px;
        color: aqua;
        border-radius: 4px;
        border: 1px solid aqua;
        padding: 4px 10px;
        background-color: #78477d;
        cursor: pointer;
    }
}
</style>