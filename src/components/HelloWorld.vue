<script setup>
//read me 
//可手动输入速度进行速度调整
//可选择是否进行自动渐进加速
//每次打完一行要再输入一个 键位 才会提交 当劲舞团玩扣空格就行
//上面红色的进度条就是你剩余的时间
//好了你已经学会怎么打白骨了，快去开一把单排人吧
import { ref } from 'vue'
import {
  onMounted,
} from 'vue'
  
const countdownLong = ref(1000)
const speed = ref(10)
const getCountdownStyle = (()=>{
  return 'width:' + countdownLong.value/2.5 + 'px;'
})
const List = ref([])
const inputText = ref("")
const answer = ref([])
const itemIndex = ref(0)
const isAlert = ref(true)
const countdown = ref(3)
const isShowThree = ref(false)
const isAddSpeed = ref(true)
const input = ref(null)

onMounted(() => {
  init()
  input.value.addEventListener("keydown",function(e){
    console.log(e.keyCode,answer.value)
    //a-65 w-87 d-68 s-83 
    if(transfromKeyCode(answer.value[itemIndex.value])==e.keyCode&&(isShowThree.value ==false)){
      //防止提前输入
      itemIndex.value+=1
    }
  })
})
const transfromKeyCode = ((input)=>{
  if(input == 'a'){
    return 65
  }else if(input == 'w'){
    return 87
  }else if(input == 'd'){
    return 68
  }else if(input == 's'){
    return 83
  }
})
const init = (()=>{
  List.value = []
  answer.value = []
  itemIndex.value = 0
  for(let i=0;i<8;i++){
    let a = Math.random()*100
    if(a<25){
      List.value.push("左")
      answer.value.push("a")
    }else if(25<=a<50){
      List.value.push("上")
      answer.value.push("w")
    }else if(50<=a<75){
      List.value.push("右")
      answer.value.push("d")
    }else if(75<=a<=100){
      List.value.push("下")
      answer.value.push("s")
    }
  }
  console.log(List.value)
  //设置随机数，0 25 50 75 100 四个区间
})
const ready = (()=>{
  isAlert.value = true
  isShowThree.value = true
  const three = setInterval(()=>{
    if(countdown.value<=0){
      isShowThree.value = false
      window.clearInterval(three)
    }
    countdown.value--
  },1000)
  countdownLong.value = 1000
  const start = setInterval(()=>{
    if(countdownLong.value <= 0){
      if(isAlert.value){
        alert("时间到！")
        again()
      }
      window.clearInterval(start)
      
    }
    if(countdown.value<=0){
      countdownLong.value-=speed.value
    }
    
  },400)
})
const again = (()=>{
  isAlert.value = false
  countdown.value = 0
  countdownLong.value = 0
  isShowThree.value = false
  init()
})
const getInputText = (()=>{
  console.log(itemIndex.value,List.value)
  inputText.value = ''
  if(itemIndex.value >= 8){
    if(typeof (speed.value)=='string'){
       speed.value = Number(speed.value) + 1
    }else{
      speed.value+=1
    }
       
        init()
        countdown.value = 2
        ready()
      }
})
const addSpeed = (()=>{
  isAddSpeed.value = !isAddSpeed.value
})

</script>

<template>
  <div class="main">
    <div class="countdown-block">
      countdown
      <div class="countdown" :style="getCountdownStyle()">
      </div>
    </div>
    <div class="three">
      <div v-show="isShowThree">{{countdown}}</div>
    </div>
    <div class="body">
      <div v-for="(item1,index) in List" :key="index" class="item" :style="index<itemIndex?'background:#8eff8e':''">
      <div v-if="item1=='左'">
        ←
      </div>
      <div v-if="item1=='上'">
        ↑
      </div>
      <div v-if="item1=='右'">
        →
      </div>
      <div v-if="item1=='下'">
        ↓
      </div>
    </div>
    </div>
   <input ref="input" class="input" @keydown="getInputText()" v-model="inputText">
   <!-- @blur="again()" @focus="ready()" -->
  <div class="buttons">
    <button @click="ready()">开始</button>
    <button @click="again()">重来</button>
    <span  class="speed">
      speed:<input class="speed-input" v-model="speed">
    </span>
    <button class="add-speed" @click="addSpeed()">逐渐加速</button> {{isAddSpeed}}
  </div>
  </div>
</template>
<style>
  .main{
    width:500px;
    height:300px;
    background:#f9f9f9;
  }
  .countdown-block{
    width:100%;
    height:50px;
    font-size:18px;
    text-indent: 3px;
    position: relative;
  }
  .countdown{
    position: absolute;
    top: 5px;
    right: 0px;
    height:2px;
    background:#ff8383;
    margin-top:13px;
  }
  .three{
    width:100%;
    height: 30px;
    margin: 10px 0;
    text-align: center;
  }
  .body{
    width:100%;
    height:62.5px;
    margin-top:20px;
  }
  .item{
    width:40px;
    height:40px;
    line-height: 38px;
    margin:9px;
    float:left;
    font-size:30px;
    display:block;
    background:#eee;
    text-align:center;
    border: 2px solid #fff;
    border-radius: 5px;
  }
  .input{
    width:200px;
    margin-left: 150px;
    margin-top: 50px;
    height:30px;
    font-size:20px;
    color:#aaa;
  }
  .buttons{
    width: 100%;
    margin-top: 20px;
  }
  .speed{
    margin-left: 20px;
  }
  .speed-input{
    text-indent: 5px;
    margin-left: 10px;
  }
  .add-speed{
    margin-left: 10px;
  }
</style>