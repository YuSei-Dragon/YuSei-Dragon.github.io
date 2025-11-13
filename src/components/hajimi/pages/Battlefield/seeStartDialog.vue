<script setup>
import {
  computed,
  ref,
  onMounted,
  defineAsyncComponent,
  nextTick,
  defineEmits
} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
const props = defineProps({
    allMes:{
        type:Object,
        default:{},
    },
})
const seeStartCard1 = ref({})
const seeStartCard2 = ref({})
const seeStartCard3 = ref({})
const positionList = ref([
    {top:25,left:20},
    {top:25,left:120},
    {top:25,left:220},
    {top:160,left:20},
    {top:115,left:120},
    {top:115,left:220},
    {top:205,left:120},
    {top:205,left:220},
])

const allMes = ref({})
onMounted(()=>{
    init()
})
const init = ()=>{
    allMes.value = props.allMes
    let cardList = []
    allMes.value.cardList.forEach((item,index)=>{
        if(index<3){
            if(index == 0){
                seeStartCard1.value = {
                    ...item,
                    top:25,
                    left:20,
                }
            }else if(index == 1){
                seeStartCard2.value = {
                    ...item,
                    top:25,
                    left:120,
                }
            }else{
                seeStartCard3.value = {
                    ...item,
                    top:25,
                    left:220,
                }
            }
        }else{
            cardList.push(item)
        }
    })//构建观星操作的三张卡
    allMes.value.cardList = cardList

}
const getCardPosition = (top,left)=>{
    return {
        top:top+'px',
        left:left+'px',
    }
}
const highlightedArea = ref({})
// 当前高亮的目标区域
// 拖动相关状态
const isDragging = ref(false)
const currentCard = ref(null)
// 当前拖动的卡片
const dragOffset = ref({x:0,y:0})
// 拖动偏移量
const startDrag = (event, cardRef) => {
    isDragging.value = true
    currentCard.value = cardRef
    
    const rect = event.target.getBoundingClientRect()
    dragOffset.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
    
    // 添加全局鼠标移动和释放事件监听
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', endDrag)
}// 开始拖动
const handleDrag = (event) => {
    if (!isDragging.value || !currentCard.value) return
    
    const containerRect = document.querySelector('.see-start').getBoundingClientRect()
    
    // 计算新位置
    let newX = event.clientX - containerRect.left - dragOffset.value.x
    let newY = event.clientY - containerRect.top - dragOffset.value.y
    
    // 更新卡牌位置
    currentCard.value.top = newY
    currentCard.value.left = newX
    
    // 检查是否接近目标区域
    checkTargetAreas(newX + 30, newY + 35) // 30和35是卡牌宽高的一半
}// 处理拖动
const checkTargetAreas = (cardCenterX, cardCenterY) => {
    let foundArea = null
    positionList.value.forEach(area => {
        const areaCenterX = area.left + 30
        const areaCenterY = area.top + 35
        
        // 计算卡牌中心与区域中心的距离
        const distance = Math.sqrt(
            Math.pow(cardCenterX - areaCenterX, 2) + 
            Math.pow(cardCenterY - areaCenterY, 2)
        )
        
        // 如果距离小于阈值，则认为接近该区域
        if (distance < 50) { // 50像素的阈值
            foundArea = area
        }
    })
    
    highlightedArea.value = foundArea
    // console.log(highlightedArea.value)
}// 检查是否接近目标区域
const endDrag = () => {
    if (!isDragging.value || !currentCard.value) return
    
    // 如果有高亮区域，则吸附到该区域
    if (highlightedArea.value?.top && highlightedArea.value?.left) {
        currentCard.value.top = highlightedArea.value.top
        currentCard.value.left = highlightedArea.value.left
    }
    
    // 清理状态
    isDragging.value = false
    currentCard.value = null
    highlightedArea.value = {}
    
    // 移除事件监听
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', endDrag)
}// 结束拖动
const checkHighLight = (top,left)=>{
    if(highlightedArea.value?.top&&highlightedArea.value?.left){
        if(top == highlightedArea.value.top && left == highlightedArea.value.left){
        return true
    }
    }
    return false
}
const checkAllSet = (top,left)=>{
    if(top===25&&(left===20||left===120||left===220)){
        return true
    }return false
}
const dealCard = (card)=>{
    if(card.top===160&&(card.left===20)){
        allMes.value.allMesMy.handCardList.push(card)
    }//加入手牌
    if(card.top===115&&(card.left===120||card.left===220)){
        let cardList = []
        cardList.push(card)
        allMes.value.cardList.forEach(item=>{
            cardList.push(item)
        })
        allMes.value.cardList = cardList
        
    }//加入牌堆上方
    if(card.top===205&&(card.left===120||card.left===220)){
        allMes.value.cardList.push(card)
    }//加入牌堆下方
}

