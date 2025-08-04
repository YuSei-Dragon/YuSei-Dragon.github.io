<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
const something = ref()
const handleMouseOver = ()=>{

}
const getBackgroundStyle = ()=>{

}
const handleMouseOut = ()=>{

}
const page = ref("index")
const newOne = ()=>{
  page.value = "newOne"
}
const NewOne = defineAsyncComponent(() =>
  import("./NewOne.vue")
)
const fileImport = defineAsyncComponent(()=>
  import("./ImportFile.vue")
)
const Menu = defineAsyncComponent(()=>
  import("./menu.vue")
)
const backToIndex = ()=>{
  page.value = "index"
}
const newOneAccount = (data)=>{
  console.log("建立了一个新的账号" + data)
  playerName.value = data
  PageToMenu()
}
const PageToMenu = ()=>{
  page.value = "menu"
}
const getSetUpText = ()=>{
  if(playerName.value==""){
    return "未登录"
  }else{
    return "已登录"
  }
}
const output = ()=>{
  console.log("导出存档")
  let json = {
    name: playerName.value,

  }
  console.log(json instanceof Object)
  const jsonStr = (json instanceof Object) ? JSON.stringify(json, null, 4) : json;
  const url = window.URL || window.webkitURL || window;
  const blob = new Blob([jsonStr]);
  const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  saveLink.href = url.createObjectURL(blob);
  saveLink.download = "钓鱼手高-"+ playerName.value + "-存档";
  saveLink.click();
}
const playerName = ref("")
const toImportFile = ()=>{
  page.value = "importFile"
}
const tipText = ref("")
const isShowTopTipBack = ref(false)
const isShowTopTipBackSty = ref(false)
const isShowTopTipBlock = ref(false)
const isShowTopTipBlockSty = ref(false)
const tipColor = ref("")
const getTopTipBackStyle = ()=>{
  if(isShowTopTipBackSty.value){
    return "opacity: 1;"
  }else{
    return "opacity: 0;"
  }
}
const getTopTipBlockStyle = ()=>{
  let result = ""
  if(isShowTopTipBlockSty.value){
    result+= "top:4px;"
  }else{
    result+= "top:-100px;"
  }
  result+="background:"+tipColor.value+";"
  console.log(result)
  return result
}
const showTip =(data)=>{
  console.log(data)
  tipText.value = data.text
  if(data.type=="success"){
    tipColor.value = "#20c900"
  }else if(data.type=="warning"){
    tipColor.value = "#ffb300"
  }else if(data.type=="fail"){
    tipColor.value = "#ff2424"
  }
  isShowTopTipBack.value = true
  setTimeout(()=>{
    isShowTopTipBackSty.value = true
    //展示背景
    setTimeout(() => {
      isShowTopTipBlock.value = true
      setTimeout(() => {
      isShowTopTipBlockSty.value = true
        //展示提示框
        setTimeout(()=>{
          isShowTopTipBackSty.value = false
          //隐藏背景
          setTimeout(()=>{
            isShowTopTipBack.value = false
            //关闭背景
            setTimeout(()=>{
              isShowTopTipBlockSty.value = false
              //收起提示框
              setTimeout(()=>{
                isShowTopTipBlock.value = false
              },300)
            },1000)
          },300)
        },1000)
      },50 )
    },50 )
  },50)
}//提示框方法
const playAccountMes = ref({})
const setAccountMes = (text)=>{
  const textJson = eval("("+ text +")")
  console.log(textJson)
  playerName.value = textJson.name
  PageToMenu()
}
</script>
<template lang="pug">
  .all-back
    .background(@mouseover="handleMouseOver" @mouseout="handleMouseOut" :style="getBackgroundStyle()")
      .bg
        .buttons-block(v-if="page=='index'")
          .new-block(@click="newOne()") 新建存档
          .old-block(@click="toImportFile()") 导入存档
        .new-one-block(v-if="page=='newOne'")
          NewOne(@PageToIndex="backToIndex()" @newOneAccount="newOneAccount" @PageToMenu="PageToMenu()")
        .new-one-block(v-if="page=='importFile'")
          fileImport(@showTip="showTip" @setAccountMes="setAccountMes")
        .new-one-block(v-if="page=='menu'")
          Menu(:playerName="playerName")
        .setup-block() {{getSetUpText()}}
        .setup-out-block(v-if="playerName!=''" @click="output()")
          .setup-out-img()
          .setup-out 导出存档
        .setup-name() {{playerName}}
        .circle-breath
        .circle-breath1
        .circle-breath2
        .title 钓鱼 手高
        .top-tip-back(v-if="isShowTopTipBack" :style="getTopTipBackStyle()")
        .top-tip-block(v-if="isShowTopTipBlock" :style="getTopTipBlockStyle()")
            .top-tip-text {{tipText}}
        
