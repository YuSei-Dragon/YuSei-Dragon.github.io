import basicCardList from "@/components/hajimi/basicCardList.js"
import cardMethod from "@/components/hajimi/cardMethod.js"

export default {
    whoFirst(allMes){
        //判断先攻
        // return allMes.allMesMy.playerNow.name
        return Math.random() > 0.5 ? allMes.allMesMy.playerNow.name : allMes.allMesBot.playerNow.name
    },
    async botTurn(allMes){
        //bot回合
        allMes.playingNow = allMes.allMesBot.playerNow.name
        allMes.stepName = "准备阶段"
        //执行判定等效果结算
        //准备阶段
        allMes.allMesBot.cardGroundList.forEach(item=>{
            item.prepare = true
        })//处理覆盖的卡可发动
        allMes.allMesMy.cardGroundList.forEach(item=>{
            item.prepare = true
        })//处理覆盖的卡可发动
        await this.waitToDo(1000,()=>{
            allMes.stepName = "开始阶段"
            allMes = basicCardList.drawCard(allMes,"allMesBot",2)
            //摸两张卡
            allMes.allMesBot.playerNow.power+=2
            //回两格气
        })
        await this.waitToDo(1000,async ()=>{
        allMes.stepName = "主要阶段"
        allMes = await this.botUseCard(allMes)
        //bot使用卡牌
       })
       await this.waitToDo(1000,async ()=>{
        allMes.stepName = "战斗阶段"
        allMes = await this.botUseSkill(allMes)
       })
       console.log("bot结束战斗阶段")
       await this.waitToDo(1000,async()=>{
        allMes.stepName = "结束阶段"
       })
       console.log("bot结束回合")
       return allMes
    },
    async myTurn(allMes){
        //我方回合
        allMes.playingNow = allMes.allMesMy.playerNow.name
        await this.waitToDo(1000,()=>{
            allMes.stepName = "准备阶段"
            //准备阶段
            allMes.allMesBot.cardGroundList.forEach(item=>{
                item.prepare = true
            })//处理覆盖的卡可发动
            allMes.allMesMy.cardGroundList.forEach(item=>{
                item.prepare = true
            })//处理覆盖的卡可发动
        })
        console.log("我方准备阶段处理完毕")
        //执行判定等效果结算
        await this.waitToDo(1000,()=>{
            allMes.stepName = "开始阶段"
            allMes = basicCardList.drawCard(allMes,"allMesMy",2)
            //摸两张卡
            allMes.allMesMy.playerNow.power+=2
            //回两格气
        })
        console.log("我方开始阶段处理完毕")
        await this.waitToDo(1000,()=>{
            allMes.stepName = "主要阶段"
        })
        console.log("我方主要阶段开始")
        return allMes
    },
    async botUseCard(allMes){
        console.log("bot使用牌",allMes.allMesBot.handCardList)
        //如果战术区双方都是空的，就直接往下走
        //bot使用牌,进入连锁链
        let choiceCardMes = this.botUseCardOne(allMes)
        allMes = choiceCardMes.allMes
        //从手上去掉使用的卡
        if(choiceCardMes.canUse){
            allMes.chain.push({
                card: basicCardList.getMesByCardName(choiceCardMes.cardName),
                user:"allMesBot"
            })
            console.log("bot使用卡牌："+choiceCardMes.cardName,allMes.allMesMy.cardGroundList.length)
            if(allMes.allMesMy.cardGroundList.length>0){
                allMes = await cardMethod.myUseChain(allMes)
                // allMes = await this.linkChain(allMes,choiceCardMes.cardName)
                // return new Promise((resolve)=>{
                //     //在这里处理连锁结果 
                //     console.log("创建弹窗Promise")
                //     // 确保showChainDialog存在
                //     if (typeof this.showChainDialog === 'function') {
                //         console.log("显示连锁弹窗")
                //         this.showChainDialog(allMes,choiceCardMes.cardName, (dialogResult) => {
                //             console.log("收到弹窗结果：", dialogResult)
                //             allMes = dialogResult
                //             //bot暂不进行二次连锁
                //             //处理连锁链


                //             resolve(allMes)
                //         })
                //     } else {
                //         console.error("showChainDialog方法未定义")
                //         resolve(allMes)
                //     }
                // }) 
                //bot暂时不执行自连锁逻辑

            }else{
                console.log("处理连锁结果",allMes.chain)
                allMes = await cardMethod.dealChain(allMes)
                allMes.chain = []
                //处理这张卡的效果
                allMes.cardUsedList.push(basicCardList.getMesByCardName(choiceCardMes.cardName))
                //送入墓地
            }//重复调用直到没有牌可以发动或者放置
            return await this.waitToDo(1000,async()=>{
                return await this.botUseCard(allMes)
            })

        }else{
            console.log("bot使用完毕卡牌",allMes)
            return await this.coverCards(allMes)
            //没有可操作的卡牌，覆盖能盖的卡后直接进入战斗阶段
        }
    },
    async linkChain(allMes){
        if(allMes.allMesMy.cardGroundList && allMes.allMesMy.cardGroundList.length>0){
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
                            console.log("二次连锁")
                            allMes = await this.waitToDo(1000,async()=>{
                                return await this.linkChain(allMes)
                            })
                            resolve(allMes)
                        }else{
                            allMes = dialogResult
                            resolve(allMes)
                        }
                        
                    })
                } else {
                    console.error("showChainDialog方法未定义")
                    resolve(allMes)
                }
            }) 
        }else{
            return allMes
        }
    },//递归连锁方法，直到选择否为止，不停的询问我方是否继续连锁
    async coverCards(allMes){
        if(allMes.allMesBot.cardGroundList.length===3||!stop){
            console.log("bot战术区满了/没有可以盖的卡了",allMes)
            return allMes
        }else{
            let handCardList = []
            let stop = false
            if(allMes.allMesBot.handCardList.length>0){
                allMes.allMesBot.handCardList.forEach(item=>{
                    if(item.scene==="passive"&&!stop){
                        //如果是被动卡，就直接覆盖
                        allMes.allMesBot.cardGroundList.push(item)
                        console.log("bot覆盖卡："+item.name)
                        stop = true
                    }
                    else{
                        handCardList.push(item)
                    }
                })
            }
            allMes.allMesBot.handCardList = handCardList
            return await this.waitToDo(1000,async()=>{
                return await this.coverCards(allMes)
            })//递归调用，直到没有被动卡可以覆盖或者战术区满了
        }
    },
    botUseCardOne(allMes){
        //bot默认从第一张开始检查能不能发动或者覆盖，直到全部检查一遍
        let stop = false
        let cardName = ""
        let handCardList = []
        allMes.allMesBot.handCardList.forEach(item=>{
            if(cardMethod.checkCardCanUse(allMes,item,"allMesBot")&&stop===false){
                //如果这张牌需要的气小于等于当前玩家的气，就使用这张牌
                stop = true
                cardName = item.name
            }else{
                handCardList.push(item)
            }
        })
        allMes.allMesBot.handCardList = handCardList
        return {
            allMes:allMes,
            canUse:stop,
            cardName:cardName,
        }
    },
    async botUseSkill(allMes){
        console.log("bot使用技能")
        return allMes
    },
    async waitToDo(time,fun){
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time);
        })
        if (typeof fun === 'function') {
            return await fun();
        }
    }//等待执行完成
}