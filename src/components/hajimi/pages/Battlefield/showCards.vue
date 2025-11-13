<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
  watch,
} from 'vue'
import {useStore} from 'vuex'
import fightMethods from '../../fightMethods'
const store = useStore()
const props = defineProps({
    showCardsMes:{
        type:Object,
        default:{
            user:"",
            showCardList:[]
        }
    },
})
// watch(()=>props.showCardsMes,async (newVal,oldVal)=>{
//   console.log("展示卡牌变化",newVal,oldVal)
//     nextTick(()=>{
//       init()
//     })
// }, { deep: true })
const showCardList = ref([])
onMounted(()=>{
  console.log("展示卡牌初始化")
  nextTick(()=>{
    init()
  })
})
const emit = defineEmits(['closeShowCards'])
const init = async()=>{
  showCardList.value = []
  console.log("展示卡牌",props.showCardsMes)
  for(let i = 0;i<props.showCardsMes.showCardList.length;i++){
    await fightMethods.waitToDo(1000,()=>{
      showCardList.value.push(props.showCardsMes.showCardList[i])
    })
  }
  await fightMethods.waitToDo(2000,()=>{
    emit("closeShowCards")
  })
}
const whoShow = (user)=>{
  if(user == "allMesBot"){
    return "对方"
  }return "我方"
}


</script>

<template lang="pug">
.show-card
    .show-card-title(style="padding-top:4px;") {{whoShow(props.showCardsMes.user)}}展示手卡
    .show-card-list
      .show-card-item(v-for="showCardItem in showCardList" :key="showCardItem.name") {{showCardItem.name}}
</template>
<style scoped lang="scss">
.show-card{
  width: 100%;
  width: 100%;
  .show-card-title{
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .show-card-list{
    padding: 10px;
    height: 156px;
    overflow: auto;
    .show-card-item{
      font-size: 14px;
      color: #666;
      text-align: left;
    }
  }

}
</style>