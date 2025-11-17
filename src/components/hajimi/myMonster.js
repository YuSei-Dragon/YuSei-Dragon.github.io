let myMonsterList = [
    {
        name:"小哈基汪",
        individual:{
            atk:200,
            atkMagic:200,
            def:200,
            defMagic:200,
            life:200,
            speed:200,
        },
        //以上皆为个体值
        potentiality:{
            atk:0,
            def:0,
            atkMagic:0,
            defMagic:0,
            life:0,
            speed:0,
        },
        attribute:"土",
        level:1,
        skillList:[
            "摇尾巴","撕咬","低吼","哈基汪大旋风"
        ]
    }
]
let testBotList = [
    {
        name:"小沙包",
        individual:{
            atk:200,
            atkMagic:200,
            def:200,
            defMagic:200,
            life:200,
            speed:200,
        },
        //以上皆为个体值
        potentiality:{
            atk:0,
            def:0,
            atkMagic:0,
            defMagic:0,
            life:0,
            speed:0,
        },
        attribute:"土",
        level:1,
        skillList:[
            "变硬","流沙"
        ]
    }
]
import monsterMes from "./monster/monsterMes"
export default {
    getTestMyMonsterList(){
        return myMonsterList
    },
    getTestMyMonsterOn(){
        let monster = myMonsterList[0]
        monster.race = monsterMes.getMonsterRaceByName(monster.name,monster.level)
        return {
            atk:monster.race.atk + monster.potentiality.atk + monster.individual.atk,
            atkMagic:monster.race.atkMagic + monster.potentiality.atkMagic + monster.individual.atkMagic,
            def:monster.race.def + monster.potentiality.def + monster.individual.def,
            defMagic:monster.race.defMagic + monster.potentiality.defMagic + monster.individual.defMagic,
            life:monster.race.life + monster.potentiality.life + monster.individual.life,
            speed:monster.race.speed + monster.potentiality.speed + monster.individual.speed,
            attribute:monster.attribute,
            level:monster.level,
            skillList:monster.skillList,
            lifeNow:monster.race.life + monster.potentiality.life + monster.individual.life,
            flash:false,//闪
            helpless:false,//兵粮寸断
            speedLv:0,//速度变化
            atkLv:0,//攻击力变化
            atkMagicLv:0,//魔法攻击力变化
            defLv:0,//防御力变化
            defMagicLv:0,//魔法防御力变化
        }
    },
    getTestBotList(){
        return testBotList
    },
    getTestBotOn(){
        let monster = testBotList[0]
        monster.race = monsterMes.getMonsterRaceByName(monster.name,monster.level)
        return {
            atk:monster.race.atk + monster.potentiality.atk + monster.individual.atk,
            atkMagic:monster.race.atkMagic + monster.potentiality.atkMagic + monster.individual.atkMagic,
            def:monster.race.def + monster.potentiality.def + monster.individual.def,
            defMagic:monster.race.defMagic + monster.potentiality.defMagic + monster.individual.defMagic,
            life:monster.race.life + monster.potentiality.life + monster.individual.life,
            speed:monster.race.speed + monster.potentiality.speed + monster.individual.speed,
            attribute:monster.attribute,
            level:monster.level,
            skillList:monster.skillList,
            lifeNow:monster.race.life + monster.potentiality.life + monster.individual.life,
            flash:false,//闪
            helpless:false,//兵粮寸断
            speedLv:0,//速度变化
            atkLv:0,//攻击力变化
            atkMagicLv:0,//魔法攻击力变化
            defLv:0,//防御力变化
            defMagicLv:0,//魔法防御力变化
        }
    }
}