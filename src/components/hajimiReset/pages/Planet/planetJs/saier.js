export default {
    getWildMonsterMesByName(name){
        let result = {
            evolveLv:-1,
        }
        if(name==="皮皮"){
            result = {
                name:"皮皮",
                "race": {
                    "atk": 30,
                    "def": 30,
                    "atkMagic": 30,
                    "defMagic": 30,
                    "life": 60,
                    "speed": 80
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:3,
                evolveLv: 16,
                evolveTo:"比波",
            }
        }
        if(name==="比波"){
            result = {
                name:"比波",
                "race": {
                    "atk": 80,
                    "def": 80,
                    "atkMagic": 60,
                    "defMagic": 60,
                    "life": 80,
                    "speed": 120
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:20,
                evolveLv: 36,
                evolveTo:"波克尔",
            }
        }
        if(name==="波克尔"){
            result = {
                name:"波克尔",
                "race": {
                    "atk": 120,
                    "def": 100,
                    "atkMagic": 80,
                    "defMagic": 80,
                    "life": 100,
                    "speed": 150
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:40,
                evolveLv: -1,
            }
        }
        if(name==="仙人球"){
            result = {
                name:"仙人球",
                "race": {
                    "atk": 40,
                    "def": 40,
                    "atkMagic": 40,
                    "defMagic": 30,
                    "life": 70,
                    "speed": 50
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:4,
                evolveLv: 16,
                evolveTo:"仙人掌",
            }
        }
        if(name==="仙人掌"){
            result = {
                name:"仙人掌",
                "race": {
                    "atk": 60,
                    "def": 60,
                    "atkMagic": 80,
                    "defMagic": 80,
                    "life": 80,
                    "speed": 60
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:20,
                evolveLv: 32,
                evolveTo:"巨型仙人掌",
            }
        }
        if(name==="巨型仙人掌"){
            result = {
                name:"巨型仙人掌",
                "race": {
                    "atk": 80,
                    "def": 80,
                    "atkMagic": 100,
                    "defMagic": 100,
                    "life": 100,
                    "speed": 80
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:36,
                evolveLv: -1,
            }
        }
        if(name==="小豆芽"){
            result = {
                name:"小豆芽",
                "race": {
                    "atk": 75,
                    "def": 35,
                    "atkMagic": 70,
                    "defMagic": 30,
                    "life": 50,
                    "speed": 40
                },//种族值
                "attribute": "木",
                probability:20,
                basicLevel:4,
                evolveLv: 21,
                evolveTo:"叮叮",
            }
        }
        if(name==="叮叮"){
            result = {
                name:"叮叮",
                "race": {
                    "atk": 90,
                    "def": 50,
                    "atkMagic": 85,
                    "defMagic": 45,
                    "life": 65,
                    "speed": 55
                },//种族值
                "attribute": "木",
                probability:20,
                basicLevel:23,
                evolveLv: 37,
                evolveTo:"魔花仙子",
            }
        }
        if(name==="魔花仙子"){
            result = {
                name:"魔花仙子",
                "race": {
                    "atk": 115,
                    "def": 65,
                    "atkMagic": 100,
                    "defMagic": 60,
                    "life": 80,
                    "speed": 70
                },//种族值
                "attribute": "木",
                probability:20,
                basicLevel:39,
                evolveLv: -1,
            }
        }
        if(name==="小蘑菇"){
            result = {
                name:"小蘑菇",
                "race": {
                    "atk": 45,
                    "def": 50,
                    "atkMagic": 45,
                    "defMagic": 55,
                    "life": 50,
                    "speed": 30
                },//种族值
                "attribute": "木",
                probability:0,
                basicLevel:1,
                evolveLv: 10,
                evolveTo:"蘑菇怪",
                isBoss:true,
            }
        }
        if(name==="蘑菇怪"){
            result = {
                name:"蘑菇怪",
                "race": {
                    "atk": 85,
                    "def": 90,
                    "atkMagic": 85,
                    "defMagic": 95,
                    "life": 90,
                    "speed": 60
                },//种族值
                "attribute": "木",
                probability:0,
                isBoss:true,
                basicLevel:10,
                evolveLv: -1,
            }
        }
        if(name==="依依"){
            result = {
                name:"依依",
                "race": {
                    "atk": 60,
                    "def": 40,
                    "atkMagic": 60,
                    "defMagic": 40,
                    "life": 50,
                    "speed": 50
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:15,
                evolveLv: 17,
                evolveTo:"依丁丝",
            }
        }
        if(name==="依丁丝"){
            result = {
                name:"依丁丝",
                "race": {
                    "atk": 75,
                    "def": 60,
                    "atkMagic": 75,
                    "defMagic": 60,
                    "life": 70,
                    "speed": 60
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:19,
                evolveLv: 35,
                evolveTo:"依卡莱恩",
            }
        }
        if(name==="依卡莱恩"){
            result = {
                name:"依卡莱恩",
                "race": {
                    "atk": 105,
                    "def": 80,
                    "atkMagic": 105,
                    "defMagic": 80,
                    "life": 90,
                    "speed": 80
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:37,
                evolveLv: -1,
            }
        }
        if(name==="利利"){
            result = {
                name:"利利",
                "race": {
                    "atk": 40,
                    "def": 40,
                    "atkMagic": 65,
                    "defMagic": 45,
                    "life": 55,
                    "speed": 35
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:16,
                evolveLv: 21,
                evolveTo:"绵绵",
            }
        }
        if(name==="绵绵"){
            result = {
                name:"绵绵",
                "race": {
                    "atk": 55,
                    "def": 55,
                    "atkMagic": 80,
                    "defMagic": 65,
                    "life": 70,
                    "speed": 45
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:32,
                evolveLv: 37,
                evolveTo:"电击兔",
            }
        }
        if(name==="电击兔"){
            result = {
                name:"电击兔",
                "race": {
                    "atk": 75,
                    "def": 75,
                    "atkMagic": 115,
                    "defMagic": 90,
                    "life": 90,
                    "speed": 55
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:50,
                evolveLv: -1,
            }
        }
        if(name==="小犬苗"){
            result = {
                name:"小犬苗",
                "race": {
                    "atk": 68,
                    "def": 56,
                    "atkMagic": 50,
                    "defMagic": 50,
                    "life": 60,
                    "speed": 46
                },//种族值
                "attribute": "土",
                probability:50,
                basicLevel:50,
                evolveTo:"天才犬",
                evolveLv: 20,
            }
        }
        if(name==="天才犬"){
            result = {
                name:"天才犬",
                "race": {
                    "atk": 88,
                    "def": 71,
                    "atkMagic": 70,
                    "defMagic": 65,
                    "life": 80,
                    "speed": 66
                },//种族值
                "attribute": "土",
                probability:50,
                basicLevel:50,
                evolveTo:"夏洛犬",
                evolveLv: 40,
            }
        }
        if(name==="夏洛犬"){
            result = {
                name:"夏洛犬",
                "race": {
                    "atk": 118,
                    "def": 91,
                    "atkMagic": 95,
                    "defMagic": 85,
                    "life": 110,
                    "speed": 91
                },//种族值
                "attribute": "土",
                probability:50,
                basicLevel:60,
                evolveLv: -1,
            }
        }
        if(name==="埃尔特"){
            result = {
                name:"埃尔特",
                "race": {
                    "atk": 48,
                    "def": 46,
                    "atkMagic": 66,
                    "defMagic": 47,
                    "life": 73,
                    "speed": 61
                },//种族值
                "attribute": "土",
                probability:50,
                basicLevel:15,
                evolveTo:"埃洛兽",
                evolveLv: 34,
            }
        }
        if(name==="埃洛兽"){
            result = {
                name:"埃洛兽",
                "race": {
                    "atk": 83,
                    "def": 81,
                    "atkMagic": 106,
                    "defMagic": 81,
                    "life": 118,
                    "speed": 91
                },//种族值
                "attribute": "土",
                probability:50,
                basicLevel:40,
                evolveLv: -1,
            }
        }
        if(name==="小火猴"){
            result = {
                name:"小火猴",
                "race": {
                    "atk": 58,
                    "def": 44,
                    "atkMagic": 58,
                    "defMagic": 44,
                    "life": 44,
                    "speed": 61
                },//种族值
                "attribute": "火",
                probability:50,
                basicLevel:10,
                evolveLv: 14,
                evolveTo:"烈火猴",
            }
        }
        if(name==="烈火猴"){
            result = {
                name:"烈火猴",
                "race": {
                    "atk": 78,
                    "def": 52,
                    "atkMagic": 78,
                    "defMagic": 52,
                    "life": 64,
                    "speed": 81
                },//种族值
                "attribute": "火",
                probability:50,
                basicLevel:30,
                evolveLv: 36,
                evolveTo:"烈焰猩猩",
            }
        }
        if(name==="烈焰猩猩"){
            result = {
                name:"烈焰猩猩",
                "race": {
                    "atk": 104,
                    "def": 71,
                    "atkMagic": 104,
                    "defMagic": 71,
                    "life":76,
                    "speed": 108
                },//种族值
                "attribute": "火",
                probability:50,
                basicLevel:30,
                evolveLv: -1
            }
        }
        if(name==="布布种子"){
            result = {
                name:"布布种子",
                "race": {
                    "atk": 69,
                    "def": 65,
                    "atkMagic": 45,
                    "defMagic": 55,
                    "life":55,
                    "speed": 31
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:14,
                evolveLv: 18,
                evolveTo:"布布草",
            }
        }
        if(name==="布布草"){
            result = {
                name:"布布草",
                "race": {
                    "atk": 89,
                    "def": 85,
                    "atkMagic": 55,
                    "defMagic": 65,
                    "life":75,
                    "speed": 41
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:28,
                evolveLv: 32
            }
        }
        if(name==="布布花"){
            result = {
                name:"布布花",
                "race": {
                    "atk": 109,
                    "def": 105,
                    "atkMagic": 79,
                    "defMagic": 85,
                    "life":95,
                    "speed": 56
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:36,
                evolveLv: -1
            }
        }
        if(name==="伊优"){
            result = {
                name:"伊优",
                "race": {
                    "atk": 51,
                    "def": 53,
                    "atkMagic": 61,
                    "defMagic": 56,
                    "life":53,
                    "speed": 40
                },//种族值
                "attribute": "水",
                probability:50,
                basicLevel:12,
                evolveLv: 16,
                evolveTo:"尤里安",
            }
        }
        if(name==="尤里安"){
            result = {
                name:"尤里安",
                "race": {
                    "atk": 66,
                    "def": 68,
                    "atkMagic": 81,
                    "defMagic": 76,
                    "life":64,
                    "speed": 50
                },//种族值
                "attribute": "水",
                probability:50,
                basicLevel:28,
                evolveLv: 32
            }
        }
        if(name==="巴鲁斯"){
            result = {
                name:"巴鲁斯",
                "race": {
                    "atk": 86,
                    "def": 88,
                    "atkMagic": 111,
                    "defMagic": 101,
                    "life":84,
                    "speed": 65
                },//种族值
                "attribute": "水",
                probability:50,
                basicLevel:50,
                evolveLv: -1
            }
        }

        return result
    },//通过名字获取基本信息
    getTestMonsterList(){
        let monsterList= []
        let monster = {
                name:"皮皮",
                "race": {
                    "atk": 30,
                    "def": 30,
                    "atkMagic": 30,
                    "defMagic": 30,
                    "life": 60,
                    "speed": 80
                },//种族值
                "attribute": "土",
                isWild:true,
                probability:50,
            }
        for(let i=0;i<10;i++){
            const level = Number(1 + Math.floor(3*Math.random()))
            monster =  {
                ...monster,
                individual:{
                    "atk": Math.floor(50*Math.random()),
                    "atkMagic": Math.floor(50*Math.random()),
                    "def": Math.floor(50*Math.random()),
                    "defMagic": Math.floor(50*Math.random()),
                    "life": Math.floor(50*Math.random()),
                    "speed": Math.floor(50*Math.random())
                },
                level:level,
                "potentiality": this.getRandowPotentiality(level),//潜力值
                "skillList": [
                    "撞击",
                ],
                position:{
                    left:Math.floor(470*Math.random()),
                    top:Math.floor(270*Math.random()),
                }
            }
            if(level>=3){
                monster.skillList.push("鸣叫")
            }
            monsterList.push(monster)
        }
        
        return monsterList
    },//获取模拟数据
    getMonsterListByGround(ground,scene=""){
        let monsterMes = []
        //当前场景精灵的刷新逻辑
        if(ground==="克洛斯星"){
            if(scene==="saier_Klaus_grassland"||scene===""){
                monsterMes = [
                    {name:"皮皮",percent:100},
                ]
            }else if(scene==="saier_Klaus_swamp"){
                monsterMes = [
                    {name:"仙人球",percent:90},
                    {name:"小豆芽",percent:10},
                ]
            }else if(scene==="saier_Klaus_woodland"){
                monsterMes = [
                    {name:"蘑菇怪",percent:0,num:1,isBoss:true},
                    {name:"依依",percent:100},
                ]
            }else if(scene==="saier_Klaus_earthcore"){
                monsterMes = [
                    {name:"利利",percent:33},
                    {name:"小犬苗",percent:33},
                    {name:"埃尔特",percent:33},
                ]
            }
        }
        return monsterMes
    },//根据场景名称获取刷新的精灵数据
    getGroundByName(name){
        let ground = ""
        switch(name){
            case "saier_Klaus_grassland":
                ground = "土"
                break
            case "saier_Klaus_swamp":
                ground = "水"
                break
            case "saier_Klaus_woodland":
                ground = "木"
                break
            case "saier_Klaus_earthcore":
                ground = "地"
                break
        }
        return ground
    },
    getBossEssence(name){
        let bossMes = {
            "蘑菇怪":"小蘑菇",

        }
        if(bossMes[name]){
            return bossMes[name]
        }
        return ""
    },
    getSceneTipText(scene){
        let tip = ""
        switch(scene){
            case "saier_Klaus_grassland":
                tip = "克洛斯星草地，皮皮在此出没"
                break
            case "saier_Klaus_swamp":
                tip = "克洛斯星沼泽，仙人球/小豆芽在此出没"
                break
            case "saier_Klaus_woodland":
                tip = "克洛斯星林间，蘑菇怪/依依在此出没"
                break
            case "saier_Klaus_earthcore":
                tip = "克洛斯星地球核心，利利/小犬苗/埃尔特在此出没"
                break
        }
        return tip
    },//根据场景名称获取场景提示文本

}