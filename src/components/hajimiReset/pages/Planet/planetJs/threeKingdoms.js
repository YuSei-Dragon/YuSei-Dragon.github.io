export default {
    getSceneTipText(scene){
        let tip = ""
        switch(scene){
            case "threeKingdoms_taipingdao":
                tip = `东汉末年,外戚宦官争权,朝廷混乱皇权衰落，地主豪强兼并土地,
                又逢连年水旱蝗灾与瘟疫，钜鹿人张角创立太平道，符水治病，广得人心，
                原定于公元184年3月5日（甲子年甲子日）在全国同时起事，因叛徒告密提前起义，
                七州二十八郡同时响应，义军头裹黄巾，故称“黄巾军”`
                break
            case "threeKingdoms_taoyuanjieyi":
                tip = "义军四起"
                break
        }
        return tip
    },//根据场景名称获取场景提示文本
    getMonsterListByGround(ground,scene=""){
        let monsterMes = []
        //当前场景精灵的刷新逻辑
        if(ground==="群雄并起"){
            if(scene==="threeKingdoms_taipingdao"||scene===""){
                monsterMes = [
                    {name:"张角-天公将军",level:32,num:1,isBoss:true,position:{
                        x:100,
                        y:100,
                        },cantMove:true,showTip:"苍天已死，黄天当立！岁在甲子，天下大吉！尔等若是非要与黄巾为敌，休怪天兵无情！",
                        fightMes:{
                            botMonsterList:[{
                                name:"张宝-地公将军",
                                level:30,
                            },{
                                name:"张梁-人公将军",
                                level:30,
                            },{
                                name:"张角-天公将军",
                                level:32,
                            }],//挑战对象
                            myMonsterList:[],//援军
                            botPower:8,
                            lockLevel:30,
                        },//战斗数据
                        progressList:[
                            {name:"魏",progress:1,},
                            {name:"蜀",progress:1,},
                            {name:"吴",progress:1,},
                        ]
                    },
                    {name:"曹操-群",level:10,num:1,isBoss:true,position:{
                        x:300,
                        y:50,
                    },cantMove:true,showTip:"汉室存亡之际，怎能隔岸观火！将军请跟随我跟随皇甫嵩将军肃清黄巾叛贼！",
                        fightMes:{
                            botMonsterList:[{
                                name:"黄巾军先锋",
                                level:15,
                            },{
                                name:"黄巾军士兵",
                                level:10,
                            },{
                                name:"黄巾军士兵",
                                level:10,
                            },],//挑战对象
                            myMonsterList:[{
                                name:"曹操-群",
                                level:10,
                            }],//援军
                            botPower:4
                        },//战斗数据
                        progressList:[
                            {name:"魏",progress:1,},
                        ]
                    },
                    {name:"刘备-群",level:10,num:1,isBoss:true,position:{
                        x:300,
                        y:150,
                    },cantMove:true,showTip:"黄巾叛乱，吾虽不才，组建义勇军当尽我所能平叛，只为一方百姓周全，将军何不与我一同出征？",
                    fightMes:{
                        botMonsterList:[{
                            name:"黄巾军先锋",
                            level:15,
                        },{
                            name:"黄巾军士兵",
                            level:10,
                        },{
                            name:"黄巾军士兵",
                            level:10,
                        },],//挑战对象
                        myMonsterList:[{
                            name:"刘备-群",
                            level:10,
                        }],//援军
                        botPower:4
                    },//战斗数据
                    progressList:[
                        {name:"蜀",progress:1,},
                    ]
                },
                    {name:"孙坚-群",level:10,num:1,isBoss:true,position:{
                        x:300,
                        y:250,
                    },cantMove:true,showTip:"黄巾作乱，正是立功的好机会！叛贼不过乌合之众，将军随我一击破之！",
                    fightMes:{
                        botMonsterList:[{
                            name:"黄巾军先锋",
                            level:15,
                        },{
                            name:"黄巾军士兵",
                            level:10,
                        },{
                            name:"黄巾军士兵",
                            level:10,
                        },],//挑战对象
                        myMonsterList:[{
                            name:"孙坚-群",
                            level:10,
                        }],//援军
                        botPower:4
                    },//战斗数据
                    progressList:[
                        {name:"吴",progress:1,},
                    ]
                },
                ]
            }else if(scene==="threeKingdoms_taoyuanjieyi"){
                monsterMes = [
                    
                ]
            }
        }
        return monsterMes
    },//根据场景名称获取刷新的精灵数据
    getWildMonsterMesByName(name){
        let result = {
            evolveLv:-1,
        }
        if(name==="张角-庶民"){
            result = {
                name:"张角-庶民",
                "race": {
                    "atk": 30,
                    "def": 30,
                    "atkMagic": 60,
                    "defMagic": 60,
                    "life": 60,
                    "speed": 60
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:3,
                evolveLv: 28,
                evolveTo:"张角-天公将军",
                isBoss:true,
            }
        }
        if(name==="张角-天公将军"){
            result = {
                name:"张角-天公将军",
                "race": {
                    "atk": 60,
                    "def": 80,
                    "atkMagic": 130,
                    "defMagic": 100,
                    "life": 80,
                    "speed": 80
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:30,
                evolveLv: -1,
                isBoss:true,
            }
        }
        if(name==="张梁-庶民"){
            result = {
                name:"张梁-庶民",
                "race": {
                    "atk": 40,
                    "def": 40,
                    "atkMagic": 40,
                    "defMagic": 40,
                    "life": 60,
                    "speed": 60
                },//种族值
                "attribute": "火",
                probability:50,
                basicLevel:3,
                evolveLv: 28,
                evolveTo:"张梁-人公将军",
                isBoss:true,
            }
        }
        if(name==="张梁-人公将军"){
            result = {
                name:"张梁-人公将军",
                "race": {
                    "atk": 110,
                    "def": 80,
                    "atkMagic": 60,
                    "defMagic": 80,
                    "life": 100,
                    "speed": 80
                },//种族值
                "attribute": "火",
                probability:50,
                basicLevel:30,
                evolveLv: -1,
                isBoss:true,
            }
        }
        if(name==="张宝-庶民"){
            result = {
                name:"张宝-庶民",
                "race": {
                    "atk": 40,
                    "def": 40,
                    "atkMagic": 40,
                    "defMagic": 40,
                    "life": 60,
                    "speed": 60
                },//种族值
                "attribute": "土",
                probability:50,
                basicLevel:3,
                evolveLv: 28,
                evolveTo:"张宝-地公将军",
                isBoss:true,
            }
        }
        if(name==="张宝-地公将军"){
            result = {
                name:"张宝-地公将军",
                "race": {
                    "atk": 90,
                    "def": 80,
                    "atkMagic": 90,
                    "defMagic": 80,
                    "life": 80,
                    "speed": 80
                },//种族值
                "attribute": "土",
                probability:50,
                basicLevel:30,
                evolveLv: -1,
                isBoss:true,
            }
        }
        if(name==="黄巾军先锋"){
            result = {
                name:"黄巾军先锋",
                "race": {
                    "atk": 60,
                    "def": 60,
                    "atkMagic": 30,
                    "defMagic": 30,
                    "life": 80,
                    "speed": 80
                },//种族值
                "attribute": "水",
                probability:50,
                basicLevel:15,
                evolveLv: -1,
                isBoss:true,
            }
        }
        if(name==="黄巾军士兵"){
            result = {
                name:"黄巾军士兵",
                "race": {
                    "atk": 40,
                    "def": 40,
                    "atkMagic": 30,
                    "defMagic": 30,
                    "life": 60,
                    "speed": 60
                },//种族值
                "attribute": "木",
                probability:50,
                basicLevel:10,
                evolveLv: -1,
                isBoss:true,
            }
        }
        if(name==="曹操-群"){
            result = {
                name:"曹操-群",
                "race": {
                    "atk": 50,
                    "def": 50,
                    "atkMagic": 70,
                    "defMagic": 60,
                    "life": 60,
                    "speed": 60
                },//种族值
                "attribute": "水",
                probability:50,
                basicLevel:15,
                evolveLv: 36,
                evolveTo:"曹操-魏",
                isBoss:true,
            }
        }
        if(name==="刘备-群"){
            result = {
                name:"刘备-群",
                "race": {
                    "atk": 70,
                    "def": 50,
                    "atkMagic": 40,
                    "defMagic": 50,
                    "life": 60,
                    "speed": 80
                },//种族值
                "attribute": "火",
                probability:50,
                basicLevel:15,
                evolveLv: 36,
                evolveTo:"刘备-蜀",
                isBoss:true,
            }
        }
        if(name==="孙坚-群"){
            result = {
                name:"孙坚-群",
                "race": {
                    "atk": 80,
                    "def": 40,
                    "atkMagic": 40,
                    "defMagic": 40,
                    "life": 60,
                    "speed": 90
                },//种族值
                "attribute": "金",
                probability:50,
                basicLevel:15,
                evolveLv: 36,
                evolveTo:"孙坚-吴",
                isBoss:true,
            }
        }
        return result
    },//通过名字获取基本信息    
    getGroundByName(name){
        let ground = ""
        switch(name){
            case "threeKingdoms_taipingdao":
                ground = "水"
                break
            case "threeKingdoms_taoyuanjieyi":
                ground = "木"
                break
        }
        return ground
    },//获取场地属性
}