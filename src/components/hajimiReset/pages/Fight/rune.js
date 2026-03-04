import planetJs from "../Planet/planet.js"
import skillListApi from "./skillList.js"
export default {
    useRune(type,allMes,targetIndex,store){
        let monsterMes = allMes.fightMes.botMes.monsterList[targetIndex]
        console.log(monsterMes)
        let percent = 0
        if(allMes.playerMes.rune[type]<=0){
            store.commit("hajimiReset/setTipList",["此符文数量不足！"])
            return {allMes}
        }
        if(monsterMes.isWild===false){
            store.commit("hajimiReset/setTipList",["不能捕捉非野生精灵！"])
            return {allMes}
        }else if((monsterMes?.isBoss&&monsterMes.isBoss===true)||(!allMes.wildMonster?.name)){
            store.commit("hajimiReset/setTipList",["不能捕捉boss精灵！"])
            return {allMes}
        }else{
            let probabilityMes = this.getProbability(type,monsterMes,store)
            percent = probabilityMes.percent
            allMes.playerMes.rune[type]--
            //使用符文卡
            //计算捕捉概率
            return {
                allMes,
                percent,
                res:probabilityMes.res,
            }
        }
    },
    getProbability(type,monsterMes,store){
        //获取捕捉结果
        const typeMes = {
            normal:1,
            fortify:1.5,
            superFortify:2,
            supreme:1000,
        }
        let res = false
        let percent = 33
        console.log(type,monsterMes)
        const probability = 2 * typeMes[type] * monsterMes.probability/100 *
            this.getLifeProbability(type,monsterMes,store) * this.getLevelProbability(monsterMes)
        console.log("probability",probability)
        if(probability>=1){
            res =  true
        }else{
            let random = Math.random()
            console.log("random",random)
            res =  random<=probability
        }
        if(probability>0.33){
            percent = 56
        }
        if(probability>0.56){
            percent = 99
        }
        if(probability>=1){
            percent = 100
        }
        return {
            res,
            percent,
        }
    },
    getLevelProbability(monsterMes){
        //精灵等级会影响捕捉成功率
        //1~20 100%
        //21~40 80%
        //40~60 50%
        //>60 20%
        let lv = monsterMes.level
        let probability = 0
        if(lv<=20){
            probability = 1
        }else if(lv<=40){
            probability = 0.8
        }else if(lv<=60){
            probability = 0.5
        }else{
            probability = 0.2
        }
        return probability
    },
    getLifeProbability(type,monsterMes,store){
        //血量公式
        let botMes = monsterMes
        //和野生精灵对战的话，他就只有一只
        return (3*botMes.life-2*botMes.nowLife)/(3*botMes.life)
    },
    catchMonster(allMes){
        //捕捉成功，添加到精灵列表
        let catchMonster = allMes.wildMonster
        console.log(catchMonster)
        allMes.playerMes.monsterList.push(
            {
                name:catchMonster.name,
                individual:catchMonster.individual,
                potentiality:catchMonster.potentiality,
                attribute:catchMonster.attribute,
                level:catchMonster.level,
                experience:0,
                skillList:catchMonster.skillList,
                race:catchMonster.race,
            }
        )
        return allMes
    },
    checkBossMonster(allMes,store){
        //检查是否是野生boss
        console.log(allMes.wildMonster)
        if(allMes.wildMonster?.isBoss&&allMes.wildMonster.isBoss===true){
            //是boss
            let name = allMes.wildMonster.name
            let bossName = planetJs.getBossEssence(name)
            console.log("获得boss精元"+bossName)
            store.commit("hajimiReset/setTipList",["获得boss精元:"+bossName])

            let bossMes = planetJs.getMonsterBasicMesByName(bossName)
            bossMes.allSkillList = []
            allMes.playerMes.monsterList.push(
                {
                    name:bossMes.name,
                    race:bossMes.race,
                    attribute:bossMes.attribute,
                    potentiality:bossMes.potentiality,
                    individual:bossMes.individual,
                    level:bossMes.level,
                    experience:0,
                    skillList:bossMes.skillList,
                    allSkillList:bossMes.allSkillList,
                }
            )
            console.log(bossMes)
        }
        return allMes
    },
     calculateExperience(allMes){
        //无论输赢，都以最后在场上最高等级的精灵为准
        let experience
        if(allMes.fightMes.result==="win"||allMes.fightMes.result==="catch"){
            let myMonsterList= allMes.fightMes.myMes.monsterList
            let myHightestMonsterLv = 0
            myMonsterList.forEach(monster=>{
                if(monster.onGround&&monster.level>myHightestMonsterLv){
                    myHightestMonsterLv = monster.level
                }
            })//找出我方最高等级的精灵
            let botMonsterList = allMes.fightMes.botMes.monsterList
            let botHightestMonsterLv = 0
            botMonsterList.forEach(monster=>{
                if(monster.level>botHightestMonsterLv){
                    botHightestMonsterLv = monster.level
                }
            })//找出敌方最高等级的精灵
            experience = this.getBasicExp(botHightestMonsterLv)
        }else{
            //打输了根据回合数已经当前自身等级获得经验
            //获取的经验是有上限的
            let botMonsterList = allMes.fightMes.botMes.monsterList
            let botHightestMonsterLv = 0
            botMonsterList.forEach(monster=>{
                if(monster.level>botHightestMonsterLv){
                    botHightestMonsterLv = monster.level
                }
            })//找出敌方最高等级的精灵
            let turnNum = allMes.fightMes.turn
            if(turnNum>10){
                turnNum = 10
            }
            experience = this.upOneLv(botHightestMonsterLv)/100 * turnNum
        }//打输了获取的经验
        return experience
     },
     //结算经验
    getBasicExp(level) {
        let res = 0
        if (level <= 1) {
            res = 100;
        } else if (level <= 10) {
            // 1-10级：从100线性增长到150
             res = 100 + (level - 1) * 50 / 9;
        } else if (level <= 20) {
            // 10-20级：从150线性增长到200
            res = 150 + (level - 10) * 50 / 10;
        } else {
            // 20级及以上：basic = 等级 × 10
            res = level * 10;
        }
        return Math.floor(res)
    },
    upOneLv(level){
        return Number(100+(level*level))
    },//升一级需要的经验
    updateMonsterLv(allMes,experience){
        let monsterList = []
        let fightMonsterList = []
        allMes.playerMes.monsterFightList.forEach(item=>{
            allMes.playerMes.monsterList.forEach((one,index)=>{
                if(index===item){
                    fightMonsterList.push({
                        index,
                        one,
                    })
                }
            })
        })//出战的精灵在全部精灵的索引
        allMes.fightMes.myMes.monsterList.forEach((monster,index)=>{
            fightMonsterList.forEach((one)=>{
                if(index===one.index&&monster.onGround){
                    monsterList.push({
                        index:one.index,
                        monster,
                    })//记录在场上的精灵和在所有精灵中的索引
                }
            })
        })
        // console.log(monsterList,allMes.fightMes.myMes.monsterList)
        //不上场直接抓精灵是无法获得经验的
        let upgradeList = []
        monsterList.forEach(monster=>{
            allMes.fightMes.myMes.monsterList.map((one,index)=>{
                if(index===monster.index){
                    let allExp = one.experience + experience
                    //获取全部经验
                    let level = one.level
                    console.log(one.name,"获得经验",allExp,level)
                    while(allExp>=this.upOneLv(level)&&level<100){
                        allExp -= this.upOneLv(level)
                        level += 1
                    }//一直升级直到经验不足
                    if(level>one.level){
                        upgradeList.push({
                            name:one.name,
                            lv:level,
                            oldLv:one.level,
                        })
                    }
                    allMes.playerMes.monsterList[monster.index].level = level
                    allMes.playerMes.monsterList[monster.index].experience = allExp
                }
            })
        })
        console.log(allMes)
        return {
            allMes,
            upgradeList,
        }
    }

}