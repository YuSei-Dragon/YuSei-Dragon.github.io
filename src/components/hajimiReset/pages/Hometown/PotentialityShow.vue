<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
  defineEmits,
  defineProps,
  inject,
  reactive
} from 'vue'
import {
  Check,
} from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import classicalApi from "../Fight/classicalChallengeApi.js"
import planetApi from "../Planet/planetApi.js"
import skillListApi from "../Fight/skillList.js"
const store = useStore()
const allMes = ref({})
watch(() => store.state.hajimiReset.allMes, (newVal, oldVal) => {
    console.log("allMes改变了", newVal)
    allMes.value = newVal
    //把数据本地化，方便后续使用
}, {deep: true})
const playerMes = ref({})
onMounted(() => {
    initMes()
})
const initMes = ()=>{
    allMes.value = store.state.hajimiReset.allMes
    //在watch生效前初始化
    // console.log(allMes.value)
    // 创建深拷贝，确保playerMes是独立的数据副本
    playerMes.value = JSON.parse(JSON.stringify(allMes.value.playerMes))
    console.log(playerMes.value.monsterList)
    playerMes.value.monsterList.map(monster=>{
        skillListApi.getSkillList(monster.name,monster.level).forEach(item=>{
            if(monster.allSkillList.find(skill=>skill.name === item)){
                //已经有这个技能,不再增加

            }else{
                monster.allSkillList.push({
                    name:item,
                    using: monster.skillList.includes(item)
                }) 
            }
        })//把符合等级的技能添加到精灵的技能列表中
    })//每次加载重新修正一次自动学习的技能
    console.log(playerMes.value)
}
const emit = defineEmits([ "closePotentiality",])
const closePotentiality = ()=>{
    emit('closePotentiality')
}
const selectMonsterUse = ref(-1)
const getPotentiality = (level,potentiality)=>{
    let num = 0
    for(let i in potentiality){
        num += potentiality[i]
    }
    return level - num
}//获取剩余的潜力值
const getPotentialityName = (item)=>{
    // console.log(item)
    let nameObj = {
            "atk": "物攻",
            "def": "物防",
            "atkMagic": "魔攻",
            "defMagic": "魔防",
            "life": "生命值",
            "speed": "速度"
        }
    return nameObj[item]
}//获取能力值的名称
const getLineStyle = (item,monster)=>{
    let style = ""
    const monsterMes = classicalApi.getMonsterFightMes(monster)
    const max = Math.max(monsterMes.atk,monsterMes.atkMagic,monsterMes.def,monsterMes.defMagic,monsterMes.life,monsterMes.speed)
    const min = Math.min(monsterMes.atk,monsterMes.atkMagic,monsterMes.def,monsterMes.defMagic,monsterMes.life,monsterMes.speed)
    if(max===monsterMes[item]){
        style += "background-color: #30f865;"
    }
    if(min===monsterMes[item]){
        style += "background-color: #ff3333;"
    }
    if(max === min){
        style += "background-color: #33a6ff;"
    }
    const width = monsterMes[item] / max * 4/5 * 160    //限制最大值显示4/5的长度，动态调整避免极端情况
    style += "width: " + width + "px;"
    return style
}//动态修正能力值的直观表现
const getInputMax = (monster,item)=>{
    let num = 0
    for(let i in monster.potentiality){
        if(i !== item){
            num += monster.potentiality[i]
        }
    }
    return monster.level - num
}//获取能输入的最大潜力值
const keepPlayMes = ()=>{
    // 同样需要创建深拷贝，确保不会直接修改原始数据
    const newAllMes = JSON.parse(JSON.stringify(allMes.value))
    newAllMes.playerMes = playerMes.value
    store.commit("hajimiReset/setAllMes", newAllMes)
    store.commit("hajimiReset/setTipList", ["保存成功!"])
}//保存使用者信息
const selectTitle = ref("潜力分配")
const selectTitleClick = (title)=>{
    selectTitle.value = title
}//切换tab
const inputSkill = ref("")
const clickSkillUse = (skill)=>{
    let resList =[]
    playerMes.value.monsterList[selectMonsterUse.value].skillList.forEach(item=>{
        if(item !== skill){
            resList.push(item)
        }else{
            playerMes.value.monsterList[selectMonsterUse.value].allSkillList.forEach(skillItem=>{
                if(skillItem.name === skill){
                    skillItem.using = false
                }
            })
        }
    })
    playerMes.value.monsterList[selectMonsterUse.value].skillList = resList
}//取消选中的技能
const clickSkillAll = (skillName)=>{
    if(playerMes.value.monsterList[selectMonsterUse.value].skillList.length >= 4){
        store.commit("hajimiReset/setTipList", ["每个精灵最多只能同时携带4个技能"])
        return
    }if(playerMes.value.monsterList[selectMonsterUse.value].skillList.includes(skillName)){
        store.commit("hajimiReset/setTipList", ["该技能已被携带"])
        return
    }
    playerMes.value.monsterList[selectMonsterUse.value].allSkillList.forEach(item=>{
        if(item.name === skillName){
            item.using = true
        }
    })
    playerMes.value.monsterList[selectMonsterUse.value].skillList.push(skillName)
}//选取技能使用
const canEvolve = (monster)=>{
    let result = planetApi.getWildMonsterMesByName(monster.name)
    console.log(result)
    if((result.evolveLv > 0)&&(result.evolveLv <= monster.level)){
        return true
    }
    return false
}//判断是否可以进化
const evolveMonster = (monster)=>{
    console.log(monster.name + "进化！")
    let oldMonster = {...monster}
    let old = planetApi.getWildMonsterMesByName(monster.name)
    let newMonster = planetApi.getWildMonsterMesByName(old.evolveTo)
    oldMonster.name = newMonster.name
    oldMonster.race = newMonster.race
    oldMonster.attribute = newMonster.attribute
    oldMonster.probability = newMonster.probability
    oldMonster.evolveLv = newMonster.evolveLv
    if(oldMonster.evolveLv!==-1){
       oldMonster.evolveTo = newMonster.evolveTo 
    }
    playerMes.value.monsterList[selectMonsterUse.value] = oldMonster
    store.commit("hajimiReset/setTipList", [monster.name + "进化成了"+newMonster.name+"!"])
    allMes.value.playerMes = playerMes.value
    store.commit("hajimiReset/setAllMes", allMes.value)
    console.log(playerMes.value,allMes.value)
}//进化精灵
</script>

