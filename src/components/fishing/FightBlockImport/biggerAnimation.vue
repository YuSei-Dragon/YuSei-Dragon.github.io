<template>
  <div class="show-block" :style="getIsShowBlock()">
    <div class="slash-effect" :style="isBiggerStyle()">
      {{showText}}
    </div>
    <div class="user-text">{{ userName }}</div>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineProps,
} from 'vue'
const props = defineProps({
    showText:{
        type:String,
        default:"闪",
    },
    userName:{
        type:String,
        default:"使用者名字",
    },
})
// 定义动画状态
const animate = ref(false);
const isShowBlock = ref(false)
const isBigger = ref(false)
const getIsShowBlock = ()=>{
  if(isShowBlock.value){
    return "opacity:1;"
  }else{
    return "opacity:0;"
  }
}
const isBiggerStyle = ()=>{
  if(isBigger.value){
    if(props.showText.length>2){
      return "font-size:48px;"
    }else{
      return "font-size:70px;"
    }
    
  }else{
    return "font-size:20px;"
  }
}
onMounted(() => {
  init()
})
const init = ()=>{
  startAnimation()
}
// 触发动画的方法
const startAnimation = () => {
  setTimeout(() => {
    isShowBlock.value = true
    isBigger.value = true; // 触发动画
    setTimeout(() => {
      // isShowBlock.value = false; // 触发动画
    }, 1000);
  },100)
};
</script>

<style scoped>
/* 容器样式 */
.show-block{
  transition: 0.3s;
  position: relative;
  opacity:0;
  width: 200px;
  height: 200px;
}
.slash-effect {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0px;
  transition: 0.3s;
  text-align: center;
  line-height: 200px;
  color: #999;
  -webkit-text-stroke: 1px rgb(255, 255, 255); /* 描边宽度和颜色 */
}
.user-text{
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  color: #fff;
  font-size: 16px;
}
</style>