<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
import commonFuction from "../commonFuction.js"
const props = defineProps({
    size:{
        type:Number,
        default:10
    }
})
onMounted(()=>{
  init()
})
const init = ()=>{
    initLine()
    initMap()
}
const initLine = ()=>{
    mapLine.value = []
    for(let i=1;i<props.size ;i++){
        mapLine.value.push(
            {x:40*i,y:0,height:40*props.size,width:1},
        )
        mapLine.value.push(
            {x:0,y:40*i,height:1,width:40*props.size},
        )
    }
    // mapLine.value = [
    //     {x:10,y:0,height:400,width:1},
    //     {x:20,y:0,height:400,width:1},
    //     {x:30,y:0,height:400,width:1},
    //     {x:40,y:0,height:400,width:1},
    //     {x:50,y:0,height:400,width:1},
    //     {x:60,y:0,height:400,width:1},
    //     {x:70,y:0,height:400,width:1},
    //     {x:80,y:0,height:400,width:1},
    //     {x:90,y:0,height:400,width:1},

    //     {x:0,y:10,height:1,width:400},
    //     {x:0,y:20,height:1,width:400},
    //     {x:0,y:30,height:1,width:400},
    //     {x:0,y:40,height:1,width:400},
    //     {x:0,y:50,height:1,width:400},
    //     {x:0,y:60,height:1,width:400},
    //     {x:0,y:70,height:1,width:400},
    //     {x:0,y:80,height:1,width:400},
    //     {x:0,y:90,height:1,width:400},
    // ]//初始化地图line
}//初始化线条
const mapLine = ref([])
const initMap = ()=>{
    mapCoordinate.value = []
    for(let i =0 ;i<props.size;i++){
        let list = []
        for(let i1 =0 ;i1<props.size;i1++){
            list.push(1)
        }
        mapCoordinate.value.push(list)
    }
}//初始化10*10的坐标轴
const getLineStyle = (lineItem)=>{
    let res = ""
    res += "top:" + lineItem.y + "px;"
    res += "left:" + lineItem.x + "px;"
    res += "height:" + lineItem.height + "px;"
    res += "width:" + lineItem.width + "px;"
    res += "background:#eee;"
    return res
}//设置背景线
const mapCoordinate = ref([])
const getBackStyle = ()=>{
    let res = ""
    // res+="width:" + props.size*40 + "px;"
    // res+="height" + props.size*40 + "px;"
    // console.log(res)
    return res
}
</script>
<template lang="pug">
.back-block(ref="AllBlockRef" :style="getBackStyle()")
    .line-for(:style="getLineStyle(lineItem)" v-for="lineItem in mapLine")
</template>
<style scoped lang="scss">
.back-block{
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px #eee solid;
}
.line-for{
    position: absolute;
}

</style>
