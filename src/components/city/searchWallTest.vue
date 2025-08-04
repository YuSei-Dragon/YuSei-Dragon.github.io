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
const init = ()=>{
    initLine()
    initMap()
    //初始化目标地图
    initWall()
    //初始化城墙
    // console.log(mapCoordinate.value)
    initAimAndStart()
    //初始化目标并开始
    console.log(mapCoordinate.value)
    startSearch()
}
const initLine = ()=>{
    mapLine.value = [
        {x:10,y:0,height:400,width:1},
        {x:20,y:0,height:400,width:1},
        {x:30,y:0,height:400,width:1},
        {x:40,y:0,height:400,width:1},
        {x:50,y:0,height:400,width:1},
        {x:60,y:0,height:400,width:1},
        {x:70,y:0,height:400,width:1},
        {x:80,y:0,height:400,width:1},
        {x:90,y:0,height:400,width:1},

        {x:0,y:10,height:1,width:400},
        {x:0,y:20,height:1,width:400},
        {x:0,y:30,height:1,width:400},
        {x:0,y:40,height:1,width:400},
        {x:0,y:50,height:1,width:400},
        {x:0,y:60,height:1,width:400},
        {x:0,y:70,height:1,width:400},
        {x:0,y:80,height:1,width:400},
        {x:0,y:90,height:1,width:400},
    ]//初始化地图line
}
const mapLine = ref([])
const getLineStyle = (lineItem)=>{
    let res = ""
    res += "top:" + lineItem.y*4 + "px;"
    res += "left:" + lineItem.x*4 + "px;"
    res += "height:" + lineItem.height + "px;"
    res += "width:" + lineItem.width + "px;"
    res += "background:#eee;"
    return res
}//设置背景线
const mapCoordinate = ref([])
const initMap = ()=>{
    mapCoordinate.value = []
    for(let i =0 ;i<10;i++){
        let list = []
        for(let i1 =0 ;i1<10;i1++){
            list.push(1)
        }
        mapCoordinate.value.push(list)
    }
}//初始化10*10的坐标轴
const wallList = ref([])
const initWall = ()=>{
    //城墙权重暂定为8，超出8步绕路则直接挖城墙
    // mapCoordinate
    wallList.value = [
        {x:3,y:3},
        {x:3,y:4},
        {x:3,y:5},
        {x:3,y:6},
        {x:3,y:7},

        {x:4,y:3},
        {x:5,y:3},
        {x:6,y:3},
        {x:7,y:3},

        {x:4,y:7},
        {x:5,y:7},
        {x:6,y:7},

        {x:7,y:4},
        {x:7,y:5},
        {x:7,y:6},
        {x:7,y:7},
    ]
    getWallLine()
    wallList.value.forEach(wall=>{
        mapCoordinate.value[wall.x][wall.y] = 8
    })

}//初始化城墙
const getWallBlockStyle = (wall)=>{
    let res = ""
    res+="top:" + wall.y*40 + "px;"
    res+="left:" + wall.x*40 + "px;"
    res+="width:4px;height:4px;background:#ddd;"
    return res
}
const getWallLineList = ref([])
const getWallLine = ()=>{
    wallList.value.forEach((wallLine,index)=>{
        wallList.value.forEach((wallLine1,index1)=>{
            let res = ""    
            if(index1>index){
                const isCloseRes = isClose(wallLine,wallLine1)
                if(isCloseRes.type=="width"){
                    res+="top:" + isCloseRes.position.y*40 + "px;"
                    res+="left:" + isCloseRes.position.x*40 + "px;"
                    res+= "width:40px;height:4px;background:#ddd;"
                    // console.log(res)
                    getWallLineList.value.push(res)
                }
                if(isCloseRes.type=="height"){
                    res+="top:" + isCloseRes.position.y*40 + "px;"
                    res+="left:" + isCloseRes.position.x*40 + "px;"
                    res+= "width:4px;height:40px;background:#ddd;"
                    // console.log(res)
                    getWallLineList.value.push(res)
                }
            }
        })
    })
}//获取城墙描线
const getWallLineStyle = (wall)=>{
    return wall
}
const isClose = (data1,data2)=>{
    if(Math.abs(data1.x-data2.x)==1&&data1.y==data2.y){
        let res = {
            type:"width"
        }
        if(data1.x>data2.x){
            res.position = data2
        }
        res.position = data1
        return  res
    }else if(Math.abs(data1.y-data2.y)==1&&data1.x==data2.x){
        let res = {
            type:"height"
        }
        if(data1.y>data2.y){
            res.position = data2
        }
        res.position = data1
        return res
    }return {
        type:"no"
    }
}//检测是否相邻
const AimPosition = ref({
    x:0,y:0,width:0,height:0
})
const startPosition = ref({
    x:0,y:0,num:0,route:[]
})
const initAimAndStart = ()=>{
    //设置目标位置
    AimPosition.value = {
        x:4,y:4,width:2,height:2
    }
    for(let i = 0;i<AimPosition.value.width;i++){
        for(let i1 = 0;i1<AimPosition.value.height;i1++){
            mapCoordinate.value[AimPosition.value.x+i][AimPosition.value.y+i1] = -1
        }
    }//设置目的地 -1表示到达目的地
    startPosition.value.x = 0
    startPosition.value.y = 0
    startPosition.value.num = 100
}
const getAimStyle = ()=>{
    let res = ""
    res += "top:" + AimPosition.value.y*40 + "px;"
    res += "left:" + AimPosition.value.x*40 + "px;"
    res += "height:" + AimPosition.value.height*40 + "px;"
    res += "width:" + AimPosition.value.width*40 + "px;"
    res += "background:#ddd;opacity:0.5;"
    return res
}
const startSearch = ()=>{
    initSearchMap()
    //初始化地图
    searchMao.value[startPosition.value.x][startPosition.value.y] = 0
    //定位初始化位置
    search(startPosition.value)
    //开始执行寻路逻辑
    console.log(startPosition.value)
}
const searchMao = ref([])
const initSearchMap = ()=>{
    searchMao.value = []
    for(let i =0 ;i<10;i++){
        let list = []
        for(let i1 =0 ;i1<10;i1++){
            list.push(-1)//-1表示没有走到过这里
        }
        searchMao.value.push(list)
    }
}//初始化10*10的结果坐标轴
const search = (ob1)=>{
    if(ob1.x>0&&ob1.x<9){
        let ob = {
            x:ob1.x,
            y:ob1.y,
            long:ob1?.long?ob1.long:0,
            route:ob1?.route?[...ob1.route]:[]
        }
        //如果可以左移
        if(searchMao.value[ob.x-1][ob.y]==-1||searchMao.value[ob.x-1][ob.y]>ob.long+mapCoordinate.value[ob.x-1][ob.y]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x-1][ob.y] = ob.long+mapCoordinate.value[ob.x-1][ob.y]
            ob.long = searchMao.value[ob.x-1][ob.y]
            ob.x = ob.x-1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
        //右移
        if(searchMao.value[ob.x+1][ob.y]==-1||searchMao.value[ob.x+1][ob.y]>ob.long+mapCoordinate.value[ob.x+1][ob.y]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x+1][ob.y] = ob.long+mapCoordinate.value[ob.x+1][ob.y]
            ob.long = searchMao.value[ob.x+1][ob.y]
            ob.x = ob.x+1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
    }else if(ob1.x==0){
        let ob = {
            x:ob1.x,
            y:ob1.y,
            long:ob1?.long?ob1.long:0,
            route:ob1?.route?[...ob1.route]:[]
        }
        //右移
        if(searchMao.value[ob.x+1][ob.y]==-1||searchMao.value[ob.x+1][ob.y]>ob.long+mapCoordinate.value[ob.x+1][ob.y]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x+1][ob.y] = ob.long+mapCoordinate.value[ob.x+1][ob.y]
            ob.long = searchMao.value[ob.x+1][ob.y]
            ob.x = ob.x+1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
    }else if (ob1.x==9){
        let ob = {
            x:ob1.x,
            y:ob1.y,
            long:ob1?.long?ob1.long:0,
            route:ob1?.route?[...ob1.route]:[]
        }
        //如果可以左移
        if(searchMao.value[ob.x-1][ob.y]==-1||searchMao.value[ob.x-1][ob.y]>ob.long+mapCoordinate.value[ob.x-1][ob.y]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x-1][ob.y] = ob.long+mapCoordinate.value[ob.x-1][ob.y]
            ob.long = searchMao.value[ob.x-1][ob.y]
            ob.x = ob.x-1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
    }
    if(ob1.y>0&&ob1.y<9){
        let ob = {
            x:ob1.x,
            y:ob1.y,
            long:ob1?.long?ob1.long:0,
            route:ob1?.route?[...ob1.route]:[]
        }
        //如果可以上移
        if(searchMao.value[ob.x][ob.y-1]==-1||searchMao.value[ob.x][ob.y-1]>ob.long+mapCoordinate.value[ob.x][ob.y-1]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x][ob.y-1] = ob.long+mapCoordinate.value[ob.x][ob.y-1]
            ob.long = searchMao.value[ob.x][ob.y-1]
            ob.y = ob.y-1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
        //下移
        if(searchMao.value[ob.x][ob.y+1]==-1||searchMao.value[ob.x][ob.y+1]>ob.long+mapCoordinate.value[ob.x][ob.y+1]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x][ob.y+1] = ob.long+mapCoordinate.value[ob.x][ob.y+1]
            ob.long = searchMao.value[ob.x][ob.y+1]
            ob.y = ob.y+1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
    }else if(ob1.y==0){
        let ob = {
            x:ob1.x,
            y:ob1.y,
            long:ob1?.long?ob1.long:0,
            route:ob1?.route?[...ob1.route]:[]
        }
        //下移
        if(searchMao.value[ob.x][ob.y+1]==-1||searchMao.value[ob.x][ob.y+1]>ob.long+mapCoordinate.value[ob.x][ob.y+1]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x][ob.y+1] = ob.long+mapCoordinate.value[ob.x][ob.y+1]
            ob.long = searchMao.value[ob.x][ob.y+1]
            ob.y = ob.y+1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
    }else if(ob1.y==9){
        let ob = {
            x:ob1.x,
            y:ob1.y,
            long:ob1?.long?ob1.long:0,
            route:ob1?.route?[...ob1.route]:[]
        }
        //如果可以上移
        if(searchMao.value[ob.x][ob.y-1]==-1||searchMao.value[ob.x][ob.y-1]>ob.long+mapCoordinate.value[ob.x][ob.y-1]){
            //如果满足-1（没有到达过）或者当前走法比现有的走法更短
            searchMao.value[ob.x][ob.y-1] = ob.long+mapCoordinate.value[ob.x][ob.y-1]
            ob.long = searchMao.value[ob.x][ob.y-1]
            ob.y = ob.y-1
            ob.route.push({x:ob.x,y:ob.y})
            // console.log(ob)
            if(mapCoordinate.value[ob.x][ob.y] == -1){
                //如果到达了目的地
                if(ob.long + 2<startPosition.value.num){
                    startPosition.value.num = ob.long + 2
                    startPosition.value.route = ob.route
                }
                console.log(ob)
            }else{
                search(ob)
            }
        }
    }
}//自动寻路逻辑
</script>
<template lang="pug">
.back-block(ref="AllBlockRef")
    .line-for(:style="getLineStyle(lineItem)" v-for="lineItem in mapLine")
    .aim-block(:style="getAimStyle()")
    .wall-block(v-for="wall in wallList" :style="getWallBlockStyle(wall)")
    .wall-line(v-for="wallLine in getWallLineList" :style="getWallLineStyle(wallLine)")
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
.aim-block{
    position: absolute;
}
.wall-block{
    position: absolute;
}
.wall-line{
    position: absolute;
}
</style>