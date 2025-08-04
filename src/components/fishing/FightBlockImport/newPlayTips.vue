<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits
} from 'vue'
import otherMethods from "../otherMethods.js"
import cardsMethods from "../cardsMethods.js"
const something = ref()
const emit = defineEmits([ "doSth" ])
onMounted(() => {
  init()
})
const init = ()=>{
    // console.log("newPlayTips got ready")
}
const props = defineProps({
    isShowFirst:{
        type:Boolean,
        default:false,
    },
    isShowWatchBackStyle:{
        type:Boolean,
        default:false,
    }
})
const tipChoice = ref("背景设定")
//当前选中哪个tab
const getWatchChoiceStyle = (name)=>{
  let result = ""
  if(name == tipChoice.value){
    result+="background: #fff;border-radius: 4px;color: #888dd3;"
  }else{
    //
  }
  if(name == "规则介绍"){
    result+="width:34%;"
  }
  return result
}//获取新手提示三个选项的style
const changeTipChoice = (name)=>{
  console.log(name)
  tipChoice.value = name
}//改变新手提示的文本
const closeNewPlayBlock = async()=>{
  // isShowFirst.value = false
  // isShowWatchBackStyle.value = false
  // finishTip()
  emit("finishTip")
}//关闭新手提示
const getTipText = ()=>{
  if(tipChoice.value=="背景设定"){
    return otherMethods.getStory()
  }
}//获取新手提示文字
</script>
<template lang="pug">
.newplay-watch(v-if="props.isShowFirst")
  .newplay-watch-close(v-if="isShowFirst" @click="closeNewPlayBlock()") ×
  .newplay-watch-title
      .newplay-watch-title-text 新手提示
      
  .newplay-watch-text {{getTipText()}}
  .newplay-watch-choice-block
    .newplay-watch-choice(:style="getWatchChoiceStyle('背景设定')" @click="changeTipChoice('背景设定')") 背景设定
    .newplay-watch-choice(:style="getWatchChoiceStyle('规则介绍')" @click="changeTipChoice('规则介绍')") 规则介绍
    .newplay-watch-choice(:style="getWatchChoiceStyle('属性克制')" @click="changeTipChoice('属性克制')") 属性克制
</template>
<style scoped lang="scss">
.newplay-watch{
  width: 100%;
  height: 100%;
  // position: absolute;
  // z-index: 101;
  // top: 100px;
  // left: 100px;
  // width: 300px;
  // height: 200px;
  // background: #f3eff9;
  // border-radius: 12px;
  // overflow: hidden;
  .newplay-watch-close{
    position: absolute;
    top: 80px;
    top: -15px;
    right: -18px;
    height: 20px;
    font-size: 24px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    z-index: 101;
  }
  .newplay-watch-close:hover{
    cursor: pointer;
  }
  .newplay-watch-title{
    width: 100%;
    padding: 4px;
    text-align: center;
    color: #ff9e9e;
    height: 22px;
  }
  .newplay-watch-text{
    width: 100%;
    height: 140px;
    color: #b7b7ce;
    font-size: 10px;
    overflow: auto;
    padding-left: 6px;
    text-indent: 20px;
  }
  .newplay-watch-text::-webkit-scrollbar {
      width: 17px;
  }
  .newplay-watch-text::-webkit-scrollbar-corner {
      background: rgba(0,0,0,0);
  }
  .newplay-watch-text::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 6px;
      border: 4px solid rgba(0,0,0,0);
      background-clip: content-box;
      min-width: 32px;
      min-height: 32px;
  }
  .newplay-watch-text::-webkit-scrollbar-track {
      background-color: rgba(0,0,0,0);
  }
  .newplay-watch-choice-block{
    width: 100%;
    height: 30px;
    .newplay-watch-choice{
      float: left;
      width: 33%;
      height: 100%;
      text-align: center;
      line-height: 30px;
      color: #c1a8bf;
      font-size: 12px;
    }
    .newplay-watch-choice:hover{
      cursor: pointer;
      background: #f3fbff;
      border-radius: 4px;
      color: #888dd3;
    }
  }
}
.test{
  transform: translate(-50%);
}
</style>