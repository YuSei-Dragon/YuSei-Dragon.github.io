<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent,
  nextTick,
  watch,
  defineEmits,
  defineProps,
  inject,
  reactive
} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts';

let chart1 = null
let chart2 = null
let chart3 = null
let chart4 = null
const animation1 = ref(null)
const animation2 = ref(null)
const animation3 = ref(null)
const animation4 = ref(null)

const router = useRouter()
const store = useStore()
const allMes = ref({})
const resultText = ref("")
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})

onMounted(() => {
    allMes.value = store.state.hajimiReset.allMes
    console.log("props", props)
    initChart()
})
const props = defineProps({
    type:{
        type:Number,
        default:100,
    },
    res:{
        type:Boolean,
        default:false,
    },
})
// watch(() => props.type, (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//         initChart(newVal)
//     }
// })
const emit = defineEmits(['animationEnd'])
const initChart = async() => {
    console.log("echarts init")
    chart1 = echarts.init(animation1.value)
    
    // 初始选项
    let option1 = {
        animation: true, // 启用动画
        animationDuration: 1000, // 动画持续时间
        animationEasing: 'cubicOut', // 动画缓动效果
        series: [
            {
                name: '天空蓝环状图',
                type: 'pie',
                radius: ['60%', '70%'],
                center: ['50%', '50%'],
                startAngle: 90,
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { 
                        value: 33, 
                        name: '展开部分',
                        itemStyle: {
                            color: '#87CEFA' // 天空蓝
                        }
                    },
                    { 
                        value: 67, 
                        name: '未展开部分',
                        itemStyle: {
                            color: 'rgba(135, 206, 250, 0)' // 透明
                        }
                    }
                ]
            }
        ]
    }
    chart1.setOption(option1)
    if(props.type >= 56||props.res===true){
        await waitToDo(1000,()=>{
                chart2 = echarts.init(animation2.value)
                const series2 = option1.series[0]
                series2.data.map(item=>{
                    if(item.name === "展开部分"){
                        item.value = 56
                    }
                    if(item.name === "未展开部分"){
                        item.value = 44
                    }
                })
                option1.series[0].data = series2.data
                chart2.setOption(option1)
        })
    }
    if(props.type >= 99||props.res===true){
        await waitToDo(1000,()=>{
            chart3 = echarts.init(animation3.value)
            const series3 = option1.series[0]
            series3.data.map(item=>{
                if(item.name === "展开部分"){
                    item.value = 99
                }
                if(item.name === "未展开部分"){
                    item.value = 1
                }
            })
            option1.series[0].data = series3.data
            chart3.setOption(option1)
        })
    }
    if(props.res===true){
        await waitToDo(1000,()=>{
            chart4 = echarts.init(animation4.value)
            const series4 = option1.series[0]
            series4.data.map(item=>{
                if(item.name === "展开部分"){
                    item.value = 100
                }
                if(item.name === "未展开部分"){
                    item.value = 0
                }
            })
            option1.series[0].data = series4.data
            chart4.setOption(option1)
        })
    }
    await waitToDo(1000,()=>{
        if(props.res === true){
            resultText.value = "收服!"
        }else{
            resultText.value = "逃脱!"
        }
    })
    await waitToDo(1000,()=>{
        emit("animationEnd",props.res)
    })
}
const waitToDo = (async(time,fun)=>{
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
    if (typeof fun === 'function') {
        return await fun();
    }
})//等待执行完成

</script>

<template lang="pug">
.animation-block
    .animation(ref="animation1" style="z-index:7;")
    .animation(ref="animation2" style="z-index:8;")
    .animation(ref="animation3" style="z-index:9;")
    .animation(ref="animation4" style="z-index:10;")
    .animation-text {{resultText}}
</template>
<style scoped lang="scss">
.animation-block{
    width: 100%;
    height: 100%;
    position: relative;
    .animation{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .animation-text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        font-weight: bold;
        color: #fff;
    }
}
</style>