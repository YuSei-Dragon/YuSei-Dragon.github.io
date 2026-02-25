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
  reactive,
  defineEmits
} from 'vue'
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import planetApi from './planet.js'
const router = useRouter()
const route = useRoute()
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const monsterShowList = ref([])
const props = defineProps({
    groundList:{
        type:Array,
        default:()=>[]
    },//传入的地区列表
})
const init = ()=>{
    
}
onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    // 数据本地化，方便后续使用
    init()
})
const getMonsterStyle = (position)=>{
    return {
        left: position.left+'px',
        top: position.top+'px',
    }
}
const moveMonster = ()=>{
    if(!moving.value){
        return
    }
    monsterShowList.value.map(monster=>{
         // 记录当前位置
        const currentLeft = monster.position.left||0;
        const currentTop = monster.position.top||0;
        // 随机决定移动方向
        const moveX = Math.random() > 0.5 ? 50 : -50;
        const moveY = Math.random() > 0.5 ? 50 : -50;
        // 计算新位置
        let newLeft = currentLeft + moveX;
        let newTop = currentTop + moveY;
        // 边界检查和处理
        // 左边界
        if (newLeft < 0) {
            newLeft = 0;
            // 如果在左边界，确保下一次移动是向右的
            monster.nextDirection = { x: 1, y: 0 };
        }
        // 右边界
        else if (newLeft > 470) {
            newLeft = 470;
            // 如果在右边界，确保下一次移动是向左的
            monster.nextDirection = { x: -1, y: 0 };
        }
        // 上边界
        if (newTop < 0) {
            newTop = 0;
            // 如果在上边界，确保下一次移动是向下的
            monster.nextDirection = { x: 0, y: 1 };
        }
        // 下边界
        else if (newTop > 270) {
            newTop = 270;
            // 如果在下边界，确保下一次移动是向上的
            monster.nextDirection = { x: 0, y: -1 };
        }
        // 角落特殊处理
        if ((newLeft === 0 && newTop === 0) || 
            (newLeft === 0 && newTop === 370) || 
            (newLeft === 470 && newTop === 0) || 
            (newLeft === 470 && newTop === 270)) {
            
            // 根据角落位置设置向内移动的方向
            if (newLeft === 0 && newTop === 0) {
                newLeft = 50;
                newTop = 50;
            } else if (newLeft === 470 && newTop === 0) {
                newLeft = 420;
                newTop = 50;
            } else if (newLeft === 0 && newTop === 270) {
                newLeft = 50;
                newTop = 220;
            } else if (newLeft === 470 && newTop === 270) {
                newLeft = 420;
                newTop = 220;
            }
        }
        // 如果有预设的下一个方向，使用它
        else if (monster.nextDirection) {
            newLeft = currentLeft + (monster.nextDirection.x * 50);
            newTop = currentTop + (monster.nextDirection.y * 50);
            
            // 使用预设方向后清除它
            monster.nextDirection = null;
            
            // 再次检查边界
            newLeft = Math.max(0, Math.min(470, newLeft));
            newTop = Math.max(0, Math.min(270, newTop));
        }
        // 更新位置
        if(monster.cantMove&&monster.cantMove===true){
            //如果不能移动，不更新位置
            // console.log("不能移动")
        }else{
            monster.position.left = newLeft;
            monster.position.top = newTop;
        }
        
    })
    setTimeout(()=>{
        moveMonster()
    },3000)
}//随机移动方法
const emit = defineEmits(['clickMonster'])
const isShowTip = ref(false)
const clickTipText = ref("")
const selectMonster = ref({})
const clickMonster = (monster)=>{
    if(monster?.showTip&&monster.showTip!==""){
        // store.commit("hajimiReset/setTipList",[monster.showTip])
        selectMonster.value = monster
        isShowTip.value = true
        clickTipText.value = monster.showTip
    }else{
        //点击精灵，进入野生精灵对战
        console.log(monster)
        allMes.value.wildMonster = monster
        store.commit("hajimiReset/setAllMes",allMes.value)
        router.push(`/hajimiReset/fight/ground?type=wildBattle&ground=${selectedScene.value}`)
    }
    
}
const selectedGround = ref("")
//大场景
const selectedScene = ref("")
//小区域
const getGroundBackground = ()=>{
    if(!selectedScene.value){
        return ""
    }
    let res = ""
    res+=`background:url(${require(`@/components/hajimiReset/pages/Planet/img/${selectedScene.value}.png`)}) no-repeat;`
    res+="background-size: 100% 100%;"
    // console.log(res)
    return res
}
const changePage = (title) => {
    router.push('/hajimiReset/fight/worldExplore')
}
const sceneList = ref([])
const moving = ref(false)
const changeGround = (val)=>{
    // console.log(val)
    moving.value = false
    monsterShowList.value = planetApi.getMonsterListByGround(val)
    console.log(monsterShowList.value)
    sceneList.value = props.groundList.find(item=>item.value===val).sceneList
    if(sceneList.value.length>0){
        selectedScene.value = sceneList.value[0].value
        sceneTipText.value = planetApi.getSceneTipText(sceneList.value[0].value)
    }else{
        store.commit("setTipList",["当前地图暂无场景"])
    }
    setTimeout(()=>{
        moving.value = true
        moveMonster()
    },3000)
}//改变当前场景
const sceneTipText = ref("")
const changeScene = (val)=>{
    moving.value = false
    console.log(val)
    selectedScene.value = val
    monsterShowList.value = planetApi.getMonsterListByGround(selectedGround.value,val)
    console.log(monsterShowList.value)
    sceneTipText.value = planetApi.getSceneTipText(val)
    setTimeout(()=>{
        moving.value = true
        moveMonster()
    },3000)
}//改变当前小区域
const isOpen = ref(false)
const tipClickSure = ()=>{
    isShowTip.value = false
    console.log(selectMonster.value)
    let botList = []
    let myList = []
    selectMonster.value.fightMes.botMonsterList.forEach(item=>{
        botList.push(planetApi.getMonsterBasicMesByName(item.name,item.level))
        // console.log(planetApi.getMonsterBasicMesByName(item.name))
    })
    selectMonster.value.fightMes.myMonsterList.forEach(item=>{  
        myList.push(planetApi.getMonsterBasicMesByName(item.name,item.level))
    })
    // console.log(selectMonster.value.fightMes)
    allMes.value.campaignMes = {
        myMonsterList:myList,
        botMonsterList:botList,
        botPower:selectMonster.value.fightMes.botPower||-1,
    }
    allMes.value.wildMonster = {}//重置野生精灵信息，用于验证boss精元
    // selectMonster.value
    store.commit("hajimiReset/setAllMes",allMes.value)
    router.push(`/hajimiReset/fight/ground?type=campaign&ground=${selectedScene.value}&lockLevel=${selectMonster.value.fightMes?.lockLevel||0}`)
}
</script>

