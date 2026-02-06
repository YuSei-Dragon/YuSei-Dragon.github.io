<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineEmits,
  defineProps,
  inject,
  reactive
} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
onMounted(() => {
    
})

const emit = defineEmits([ "close",])
const close = ()=>{
    emit('close')
}
</script>

<template lang="pug">
.dialog-block(@click="close()")
    .dialog-content-block(@click.stop)
        slot(name="body" ) 
</template>
<style scoped lang="scss">
.dialog-block{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    padding: 40px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.3);
    .dialog-content-block{
        width: 100%;
        height: 100%;
        background-color: #e7e7e7;
        border-radius: 4px;
    }
}
</style>