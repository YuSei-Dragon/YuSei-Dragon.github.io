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
import { useRouter } from 'vue-router'
import api from './classicalChallengeApi.js'

const router = useRouter()
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    // console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const changePage = () => {
    router.push('/hajimiReset/fight')
}
const monsterLevel = ref(0)
const monsterName = ref("")
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    monsterLevel.value = allMes.value.challengeMes.classicalChallenge.level
    monsterList.value = api.getMonster()
})
watch(() => monsterLevel.value, (newVal, oldVal) => {
    console.log("monsterLevel改变了", newVal)
    let monsterMes = api.getMonsterMesByLevel(newVal)
    monsterName.value = monsterMes.name
})//监听monsterLevel变化
//全部数据通过这个检测更新
const isShowDialog = ref(false)
const monsterList = ref([])
const changeLevel = () => {
    isShowDialog.value = true
}
const changeMonster = (level) => {
    monsterLevel.value = level
    isShowDialog.value = false
}
const startFight = () => {
    store.commit("hajimiReset/setTipList",["挑战开始"])
    router.push(`/hajimiReset/fight/ground?type=climb&level=${monsterLevel.value}&ground=普通`)
}
</script>

<template lang="pug">
.classical-challenge-block
  .classical-challenge-back(@click="changePage()") 返回
  .classical-challenge-main 
  .classical-challenge-name {{monsterName}}
  .classical-challenge-sure(@click="startFight()") 挑战
  .classical-challenge-level-block
    .classical-challenge-change(@click="changeLevel()")
    .classical-challenge-level {{monsterLevel}}层
    div(style="clear: both")
  .classical-challenge-dialog-block(v-if="isShowDialog")
    .classical-challenge-dialog-for(v-for="monster in monsterList" :key="monster.level"
      @click="changeMonster(monster.level)")
      .classical-challenge-dialog-img
        .classical-challenge-dialog-levle {{monster.level}}
      .classical-challenge-dialog-text {{monster.name}}
</template>
<style scoped lang="scss">
.classical-challenge-block{
    width: 100%;
    height: 100%;
    position: relative;
  .classical-challenge-back{
      position: absolute;
      top: 10px;
      left: 10px;
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #500a92;
      border: 1px solid #ee33ff;
      border-radius: 4px;
      cursor: pointer;
      color: #fff;
  }
  .classical-challenge-main {
    width: 200px;
    height:200px;
    position: absolute;
    top: 100px;
    left: 200px;
    border-radius: 4px;
    overflow: auto;
    background: url(../../img/head.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .classical-challenge-name{
    position: absolute;
    top: 64px;
    left: 200px;
    width: 200px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #500a92;
    border: 1px solid #ee33ff;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
  }
  .classical-challenge-sure{
    position: absolute;
    top: 310px;
    left: 200px;
    width: 200px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #1eac9b;
    border: 1px solid #ee33ff;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
  }
  .classical-challenge-level-block{
    position: absolute;
    top: 10px;
    right: 20px;
    height: 30px;
    line-height: 30px;
    .classical-challenge-level{
      font-size: 14px;
      color: #666;
      float: right;
      margin-right: 10px;
    }
    .classical-challenge-change{
      background: url(../../img/more.png) no-repeat;
      background-size: 100% 100%;
      width: 30px;
      height: 30px;
      float: right;
      cursor: pointer;
    }
  }
  .classical-challenge-dialog-block{
    position: absolute;
    top: 50px;
    right: 100px;
    width: 400px;
    height: 300px;
    background-color: #333;
    border: 1px solid #ee33ff;
    border-radius: 4px;
    overflow: auto;
    .classical-challenge-dialog-for{
      float: left;
      width: 40px;
      margin: 10px;
      height: 80px;
      cursor: pointer;
      .classical-challenge-dialog-img{
        width: 40px;
        height: 40px;
        background: url(../../img/head.jpg) no-repeat;
        background-size: 100% 100%;
        border-radius: 4px;
        position: relative;
        .classical-challenge-dialog-levle{
          font-size: 10px;
          color: #fff;
          position: absolute;
          top: -2px;
          right: -2px;
          width: 16px;
          height: 16px;
          border-radius: 16px;
          text-align: center;
          line-height: 16px;
          background-color: #ee33ff;
        }
      }
      .classical-challenge-dialog-text{
        font-size: 12px;
        color: #fff;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>