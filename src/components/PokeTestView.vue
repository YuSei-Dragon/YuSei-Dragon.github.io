<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
  watchEffect,
  defineEmits,
  nextTick,
//   defineExpose,
} from 'vue'

import {useStore} from 'vuex'
const store = useStore()
const count = computed(()=>store.state.count)
const usingList = computed(()=>store.state.usingList)
const botLiveNumNow1 = computed(()=>store.state.botLiveNumNow)
const myLiveNumNow1 = computed(()=>store.state.botLiveNumNow)
const IisEnd = computed(()=>store.state.IisEnd)
const myList = computed(()=>store.state.myList)
const BotisEnd = computed(()=>store.state.BotisEnd)

const emit = defineEmits(['init','megetFirst','checkAll','checkUsingList','sortMyCards','sortBotCards','end','checkMyAllCards','checkBotAllCards','botTurn'])

const props = defineProps({
    myLiveNumNow_:{
        type:Number,
        default:20,
    } ,
    botLiveNumNow_:{
        type:Number,
        default:20
    },
    myCardsList_:{
        type:Array,
        default:[],
    } ,
    uCardsList_:{
        type:Array,
        default:[],
    }

})
onMounted(() => {
  init()
  setMouse(myCards.value)
  setMouse(botCards.value)
})


const myLiveLength = ref(280)
const botLiveLenght = ref(480)
const botLiveNum = ref(20)
const myLiveNum = ref(20)
const botLiveNumNow = ref(20)
const myLiveNumNow = ref(20)
const botCardsList = ref([])
const myCardsList = ref([])
const myCards = ref(null)
const botCards = ref(null)
const useCardList = ref([])
const isShowButtons = ref(false)
const showSkillsWidth = ref(0)
const skillsList = ref([])
const usingCardList = ref([])
const isShowUsingCard = ref(true)
const lifeChangeNUm = ref(0)
const lifeWho = ref("bot")
const iEndTurn = ref(false)
const myBlockLong = ref(428)

// watch(props.myCardsList_,(newValue,oldValue)=>{
//     console.log("myCardsList_ 变化",newValue)
//     myCardsList.value = newValue
// },{immediate: true,deep:true})

// defineExpose({useCardList})
//父子传值有限制，使用vuex更方便

const init = (()=>{
    console.log("触发了init方法")
    emit('init')
    // emit("sortMyCards")
    // emit("sortBotCards")
    myCardsList.value = props.myCardsList_
    botCardsList.value = props.uCardsList_

    //双方进行排序
    //初始化双方 成功

    if(Math.random()>0.5){
        //直接决定先攻
        IstartGame()
        
    }else{
        botStartTrun()
        //电脑回合

    }
    

    //调用父组件的init方法
    // botCardsList.value = [
    // {num:1,type:'hongtao'},
    // {num:2,type:'hongtao'},
    // {num:3,type:'hongtao'},
    // {num:3,type:'heitao'},
    // {num:3,type:'meihua'},
    // {num:3,type:'fangkuai'},
    // {num:4,type:'hongtao'},
    // {num:5,type:'hongtao'},
    // {num:6,type:'hongtao'},
    // {num:6,type:'heitao'},
    // ]
    // // myCardsList.value = [
    // // {num:1,type:'hongtao'},
    // // {num:2,type:'hongtao'},
    // // {num:3,type:'hongtao'},
    // // {num:3,type:'heitao'},
    // // {num:3,type:'meihua'},
    // // {num:3,type:'fangkuai'},
    // // {num:4,type:'hongtao'},
    // // {num:5,type:'hongtao'},
    // // {num:6,type:'hongtao'},
    // // {num:6,type:'heitao'},
    // // {num:1,type:'hongtao'},
    // // {num:2,type:'hongtao'},
    // // {num:3,type:'hongtao'},
    // // {num:3,type:'heitao'},
    // // {num:3,type:'meihua'},
    // // {num:3,type:'fangkuai'},
    // // {num:4,type:'hongtao'},
    // // {num:5,type:'hongtao'},
    // // {num:6,type:'hongtao'},
    // // {num:6,type:'heitao'},
    // // ]
    // myCardsList.value.map(item=>{
    //     item.choice = false
    //     return item
    // })
    // skillsList.value = ['制衡']
    // usingCardList.value = [
    // {num:1,type:'hongtao'},
    // {num:2,type:'hongtao'},
    // {num:3,type:'hongtao'},
    // {num:3,type:'heitao'},
    // {num:3,type:'meihua'},
    // ]
    // lifeChangeNUm.value = 10
    // console.log("使用了init更新方法",myCards.value)
    
    //手动刷新我的牌组
})