</template>
<style scoped lang="scss">
.all-back{
  width: 100%;
  height: 930px;
  padding-top: 530px;
}
.background{
  width:500px;
  height: 400px;
  // height: 930px;
  border: 1px #eee solid;
  background: #d7d6e3;
  position:relative;
  overflow: hidden;
  // padding-top: 530px;
  .bg{
    height: 100%;
    width: 100%;
    background: linear-gradient(-45deg, rgba(221, 170, 238, 0.1), rgba(255, 102, 102, 0.1), rgba(51, 204, 153, 0.1), rgba(0, 153, 255, 0.1), rgba(102, 102, 255, 0.1));
    background-size: 200% 200%;
    animation: gradient 8s ease infinite;
    position: relative;
    .buttons-block{
      position: absolute;
      top: 150px;
      left: 0;
      width:100%;
      text-align: center;
      z-index: 10;
      .new-block{
        width: 100px;
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        color: #fff;
        margin: 0 auto;
      }
      .new-block:hover{
        border-left: 1px #fff solid;
        border-right: 1px #fff solid;
        color: #eee;
        cursor:pointer;
      }
      .old-block{
        width: 100px;
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        color: #fff;
        margin: 0 auto;
        margin-top: 10px;
      }
      .old-block:hover{
        border-left: 1px #fff solid;
        border-right: 1px #fff solid;
        color: #eee;
        cursor: pointer;
      }
    }
    .title{
      position: absolute;
      top: 100px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 100px;
      color: #eeeeee26;
      z-index: 1;
    }
    .circle-breath {
        background: rgba(255, 192, 203, 0);
        box-shadow: 0 0 0 0 rgba(204, 73, 152, 0.153);
        height: 50px;
        width: 50px;
        border-radius: 50%;
        animation: donghua 3s infinite;
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 2;
    }
    @keyframes donghua {
        0% {
            transform: scale(0.60);
            /* 注意rgba中的a的设置 */
            box-shadow: 0 0 0 0 rgba(204, 73, 152, 20%);
        }

        60% {
            transform: scale(1);
            box-shadow: 0 0 0 36px rgba(204, 73, 152, 0%);
        }

        100% {
            transform: scale(0.60);
            box-shadow: 0 0 0 0 rgba(204, 73, 152, 0%);
        }
    }
    .circle-breath1 {
        background: rgba(255, 192, 203, 0);
        box-shadow: 0 0 0 0 rgba(204, 73, 152, 0.153);
        height: 50px;
        width: 50px;
        border-radius: 50%;
        animation: donghua1 4s infinite;
        position: absolute;
        top: 160px;
        left: 200px;
        z-index: 2;
    }
    @keyframes donghua1 {
        0% {
            transform: scale(0.60);
            /* 注意rgba中的a的设置 */
            box-shadow: 0 0 0 0 rgba(73, 132, 204, 0.2);
        }
        20% {
            transform: scale(1);
            box-shadow: 0 0 0 36px rgba(73, 132, 204, 0%);
        }
        50% {
            transform: scale(0.60);
            /* 注意rgba中的a的设置 */
            box-shadow: 0 0 0 0 rgba(73, 132, 204, 0%);
        }
        70% {
            transform: scale(1);
            box-shadow: 0 0 0 36px rgba(73, 132, 204, 0%);
        }
        100% {
            transform: scale(0.60);
            box-shadow: 0 0 0 0 rgba(73, 132, 204, 0%);
        }
    }
    .circle-breath2 {
        background: rgba(255, 192, 203, 0);
        box-shadow: 0 0 0 0 rgba(204, 73, 152, 0.153);
        height: 50px;
        width: 50px;
        border-radius: 50%;
        animation: donghua2 5s infinite;
        position: absolute;
        top: 50px;
        right: 50px;
        z-index: 2;
    }
    @keyframes donghua2 {
        0% {
            transform: scale(0.60);
            box-shadow: 0 0 0 0 rgba(73, 197, 204, 0);
        }
        20% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(147, 73, 204, 10%);
        }
        40% {
            transform: scale(0.60);
            box-shadow: 0 0 0 0 rgba(147, 73, 204, 0%);
        }
        60% {
            transform: scale(1);
            box-shadow: 0 0 0 36px rgba(147, 73, 204, 10%);
        }
        80% {
            transform: scale(0.60);
            box-shadow: 0 0 0 0 rgba(73, 141, 204, 0);
        }
        100% {
            transform: scale(0.6);
            box-shadow: 0 0 0 0 rgba(204, 73, 101, 0);
        }
    }
  }
  @keyframes gradient {
      0% {
          background-position: 0 12%;
      }

      50% {
          background-position: 100% 100%;
      }

      100% {
          background-position: 0 12%;
      }
  }
  .new-one-block{
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .setup-block{
    position: absolute;
    width: 60px;
    height: 30px;
    top: 4px;
    right: 4px;
    z-index: 3;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    border-radius: 16px;
    border: 1px #eee solid;
    color: #eee;
  }
  .setup-out-block{
    position: absolute;
    width: 60px;
    height: 24px;
    top: 44px;
    right: 4px;
    z-index: 3;
    border-radius: 10px;
    border: 1px #fff solid;
    cursor: pointer;
  }
  .setup-out-img{
    background: url("./img/导出.png") no-repeat;
    background-size: 100% 100%;
    width: 12px;
    height: 12px;
    margin: 0 2px;
    margin-top: 5px;
    float: left;
  }
  .setup-out{
    line-height: 24px;
    font-size: 10px;
    float: left;
    color: #fff;
  }
  .setup-name{
    position: absolute;
    z-index: 3;
    top: 4px;
    right: 74px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #eee;
  }
  .top-tip-back{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    background: rgb(107 107 107 / 30%);
    opacity: 0;
    z-index: 99;
  }
  .top-tip-block{
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      margin: 4px auto;
      height: auto;
      background: #eee;
      border-radius: 4px;
      border: 1px #fff solid;
      padding-top: 2px;
      transition: 0.3s;
      z-index: 100;
      .top-tip-text{
        text-align: center;
        font-size: 14px;
        color: #6b0000;
        // text-shadow: 1px 1px #8c8c8c;
        padding: 4px;
        transition: 0.3s;
      }
    }
}

</style>