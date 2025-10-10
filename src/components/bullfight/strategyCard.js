let strategyCard = [
    //金属性能力 -速度
    {name:"强袭",type:"",attribute:"金",
        dec:"我方本回合攻击不可闪避",
        condition:"aaa",
        cost:5,
    },
    {name:"锐利",type:"",attribute:"金",
        dec:"本回合对方防御力大幅下降",
        condition:"aaabb",
        cost:10,
    },
    {
        name:"困兽之斗",type:"",attribute:"金",
        dec:"本回合双方怪兽攻击不可闪避",
        condition:"aa",
        cost:3,
    },

    //木属性能力 -回血
    {name:"再生",type:"",attribute:"木",
        dec:"小幅恢复生命值",
        condition:"aaa",
        cost:5,
    },
    {name:"吸收",type:"",attribute:"木",
        dec:"本回合对方造成伤害变为增加我方生命值",
        condition:"aaabb",
        cost:10,
    },
    {name:"年轮",type:"",attribute:"木",
        dec:"为自身回复一定血量，手卡越多回复越多,每一张回10",
        condition:"aa",
        cost:3,
    },

    //水属性能力 -刷牌
    {name:"源源不绝",type:"",attribute:"水",
        dec:"摸两张",
        condition:"aaa",
        cost:5,
    },
    {name:"断源",type:"",attribute:"水",
        dec:"丢弃我方所有手卡，弃置对方一张策略卡",
        condition:"aaabb",
        cost:10,
    },
    {name:"涌泉",type:"",attribute:"水",
        dec:"展示牌堆最上面的卡，如果不是红桃，则加入手卡并重复此流程，直到展示的卡为红桃或展示了5张卡,对方抽取同样数量的卡",
        condition:"aa",
        cost:3,
    },

    //火属性能力 -攻击
    {name:"灼烧",type:"",attribute:"火",
        dec:"攻击时额外造成10%当前生命值伤害",
        condition:"aaa",
        cost:5,
    },
    {name:"火烧连营",type:"",attribute:"火",
        dec:"本回合双方收到伤害翻倍",
        condition:"aaabb",
        cost:10,
    },
    {name:"熔岩",type:"",attribute:"火",
        dec:"为敌方造成3回合易损和重伤baff",
        condition:"aa",
        cost:3,
    },

    //土属性能力 -防御
    {name:"城墙",type:"",attribute:"土",
        dec:"本回合中幅提高防御",
        condition:"aaa",
        cost:5,
    },
    {name:"王车易位",type:"",attribute:"土",
        dec:"本回合我方怪兽攻击力和防御力互换",
        condition:"aaabb",
        cost:10,
    },
    {name:"敲山震虎",type:"",attribute:"土",
        dec:"本回合对方攻击力和防御力互换",
        condition:"aa",
        cost:3,
    },

]
let transfrom = {
    noMiss : "攻击不可闪避",
    atkPercentage10 : "攻击时额外造成10%当前生命值伤害",
    atkDouble : "本回合攻击伤害翻倍",
    changeATKandDEF : "本回合我方怪兽攻击力和防御力互换",
    haveChangeATKandDEF : "已经转换攻防",
    defLowBig : "本回合对方防御力大幅下降",

    defStrongMid : "本回合中幅提高防御",
   
    healLittle : "小幅恢复生命值",
    absorb : "本回合对方造成伤害变为增加我方生命值",
    healWithCards : "为自身回复一定血量，手卡越多回复越多,每一张回10",

    getCards : "摸两张",
    cutSource : "丢弃我方所有手卡，弃置对方一张策略卡",
    getCardDraw : "展示牌堆最上面的卡，如果不是红桃，则加入手卡并重复此流程，直到展示的卡为红桃或展示了5张卡,对方抽取同样数量的卡",
    
    defVulnerable : "易损baff",
    healHard : "重伤baff",
}
import pokeApi from "./pokeList"
export default {
    getOneStrategy(){
        //从所有的测量卡中随机拿一张返回
        let result = strategyCard
        result = result.sort(()=>{
            return (0.5-Math.random())
        })//二次打乱
        return result[0]
    },//随机那一张策略卡
    getStrategyByName(name){
        let res = {}
        strategyCard.forEach(item=>{
            if(name === item.name)
                res = item
        })
        return res
    },
    checkStrategy(list,condition){
        // console.log(list,condition)
        if(condition === "aa"){
            let res = false
            let numList=[]
            list.forEach(item=>{
                let add = true
                numList.forEach(num=>{
                    if(item.num===num){
                        add = false
                    }
                })
                if(add){
                    numList.push(item.num)
                }
            })
            //把所有类型收集一遍
            numList.forEach(item=>{
                let num = 0
                list.forEach(listItem=>{
                    if(item === listItem.num){
                        num++
                    }
                })
                if(num>=2){
                    res = true
                }//如果出现两个或以上的相同数字
            })
            return res
        }//aa的处理
        if(condition === "aaa"){
            let res = false
            let numList=[]
            list.forEach(item=>{
                let add = true
                numList.forEach(num=>{
                    if(item.num===num){
                        add = false
                    }
                })
                if(add){
                    numList.push(item.num)
                }
            })
            //把所有类型收集一遍
            numList.forEach(item=>{
                let num = 0
                list.forEach(listItem=>{
                    if(item === listItem.num){
                        num++
                    }
                })
                if(num>=3){
                    res = true
                }//如果出现两个或以上的相同数字
            })
            return res
        }//aaa的处理
        if(condition === "aaabb"){
            let res = false
            let con = false
            let aaa = ""
            let numList=[]
            list.forEach(item=>{
                let add = true
                numList.forEach(num=>{
                    if(item.num===num){
                        add = false
                    }
                })
                if(add){
                    numList.push(item.num)
                }
            })
            //把所有类型收集一遍
            numList.forEach(item=>{
                let num = 0
                list.forEach(listItem=>{
                    if(item === listItem.num){
                        num++
                    }
                })
                if(num>=3){
                    con = true
                    aaa = item
                    //记录aaa的名称
                }//如果出现三个或以上的相同数字
            })
            if(con){
                numList.forEach(item=>{
                    let num = 0
                    list.forEach(listItem=>{
                        if(item === listItem.num&&aaa!==item){
                            num++
                        }
                    })
                    if(num>=2){
                        res = true
                    }//如果出现两个或以上的相同数字
                })
            }
            return res
        }//aaabb的处理
    },//检查能使用的策略卡
    getAllNumOfCard(list){
        let allNumList = []
        list.forEach(item=>{
            if(allNumList.some(num=>num["realNum"]===item.realNum)){
                // console.log("已存在的数据:",item,allNumList)
                allNumList.map(numItem=>{
                    if(numItem.realNum === item.realNum){
                        numItem.howmany++
                    }
                })
            }else{
                // console.log("新增数据:",item,allNumList)
                allNumList.push({
                    num:item.num,
                    realNum:item.realNum,
                    howmany:1
                })
            }
        })
        allNumList.sort((a,b)=>a.realNum-b.realNum)
        return allNumList
    },
    getRequiredCardsForStrategy(list,strategy){
        let condition = this.getConditionByName(strategy.name)
        //获取需要的格式
        console.log(strategy.name + "的格式是",condition)
        let allNumList = this.getAllNumOfCard(list)
        //得到所有牌的点数和数量
        let res = []
        let stop = false
        let usedList = []
        if(condition === "aa"){
            allNumList.forEach(item=>{
                if(item.howmany>=2&&(!stop)){
                    res.push({
                        ...item,
                        useNum:2
                    })
                    stop = true
                }
            })
        }else if(condition === "aaa"){
            allNumList.forEach(item=>{
                if(item.howmany>=3&&(!stop)){
                    res.push({
                        ...item,
                        useNum:3
                    })
                    stop = true
                }
            })
        }else if(condition === "aaabb"){
            allNumList.forEach(item=>{
                if(usedList.length===0){
                    if(item.howmany>=3){
                        res.push({
                            ...item,
                            useNum:3
                        })
                        usedList.push(item.realNum)
                        //记录已经使用过的
                    }
                }else if(!stop){
                    if(item.howmany>=2&&(!usedList.includes(item.realNum))){
                        res.push({
                            ...item,
                            useNum:2
                        })
                        stop = true
                    }
                }
                
                
            })
        }
        return res
    },//得到需要的策略卡消耗
    getConditionByName(name){
        let res = ""
        strategyCard.forEach(item=>{
            if(item.name === name){
                res = item.condition
            }
        })
        return res
    },//通过名字得到格式
    getListByCondition(condition){
        let res = []
        strategyCard.forEach(item=>{
            if(item.condition === condition){
                res.push(item)
            }
        })
        return res
    },
    delStratefy(allMesBot,allMesMy,strategyList){
        let delList = []
        strategyList.forEach(item=>{
            item.forEach(itemOne=>{
                delList.push(itemOne)
            })
        })
        console.log(delList)
        //列出需要处理的点数和数量
        delList.forEach(del=>{
            let res = this.getEffectByStrategyName(allMesBot,allMesMy,del)
            allMesBot = res.allMesBot
            allMesMy = res.allMesMy
        })
        let allNumList = this.getAllNumOfCard(allMesBot.cardList)
        allNumList.map(item=>{
            delList.forEach(del=>{
                if(del.realNum === item.realNum){
                    item.howmany -= del.useNum
                }
            })
        })
        //处理完剩下的数据
        let res =[]
        allNumList.forEach(item=>{
            let num = 0
            allMesBot.cardList.forEach(card=>{
                if(item.realNum === card.realNum){
                    if(item.howmany>num){
                        res.push(card)
                    }
                    num++
                }
            })
        })
        console.log("去除策略卡点数后：",res)
        allMesBot.cardList = res
        return {
            allMesBot,
            allMesMy
        }
    },//删除策略卡消耗的点数(手卡)
    delByNum(allMesBot,delNum){
        let allNum = 0
        let stop = false
        let res = []
        for(let i = 0; i<allMesBot.cardList.length;i++){
            if(stop){
                //点数足够了，不再增加
                res.push(allMesBot.cardList[allMesBot.cardList.length-i-1])
            }else{
                allNum += Number(allMesBot.cardList[allMesBot.cardList.length-i-1].realNum)
                if(allNum>=delNum){
                    stop = true
                } 
            }
        }
        console.log("点数消耗结果:",res)
        allMesBot.cardList = res
        return allMesBot
    },//根据点数删除
    getEffectByStrategyName(allMesBot,allMesMy,del){
        if(del.name === "强袭"){
            allMesBot.noMiss = 1
        }
        if(del.name === "锐利"){
            allMesMy.defLowBig = 1
        }
        if(del.name === "困兽之斗"){
            allMesBot.noMiss = 1
            allMesMy.noMiss = 1
        }
        if(del.name === "再生"){
            allMesBot.healLittle = 1
        }
        if(del.name === "吸收"){
            allMesBot.absorb = 1
        }
        if(del.name === "年轮"){
            allMesBot.healWithCards = 1
        }
        if(del.name === "源源不绝"){
            allMesBot.getCards = 2
        }
        if(del.name === "断源"){
            allMesBot.cutSource = 1
        }
        if(del.name === "涌泉"){
            allMesBot.getCardDraw = 1
        }
        if(del.name === "灼烧"){
            allMesBot.atkPercentage10 = 1
        }
        if(del.name === "火烧连营"){
            allMesBot.atkDouble = 1
            allMesMy.atkDouble = 1
        }
        if(del.name === "熔岩"){
            allMesMy.defVulnerable = 3
            allMesMy.healHard = 3
        }
        if(del.name === "城墙"){
            allMesBot.defStrongMid = 1
        }
        if(del.name === "王车易位"){
            allMesBot.changeATKandDEF = 1
        }
        if(del.name === "敲山震虎"){
            allMesMy.changeATKandDEF = 1
        }
        return {
            allMesBot:allMesBot,
            allMesMy:allMesMy
        }
    },//根据策略卡名字发动对应效果
    dealBeforeSkill(allMesBot,allMesMy){
        allMesBot = this.dealBeforeSkillOne(allMesBot)
        allMesMy = this.dealBeforeSkillOne(allMesMy)
        return {
            allMesBot,
            allMesMy
        }
    },
    dealBeforeSkillOne(allMes){
        if(allMes?.noMiss&&allMes.noMiss>=1){
            allMes.noMiss--
        }//回合数统一在这处理，功能在turnMethod isMiss中实现
        if(allMes?.changeATKandDEF&&allMes.changeATKandDEF>=1){
            if(!allMes?.haveChangeATKandDEF){
                allMes.haveChangeATKandDEF = true
                let oldAtk = allMes.atk
                allMes.atk = allMes.def
                allMes.def = oldAtk
            }
            allMes.changeATKandDEF--
        }//攻防互换
        if(allMes?.defStrongMid&&allMes.defStrongMid>=1){
            allMes.def += 10
            // allMes.defStrongMid-- 回合结束再去掉
        }//中幅增加防御
        if(allMes?.defLowBig&&allMes.defLowBig>=1){
            allMes.def -= 30
            // allMes.defStrongMid-- 回合结束再去掉
        }//中幅增加防御
        if(allMes?.healLittle&&allMes.healLittle>=1){
            allMes.lifeNow += 10
            if(allMes.lifeNow>allMes.life){
                allMes.lifeNow = allMes.life
            }
            allMes.healLittle--
        }//小幅增加生命值
        if(allMes?.healWithCards&&allMes.healWithCards>=1){
            let num = 0
            allMes.cardList.forEach(card=>{
                num ++
            })
            allMes.lifeNow += 10*num
            if(allMes.lifeNow>allMes.life){
                allMes.lifeNow = allMes.life
            }
            allMes.healWithCards--
        }//为自身回复一定血量，手卡越多回复越多,每一张回10

        return allMes
    },
    dealAfterSkill(allMesBot,allMesMy,pokeList,mesList){
        console.log("策略卡处理（技能发动后）")
        let botRes = this.dealAfterSkillOne(allMesBot,pokeList,allMesMy,mesList)
        allMesBot = botRes.allMes
        pokeList = botRes.pokeList
        allMesMy = botRes.allMesOther
        let myRes = this.dealAfterSkillOne(allMesMy,pokeList,allMesBot,mesList)
        allMesMy = myRes.allMes
        pokeList = myRes.pokeList
        allMesBot = myRes.allMesOther
        return {
            allMesBot,
            allMesMy,
            pokeList,
            mesList
        }
    },
    dealAfterSkillOne(allMes,pokeList,allMesOther,mesList){

        if(allMes?.changeATKandDEF&&allMes.changeATKandDEF===0){
            allMes.haveChangeATKandDEF = false
                let oldAtk = allMes.atk
                allMes.atk = allMes.def
                allMes.def = oldAtk
        }//处理攻守互换
        if(allMes?.getCards&&allMes.getCards>=1){
            let res = this.getPoke(allMes,2,pokeList)
            allMes = res.allMes
            pokeList = res.pokeList
            allMes.getCards--
        }//摸两张
        if(allMes?.getCardDraw&&allMes.getCardDraw>=1){
            let stop = false
            let list = []
            let num  = 0
            pokeList.forEach((item,index)=>{
                if(stop){
                    list.push(item)
                }else {
                    allMes.cardList.push(item)
                    mesList.push({
                        text:"第"+(index+1)+"张" + pokeApi.getTypeName(item.type) +item.num
                        ,type:"default"
                    })
                    num++
                }
                if(item.type === "heart"||index>=4){
                    stop = true

                }
            })
            pokeList = list
            let res = this.getPoke(allMesOther,num,pokeList)
            allMesOther = res.allMes
            pokeList = res.pokeList
        }//摸到红桃或者五张为止
        if(allMes?.cutSource&&allMes.cutSource>=1){
            allMes.cardList = []
            let strategyList = []
            allMesOther.strategyList.forEach((item,index)=>{
                if(index === allMesOther.strategyList.length){
                    //
                }else{
                    strategyList.push(item)
                }
            })//电脑固定去掉最后一张
            allMesOther.strategyList = strategyList
            allMes.cutSource--
        }//丢弃所有手卡，弃置一张策略卡
        if(allMes?.atkPercentage10&&allMes.atkPercentage10>=1){
            allMes.atkPercentage10--
        }//伤害结算
        if(allMes?.atkDouble&&allMes.atkDouble>=1){
            allMes.atkDouble--
        }//伤害结算
        if(allMes?.absorb&&allMes.absorb>=1){
            allMes.absorb--
        }//伤害结算
        if(allMes?.defVulnerable&&allMes.defVulnerable>=1){
            allMes.defVulnerable--
        }//易损baff
        if(allMes?.healHard&&allMes.healHard>=1){
            allMes.healHard--
        }//重伤baff
        if(allMes?.defStrongMid&&allMes.defStrongMid>=1){
            allMes.def -= 10
            allMes.defStrongMid-- 
            //回合结束再去掉
        }//中幅增加防御
        if(allMes?.defLowBig&&allMes.defLowBig>=1){
            allMes.def += 30
            allMes.defLowBig-- 
            //回合结束再去掉
        }//大幅减少防御
        return {
            allMes,
            pokeList,
            allMesOther,
        }

    },
    getPoke (allMes,many,pokeList){
        for(let i = 0 ; i < many ; i++){
            allMes.cardList.push(pokeList[i])
        }//获得对应数量的卡
        //获得对应数量的卡
        pokeList = this.delpokeList(many,pokeList)
        return {
            allMes,
            pokeList,
        }
    },
    delpokeList (num,pokeList){
        let result = []
        pokeList.forEach((item,index)=>{
            if(num<=index){
                result.push(item)
            }else{
                //从牌库中删去对应数量的卡
            }
        })
        pokeList = result
        return pokeList
    },
    testStrategyUseful(allMes){
        allMes.strategyList.push(
            {name:"强袭",type:"",attribute:"金",
                dec:"我方本回合攻击不可闪避",
                condition:"aaa",
            }
        )
        return allMes

    }

}