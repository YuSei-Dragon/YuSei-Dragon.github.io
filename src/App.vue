<template>
  <div class="block">
    <!-- <HelloWorld/> -->
    <!-- <PokeTest/> -->
    <MonsterTest/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import PokeTest from './components/PokeTest.vue'
import MonsterTest from "./components/MonsterTest.vue"

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // PokeTest,
    MonsterTest,
  }
}
</script>

<style>
.block{
  width: 100%;
  height: 100%;
}
</style>
