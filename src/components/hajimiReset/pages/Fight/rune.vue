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

} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
onMounted(() => {
    
})
const props = defineProps({
    runeMes:{
        type:Object,
        default:()=>{
            return {
                normal:0,
                fortify:0,
                superFortify:0,
                supreme:0,
            }
        },
    },
})
// watch(() => props.runeMes, (newVal, oldVal) => {
//     console.log("runeMes改变了", newVal)
// }, { deep: true })
const emit = defineEmits(['useRune'])
const useRune = (type) => {
    emit('useRune',type)
}
</script>

<template lang="pug">
.rune-block
    .rune-for(@click="useRune('normal')")
        .rune-for-name 普通卡
        .rune-for-num {{runeMes.normal}}
    .rune-for(@click="useRune('fortify')")
        .rune-for-name 强化卡
        .rune-for-num {{runeMes.fortify}}
    .rune-for(@click="useRune('superFortify')")
        .rune-for-name 超强化卡
        .rune-for-num {{runeMes.superFortify}}
    .rune-for(@click="useRune('supreme')")
        .rune-for-name 至尊卡
        .rune-for-num {{runeMes.supreme}}
    
</template>
<style scoped lang="scss">
.rune-block{
    position: relative;
    width: 100%;
    height: 100%;
    // 300*80
    .rune-for {
        width: 38px;
        margin: 10px 5px;
        height: 58px;
        border: 1px solid #ee33ff;
        float: left;
        position: relative;
        border-radius: 4px;
        background-color: #333;
            .rune-for-name{
                font-size: 10px;
                color: #fff;
                width: 10px;
                height: 100%;
                padding-left: 4px;
                cursor: pointer;
            }
            .rune-for-num{
                font-size: 10px;
                color: #fff;
                position: absolute;
                top: 0px;
                right: 4px;
            }
    }
}
</style>