<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineExpose,
  defineEmits
} from 'vue'
import cardMethod from '../../cardMethod'
import {useStore} from 'vuex'
const store = useStore()
const showTip = (text)=>{
  store.commit("setBullFightTip",text)
}
const props = defineProps({
    allMes:{
        type:Object,
        default:{},
    },
})
const allMes = ref({})
onMounted(()=>{
  init()
})
const init = ()=>{
  allMes.value = props.allMes
}
const resetChoiced = (data)=>{
    choiced.value = data
}
const resetChoicedCover = (data)=>{
    choicedCover.value = data
}
const choiceCardIndex = (index)=>{
  choiceIndex.value = index
}
const choiced = ref("")
const choicedCover = ref("")
const choiceIndex = ref(-1)
const emit = defineEmits(['changeStep','cleanChoiced','sureUse'])
const changeStep = (data)=>{
  emit("changeStep",data)
}
const isShowFightPage = ()=>{
  return props.allMes.stepName == '主要阶段'
}
const coverCard = ()=>{
  // console.log(choicedCover.value,choiceIndex.value)
  if(allMes.value.allMesMy.cardGroundList.length>=3){
    showTip("我方战术区已满，不能再覆盖")
    return
  }
  allMes.value = cardMethod.coverCard(allMes.value,"allMesMy",choicedCover.value,choiceIndex.value)
  choiced.value = ""
  choicedCover.value = ""
  choiceIndex.value = -1
  emit("cleanChoiced")
}//覆盖卡牌 处理
const setType = (data)=>{
  methdoType.value = data
}
const methdoType = ref("")
//选中的种类
const sureUse = ()=>{
  emit('sureUse',{
    type:methdoType.value,
    index:choiceIndex.value,
    card:choiced.value,
  })
  choiced.value = ""
  choicedCover.value = ""
  choiceIndex.value = -1
  //清空数据
}//确认使用
defineExpose({
  resetChoiced,
  resetChoicedCover,
  changeStep,
  choiceCardIndex,
  setType,
})
</script>

<template lang="pug">
.step-ground-block(v-if="props.allMes.playingNow === props.allMes.allMesMy.playerNow.name")
  .step-block(v-show="isShowFightPage()" @click="changeStep('战斗阶段')") 战斗阶段
  .step-block(v-if="props.allMes.stepName == '主要阶段'||props.allMes.stepName == '战斗阶段'"  @click="changeStep('结束阶段')") 结束阶段
  .step-block-submit(v-show="choiced!=''" @click="sureUse()") 确认
  .step-block-cover(v-show="choicedCover!=''" @click="coverCard()") 覆盖
</template>
<style scoped lang="scss">
.step-ground-block{
    height: 40px;
    width: 100%;
    .step-block{
        height: 100%;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #999;
        float: left;
        width: 30%;
        cursor: pointer;
    }
    .step-block-submit{
      padding: 8px 14px;
      color: #999;
      background-color: #eee;
      border-radius: 4px;
      float: right;
      cursor: pointer;
    }
    .step-block-cover{
      padding: 8px 14px;
      color: #999;
      background-color: #eee;
      border-radius: 4px;
      float: right;
      cursor: pointer;
      margin-right: 10px;
    }
}
</style>