const checkCanDo=((list)=>{
    console.log(list)
    emit("checkMyAllCards")
    //检查一次能不能动
})

const endGame = (()=>{

})
const getBotLive = (()=>{
    return "width:" + botLiveLenght.value + "px;"
})
const getBotLiveLong = ((num)=>{
    return 480*num/20
})
const getMyLive = (()=>{
    return "height:" + myLiveLength.value*myLiveNumNow1/20 + "px;top:-"+myLiveLength.value*myLiveNumNow1/20 + "px;"
})
const test = (()=>{
    console.log("测试vuex",count.value)
    store.commit("changeUsingList",[1,2,3])
    console.log(usingList.value)
    console.log
    myLiveLength.value = 0
    botLiveLenght.value = 0

    botCardsList.value = [
    {num:1,type:'hongtao'},
    {num:2,type:'hongtao'},
    {num:3,type:'hongtao'},
    {num:3,type:'heitao'},
    {num:3,type:'meihua'},
    {num:3,type:'fangkuai'},
    {num:4,type:'hongtao'},
    {num:5,type:'hongtao'},
    {num:6,type:'hongtao'},
    {num:6,type:'heitao'},
    {num:1,type:'hongtao'},
    {num:2,type:'hongtao'},
    {num:3,type:'hongtao'},
    {num:3,type:'heitao'},
    {num:3,type:'meihua'},
    {num:3,type:'fangkuai'},
    {num:4,type:'hongtao'},
    {num:5,type:'hongtao'},
    {num:6,type:'hongtao'},
    {num:6,type:'heitao'},
    ]
    isShowUsingCard.value = !isShowUsingCard.value
    // botCardsList.value = []
    lifeWho.value = "me"

})
const getLiveColor = ((num)=>{
    let color = "color:"
    if(num>12){
        color+="#24c636;"
    }else if(6<num && num <=12){
        color+="#e3ad06"
    }else{
        color+="#e30606"
    }
    return color
})
const checkCardsNum = ((length,canKeep)=>{
    if(length>(canKeep)){
        return "color:#e30606"
    }else{
        return "color:#24c636;"
    }
})
const setMouse = ((container)=>{
    let tabsContainer = container
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    tabsContainer.addEventListener('mousedown', function (e) {
        isMouseDown = true;
        startX = e.pageX - tabsContainer.offsetLeft;
        scrollLeft = tabsContainer.scrollLeft;
    });

    tabsContainer.addEventListener('mouseleave', function () {
        isMouseDown = false;
    });

    tabsContainer.addEventListener('mouseup', function () {
        isMouseDown = false;
    });

    tabsContainer.addEventListener('mousemove', function (e) {
        if (!isMouseDown) return;
        e.preventDefault();
        let x = e.pageX - tabsContainer.offsetLeft;
        let walk = (x - startX) * 1; // 调整滚动速度
        tabsContainer.scrollLeft = scrollLeft - walk;
    });
})
//鼠标的web拖动方法

const getCardColor = ((item)=>{
    let style = ''
    if(item.choice==true){
        style+="background:rgb(149 238 247);"
    }
    if(item.type=="hongtao"||item.type=="fangkuai"){
        style+= "color:#f00;"
    }else{
        style+= "color:#000;"
    }
    return style
})

const getCardType = ((item)=>{
    if(item.type == "hongtao"){
        return "♥"
    }else if(item.type == "heitao"){
        return "♠"
    }else if(item.type == "meihua"){
        return "♣"
    }else{
        return "♦"
    }
})

const choiceCard =((item)=>{
    myCardsList.value.map(item1=>{
        if(item1==item){
            if(item1.choice==false){
                item1.choice = true
                useCardList.value.push(item1)
                //加入进行判定的数组
            }else{
                item1.choice = false
                //从参加判定的数组中移出
            }
        }
        return item1
    })
    let isShow = false
    myCardsList.value.forEach(item=>{
        if(item.choice==true){
            isShow = true
        }

    })
    isShowButtons.value = isShow
})

