<template>
  <div class="show-block" :style="getIsShowBlock()">
    <!-- 斩击效果容器 -->
    <div class="slash-effect" :class="{ 'animate': animate }">
      <div class="text-hide" :class="{ 'text-hide-width': animate1 }"></div>
      <div class="text-block">
        <div class="text-left-block" :class="{ 'text-left': animate1 }">{{ showText }}</div>
        <div class="text-right-block" :class="{ 'text-right': animate1 }">{{ showText }}</div>
      </div>
      <div class="name1-block">{{ killName }}</div>
      <div class="name2-block">{{ killedName }}</div>
    </div>
    <!-- 触发按钮 -->
    <!-- <button @click="startAnimation">触发</button> -->
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
        default:"杀",
    },
    killName:{
        type:String,
        default:"发起者",
    },
    killedName:{
        type:String,
        default:"响应者",
    }
})
// 定义动画状态
const animate = ref(false);
const animate1 = ref(false);
const isShowBlock = ref(false)
const getIsShowBlock = ()=>{
  if(isShowBlock.value){
    return "opacity:1;"
  }else{
    return "opacity:0;"
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
  isShowBlock.value = true
  animate1.value = false;
  animate.value = true; // 触发动画
  setTimeout(() => {
    animate.value = false; // 1秒后重置动画状态
    animate1.value = true;
    setTimeout(() => {
      isShowBlock.value = false
    }, 1000);
  }, 1000); // 动画持续时间为1秒
};
</script>

<style scoped>
/* 容器样式 */
.show-block{
  transition: 0.3s;
}
.slash-effect {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0px;
  background-color: #e7b3b338;
  overflow: hidden;
  border-radius: 50%;
}

/* 斩击光效的伪元素 */
.slash-effect::before {
  content: '';
  position: absolute;
  width: 283px; /* 对角线长度：sqrt(200^2 + 200^2) ≈ 283px */
  height: 4px; /* 光效的宽度 */
  background: linear-gradient(to left, transparent, #fff, transparent); /* 光效渐变 */
  opacity: 0; /* 初始状态不可见 */
  top: -60px; /* 调整起始位置 */
  right: -200px; /* 从容器的右侧开始 */
  transform: rotate(-45deg); /* 从右上到左下的角度 */
  /* transform-origin: left center;  */
  /* 旋转中心 */
  transition: opacity 0.5s ease-in-out;
}

/* 动画触发时的样式 */
.slash-effect.animate::before {
  animation: slash 1s ease-in-out;
}

/* 斩击动画 */
@keyframes slash {
  0% {
    top: -60px;
    right: -200px;
    opacity: 0;
  }
  50% {
    top: 117px;
    right: -23px;
    opacity: 1;
  }
  100% {
    top: 278px;
    right: 139px;
    opacity: 0;
  }
}

/* 按钮样式 */
button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #2980b9;
}
.text-block{
  height: 60px;
  width: 170px;
  margin-top: 70px;
  margin-left: 15px;
  position: relative;
  color: #78afed;
}
.text-left-block{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 60px;
  font-size: 36px;
  position: absolute;
  transition: 0.3s;
  top: 0;
  left: 0;
  /* clip-path: inset(0 50% 0 0); */
  clip-path: polygon(0 0, 68% 0, 32% 100%, 0 100%);
}
.text-right-block{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 60px;
  font-size: 36px;
  position: absolute;
  transition: 0.3s;
  top: 0;
  left: 0;
  /* clip-path: inset(0 0 0 50%); */
  clip-path: polygon(68% 0, 100% 0, 100% 100%, 32% 100%);
}
.text-hide{
  position: absolute;
  width: 210px;
  height: 2px;
  background: linear-gradient(to left, transparent 0%,#fff 10%,#fff 50%, #fff 90%, transparent 100%);
  top: 98px;
  right: -6px;
  transform: rotate(-45deg);
  transition: 0.3s;
  opacity: 0; /* 初始状态不可见 */
  z-index: 10;
}
.text-hide-width{
  height: 20px;
  opacity: 1;
  top: 90px;
  right: -5px;
}
.text-left{
  left: -10px;
  top: -10px;
}
.text-right{
  left: 10px;
  top: 10px;
}
.name1-block{
  position: absolute;
  top: 20px;
  left: 40px;
  width: 120px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  color: #999;
}
.name2-block{
  position: absolute;
  bottom: 20px;
  left: 40px;
  width: 120px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  color: #999;
}
</style>