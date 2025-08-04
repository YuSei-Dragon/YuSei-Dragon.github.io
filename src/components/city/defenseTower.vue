<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
import commonFuction from "./commonFuction.js"
const backBlock = defineAsyncComponent(() =>
  import("./common/backgroundBlock.vue")
)
onMounted(()=>{
  init()
})
const init = ()=>{

}
</script>
<template lang="pug">
backBlock(:size="20")
</template>
<style scoped lang="scss">

</style>