const sureUseCard=(()=>{
    // emit('checkAll')
    console.log(useCardList.value)
    store.commit("changeUsingList",useCardList.value)
    //设置全局 usingList 当前企图使用的组合
    //把数据传到全局上，再通过调用外面的方法进行处理
    console.log(usingCardList.value)
    //myCardsList 是用来展示当前使用的组合的

    emit('checkUsingList')
    //检查用牌是否正规
    myCardsList.value = myList.value
    //设置当前手牌
    // botLiveNumNow.value = props.botLiveNumNow_
    botLiveNumNow.value = botLiveNumNow1.value
    console.log(botLiveNumNow.value)
    botLiveLenght.value = getBotLiveLong(botLiveNumNow.value)
    //更新操作完后bot的血量变化
    usingCardList.value = useCardList.value

    usingCardList.value.map(item=>{
        item.choice = false
        return item
    })//清空卡牌选中
    nextTick(()=>{
        setTimeout(()=>{
            isShowUsingCard.value = !isShowUsingCard.value
        },500)
    })
    myCardsList.value.map(item=>{
        item.choice = false
        return item
    })//清空卡牌选中
    useCardList.value = []
    //清除选取的牌 的缓存
    isShowButtons.value = false
    //关闭按钮

    usedCards()

    checkCanDo(myCardsList.value)
    if(IisEnd.value){
        endMyTrun()
    }

})

const usedCards= (()=>{
    iEndTurn.value = true
    myBlockLong.value = 0
    setTimeout(()=>{
        iEndTurn.value = false
    },2000)
    setTimeout(()=>{
        myBlockLong.value = 428
    },500)
})

const endMyTrun = (()=>{
    console.log("结束我的回合")
    botStartTrun()
})

const IstartGame = (()=>{
    store.commit("IshouldEnd",false)
        //打开我的回合限制
        emit('megetFirst')
        nextTick(()=>{
            myCardsList.value = props.myCardsList_
            //抽卡刷新手卡
            //等页面刷新完再提取数据
            // console.log(myCardsList.value)
            checkCanDo(myCardsList.value)
            if(IisEnd.value){
                endMyTrun()
            }
        })
})

const botStartTrun = (()=>{
    store.commit("BotshouldEnd",false)
    console.log("电脑的回合开始")
    emit('botgetFirst')
        //电脑进行抽卡
        nextTick(()=>{
            console.log(botCardsList.value)
            botCardsList.value = props.uCardsList_
            const botTurn = setInterval(()=>{
                emit("checkBotAllCards")
                if(BotisEnd.value){
                    clearInterval(botTurn)
                    //如果没有可操作的方式，就结束回合
                }else{
                    emit('botTurn')
                    myLiveNumNow.value = myLiveNumNow1.value
                }
            },2000)

        })
})

const cancelUseCard=(()=>{
    useCardList.value = []
    //取消选取的牌
    myCardsList.value.map(item=>{
        item.choice = false
        return item
    })//清空卡牌选中
    isShowButtons.value = false
    //关闭按钮
})

const useSkill = (()=>{
    if( showSkillsWidth.value == 0){
        showSkillsWidth.value = 80
    }else{
        showSkillsWidth.value = 0
    }
}) 

const trunAround = ((item)=>{
    let result =  getCardColor(item)
    if(isShowUsingCard.value){
      result += "transform: rotateY(180deg);"  
    }
    return result
})

const getUsingOpacity =(()=>{
    if(!isShowUsingCard.value){
        return "opacity:1;"
    }else{
        return
    }
})

const getLifeStyle=(()=>{
    let result =''
    if(lifeWho.value == "bot"){
        result+="top:0px;left:300px;"
    }else{
        result+="top:100px;right:40px;"
    }
    if(lifeChangeNUm.value>0){
        result+="color: rgb(36, 198, 54);"
    }else{
        result+="color: #ff5959;"
    }
    return result
})

const getLifeChangeNum = ((item)=>{
    if(item>0){
        return '+'+item
    }else{
        item
    }
})

const getMyCardsBlock = (()=>{
    return "width:"+myBlockLong.value+"px;"
})

</script>

