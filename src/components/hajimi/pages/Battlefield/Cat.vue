<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'

const props = defineProps({
    
})
const mode = ref('standby')
onMounted(()=>{
  init()
})
const init = ()=>{
  
}

</script>

<template lang="pug">
.all-cat
    .fight-cat-img.cat-standby(v-show="mode === 'standby'")
    .fight-cat-img.cat-haqi(v-show="mode === 'haqi'")
    .fight-cat-img.cat-atk(v-show="mode === 'atk'")
</template>
<style scoped lang="scss">
.all-cat{
    width: 100%;
    height: 100%;
    opacity: 0.5;
}
.fight-cat-img{
    width: 100%;
    height: 100%;
}
.cat-standby{
    background: url(@/components/hajimi/img/standbygif.gif);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.cat-haqi{
    background: url(@/components/hajimi/img/haqi.gif);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.cat-atk{
    background: url(@/components/hajimi/img/atk.gif);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>