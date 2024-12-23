<script setup>
import {
  computed,
  ref,
  watch,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
const emit = defineEmits([ "doSth" ])
import method from './view-method.js'
const something = ref()
const cardsList = ref([])
const mouseenterIndex = ref(-1)
const props = defineProps({
    myCardsList:{
        type:Array,
        default:[],
    },
    bloodNum:{
        type:Number,
        default:0,
    },
    speed:{
      type:Number,
      default:0
    }
})
const allMes = ref({})
watch(props.myCardsList,(newValue,oldValue)=>{
    console.log("myCardsList change")
    cardsList.value = newValue
})
watch(props.bloodNum,(newValue,oldValue)=>{
    console.log("itsBloodNum change")
})
watch(props.speed,(newValue,oldValue)=>{
    console.log("itsBloodNum change")
})
onMounted(() => {
  init()
})
const init = ()=>{
    cardsList.value = props.myCardsList
}
const getCardsListStyle = (index)=>{
    if(props.myCardsList.length<=6){
        if(index==mouseenterIndex.value){
          // console.log("margin-top change")
          return "transform: translateY(-10px);"
        }
        return ""
    }else{
        let style = "position: absolute;"
        const left = (index)*(318/(props.myCardsList.length-1))
        // console.log(left)
        let top = 0
        let zIndex = index+1
        if(index==mouseenterIndex.value){
          top = "-10px"
          zIndex = 99
        }
        style+="left:"+left+"px;top:"+top+";z-index:"+ zIndex+";"
        return style
    }
}
const getBloodStyle = ()=>{
    let style="width:"
    if(props.bloodNum>8000){
        style+="100%;" 
    }else{
        style+=props.bloodNum/80 +"%;"
    }
    // console.log(style)
    return style
}
const mouseenterCard = (index)=>{
  // console.log("mouseenterIndex change",index)
  mouseenterIndex.value = index
}
const mouseleaveCard = ()=>{
  // console.log("mouseenterIndex change",-1)
  mouseenterIndex.value = -1
}
const callStyle = (index)=>{
  if(mouseenterIndex.value == index){
    return "color:#000"
  }
}
const useStyle = (index)=>{
  if(mouseenterIndex.value == index){
    return "color:#000"
  }
}
const checkUse = (item)=>{
  if(item.type=="monster"){
    return checkMonsterAbility(item)
  }else{
    if(item.speed>=props.speed){
      // method.checkCardUse()
      //检查发动条件是否满足
      return true
    }else{
      return false
    }
    //检查法术速度
  }
}
const checkMonsterAbility = (item)=>{
  let result
  emit("checkMonsterAbility",{item,fn:(i)=>{
    result = i
  }})
  // console.log(result)
  return result
}
const checkCall = (item)=>{
  if(item.type==='monster'){
    let result
    emit("checkCall",{item,fn:(i)=>{
      result = i
    }})
    return result
  }else{
    return false
  }
}
const call = (item)=>{
  emit("call",item)
}
</script>
<template lang="pug">
div
    .block
      .head-block
        .head
        .buttons
      .blood-and-cards
        .blood-block
          .blood(:style="getBloodStyle()")
        .cards
          .cards-list(@mouseenter="mouseenterCard(index)" @mouseleave="mouseleaveCard()" :style="getCardsListStyle(index)" v-for="(item,index) in cardsList" :key="index")
            .name {{item.name}}
            .call(v-if="checkCall(item)" :style="callStyle(index)" @click="call(item)") 召唤
            .use(v-if="checkUse(item)" :style="useStyle(index)") 发动
</template>
<style scoped>
.block{
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
}
.head-block{
    float: left;
    width: 120px;
    height: 100px;   
}
.head{
  height: 100px;
  width: 100px;
  float: left;
}
.head:hover{
    background: #eee;
}
.buttons{
  float: left;
  height: 100px;
  width: 20px;
}
.blood-and-cards{
    float: left;
    width: 380px;
    height: 100px;
}
.blood-block{
    width: 100%;
    height: 8px;
}
.blood{
    float: left;
    height: 100%;
}
.blood:hover{
    background: #f4f4f4;
}
.cards{
    width: 100%;
    height: 90px;
    margin-top: 2px;
    /* background: #eee; */
    position: relative;
}
.cards-list{
    margin: 0 1.5px;
    height: 90px;
    float: left;
    width: 60px;
    background: #fff;
    display: block;
    transition: 0.3s;
}
.cards-list:hover{
    background: linear-gradient(to right, #eee 0%, #fff 100%);
}
.name{
  font-size: 12px;
  color: #ddd;
}
.name:hover{
  color: #aaa;
}
.call{
  color: #fff;
  width:100%;
  padding: 4px;
  font-size: 14px;
  /* text-indent: 4px; */
  cursor: pointer;
  opacity: 0.1;
  background: #fff;
}
.call:hover{
  opacity: 0.6;
  transition: 0.3s;
}
.use{
  color: #fff;
  width:100%;
  padding: 4px;
  font-size: 14px;
  /* text-indent: 4px; */
  cursor: pointer;
  opacity: 0.1;
  background: #fff;
}
.use:hover{
  opacity: 0.6;
  transition: 0.3s;
}
</style>