import skillApi from "../Fight/skillList.js"
import saierApi from "./planetJs/saier.js"
import threeKingdomsApi from "./planetJs/threeKingdoms.js"
export default {
    getMonsterBasicMesByName(name,level,x="",y="",cantMove=false,showTip="",fightMes={}){
        let result = this.getWildMonsterMesByName(name)
        let finallyLevel = Number(result.basicLevel + (Math.random()>0.5?-1:1)* Math.floor(2*Math.random()))
        if(result?.isBoss&&result.isBoss===true){
            finallyLevel = result.basicLevel
        }//如果是Boss，等级固定
        if(level){
            finallyLevel = level
        }//如果有指定等级，则优先级更高
        return {
            name:result.name,
            isBoss:result.isBoss||false,
            "race": result.race,
            "attribute": result.attribute,
            probability:result.probability,
            level:finallyLevel,
            //上下浮动2级 basicLevel基础等级
            isWild:true,
            individual:{
                "atk": Math.floor(50*Math.random()),
                "atkMagic": Math.floor(50*Math.random()),
                "def": Math.floor(50*Math.random()),
                "defMagic": Math.floor(50*Math.random()),
                "life": Math.floor(50*Math.random()),
                "speed": Math.floor(50*Math.random())
            },//个体值
            "potentiality": this.getRandowPotentiality(finallyLevel),//潜力值
            position:{
                left:x===""?Math.floor(470*Math.random()):Number(x),
                top:y===""?Math.floor(270*Math.random()):Number(y),
            },
            skillList: skillApi.getSkillList(result.name,finallyLevel),
            allSkillList: skillApi.getSkillList(result.name,finallyLevel),
            cantMove:cantMove,
            showTip:showTip,
            fightMes:fightMes,
        }
    },//通过名字获取信息后进行基本处理
    getWildMonsterMesByName(name){
        let result = {
            evolveLv:-1,
        }
        let res = {}
        res = saierApi.getWildMonsterMesByName(name)
        if(res?.name){
            result = res
        }
        res = threeKingdomsApi.getWildMonsterMesByName(name)
        if(res?.name){
            result = res
        }
        return result
    },//通过名字获取基本信息
    getMonsterListByGround(ground,scene=""){
        console.log(ground,scene)
        let monsterList = []
        let monsterMes = []
        //当前场景精灵的刷新逻辑
        let resList = []
        resList = saierApi.getMonsterListByGround(ground,scene)
        if(resList.length>0){
            monsterMes = resList
        }//遍历所有的星球
        resList = threeKingdomsApi.getMonsterListByGround(ground,scene)
        if(resList.length>0){
            monsterMes = resList
        }//遍历所有的星球
        if(monsterMes.length>0){
            let allNum = 6
            monsterMes.map((monster)=>{
                if(monster.num){
                    for(let j = 0;j<monster.num;j++){
                        monsterList.push(this.getMonsterBasicMesByName(monster.name,monster.level,monster?.position?.x,monster?.position?.y,monster?.cantMove,monster?.showTip,monster?.fightMes))
                    }//如果有强制刷新数量，先处理强制刷新
                    allNum -= monster.num
                }
            })
            for(let i = 0;i<allNum;i++){
                monsterMes.forEach((item,index)=>{
                    if(item?.percent){
                        let num = Number(Math.random().toFixed(2))*100
                        let monster = {}
                        let minNum = 0
                        let maxNum = 0
                        monsterMes.forEach((item1,index1)=>{
                            if(index1 < index){
                                minNum += item1.percent
                            }
                            if(index1 == index){
                                maxNum = item1.percent + minNum
                            }
                        })
                        //找出当前概率的区间
                        if(num>=minNum && num<=maxNum){
                            monster = item
                            monsterList.push(this.getMonsterBasicMesByName(monster.name))
                        }
                        // if(index<i){
                        //     minNum+=item.percent
                        // }
                        // if(index === i){
                        //     maxNum=minNum + item.percent
                        //     monster = item
                        //     monsterMes.forEach((item1,index1)=>{
                        //         if(num>=minNum && num<=maxNum){
                        //             monsterList.push(this.getMonsterBasicMesByName(monster.name))
                        //         }
                        //     })
                        // }
                    }
                })
            }
        }
        return monsterList
    },//根据场景名称获取刷新的精灵数据
    getRandowPotentiality(num){
        let mesList = ["atk","def","atkMagic", "defMagic","life","speed"]
        mesList = mesList.sort(()=>{
            return Math.random() - 0.5
        })//随机排序
        let potentiality = {
            "atk": 0,
            "def": 0,
            "atkMagic": 0,
            "defMagic": 0,
            "life": 0,
            "speed": 0
        }
        while(num>0){
            const randomNum = this.getRandomInt(num)
            potentiality[mesList[this.getRandomInt(6)-1]] += randomNum
            num -= randomNum
        }
        return potentiality
    },//随机填充努力值
    getRandomInt(num) {
        // 确保输入是正整数
        if (num <= 0 || !Number.isInteger(num)) {
            throw new Error("输入必须是正整数");
        }
        // 返回1到num之间的随机整数
        return Math.floor(Math.random() * num) + 1;
    },// 随机数生成方法：输入正整数num，随机返回1到num的正整数
    getGroundByName(name){
        let ground = ""
        ground = saierApi.getGroundByName(name)
        if(ground!==""){
            return ground
        }
        ground = threeKingdomsApi.getGroundByName(name)
        if(ground!==""){
            return ground
        }
        return ground
    },//获取场地数据
    getBossEssence(name){
        let bossMes = ""
        bossMes = saierApi.getBossEssence(name)
        if(bossMes!==""){
            return bossMes
        }
        return bossMes
    },//获取boss初始形态
    getSceneTipText(scene){
        let tip = ""
        tip = saierApi.getSceneTipText(scene)
        if(tip!==""){
            return tip
        }
        tip = threeKingdomsApi.getSceneTipText(scene)
        if(tip!==""){
            return tip
        }
        return tip
    },//获取场景提示文本
}