<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineEmits
} from 'vue'
const something = ref()
const importTxt = ref(null)
const importBlock = ref(null)
const fileText = ref("")
const emit = defineEmits([ "showTip" ,"setAccountMes"])
const start = ref(false)
const startImport = ref(false)
onMounted(()=>{

  init()
})
// watch(fileText,(newVal,oldVal)=>{
//   if(newVal!=""){
//     console.log("读取存档成功！")
//   }else{
//     console.log("存档为空，请新建存档！")
//     emit("showTip")
//   }
// })
const getBorderStyle = ()=>{
  if(start.value){
    return "height:400px;width:500px;opacity: 0.2;"
  }else{
    return ""
  }
}
const init = ()=>{
  setTimeout(()=>{
    start.value = true
    setTimeout(()=>{
      startImport.value = true
      importTxt.value.addEventListener("dragenter",(e)=>{
        console.log("enter")
        e.preventDefault()
        e.stopPropagation()
      },false)
      importTxt.value.addEventListener("dragover",(e)=>{
        console.log("over")
        e.preventDefault()
        e.stopPropagation()
      },false)
      importTxt.value.addEventListener("dragleave",(e)=>{
        console.log("leave")
        e.preventDefault()
        e.stopPropagation()
      },false)
      importBlock.value.addEventListener("dragenter",(e)=>{
        console.log("enter")
        e.preventDefault()
        e.stopPropagation()
      },false)
      importBlock.value.addEventListener("dragover",(e)=>{
        console.log("over")
        e.preventDefault()
        e.stopPropagation()
      },false)
      importBlock.value.addEventListener("dragleave",(e)=>{
        console.log("leave")
        e.preventDefault()
        e.stopPropagation()
      },false)
      importTxt.value.addEventListener("drop",(e)=>{
        console.log("drop")
        e.preventDefault()
        e.stopPropagation()
        var df = e.dataTransfer;
        var dropFiles = []; // 拖拽的文件，会放到这里
        var dealFileCnt = 0; // 读取文件是个异步的过程，需要记录处理了多少个文件了
        var allFileLen = df.files.length; // 所有的文件的数量，给非Chrome浏览器使用的变量

        // 检测是否已经把所有的文件都遍历过了
        function checkDropFinish () {
            if ( dealFileCnt === allFileLen-1 ) {
                getDropFileCallBack(dropFiles);
            }
            dealFileCnt++;
        }

        if(df.items !== undefined){
            // Chrome拖拽文件逻辑
            for(var i = 0; i < df.items.length; i++) {
                var item = df.items[i];
                if(item.kind === "file" && item.webkitGetAsEntry().isFile) {
                    var file = item.getAsFile();
                    dropFiles.push(file);
                    var reader = new FileReader()
                    reader.readAsText(file,"UTF-8")
                    reader.onload = function(evt){
                      fileText.value = evt.target.result
                      if(fileText.value!=""){
                      console.log("读取存档成功！")
                      emit("setAccountMes",fileText.value)
                      }else{
                        console.log("存档为空，请新建存档！")
                        const data = {
                          type:"warning",
                          text:"存档为空，请新建存档！"
                        } 
                        emit("showTip",data)
                      }
                      // console.log(file)
                    }
                    
                }
            }
        } else {
            // 非Chrome拖拽文件逻辑
            for(var i = 0; i < allFileLen; i++) {
                var dropFile = df.files[i];
                if ( dropFile.type ) {
                    dropFiles.push(dropFile);
                    var reader = new FileReader()
                    reader.readAsText(dropFile,"UTF-8")
                    reader.onload = function(evt){
                      fileText.value = evt.target.result
                      if(fileText.value!=""){
                      console.log("读取存档成功！")
                      emit("setAccountMes",fileText.value)

                      }else{
                        console.log("存档为空，请新建存档！")
                        const data = {
                          type:"warning",
                          text:"存档为空，请新建存档！"
                        } 
                        emit("showTip",data)
                      }
                    }
                    checkDropFinish();
                } else {
                    try {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(dropFile.slice(0, 3));

                        fileReader.addEventListener('load', function (e) {
                            console.log(e, 'load');
                            dropFiles.push(dropFile);
                            var reader = new FileReader()
                            reader.readAsText(dropFile,"UTF-8")
                            reader.onload = function(evt){
                              fileText.value = evt.target.result
                              if(fileText.value!=""){
                              console.log("读取存档成功！")
                              emit("setAccountMes",fileText.value)
                            }else{
                              console.log("存档为空，请新建存档！")
                              const data = {
                                type:"warning",
                                text:"存档为空，请新建存档！"
                              } 
                              emit("showTip",data)
                            }
                            }
                            checkDropFinish();
                        }, false);

                        fileReader.addEventListener('error', function (e) {
                            console.log(e, 'error，不可以上传文件夹');
                            checkDropFinish();
                        }, false);

                    } catch (e) {
                        console.log(e, 'catch error，不可以上传文件夹');
                        checkDropFinish();
                    }
                }
            }
        }
      },false)
    },200)
  },200)
  console.log(importTxt.value)

}
const getDropFileCallBack = (dropFiles)=>{
    console.log(dropFiles, dropFiles.length);
}
const getImportBlockStyle = ()=>{
  if(startImport.value){
    return "opacity:1;"
  }else{
    return "opacity:0.2;"
  }
}
</script>
<template lang="pug">
.background(ref="importBlock")
  .border(:style="getBorderStyle()")
  .border1(:style="getBorderStyle()")
  .border2(:style="getBorderStyle()")
  .import-block(:style="getImportBlockStyle()") 
    .import(ref="importTxt") 拖放txt至此
</template>
<style scoped lang="scss">
.background{
  width:100%;
  height:100%;
  position: relative;
  .border{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    // color: #fff;
    border: 1px #fff solid;
    opacity: 0.8;
    transition: 0.5s;
  }
  .border1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    // color: #fff;
    border: 1px #fff solid;
    opacity: 0.8;
    transition: 0.6s;
  }
  .border2{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    // color: #fff;
    border: 1px #fff solid;
    opacity: 0.8;
    transition: 1s;
  }
  .import-block{
    position: absolute;
    top: 46%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    font-size: 18px;
    height: 100px;
    opacity: 0.2;
    transition: 0.2s;
    .import{
      height: 100%;
      width: 200px;
      background: #ffffffc4;
      border-radius: 9px;
      line-height: 100px;
      margin: 0 auto;
      font-size: 20px;
      color: #c7bdf0;
    }
    .import:hover{
      color: #e4e1f1;
    }
  }
}
</style>