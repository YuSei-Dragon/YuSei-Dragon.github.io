<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
import SearchTest from './searchTest.vue';
import SearchWallTest from './searchWallTest.vue';
import DefenseTower from './defenseTower.vue';
const getSize = (size)=>{
    let res = ""
    res+="width:" + size*40 + "px;"
    res+="height:" + size*40 + "px;"
    return res
}
</script>
<template lang="pug">
.all-block
    .main-block(v-if="false")
        SearchTest
    .wall-test(v-if="false")
        SearchWallTest
    .defense-block(:style="getSize(20)")
        DefenseTower
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
.wall-test{
    position: absolute;
    top: 0;
    left: 0;
    width:400px;
    height: 400px;
}
.defense-block{
    position: absolute;
    top: 0;
    left: 0;
}
</style>