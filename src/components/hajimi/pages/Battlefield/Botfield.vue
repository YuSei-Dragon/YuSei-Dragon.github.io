<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
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

</script>
<template lang="pug">
.bot-block
    .bot-header()
    .bot-header-mes
        el-progress(style="position:relative;margin-bottom: 4px;" :percentage="getLifeNow(props.allMes.allMesBot.playerNow)" :text-inside="true" :stroke-width="6" color="#ffe3e3")
        .bot-header-power(v-for="(power,index) in powerList")
            .bot-header-power-light(v-if="index<props.allMes.allMesBot.playerNow.power")
    .bot-life
        el-progress(style="position:relative;" :percentage="getLifeNow(props.allMes.allMesBot.monsterNow)" :text-inside="true" :stroke-width="16" color="#ffe3e3")
            .progress-position() {{props.allMes.allMesBot.monsterNow.lifeNow}}
        .card-list
            .hand-one(v-for="hand in props.allMes.allMesBot.handCardList"  :style="'width:'+400/props.allMes.allMesBot.handCardList.length + 'px;'")
                .hand-one-img()
        .card-num {{props.allMes.allMesBot.handCardList.length}}

</template>
<style scoped lang="scss">
.bot-block{
    width: 100%;
    height:100%;
    position: relative;
    .bot-header{
        width: 60px;
        height: 60px;
        float: right;
        background: url(../../img/header.png) no-repeat;
        background-size: 100% 100%;
        border-radius: 4px;
        opacity: 0.4;
    }
    .bot-header-mes{
        position: absolute;
        bottom: 0;
        right: 0px;
        width: 60px;
        .bot-header-power{
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: #f5f5f5;
            float: left;
            margin-right: 4px;
            .bot-header-power-light{
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background: #89bfeb;
            }
        }
        
    }
    .bot-life{
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
    }
}

</style>