export default {
    dealWithJudge(allMes,who){
        if(who == "me"){
            if(this.checkJudge(allMes.meMonsterList)){
                allMes.outputList.push("我方准备进行本回合判定，请提交一个属性")
                allMes.outputList.push("金0，木1，水2，火3，土4")
                allMes.meStatus = "waitSendAttribute"
            }
            // allMes.meMonsterList.map(item=>{
            //     if(item.haveLe){
                    
            //         //如果被乐了，就进行判定
            //         let judgeRes = this.judgeCard(allMes)
            //         allMes = judgeRes.allMes
            //         //更新判定后的弃牌堆和卡组
            //         let judgeCard = judgeRes.judgeCard
            //         //判定结果

            //     }
            // })
        }else{
            if(this.checkJudge(allMes.botMonsterList)){
                allMes.outputList.push("对方准备进行本回合判定，请提交一个属性")
                allMes.outputList.push("金0，木1，水2，火3，土4")
                allMes.meStatus = "waitSendAttribute"
            }
        }
        return allMes
    },//统一处理所有 回合开始 的判定方法
    judgeCard(allMes){
       let judge = allMes.deck[0]
       let resDesk = []
       allMes.deck.forEach((item,index)=>{
        if(index!=0){
            resDesk += item
        }
       })
       allMes.deck = resDesk
       allMes.discardPile.push(judge)
       return {
        judgeCard:judge,
        allMes:allMes
       }
    },//判定方法
    checkJudge(monsterList){
        let res = false
        monsterList.forEach(item=>{
            if(item.haveLe||item.haveBing){
                res = true
            }
        })
        return res
    },//是否需要判定
}