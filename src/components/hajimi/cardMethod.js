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
            for(const item of allMes.chain){
                await this.waitToDo(async()=>{
                    if(basicCardList.isCard(item.card.name)){
                        console.log("处理卡的方法",item.card.name)
                        allMes = await basicCardList.useCard(allMes,item.card.name,item.user)
                    }else{
                        console.log("处理技能的方法",item.card.name)
                        allMes = await skillList.useCard(allMes,item.card.name,item.user)
                    }
                },1000)
                
            }
        }else{
            console.log("连锁链为空")
        }
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
                    if(index === 0){
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
                    if(allMes.allMesMy.cardGroundList.length===0){
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
                            if(allMes.allMesBot.cardGroundList.length===0){
                                //我方没有可连锁盖牌
                                console.log("bot没有可连锁盖牌，无法继续连锁")
                                console.log("处理连锁结果",allMes.chain)
                                allMes = await this.dealChain(allMes)
                                resolve(allMes)
                            }else{
                                console.log("bot有可连锁盖牌，继续连锁")
                                allMes = await this.botUseChain(allMes)
                                //进入bot连锁方法
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
    }//等待执行完成

}