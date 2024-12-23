<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
const something = ref()
</script>
<template lang="pug">
div
    .block
        .card-img
        .card-text
</template>
<style scoped>
.block{
    width: 100%;
    height: 100%;
}
.card-img{
    height: 120px;
    width: 120px;
}
.card-text{
    width: 120px;
    height: 60px;
    border: 1px solid #ccc;
}
</style>