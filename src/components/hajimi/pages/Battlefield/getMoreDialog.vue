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
    {top:115,left:20},
    {top:115,left:120},
    {top:115,left:220},
])

const allMes = ref({})
onMounted(()=>{
    init()
})
const threeCardList = ref([])
const init = ()=>{
    allMes.value = props.allMes
    let cardList = []
    allMes.value.cardList.forEach((item,index)=>{
        if(index<3){
            // if(index == 0){
            //     seeStartCard1.value = {
            //         ...item,
            //         top:25,
            //         left:20,
            //     }
            // }else if(index == 1){
            //     seeStartCard2.value = {
            //         ...item,
            //         top:25,
            //         left:120,
            //     }
            // }else{
            //     seeStartCard3.value = {
            //         ...item,
            //         top:25,
            //         left:220,
            //     }
            // }
            threeCardList.value.push(item)
        }else{
            cardList.push(item)
        }
    })//构建观星操作的三张卡
    console.log("得寸进尺的三张卡",threeCardList.value)
    let threeCards = shuffleArray(threeCardList.value)
    seeStartCard1.value = {
        ...threeCards[0],
        top:25,
        left:20,
    }
    seeStartCard2.value = {
        ...threeCards[1],
        top:25,
        left:120,
    }
    seeStartCard3.value = {
        ...threeCards[2],
        top:25,
        left:220,
    }
    allMes.value.cardList = cardList

}
const shuffleArray = (array) =>{
    // 创建数组的副本，避免修改原数组
    const shuffled = [...array];
    
    // 从最后一个元素开始，向前遍历
    for (let i = shuffled.length - 1; i > 0; i--) {
        // 生成一个0到i之间的随机索引
        const j = Math.floor(Math.random() * (i + 1));
        
        // 交换元素
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}//随机打乱数组
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
    // {top:115,left:20},
    // {top:115,left:120},
    // {top:115,left:220},
    if((card.top===115&&card.left===20)&&card.name === threeCardList.value[0].name){
        allMes.value.allMesMy.handCardList.push(getClearUsed(card))
    }else if((card.top===115&&card.left===120)&&card.name === threeCardList.value[1].name){
        allMes.value.allMesMy.handCardList.push(getClearUsed(card))
    }else if((card.top===115&&card.left===220)&&card.name === threeCardList.value[2].name){
        allMes.value.allMesMy.handCardList.push(getClearUsed(card))
    }else{
        allMes.value.cardUsedList.push(getClearUsed(card))
    }
    //猜对顺序的卡加入手卡
}
const getClearUsed = (item)=>{
    return {
        id: item.id,
        name: item.name,
        desc:item.desc,
        type:item.type,
        scene:item.scene,
        speed:item.speed,
        cost: item.cost,
        num:item.num,
    }
}//获取清理后的回收卡牌
const emit = defineEmits(['closeGetMore'])
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
        emit("closeGetMore",allMes.value)
    }
    
}
</script>

<template lang="pug">
.see-start
    .see-card-title 得寸进尺
    .see-card-place(:style="getCardPosition(95,20)") 待排序
    .see-card-place(:style="getCardPosition(185,20)") 排序
    .see-start-cardlist-one(:style="getCardPosition(25,20)" :class="checkHighLight(25,20) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(25,120)" :class="checkHighLight(25,120) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(25,220)" :class="checkHighLight(25,220) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(115,20)" :class="checkHighLight(115,20) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(115,120)" :class="checkHighLight(115,120) ? 'highlight' : ''")
    .see-start-cardlist-one(:style="getCardPosition(115,220)" :class="checkHighLight(115,220) ? 'highlight' : ''")
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
        top: 195px;
        right: 20px;
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