<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
  defineExpose,
} from 'vue'
import skillListApi from '@/components/hajimi/skillList'
const props = defineProps({
    allMes:{
        type:Object,
        default:{},
    },
})
const getLifeNow = (mes)=>{
    return Number(Number(Number(mes.lifeNow/mes.life)*100).toFixed(2))
}
const powerList = ref([1,1,1,1,1])
const choicedCardIndex = ref(-1)
const choicedSkillIndex = ref(-1)
const emit = defineEmits(['choiceCard','choiceSkill','changeMonster'])
const choiceCard = (index)=>{
    if(choicedCardIndex.value === index){
        choicedCardIndex.value = -1
        return  emit("choiceCard",{
            data:"",
            index:-1
        })
    }
    choicedCardIndex.value = index
    if(props.allMes.stepName!=='战斗阶段'){
        emit("choiceCard",{
            data:props.allMes.allMesMy.handCardList[index],
            index:index,
        })
    }
}
const choiceSkill = (index)=>{
    if(choicedSkillIndex.value === index){
        choicedSkillIndex.value = -1
        return  emit("choiceSkill",{
            data:"",
            index:-1
        })
    }
    choicedSkillIndex.value = index
    emit("choiceSkill",{
        data:skillListApi.getSkillByName(props.allMes.allMesMy.monsterNow.skillList[index]),
        index:index,
    })
}
const getHandStyle = (index)=>{
    let res = 'width:'+400/props.allMes.allMesMy.handCardList.length + 'px;'
    if(index == choicedCardIndex.value){
        res += "background: #eee;"
    }
    return res
}
const getSkillStyle = (index)=>{
    let res = ''
    if(index == choicedSkillIndex.value){
        res += "background: #eee;"
    }
    return res
}
const isShowCards = ()=>{
    return ((props.allMes.playingNow===props.allMes.allMesMy.playerNow.name)
            &&
            props.allMes.stepName!=='战斗阶段')
            ||
            !(props.allMes.playingNow===props.allMes.allMesMy.playerNow.name)
}
const isShowSkill = ()=>{
    return props.allMes.stepName==='战斗阶段'
            &&
            (props.allMes.playingNow===props.allMes.allMesMy.playerNow.name)
}
const cleanChoiced = ()=>{
    choicedCardIndex.value = -1
    choicedSkillIndex.value = -1
}
const changeMonster = ()=>{
    emit("changeMonster")
}
defineExpose({
  cleanChoiced,
})
</script>
<template lang="pug">
.my-block
    el-tooltip( effect="light" style="padding:0px;margin:0px;" placement="left-start")
        template(#content v-if="props.allMes.playingNow===props.allMes.allMesMy.playerNow.name") 
            .head-buttons-block()
                .head-buttons(@click="changeMonster") 换人
                .head-buttons 放弃
        .my-header()
    .my-header-mes
        el-progress(style="position:relative;margin-bottom: 4px;" :percentage="getLifeNow(props.allMes.allMesMy.playerNow)" :text-inside="true" :stroke-width="6" color="#ffe3e3")
        .my-header-power(v-for="(power,index) in powerList")
            .my-header-power-light(v-if="index<props.allMes.allMesMy.playerNow.power")
    .my-life
        el-progress(style="position:relative;" :percentage="getLifeNow(props.allMes.allMesMy.monsterNow)" :text-inside="true" :stroke-width="16" color="#ffe3e3")
            .progress-position() {{props.allMes.allMesMy.monsterNow.lifeNow}}
        .card-list(v-show="isShowCards()")
            .hand-one(v-for="(hand,index) in props.allMes.allMesMy.handCardList"  :style="getHandStyle(index)" @click="choiceCard(index)")
                .hand-one-name {{hand.name}}
                el-tooltip(effect="light"  placement="top")
                    template(#content ) 
                        div(style="max-width: 200px;font-size: 12px;color:#666;") {{hand.desc}}
                    .hand-one-tip 
        .card-num(v-if="isShowCards()") {{props.allMes.allMesMy.handCardList.length}}
        .skill-list(v-show="isShowSkill()")
            .skill-one(v-for="(skill,index) in props.allMes.allMesMy.monsterNow.skillList" :style="getSkillStyle(index)" @click="choiceSkill(index)")
                .skill-one-name {{skill}}
                el-tooltip(effect="light"  placement="top")
                    template(#content ) 
                        div(style="max-width: 200px;font-size: 12px;color:#666;") {{skillListApi.getSkillByName(skill).desc}}
                    .skill-one-tip 

</template>
<style scoped lang="scss">
.my-block{
    width: 100%;
    height:100%;
    position: relative;
    .my-header{
        width: 60px;
        height: 60px;
        float: right;
        background: url(../../img/header.png) no-repeat;
        background-size: 100% 100%;
        border-radius: 4px;
        opacity: 0.4;
    }
    .my-header-mes{
        position: absolute;
        bottom: 0;
        right: 0px;
        width: 60px;
        .my-header-power{
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: #f5f5f5;
            float: left;
            margin-right: 4px;
            .my-header-power-light{
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background: #89bfeb;
            }
        }
        
    }
    .my-life{
        width: 420px;
        height: 100%;
        position: relative;
        .progress-position{
            position: absolute;
            top: 0;
            right: 0px;
            padding: 0px 10px;
            margin: 0;
            height: 100%;
            line-height: 16px;
            display: block;
            color:#aaa;
        }
        .card-list{
            width:100%;
            height:64px;
            padding-right: 20px;
            box-sizing: border-box;
            .hand-one{
                max-width: 56px;
                float: left;
                height: 100%;
                font-size: 12px;
                color: #bbb;
                cursor: pointer;
                // background-color: #f5f5f5;
                box-sizing: border-box;
                border-radius: 4px;
                border: 1px solid #f5f5f5;
                position: relative;
                .hand-one-name{
                    width: 10px;
                    font-size: 10px;
                    color: #999;
                }
                .hand-one-tip{
                    top: 50%;
                    left: 0%;
                    width: 100%;
                    position: absolute;
                    height: 32px;
                }
                .hand-num{
                    padding-left: 3px;
                }
                .hand-one-img{
                    width: 50%;
                    height: 50%;
                    position: absolute;
                    top: 25%;
                    left: 25%;
                    background-size: contain;
                    background-position: center;
                    background-image: url("./img/bagua.png");
                    background-repeat: no-repeat;
                    opacity: 0.1;
                }
            }
            .hand-one:hover{
                background-color: #eee;
            }
        }
        .card-num{
            position: absolute;
            bottom: 4px;
            right: 4px;
            font-size: 14px;
            color: #999;
        }
        .skill-list{
            width:100%;
            height:64px;
            padding-right: 20px;
            box-sizing: border-box;
            .skill-one{
                float: left;
                width: 25%;
                height: 64px;
                cursor: pointer;
                position: relative;
                .skill-one-name{
                    font-size: 14px;
                    color: #999;
                    padding-top: 4px;
                    padding-left: 4px;
                }
                .skill-one-tip{
                    top: 50%;
                    left: 0%;
                    width: 100%;
                    position: absolute;
                    height: 32px;
                }
            }
            .skill-one:hover{
                background-color: #eee;
            }
        }
    }
}
.head-buttons-block{
    width: 60px;
    .head-buttons{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #999;
        font-size: 14px;
        cursor: pointer;
    }
    .head-buttons:hover{
        background-color: #eee;
    }
}

</style>