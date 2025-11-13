let skillList = [
    {
        name:"摇尾巴",
        type:"eft",
        desc:"哈基汪兴奋的时候会摇尾巴，大幅增加自己的速度",
        speed:2,
        self:{
            speed:2,
        },
        other:{

        },
    },
    {
        name:"撕咬",
        type:"atk",
        desc:"哈基汪会用自己的爪子和牙齿攻击敌人，造成物理伤害",
        speed:2,
        self:{

        },
        other:{
            damage: 20,
        },
    },
    {
        name:"低吼",
        type:"eft",
        desc:"哈基汪会用自己的嘴咆哮，大幅增加自己的攻击力",
        speed:2,
        self:{
            atk: 2,
        },
        other:{

        },
    },
    {
        name:"哈基汪大旋风",
        type:"afk",
        desc:"哈基汪会用自己的牙齿咬住对方，进行大风车转转转",
        speed:2,
        self:{

        },
        other:{
            damage: 40,
        },
    },
    {
        name:"变硬",
        type:"eft",
        desc:"紧绷自身的肌肉，大幅增加自己的防御力",
        speed:2,
        self:{
            def: 2,
        },
        other:{

        },
    },
    {
        name:"流沙",
        type:"aft",
        desc:"生成流沙陷阱，对对方造成持续百分比伤害并大幅降低速度",
        speed:2,
        self:{

        },
        other:{
            damage: 10,
            speed: -2,
            continuousDamage:"10%",
            continuousDamageTime:"random",
            continuousDamageTimeMax:5,
            continuousDamageTimeMin:2,
        },
    }
    
]
//eft 不造成直接伤害的技能
//atk 直接造成物理伤害
//atkMagic 直接造成魔法伤害
export default {
    getSkillByName(name){
        let res = {}
        skillList.forEach(item=>{
            if(item.name==name){
                res = item
            }
        })
        return res
    },
    useCard(allMes,name,user){
        console.log("处理技能"+name+"的效果")
        return allMes
    },//使用技能方法
    getBotUseSkill(allMes){
        let skillList = allMes.allMesBot.monsterNow.skillList
        const useSkill = skillList[this.selectRandom(skillList.length-1)]
        //bot使用技能没有pp限制
        return this.getSkillMesByName(useSkill)
    },
    getSkillMesByName(name){
        let res = {}
        skillList.forEach(item=>{
            if(item.name==name){
                res = item
            }
        })
        return res
    },
    selectRandom(size){
        return Math.floor(Math.random() * (size + 1))
    },//生成一个0到size的随机整数
}
