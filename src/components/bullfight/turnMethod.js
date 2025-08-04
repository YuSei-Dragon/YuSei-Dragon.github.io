import challengeApi from "./challengeMonsters"
import strategyCardApi from "./strategyCard"
export default {
    sumbit(allMesBot,allMesMy,turnNum,skill,cardList,mesList){
        // allMesBot bot的所有信息
        // allMesMy my的所有信息
        // turnNum 回合数
        // myTurnMes 我发动技能用到的数据 
        // 技能名myTurnMes.skill  使用手牌myTurnMes.cardList
        // let allPoint = 0
        // cardList.forEach(item=>{
        //     allPoint+=Number(item.realNum)
        // })
        // if(!skill?.name||skill.name ===""){
        //     throw "请选择技能！"
        // }
        // if(skill.cost>allPoint){
        //     throw "点数不足！"
        // }
        console.log("开始处理这个回合的技能")
        turnNum ++//回合数加一
        let myMove = {}
        let botMove = {}
        try{
            allMesMy.cardList = this.delUsedCard(cardList,allMesMy.cardList)
            console.log("去掉使用的手牌")
            if(allMesMy.speed>allMesBot.speed){
                let myMes
                try{
                    myMes = this.myTurn(allMesBot,allMesMy,turnNum,skill,cardList,mesList)
                }catch(e){
                    console.log("处理我的回合行动出错:",e)
                }
                allMesBot = myMes.allMesBot
                allMesMy = myMes.allMesMy
                turnNum = myMes.turnNum
                skill = myMes.skill
                cardList = myMes.cardList
                mesList = myMes.mesList
                myMove = {
                    miss:myMes.miss,//是否miss
                    move:this.getMoveBySkill(skill),
                    lifeChangeMy:0,
                    lifeChangeBot:0
                }
                if(myMes.allMesMy?.lifeChangeMy){
                    console.log("我的生命值变动：",myMes.allMesMy.lifeChangeMy)
                    myMove.lifeChangeMy = myMes.allMesMy.lifeChangeMy
                }
                if(myMes.allMesMy?.lifeChangeBot){
                    console.log("对方生命值变动：",myMes.allMesMy.lifeChangeBot)
                    myMove.lifeChangeBot = myMes.allMesMy.lifeChangeBot
                }
                console.log("我的数据处理完毕",myMes,myMove)
                let botMes 
                try{
                    botMes = this.botTurn(allMesBot,allMesMy,turnNum,skill,cardList,mesList)
                }catch(e){
                    console.log("处理bot的行动出错:",e)
                }
                allMesBot = botMes.allMesBot
                allMesMy = botMes.allMesMy
                turnNum = botMes.turnNum
                skill = botMes.skill
                cardList = botMes.cardList
                mesList = botMes.mesList
                botMove = {
                    isNotEnough:botMes?.isNotEnough||false,//是否点数不足
                    miss:botMes.miss,//是否miss
                    move:this.getMoveBySkill(botMes.botSkill),
                    lifeChangeMy:0,
                    lifeChangeBot:0
                }
                if(botMes.allMesBot?.lifeChangeMy){
                    console.log("我的生命值变动：",botMes.allMesBot.lifeChangeMy)
                    botMove.lifeChangeMy = botMes.allMesBot.lifeChangeMy
                }
                if(botMes.allMesBot?.lifeChangeBot){
                    console.log("对方生命值变动：",botMes.allMesBot.lifeChangeBot)
                    botMove.lifeChangeBot = botMes.allMesBot.lifeChangeBot
                }
                console.log("bot的数据处理完毕",botMes,botMove)
            }else{
                let botMes 
                try{
                    botMes = this.botTurn(allMesBot,allMesMy,turnNum,skill,cardList,mesList)
                }catch(e){
                    console.log("处理bot的行动出错:",e)
                }
                allMesBot = botMes.allMesBot
                allMesMy = botMes.allMesMy
                turnNum = botMes.turnNum
                skill = botMes.skill
                cardList = botMes.cardList
                mesList = botMes.mesList
                botMove = {
                    isNotEnough:botMes?.isNotEnough||false,//是否点数不足
                    miss:botMes.miss,//是否miss
                    move:this.getMoveBySkill(botMes.botSkill),
                    lifeChangeMy:0,
                    lifeChangeBot:0
                }
                if(botMes.allMesBot?.lifeChangeMy){
                    console.log("我的生命值变动：",botMes.allMesBot.lifeChangeMy)
                    botMove.lifeChangeMy = botMes.allMesBot.lifeChangeMy
                }
                if(botMes.allMesBot?.lifeChangeBot){
                    console.log("对方生命值变动：",botMes.allMesBot.lifeChangeBot)
                    botMove.lifeChangeBot = botMes.allMesBot.lifeChangeBot
                }
                let myMes
                try{
                    myMes = this.myTurn(allMesBot,allMesMy,turnNum,skill,cardList,mesList)
                }catch(e){
                    console.log("处理我的回合行动出错:",e)
                }
                allMesBot = myMes.allMesBot
                allMesMy = myMes.allMesMy
                turnNum = myMes.turnNum
                skill = myMes.skill
                cardList = myMes.cardList
                mesList = myMes.mesList
                myMove = {
                    miss:myMes.miss,//是否miss
                    move:this.getMoveBySkill(skill),
                    lifeChangeMy:0,
                    lifeChangeBot:0
                }
                if(myMes.allMesMy?.lifeChangeMy){
                    console.log("我的生命值变动：",myMes.allMesMy.lifeChangeMy)
                    myMove.lifeChangeMy = myMes.allMesMy.lifeChangeMy
                }
                if(myMes.allMesMy?.lifeChangeBot){
                    console.log("对方生命值变动：",myMes.allMesMy.lifeChangeBot)
                    myMove.lifeChangeBot = myMes.allMesMy.lifeChangeBot
                }
            }//处理出牌顺序
            return {
                myMove:myMove,
                botMove:botMove,
                allMesBot:allMesBot,
                allMesMy:allMesMy,
                turnNum:turnNum,
                skill:{},
                cardList:[],
                mesList:mesList,
            } 
        }catch(e){
            console.log(e)
        }
        
    },
    delUsedCard(cardUse,cardAll){
        let resList = []
        cardAll.forEach(all=>{
            let keep = true
            cardUse.forEach(use =>{
                if(all.num===use.num&&all.type===use.type){
                    //相同的去掉
                    keep =  false
                }
            })
            if(keep){
                resList.push(all)
            }
        })
        return resList
    },//去除重复卡牌
    damageCount(damage,allMesAtk,allMesDef){
        //威力/100 * 攻击力/防御力 * 20
        let res = Number((damage/100)*(allMesAtk.atk/allMesDef.def)) * 20
        if(this.isRepressions(allMesAtk,allMesDef)){
            res = 1.5*res
        }
        return Number(-res.toFixed(0))
    },//伤害计算公式
    damageSCount(damageS,allMesAtk,allMesDef){
        //魔法/特殊攻击力 / 魔法/特殊防御力 * 20
        let res = Number((damageS/100)*(allMesAtk.atkMagic/allMesDef.defMagic)) * 20
        if(this.isRepressions(allMesAtk,allMesDef)){
            res = 1.5*res
        }
        return Number(-res.toFixed(0))
    },//特殊伤害计算公式
    isRepressions(allMesAtk,allMesDef){
        let res = false
        if( (allMesAtk.attribute === "金"&&allMesDef.attribute === "木")||
            (allMesAtk.attribute === "木"&&allMesDef.attribute === "土")||
            (allMesAtk.attribute === "土"&&allMesDef.attribute === "水")||
            (allMesAtk.attribute === "水"&&allMesDef.attribute === "火")||
            (allMesAtk.attribute === "火"&&allMesDef.attribute === "金")){
                res = true
        }
        return res
    },
    cureCount(cure,allMesMy){
        if(cure==="少量"){
            return Number((10*allMesMy.life/(allMesMy.def+allMesMy.defMagic)).toFixed(0)) 
        }else if(cure === "大量"){
            return Number((20*allMesMy.life/(allMesMy.def+allMesMy.defMagic)).toFixed(0)) 
        }else if(cure === "巨额"){
            return Number((30*allMesMy.life/(allMesMy.def+allMesMy.defMagic)).toFixed(0)) 
        }
        throw "处理回血出错"
    },//处理回血
    myTurn(allMesBot,allMesMy,turnNum,skill,cardList,mesList){
        mesList.push({text:allMesMy.name + "发动了" + skill.name,type:"default"})
        if(skill.aim!=="self"){
            if(this.isMiss(allMesMy,allMesBot)){
                mesList.push({
                    text:"我的技能落空了！",
                    type:"default"
                })
                return {
                    allMesBot:allMesBot,
                    allMesMy:allMesMy,
                    turnNum:turnNum,
                    skill:skill,
                    cardList:cardList,
                    mesList:mesList,
                    miss:true,
                }
            }
        }
        //纯数值计算
        if(skill?.mySpeed){
            let speed = allMesMy.speed
            allMesMy.speed+=skill.mySpeed
            if(allMesMy.speed<0){
                allMesMy.speed = 1
            }
            mesList.push({text:allMesMy.name+"速度: "+speed+"->"+allMesMy.speed,type:"default"})
        }//调整我方的速度
        if(skill?.botSpeed){
            let speed = allMesBot.speed
            allMesBot.speed+=skill.botSpeed
            if(allMesBot.speed<0){
                allMesBot.speed = 1
            }
            mesList.push({text:allMesBot.name+"速度: "+speed+"->"+allMesBot.speed,type:"default"})
        }//调整对方的速度
        if(skill?.myDef){
            let def = allMesMy.def
            allMesMy.def+=skill.myDef
            if(allMesMy.def<0){
                allMesMy.def = 0
            }
            mesList.push({text:allMesMy.name+"防御: "+def+"->"+allMesMy.def,type:"default"})
        }//调整我方的防御
        if(skill?.botDef){
            let def = allMesBot.def
            allMesBot.def+=skill.botDef
            if(allMesBot.def<0){
                allMesBot.def = 0
            }
            mesList.push({text:allMesBot.name+"防御: "+def+"->"+allMesBot.def,type:"default"})
        }//调整对方的防御
        if(skill?.myDefS){
            let defMagic = allMesMy.defMagic
            allMesMy.defMagic+=skill.myDefS
            if(allMesMy.defMagic<0){
                allMesMy.defMagic = 0
            }
            mesList.push({text:allMesMy.name+"特殊防御: "+defMagic+"->"+allMesMy.defMagic,type:"default"})
        }//调整我方的特殊防御
        if(skill?.botDefS){
            let defMagic = allMesBot.defMagic
            allMesBot.defMagic+=skill.botDefS
            if(allMesBot.defMagic<0){
                allMesBot.defMagic = 0
            }
            mesList.push({text:allMesBot.name+"特殊防御: "+defMagic+"->"+allMesBot.defMagic,type:"default"})
        }//调整对方的特殊防御
        if(skill?.myAtk){
            let atk = allMesMy.atk
            allMesMy.atk+=skill.myAtk
            if(allMesMy.atk<0){
                allMesMy.atk = 0
            }
            mesList.push({text:allMesMy.name+"攻击力: "+atk+"->"+allMesMy.atk,type:"default"})
        }//调整我方的攻击力
        if(skill?.botAtk){
            let atk = allMesBot.atk
            allMesBot.atk+=skill.botAtk
            if(allMesBot.atk<0){
                allMesBot.atk = 0
            }
            mesList.push({text:allMesBot.name+"攻击力: "+atk+"->"+allMesBot.atk,type:"default"})
        }//调整对方的攻击力
        if(skill?.myAtkS){
            let atkMagic = allMesMy.atkMagic
            allMesMy.atkMagic+=skill.myAtkS
            if(allMesMy.atkMagic<0){
                allMesMy.atkMagic = 0
            }
            mesList.push({text:allMesMy.name+"特殊攻击力: "+atkMagic+"->"+allMesMy.atkMagic,type:"default"})
        }//调整我方的特殊攻击力
        if(skill?.botAtkS){
            let atkMagic = allMesBot.atkMagic
            allMesBot.atkMagic+=skill.botAtkS
            if(allMesBot.atkMagic<0){
                allMesBot.atkMagic = 0
            }
            mesList.push({text:allMesBot.name+"特殊攻击力: "+atkMagic+"->"+allMesBot.atkMagic,type:"default"})
        }//调整对方的特殊攻击力
        if(skill?.damage){
            allMesMy.lifeChangeBot = this.damageCount(skill.damage,allMesMy,allMesBot)
            mesList.push({text:allMesMy.name+"攻击造成了: "+Math.abs(allMesMy.lifeChangeBot)+"点伤害",type:"default"})
        }//调整对方生命值-我方普通攻击
        if(skill?.damageS){
            allMesMy.lifeChangeBot = this.damageSCount(skill.damageS,allMesMy,allMesBot)
            mesList.push({text:allMesMy.name+"特殊攻击造成了: "+Math.abs(allMesMy.lifeChangeBot)+"点伤害",type:"default"})
        }//调整对方生命值-我方特殊攻击
        if(skill?.cure){
            allMesMy.lifeChangeMy = this.cureCount(skill.cure,allMesMy)
            mesList.push({text:allMesMy.name+"恢复了: "+(allMesMy.lifeChangeMy)+"点血量",type:"default"})
        }//我方恢复血量

        if(skill.type==="special"){
            //需要特殊处理
            if(skill.name === "汲魂痛击"){
                allMesMy.plies.jihuntongjiPlies +=50

            }
            if(skill.name === "死神降临"){
                const damage = allMesMy.plies?.jihuntongjiPlies||0

                allMesMy.lifeChangeBot = this.damageCount(damage,allMesMy,allMesBot)
            }
            if(skill.name === "血怒"){
                if(allMesMy.plies.xuenuPlies<5){
                    allMesMy.plies.xuenuPlies +=1
                    if(allMesMy.plies.xuenuPlies >= 5){
                        allMesMy.atk+=80
                    }else{
                        allMesMy.atk+=5
                    }
                }
            }

        }
        return {
            allMesBot:allMesBot,
            allMesMy:allMesMy,
            turnNum:turnNum,
            skill:skill,
            cardList:cardList,
            miss:false,
            mesList:mesList,
        }
    },//我的技能结算
    botTurn(allMesBot,allMesMy,turnNum,skill,cardList,mesList){
        // let botSkill = allMesBot.skillList[0]
        let botSkill = challengeApi.getBotUseSkill(allMesBot,allMesMy)
        //暂未写bot出牌逻辑 默认放第一个技能
        if(botSkill.name === "点数不足"){
            mesList.push({
                text:"对方点数不足，跳过当前回合！",
                type:"default"
            })
            return {
                allMesBot:allMesBot,
                allMesMy:allMesMy,
                turnNum:turnNum,
                skill:skill,
                cardList:cardList,
                botSkill:botSkill,
                mesList:mesList,
                miss:false,
                isNotEnough:true,
            }
        }
        this.botUseCard(allMesBot,botSkill)
        mesList.push({text:allMesBot.name + "发动了" + botSkill.name,type:"default"})
        if(skill.aim!=="self"){
            if(this.isMiss(allMesBot,allMesMy)){
                mesList.push({
                    text:"对方技能落空了！",
                    type:"default"
                })
                return {
                    allMesBot:allMesBot,
                    allMesMy:allMesMy,
                    turnNum:turnNum,
                    skill:skill,
                    cardList:cardList,
                    botSkill:botSkill,
                    mesList:mesList,
                    miss:true
                }
            }
        }
        
        //纯数值计算
        if(botSkill?.mySpeed){
            let speed = allMesBot.speed
            allMesBot.speed+=botSkill.mySpeed
            if(allMesBot.speed<0){
                allMesBot.speed = 1
            }
            mesList.push({text:allMesBot.name+"速度: "+speed+"->"+allMesBot.speed,type:"default"})
        }//调整我方的速度
        if(botSkill?.botSpeed){
            let speed = allMesMy.speed
            allMesMy.speed+=botSkill.botSpeed
            if(allMesMy.speed<0){
                allMesMy.speed = 1
            }
            mesList.push({text:allMesMy.name+"速度: "+speed+"->"+allMesMy.speed,type:"default"})
        }//调整对方的速度
        if(botSkill?.myDef){
            let def = allMesBot.def
            allMesBot.def+=botSkill.myDef
            if(allMesBot.def<0){
                allMesBot.def = 0
            }
            mesList.push({text:allMesBot.name+"防御: "+def+"->"+allMesBot.def,type:"default"})
        }//调整我方的防御
        if(botSkill?.botDef){
            let def = allMesMy.def
            allMesMy.def+=botSkill.botDef
            if(allMesMy.defMagic<0){
                allMesMy.defMagic = 0
            }
            mesList.push({text:allMesMy.name+"防御: "+def+"->"+allMesMy.def,type:"default"})
        }//调整对方的防御
        if(botSkill?.myDefS){
            let defMagic = allMesBot.defMagic
            allMesBot.defMagic+=botSkill.myDefS
            if(allMesBot.defMagic<0){
                allMesBot.defMagic = 0
            }
            mesList.push({text:allMesBot.name+"特殊防御: "+defMagic+"->"+allMesBot.defMagic,type:"default"})
        }//调整我方的特殊防御
        if(botSkill?.botDefS){
            let defMagic = allMesMy.defMagic
            allMesMy.defMagic+=botSkill.botDefS
            if(allMesMy.defMagic<0){
                allMesMy.defMagic = 0
            }
            mesList.push({text:allMesMy.name+"特殊防御: "+defMagic+"->"+allMesMy.defMagic,type:"default"})
        }//调整对方的特殊防御
        if(botSkill?.myAtk){
            let atk = allMesBot.atk
            allMesBot.atk+=botSkill.myAtk
            if(allMesBot.atk<0){
                allMesBot.atk = 0
            }
            mesList.push({text:allMesBot.name+"攻击: "+atk+"->"+allMesBot.atk,type:"default"})
        }//调整我方的攻击力
        if(botSkill?.botAtk){
            let atk = allMesMy.atk
            allMesMy.atk+=botSkill.botAtk
            if(allMesMy.atk<0){
                allMesMy.atk = 0
            }
            mesList.push({text:allMesMy.name+"攻击: "+atk+"->"+allMesMy.atk,type:"default"})
        }//调整对方的攻击力
        if(botSkill?.myAtkS){
            let atkMagic = allMesBot.atkMagic
            allMesBot.atkMagic+=botSkill.myAtkS
            if(allMesBot.atkMagic<0){
                allMesBot.atkMagic = 0
            }
            mesList.push({text:allMesBot.name+"特殊攻击: "+atkMagic+"->"+allMesBot.atkMagic,type:"default"})
        }//调整我方的特殊攻击力
        if(botSkill?.botAtkS){
            let atkMagic = allMesMy.atkMagic
            allMesMy.atkMagic+=botSkill.botAtkS
            if(allMesMy.atkMagic<0){
                allMesMy.atkMagic = 0
            }
            mesList.push({text:allMesMy.name+"特殊攻击: "+atkMagic+"->"+allMesMy.atkMagic,type:"default"})
        }//调整对方的特殊攻击力
        if(botSkill?.damage){
            allMesBot.lifeChangeMy = this.damageCount(botSkill.damage,allMesBot,allMesMy)
            mesList.push({text:allMesBot.name+"攻击造成了"+Math.abs(allMesBot.lifeChangeMy)+"点伤害",type:"default"})
        }//调整对方生命值-我方普通攻击
        if(botSkill?.damageS){
            allMesBot.lifeChangeMy = this.damageSCount(botSkill.damageS,allMesBot,allMesMy)
            mesList.push({text:allMesBot.name+"特殊攻击造成了"+Math.abs(allMesBot.lifeChangeMy)+"点伤害",type:"default"})
        }//调整对方生命值-我方特殊攻击
        if(botSkill?.cure){
            allMesBot.lifeChangeBot = this.cureCount(botSkill.cure,allMesBot)
            mesList.push({text:allMesBot.name+"恢复了"+(allMesBot.lifeChangeBot)+"点血量",type:"default"})
        }//我方恢复血量
        
        if(botSkill.type==="special"){
            //需要特殊处理
            if(botSkill.name === "汲魂痛击"){
                allMesBot.plies.jihuntongjiPlies +=50

            }
            if(botSkill.name === "死神降临"){
                const damage = allMesBot.plies.jihuntongjiPlies
                allMesBot.lifeChangeMy = this.damageCount(damage,allMesBot,allMesMy)
            }
            if(botSkill.name === "血怒"){
                if(allMesBot.plies.xuenuPlies<5){
                    allMesBot.plies.xuenuPlies +=1
                    if(allMesBot.plies.xuenuPlies >= 5){
                        allMesBot.atk+=80
                    }else{
                        allMesBot.atk+=5
                    }
                }
            }

        }
        return{
            allMesBot:allMesBot,
            allMesMy:allMesMy,
            turnNum:turnNum,
            skill:skill,
            cardList:cardList,
            miss:false,
            botSkill:botSkill,
            mesList:mesList,
        }
        
    },
    isMiss(atkMes,defMes){
        if(atkMes.speed>defMes.speed){
            return false
            //如果攻击者的速度大于防御者的速度，百分百命中
        }else{
            let random = Math.random()
            //得到一个0~1的随机数
            let ground = (defMes.speed-atkMes.speed)/(defMes.speed+atkMes.speed)
            if(ground>0.5){
                ground = 0.5
            }//限制最大闪避概率
            if(random<ground){
                return true
            }return false
        }
    },//执行闪避
    getMoveBySkill(skill){
        if(skill.damage||skill.damageS||skill?.specialAtk){
            //specialAtk特殊处理的攻击
            return "atk"
        }else{
            return "attribute"
        }
    },//根据技能效果的表现动画，目前只有攻击和强化两种动画
    waitToDo(howLong,method){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            method()
            resolve(howLong)
        },howLong)
        })
    },//同步化
    botUseCard(allMesBot){
        //先确认使用技能
        //再确认有几个策略卡可以触发
        let canUseStrategyList = []
        allMesBot.strategyList.forEach(item=>{
            if(strategyCardApi.checkStrategy(allMesBot.cardList,item.condition)){
                //检查所有的策略卡的触发条件是否满足
                canUseStrategyList.push(item)
            }
        })
        console.log("可用策略卡",canUseStrategyList)
        canUseStrategyList.forEach(strategy=>{
            const strategyCards = strategyCardApi.getRequiredCardsForStrategy(allMesBot.cardList, strategy)

        })

        
    }
}