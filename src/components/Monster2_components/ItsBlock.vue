<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  watch,
} from 'vue'
const props = defineProps({
    itsCardsList:{
        type:Array,
        default:[],
    },
    bloodNum:{
        type:Number,
        default:0,
    }

})
const something = ref()
const cardsList = ref([])
watch(props.itsCardsList,(newValue,oldValue)=>{
    console.log("itsCardsList change")
    cardsList.value = newValue
})
watch(props.bloodNum,(newValue,oldValue)=>{
    console.log("itsBloodNum change")
})
onMounted(() => {
  init()
})
const init = ()=>{
    cardsList.value = props.itsCardsList
}
const getCardsListStyle = (index)=>{
    if(props.itsCardsList.length<=6){
        return ""
    }else{
        let style = "position: absolute;"
        const left = (index)*(278/(props.itsCardsList.length-1))
        console.log(left)
        style+="left:"+left+"px;top:0;z-index:"+ (index+1)+";"
        return style
    }
}
const getBloodStyle = ()=>{
    let style="width:"
    if(props.bloodNum>8000){
        style+="100%;" 
    }else{
        style+=props.bloodNum/80 +"%;"
    }
    // console.log(style)
    return style
}
</script>
<template lang="pug">
div
    .block
        .blood-and-cards
            .blood-block
                .blood(:style="getBloodStyle()")
            .cards
                .cards-list(:style="getCardsListStyle(index)" v-for="(item,index) in cardsList" :key="index")
        .head
</template>
<style scoped>
.block{
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
}
.blood-and-cards{
    float: left;
    width: 320px;
    height: 60px;
}
.blood-block{
    width: 100%;
    height: 5px;
}
.blood{
    float: right;
    height: 100%;
}
.blood:hover{
    background: #f4f4f4;
}
.cards{
    width: 100%;
    height: 50px;
    margin-top: 2px;
    /* background: #eee; */
    position: relative;
}
.head{
    float: left;
    width: 60px;
    height: 60px;
    
}
.head:hover{
    background: #eee;
}
.cards-list{
    margin: 0 2px;
    height: 50px;
    float: left;
    width: 40px;
    background: #fff;
    display: block;
}
.cards-list:hover{
    background: linear-gradient(to right, #eee 0%, #fff 100%);
}
</style>