<template>
    <div class="background">
        <div class="bot-block">
            <div class="head"></div>
            <div class="live" :style="getBotLive()"></div>
            <div class="bot-live-text" :style="getLiveColor(botLiveNumNow)">{{botLiveNumNow}}/{{botLiveNum}}</div>
            <div class="bot-cards-block" ref="botCards">
                <div class="cards-block" :style="'width:'+botCardsList.length*32+'px;'">
                    <div class="bot-cards" v-for="(item,index) in botCardsList" :key="index"></div>
                </div>
            </div>
            <div class="bot-cards-num" :style="checkCardsNum(botCardsList.length,25-botLiveNumNow)">{{botCardsList.length}}/{{25-botLiveNumNow}}</div>
        </div>
        <div class="right-top-corner">
            <div class="start-game" @click="init()">开始</div>
            <div class="end-game" @click="endGame()">结束</div>
        </div>
        <div class="game-block">
            <div class="using-cards-block">
                <div class="using-card" v-for="(item,index) in usingCardList" :key="index" :style="trunAround(item)" >
                    <div  class="using-num" :style="getUsingOpacity()">{{item.num}}</div>
                    <div  class="using-type" :style="getUsingOpacity()">{{getCardType(item)}}</div>
                </div>
            </div>
            <div class="life-change" v-show="lifeChangeNUm!==0" :style="getLifeStyle()">{{getLifeChangeNum(lifeChangeNUm)}}</div>
            <div class="iEndTurn" v-show="iEndTurn">结束回合</div>
        </div>
        <div class="skill-block" :style="'width:'+ showSkillsWidth +'px;'">
            <div class="skill-text" v-for="(item,index) in skillsList" :style="'opacity:'+ showSkillsWidth/80 +';'" :key="index" >{{item}}</div>
        </div>
        <div class="my-block">
            <div class="sure-button"  @click="sureUseCard()" v-show="isShowButtons">确认</div>
            <div class="cancel-button" @click="cancelUseCard()" v-show="isShowButtons">取消</div>
            <div class="head">
                <div class="skill" @click="useSkill()">使用技能</div>
                <div class="endTurn" @click="endMyTrun">结束回合</div>
            </div>
            <div class="my-live" :style="getMyLive()"></div>
            <div class="my-cards-block" ref="myCards" :style="getMyCardsBlock()">
                <div class="cards-block" :style="'width:'+myCardsList.length*50+'px;'">
                    <div class="my-cards" v-for="(item,index) in myCardsList" :key="index" :style="getCardColor(item)" @click="choiceCard(item)">
                        <div class="card-number" >{{item.num}}</div>
                        <div class="card-type">{{getCardType(item)}}</div>
                    </div>
                </div>  
            </div>  
            <div class="my-live-text" :style="getLiveColor(myLiveNumNow)">{{myLiveNumNow}}/{{myLiveNum}}</div>

        </div>
        <div class="my-cards-num" :style="checkCardsNum(myCardsList.length,25-myLiveNumNow)">{{myCardsList.length}}/{{25-myLiveNumNow}}</div>
        <button @click="test">test</button>
    </div>
</template>

