<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
} from 'vue'
const player = ref({
  x:100,
  y:100,
  width:40,
  height:40,
})
const bull = ref({
  x:100,
  y:100,
  width:40,
  height:40,
})
onMounted(()=>{
  init()
})
watch(player.value,(newValue,oldValue)=>{
    if(Math.abs(player.value.x-bull.value.x)<(player.value.width/2+bull.value.width/2)
    &&Math.abs(player.value.y-bull.value.y)<(player.value.height/2+bull.value.height/2)){
    console.log("你被牛创了！")
  }
})
const isPlaying = ref(false)
const init = (()=>{
  
})
const bullCrash = ref()
const startGame = (()=>{
  console.log("start game")
  if(!isPlaying.value){
    isPlaying.value= true
    document.addEventListener('mousemove',(event)=>{
        let x = event.clientX
        let y = event.clientY
        let resX = x-player.value.width/2
        let resY = y-player.value.height/2

        player.value.x = resX
        player.value.y = resY
    })
    startBull()
  }else{
    clearInterval(bullCrash.value)
    
  }
  
})
const startBull = (()=>{
    bullCrash.value = setInterval(()=>{
    if(bull.value.x>500-bull.value.width/2){
      bull.value.x = -bull.value.width
    }
    bull.value.y = 0
    bull.value.x+=5
  },10)
  

})
const getPlayerStyle = ((player)=>{
  let result = "width:"
  result += player.width
  result += "px;height:"
  result += player.height
  result += "px;top:"
  result += player.y
  result += "px;left:"
  result += player.x
  result += "px;"
  return result
})
</script>
<template>
    <div class="bg-block" @click="startGame()">
      <div class="player-block" :style="getPlayerStyle(player)"></div>
      <div class="bull-block" :style="getPlayerStyle(bull)"></div>
    </div>
</template>
<style scoped>
.bg-block{
  width:500px;
  height: 400px;
  background: #eee;
  position: relative;
}
.player-block{
  position: absolute;
  background: #fff;
  transition: 0.1s;
}
.bull-block{
  position: absolute;
  background: #ddd;
  /* transition: 0.1s; */
}
</style>