let challengeMonsters = [
    {
        id:"boss1",
        name:"沙漠死神",
        atk:30,
        atkMagic:50,
        def:60,
        defMagic:60,
        life:60,
        speed:60,
        skillListName:["汲魂痛击","枯萎","灵魂烈焰","死神降临"],
        attribute:"土",
        size:80,
    },
]
import strategyCardApi from "./strategyCard.js"
import monsterMesApi from "./monsterMes.js"
export default {
    getChallengeMonsters(){
        return challengeMonsters
    },
    getMonsterById(id){
        let res
        challengeMonsters.forEach(item=>{
            if(item.id === id){
                res = item
            }
        })
        return res
    },
    canUseSkill(allMesBot){ 
        let num = 0
        let res = false
        allMesBot.cardList.forEach(item=>{
            num+= Number(item.realNum)
        })
        allMesBot.skillList.forEach(item=>{
            if(item.cost<=num){
                res = true
            }
        })
        return res
    },
    canUseSkillByName(allMesBot,name){
        let num = 0
        allMesBot.cardList.forEach(item=>{
            num+= Number(item.realNum)
        })
        if(num>=monsterMesApi.getSkillDetailMes(name).cost){
            return true
        }
        return false
    },
    getBotUseSkill(allMesBot,allMesMy){
        //技能优先级 > 策略卡优先级
        //先确定使用的技能，再进行策略卡的选择
        if(this.canUseSkill(allMesBot)===false){
            return {
                nama:"点数不足"
            }
        }
        if(allMesBot.name === "沙漠死神"){
            let skill
            // allMesBot.skillList.forEach(item=>{
            //     if(item.name === "汲魂痛击"){
            //         skill = item
            //     }
            // })
            // return skill
            console.log("沙漠死神的技能发动逻辑检查",allMesBot,allMesMy)

            if(allMesBot.speed<allMesMy.speed&&this.canUseSkillByName(allMesBot,"枯萎")){
                allMesBot.skillList.forEach(item=>{
                    if(item.name === "枯萎"){
                        skill = item
                    }
                })
                if(skill?.name){
                    return skill
                }
                //先保证先手权
            }else{
                if(allMesMy.def>=50&&this.canUseSkillByName(allMesBot,"灵魂烈焰")){
                    allMesBot.skillList.forEach(item=>{
                        if(item.name === "灵魂烈焰"){
                            skill = item
                        }
                    })
                }else{
                    if(this.canUseSkillByName(allMesBot,"汲魂痛击")&&((!allMesBot?.jihuntongjiPlies)||(allMesBot.jihuntongjiPlies>=(allMesMy.def+allMesMy.defMagic))||(allMesBot.jihuntongjiPlies>0&&allMesBot.lifeNow<(allMesBot.life/5).toFixed(0)))){
                        allMesBot.skillList.forEach(item=>{
                            if(item.name === "汲魂痛击"){
                                skill = item
                            }
                        })
                    }else{
                        allMesBot.skillList.forEach(item=>{
                            if(item.name === "死神降临"){
                                skill = item
                            }
                        })//如果层数>生命值+物抗或者血量低于20%，就会开凿
                    }
                }
                return skill
            }
        }
    },
}