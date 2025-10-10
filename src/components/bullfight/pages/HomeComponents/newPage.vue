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

import {
  ArrowLeft
} from '@element-plus/icons-vue'
import newMonstersListApi from './newMonstersList'
const choiceList = ref([])
onMounted(()=>{
    choiceList.value = newMonstersListApi.getNewList()
})

const emit = defineEmits(['backHome','setPageName','setPlayMes'])
const backHome = ()=>{
    emit('backHome')
}
const input = ref("")
const getListStyle = ()=>{
    return "width:" + choiceList.value.length * 61 + "px;height:100%;"
}
const monsterListRef = ref(null)
const scrollLeft = ()=>{
	monsterListRef.value.scrollLeft -= 60
}
const scrollRight = ()=>{
	monsterListRef.value.scrollLeft += 60
}
const showMonsterText = ref("")
const showMonsterMes = (data)=>{
    showMonsterText.value = data.desc
}
const choiceMonster = ref("")
const choiceOne = (data)=>{
    choiceMonster.value = data.name
}
const submit = ()=>{
    console.log("submit")
    if(input.value === ""){
        return store.commit("setBullFightTip","请输入你的id!")
    }
    if(choiceMonster.value === ""){
        return store.commit("setBullFightTip","请选择你的初始哈基米!")
    }
    emit("setPlayMes",newMonstersListApi.setNewPlayerMes(input.value,choiceMonster.value))
    emit('setPageName','playerHome')
    
}
</script>
<template lang="pug">
.new-block
    el-button(class="new-back" :icon="ArrowLeft" @click="backHome") 返回
    .new-name-title 你的id
    el-input(class="new-name-input" v-model="input" placeholder="Please input" clearable)
    .new-monster-title 选择你的初始哈基米
    .new-monster-list-block(ref="monsterListRef")
        .new-monster-list(:style="getListStyle()")
            .new-monster-list-for(v-for="monster in choiceList" :style="choiceMonster===monster.name?'background:#fff':''" @mouseenter="showMonsterMes(monster)" @click="choiceOne(monster)")
                .new-monster-list-for-name {{monster.name}}
                .new-monster-list-for-attribute {{monster.attribute}}
    .new-monster-list-left.new-monster-list-button(@click="scrollLeft()") <
    .new-monster-list-right.new-monster-list-button(@click="scrollRight()") >
    .new-monster-list-text {{showMonsterText}}
    el-button(class="new-monster-sure"  @click="submit()") 确认
</template>
<style scoped lang="scss">
.new-block{
    width: 100%;
    height: 100%;
    position: relative;
    .new-back{
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .new-name-title{
        color: #999;
        padding-left: 88px;
        padding-top: 80px;
        padding-bottom: 6px;
        font-size: 12px;
    }
    .new-name-input{
        padding: 0 86px;
    }
    .new-monster-title{
        color: #999;
        padding-left: 88px;
        padding-top: 30px;
        font-size: 12px;
    }
    .new-monster-list-block{
        position: relative;
        margin: 20px 90px;
        margin-bottom: 10px;
        width: 320px;
        height: 60px;
        border: 1px #fff solid;
        padding: 0!important;
        // margin: 0!important;
        white-space: nowrap; /* 确保子元素不会换行 */
        // overflow-x: scroll; /* 允许水平方向上的滚动 */
		overflow-x: hidden;
        overflow-y: hidden; /* 隐藏垂直方向上的滚动条 */
        .new-monster-list-for{
            width: 60px;
            height: 60px;
            position: relative;
            float: left;
            border-right: 1px #fff solid;
            cursor: pointer;
            .new-monster-list-for-name{
                font-size: 12px;
                color: #666;
                padding: 4px;
            }
            .new-monster-list-for-attribute{
                font-size: 10px;
                color: #666;
                position: absolute;
                bottom: 6px;
                right: 6px;
            }
        }
    }
    .new-monster-list-button{
        position: absolute;
        bottom: 144px;
        font-size: 20px;
        font-weight: bold;
        color: #aaa;
        cursor: pointer;
        /* 火狐 */
        -moz-user-select: none;
        /* Safari 和 欧朋 */
        -webkit-user-select: none;
        /* IE10+ and Edge */
        -ms-user-select: none;
        /* Standard syntax 标准语法(谷歌) */
        user-select: none;
    }
    .new-monster-list-left{
        left: 60px;
    }
    .new-monster-list-right{
        right: 60px;
    }
    .new-monster-list-text{
        margin: 0px 88px;
        width:322px;
        border-radius: 4px;
        border: 1px #fff solid;
        height: 70px;
        font-size: 12px;
        color:#999;
        background: #fff;
    }
    .new-monster-sure{
        font-size: 14px;
        width: 70px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        position: absolute;
        bottom: 10px;
        right: 88px;
        border-radius: 4px;
        color: #666;
        cursor: pointer;
        background: #fff;
    }
}
/* WebKit浏览器 */
*::-webkit-scrollbar {
width: 10px;
}

*::-webkit-scrollbar-thumb {
// background: #ccc;
background: rgba(255, 255, 255, 0);
border-radius: 5px;
}

/* Firefox浏览器 */
* {
scrollbar-width: thin;
// scrollbar-color: rgb(213, 224, 234) rgb(255, 255, 255);
scrollbar-color: rgba(213, 224, 234, 0) rgba(255, 255, 255, 0);
}
</style>