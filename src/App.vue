<template>
  <div class="block">
    <!-- <HelloWorld/> -->
    <PokeTest/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import PokeTest from './components/PokeTest.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    PokeTest,
  }
}
</script>

<style>
.block{
  width: 100%;
  height: 100%;
}
</style>
