<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
  watchEffect,
  defineEmits,
  nextTick,
  defineAsyncComponent,
//   defineExpose,
} from 'vue'
import method from './Monster2_components/method'
import cardMethod from "./Monster2_components/method"
const CardGround = defineAsyncComponent(() =>
  import("./Monster2_components/CardGround.vue")
)
const CardGroundRef = ref()
//OK, this time i have another throught that , let the monster have physical strength
//to limit what they can do in one turn.
//wish the card u want can be draw from the desk is very nice part ,and ex area is good
//i have a new idea "random monster" , a monster will appear in the area , both u can 
//have chance to get it fight for u .
//"random monster " is decide by the map, yes ,every time before the game start,
//we must choice a map we play , and we can change our desk after it
//diff map have diff effect, after few turn , "random monster" will appear in the map ,
//he wont attack both two of u, but he will stand between u, u have to fight with it,
//after u defeat it ,u can get strong affect,but it is not easy to defeat it.

//and like the physical strength , i have another idea : power
//ur monster must spend their power to use their ability,physical strength decide how
//many time they can fight. 
//both two will restore when every turn start
//a monster will hight attack , should use same physical strength to make the attack
//if widthout enouth physical strength ,they cant attack ,and even cant defense
//so before u ask ur monster to fight ,think about how could u protect it next turn
//every monster have diff restore ability ,so hight attack not only way to win
//we will begin in 20cards ,and then we will try more cards in a desk

//still , i want to use ur own blood to limit one turn monster u call （24 blood）
//every turn we get 8 blood
//if u want to summon a monster with starts more than 4 ,we must immolate a monster 
//which with starts more than half of monster's start we summon

const monsterList = ref([])
monsterList.value = cardMethod.getMyDesk()
const myDesk = ref([])
const itsDesk = ref([])
const myHandCardList = ref([])
const itsHandCardList = ref([])

const myMonsterGround = ref([])
const itsMonsterGround = ref([])

const myPloyGround = ref([])
const itsPloyGround = ref([])

const myGraveyard = ref([])
const itsGraveyard = ref([])

const myBlood = ref(30)
const itsBlood = ref(30)

