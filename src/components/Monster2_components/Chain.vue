<script setup>
import {
  computed,
  ref,
  onMounted,
  watch,
  defineAsyncComponent,
  nextTick,
} from 'vue'
const props = defineProps({
    chainsList:{
        type:Array,
        default:[],
    }
})
const line = ref(null)
watch(props.chainsList,(newValue,oldValue)=>{
    console.log("chainsList change")
    init()
})
const thisChainsList = ref([])
onMounted(() => {
  init()
})
const init = ()=>{
    thisChainsList.value = props.chainsList
//     line.onscroll = function readScrollTop() {
//     console.log('scrollTop:', line.scrollTop); // 可以清楚的看到滚动的距离
//  }
 setTimeout(() => {
      // console.log('内容增加时', line.value.scrollHeight);
      line.value.scrollTop = line.value.scrollHeight;
    }, 20); // 注意这里需要延迟20ms正好可以获取到更新后的dom节点
}
const something = ref()
</script>
<template lang="pug">
div
    .block(ref="line")
      .chains-block(v-for="(item,index) in thisChainsList" :key="index")
        .number {{index+1}}
        .card
</template>
<style scoped>
/* 定义滚动条的整体样式 */
::-webkit-scrollbar {
width: 4px; /* 对于垂直滚动条 */
height: 6px; /* 对于水平滚动条 */
background-color: #fff; /* 滚动条的背景色 */
}

/* 定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(216, 216, 216, 0.3); /* 轨道的阴影 */
border-radius: 10px; /* 轨道的圆角 */
background-color: #fff; /* 轨道的背景色 */
}

/* 定义滑块的样式 */
::-webkit-scrollbar-thumb {
border-radius: 10px; /* 滑块的圆角 */
-webkit-box-shadow: inset 0 0 6px rgba(226, 226, 226, 0.3); /* 滑块的阴影 */
background-color: #eee; /* 滑块的背景色 */
}
.block{
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    overflow: auto;
}
.chains-block{
  width: 100%;
  height: 40px;
}
.number{
  width: 16px;
  height: 40px;
  line-height: 40px;
  color: #eee;
  float: left;
  text-align: center;
  font-size: 14px;
}
.card{
  float: left;
}
</style>