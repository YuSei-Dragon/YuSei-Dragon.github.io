import cardFuction from "./cardFuction.js"
import cardFuction1 from "./cardFuction1.js"
export default {
    startMyTurn(allMes){
        allMes.outputList.push("me的回合开始...")
        allMes = cardFuction1.dealWithJudge(allMes,"me")
        //处理 乐不思蜀 和 兵粮寸断 的效果
        return allMes
    },
    summonMonsterListShow(allMes){
        allMes.outputList.push("请选择要召唤的怪兽...")
        let monsterList = []
        if(cardFuction.havePlace(allMes.meMonsterList)){
        allMes.meAllMonsterList.forEach(item=>{
            let itemMes = cardFuction.getMonsterMesByName(item.name)
            if(cardFuction.checkCanCall(itemMes.callNeed,allMes.meCardList,allMes.meMonsterList)){
                //如果符合召唤条件，则展示
                let text = item.name + "---"
                itemMes.callNeed.forEach(need=>{
                    text+= need.type + " : " + need.num
                })
                allMes.outputList.push(text)
                monsterList.push(item)
            }
        })
        // console.log("展示可召唤怪兽完毕")
        allMes.monsterCanList = monsterList
        return {
            mes:"showMonstersCanSummon",
            allMes:allMes
        }
        }else{
            allMes.outputList.push("没有场地可以召唤怪兽了")
            return {
                    mes:"showMonstersCanSummonFail",
                    allMes:allMes
                }
        }
        
    },//展示可召唤的怪兽
    meReadyToSummon(inputText,allMes){
        if(inputText == "back"){
            allMes.outputList.push("取消召唤...")
            allMes.meStatus = ""
            return {
                mes:"cancelSummonChoice",
                allMes:allMes
            }
        }else if(Number.isInteger(Number(inputText)+1)&&Number(inputText)>=0){
            inputText = Number(inputText)
            console.log("选择召唤的怪兽")
            if(inputText>=allMes.monsterCanList.length){
                // console.log("输入有误")
                allMes.outputList.push("索引超出！")
                return{
                    mes:"error",
                    allMes:allMes
                }
            }else{
                //通过索引定位召唤的怪兽位置
                let monster = allMes.monsterCanList[inputText]
                // console.log(monster)
                return this.callMonster(monster.name,allMes)
            }
        }else{
            allMes.outputList.push("索引超出！")
            return{
                mes:"error",
                allMes:allMes
            }
        }
    },//选择要召唤的怪兽
    async waitToDo(howLong,method){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            method()
            resolve(howLong)
        },howLong)
        })
    },//同步化
    callMonster(name,allMes){
        //me的召唤方式
        let hand = allMes.meCardList
        let monsterMes = cardFuction.getMonsterMesByName(name)
        // console.log(monsterMes)
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
                    console.log(result)
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
            // console.log("检查召唤条件通过")
            allMes.meCardList = hand
            allMes.discardPile = discardPile
            let stopCall = false
            let meMonsterList = []
            allMes.meMonsterList.forEach(monsterPlaceItem=>{
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
                    allMes.outputList.push("me召唤了 "+monsterMes.name)
                    meMonsterList.push(monsterItem)
                }else{
                    meMonsterList.push(monsterPlaceItem)
                }
            })
            allMes.meMonsterList = meMonsterList
            let meAllMonsterList = []
            allMes.meAllMonsterList.forEach(item=>{
                if(item.name == monsterMes.name){
                    //从额外卡组去掉这张卡
                }else{
                    meAllMonsterList.push(item)
                }
            })
            allMes.meAllMonsterList = meAllMonsterList
            allMes.meStatus = ""
            //重置我的状态，从召唤中变成等待行动
            return {
                result :"done",
                allMes:allMes
            }
        }else{
            console.log("查找怪物详情出错！")
        }
    },//me的召唤方式
    waitSendAttribute(inputText,allMes){
        if(inputText=="0"||inputText=="1"||inputText=="2"||inputText=="3"||inputText=="4"){
            allMes.meJudge = inputText
            allMes.meStatus = ""
            allMes.botJudge = this.randomJudge()
            //判定属性收集完毕，开始判定
            allMes.meMonsterList.map(monster=>{
                if(monster.haveLe){
                    let judge = this.randomJudge()
                    allMes.outputList.push(monster.name + "的乐不思蜀"+"判定的结果是：" + this.getJudgeText(judge))
                    if((allMes.meJudge == allMes.botJudge)||(allMes.meJudge==judge||allMes.botJudge==judge)){
                        //没中
                        monster.haveLe = false
                        allMes.outputList.push("判定乐不思蜀失效")
                    }else{
                        //中了，不需要处理
                        allMes.outputList.push("判定乐不思蜀生效")
                    }
                }
                if(monster.haveBing){
                    let judge = this.randomJudge()
                    allMes.outputList.push(monster.name + "的兵粮寸断"+"判定的结果是：" + this.getJudgeText(judge))
                    if((allMes.meJudge == allMes.botJudge)||(allMes.meJudge==judge||allMes.botJudge==judge)){
                        //没中
                        monster.haveBing = false
                        allMes.outputList.push("判定兵粮寸断失效")
                    }else{
                        //中了,不需要处理
                        allMes.outputList.push("判定兵粮寸断生效")
                    }
                }
            })
            let judge = this.randomJudge()
            allMes.outputList.push("判定的结果是：" + this.getJudgeText(judge))

        }else{
            allMes.outputList.push("请输入正确的属性索引")
        }
        return allMes
        
    },
    randomJudge(){
        let num = Math.floor(Math.random() * 10)
        //0到10的随机整数，包括0但是不包括10
        if(num>=0&&num<2){
            return "0"
        }else if(num>=2&&num<4){
            return "1"
        }else if(num>=4&&num<6){
            return "2"
        }else if(num>=6&&num<8){
            return "3"
        }else if(num>=8&&num<10){
            return "4"
        }
    },
    getJudgeText(index){
        if(index == 0){
            return "金"
        }else if(index == 1){
            return "木"
        }else if(index == 2){
            return "水"
        }else if(index == 3){
            return "火"
        }else if(index == 4){
            return "土"
        }else{
            return "未知属性"
        }
    }
}