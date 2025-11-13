export default {
    async cardChain004(allMes,user){
        if(user === "allMesMy"){
            //玩家处理
            //玩家选择目标
            console.log("我方处理:了如指掌")
            if(allMes.allMesBot.cardGroundList.length > 0){
                let targetList = await this.selectTarget(allMes,['我方盖卡','对方盖卡'],"了如指掌","allMesMy")
                //得到选中的卡
                let target = targetList[0]//了如指掌只能选一张
                let cardGroundList = []
                console.log("target",targetList,target)
                allMes.allMesBot.cardGroundList.forEach((item,index)=>{
                    if(index === target.index){
                        //将选中的卡加入墓地
                        allMes.cardUsedList.push(this.getClearUsed(item))
                        //确保回收的卡牌参数纯净
                    }else{
                        cardGroundList.push(item)
                    }
                })
                allMes.allMesBot.cardGroundList = cardGroundList
                //更新对方战术区
                console.log("了如指掌处理结果",allMes)
            }else{
                console.log("对方战术区没有卡，省略处理")
            }
        }else{
            console.log("对方处理:了如指掌")
            //bot处理
            if(allMes.allMesMy.cardGroundList.length > 0){
                let randomIndex = this.selectRandom(allMes.allMesMy.cardGroundList.length - 1)
                let cardGroundList = []
                allMes.allMesMy.cardGroundList.forEach((item,index)=>{
                    if(index === randomIndex){
                        //将选中的卡加入墓地
                        allMes.cardUsedList.push(this.getClearUsed(item))
                        //确保回收的卡牌参数纯净
                    }else{
                        cardGroundList.push(item)
                    }
                })
                allMes.allMesMy.cardGroundList = cardGroundList
            }else{
                console.log("我方战术区没有卡，省略处理")
            }
            //随机选一张去除

        }
        return allMes
    },//了如指掌的处理方法
    async cardChain005(allMes,user){
        if(user === "allMesMy"){
            //玩家处理
            allMes.allMesBot.playerNow.power--
        }else{
            //bot处理
            allMes.allMesMy.playerNow.power--
        }
        return allMes
    },//落井下石的处理方法
    async cardChain006(allMes,user){
        if(user === "allMesMy"){
            //玩家处理
            allMes.allMesBot.monsterNow.helpless = true
        }else{
            //bot处理
            allMes.allMesMy.monsterNow.helpless = true
        }
        return allMes
    },//兵粮寸断的处理方法
    async cardChain007(allMes,user){
        console.log("处理:如法炮制")
        if(user === "allMesMy"){
            //玩家处理
            //玩家选择目标
            console.log("我方处理:如法炮制")
            let targetList = await this.selectTarget(allMes,['墓地'],"如法炮制","allMesMy")
            //得到选中的卡
            let target = targetList[0]//如法炮制只能选一张
            this.dealBasic(allMes,target.name,user)
            console.log("如法炮制处理结果",allMes)
        }else{
            //bot处理
            let selectList = []
            allMes.cardUsedList.forEach((item,index)=>{
                if(item.type === "basic"){
                    selectList.push(item)
                }
            })
            let target = selectList[this.selectRandom(selectList.length - 1)]
            //随机选一张
            this.dealBasic(allMes,target.name,user)
            console.log("如法炮制处理结果",allMes)
        }
        return allMes
    },//如法炮制的处理方法
    async cardChain008(allMes,user){
        console.log("处理:党同伐异")
        if(user === "allMesMy"){
            //玩家处理
            //玩家选择目标
            console.log("我方处理:党同伐异")
            let choicedCard = allMes.allMesBot.handCardList[this.selectRandom(allMes.allMesBot.handCardList.length - 1)]
            //bot随机选一张展示
            console.log("bot展示的卡",choicedCard)
            await new Promise( (resolve)=>{
                if (typeof this.showCards === 'function') {
                    this.showCards("allMesBot",[choicedCard],()=>{
                        resolve()
                    })
                }else{
                    console.error("showCards方法未定义")
                }
            })
            let filterList = []
            let num = 0 // 我方弃置的卡
            await this.waitToDo(1000,()=>{
                console.log("我方弃置卡")
                allMes.allMesMy.handCardList.filter((item,index)=>{
                    if(item.type !== choicedCard.type) {
                        filterList.push(item)
                    }else{
                        num++
                        allMes.cardUsedList.push(this.getClearUsed(item))
                        //确保回收的卡牌参数纯净
                        //加入墓地
                    }
                })//我方弃置所有同类型
                allMes.allMesMy.handCardList = filterList
            })
            await this.waitToDo(1000,()=>{
                //去除同数量对方同类型卡牌
                console.log("对方弃置卡",num)
                for(let i=0;i<num;i++){
                    if(allMes.allMesBot.handCardList.length>0){
                        let selectIndex = this.selectRandom(allMes.allMesBot.handCardList.length - 1)
                        allMes.allMesBot.handCardList = allMes.allMesBot.handCardList.filter((item,index)=>{
                            return index !== selectIndex
                        })
                        allMes.cardUsedList.push(this.getClearUsed(allMes.allMesBot.handCardList[selectIndex]))
                        //确保回收的卡牌参数纯净
                        // allMes.cardUsedList.push(allMes.allMesBot.handCardList[selectIndex])
                        //加入墓地
                    }else{
                        //bot手卡耗尽，直接跳过
                    }
                }
            })
        }else{
            //bot处理
            let targetList = await this.selectTarget(allMes,['我方手卡'],"党同伐异","allMesBot")
            //得到选中的卡
            let target = targetList[0]//党同伐异只能选一张
            await new Promise( (resolve)=>{
                if (typeof this.showCards === 'function') {
                    this.showCards("allMesMy",[allMes.allMesMy.handCardList[target.index]],()=>{
                       resolve() 
                    })
                }else{
                    console.error("showCards方法未定义")
                }
            })
            let type = allMes.allMesMy.handCardList[target.index].type
            let filterList = []
            let num = 0 // bot弃置的卡
            await this.waitToDo(1000,()=>{
                allMes.allMesBot.handCardList.filter((item,index)=>{
                    if(item.type !== type) {
                        filterList.push(item)
                    }else{
                        num++
                        allMes.cardUsedList.push(this.getClearUsed(item))
                        //确保回收的卡牌参数纯净
                        //加入墓地
                    }
                })//bot方弃置所有同类型
                allMes.allMesBot.handCardList = filterList
            })
             //去除同数量我方不同类型卡牌
            await this.waitToDo(1000,()=>{
                for(let i=0;i<num;i++){
                    if(allMes.allMesMy.handCardList.length>0){
                        let selectIndex = this.selectRandom(allMes.allMesMy.handCardList.length - 1)
                        allMes.allMesMy.handCardList = allMes.allMesMy.handCardList.filter((item,index)=>{
                            return index !== selectIndex
                        })
                        allMes.cardUsedList.push(this.getClearUsed(allMes.allMesMy.handCardList[selectIndex]))
                        //确保回收的卡牌参数纯净
                        //加入墓地
                    }else{
                        //my手卡耗尽，直接跳过
                    }
                }
            })

        }
        return allMes
    },//党同伐异的处理方法
    async cardChain009(allMes,user){
        console.log("处理:各怀鬼胎")
        let myCard =  await this.selectTarget(allMes,['我方手卡'],"各怀鬼胎","allMesBot")
        let myShowCard = allMes.allMesMy.handCardList[myCard[0].index]
        allMes.allMesMy.handCardList = allMes.allMesMy.handCardList.filter((item,index)=>{
            return index !== myCard[0].index
        })//从手卡去掉这张卡
        
        let selectIndex = this.selectRandom(allMes.allMesBot.handCardList.length - 1)
        let botCard = allMes.allMesBot.handCardList[selectIndex]
        //得到选中的卡
        allMes.allMesBot.handCardList = allMes.allMesBot.handCardList.filter((item,index)=>{
            return index !== selectIndex
        })//从手卡去掉这张卡
        console.log(myShowCard,botCard)
        await new Promise( (resolve)=>{
            if (typeof this.showCards === 'function') {
                this.showCards("allMesMy",[myShowCard],()=>{
                    resolve() 
                })
            }else{
                console.error("showCards方法未定义")
            }
        })
        await new Promise( (resolve)=>{
            if (typeof this.showCards === 'function') {
                this.showCards("allMesBot",[botCard],()=>{
                    resolve() 
                })
            }else{
                console.error("showCards方法未定义")
            }
        })
        console.log("各怀鬼胎 展示结束")
        return await this.waitToDo(1000,()=>{
            if(user === "allMesMy"){
                if(myShowCard.type === botCard.type){
                    //我方获得这两张卡
                    allMes.allMesMy.handCardList.push(myShowCard)
                    allMes.allMesMy.handCardList.push(botCard)
                }else{
                    //对方获得这两张卡
                    allMes.allMesBot.handCardList.push(myShowCard)
                    allMes.allMesBot.handCardList.push(botCard)
                }
            }else{
                if(myShowCard.type === botCard.type){
                    //对方获得这两张卡
                    allMes.allMesBot.handCardList.push(myShowCard)
                    allMes.allMesBot.handCardList.push(botCard)
                }else{
                    //我方获得这两张卡
                    allMes.allMesMy.handCardList.push(myShowCard)
                    allMes.allMesMy.handCardList.push(botCard)
                }
            }
            return allMes
        })
        
    },//各怀鬼胎的处理方法
    async cardChain011(allMes,user){
        console.log("处理:整编")
        this.drawCard(allMes,user,2)
        //先抽两张
        if(user === "allMesMy"){
            let myCard =  await this.selectTarget(allMes,['我方手卡'],"整编","allMesBot")
            let myShowCard = allMes.allMesMy.handCardList[myCard[0].index]
            allMes.allMesMy.handCardList = allMes.allMesMy.handCardList.filter((item,index)=>{
                return index !== myCard[0].index
            })//从手卡去掉这张卡
            allMes.cardUsedList.push(this.getClearUsed(myShowCard))
            //确保回收的卡牌参数纯净
            //加入墓地
        }else{
            let selectIndex = this.selectRandom(allMes.allMesBot.handCardList.length - 1)
            let botCard = allMes.allMesBot.handCardList[selectIndex]
            //得到选中的卡
            allMes.allMesBot.handCardList = allMes.allMesBot.handCardList.filter((item,index)=>{
                return index !== selectIndex
            })//从手卡去掉这张卡
            allMes.cardUsedList.push(this.getClearUsed(botCard))
            //确保回收的卡牌参数纯净
            //加入墓地
        }
        return allMes
    },//整编的处理方法
    async cardChain012(allMes,user){
        console.log("处理:观星")
        if(user === "allMesMy"){
            await new Promise( (resolve)=>{
                if (typeof this.showSeeStart === 'function') {
                    this.showSeeStart((res)=>{
                        allMes = res
                       resolve() 
                    })
                }else{
                    console.error("showSeeStart方法未定义")
                }
            })
        }else{
            let list = []
            let cardList = []
            allMes.cardList.forEach((item,index)=>{
                if(index<3){
                    list.push(item)
                }else{
                    cardList.push(item)
                }
                allMes.cardList = cardList
            })
            //提取3张卡，随机打乱直接分配
            list = this.shuffleArray(list)
            allMes.allMesBot.handCardList.push(list[0])
            //加入手牌
            cardList = []
            cardList.push(list[1])
            //放在顶部
            allMes.cardList.forEach((item,index)=>{
                cardList.push(item)
            })
            //放在底部
            cardList.push(list[2])
            allMes.cardList = cardList
        }
        return allMes
    },//观星的处理方法
    async cardChain013(allMes,user){
        if(user === "allMesMy"){
            let myCard =  await this.selectTarget(allMes,['我方手卡'],"凝神运气","allMesBot")
            let myShowCard = allMes.allMesMy.handCardList[myCard[0].index]
            allMes.allMesMy.handCardList = allMes.allMesMy.handCardList.filter((item,index)=>{
                return index !== myCard[0].index
            })//从手卡去掉这张卡
            allMes.cardUsedList.push(this.getClearUsed(myShowCard))
            //确保回收的卡牌参数纯净
            //加入墓地
            if(allMes.allMesMy.playerNow.power < 5){
                allMes.allMesMy.playerNow.power++
            }
            if(allMes.allMesMy.handCardList.length === 0&&allMes.allMesMy.playerNow.power < 5){
                allMes.allMesMy.playerNow.power++
            }
        }else{
            let selectIndex = this.selectRandom(allMes.allMesBot.handCardList.length - 1)
            let botCard = allMes.allMesBot.handCardList[selectIndex]
            //得到选中的卡
            allMes.allMesBot.handCardList = allMes.allMesBot.handCardList.filter((item,index)=>{
                return index !== selectIndex
            })//从手卡去掉这张卡
            allMes.cardUsedList.push(this.getClearUsed(botCard))
            //确保回收的卡牌参数纯净
            //加入墓地
            if(allMes.allMesBot.playerNow.power < 5){
                allMes.allMesBot.playerNow.power++
            }
            if(allMes.allMesBot.handCardList.length === 0&&allMes.allMesBot.playerNow.power < 5){
                allMes.allMesBot.playerNow.power++
            }
        }
        return allMes
    },//凝神运气的处理方法
    async cardChain014(allMes,user){
        if(user === "allMesMy"){
            await new Promise( (resolve)=>{
                if (typeof this.showGetMore === 'function') {
                    this.showGetMore((res)=>{
                        allMes = res
                       resolve() 
                    })
                }else{
                    console.error("showGetMore方法未定义")
                }
            })
        }else{
            let num = this.selectRandom(1)
            //0~1
            if(num===0){
                allMes = this.drawCard(allMes,"allMesBot",1)
            }else{
                allMes = this.drawCard(allMes,"allMesBot",3)
            }//不存在对两张的可能性，要么抽一张要么三张
        }
        return allMes
    },//得寸进尺的处理方法
    async cardChain015(allMes,user){
        let cardList= []
            allMes.cardUsedList.forEach((item,index)=>{
                if(item.type==="basic"){
                    cardList.push({
                        item:item,
                        index:index//单独记录index，方便从墓地中删除
                    })
                }
            })
        if(user === "allMesMy"){
            let myCard =  await this.selectTarget(allMes,['墓地(重整旗鼓)'],"重整旗鼓","allMesBot")
            allMes.allMesMy.handCardList.push(cardList[myCard[0].index].item)
            let delIndex = cardList[myCard[0].index].index
            allMes.cardUsedList.filter((item,index)=>{
                return index !== delIndex
            })//从墓地去掉这张卡
        }else{
            let botIndex = this.selectRandom(cardList.length - 1)
            allMes.allMesBot.handCardList.push(cardList[botIndex].item)
            let delIndex = cardList[botIndex].index
            allMes.cardUsedList.filter((item,index)=>{
                return index !== delIndex
            })//从墓地去掉这张卡
        }
        return allMes
    },//重整旗鼓的处理方法
    async cardChain016(allMes,user){
        if(user === "allMesMy"){
            let myCard = await this.selectTarget(allMes,['我方盖卡'],"等价交换","allMesBot")
            let botCard = await this.selectTarget(allMes,['对方盖卡'],"等价交换","allMesBot")
            let temp = myCard[0]
            allMes.allMesMy.cardGroundList[myCard[0].index] = allMes.allMesBot.cardGroundList[botCard[0].index]
            allMes.allMesBot.cardGroundList[botCard[0].index] = temp
            //交换
        }else{
            let botIndex = this.selectRandom(allMes.allMesBot.cardGroundList.length - 1)
            let myIndex = this.selectRandom(allMes.allMesMy.cardGroundList.length - 1)
            let temp = allMes.allMesBot.cardGroundList[botIndex]
            allMes.allMesBot.cardGroundList[botIndex] = allMes.allMesMy.cardGroundList[myIndex]
            allMes.allMesMy.cardGroundList[myIndex] = temp
        }
        return allMes
    },//等价交换的处理方法
    async cardChain017(allMes,user){
        let cardList= []
            allMes.cardUsedList.forEach((item,index)=>{
                if(item.type==="strategy"){
                    cardList.push({
                        item:item,
                        index:index//单独记录index，方便从墓地中删除
                    })
                }
            })
        if(user === "allMesMy"){
            let myCard =  await this.selectTarget(allMes,['墓地(黑魔法)'],"黑魔法","allMesBot")
            let cardListNew = []
            cardListNew.push(cardList[myCard[0].index].item)
            allMes.cardList.forEach(card=>{
                cardListNew.push(card)
            })
            allMes.cardList = cardListNew
            let delIndex = cardList[myCard[0].index].index
            allMes.cardUsedList.filter((item,index)=>{
                return index !== delIndex
            })//从墓地去掉这张卡
        }else{
            let botIndex = this.selectRandom(cardList.length - 1)
            let cardListNew = []
            cardListNew.push(cardList[botIndex].item)
            allMes.cardList.forEach(card=>{
                cardListNew.push(card)
            })
            allMes.cardList = cardListNew
            let delIndex = cardList[botIndex].index
            allMes.cardUsedList.filter((item,index)=>{
                return index !== delIndex
            })//从墓地去掉这张卡
        }
        return allMes
    },
    async cardChain018(allMes,user){
        const qiNum = allMes[user].playerNow.power
        //记录当前剩下多少气
        allMes = this.drawCard(allMes,user,qiNum)
        allMes[user].playerNow.power = 3
        allMes[user].playerNow.weak = qiNum
        return allMes
    },//破釜沉舟的处理方法
    drawCard(allMes,user,num){
        let list = allMes.cardList
        let listNew = []
        //当前卡池
        list.forEach((item,index)=>{
            if(index<num){
                allMes[user].handCardList.push(item)
            }else{
                listNew.push(item)
            }
        })//把卡加入手卡
        allMes.cardList = listNew
        //刷新卡池
        return allMes
    },
    async dealBasic(allMes,name,user){
        if(name==="桃"){
            allMes = this.changeMonsterMes(allMes,user,"nowLife","10%")
        }
        if(name==="闪"){
            allMes[user].monsterNow.flash = true
            allMes[user].playerNow.power--
        }
        if(name === "酒"){
            allMes[user].monsterNow.penetrate = true
        }
    },
    changeMonsterMes(allMes,user,attribute,num){
        if(attribute === "nowLife"){
            let life = allMes[user].monsterNow.nowLife
            let maxLife = allMes[user].monsterNow.life
            if(num.includes("%")){
                num = num.replace("%","")
                num = num/100
                life = life + maxLife*num
            }else{
                life = life + num
            }
            if(life>maxLife){
                life = maxLife
            }
            allMes[user].monsterNow.nowLife = life
        }//因为暂时没有能直接造成伤害的卡，所以这里暂时不用处理闪
        return allMes
    },//处理怪兽的数据变化
    async selectTarget(allMes,type,name,user){
        return new Promise((resolve) => {
            if(typeof this.showSelectCardDialog === 'function'){
                console.log("打开选择弹窗")
                this.showSelectCardDialog(allMes,type,name,async(dialogResult)=>{
                    console.log("选择的目标",dialogResult)
                    resolve(dialogResult)
                })
            } else {
                console.error("showSelectCardDialog方法未定义")
                resolve([])
            }
        })
    },//Battlefield  最上层调用此方法的组件
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
    selectRandom(size){
        return Math.floor(Math.random() * (size + 1))
    },
    shuffleArray(array) {
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
    },//随机打乱数组
    getClearUsed(item){
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
    },//获取清理后的回收卡牌
}