<script setup>
import {
  computed,
  ref,
  watch,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
  defineProps,
} from 'vue'
import jin from "./img/jin.png"
import mu from "./img/mu.png"
import shui from "./img/shui.png"
import huo from "./img/huo.png"
import tu from "./img/tu.png"
// #bfbfbf
const emit = defineEmits([ "doSth" ])
const props = defineProps({
    myCardsList:{
        type:Array,
        default:[],
    },
    bloodNum:{
        type:Number,
        default:0,
    },
})
const cardsList = ref([])
const mouseenterIndex = ref(-1)
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
    if(props.bloodNum>1000){
        style+="100%;" 
    }else{
        style+=props.bloodNum/10 +"%;"
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
const useCards = (item)=>{
  emit("myUseCards",item)
}
const getAttributeStyle = (attribute)=>{
  let result = ""
  if(attribute=="金"){
    result+="background:url("+jin+") no-repeat;"
  }
  if(attribute=="木"){
    result+="background:url("+mu+") no-repeat;"
  }
  if(attribute=="水"){
    result+="background:url("+shui+") no-repeat;"
  }
  if(attribute=="火"){
    result+="background:url("+huo+") no-repeat;"
  }
  if(attribute=="土"){
    result+="background:url("+tu+") no-repeat;"
  }
  result+="background-size:100% 100%;"
  // console.log(result)
  return result
}
const isShowButtons = ref(false)
const getButtonShowStyle = ()=>{
  let result = ""
  if(isShowButtons.value){
    result+="width:100px;"
  }
  return result
}
// const buttons_close = ref<HTMLElement>()
// const buttons_open = ref<HTMLElement>()
const mouseEnterButtons = ()=>{
  // console.log("鼠标移入")
  isShowButtons.value = true
}
const mouseLeaveButtons = ()=>{
  isShowButtons.value = false
  // console.log("鼠标移出")
}
const endTurn = ()=>{
  emit("enMyTurn")
}
</script>
<template lang="pug">
div
    .block
      .head-block(ref="buttons_close" @mouseleave="mouseLeaveButtons()")
        .head
        .buttons(ref="buttons_open" @mouseenter="mouseEnterButtons()")
          .buttons-show-block(:style="getButtonShowStyle()" )
            .skill-block
            .end-turn(@click="endTurn()") 结束回合
      .blood-and-cards
        .blood-block
          .blood(:style="getBloodStyle()")
        .cards
          .cards-list(@mouseenter="mouseenterCard(index)" @mouseleave="mouseleaveCard()" :style="getCardsListStyle(index)" v-for="(item,index) in cardsList" :key="index" @click="useCards(item)")
            .name {{item.name}}
            //- .attribute {{item.attribute}}
            .attribute-img(:style="getAttributeStyle(item.attribute)")
</template>
<style scoped lang="scss">
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
  position: relative;
  .buttons-show-block{
    position: absolute;
    top:0;
    right: 0;
    height: 100%;
    transition: 0.3s;
    background: #fff;
    width: 0px;
    .skill-block{
      float: left;
      width: 70px;
      height: 100%;
    }
    .end-turn{
      float: left;
      width: 12px;
      height: 100%;
      font-size: 12px;
      padding: 15px 8px;
      padding-left: 9px;
      padding-right: 8px;
      color: #bbb;
      border-left: 1px #ddd solid;
      cursor: pointer;
    }
    .end-turn:hover{
      background: #f4f4f4;
      color: #aaa;
    }
  }
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
    background: #f3dfe8;
    transition: 0.3s;
}
.cards{
    width: 100%;
    height: 90px;
    margin-top: 2px;
    /* background: #eee; */
    position: relative;
}
.cards-list{
    margin: 0 1px;
    height: 90px;
    float: left;
    width: 60px;
    background: #fff;
    display: block;
    transition: 0.3s;
    border-left: 1px #ccc solid;
    position: relative;
}
.cards-list:hover{
    background: linear-gradient(to right, #eee 0%, #fff 100%);
}
.name{
  font-size: 12px;
  color: #ddd;
  padding-left: 2px;
  width:12px;
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
.attribute{
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 10px;
  color: #ddd;
  padding-left: 2px;
  padding-bottom: 2px;
}
.attribute:hover{
  color: #aaa;
}
.attribute-img{
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 10px;
  width: 10px;
  height: 10px;
  margin-left: 2px;
  margin-bottom: 2px;
}
</style>