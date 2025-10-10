<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
const props = defineProps({
    allMes:{
        type:Object,
        default:{}
    }
})
const allMes = ref({})
onMounted(()=>{
  allMes.value = props.allMes
})
const changeIndex = ref(-1)
const clickChange = (index)=>{
    if(changeIndex.value === index){
        changeIndex.value = -1
    }else{
        changeIndex.value = index
    }
}
const canChange = ()=>{
    if(changeIndex.value === -1){
        return true
    }
    return false
}
const cancleChange = ()=>{
    emit("cancleChange")
}
const changeMonster = ()=>{
    emit("changeMonster",props.allMes.allMesMy.monsterList[changeIndex.value])
}
const emit = defineEmits(["cancleChange","changeMonster"])
</script>

<template lang="pug">
.change-block
    .change-block-for(v-for="(item,index) in props.allMes.allMesMy.monsterList" :style="{'background-color':changeIndex === index ? '#f5f5f5' : '#fff'}" @click="clickChange(index)")
        .change-block-name {{item.name}}
        .change-block-life {{item.nowLife}}/{{item.life}}
        .change-block-lv {{item.level}}
    div(style="clear: both;")
    el-button(class="change-button" type="default" @click="cancleChange()") 取消
    el-button(class="change-button" type="default" :disabled="canChange()" @click="changeMonster()") 确认
</template>
<style scoped lang="scss">
.change-block{
  width: 100%;
  height: 100%;
    .change-block-for{
        float: left;
        width: 50%;
        height: 50px;
        padding: 0px 10px;
        box-sizing: border-box;
        cursor: pointer;
        .change-block-name{
            float: left;
            font-size: 14px;
            color: #666;
            line-height: 50px;
        }
        .change-block-life{
            float: left;
            font-size: 12px;
            color: #666;
            line-height: 50px;
            padding-left: 10px;
        }
        .change-block-lv{
            float: right;
            font-size: 14px;
            color: #999;
            line-height: 50px;
        }
    }
    .change-button{
        float: right;
        margin-right: 10px;
        margin-top: 10px;
    }
}
</style>