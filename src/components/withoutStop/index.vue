<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
import SoloMode from './soloMode.vue';

</script>
<template lang="pug">
.all-block
    .main-block
        SoloMode
</template>
<style scoped lang="scss">
.all-block{
    width: 100wh;
    height: 100vh;
    position: relative;
}
.main-block{
    position: absolute;
    bottom: 0;
    left: 0;
    width:500px;
    height: 400px;
}
</style>