<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineProps,
  inject,
  provide
} from 'vue'
import basicSetting from "@/components/hajimiReset/basicSetting.js"
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()
const pending = ref(false)
const titleList = ref(["战斗","设置","家园","商店"])

const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
    if(allMes.value?.playerMes){
        haveInitMes.value = true
    }
}, {deep: true})
onMounted(() => {
    init()
    
})
const init = ()=>{
    allMes.value = store.state.hajimiReset.allMes
    if(allMes.value?.playerMes){
        haveInitMes.value = true
    }
}//数据初始化
const hoverTitle = ref('')
const changeTitle = (title) => {
    hoverTitle.value = title
}
const getIconStyle = () => {
    if(hoverTitle.value !== ""){
        let res = `
        position: absolute;
        top: ${titleList.value.indexOf(hoverTitle.value) * 49.5 + 90}px;
        left: 60px;
        `
        return res
    }return "display:none;"
}
const haveInitMes = ref(false)
const newPlayerName = ref("") 
const setMes = ref(()=>{
    console.log("触发了登陆数据导入")
    const setting = document.getElementById("settingClick")
    // console.log(setting)
    // this.logError("请选择导入的数据文件！", that)
    setting.onchange = (e) => {
        console.log("触发了setting的修改事件")
        // const textData = e.target.result
        // console.log(textData, e, e.target)
        const file = e.target.files[0];
        // console.log(file)
        var reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
            console.log("读取文件信息加载完毕")
            const content = reader.result
            allMes.value = JSON.parse(content)
            store.commit("hajimiReset/setAllMes",allMes.value)
            store.commit("hajimiReset/setTipList",["导入成功"])
            initMes(JSON.parse(content))
        }
    }

    setTimeout(() => {
        setting.click()
    }, 300)
})
const initMes = (mes) => {
    console.log("初始化登陆数据",mes)
    // store.commit("hajimiReset/setAllMes",mes)
    haveInitMes.value = true
    pending.value = false
}
const changePage = (title) => {
    if(!allMes.value?.playerMes){
        store.commit("hajimiReset/setTipList",["请先登陆"])
        return
    }
  if (title === '战斗') {
    router.push('/hajimiReset/fight')
  } else if (title === '家园') {
    router.push('/hajimiReset/hometown')
  } else if (title === '设置') {
    // 如果有设置页面
    // router.push('/hajimiReset/settings')
    console.log('设置页面尚未实现')
  } else if (title === '商店') {
    router.push('/hajimiReset/shop')
  }
}
const loginTest = () =>{
    allMes.value = basicSetting.getTestSetting()
    store.commit("hajimiReset/setAllMes",allMes.value)
    initMes(basicSetting.getTestSetting())
}
const register = () =>{
    if(newPlayerName.value === ""){
        store.commit("hajimiReset/setTipList",["请输入用户名"])
        return
    }
    allMes.value.playerMes = basicSetting.getBasicPlayerMes(newPlayerName.value)
    store.commit("hajimiReset/setAllMes",allMes.value)
    store.commit("hajimiReset/setTipList",["注册成功"])
    pending.value = false
}
const exportMes = () =>{
    if(!allMes.value?.playerMes){
        store.commit("hajimiReset/setTipList",["请先登陆"])
        return
    }
    const playerName = allMes.value.playerMes.name
    const json = allMes.value
    console.log(json instanceof Object)
    const jsonStr = (json instanceof Object) ? JSON.stringify(json, null, 4) : json;
    const url = window.URL || window.webkitURL || window;
    const blob = new Blob([jsonStr]);
    const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    saveLink.href = url.createObjectURL(blob);
    saveLink.download = "耄耋精灵-"+ playerName + "-存档.json";
    saveLink.click();
}
</script>

