<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
} from 'vue'
import { ElMessage } from 'element-plus'
import bossApi from "../../challengeMonsters"
const selectName = ref("")
const options = ref([])
onMounted(()=>{
    init()
})
const init = ()=>{
    options.value = []
    const bossList = bossApi.getChallengeMonsters()
    bossList.forEach(item=>{
        options.value.push({
            value:item.id,
            label:item.name,
        })
    })
}
const emit = defineEmits(['decideMonster'])
const decideMonster = ()=>{
    if(selectName.value===""){
        ElMessage({
        message:"请先选择挑战的怪兽",
            type: 'warning'
        })
    }else{
        emit('decideMonster',selectName.value)
    }
}
</script>
<template lang="pug">
.before-block
    .before-title 模拟测试
    .before-select-block
        el-select(v-model="selectName" filterable placeholder="请选择要挑战的boss" class="before-select")
            el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-button(class="before-button" @click="decideMonster()") 确认
</template>
<style scoped lang="scss">
.before-block{
    width: 100%;
    height: 100%;
    position: relative;
    .before-title{
        font-size: 20px;
        text-align: center;
        padding-top: 100px;
        padding-bottom: 40px;
    }
    .before-select-block{
        width: 300px;
        margin: 0px auto;
        .before-select{
            width: 200px;
            float: left;
        }
        .before-button{
            float: left;
            width: 90px;
            margin-left: 10px;
        }
    }
}

</style>