<template lang="pug">
.saier-block
    .saier-back(@click="changePage()") 返回
    .planet-title-slot
        slot(name="planetTitle")
    .saier-monster-block(:style="getGroundBackground()")
        .saier-monster(v-for="monster in monsterShowList" 
            :key="monster.id" :style="getMonsterStyle(monster.position)"
            @click="clickMonster(monster)")
            .saier-monster-name {{monster.name}}
            .saier-monster-level Lv {{monster.level}}
    el-select(class="scene-select" v-if="sceneList.length>1" style="width: 150px;" v-model="selectedScene"
        @change="changeScene")
        el-option(v-for="item in sceneList" :key="item.label" :label="item.label" :value="item.value" )
    el-select(class="saier-select" style="width: 150px;" v-model="selectedGround"
        @change="changeGround")
        el-option(v-for="item in props.groundList" :key="item.label" :label="item.label" :value="item.value" )
    .planet-scene-text-block(@click="isOpen = !isOpen" :style="{'height':isOpen?'auto':'30px','white-space':isOpen?'':'nowrap'}") {{sceneTipText}}
    .planet-tip-block(@click="isShowTip = false" v-if="isShowTip")
        .planet-tip(@click.stop="")
            .planet-tip-text {{clickTipText}}
            .planet-tip-text(v-if="selectMonster.fightMes.lockLevel") 注意：该Boss有{{selectMonster.fightMes.lockLevel}} 级等级锁！
            .planet-tip-button(@click="tipClickSure()") 确 定
</template>
<style scoped lang="scss">
.saier-block{
    width: 100%;
    height: 100%;
    position: relative;
    padding: 50px;
    box-sizing: border-box;
    .saier-back{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #500a92;
        border: 1px solid #ee33ff;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
    }
    .planet-title-slot{
        position: absolute;
        top: 11px;
        left: 80px;
        width: 100px;
        height: 30px;
    }
    .saier-monster-block{
        width: 500px;
        height: 300px;
        position: relative;
        border-radius: 4px;
        .saier-monster{
            width: 30px;
            height: 30px;
            border-radius: 4px;
            position: absolute;
            background: url("../../img/baimei.gif") no-repeat;
            background-size: 100% 100%;
            transition: 2s;
            cursor: pointer;
            .saier-monster-name{
                position: absolute;
                width: 100px;
                top: -16px;
                left: 0px;
                color: #fff;
                font-size: 10px;
                text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
            }
            .saier-monster-level{
                position: absolute;
                top: -28px;
                left: -0px;
                color: #fff;
                font-size: 10px;
                text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
            }
        } 
    }
    .scene-select{
        position: absolute;
        top: 10px;
        right: 210px;
        background-color: #333;
        color: #fff;
        :deep(.el-select__wrapper) {
            background-color: #333;
            color: #fff;
        }:deep(.is-focused) {
            box-shadow: 0 0 0 1px #ee33ff;
        }
    }
    .saier-select{
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #333;
        color: #fff;
        :deep(.el-select__wrapper) {
            background-color: #333;
            color: #fff;
        }:deep(.is-focused) {
            box-shadow: 0 0 0 1px #ee33ff;
        }
    }
    .planet-scene-text-block{
        position: absolute;
        bottom: 10px;
        left: 50px;
        width: 500px;
        height: 30px;
        font-size: 14px;
        text-indent: 28px;
        background-color: #500a92;
        border: 1px solid #ee33ff;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        box-sizing: border-box;
        padding: 4px;
        overflow: hidden;
        // white-space: nowrap;
        text-overflow: ellipsis;
    }
    .planet-tip-block{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        .planet-tip{
            width: 400px;
            height: 200px;
            background-color: #7e30c9;
            border: 1px solid #ee33ff;
            border-radius: 4px;
            margin: 100px;
            position: relative;
            .planet-tip-text{
                padding: 10px;
                font-size: 14px;
                color: #fff900;
            }
            .planet-tip-button{
                position: absolute;
                bottom: 10px;
                right: 10px;
                width: 80px;
                height: 30px;
                font-size: 12px;
                line-height: 30px;
                text-align: center;
                background-color: #1db040;
                border-radius: 4px;
                cursor: pointer;
                color: #fff;
            }
        }
    }
}
</style>