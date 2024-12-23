<script setup>
import cardMethod from "./method"
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from 'vue'
const cardsArea = ref([])
onMounted(()=>{
    init()
})
const init = (()=>{
    cardsArea.value = cardMethod.getCardGroundSetting
    // console.log(cardsArea.value)
})
const getCardsStyle = ((item)=>{
    const result = "background:" + item.backgroundColor + ";"
    // console.log(result)
    return result
})

</script>
<template>
    <div class="background">
        <div class="cards" v-for="(item,index) in cardsArea" :key="index">
            <div class="card-ground" :style="getCardsStyle(item)">
                <div class="card-area"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.background{
    width: 100%;
    height: 100%;
}
.cards{
    width: 20%;
    height: 50%;
    float: left;
}
.card-ground{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
}
.card-area{
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
}
</style>