const emit = defineEmits(['closeSeeStart'])
const handleSure = ()=>{
    if(checkAllSet(seeStartCard1.value.top,seeStartCard1.value.left)||
    checkAllSet(seeStartCard2.value.top,seeStartCard2.value.left)||
    checkAllSet(seeStartCard3.value.top,seeStartCard3.value.left)){
        store.commit("setBullFightTip","请设置所有牌")
    }else{
        dealCard(seeStartCard1.value)
        dealCard(seeStartCard2.value)
        dealCard(seeStartCard3.value)
        console.log('所有牌都设置好了')
        emit("closeSeeStart",allMes.value)
    }
    
}
</script>

<template lang="pug">
.see-start
    .see-card-title 观星
    .see-card-place(:style="getCardPosition(95,20)") 牌堆
    .see-card-place(:style="getCardPosition(230,20)") 加入手牌
    .see-card-place(:style="getCardPosition(185,120)") 牌堆上方
    .see-card-place(:style="getCardPosition(275,120)") 牌堆下方
    .see-start-cardlist-one(:style="getCardPosition(25,20)" :class="checkHighLight(25,20) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(25,120)" :class="checkHighLight(25,120) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(25,220)" :class="checkHighLight(25,220) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(160,20)" :class="checkHighLight(160,20) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(115,120)" :class="checkHighLight(115,120) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(115,220)" :class="checkHighLight(115,220) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(205,120)" :class="checkHighLight(205,120) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(205,220)" :class="checkHighLight(205,220) ? 'highlight' : ''")
    .see-start-sure(@click="handleSure()") 确认
    .see-start-card(:style="getCardPosition(seeStartCard1.top,seeStartCard1.left)" @mousedown="startDrag($event, seeStartCard1)" :class="{ 'dragging': isDragging && currentCard === seeStartCard1 }")
        .see-start-card-text {{seeStartCard1.name}}
    .see-start-card(:style="getCardPosition(seeStartCard2.top,seeStartCard2.left)" @mousedown="startDrag($event, seeStartCard2)" :class="{ 'dragging': isDragging && currentCard === seeStartCard2 }")  
        .see-start-card-text {{seeStartCard2.name}}
    .see-start-card(:style="getCardPosition(seeStartCard3.top,seeStartCard3.left)" @mousedown="startDrag($event, seeStartCard3)" :class="{ 'dragging': isDragging && currentCard === seeStartCard3 }")  
        .see-start-card-text {{seeStartCard3.name}}
</template>
<style scoped lang="scss">
.see-start{
    width: 100%;
    height: 100%;
    position: relative;
    .see-card-title{
        font-size: 16px;
        color: #666;
        text-align: center;
    }
    .see-card-place{
        font-size: 14px;
        color: #999;
        position: absolute;
    }
    .see-start-cardlist-one{
        width: 60px;
        height: 70px;
        position: absolute;
        border-radius: 4px;
        border: 1px solid #D9D9D9;
    }
    .highlight{
        background-color: #f6eeeea8;
    }
    .see-start-sure{
        position: absolute;
        top: 260px;
        left: 20px;
        color: #999;
        border-radius: 4px;
        border: 1px solid #999;
        padding: 4px 10px;
        cursor: pointer;
    }
    .see-start-card{
        width: 60px;
        height: 70px;
        position: absolute;
        background-color: #F5F5F5;
        border-radius: 4px;
        cursor: move;
        user-select: none;
        transition: transform 0.1s ease;
        z-index: 1;
        border-radius: 4px;&:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        &.dragging {
            opacity: 0.8;
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        .see-start-card-text{
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
        
}
</style>