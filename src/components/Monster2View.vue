<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
import method from './Monster2_components/view-method.js'
const CardsDetail = defineAsyncComponent(() =>
  import("./Monster2_components/Monster2_CardDetail.vue")
)
const ItsBlock = defineAsyncComponent(() =>
  import("./Monster2_components/ItsBlock.vue")
)
const Chain = defineAsyncComponent(() =>
  import("./Monster2_components/Chain.vue")
)
const Record = defineAsyncComponent(() =>
  import("./Monster2_components/Record.vue")
)
const MyBlock = defineAsyncComponent(() =>
  import("./Monster2_components/MyBlock.vue")
)
const something = ref()
const myDesk = ref([])
const itsDesk = ref([])

const myHandCardList = ref([])
const itsHandCardList = ref([])

const myBlood = ref(8000)
const itsBlood = ref(8000)

const myMonsterGround = ref([])
const itsMonsterGround = ref([])

const myGraveyard = ref([])
const itsGraveyard = ref([])

const chainsList = ref([])
const recordList = ref([])
onMounted(()=>{
    init()
})
const init = ()=>{
  itsDesk.value = method.getNoxus()
  myDesk.value = method.getNoxus()
  // myBlood.value -=1000
  // itsDrawCard(15)
  myDrawCard(6)
  // chainsList.value = [1,1,1,1,1,1,1,1,1]
  // recordList.value = [211111111111213,2131222222222,3,1231,321,2,2,2,2,2,3]
}
const itsDrawCard = (num=0)=>{
  const {itsHandCardListValue,itsDeskValue} = method.itsDrawCard(num,itsHandCardList.value,itsDesk.value)
  itsHandCardList.value = itsHandCardListValue
  itsDesk.value = itsDeskValue
}//对方抽卡
const myDrawCard = (num=0)=>{
  const {myHandCardListValue,myDeskValue} = method.myDrawCard(num,myHandCardList.value,myDesk.value)
  myHandCardList.value = myHandCardListValue
  myDesk.value = myDeskValue
}//我方抽卡
const checkMonsterAbility = ({item,fn})=>{
  const result = method.checkMonsterAbility(item,getAllMes())
  setAllMes(result)
  fn(result.checkResult)//回调函数，vue3 emit不支持直接返回值
}//检查怪物效果能否发动
const checkCall = ({item,fn})=>{
  const result = method.checkCall(item,getAllMes())
  setAllMes(result)
  fn(result.checkResult)
}//检查怪兽召唤条件
const call = (item)=>{
  if(item.name == "一些有特殊召唤效果的怪兽"){

  }else{
    if(item.start<=4){
      myMonsterGround.value.push(item)
    }else if(item.start>4&&item.start<=8){
      
    }
  }
}//召唤怪兽
const getAllMes = ()=>{
  let allMes = {
    myDesk:myDesk.value,
    itsDesk:itsDesk.value,
    myHandCardList:myHandCardList.value,
    itsHandCardList:itsHandCardList.value,
    myBlood:myBlood.value,
    itsBlood:itsBlood.value,
    myMonsterGround:myMonsterGround.value,
    itsMonsterGround:itsMonsterGround.value,
    myGraveyard:myGraveyard.value,
    itsGraveyard:itsGraveyard.value,
    chainsList:chainsList.value,
    recordList:recordList.value,
  }
  return allMes
}//获取所有的数据
const setAllMes = (result)=>{
  myDesk.value = result.myDesk
  itsDesk.value = result.itsDesk
  myHandCardList.value = result.myHandCardList
  itsHandCardList.value = result.itsHandCardList
  myBlood.value = result.myBlood
  itsBlood.value = result.itsBlood
  myMonsterGround.value = result.myMonsterGround
  itsMonsterGround.value = result.itsMonsterGround
  myGraveyard.value = result.myGraveyard
  itsGraveyard.value = result.itsGraveyard
  chainsList.value = result.chainsList
  recordList.value = result.recordList
}//设置所有的数据
</script>
<template lang="pug">
    .block
        CardsDetail(class="cardsDetail")
        ItsBlock(class="its-block" :itsCardsList="itsHandCardList" :bloodNum="itsBlood")
        Chain(class="chain-block" :chainsList = "chainsList")
        Record(class="record-block" :recordList = "recordList")
        MyBlock(@checkMonsterAbility="checkMonsterAbility" @checkCall="checkCall" @call="call" class="myblock-block" :myCardsList="myHandCardList" :bloodNum="myBlood" :myDesk="myDesk" :itsDesk="itsDesk" :itsHandCardList="itsHandCardList" :itsBlood="itsBlood" :myMonsterGround="myMonsterGround" :itsMonsterGround="itsMonsterGround" :myGraveyard="myGraveyard" :itsGraveyard="itsGraveyard" :chainsList="chainsList")
</template>
<style scoped>
.block{
    width: 500px;
    height: 400px;
    border: 1px solid #ddd;
    position: relative;
}
.cardsDetail{
    position: absolute;
    top: 0;
    left: 0;
    height: 180px;
    width: 120px;
    border: 1px solid #ccc;
    /* background: #ddd; */
}
.its-block{
    position: absolute;
    top: 0;
    right: 0;
    height: 60px;
    width: 380px;
}
.chain-block{
    position: absolute;
    right: 0;
    top: 60px;
    width: 60px;
    height: 240px;
}
.record-block{
    position: absolute;
    left: 0;
    top: 180px;
    width: 120px;
    height: 120px;
}
.myblock-block{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 500px;
}
</style>