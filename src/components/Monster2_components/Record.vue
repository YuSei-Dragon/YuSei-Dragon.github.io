<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch
} from 'vue'
const something = ref()
const props = defineProps({
    recordList:{
        type:Array,
        default:[],
    }
})
const thisRecordList = ref([])
const record = ref(null)
watch(props.recordList,(newValue,oldValue)=>{
    init()
})
onMounted(() => {
  init()
})
const init = ()=>{
  thisRecordList.value = props.recordList
  setTimeout(() => {
      // console.log('内容增加时', line.value.scrollHeight);
      record.value.scrollTop = record.value.scrollHeight;
    }, 20); // 注意这里需要延迟20ms正好可以获取到更新后的dom节点
}
</script>
<template lang="pug">
div
    .block(ref="record")
      .record-block(v-for="(item,index) in thisRecordList" :key="index") {{item}}
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
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    font-size: 12px;
}
.record-block{
  color: #eee;
}
.record-block:hover{
  color: #ddd;
}
</style>