//eft 不造成直接伤害的技能
//atk 直接造成物理伤害
//atkMagic 直接造成魔法伤害
import chainSkill from "./skill/chainSkill"
import {useStore} from 'vuex'
const store = useStore()
export default {
    useCard(allMes,name,user){
        console.log("处理技能"+name+"的效果")
        let skillMes = chainSkill.getSkillByName(name)
        if(skillMes.type === "eft"){
            //不造成直接伤害的技能
            if(skillMes.self?.speed){
                //增加速度等级
                allMes[user].monsterNow.speedLv += skillMes.self.speed
            }
        }else if (skillMes.type === "atk"){
            //直接造成物理伤害
            if(this.checkMiss(allMes,user)){
                //闪避成功
                store.commit("setBullFightTip",user+"的攻击miss")
            }else{
                //命中成功
                let atk = this.getAtk(allMes,user)
                allMes[user].monsterNow.lifeNoew -= atk
                //攻击力和防御力的差距
            }

        }else if (skillMes.type === "atkMagic"){
            //直接造成魔法伤害
            if(this.checkMiss(allMes,user)){
                //闪避成功
                store.commit("setBullFightTip",user+"的魔法攻击miss")
            }else{
                //命中成功
                let atk = this.getAtk(allMes,user)
                allMes[user].monsterNow.lifeNoew -= atk
                
                //魔法攻击力和防御力的差距
            }
        }
        return allMes
    },//使用技能方法
    getAtk(allMes,user){
        if(user === "allMesMy"){
            return allMes.allMesMy.monsterNow.atk - allMes.allMesMy.monsterNow.def
        }else{
            return allMes.allMesBot.monsterNow.atk - allMes.allMesBot.monsterNow.def
        }
    },
    checkMiss(allMes,user){
        let miss = false
        if(user === "allMesMy"&&
            allMes.allMesMy.monsterNow.speed > allMes.allMesBot.monsterNow.speed
        ){
            let speedDiff = allMes.allMesMy.monsterNow.speed-allMes.allMesBot.monsterNow.speed
            let resultNum = this.selectRandom(99)
            if(resultNum < speedDiff){
                miss = true
            }
        }else if(
             allMes.allMesMy.monsterNow.speed < allMes.allMesBot.monsterNow.speed
        ){
            let speedDiff = allMes.allMesBot.monsterNow.speed-allMes.allMesMy.monsterNow.speed
            let resultNum = this.selectRandom(99)
            if(resultNum < speedDiff){
                miss = true
            }
        }
        
        return miss
    },//检查是否闪避
    getBotUseSkill(allMes){
        let skillList = allMes.allMesBot.monsterNow.skillList
        const useSkill = skillList[this.selectRandom(skillList.length-1)]
        //bot使用技能没有pp限制
        return chainSkill.getSkillByName(useSkill)
    },
    selectRandom(size){
        return Math.floor(Math.random() * (size + 1))
    },//生成一个0到size的随机整数
}
