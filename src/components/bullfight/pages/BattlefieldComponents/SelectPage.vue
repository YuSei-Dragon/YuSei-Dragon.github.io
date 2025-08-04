<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits,
} from 'vue'
const UnknowMonster = defineAsyncComponent(() =>
  import("./UnknowMonster.vue")
)
import api from "../../monsterShow.js"
import apiMes from "../../monsterMes.js"
import { ElMessage } from 'element-plus'
const props = defineProps({
    myMonsterList_:{
        type:Array,
        default:[],
    } ,
})
const monsterMes = ref({
  id:"",
  name:"",
  atk:'--',
  atkMagic:'--',
  def:'--',
  defMagic:'--',
  life:'--',
  speed:'--'
})
const monsterSkill = ref([
  {name:"--",num:'--'},
  {name:"--",num:'--'},
  {name:"--",num:'--'},
  {name:"--",num:'--'}
])
const choiceMonster = (monster)=>{
  monsterMes.value.id = monster.id
  monsterMes.value.name = monster.name
  monsterMes.value.atk = monster.atk
  monsterMes.value.atkMagic = monster.atkMagic
  monsterMes.value.def = monster.def
  monsterMes.value.defMagic = monster.defMagic
  monsterMes.value.life = monster.life
  monsterMes.value.speed = monster.speed
  monsterSkill.value = [
    {name:"--",num:'--'},
    {name:"--",num:'--'},
    {name:"--",num:'--'},
    {name:"--",num:'--'}
  ]
  if(Array.isArray(monster.skillListName)&&monster.skillListName.length>0){
    monster.skillListName.forEach((item,index)=>{
      const detail = apiMes.getSkillDetailMes(item)
      monsterSkill.value[index].name = detail.name
      monsterSkill.value[index].num = detail.num
    })
  }
}
const getSkillDetail =(skill)=>{
  let res = ""
  const detail = apiMes.getSkillDetailMes(skill.name)
  // console.log(detail,skill)
  res += detail.dec
  res += detail.cost
  return res
}
const emit = defineEmits(['makeSure'])
const makeSure = ()=>{
  if(monsterMes.value.name === ""){
    ElMessage({
      message:"请先选择出场的怪兽",
      type: 'warning'
    })
  }else{
    emit('makeSure',monsterMes.value.id)
  }
}
</script>
<template lang="pug">
.selectpage-block
    .left-block
      .left-img
        UnknowMonster
      .mes-block
        .mes-atk.mes-one 攻 {{monsterMes.atk}}
        .mes-def.mes-one 防 {{monsterMes.def}}
        .mes-life.mes-one 血 {{monsterMes.life}}
        .mes-speeed.mes-one 速 {{monsterMes.speed}}
        .mes-speeed.mes-one 特攻 {{monsterMes.atkMagic}}
        .mes-speeed.mes-one -
        .mes-speeed.mes-one 特防 {{monsterMes.defMagic}}
        .mes-speeed.mes-one -
        div(style="clear:both;")
      .skill-block
        el-tooltip( effect="light" placement="right-start" v-for="skill in monsterSkill")
          .skill-one()
            .skill-one-name {{skill.name}}
            .skill-one-num {{skill.num}}
            div(style="clear:both;")
          div(style="clear:both;") 
          template(#content)
            .tooltip-block( v-if="skill.name!=='--'")
              .tooltip-text(style="color:#aaa") {{apiMes.getSkillDetailMes(skill.name).name}}
              .tooltip-text {{apiMes.getSkillDetailMes(skill.name).dec}}
              .tooltip-text 消耗点数：{{apiMes.getSkillDetailMes(skill.name).cost}}
            .tooltip-block( v-if="skill.name ==='--'") 暂无信息
        div(style="clear:both;")
      .skill-tip (技能名-cost)
    .right-block
      .right(style="width:100%;height:100%;position:relative;")
        .right-title ...选择出场的怪兽
        .right-tip (评级/名称/属性/体型)
        .right-monster(v-for="monster in props.myMonsterList_" @click="choiceMonster(monster)")
          .right-monster-border(:style="(monster.name === monsterMes.name)?'background:#eee;':''")
            .monster-total {{api.totalJudge(monster)}}
            .monster-name {{monster.name}}
            img(class="monster-attribute" :src="api.attributeJudge(monster)")
            .monster-size {{monster.size}}
            div(style="clear:both;")
        .right-button(@click="makeSure()") 确认

</template>
<style scoped lang="scss">
.tooltip-block{
  width: 100px;
  background: #fff;
  // border-radius: 4px;
  // padding: 10px;
  // border:1px #eee solid;
  color: #bbb;
}
.tooltip-text{
  font-size: 12px;
}
.selectpage-block{
    width: 100%;
    height: 100%;
    position: relative;
    background: #eee;
}
.left-block{
  position: absolute;
  top: 40px;
  left: 40px;
  width: 200px;
  height: 320px;
  border-radius: 10px;
  background: #fff;
  .left-img{
    width: 180px;
    margin: 10px;
    height: 200px;
    margin-bottom: 4px;
    border-radius: 10px;
    border: 1px #bbb solid;
  }
  .mes-block{
    width: 100%;
    .mes-one{
      float: left;
      font-size: 12px;
      color: #bbb;
      text-indent: 10px;
      width: 25%;
    }
  }
  .skill-block{
    width: 100%;
    margin-top: 4px;
    .skill-one{
      float: left;
      font-size: 12px;
      color: #bbb;
      width: 50%;
      height: 24px;
      line-height: 24px;
      .skill-one-name{
        float: left;
        padding-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 64px;
      }
      .skill-one-num{
        float: right;
        padding-right: 10px;
      }
    }
  }
  .skill-tip{
    color:#bbb;
    font-size: 10px;
    padding: 0px 10px;
    // margin-top: 10px;
  }
}
.right-block{
  position: absolute;
  right: 40px;
  top: 40px;
  width: 200px;
  height: 320px;
  border-radius: 10px;
  background: #fff;
  .right-title{
    font-size: 14px;
    color: #bbb;
    text-align: right;
    padding-right: 10px;
  }
  .right-tip{
    font-size: 10px;
    color: #bbb;
    text-align: right;
    padding-right: 10px;
  }
  .right-monster{
    height: 40px;
    line-height: 40px;
    .right-monster-border{

      .monster-total{
        float: left;
        font-size: 14px;
        color: #bbb;
        padding: 0px 10px;
      }
      .monster-name{
        float: left;
        font-size: 12px;
        color: #bbb;
      }
      .monster-attribute{
        float: left;
        font-size: 12px;
        color: #bbb;
        width: 10px;
        height: 10px;
        padding: 15px 4px;
      }
      .monster-size{
        float: left;
        font-size: 10px;
        color: #bbb;
      }
    }
    .right-monster-border:hover{
      border: 1px #eee solid;
    }
  }
  .right-monster:hover{
    padding: 0px 10px;
    margin: 4px 0px;
  }
  .right-button{
    position: absolute;
    bottom: 4px;
    right: 4px;
    color: #fff;
    background: #bbb;
    border-radius: 4px;
    border: 1px #eee solid;
    z-index: 10;
    font-size: 16px;
    padding: 4px 10px;
    cursor: pointer;
  }
}
</style>