<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
} from 'vue'
import {useStore} from 'vuex'
import MonsterShow from './Hometown/MonsterShow.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const fightPages = ref([
    {
        name : "经典爬塔",
        url: "climb",
    },
    {
        name : "限级爬塔",
        url: "climbLimit",
    },
    {
        name : "世界探索",
        url: "worldExplore",
    },
])
const fightWindow = ref(null)
onMounted(() => {
    fightWindow.value.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        fightWindow.value.scrollLeft += evt.deltaY;
    })
})
const getFightOneStyle = (fightPageOne) => {
    let transformObj = {
        "经典爬塔" : "baimei",
        "限级爬塔" : "dance1",
        "世界探索" : "dance2",
    }
    // 使用require动态导入图片
    const imgPath = require(`../img/${transformObj[fightPageOne.name]}.gif`)
    let res = `background:url(${imgPath}) no-repeat;`
    res += "background-size: 100% 100%;"
    return res
}
const isShowDialog = ref(false)
const isShowMonster = ref(false)
const showMonster = () => {
    isShowDialog.value = true
    isShowMonster.value = true
}
const closeMonsterList = () => {
    isShowDialog.value = false
    isShowMonster.value = false
}
const choiceTypeUrl = ref("")
const selectFight = (fightPageOne) => {
    //选择战斗挑战
    choiceTypeUrl.value = fightPageOne.url
    store.commit("hajimiReset/setTipList",["请确认出战精灵"])
    //初始化allMes
    showMonster()//先确认出战精灵
}
const confirmFight = ()=>{
    store.commit("hajimiReset/setTipList",["精灵出战信息已保存"])
    closeMonsterList()
    // 使用完整的路径进行跳转
    router.push(`/hajimiReset/fight/${choiceTypeUrl.value}`)
}
const changePage = (title) => {
    router.push('/hajimiReset/navigation')
}
</script>

<template lang="pug">
.fight-block()
    .fight-back(@click="changePage()") 返回
    .fight-window-block
        .fight-window(ref="fightWindow")
            .fight-one-block(v-for="fightPageOne in fightPages"
                :style="getFightOneStyle(fightPageOne)"
                @click="selectFight(fightPageOne)")
                .fight-one-title {{fightPageOne.name}}
    .pending-block(v-if="isShowDialog")
        MonsterShow(v-if="isShowMonster" @closeMonsterList="closeMonsterList()"
            @confirmFight="confirmFight")

</template>
<style scoped lang="scss">
.fight-block{
    width: 100%;
    height: 100%;
    position: relative;
    .fight-back{
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
    .fight-window-block{
        width: 100%;
        padding: 0 60px;
        padding-top: 100px;
        height: 300px;
        box-sizing: border-box;
        .fight-window{
            width: 100%;
            height: 100%;
            border-radius: 6px;
            border: 1px solid #ee33ff;
            background-color: #333;
            position: relative;
            overflow-x: hidden;
            white-space: nowrap; /* 禁止换行 */
            .fight-one-block{
                width:120px;
                height: 120px;
                margin: 20px;
                border-radius: 6px;
                border: 1px solid #666;
                position: relative;
                // float: left;
                display: inline-block; /* 子元素横向排列 */
                .fight-one-title{
                    position: absolute;
                    top: 150px;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    font-size: 12px;
                    color: #eee;
                }
            }
        }
        .fight-window:hover{
            overflow-x: auto; /* 启用横向滚动条 */
        }
    }
    .pending-block{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
    }
}
/* 定义滚动条宽度和背景颜色 */
::-webkit-scrollbar {
width: 10px;
height: 8px;
background-color: #666;
}

/* 定义滚动条轨道的阴影和圆角 */
::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
border-radius: 4px;
background-color: #666;
}

/* 定义滑块的圆角和阴影 */
::-webkit-scrollbar-thumb {
border-radius: 4px;
-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,.3);
background-color: #222;
}
</style>