<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
import commonFuction from "./commonFuction.js"

onMounted(()=>{
  init()
})
const AimPosition = ref({
    top:0,
    left:0,
})
const TestPosition = ref({
    top:0,
    left:0,
})
const AllBlockRef = ref(null)
const stopClick = ref(false)
const init = ()=>{
    console.log("init方法")
    AimPosition.value = {
        top:190,
        left:240,
    }//设置中心点位置
    AllBlockRef.value.addEventListener("click",(e)=>{
        const x = e.clientX
        const y = e.clientY
        // console.log(x,y)
        initTest(x,y)
        stopClick.value = true
        commonFuction.waitToDo(300,()=>{
            stopClick.value = false
            startFind()//无城墙算法
        })
    })
}
const initTest = (x,y)=>{
    TestPosition.value = {
        top: y-540,
        left:x
    }
}
const startFind = ()=>{
    const height = Math.abs(TestPosition.value.top-AimPosition.value.top) - 20
    const width = Math.abs(TestPosition.value.left-AimPosition.value.left) - 20
    //高度和水平距离的绝对值,减去双方半径之和
    const heightAbs = TestPosition.value.top>AimPosition.value.top?true:false
    const widthAbs = TestPosition.value.left>AimPosition.value.left?true:false
    // console.log(width,height)
    findFor(width,height,widthAbs,heightAbs)
}//无城墙条件下的索敌逻辑
const findFor = (width,height,widthAbs,heightAbs)=>{
    if(stopClick.value){
        return
    }
    if(width>0||height>0){
        if(width>height){
            if(width<20){
                if(widthAbs){
                    TestPosition.value.left -= width
                }else{
                    TestPosition.value.left += width
                }
                width = 0
                return commonFuction.waitToDo(300,()=>{findFor(width,height,widthAbs,heightAbs)})
            }else{
                if(widthAbs){
                    TestPosition.value.left -= 20
                }else{
                    TestPosition.value.left += 20
                }
                width -= 20
                return commonFuction.waitToDo(300, ()=>{findFor(width,height,widthAbs,heightAbs)})
            }
        }else{
            if(height<20){
                if(heightAbs){
                    TestPosition.value.top -= height
                }else{
                    TestPosition.value.top += height
                }
                height = 0
                return commonFuction.waitToDo(300, ()=>{findFor(width,height,widthAbs,heightAbs)})
            }else{
                if(heightAbs){
                    TestPosition.value.top -= 20
                }else{
                    TestPosition.value.top += 20
                }
                height -= 20
                return commonFuction.waitToDo(300, ()=>{findFor(width,height,widthAbs,heightAbs)})
            }
        }
    }else{
        return
    }
}//寻路逻辑代码
const getAimStyle = ()=>{
    let result = "top:" + AimPosition.value.top + "px;left:" + AimPosition.value.left + "px;"
    console.log(result)
    return result
}
const getTestStyle = ()=>{
    let result = "top:" + TestPosition.value.top + "px;left:" + TestPosition.value.left + "px;"
    console.log(result)
    return result
}
</script>
<template lang="pug">
.back-block(ref="AllBlockRef")
    .aim-block(:style="getAimStyle()")
    .test-block(:style="getTestStyle()")
</template>
<style scoped lang="scss">
.back-block{
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px #eee solid;
}
.aim-block{
    width: 20px;
    height: 20px;
    background: #eee;
    position: absolute;
    z-index: 10;
}
.test-block{
    width: 20px;
    height: 20px;
    background: #eee;
    position: absolute;
    z-index: 10;
    transition: 0.3s;
}
</style>