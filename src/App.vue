<template>
  <div class="block">
    <!-- <HelloWorld/> -->
    <!-- <PokeTest/> -->
    <!-- <fishing/> -->
    <router-view></router-view>
    <div class="to-desk" @click="toDesk()">我的文档</div>
    <div class="to-hjm" @click="toHJM()">HJM</div>
    <div class="to-hjmreset" @click="toHJMReset()">HJMReset</div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import PokeTest from './components/PokeTest.vue'
// import MonsterTest from "./components/MonsterTest.vue"
// import Monster2 from './components/Monster2.vue'
// import Monster2View from './components/Monster2View.vue'
// import dodgeTheCrush from './components/dodgeTheCrush.vue'
// import fishing from './components/fishing/Index.vue'
import router from './router'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // PokeTest,
    // fishing
    // dodgeTheCrush，
  },
  methods:{
    toDesk(){
      router.push({
        path:"/desk"
      })
    },
    toHJM(){
      router.push({
        path:"/hajimi"
      })
    },
    toHJMReset(){
      router.push({
        path:"/hajimiReset"
      })
    }
  }
}
</script>

<style>
.block{
  width: 100%;
  height: 100%;
  position: relative;
}
.to-desk{
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  cursor: pointer;
  background: #fff;
}
.to-hjm{
  position: absolute;
  top: 60px;
  right: 0;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  cursor: pointer;
  background: #fff;
}
.to-hjmreset{
  position: absolute;
  top: 120px;
  right: 0;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  cursor: pointer;
  background: #fff;
}
</style>
