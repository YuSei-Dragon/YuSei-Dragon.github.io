<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineExpose,
  defineProps,
  defineEmits,
  watch
} from 'vue'
import apiTrun from "../../turnMethod.js"
const DetailMes = ref({})
const showDetailSkill = (data,type)=>{
    // console.log(data)
    DetailMes.value = {...data}
    DetailMes.value.type = type
}
const props = defineProps({
    mesList:{
        type:Array,
        default:()=>[]
    },
    turnNum:{
        type:Number,
        default:1
    }
})
watch(props.mesList,(newValue,oldValue)=>{
    reflashMesList()
})
const mesListBlock = ref(null)
const reflashMesList = ()=>{
    setTimeout(() => {
    //   console.log('内容增加时');
      mesListBlock.value.scrollTop = mesListBlock.value.scrollHeight;
    }, 20); // 注意这里需要延迟20ms正好可以获取到更新后的dom节点
}
const standBySkill = ref("")
const standByNum = ref(0)
const changeSkill = (data)=>{
    standBySkill.value = data
}
const clearSkillAndNum = ()=>{
    standBySkill.value = ""
    standByNum.value = 0
}
const reflashHand = (point)=>{
    standByNum.value = point
}
const emit = defineEmits(['onSumbit','substitution'])
const sumbit = ()=>{
    emit('onSumbit')
    clearSkillAndNum()
}
const getMesTextStyle = (mes)=>{
    if(mes.type === "default"||!mes.type){
        return ""
    }else if(mes.type === "warn"){
        return "color:E6A23C;"
    }
}
const changeBotStatus = (status)=>{
    botStatus.value = status
    apiTrun.waitToDo(1500,()=>{
        botStatus.value = "standBy"
    })
}
const changeMyStatus = (status)=>{
    myStatus.value = status
    apiTrun.waitToDo(1500,()=>{
        myStatus.value = "standBy"
    })
}
const botStatus = ref("standBy")
const myStatus = ref("standBy")
const substitution = ()=>{
    emit('substitution',props.mesList)
}
const isShowBotHit = ref(false)
const isShowMyHit = ref(false)
const showBotHit = ()=>{
    isShowBotHit.value = true
    apiTrun.waitToDo(600,()=>{
        isShowBotHit.value = false
    })
}
const showMyHit = ()=>{
    isShowMyHit.value = true
    apiTrun.waitToDo(600,()=>{
        isShowMyHit.value = false
    })
}
const isShowMyMiss = ref(false)
const showMyMiss = ()=>{
    isShowMyMiss.value = true
    apiTrun.waitToDo(600,()=>{
        isShowMyMiss.value = false
    })
}
const isShowBotMiss = ref(false)
const showBotMiss = ()=>{
    isShowBotMiss.value = true
    apiTrun.waitToDo(600,()=>{
        isShowBotMiss.value = false
    })
}
defineExpose({
    showDetailSkill,
    changeSkill,
    reflashHand,
    changeBotStatus,
    changeMyStatus,
    standBySkill,
    standByNum,
    showBotHit,
    showMyHit,
    showMyMiss,
    showBotMiss,
})
</script>
<template lang="pug">
.fight-block
    .fight-hit-bot(v-if="isShowBotHit")
        .fight-hit
            .fight-hit-animation1
            .fight-hit-animation2
            .fight-hit-animation3
    .fight-hit-my(v-if="isShowMyHit")
        .fight-hit
            .fight-hit-animation1
            .fight-hit-animation2
            .fight-hit-animation3
    .fight-miss(v-if="isShowMyMiss" style="top:115px;") miss~
    .fight-img-bot 
        img(class="fight-img" src="../../img/standbygif.gif" v-if="botStatus==='standBy'")
        img(class="fight-img" src="../../img/atk.gif" v-if="botStatus==='attack'")
        img(class="fight-img" src="../../img/haqi.gif" v-if="botStatus==='haqi'")
    .fight-miss(v-if="isShowBotMiss") miss~
    .fight-img-my 
        img(class="fight-img" src="../../img/standbygif.gif" v-if="myStatus==='standBy'")
        img(class="fight-img" src="../../img/atk.gif" v-if="myStatus==='attack'")
        img(class="fight-img" src="../../img/haqi.gif" v-if="botStatus==='haqi'")
    .fight-turn-num 回合{{props.turnNum}}
    .fight-one-block
        .fight-one-border
            .fight-one-skill.fight-one(v-show="DetailMes.type==='skill'")
                .skill-name(v-show="DetailMes.name") 名称：{{DetailMes.name}}
                .skill-mes(v-show="DetailMes.only") 专属技能：{{DetailMes.only}}
                .skill-mes(v-show="!DetailMes.only") 公用技能
                .skill-mes(v-show="DetailMes.cost") 消耗点数：{{DetailMes.cost}}
                .skill-mes(v-show="DetailMes.surplus") 当前可发动次数：{{DetailMes.surplus}}
                .skill-mes(v-show="DetailMes.num") 最多发动次数：{{DetailMes.num}}
                .skill-mes(v-show="DetailMes.dec") 详细介绍：{{DetailMes.dec}}

            .fight-one-skill.fight-one(v-show="DetailMes.type==='hand'")
            .fight-one-skill.fight-one(v-show="DetailMes.type==='strategy'")
                .skill-name(v-show="DetailMes.name") 名称：{{DetailMes.name}}
                .skill-mes(v-show="DetailMes.attribute") 属性：{{DetailMes.attribute}}
                .skill-mes(v-show="DetailMes.dec") 描述：{{DetailMes.dec}}
                .skill-mes(v-show="DetailMes.condition") 使用条件：{{DetailMes.condition}}
    .fight-mes-block
        .fight-mes-border(ref="mesListBlock")
            .mes-one(v-for="mes in props.mesList" :style="getMesTextStyle(mes)") {{mes.text}}
    .fight-buttons-block()
        .fight-block
            //- .fight-button-skill 当前就位技能: {{standBySkill}}
            //- .fight-button-card 当前就位点数: {{standByNum}}
            //- .fight-button-sure(@click="sumbit()") 确认
            .fight-button-substitution(@click="substitution()") 换人
            //- .fight-button-cancel(@click="clearSkillAndNum()") 取消

