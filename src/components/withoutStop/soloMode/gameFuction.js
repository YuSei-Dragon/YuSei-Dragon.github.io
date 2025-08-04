import cardFuction from "./cardFuction.js"
import botFuction from "./botFuction.js"
import meFuction from "./meFuction.js"
export default {
    getInputText(inputText,allMes){
        console.log(inputText)
        if(inputText!=""){
            if(allMes.meStatus!=""){
                if(allMes.meStatus == "readyToSummon"){
                    //正在选择召唤的怪兽
                    console.log("选择怪兽")
                    return meFuction.meReadyToSummon(inputText,allMes)
                }else if(allMes.meStatus == "waitSendAttribute"){
                    console.log("提交一个属性")
                    return meFuction.waitSendAttribute(inputText,allMes)
                }
            }else{
                if(inputText.startsWith("game")){
                    return this.startWithGame(inputText,allMes)
                }else if(inputText.startsWith("show")){
                    return this.startWithShow(inputText,allMes)
                }else if(inputText.startsWith("monster")){
                    return this.startWithMonster(inputText,allMes)
                }else if(inputText.startsWith("bot")){
                    return this.startWithBot(inputText,allMes)
                }else if(inputText.startsWith("me")){
                    return this.startWithMe(inputText,allMes)
                }else{
                    //非游戏指令
                    console.log("非游戏指令")
                    allMes.outputList.push("指令错误...")
                    return {
                        ...allMes,
                        result:"error"
                    }
                }
            }
            
        }else{
            //空指令
            // console.log("空指令")
            allMes.outputList.push("空指令...")
                return {
                    ...allMes,
                    result:"error"
                }

        }
    },
    startWithBot(input,allMes){
        let mesList = input.split(" ")
        //通过空格分隔切割字符串
        mesList = Array.from(new Set(mesList))
        if(mesList[1]== "first"){
            //bot先攻
            const res = this.botTurnStart(allMes)
            if(res.result){
                allMes = res.allMes
                return {
                    result:true,
                    allMes:allMes,
                    mes:"startWithBot"
                }
            }else{
                //bot回合结束
                allMes.outputList.push("bot回合结束...")
                return {
                    result: false,
                    allMes:allMes,
                    mes:"startWithBotEnd"
                }
            }
            
        }else{
            //错误指令
            console.log("错误指令")
            allMes.outputList.push("指令错误...")
            return {
                ...allMes,
                result:"error"
            }
        }
    },//bot先攻
    startWithMe(input,allMes){
        let mesList = input.split(" ")
        //通过空格分隔切割字符串
        mesList = Array.from(new Set(mesList))
        if(mesList[1]== "first"){
            //me先攻
            allMes = this.meTurnStart(allMes)
            return {
                allMes:allMes,
                result:"meFirst",
            }
        }else if(mesList[1]== "end"){
            //me回合结束
            allMes.outputList.push("me回合结束...")
            allMes.meMonsterList.map(item=>{
                item.haveLe = false
                //重置我方所有怪兽 le状态
            })
            allMes.botMonsterList.map(item=>{
                item.haveBing = false
                //重置对方所有怪兽 bing状态
            })
            return {
                allMes:allMes,
                result:"meEnd"
            }
        }else if(mesList[1]=="summon"){
            return meFuction.summonMonsterListShow(allMes)
        }else{
            //错误指令
            console.log("错误指令")
            allMes.outputList.push("指令错误...")
            return {
                ...allMes,
                result:"error",
            }
        }
    },//me先攻
    botTurnStart(allMes){
        let res = botFuction.botTrun(allMes)
        console.log("bot开启先攻",res.allMes,res.result)
        // if(res.result){
        //     allMes = res.allMes
        // }else{
        //     //bot回合结束 
        // }
        return {
            result:res.result,
            allMes:allMes
        }
    },//bot的回合
    meTurnStart(allMes){
        allMes.outputList.push("me回合开始...")
        return {
            allMes:allMes
        }
    },//me的回合
    async startWithGame(input,allMes){
        let mesList = input.split(" ")
        //通过空格分隔切割字符串
        mesList = Array.from(new Set(mesList))
        if(mesList[1]== "end"){
            //结束游戏
            return {
                result:"endGame"
            }
        }
        if(mesList[1]== "start"){
            //开始游戏
            let deck = cardFuction.getDeck()
            //获取基本卡组
            allMes.deck = deck
            // allMes = this.botGetCards(6,allMes)
            //关闭bot抽卡，进行卡牌效果测试
            // console.log(allMes)
            allMes = this.meGetCards(6,allMes)
            //玩家抽卡完成

            await this.waitToDo(300,()=>allMes.outputList.push("游戏开始..."))
            await this.waitToDo(300,()=>allMes.outputList.push("你的先攻..."))
            //测试暂时不处理先后攻，默认我方先动
            allMes = meFuction.startMyTurn(allMes)
            return {
                ...allMes,
                result:"startGame"
            }
        }else{
            //错误指令
            console.log("错误指令")
            allMes.outputList.push("指令错误...")
            return {
                ...allMes,
                result:"error"
            }
        }
    },//游戏开始方法
    async showForAwait(list=[],index=0,allMes){
        let index1 = index
         if(Array.isArray(list)&&list.length>0&&index<list.length){
            await this.waitToDo(500,()=>{
                Object.keys(list[index]).forEach(item=>{
                allMes.outputList.push(item+":"+list[index][item]) 
                })
            })
            await this.showForAwait(list,index1+1,allMes)
         }else{
            return allMes
         }
    },
    async startWithShow(input,allMes){
        let mesList = input.split(" ")
        //通过空格分隔切割字符串
        mesList = Array.from(new Set(mesList))
        if(mesList[1]== "my"){
            let result = this.startWithShowMy(mesList,allMes)
            // console.log(result)
            allMes = this.showForAwait(result,0,allMes)
            return {
                ...allMes,
                result:"success"
            }
        }else if(mesList[1]== "bot"){
            let result = this.startWithShowBot(mesList,allMes)
            allMes = this.showForAwait(result,0,allMes)
            return {
                ...allMes,
                result:"success"
            }
        }else if(mesList[1]== "all"){
            console.log(allMes)
            return {
                result:"show"
            }
        }
    },
    startWithMonster(input,allMes){
        let mesList = input.split(" ")
        //通过空格分隔切割字符串
        mesList = Array.from(new Set(mesList))
        if(mesList[1]=="call"){
            if(mesList.length==2){
                console.log("召唤的怪兽名不能为空！")
                allMes.outputList.push("召唤的怪兽名不能为空！")
                return {
                    ...allMes,
                    result: "error"
                }
            }else{
              return cardFuction.canCallMonster(mesList[3],allMes)  
            }
        }
    },
    startWithShowMy(input,allMes){
        if(input[2]=="monsters"){
            return cardFuction.getMeAllMonsters()
        }
    },
    startWithShowBot(input,allMes){
        if(input[2]=="monsters"){
            return cardFuction.getBotAllMonsters()
        }
    },
    botGetCards(num,allMes){
        if(num>0){
            let newDeck = []
            for(let i = 0;i<allMes.deck.length;i++){
                if(i<num){
                   allMes.botCardList.push(allMes.deck[i]) 
                }else{
                    newDeck.push(allMes.deck[i])
                }
            }
            allMes.deck = newDeck
            //更新卡组
        }else{
            allMes.outputList.push("抽卡数量不能小于等于0！")
        }
        return allMes
    },
    meGetCards(num,allMes){
        // console.log(allMes.meCardList)
        if(num>0){
            let newDeck = []
            for(let i = 0;i<allMes.deck.length;i++){
                if(i<num){
                   allMes.meCardList.push(allMes.deck[i]) 
                }else{
                    newDeck.push(allMes.deck[i])
                }
            }
            allMes.deck = newDeck
            //更新卡组
        }else{
            allMes.outputList.push("抽卡数量不能小于等于0！")
        }
        return allMes
    },
    initTest(allMes){
        //初始化设置的地方，用于测试
        allMes.botCardList = [ 
            {name:"兵粮寸断",text:"指定一只怪兽发动，兵粮寸断多次使用不会叠加，下次对方的回合进行判定，如果和兵粮寸断的属性不同，对方弃置两张牌，否则该怪兽全属性减半",type:"锦囊卡"},
        ]
        return allMes
    },
    async waitToDo(howLong,method){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            method()
            resolve(howLong)
        },howLong)
        })
    }//同步化
}