<template lang="pug">
.navigation-block
    .navigation-test(@click="loginTest()") 模拟登陆
    .navigation-player-block
        .navigation-player-name(v-if="haveInitMes" @click="exportMes()") {{allMes?.playerMes?.name}} 导出存档
        .navigation-login(v-if="!haveInitMes" @click="pending = true") 登陆/注册
    .navigation-title-block
        .navigation-title(v-for="title in titleList" :key="title" 
        @mouseenter="changeTitle(title)" @mouseleave="changeTitle('')"
        @click="changePage(title)") {{title}}
    .navigation-version V - {{allMes?.version}}
    .navigation-icon(:style="getIconStyle()")
    .navigation-pending-block(v-if="pending")
        .navigation-pending(@click="pending = false")
            .navigation-dialog-block(@click.stop="")
                .navigation-dialog-img
                .navigation-dialog-text-block
                    .navigation-dialog-text(@click="setMes()") 登陆
                    .navigation-dialog-tip 点击导入信息文件
                    input(class="navigation-dialog-input" v-model="newPlayerName" placeholder="注册用户名")
                    .navigation-dialog-text(@click="register()") 注册
                input(class="setting-click" id="settingClick" type="file")
</template>
<style scoped lang="scss">
.navigation-block{
    width: 100%;
    height: 100%;
    position: relative;
    .navigation-test{
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 12px;
        color: #ee33ff;
        cursor: pointer;
    }
    .navigation-player-block{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
        color: #ee33ff;
        cursor: pointer;
    }
    .navigation-title-block{
        width: 200px;
        position: absolute;
        top: 80px;
        left: 100px;
        .navigation-title{
            font-size: 20px;
            color: #999;
            padding: 10px 0;
            letter-spacing: 10px;
            width: 100px;
        }
        .navigation-title:hover{
            color: #aaa;
            cursor: pointer;
            border-bottom: 1px solid #999;
        }
    }
    .navigation-version{
        position: absolute;
        bottom: 16px;
        right: 20px;
        font-size: 16px;
        color: #999;
    }
    .navigation-icon{
        width: 24px;
        height: 24px;
        background-image: url("../img/header.png");
        background-size: 100% 100%;
    }
    .navigation-pending-block{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 10;
        .navigation-pending{
            width: 100%;
            height: 100%;
            position: relative;
            .navigation-dialog-block{
                width: 300px;
                height: 240px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                border: 1px solid #fff;
                border-radius: 10px;
                background-color: #222;
                overflow: hidden;
                .navigation-dialog-img{
                    width: 120px;
                    height: 300px;
                    position: absolute;
                    top: -30px;
                    left: 0px;
                    background-image: url("../img/摇摆猫咪.gif");
                    background-size: 100% 100%;
                }
                .navigation-dialog-text-block{
                    width: 180px;
                    margin-left: 120px;
                    height: 240px;
                    padding: 10px;
                    padding-left: 20px;
                    padding-top: 30px;
                    box-sizing: border-box;
                    .navigation-dialog-tip{
                        font-size: 10px;
                        color: #ddd;
                        padding: 4px 0px;
                        width: 120px;
                        cursor: text;
                    }
                    .navigation-dialog-text{
                        font-size: 12px;
                        color: #eee;
                        padding: 4px 20px;
                        width: 40px;
                        cursor: pointer;
                        text-align: center;
                        background-color: #500a92;
                        border: 1px solid #ee33ff;
                        border-radius: 4px;
                    }
                    .navigation-dialog-input{
                        outline: none;
                        font-size: 12px;
                        color: #fff;
                        padding: 4px 20px;
                        width: 100px;
                        cursor: text;
                        text-align: center;
                        background-color: #500a92;
                        border: 1px solid #ee33ff;
                        border-radius: 4px;
                        margin: 10px 0;
                        margin-top: 50px;
                    }
                }
                .setting-click{
                    display: block;
                    opacity: 0;
                    height: 1px;
                    width: 1px;
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    padding: 0px;
                    margin: 0px;
                    border: none;
                }
            }
        }
    }
}
</style>