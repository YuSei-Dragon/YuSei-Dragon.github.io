import cardFuction from "./cardFuction.js"

export default {
    botStart(allMes){
        allMes.botMonsterList.map(item=>{
            item.haveLe = false
            item.haveBing = false
            //重置所有怪兽状态
        })
        return allMes
    },
    botTrun(allMes){
        //bot一次行动中 召唤/发动技能/使用牌 只能触发一个，就会进入思考等待
        let canCall = this.canCall(allMes)
        //召唤
        let canUseMonsterSkill = false
        //发动技能
        let canUseCard = this.canUseCard(allMes)
        //有没有能用的卡
        console.log("bot回合一次行动：",canCall,canUseMonsterSkill,canUseCard)
        //bot的先攻处理
        if(canCall.result){
            //优先召唤
            let callRes = this.callMonster(canCall.monster,allMes)
            console.log("召唤结果:"+ callRes.result)
            if( callRes.result){
                allMes = callRes.allMes
                // console.log(allMes)
                return {
                    result :true,
                    allMes:allMes
                }
                // await this.waitToDo(1000,this.botTrun)
            }else{
                console.log("bot召唤出错")
            }
        }else if(canUseMonsterSkill){
            //是否能使用怪兽能力 暂时不做
            return {
                allMes:allMes,
                result:true
            }
        }else if(canUseCard){
            //是否有可以使用的卡
            return this.botUseCard(allMes)
            // return {
            //     allMes:allMes,
            //     result:true
            // }
        }else{
            return {
                allMes:allMes,
                result:false
            }
        }
    },//bot回合的一次行为
    botEndTrun(allMes){
        this.waitToDo(2000,()=>{
            allMes.outputList.push("bot回合结束...")
        })
        return allMes
        //bot的结束回合方法
        //调用me的开始回合方法
    },//bot回合结束
    botTrunAll(allMes){
        //不断重复botTrun直到bot没有可操作的卡和召唤的怪
        let res = this.botTrun(allMes)
        this.waitToDo(2000,()=>{
            if(res.result){
                return this.botTrunAll(allMes)
                //如果成功，继续循环
             }else{
                //返回结果
                allMes.outputList.push("bot回合结束...")
                return allMes
             }
        })
        //然后切换me的回合
    },
    canCall(allMes){
        // const botMonsters = cardFuction.getBotAllMonsters()
        const botMonsters = allMes.botAllMonsterList
        // console.log("bot的召唤环节",botMonsters)
        if(Array.isArray(botMonsters)&&botMonsters.length>0){
            //检查额外卡组还有没有怪
            //电脑的逻辑是优先出完小怪，最后屯卡出大怪
            let canList = []
            botMonsters.forEach(item=>{
                const result = cardFuction.canCallMonster(item.name,allMes.botCardList,allMes.botMonsterList)
                if(result.result){
                    canList.push(item)
                }
            })
            // console.log("可召唤的怪兽有:",canList)
            if(canList.length>0){
                let choice = {
                    name:canList[0].name,
                    num:this.getNeedCardNum(canList[0])
                }
                canList.forEach(canItem=>{
                    if(this.getNeedCardNum(canItem)<choice.num){
                        choice.name = canItem.name
                        choice.num = canItem.num
                    }
                })//找出需要消耗最少的卡怪兽
                // console.log("最终选择召唤:"+choice.name)
                return {
                    result: true,
                    monster:choice.name
                }
            }else{
                return {
                    result:false
                }
            }
        }else{
            console.log("额外没有怪了")
            return {
                result:false
            }
        }
    },//检查能不能召唤
    getNeedCardNum(cardItem){
        let mes = cardFuction.getMonsterMesByName(cardItem.name)
        let num = 0
        if(Array.isArray(mes.callNeed)&&mes.callNeed.length>0){
            mes.callNeed.forEach(item=>{
                num+=item.num
            })
            return num
        }else{
            return 0
        }
    },//获取所需消耗数
    callMonster(name,allMes){
        //bot的召唤方法
        let hand = allMes.botCardList
        let monsterMes = cardFuction.getMonsterMesByName(name)
        const needList = monsterMes.callNeed
        let discardPile = allMes.discardPile
        if(Array.isArray(needList)&&needList.length>0){
            needList.forEach(item=>{
                if(item.type!="any"&&item.type!="same"){
                    //如果不是任意也不是同一属性
                    const result = cardFuction.delByAttribute(item.type,item.num,hand)
                    if(result.result){
                        hand = result.list
                        result.discardPile.forEach(discardPileItem=>{
                            discardPile.push(discardPileItem)
                        })//消耗的祭品加入弃牌堆
                    }else{
                        console.log("处理出错，没有足够的指定属性祭品")
                    }
                }else if(item.type=="same"){
                    //同一属性
                    const result = cardFuction.delBySame(item.num,hand)
                    if(result.result){
                        hand = result.list
                        result.discardPile.forEach(discardPileItem=>{
                            discardPile.push(discardPileItem)
                        })//消耗的祭品加入弃牌堆
                    }else{
                        console.log("处理出错，没有足够的相同属性祭品")
                    }
                }else{
                    //any
                    const result = cardFuction.delByAny(item.num,hand)
                    if(result.result){
                        hand = result.list
                        result.discardPile.forEach(discardPileItem=>{
                            discardPile.push(discardPileItem)
                        })//消耗的祭品加入弃牌堆
                    }else{
                        console.log("处理出错，没有足够的单一属性祭品")
                    }
                } 
            })
            // console.log(hand,discardPile)
            allMes.botCardList = hand
            allMes.discardPile = discardPile
            let stopCall = false
            let botMonsterList = []

            allMes.botMonsterList.forEach(monsterPlaceItem=>{
                let monsterItem = {
                    name: "",
                    atk: "",
                    def: "",
                    liv:"",
                    weapon:"",
                    armor:"",
                    house1:"",
                    house2:"",
                    haveKill:false,
                }
                if(monsterPlaceItem.name == ""&&!stopCall){
                    monsterItem = {
                        weapon:"",
                        armor:"",
                        house1:"",
                        house2:"",
                        haveKill:false,
                        ...monsterMes,

                    }
                    stopCall = true
                    allMes.outputList.push("bot召唤了 "+monsterMes.name)
                    botMonsterList.push(monsterItem)
                }else{
                    botMonsterList.push(monsterPlaceItem)
                }
            })
            allMes.botMonsterList =  botMonsterList
            let botAllMonsterList = []
            allMes.botAllMonsterList.forEach(item=>{
                if(item.name == monsterMes.name){
                    //从额外卡组去掉这张卡
                }else{
                    botAllMonsterList.push(item)
                }
            })
            allMes.botAllMonsterList = botAllMonsterList
            // console.log(allMes)
            return {
                result :true,
                allMes:allMes
            }
        }else{
            console.log("查找怪物详情出错！")
        }
    } ,//召唤方法
    async waitToDo(howLong,method){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            method()
            resolve(howLong)
        },howLong)
        })
    },//同步化
    canUseCard(allMes){
        const botHand = allMes.botCardList
        let stop = false
        botHand.forEach(item=>{
            if(stop){
                //已经找到能发动的卡
            }else{
                if(this.checkCanUseCardByName("bot",item.name,item.type,allMes)){
                    stop = true
                    //检查卡牌是否符合发动条件
                }else{
                    //
                }
            }
        })
        return stop

    },
    checkCanUseCardByName(who,name,type,allMes){
        //me和bot的公用手卡是否可用方法
        if(who == "bot"){
            //检查bot
            return this.checkBotCardByName(name,type,allMes)
        }else{
            //检查me
            cardFuction.checkMeCardByName(name,type,allMes)
        }
    },
    checkBotCardByName(name,type,allMes){
        if(name == "杀"){
            if(!allMes.botHaveKill){
                //bot本回合没有打人，可以用(玩家打人无视距离)
                return true
            }else{
                let stop = false
                
                allMes.botMonsterList.forEach(monster =>{
                    if(stop||(!monster.haveUsed&&monster.name!="")){
                        if(cardFuction.checkDistance(
                            monster,allMes.meMonsterList, "me"
                        ))
                        stop = true
                    }
                })//检查有没有可以出杀的怪
                return stop
            }
        }else if(name == "过河拆桥"){
            let can = false
            if(allMes.meCardList.length>0){
                can = true
            }//检查有没有手牌
            if(allMes.meMonsterList.length>0){
                allMes.meMonsterList.forEach(handCard=>{
                    if(handCard.weapon!=""||handCard.armor!=""||handCard.house1!=""||handCard.house2){
                        can = true
                    }
                })
            }//检查有没有可以拆的卡
            return can
        }else if(name == "顺手牵羊"){
            let can = false
            if(allMes.meCardList.length>0){
                can = true
            }//检查有没有手牌
            if(allMes.meMonsterList.length>0){
                allMes.meMonsterList.forEach(handCard=>{
                    if(handCard.weapon!=""||handCard.armor!=""||handCard.house1!=""||handCard.house2){
                        can = true
                    }
                })
            }//检查有没有可以顺的卡
            return can
        }else if(name == "无中生有"){
            return true
            //无中生有不需要前置条件
        }else if(name == "借刀杀人"){
            let meMonsterList = allMes.meMonsterList
            let can = false
            meMonsterList.forEach(item=>{
                if(item.weapon!=""){
                    can = true
                }
            })
            return can
        }else if(name == "决斗"){
            // let meMonsterList = allMes.meMonsterList
            // let meCan = false
            // let botMonsterList = allMes.botMonsterList
            // let botCan = false
            // meMonsterList.forEach(item=>{
            //     if(item.name!=""){
            //         meCan = true
            //     }
            // })
            // botMonsterList.forEach(item=>{
            //     if(item.name!=""){
            //         botCan = true
            //     }
            // })
            // if(meCan&&botCan){
            //     return true
            // }else{
            //     return false
            // }
            return true //决斗效果修改
        }else if(name == "乐不思蜀"){
            let can = false
            allMes.meMonsterList.forEach(item=>{
                if(item.name!=""&&!item.haveLe){ 
                    can = true
                }
            })
            return can
        }else if(name == "兵粮寸断"){
            let can = false
            allMes.meMonsterList.forEach(item=>{
                if(item.name!=""){ 
                    can = true
                }
            })
            return can
        }else if(name == "醍醐灌顶"){
            let can = false
            // allMes.meMonsterList.forEach(item=>{
            //     if(item.name!=""){ 
            //         can = true
            //     }
            // })
            allMes.botMonsterList.forEach(item=>{
                if(item.name!=""){ 
                    if(item.haveLe||item.haveBing){
                       can = true 
                    }   
                }
            })
            return can
        }else if(name == "桃"){
            return true
        }else if(type == "装备卡"){
            return true
        }else{
            return false
        }
    },//bot的手卡是否可用检查
    botUseCard(allMes){
        //bot会优先使用锦囊
        const{jinnang,zhuangbei,jiben} = this.getCanUseCardList(allMes)
        console.log(jinnang,zhuangbei,jiben)
        if(Array.isArray(jinnang)&&jinnang.length>0){
            let result = this.useCard(allMes.botCardList[jinnang[0]],allMes)
            //使用第一张
            allMes = result.allMes
            let newBotHand = []
            allMes.botCardList.forEach((hand,handIndex)=>{
                if(handIndex == jinnang[0]){
                    //去掉使用的这张卡
                    //进入弃卡堆
                    allMes.discardPile.push(hand)
                }else{
                    newBotHand.push(hand)
                }
            })
            allMes.botCardList = newBotHand
            //更新bot的手卡
            return {
                allMes : allMes,
                mes: result?.mes?result.mes:"",//没有需要额外的处理
                mesObject: result?.mesObject?result.mesObject:{},
                result: result?.result?result.result:true,//成功，继续
            }
        }
        // else if(Array.isArray(zhuangbei)&&zhuangbei.length>0){
        //     //先测试锦囊卡
        // }else if(Array.isArray(jiben)&&jiben.length>0){
        //     //先测试锦囊卡
        // }
    },//bot使用手卡方法
    getCanUseCardList(allMes){
        //获取当前手卡所有能出的卡以及他的索引，用锦囊/武器/基本区分
        // 优先级从左到右
        const botHand = allMes.botCardList
        let jinnang = []
        let zhuangbei = []
        let jiben = []
        console.log(botHand)
        botHand.forEach((item,index)=>{
            if(this.checkCanUseCardByName("bot",item.name,item.type,allMes)){
                if(item.type == "锦囊卡"){
                    jinnang.push(index)
                }else if(item.type == "装备卡"){
                    zhuangbei.push(index)
                }else if(item.type == "基本卡"){
                    jiben.push(index)
                }
            }
        })
        return {
            jinnang:jinnang,
            zhuangbei:zhuangbei,
            jiben:jiben
        }
    },//获取bot可以用的卡的分类
    useCard(card,allMes){
        if(card.type=="锦囊卡"){
            return this.botUseJinNang(card,allMes)
        }else if(card.type=="装备卡"){
            return this.botUseZhangbei(card,allMes)
        }else if(card.type=="基本卡"){
            return this.botUseJiben(card,allMes)
        }
    },
    botUseJinNang(card,allMes){
        if(card.name == "过河拆桥"){
            //bot使用过河拆桥的逻辑
            //如果有装备先拆装备，然后才是手卡
            allMes.outputList.push("bot使用了过河拆桥...")
            let meMonsterList = allMes.meMonsterList
            let {result,type,thisIndex} = this.haveZhuangbei(meMonsterList)
            let meHand = []
            //手卡
            if(result){
                allMes.discardPile.push(meMonsterList[thisIndex][type])
                //进入弃卡堆
                if(meMonsterList[thisIndex][type].attribute == card.attribute){
                    let newDeck = []
                    allMes.deck.forEach((deckItem,index)=>{
                        if(index==0){
                           allMes.botCardList.push(deckItem) 
                        }else{
                            newDeck.push(deckItem)
                        }
                    })
                    allMes.deck = newDeck
                    //如果拆的卡属性相同，还可以摸一张
                }
                meMonsterList[thisIndex][type] = {
                    name:""
                }
                allMes.meMonsterList = meMonsterList
            }else{
                //如果没有装备，那就拆手卡
                allMes.meCardList.forEach((item,index)=>{
                    if(index == 0){
                        //进入弃卡堆
                        allMes.discardPile.push(item)
                    }else{
                        meHand.push(item)
                    }
                })
                //去掉第一张
                allMes.meCardList = meHand
            }
            return {
                allMes:allMes
            }
        }else if(card.name == "顺手牵羊"){
            //bot使用顺手牵羊的逻辑
            //如果有装备先顺装备，然后才是手卡
            allMes.outputList.push("bot使用了顺手牵羊...")
            let meMonsterList = allMes.meMonsterList
            let {result,type,thisIndex} = this.haveZhuangbei(meMonsterList)
            let meHand = []
            //手卡
            console.log(result,type,thisIndex)
            if(result){
                allMes.botCardList.push(meMonsterList[thisIndex][type])
                //把顺的装备加入bot手卡
                meMonsterList[thisIndex][type] = {
                    name:""
                }
                allMes.meMonsterList = meMonsterList
                //去掉顺的装备
            }else{
                //如果没有装备，那就顺手卡
                allMes.meCardList.forEach((item,index)=>{
                    if(index == 0){
                        //加入bot的手卡
                        allMes.botCardList.push(item)
                    }else{
                        meHand.push(item)
                    }
                })
                //去掉第一张
                allMes.meCardList = meHand
            }
            return {
                allMes:allMes
            }
        }else if(card.name == "无中生有"){
            //bot使用无中生有的逻辑
            allMes.outputList.push("bot使用了无中生有...")
            const attribute = cardFuction.getRandomAttribute()
            //获取一个随机属性
            let stop = false
            let num = 0
            allMes.outputList.push("bot选择："+attribute)
            for(let i =0;i<5;i++){
                if(!stop){
                    num++
                    //记录拿了几张卡
                    // console.log(allMes)
                    allMes.outputList.push("翻开的牌是："+allMes.deck[i].name + "("+allMes.deck[i].attribute+")")
                    allMes.botCardList.push(allMes.deck[i])
                        //加入bot的手卡
                    if(allMes.deck[i].attribute==attribute){
                        //结束
                        stop = true
                    }
                }
            }
            let newDeck = []
            allMes.deck.forEach((deckItem,index)=>{
                if(index<num){
                    //去掉
                }else{
                    newDeck.push(deckItem)
                }
            })
            allMes.deck = newDeck
            return {
                allMes:allMes,
                // mesObject:{
                //     attribute:attribute,
                // },
                // mes:"botWuZhongShengYou",
                // result:true
            }

        }else if(card.name == "借刀杀人"){
            //暂时不做，先完成me的装备代码再写这个
        }else if(card.name == "决斗"){
            const meKills = this.getKillNum(allMes.meCardList)
            const botKills = this.getKillNum(allMes.botCardList)
            allMes.outputList.push("bot使用了决斗...")
            if(meKills>botKills){
                allMes.outputList.push("me赢下了决斗...")
                allMes.botLife -= (meKills+1)*100
            }else{
                allMes.outputList.push("bot赢下了决斗...")
                allMes.meLife -= (botKills+1)*100
            }
            return {
                allMes:allMes
            }
        }else if(card.name == "乐不思蜀"){
            let stop = false
            allMes.meMonsterList.map(item=>{
                if(!stop&&!item.haveLe){
                    stop = true
                    item.haveLe = true
                    allMes.outputList.push("bot对me的"+item.name+"发动了乐不思蜀...")
                }
            })
            return {
                allMes:allMes
            }
        }else if(card.name == "兵粮寸断"){
            let stop = false
            allMes.meMonsterList.map(item=>{
                if(!stop&&!item.haveBing){
                    stop = true
                    item.haveBing = true
                    allMes.outputList.push("bot对me的"+item.name+"发动了兵粮寸断...")
                }
            })
            return {
                allMes:allMes
            }
        }else if(card.name == "醍醐灌顶"){
            let stop = false
            allMes.botMonsterList.map(item=>{
                if(!stop){
                    if(item.haveBing||item.haveLe){
                        stop = true
                        item.haveBing = false
                        item.haveLe = false
                    }
                    allMes.outputList.push("bot对自己的"+item.name+"发动了醍醐灌顶...")
                }
            })
            return {
                allMes:allMes
            }
        }

    },//bot使用锦囊卡
    botUseZhangbei(card,allMes){

    },//bot使用装备卡
    botUseJiben(card,allMes){

    },//bot使用基本卡
    haveZhuangbei(monsterList){
        let result = false
        let type = ""
        let thisIndex = 0
        monsterList.forEach((item,index)=>{
            if(item.name!=""&&!result){
                if(item.armor!=""){
                    result = true
                    type = "armor"
                    thisIndex = index
                }
            }
        })
        monsterList.forEach((item,index)=>{
            if(item.name!=""&&!result){
                if(item.house1!=""){
                    result = true
                    type = "house1"
                    thisIndex = index
                }
            }
        })
        monsterList.forEach((item,index)=>{
            if(item.name!=""&&!result){
                if(item.weapon!=""){
                    result = true
                    type = "weapon"
                    thisIndex = index
                }
            }
        })
        monsterList.forEach((item,index)=>{
            if(item.name!=""&&!result){
                if(item.house2!=""){
                    result = true
                    type = "house2"
                    thisIndex = index
                }
            }
        })
        return {
            result :result,
            type:type,
            thisIndex:thisIndex,
        }
    },//检查怪兽有没有装备  防装>+1马>武器>-1马
    getKillNum(list){
        let num = 0
        if(Array.isArray(list)&&list.length>0){
            list.forEach(item=>{
                if(item.name == "杀"){
                    num++
                }
            })
        }
        return num
    }
}