<template lang="pug">
.potentiality-block(@click="closePotentiality()")
    .monster-list-block
        .monster-list(@click.stop="()=>{}")
            .monster-list-item(v-for="(monster,index) in playerMes.monsterList"
                :class="selectMonsterUse===index ? 'monster-list-item-active' : ''"
                @click="selectMonsterUse = index")
                .monster-list-item-name {{monster.name}}
                .monster-list-item-level {{monster.level}}
    .monster-list-block(v-if="selectMonsterUse!=-1")
        .select-block 
            .select-title(@click.stop="selectTitleClick('潜力分配')" :class="selectTitle==='潜力分配' ? 'select-title-active' : ''") 潜力分配
            .select-title(@click.stop="selectTitleClick('技能更换')" :class="selectTitle==='技能更换' ? 'select-title-active' : ''") 技能更换
        .monster-list(@click.stop="()=>{}" v-if="selectTitle==='潜力分配'")
            .potentiality-num-block()
                .potentiality-num {{getPotentiality(playerMes.monsterList[selectMonsterUse].level,playerMes.monsterList[selectMonsterUse].potentiality)}}
                .potentiality-num-text 剩余潜力
                .potentiality-button-text 保存
                el-button(type="success" :icon="Check" circle 
                    style="margin-right: 10px;margin-top:10px;float:right"
                    @click="keepPlayMes()") 
            .potentiality-mes-block(v-for="item of Object.keys(playerMes.monsterList[selectMonsterUse].potentiality)")
                .potentiality-mes-text {{getPotentialityName(item)}}
                .potentiality-mes-line-block
                    .potentiality-mes-line(:style="getLineStyle(item,playerMes.monsterList[selectMonsterUse])")
                el-popover(placement="left" width="150px" trigger="click")
                    template(#reference)
                        .potentiality-mes-num {{playerMes.monsterList[selectMonsterUse].potentiality[item]}}
                    el-input-number(v-model="playerMes.monsterList[selectMonsterUse].potentiality[item]"
                        :min="0" :max="getInputMax(playerMes.monsterList[selectMonsterUse],item)" size="small")
        .monster-list(@click.stop="()=>{}" v-if="selectTitle==='技能更换'")
            .monster-skill-button-block
                el-button(type="success" :icon="Check" circle 
                    style="margin-right: 10px;margin-top:10px;float:right"
                    @click="keepPlayMes()") 
                .monster-skill-button-text 保存
            .monster-skill-block
                el-input(class="monster-skill-input" v-model="inputSkill" size="small" placeholder="请输入技能名称")
                .monster-skill-all
                    .monster-skill-all-for(v-for="skill in playerMes.monsterList[selectMonsterUse].allSkillList"
                        :key="skill.name" :class="skill.using ? 'monster-skill-all-for-active' : ''"
                        @click="clickSkillAll(skill.name)" v-show="skill.name.includes(inputSkill)") {{skill.name}}
            .monster-skill-block
                .monster-skill-use
                    .monster-skill-use-for(v-for="skill in playerMes.monsterList[selectMonsterUse].skillList" :key="skill"
                        @click="clickSkillUse(skill)") {{skill}}
            el-popconfirm(title="确认进化吗？" placement="left-end" @confirm="evolveMonster(playerMes.monsterList[selectMonsterUse])")
                template(#reference)
                    el-button(type="primary" size="small" text bg class="monster-evolve-button" 
                        v-if="canEvolve(playerMes.monsterList[selectMonsterUse])") 进化
</template>
<style scoped lang="scss">
.potentiality-block{
    position: relative;
    width: 100%;
    height: 100%;
    .monster-list-block{
        width: 50%;
        float: left;
        height: 100%;
        box-sizing: border-box;
        padding: 50px 25px;
        .select-block {
            position: absolute;
            top:20px;
            right:24px;
            height: 30px;
            .select-title {
                font-size: 12px;
                color: #fff;
                padding: 4px 8px;
                border-radius: 4px;
                border-bottom: 1px solid #b5f830;
                float: left;
                cursor: pointer;
                z-index: 3;
            }
            .select-title-active{
                color: #ff6666;
            }
        }
        .monster-list{
            width: 100%;
            height: 100%;
            border-radius: 6px;
            border: 1px solid #ee33ff;
            background-color: #333;
            position: relative;
            .monster-list-item{
                width: 44px;
                margin-left: 5px;
                margin-top: 5px;
                height: 60px;
                float: left;
                border-radius: 4px;
                border: 1px solid #b5f830;
                box-sizing: border-box;
                position: relative;
                cursor: pointer;
                .monster-list-item-name{
                    font-size: 10px;
                    color: #fff;
                    text-align: left;
                    line-height: 12px;
                    padding: 2px;
                }
                .monster-list-item-level{
                    font-size: 8px;
                    color: #fff;
                    position: absolute;
                    bottom: 4px;
                    right: 4px;
                }
            }
            .monster-list-item-active{
                border: 1px solid #ff4646;
                background-color: #a10909;
            }
            .potentiality-num-block{
                width: 100%;
                height: 50px;
                .potentiality-num{
                    width: 16px;
                    float: left;
                    font-size: 20px;
                    color: #b5f830;
                    padding: 10px 16px;
                }
                .potentiality-num-text{
                    float: left;
                    font-size: 12px;
                    color: #fff;
                    padding-top: 18px;
                }
                .potentiality-button-text{
                    float: left;
                    font-size: 10px;
                    color: #fff;
                    padding-top: 12px;
                    margin-left: 100px;
                    width: 12px;
                }
            }
            .potentiality-mes-block{
                width: 100%;
                height: 40px;
                .potentiality-mes-text{
                    float: left;
                    font-size: 12px;
                    height: 40px;
                    line-height: 40px;
                    color: #999;
                    width: 40px;
                    margin-left: 16px;
                }
                .potentiality-mes-line-block{
                    float: left;
                    width: 160px;
                    height: 4px;
                    margin-top: 18px;
                    background-color: #999;
                    border-radius: 4px;
                    .potentiality-mes-line{
                        height: 4px;
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                        background-color: #33a6ff;
                    }
                }
                .potentiality-mes-num{
                    float: left;
                    font-size: 12px;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                    width: 24px;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
            .monster-skill-button-block{
                position: absolute;
                top: 0px;
                right: 0px;
                cursor: pointer;
                z-index: 3;
                .monster-skill-button-text{
                    float: left;
                    font-size: 10px;
                    color: #fff;
                    padding-top: 12px;
                    margin-right: 5px;
                    width: 12px;
                }
            }
            .monster-evolve-button{
                position: absolute;
                bottom: 10px;
                right: 10px;
            }
        }
        .monster-skill-block{
            width: 110px;
            height: 280px;
            padding-left: 10px;
            padding-top: 10px;
            float: left;
            position: relative;
            .monster-skill-use{
                width: 110px;
                height: 108px;
                border-radius: 4px;
                border-top: 1px solid #b5f830;
                border-bottom: 1px solid #b5f830;
                position: absolute;
                top: 86px;
                left: 10px;
                padding: 0px 10px;
                box-sizing: border-box;
                .monster-skill-use-for{
                    font-size: 10px;
                    background-color: #ee33ff;
                    color: #fff;
                    padding: 4px 8px;
                    cursor: pointer;
                    margin: 4px 0px;
                }
            }
            :deep(.el-input__wrapper){
                background-color: #333;
            }
            :deep(.el-input__inner){
                color: #fff;
            }
            .monster-skill-all{
                width: 110px;
                height: 246px;
                border-radius: 4px;
                border-top: 1px solid #b5f830;
                border-bottom: 1px solid #b5f830;
                margin-top: 6px;
                overflow: auto;
                .monster-skill-all-for{
                    font-size: 10px;
                    background-color: #33a6ff;
                    color: #fff;
                    padding: 4px 8px;
                    cursor: pointer;
                    margin: 4px 0px;
                }
                .monster-skill-all-for-active{
                    background-color: #aaa;
                    color: #333;
                }
            }
            .monster-skill-all::-webkit-scrollbar{
                display: none;
            }
        }
    }
}
</style>