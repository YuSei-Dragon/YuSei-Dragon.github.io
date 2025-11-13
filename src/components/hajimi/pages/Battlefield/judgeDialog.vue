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
import fightMethods from '../../fightMethods'
const store = useStore()
const props = defineProps({
    allMes:{
        type:Object,
        default:{}
    },
    judgeMes:{
        type:Object,
        default:{}
    },
})
const allMes = ref({})
const judgeList = ref([])
const emit = defineEmits(['judgeEnd'])
onMounted(async()=>{
  allMes.value = props.allMes
  console.log("judgeMes",props.judgeMes)
  if(props.judgeMes.type === "type"){
    //如果判断的是种类
    if(props.judgeMes.stop === "num"){
        for(let i = 0;i<props.judgeMes.num;i++){
            await fightMethods.waitToDo(1000,()=>{
                judgeList.value.push({
                    ...allMes.value.cardList[0]
                })
            })
        }
        allMes.value.cardList.splice(0,props.judgeMes.num)
        // console.log("judgeList",judgeList.value)
        fightMethods.waitToDo(1000,()=>{
            emit("judgeEnd",{
              judgeList:judgeList.value,
              allMes:allMes.value,
            })
        })
    }
  }
})


</script>

<template lang="pug">
.judge-block
    .judge-title(style="padding-top:4px;") 判定：{{props.judgeMes.name}}
    .judge-list
      .judge-item(v-for="judgeItem in judgeList" :key="judgeItem.name") {{judgeItem.name}}
</template>
<style scoped lang="scss">
.judge-block{
  width: 100%;
  width: 100%;
  .judge-title{
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .judge-list{
    padding: 10px;
    height: 156px;
    overflow: auto;
    .judge-item{
      font-size: 14px;
      color: #666;
      text-align: left;
    }
  }

}
</style>