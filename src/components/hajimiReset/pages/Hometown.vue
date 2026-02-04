<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineProps,
  inject,
  reactive
} from 'vue'

import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const MonsterShow = defineAsyncComponent(() =>
  import("./Hometown/MonsterShow.vue")
)
const PotentialityShow = defineAsyncComponent(() =>
  import("./Hometown/PotentialityShow.vue")
)

const router = useRouter()
const route = useRoute()
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const changePage = (title) => {
    router.push('/hajimiReset/navigation')
}
const isShowDialog = ref(false)
const isShowMonster = ref(false)
const showMonster = () => {
    isShowDialog.value = true
    isShowMonster.value = true
}
const closeMonsterList = () => {
    isShowDialog.value = false
    isShowMonster.value = false
}
const confirmFight = ()=>{
    store.commit("hajimiReset/setTipList",["精灵出战信息已保存"])
    closeMonsterList()
}
const isShowPotentiality = ref(false)
const showPotentiality = () => {
    isShowDialog.value = true
    isShowPotentiality.value = true
}
const closePotentiality = () =>{
    isShowDialog.value = false
    isShowPotentiality.value = false
}
</script>

<template lang="pug">
.hometown-block
    .hometown-back(@click="changePage") 返回
    .hometown-warehouse(@click="showMonster()") 出场精灵
    .hometown-potentiality(@click="showPotentiality()") 潜力/技能
    .pending-block(v-if="isShowDialog")
        MonsterShow(v-if="isShowMonster" @closeMonsterList="closeMonsterList()"
            @confirmFight="confirmFight")
        PotentialityShow(v-if="isShowPotentiality" @closePotentiality="closePotentiality()")
    
</template>
<style scoped lang="scss">
.hometown-block{
    width: 100%;
    height: 100%;
    position: relative;
    .hometown-back{
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
    .hometown-warehouse{
        position: absolute;
        top: 50px;
        right: 16px;
        width: 100px;
        height: 100px;
        line-height: 100px;
        border: 1px solid #fff;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        color: #fff;
    }
     .hometown-potentiality{
        position: absolute;
        top: 50px;
        right: 132px;
        width: 100px;
        height: 100px;
        line-height: 100px;
        border: 1px solid #fff;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        color: #fff;
    }
    .pending-block{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
    }
}
</style>