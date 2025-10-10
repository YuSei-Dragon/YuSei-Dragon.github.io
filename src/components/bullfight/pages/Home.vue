<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
const NewPage = defineAsyncComponent(() =>
  import("./HomeComponents/newPage.vue")
)
const pageName = ref("home")
const backHome = ()=>{
    pageName.value = "home"
    console.log('返回')
}
const setPageName = (name)=>{
    pageName.value = name
}
const bullFightTip = computed(() => {
    return store.state.bullFightTip
})
watch(bullFightTip, (newValue, oldValue) => {
 console.log("===================>监听到了提示文字变化")
 if(newValue===""){
    //如果是初始化的“”，就不管他
 }else{
    showTipMes(newValue)
 }
}, { immediate: true, deep: true })
const showTipText = ref("")
const isShowTip = ref(false)
const showTipMes = (data)=>{
    showTipText.value = data
    isShowTip.value = true
    setTimeout(()=>{
        isShowTip.value = false
        showTipText.value = ""
        store.commit("setBullFightTip","")
    },2000)
}
const playerMes = ref({})//当前玩家的所有信息
const setPlayMes = (data)=>{
    playerMes.value = data
}

</script>
<template lang="pug">
.all-block
    
    .main-block()
        .div(style="width:100%; height: 100%;")
            .battlefield-tip( :style="isShowTip?'top:0px;':'top:-36px;'") {{showTipText}}
            .home-back-block(v-show="pageName==='home'")
                .home-back
                .home-title-one 梦想 成为
                .home-title-two 哈基米训练家
                .home-new.home-button(@click="pageName='new'") 新建存档
                .home-load.home-button(@click="pageName='load'") 加载存档
                .home-version V1.1
            .home-back-block(v-show="pageName==='new'")
                NewPage(@backHome="backHome" @setPageName="setPageName" @setPlayMes="setPlayMes")

            .home-back-block(v-show="pageName==='playerHome'")

</template>
<style scoped lang="scss">
.all-block{
    width: 100wh;
    height: 100vh;
    position: relative;
}
.battlefield-tip{
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-indent: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    background-color: #fff;
    transition: 0.3s;
    text-align: left;
    font-size: 14px;
    color: #999;
}
.main-block{
    background: #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    width:500px;
    height: 400px;
    opacity:0.3;
}
.main-block:hover{
    opacity: 1;
}
.home-back-block{
    width:100%;
    height: 100%;
    position: relative;
    .home-title-one{
        padding-left: 20px;
        padding-top: 20px;
        font-size: 14px;
        color: #666;
    }
    .home-title-two{
        padding-left: 20px;
        font-size: 16px;
        color: #666;
    }
    .home-back{
        width:100px;
        height: 100px;
        position: absolute;
        top: 100px;
        left: 200px;
        background: url("../img/head.jpg");
        background-size: 100% 100%;
        // opacity: 0.5;
        border-radius: 50%;
        overflow: hidden;
    }
    .home-new{
        position: absolute;
        top: 150px;
        left: 20px;
    }
    .home-load{
        position: absolute;
        top: 150px;
        right: 20px;
    }
    .home-button{
        font-size: 20px;
        width: 150px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-radius: 6px;
        border: 1px #999 solid;
        color: #666;
        letter-spacing: 6px;
        cursor: pointer;
    }
    .home-button:hover{
        color: #fff;
        background: #999;
    }
    .home-version{
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 14px;
    }
}
</style>