const inputCommand = ref("")
const disabled = ref(false)
const useState = ref("")
const todo = ref({})
const summonMonster = ref({})
const equipMes = ref({})
const chainList = ref([])
const banList = ref([])
onMounted(()=>{
    init()
})
const myDrawCard = ((num=0)=>{
    if(myDesk.value.length<num){
        console.log("game over. 牌库抽空了")
    }else{
        if(num!=0){
            let deskList = []
            myDesk.value.forEach((item,index)=>{
                if(index>=num){
                    deskList.push(item)
                }else{
                    myHandCardList.value.push(item)
                }
            })
            myDesk.value = deskList
            //更新我的牌组和手卡
            console.log("我抽了"+num+ "张卡")
        }
    }
})
//我的抽卡方法
const itsDrawCard = ((num=0)=>{
    if(itsDesk.value.length<num){
        console.log("game over. 牌库抽空了")
    }else{
        if(num!=0){
            let deskList = []
            itsDesk.value.forEach((item,index)=>{
                if(index>=num){
                    deskList.push(item)
                }else{
                    itsHandCardList.value.push(item)
                }
            })
            itsDesk.value = deskList
            //更新bot的牌组和手卡
            console.log("bot抽了"+num+ "张卡")
        }
    }
})
//bot的抽卡方法
const showAllSituation = (()=>{
    // showCardsName("对方手牌",itsHandCardList.value)
    showCardsName("对方前场",itsMonsterGround.value)
    showCardsName("对方后场",itsPloyGround.value)
    showCardsName("对方墓地",itsGraveyard.value)
    showCardsName("我方前场",myMonsterGround.value)
    showCardsName("我方后场",myPloyGround.value)
    showCardsName("我方手卡",myHandCardList.value)
    showCardsName("我方墓地",myGraveyard.value)
})
//展示所有信息
const showCardsName = ((name,list,indexList=[])=>{
    console.log(name+ "为：")
    let result = ""
    list.forEach((item,index)=>{
        if(indexList.indexOf(String(index)==-1)){
            result+= (index + item.name+'  ')
        }
    })
    console.log(result)
})
//查看某个地方的卡牌情况
const myTurn = (()=>{
    console.log("it is my turn!")
    showCardsName("我方手卡",myHandCardList.value)
    //等待输入指令
})
//我的回合
const botTurn = (()=>{
    console.log("it is bot turn!")
    //完成所有能动的操作
    setTimeout(()=>{
        myTurn()
    },500)
})
//bot的回合
const startGame = (()=>{
    console.log("game start!")
        setTimeout(()=>{
            if(Math.random()>0.5){
                myTurn()
            }else{
                botTurn()
            }
        },300)
    
})
//开始游戏
const init = (()=>{
    //准备/数据处理
    myDesk.value = outOfOrder(monsterList.value) 
    itsDesk.value = outOfOrder(monsterList.value) 
    myDrawCard(6)
    itsDrawCard(6)
    startGame()
})
//初始化
const outOfOrder = ((list)=>{
    let len = list.length;
    for (let i = 0; i < len - 1; i++) {
        let index = parseInt(Math.random() * (len - i));
        let temp = list[index];
        list[index] = list[len - i - 1];
        list[len - i - 1] = temp;
    }
    return list;
}) 
//打乱数组的排列并返回处理完成的数组
const monsterSummon = ((monster,who,index)=>{
    if(who=="my"){
        myMonsterGround.value.push(monster)
        myBlood.value -= monster.start
        myHandCardList.value = deleteCardByIndex(myHandCardList.value,index)
    }else{
        itsMonsterGround.value.push(monster)
        itsBlood.value -= monster.start
        itsHandCardList.value = deleteCardByIndex(itsHandCardList.value,index)
    }
    checkMonsterSkill(monster,who)
})
//进行怪兽的召唤
const equipMonster = ((equip,who)=>{
    if(who == "my"){
        myPloyGround.value.push(equip)
    }else{
        itsPloyGround.value.push(equip)
    }
})
//进行装备的使用
const checkMonsterSkill = ((monster,who)=>{
    const mesList = getAllMes()
    setAllMes(cardMethod.checkMonsterSkill(
        monster,
        who,
        mesList
    )//传入所有数据，统一打包处理完毕统一更新
    )
})
//检查有没有召唤成功能触发的技能
const showCardsMethod = ((name)=>{
    if(name == 'showall'){
            showAllSituation()
        }else if(name == 'showitshand'){
            showCardsName("对方手牌",itsHandCardList.value)
        }else if(name == 'showitsmonster'){
            showCardsName("对方前场",itsMonsterGround.value)
        }else if(name == 'showitsploy'){
            showCardsName("对方后场",itsPloyGround.value)
        }else if(name == 'showitsgy'){
            showCardsName("对方墓地",itsGraveyard.value)
        }else if(name == 'showmymonster'){
            showCardsName("我方前场",myMonsterGround.value)
        }else if(name == 'showmyploy'){
            showCardsName("我方后场",myPloyGround.value)
        }else if(name == 'showmyhand'){
            showCardsName("我方手卡",myHandCardList.value)
        }else if(name == 'showmygy'){
            showCardsName("我方墓地",myGraveyard.value)
        }
})
//所有的查看方法
const deleteCardByIndex =((list,index)=>{
    let resList = []
    if(Array.isArray(index)){
        list.forEach((item,index1)=>{
            if(index.indexOf(String(index1))==-1){
                resList.push(item)
            }else{
                //通过判断是否相同索引进行删除
            }
        }) 
    }else{
       list.forEach((item,index1)=>{
            if(index1!=index){
                resList.push(item)
            }else{
                //通过判断是否相同索引进行删除
            }
        }) 
    }
    
    return resList
})
//通过index删除数组特定数据
const checkEquipStart = ((name,who)=>{
    const mesList = getAllMes()
    setAllMes(cardMethod.checkEquipStart(name,who,mesList))
})
//检查装备上场时有无可用时点
const getAllMes = (()=>{
    return {
        myMonsterGround: myMonsterGround.value,
        myHandCardList: myHandCardList.value,
        myPloyGround:myPloyGround.value,
        myGraveyard:myGraveyard.value,
        myBlood:myBlood.value,
        myDesk:myDesk.value,
        itsMonsterGround:itsMonsterGround.value,
        itsHandCardList:itsHandCardList.value,
        itsPloyGround:itsPloyGround.value,
        itsGraveyard:itsGraveyard.value,
        itsBlood:itsBlood.value,
        itsDesk:itsDesk.value,
        useState:useState.value,
        banList:banList.value,
        todo:"",
        method:"",
    }
})
//打包所有数据
const setAllMes =((result)=>{
    myMonsterGround.value = result.myMonsterGround
    myHandCardList.value = result.myHandCardList
    myPloyGround.value = result.myPloyGround
    myGraveyard.value = result.myGraveyard
    myBlood.value = result.myBlood
    myDesk.value = result.myDesk
    itsMonsterGround.value = result.itsMonsterGround
    itsHandCardList.value = result.itsHandCardList
    itsPloyGround.value = result.itsPloyGround
    itsGraveyard.value = result.itsGraveyard
    itsBlood.value = result.itsBlood
    itsDesk.value = result.itsDesk
    useState.value = result.useState
    todo.value = result.todo
    banList.value = result.banList
    if(result.method!=""){
        showCardsMethod(result.method)
    }
})
//传入所有数据，统一打包处理完毕统一更新
const checkMagic = ((name,who)=>{
    const mesList = getAllMes()
    const result = cardMethod.checkMagic(name,who,mesList)
    setAllMes(result)
    return result.res
})
//检查魔法卡的发动条件
const makeMagic = ((name,who)=>{
    const mesList = getAllMes()
    setAllMes(cardMethod.makeMagic(name,who,mesList))
})
//发动魔法卡
const cardFinishDiscard = ((todo,who)=>{
    const mesList = getAllMes()
    cardMethod.cardFinishDiscard(todo,who,mesList)
}) 
//完成丢弃触发后的卡牌处理
const getInputText = (( )=>{
    if(useState.value == "wait"){
        //等待选择献祭的怪兽
        const method = inputCommand.value.split(" ")
        if(method[0]=="immolate"){
            let immolateList = []
            method.forEach((item,index)=>{
                if(index>0){
                    immolateList.push(item)
                }
            })//获取要献祭的怪兽的数组
            showCardsName("选择的祭品",myMonsterGround.value,immolateList)
            myMonsterGround.value = deleteCardByIndex(myMonsterGround.value,immolateList)
            showCardsName("我方前场",myMonsterGround.value)
            monsterSummon(summonMonster.value.monster,summonMonster.value.who,summonMonster.value.index)
            showCardsName("我方前场",myMonsterGround.value)
            useState.value = ""
            //重置当前状态
        }else{
            console.log("指令错误")
        }
    }else if(useState.value == 'equip'){
        const method = inputCommand.value.split(" ")
        if(method[0]=="equip"){
            if(method.length>2||method[1]>=myMonsterGround.value.length){
                console.log('输入了错误指令，一张装备卡只能装备一只怪兽')
            }else{
                let equipCard = equipMes.value.equip
                equipCard.equipLinkMonster = myMonsterGround.value[method[1]].name
                equipMonster(equipCard,equipMes.value.who)
                //装备卡加入后场/绑定怪兽
                myHandCardList.value = deleteCardByIndex(myHandCardList.value,equipMes.value.index)
                //删除手牌中使用了的装备卡
                myMonsterGround.value.map((item,index)=>{
                    if(index == method[1]){
                        item.monsterLinkEquip = equipMes.value.equip.name
                    }
                    return item
                })//怪兽绑定装备
                checkEquipStart(equipMes.value.name,equipMes.value.who)
                //检查装备瞬间是否有可用时点
                useState.value = ""
                //重置当前状态
            }
        }else{
            console.log("指令错误")
        }
    }else if(useState.value == "discard"){
        const discard = inputCommand.value.split(" ")
        if(todo.value?.type=="discard"){
            if(discard.length!=todo.value.num-1){
                console.log("丢弃的数量不正确")
            }else{
                discard.forEach((item,index)=>{
                    if(index>0){
                        myHandCardList.value = deleteCardByIndex(myHandCardList.value,item)
                        //删除手牌中丢弃的卡
                        showCardsName("我方手卡",myHandCardList.value)
                        //处理进入墓地效果
                        myGraveyard.value.push(item)
                        //加入连锁延迟处理链
                        chainList.value.push({
                            type:"enterGY",
                            cards:[item]
                        })
                        cardFinishDiscard(todo.value,"my")
                        //完成弃置后方法内对状态已经进行了更新
                    }
                })
            }
        }else{
            console.log("指令错误")
        }
    }else if(useState.value == "choice"){
        const choice = inputCommand.value.split(" ")
        if(todo.value?.type=="choice"){
            if(choice.length<todo.value.num-1){
                console.log("选取的数量过多！")
                //同时处理了数量不足得情况，没得选就不选
            }else{
                choice.forEach((item,index)=>{
                    if(index>0){
                        myHandCardList.value.push(todo.value.list[item])
                        //选中的卡加入手卡
                    }
                })
                todo.value.list.forEach((item,index)=>{
                    if(choice.indexOf(index)){
                        //
                    }else{
                        todo.value.remainingDesk.push(item)
                    }
                })
                myDesk.value = outOfOrder(todo.value.remainingDesk)
                //剩下的卡返回数组并洗切
                useState.value = ""
                //重置当前状态
                // myHandCardList.value = deleteCardByIndex(myHandCardList.value,item)
                //去掉手上发动效果的卡

                showCardsName("我方手卡",myHandCardList.value)
            }
        }else{
            console.log("指令错误")
        }
    }
        else{
        const mes = inputCommand.value.trim()
        showCardsMethod(mes)
        const method = inputCommand.value.split(" ")
        if(method[0] == 'use'){
            // console.log("使用手卡")
            if(method.length>2||method[1]>=myHandCardList.value.length){
                console.log('输入了错误指令，一次只能使用一张手卡')
            }else{
                let useCard = myHandCardList.value[method[1]]
                let res = cardMethod.useCardsCheck(useCard,myBlood.value,myMonsterGround.value)
                useState.value = res.state
                console
                if(useState.value == "summon"){
                    monsterSummon(useCard,"my",method[1])
                    showCardsName("我方前场",myMonsterGround.value)
                    showCardsName("我方手卡",myHandCardList.value)
                }else if(useState.value == "wait"){
                    showCardsName("我方前场",myMonsterGround.value)
                    summonMonster.value = {
                        monster:res.monster,
                        index:method[1],
                        who: "my"
                    }
                    console.log("请选择要献祭的怪兽")
                }else if(useState.value == "equip"){
                    showCardsName("我方前场",myMonsterGround.value)
                    equipMes.value = {
                        equip: res.equip,
                        index:method[1],
                        who: "my"
                    }
                    console.log("请选择你要装备的怪兽")
                }else if(useState.value == "magic"){
                    const cando = checkMagic(useCard.name,"my")
                    //检查是否满足发动条件
                    if(cando){
                        makeMagic(useCard.name,useState.value.who,method[1])
                    }
                }else{
                    console.log("在使用手卡的时候遇到了未知错误！")
                }
            }
        }
    }
    inputCommand.value = ""
    //清空数据框
})
</script>
<template>
    <div class="background">
        <!-- <div class="left-block"></div>
        <div class="right-block">
           <div class="bot-block">
            
            </div>
            <div class="card-ground">
                <CardGround ref="CardGroundRef" />
            </div>
            <div class="my-block">
            
            </div> 
        </div> -->
        <input type="text" @keyup.enter="getInputText" v-model="inputCommand" :disabled="disabled">
        
    </div>
</template>
<style scoped>
.background{
    width: 1600px;
    height: 900px;
    position: relative;
}
.left-block{
    width: 25%;
    height: 100%;
    float: left;
    background: #eee;
}
.right-block{
    width: 75%;
    height: 100%;
    float: left;
}
.bot-block{
    width: 100%;
    height: 20%;
    background: #312828;
}
.card-ground{
    width: 100%;
    height: 60%;
}
.my-block{
    width: 100%;
    height: 20%;
    background: #20232b;
}
</style>