<style scoped>
.background{
    width: 600px;
    height: 400px;
    background: #eee;
    position: relative;
}
.bot-block{
    width: 100%;
    height: 80px;
    position: relative;
}
.head{
    width: 80px;
    height: 80px;
    background: #fcfcfc;
    float: left;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
}
.skill{
    font-size: 14px;
    height: 30px;
    padding: 5px;
    line-height: 30px;
    text-align: center;
    color: #2eb9e1;
    font-weight: bold;
    cursor: pointer;
}
.skill:hover{
    font-size: 16px;
}
.endTurn{
    font-size: 14px;
    height: 30px;
    padding: 5px;
    line-height: 30px;
    text-align: center;
    color: #ff5959;
    font-weight: bold;
    cursor: pointer;
}
.endTurn:hover{
    font-size: 16px;
}
.live{
    width: 480px;
    height: 10px;
    background: #ffafaf;
    float: left;
    transition: all 0.5s ease-out;
    position: absolute;
    top: 0;
    left: 80px;

}
.bot-live-text{
    float: left;
    padding: 10px;
    position: relative;
    font-weight: bold;
    margin-top: 10px;
}
.bot-cards-block{
    margin: 13px;
    margin-top: 23px;
    width: 380px;
    border-radius: 4px;
    height: 40px;
    background: #fafafa;
    float: left;
    overflow-x: auto;
    overflow-y: hidden;
    white-space:nowrap;
}
.bot-cards-block::-webkit-scrollbar{
    display: none;
}
.cards-block{
    min-width: 100%;
    white-space:nowrap;
    height: 100%;
}
.bot-live-text::before{
    content: " ";
    border-right:1px solid #fff ;
    border-bottom:1px solid #fff ;
    height: 20px;
    width: 20px;
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
}
.bot-cards{
    float: left;
    margin: 5px 6px;
    height: 30px;
    width: 20px;
    background: #ddd;
}
.bot-cards-num{
    position: absolute;
    top: 50px;
    left: 90px;
    font-size: 14px;
}
.right-top-corner{
    position: absolute;
    height: 40px;
    width: 40px;
    top: 0;
    right: 0;
    background: #fff;
}
.start-game{
    font-size: 12px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    color: rgb(36, 198, 54);
    font-weight: bold;
    border-right: 1px solid rgb(36, 198, 54);
    transition: 0.3s;
    cursor: pointer;
}
.start-game:hover{
    border: none;
    font-size: 13px;
}
.end-game{
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #ff5959;
    font-weight: bold;
    border-left: 1px solid #ff5959;
    transition: 0.3s;
    cursor: pointer;
}
.end-game:hover{
    border: none;
    font-size: 13px;
}
.game-block{
    width: 100%;
    height: 240px;
    position: relative;
}
.using-cards-block{
    position: absolute;
    top: 60px;
    width: 400px;
    height: 100px;
    left: 100px;
    background: #fff;
    border-radius: 5px;
}
.using-card{
    height: 90px;
    width: 60px;
    float: left;
    margin: 5px 10px;
    background: #e7e7e7;
    border-radius: 3px;
    transition: 0.3s;
}
.using-num{
    font-size: 16px;
    padding-left: 4px;
    transition: 0.5s;
    opacity: 0;
}
.using-type{
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    transition: 0.5s;
    opacity: 0;
}
.life-change{
    font-size: 20px;
    position: absolute;
}
.iEndTurn{
    position: absolute;
    font-size: 16px;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
}
.skill-block{
    position: absolute;
    top: 80px;
    left: 0;
    width: 0px;
    height: 240px;
    transition: 0.3s;
    background: #effafc;
}
.skill-text{
    cursor: pointer;
    width: 80px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    padding: 5px 0;
    border-bottom: 1px solid red;
    overflow: hidden;
    transition: 0.3s;
}
.my-block{
    width: 100%;
    height: 80px;
    position: relative;
}
.sure-button{
    position: absolute;
    top: -25px;
    right: 130px;
    color: rgb(36, 198, 54);
    cursor: pointer;
}
.sure-button:hover{
    border-top: 1px solid rgb(36, 198, 54);
}
.cancel-button{
    position: absolute;
    top: -25px;
    right: 80px;
    color: red;
    cursor: pointer;
}
.cancel-button:hover{
    border-top: 1px solid red;
}
.my-live{
    width: 10px;
    height: 280px;
    background: #ffafaf;
    position: absolute;
    top: -280px;
    right: 0;
    transition: all 0.5s ease-out;
}
.my-live-text{
    float: right;
    padding: 10px;
    position: relative;
    font-weight: bold;
}
.my-live-text::before{
    content: " ";
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    height: 20px;
    width: 20px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}
.my-cards-block{
    float: left;
    margin-left: 13px;
    width: 428px;
    height: 70px;
    border-radius: 5px;
    background: #fafafa;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    white-space:nowrap;
    transition: 0.2s;
}
.my-cards-block::-webkit-scrollbar{
    display: none;
}
.my-cards{
    float: left;
    margin: 7px 6px;
    height: 56px;
    width: 38px;
    background: #ddd;
}
.my-cards-num{
    position: absolute;
    bottom: 22px;
    right: 25px;
    font-size: 14px;
}
.card-number{
    font-size: 14px;
    padding-left: 5px;
}
.card-type{
    text-align: center;
    font-size: 16px;
}
</style>