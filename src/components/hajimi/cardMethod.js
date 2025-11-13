import basicCardList from "./basicCardList"
import skillList from "./skillList"

export default {
    myUseCard(allMes,cardName){
        console.log("我方使用牌",cardName)
        
        return allMes
    },//我方使用牌方法
    checkCardCanUse(allMes,item,who){
        // console.log(item,allMes[who].playerNow.power)
        if(item.cost<=allMes[who].playerNow.power&&item.scene==="active"){
            if(item.name===""){
                //某些卡牌的发动额外条件
            }
            return true
        }
        return false
    },//确认卡牌能否发动
    coverCard(allMes,who,data,index){
        allMes[who].cardGroundList.push({
            ...data,
            prepare:false,
        })//增加卡牌进入战术区
        // console.log(allMes[who] )
        allMes[who].handCardList.splice(index,1)
        //把卡牌从手卡中删除
        return allMes
    },//盖卡方法
    async dealChain(allMes){
        //处理连锁链
        console.log("处理连锁开始",allMes.chain)
        if(Array.isArray(allMes.chain)&&allMes.chain.length>0){
            let chain = []
            for(let i = allMes.chain.length-1;i>=0;i--){
                chain.push(allMes.chain[i])
            }//后发先至，反转连锁链
            for(const [index,item] of chain.entries()){
                await this.waitToDo(1000,async()=>{
                    if(basicCardList.isCard(item.card.name)){
                        console.log("处理卡的方法",item.card.name)
                        allMes = await basicCardList.useCard(allMes,item.card.name,item.user,index)
                    }else{
                        console.log("处理技能的方法",item.card.name)
                        allMes = await skillList.useCard(allMes,item.card.name,item.user,index)
                    }
                })
                
            }
        }else{
            console.log("连锁链为空")
        }
        allMes.chain.forEach(item=>{
            if(basicCardList.isCard(item.card.name)){
                allMes.cardUsedList.push(basicCardList.getMesByCardName(item.card.name))
            }//保证卡牌参数的纯净
        })//处理完连锁的卡进入墓地
        allMes.chain = []
        return allMes
    },//处理连锁链方法
    useCardAndSkill(allMes,data){
        // {
        //     type:methdoType.value,
        //     index:choiceIndex.value,
        //     card:choiced.value,
        // }
        if(data.type === "card"){
            let handCardList = []
            allMes.allMesMy.handCardList.forEach((item,index)=>{
                if(index === data.index){
                    //去掉这张牌
                    allMes.chain.push({
                        card:item,
                        user:"allMesMy"
                    })//进入连锁
                }else{
                    handCardList.push(item)
                }
            })
            allMes.allMesMy.handCardList = handCardList
        }else if(data.type === "cardCover"){
            let cardGroundList = []
            allMes.allMesMy.cardGroundList.forEach((item,index)=>{
                if(index === data.index){
                    //去掉这张牌
                    allMes.chain.push({
                        card:item,
                        user:"allMesMy"
                    })//进入连锁
                }else{
                    cardGroundList.push(item)
                }
            })
            allMes.allMesMy.cardGroundList = cardGroundList
        }else if(data.type === "skill"){
            //去掉这张牌
            allMes.chain.push({
                card: data.card,
                user:"allMesMy"
            })//进入连锁
        }
        return allMes
    },//使用卡牌和技能方法,将其并入连锁链待处理
    async botUseChain(allMes){
        return await this.waitToDo(1000,async()=>{
            if(allMes.allMesBot.cardGroundList.length>0){
                console.log("处理bot的盖卡发动")
                let cardGroundList = []
                allMes.allMesBot.cardGroundList.forEach((item,index)=>{
                    if(index === 0&&this.specialCardUse(allMes,item.name)){
                        //可以使用
                        allMes.chain.push({
                            type:"cardCover",
                            card:item,
                            user:"allMesBot"
                        })//进入连锁
                    }else{
                        cardGroundList.push(item)
                    }
                })
                allMes.allMesBot.cardGroundList = cardGroundList
                //去掉一张盖卡，加入连锁链
                console.log("bot盖卡加入连锁")
                return await this.waitToDo(1000,async()=>{
                    if(!this.checkCardGroundCanUse(allMes.allMesMy.cardGroundList)){
                        //我方没有可连锁盖牌
                        console.log("我方没有盖卡，无法继续连锁")
                        console.log("处理连锁结果",allMes.chain)
                        allMes = await this.dealChain(allMes)
                        
                        return allMes
                    }else{
                        console.log("我方有盖卡，继续连锁")
                        allMes = await this.myUseChain(allMes)
                        //进入我方连锁方法
                        return allMes
                    }
                })
                
            }else{
                console.log("处理连锁结果",allMes.chain)
                allMes = await this.dealChain(allMes)
                return allMes
                //bot没有可以使用的牌
            }
        })
    },//处理bot连锁方法
    async myUseChain(allMes){
        return new Promise( (resolve)=>{
            //在这里处理连锁结果 
            const originalChainLength = allMes.chain ? allMes.chain.length : 0;
    
            console.log("创建弹窗Promise")
            // 确保showChainDialog存在
            if (typeof this.showChainDialog === 'function') {
                console.log("显示连锁弹窗")
                this.showChainDialog(allMes, async(dialogResult) => {
                    console.log("收到弹窗结果：",allMes.chain, dialogResult.chain)
                    if(originalChainLength < dialogResult.chain.length){
                        //新的连锁cardGroundList
                        allMes = dialogResult
                        return await this.waitToDo(1000,async()=>{
                            let canChain = false
                            for(let i of allMes.allMesBot.cardGroundList){
                                if(this.specialCardUse(allMes,i.name)){
                                    canChain = true
                                }
                            }
                            if(canChain&&this.checkCardGroundCanUse(allMes.allMesBot.cardGroundList)){
                                console.log("bot有可连锁盖牌，继续连锁")
                                    allMes = await this.botUseChain(allMes)
                                //进入bot连锁方法
                                resolve(allMes)
                            }else{
                                //我方没有可连锁盖牌
                                console.log("bot没有可连锁盖牌，无法继续连锁")
                                console.log("处理连锁结果",allMes.chain)
                                allMes = await this.dealChain(allMes)
                                resolve(allMes)
                            }
                        })
                    }else{
                        allMes = dialogResult
                        console.log("处理连锁结果",allMes.chain)
                        allMes = await this.dealChain(allMes)
                        resolve(allMes)
                    }
                    
                })
            } else {
                console.error("showChainDialog方法未定义")
                resolve(allMes)
            }
        }) 
    },//处理我方连锁方法
    async waitToDo(time,fun){
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time);
        })
        if (typeof fun === 'function') {
            return await fun();
        }
    },//等待执行完成
    specialCardUse(allMes,cardName,who="allMesBot"){
        console.log("判断卡牌能不能使用：",cardName,who)
        if(cardName==="了如指掌"){
            if(who === "allMesBot"){
                return allMes.allMesMy.cardGroundList.length>0
            }else{
                return allMes.allMesBot.cardGroundList.length>0
            }
            
        }//这张卡必须对方战术区有卡才能发动
        if(cardName==="落井下石"){
            if(who === "allMesBot"){
                if(allMes.chain.length===0){
                    return false
                }
                return(allMes.chain[allMes.chain.length-1].card.type === "skill"
                    &&allMes.chain[allMes.chain.length-1].user==="allMesMy")
                //检查上一个连锁是不是对方的技能
            }else{
                if(allMes.chain.length===0){
                    return false
                }
                return(allMes.chain[allMes.chain.length-1].card.type === "skill"
                    &&allMes.chain[allMes.chain.length-1].user==="allMesBot")
                //检查上一个连锁是不是对方的技能
            }
            
        }//这张卡必须上一个连锁是对方技能才能发动
        if(cardName==="兵粮寸断"){
            if(who === "allMesBot"){
                return allMes.allMesMy.monsterNow?.helpless === false
            }else{
                return allMes.allMesBot.monsterNow?.helpless === false
            }
        }//这张卡不能对已经上了兵粮寸断标记的玩家使用
        if(cardName==="如法炮制"){
            if(allMes.cardUsedList.length<=0){
                return false
            }else{
                let res = false
                for(let i of allMes.cardUsedList){
                    if(i.type === "basic"){
                        res = true
                    }
                }
                return res
            }
        }//这张卡必须墓地有基本卡才能发动
        if(cardName==="党同伐异"){
            if(who === "allMesBot"){
                return allMes.allMesMy.handCardList.length>0
            }else{
                allMes.allMesBot.handCardList.length>0
            }
        }//这张卡必须对方有手牌才能发动
        if(cardName==="各怀鬼胎"){
            return allMes.allMesMy.handCardList.length>0
                &&allMes.allMesBot.handCardList.length>0
        }//这张卡必须双方都有手牌才能发动
        if(cardName === "洞若观火"){
            if(allMes.chain.length<=0){
                return false
            }else{
                return(basicCardList.getMesByCardName(allMes.chain[allMes.chain.length-1].card.name)?.type === "strategy")?true:false
                //检查上一个连锁是不是策略卡
            }
        }//这张啊只能连锁策略卡发动
        if(cardName === "凝神运气"){
            if(allMes[who].handCardList.length<=0){
                return false
            }return true
        }//这张卡必须有手卡才能发动
        if(cardName === "重整旗鼓"){
            let res = false
            allMes.cardUsedList.forEach(item=>{
                if(item.type === "basic"){
                    res = true
                }
            })
            return res
        }//这张卡必须墓地有基本卡才能发动
        if(cardName === "等价交换"){
            if(allMes.allMesMy.cardGroundList.length>0&&allMes.allMesBot.cardGroundList.length>0){
                return false
            }return true
        }//这张卡必须双方战术区有卡才能发动
        if(cardName === "黑魔法"){
            let res = false
            allMes.cardUsedList.forEach(item=>{
                if(item.type === "strategy"){
                    res = true
                }
            })
            return res
        }//这张卡必须墓地有策略卡才能发动
        if(cardName === "破釜沉舟"){
            if(allMes[who].playerNow.power>0){
                return true
            }return false
        }//这张卡必须使用者有气才能发动
        return true
    },//检查卡牌发动前提的方法 默认为bot使用
    checkCardGroundCanUse(list){
        if(Array.isArray(list)&&list.length>0){
            let res = false
            list.forEach(item=>{
                if(item.prepare === true){
                    res = true
                }
            })
            return res
        }else{
            return false
        }
    }
}