</template>
<style scoped lang="scss">
/* 定义滚动条的整体样式 */
::-webkit-scrollbar {
width: 4px; /* 对于垂直滚动条 */
height: 6px; /* 对于水平滚动条 */
background-color: #fff; /* 滚动条的背景色 */
}

/* 定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(216, 216, 216, 0.3); /* 轨道的阴影 */
border-radius: 10px; /* 轨道的圆角 */
background-color: #fff; /* 轨道的背景色 */
}

/* 定义滑块的样式 */
::-webkit-scrollbar-thumb {
border-radius: 10px; /* 滑块的圆角 */
-webkit-box-shadow: inset 0 0 6px rgba(226, 226, 226, 0.3); /* 滑块的阴影 */
background-color: #eee; /* 滑块的背景色 */
}
.fight-block{
    width: 100%;
    height: 100%;
    position: relative;
    .fight-miss{
        position: absolute;
        top: 20px;
        left: 245px;
        color: #fff;
        font-size: 16px;
        z-index:10;
        transition:0.3s;
        -webkit-text-stroke: 1px #ffffff;
    }
    .fight-img{
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
    .fight-img-bot{
        position: absolute;
        top: 0px;
        left: 210px;
        width: 80px;
        height: 80px;
    }
    .fight-hit-bot{
        position: absolute;
        top: 0px;
        left: 210px;
        width: 80px;
        height: 80px;
        z-index: 10;
    }
    .fight-hit-my{
        position: absolute;
        bottom: 0px;
        left: 210px;
        width: 80px;
        height: 80px;
        z-index: 10;
    }
    .fight-hit{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .fight-hit-animation2{
            position:absolute;
            animation: donghua2 0.6s infinite;
            transform: rotate(-45deg);
            width: 100px;
            height: 1px;
            background: #fff;
        }
        @keyframes donghua2 {
            0% {
                top: -80px;
                right: -120px;
            }
            100% {
                top: 120px;
                right: 80px;
            }
        }
        .fight-hit-animation1{
            position:absolute;
            animation: donghua1 0.6s infinite;
            transform: rotate(-45deg);
            width: 100px;
            height: 1px;
            background: #fff;
        }
        @keyframes donghua1 {
            0% {
                top: -70px;
                right: -130px;
            }
            100% {
                top: 130px;
                right: 70px;
            }
        }
        .fight-hit-animation3{
            position:absolute;
            animation: donghua3 0.6s infinite;
            transform: rotate(-45deg);
            width: 100px;
            height: 1px;
            background: #fff;
        }
        @keyframes donghua3 {
            0% {
                top: -88px;
                right: -108px;
            }
            100% {
                top: 112px;
                right: 94px;
            }
        }
    }
    .fight-img-my{
        position: absolute;
        bottom: 0px;
        left: 210px;
        width: 80px;
        height: 80px;
    }
    .fight-turn-num{
        font-size: 10px;
        color:#999;
        position: absolute;
        top: 80px;
        left: 210px;
        width: 80px;
        text-align: center;
    }
    .fight-one{
        width: 100%;
        height: 100%;
        padding: 2px 4px;
        overflow: auto;
    }
    .fight-one-block{
        float: left;
        height: 168px;
        width: 193px;
        padding: 4px;
        padding-left: 10px;
        .fight-one-border{
            border-radius: 10px;
            border: 1px #bbb solid;
            width: 100%;
            height: 100%;
            background: #fff;
            .skill-name{
                font-size: 14px;
                color: #bbb;
            }
            .skill-mes{
                font-size: 10px;
                color: #bbb;
            }
        }
    }
    .fight-mes-block{
        float: right;
        height: 90px;
        width: 195px;
        padding: 4px;
        padding-right: 10px;
        .fight-mes-border{
            border-radius: 10px;
            border: 1px #bbb solid;
            width: 100%;
            height: 100%;
            background: #fff;
            overflow: auto;
            .mes-one{
                font-size: 10px;
                color: #bbb;
                text-indent: 4px;
            }
        }
    }
    .fight-buttons-block{
        position: absolute;
        bottom: 0px;
        right:10px;
        height:73px;
        width:195px;
        border-radius: 10px;
        border: 1px #bbb solid;
        background: #fff;
        .fight-button-skill{
            font-size: 10px;
            color: #999;
            padding: 2px 10px;
            text-overflow:ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .fight-button-card{
            font-size: 10px;
            color: #999;
            padding: 2px 10px;
            text-overflow:ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .fight-button-sure{
            position: absolute;
            bottom: 4px;
            left: 10px;
            font-size: 14px;
            color: #999;
            cursor: pointer;
        }
        .fight-button-cancel{
            position: absolute;
            bottom: 4px;
            right: 10px;
            font-size: 14px;
            color: #999;
            cursor: pointer;
        }
        .fight-button-substitution{
            position: absolute;
            bottom: 4px;
            width:95px;
            right: 50px;
            font-size: 14px;
            text-align: center;
            color: #999;
            cursor: pointer;
        }
    }
}

</style>