<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
} from 'vue'
const something = ref()
const start = ref(false)
const startInput = ref(false)
const emit = defineEmits([ "PageToIndex" ,"newOneAccount"])
onMounted(()=>{
  init()
})
const init = ()=>{
  setTimeout(()=>{
    start.value = true
    setTimeout(()=>{
      startInput.value = true
    },800)
  },200)
}
const getBorderStyle = ()=>{
  if(start.value){
    return "height:400px;width:500px;opacity: 0.2;"
  }else{
    return ""
  }
}
const getInputLineStyle = ()=>{
  if(startInput.value){
    return "height:130px;"
  }else{
    return ""
  }
}
const getInputStyle = ()=>{
  if(startInput.value){
    return "margin-top: 129px;opacity: 0.8;"
  }else{
    return ""
  }
}
const backToIndex = ()=>{
  emit("PageToIndex")
}
const inputName = ref("")
const isInputing = ref(false)
const focusInput = ()=>{
  isInputing.value = true
}
const blurInput = ()=>{
  isInputing.value = false
}
const getInputTextStyle = ()=>{
  if(isInputing.value){
    return "color:#fff"
  }else{
    return ""
  }
}
const getInputButtonStyle = ()=>{
  if(inputName.value!=""){
    return true
  }else{
    return false
  }
}
const isShowLine = ref(false)
const isShowLine1 = ref(false)
const isShowLine2 = ref(false)
const isShowLine3 = ref(false)
const isStopAllLine = ref(false)
const getLineStye = ()=>{
  if(isShowLine.value){
    return "height:40px;"
  }else{
    return ""
  }
}
const getLineStye1 = ()=>{
  if(isShowLine1.value){
    return "width:60px;right: -70px;"
  }else{
    return ""
  }
}
const getLineStye2 = ()=>{
  if(isShowLine2.value){
    return "height:40px;top: 0px;"
  }else{
    return ""
  }
}
const getLineStye3 = ()=>{
  if(isShowLine3.value){
    return "width:60px;"
  }else{
    return ""
  }
}
const mouseEnter = ()=>{
  isStopAllLine.value = false
  if(!isStopAllLine.value){
    isShowLine.value = true
    setTimeout(()=>{
      if(!isStopAllLine.value){
        isShowLine1.value = true
        setTimeout(()=>{
          if(!isStopAllLine.value){
            isShowLine2.value = true
            setTimeout(()=>{
              if(!isStopAllLine.value){
                isShowLine3.value = true
              }
            },200)
          }
        },200)
      }
    },200)
  }
  
}
const mouseLeave = ()=>{
  isStopAllLine.value = true
  isShowLine.value = false
  isShowLine1.value = false
  isShowLine2.value = false
  isShowLine3.value = false
}
const submitName = ()=>{
  emit("newOneAccount",inputName.value)
  goToMenu()
}
const goToMenu = ()=>{
  emit("PageToMenu")
}
</script>
<template lang="pug">
  .background
    .border(:style="getBorderStyle()")
    .border1(:style="getBorderStyle()")
    .border2(:style="getBorderStyle()")
    .input-line-bot(v-if="startInput")
    .input-line(:style="getInputLineStyle()")
      .input-block(:style="getInputStyle()")
        .input-text(:style="getInputTextStyle()") 请输入角色名称
        input(class="input-value" v-model="inputName" @focus="focusInput()" @blur="blurInput()" maxlength="8")
        .input-button(v-show="getInputButtonStyle()" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()" @click="submitName()") 确认
        .input-border-left(:style="getLineStye()")
        .input-border-left1(:style="getLineStye1()")
        .input-border-left2(:style="getLineStye2()")
        .input-border-left3(:style="getLineStye3()")
    .back-index(@click="backToIndex()") 返回
</template>
<style scoped lang="scss">
.background{
  width:100%;
  height:100%;
  position: relative;
  .border{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    // color: #fff;
    border: 1px #fff solid;
    opacity: 0.8;
    transition: 0.5s;
  }
  .border1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    // color: #fff;
    border: 1px #fff solid;
    opacity: 0.8;
    transition: 0.6s;
  }
  .border2{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    // color: #fff;
    border: 1px #fff solid;
    opacity: 0.8;
    transition: 1s;
  }
  .input-line-bot{
    position: absolute;
    top: 20px;
    right: 178px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    z-index: 2;
  }
  .input-line{
    position: absolute;
    top: 20px;
    right: 180px;
    width: 2px;
    height: 0px;
    border-radius: 2px;
    background: #eee;
    transition: 0.3s;
  }
  .input-block{
    width: 200px;
    height: 40px;
    margin-top: 9px;
    margin-left: -169px;
    background: #9fa8b870;
    border-radius: 4px;
    border: 1px #eee solid;
    transition: 0.3s;
    opacity: 0.1;
    position: relative;
  }
  .input-text{
    position: absolute;
    top: -18px;
    left: 4px;
    font-size: 12px;
    color: #8f6da2;
  }
  .back-index{
    position: absolute;
    top: 12px;
    left: 16px;
    font-size: 12px;
    color: #906cb6;
  }
  .back-index:hover{
    cursor: pointer;
    color: #fff;
  }
  .input-value{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width:100%;
    height: 100%;
    background:none;
    outline:none;
    border:0px;
    text-indent: 8px;
    font-size: 18px;
    color: #fff;
  }
  .input-button{
    position: absolute;
    top: 0;
    right: -70px;
    width: 60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    color: #999;
  }
  .input-button:hover{
    color: #fff;
    cursor: pointer;
  }
  .input-border-left{
    position: absolute;
    top: 0;
    right: -10px;
    width: 1px;
    height: 0px;
    background: #fff;
    transition: 0.2s;
  }
  .input-border-left1{
    position: absolute;
    top: 40px;
    right: -10px;
    width: 0px;
    height: 1px;
    background: #fff;
    transition: 0.2s;
  }
  .input-border-left2{
    position: absolute;
    top: 40px;
    right: -70px;
    width: 1px;
    height: 0px;
    background: #fff;
    transition: 0.2s;
  }
  .input-border-left3{
    position: absolute;
    top: 0px;
    right: -70px;
    width: 0px;
    height: 1px;
    background: #fff;
    transition: 0.2s;
  }
}
</style>