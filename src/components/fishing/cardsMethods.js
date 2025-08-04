export default {
    getSomething(sb){
        return sb
    },
    // HandCardList.value = allMes.otherPlayerMes
    // myBlood.value = allMes.myMes.life
    // myHandCardList.value = allMes.myMes.handCard
    // myMonster.value = allMes.myMes.monster
    // myMonsterList.value = allMes.myMes.myMonsterList
    // desk.value = allMes.cardList
    // settlementList.value = allMes.settlementList
    // isUsedDrink.value = allMes.isUsedDrink
    // haveDrinkKill.value = allMes.haveDrinkKill
    // isShowChoiceBlock.value = allMes.isShowChoiceBlock
    // choiceBlockStyle.value = allMes.choiceBlockStyle
    // showChoicecanSee.value = allMes.showChoicecanSee
    // choiceMes.value = allMes.choiceMes
    meCanUse(card,allMes){
        //在我方回合可以直接使用的牌
        let result = true
        if(card.name=="闪"){
            result = false
        }else if(card.name=="无懈可击"){
            result = false
        }
        if(card.name == "酒"){
            if(allMes.isUsedDrink){
                //如果这回合已经使用过酒
                result = false
            }
        }
        return result
    },
    meCanUseWithoutChoice(card){
        //不需要选取目标的牌
        let result = false
        if(card.name=="闪"){
            result = true
        }else if(card.name=="桃"){
            result = true
        }else if(card.name=="南蛮入侵"){
            result = true
        }else if(card.name=="万箭齐发"){
            result = true
        }else if(card.name=="酒"){
            result = true
        }else if(card.name=="无懈可击"){
            result = true
        }else if(card.name=="桃园结义"){
            result = true
        }else if(card.name=="五谷丰登"){
            result = true
        }
        return result
    },
    cardUseMethod(user,target,card,allMes){
        //使用者 对象 卡 所有信息

        //根据卡 来区分各种不同的情况
        console.log("处理",card.name)
        if(card.name == "杀"){
            return this.useKill(user,target,card,allMes)
        }
        if(card.name == "决斗"){
            return this.useDuel(user,target,card,allMes)
        }
        if(card.name == "过河拆桥"){
            return this.useChai(user,target,card,allMes)
        }
        if(card.name == "顺手牵羊"){
            return this.useShun(user,target,card,allMes)
        }
    },
    async useKill(user,target,card,allMes){
        //处理杀 的方法
        let otherPlayers = allMes.otherPlayerMes
        let targetHandList = []
        otherPlayers.forEach(item=>{
            if(item.name == target){
                targetHandList = item.list
            }
        })//获取使用卡目标的手卡情况
        //模拟思考时间，让前面的动画播放完毕
        await this.wait(2000,()=>{
            console.log("模拟思考完毕")
          })
        if(this.checkCardExist('闪',targetHandList)){
            //有闪出闪
            console.log("有闪")
            return this.otherUseCard('闪',target,allMes)
            
        }else{
            //没闪，准备掉血
            console.log("没闪")
            //准备结算 伤害计算
            return allMes
        }
    },
    async useDuel(user,target,card,allMes){
        //处理决斗的方法
        allMes.userCard = "决斗"
        let otherPlayers = allMes.otherPlayerMes
        let targetHandList = []
        otherPlayers.forEach(item=>{
            if(item.name == target){
                targetHandList = item.list
            }
        })//获取使用卡目标的手卡情况
        await this.wait(2000,()=>{
        console.log("模拟思考完毕")
        })
        if(this.checkCardExist('杀',targetHandList)){
            //有杀出杀
            console.log("有杀")
            console.log(allMes)
            let res = this.otherUseCard('杀',target,allMes,false)
            // res.isUserCard = true
            // res.userCard = "决斗"
            console.log(res)
            return res
        }else{
            //没闪，准备掉血
            console.log("没杀")
            //准备结算 伤害计算
            return allMes
        }
    },
    async useChai(user,target,card,allMes){
        allMes.isShowChoiceBlock = true
        allMes.choiceBlockStyle = true
        allMes.showChoicecanSee = false
        let list = []
        allMes.otherPlayerMes.forEach(item=>{
            if(item.name == target){
                list = item.list
            }
        })
        allMes.choiceMes = {
            type:"card",
            list:list,
        }
        allMes.userCard = "过河拆桥"
        allMes.cardList.push(card)
        allMes.settlementList = []
        //清空等待区
        console.log("处理 过河拆桥 完毕")
        return allMes
    },
    async useShun(user,target,card,allMes){
        allMes.isShowChoiceBlock = true
        allMes.choiceBlockStyle = true
        allMes.showChoicecanSee = false
        let list = []
        allMes.otherPlayerMes.forEach(item=>{
            if(item.name == target){
                list = item.list
            }
        })
        allMes.choiceMes = {
            type:"card",
            list:list,
        }
        allMes.userCard = "顺手牵羊"
        allMes.cardList.push(card)
        allMes.settlementList = []
        //清空等待区
        console.log("处理 顺手牵羊 完毕")
        return allMes
    },
    checkCardExist(cardName,targetHandList){
        console.log("检测是否有"+cardName,targetHandList)
        let result = false
        targetHandList.forEach(item=>{
            if(item.name == cardName){
                result = true
            }
        })
        return result
    },
    otherUseCard(cardName, target,allMes,userCardName=true){
        //其他玩家的响应对应卡牌的方法
        // console.log(allMes)
        let otherPlayers = allMes.otherPlayerMes
        otherPlayers.map(item=>{
            // console.log(item)
            if(item.name == target){
                //找到目标玩家
                let resList = []
                let finish = false
                item.list.forEach(listItem=>{
                    console.log(123,item.list)
                    if(listItem.name == cardName&&finish==false){
                        finish = true
                        console.log(target+"使用了"+ cardName+"!")
                        setTimeout(() => {
                            allMes.settlementList.push({
                                card: cardName,
                                user:target,
                                cardMes:listItem
                            })
                            allMes.isUserCard = true
                            if(userCardName){
                                allMes.userCard = cardName
                            }
                        }, 1000);
                    }else{
                        resList.push(listItem)
                    }
                })
                item.list = resList
                //去掉一张目标卡牌
                console.log(item,resList)
                return item
            }
        })//获取使用卡目标的手卡情况
        allMes.otherPlayerMes = otherPlayers
        // console.log(otherPlayers,allMes)
        return allMes
    },
    checkCardChoiceMore(card){
        if(card.name=="南蛮入侵"||card.name=="万箭齐发"||card.name=="桃园结义"||card.name=="五谷丰登"){
            return true
        }else{
            return false
        }
    },//检查卡牌效果能不能多选
    cardUseMethodWithout(user,card,allMes){
        let otherPlayerMes = allMes.otherPlayerMes
        otherPlayerMes.forEach(item=>{
            if(item.name == user){
                return this.otherCardUseMethodWithout(user,card,allMes)
            }
        })
        return this.myCardUseMethodWithout(user,card,allMes)
        //判定是谁用
    },
    myCardUseMethodWithout(user,card,allMes){
        if(card.name == "桃"){
            allMes.myMes.life+=allMes.myMes.monster.life
            allMes.resNum = allMes.myMes.monster.life+100
        }
        if(card.name == "酒"){
            allMes.isUsedDrink = true
        }
        if(card.name == "南蛮入侵"){
            let playerList = this.getPlayersOneByOne(user,allMes.playerList)
            //获取生效的顺序
            allMes.userCard = card.name
            allMes.playerListSort = playerList
            return allMes
        }
        if(card.name == "桃园结义"){
            allMes.myMes.life +=200
            allMes.otherPlayerMes.map(item=>{
                item.life+=200
            })
            //全体加200血
            allMes.userCard = "桃园结义"
            return allMes
        }
        if(card.name == "五谷丰登"){
            let playerList = this.getPlayersOneByOne(user,allMes.playerList,true)
            //获取生效的顺序
            allMes.userCard = card.name
            allMes.playerListSort = playerList
            let len = allMes.playerList.length
            //获取玩家数量
            let getRes = this.getCard(len,allMes.cardList)
            allMes.choiceMes = {
                type:"card",
                list:getRes.getList,
            }
            allMes.cardList = getRes.desk
            return allMes
        }

        return allMes
    },
    getPlayersOneByOne(user,playerList,self=false){
        let list1 = []
        let list2 = []
        let find = false
        playerList.forEach(item=>{
            if(item!=user){
                if(!find){
                    list1.push(item)
                }else{
                    list2.push(item)
                }
            }else{
                //去除发起者的结算
                find = true
            }
        })
        let result = []
        if(self){
            result.push(user)
        }
        list2.forEach(item=>{
            result.push(item)
        })
        list1.forEach(item=>{
            result.push(item)
        })
        return result
    },
    otherCardUseMethodWithout(user,card,allMes){
        if(card.name == "桃"){
            allMes.otherPlayerMes.map(item=>{
                if(item.name == user){
                    item.life+=item.firstMonster.life
                    allMes.resNum = item.firstMonster.life+100
                }
            })
        }
        if(card.name == "酒"){
            allMes.isUsedDrink = true
        }
        return allMes
    },
    wait(howLong,method){
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            method()
            resolve(howLong)
            // console.log(method)
          },howLong)
        })
    },//同步化
    getCard (num,desk){
        let result = []
        let cardDesk = []
        desk.forEach((item,index)=>{
          if(index<num){
            result.push(item)
          }else{
            cardDesk.push(item)
          }
        })
        return {
            getList:result,
            desk:cardDesk
        }
    },//从卡组中抽卡
    botWithoutChoice(card,cardIndex,botName,allMes){
        allMes.userCard = card.name
        if(card.name == "桃"){
            allMes.otherPlayerMes.map(item=>{
                if(item.name == botName){
                    item.life +=200
                    let cardList = []
                    for(let i=0;i<item.list.length;i++){
                        if(i==cardIndex){
                            //从手卡去掉这张卡
                        }else{
                            cardList.push(item.list[i])
                        }
                    }
                    item.list = cardList
                }
            })
            allMes.cardList.push(card)
            //加入弃卡堆
            return allMes
        }
    },//电脑使用不需要选择的卡
    botWithChoice(card,cardIndex,botName,allMes){
        if(card.name == "杀"){
                
        }
    },//电脑使用需要选择的卡
}