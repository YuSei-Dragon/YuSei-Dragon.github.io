let skillList = [
    {
        name:"刺拳",
        type:"atk",
        atk:"35",
        aim:"single",
        cost: 1,
        text:"拳击对方造成伤害",
        attribute:"普通",
    },
    {
        name:"符水护体",
        type:"effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atk","value":1},
                {"type":"speed","value":1},
                {"type":"delay",list:[
                    {"type":"atk","value":-1,turn:2},
                    {"type":"speed","value":-1,turn:2}
                ]}],
            bot:[]
        },
        text:"大贤良师张角分发的符水，号称包治百病，实际上并无作用。自身2回合内小幅增加攻击和速度，自身2回合后小幅降低攻击和速度。",
        attribute:"水",
    },
    {
        name:"一马当先",
        type:"atk",
        atk:"70",
        aim:"single",
        effect:{
            my:[{"type":"atk","value":1},
                {"type":"def","value":-1}],
            bot:[]
        },
        cost: 1,
        text:"攻击命中后小幅增加攻击，但是小幅降低自身防御",
        attribute:"普通",
    },
    {
        name:"制药治人",
        type:"team",
        aim:"single",
        cost: 1,
        effect:[{type:"cure",percent:25}],
        text:"选择一只我方精灵，回复1/4生命值",
        attribute:"普通",
    },
    {
        name:"召雷之符",
        type:"atkMagic",
        atkMagic:"50",
        aim:"single",
        effect:{
            my:[],
            bot:[{"type":"lock","value":1,"percent":"50"}]
        },
        cost: 1,
        text:"使用召雷符文攻击对方，5%封印对方一回合",
        attribute:"金",
    },
    {
        name:"问道",
        type:"effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{"type":"atkMagic","value":1},{"type":"speed","value":1}],
            bot:[]
        },
        text:"学习道法，小幅增加特攻和速度",
        attribute:"普通",
    },
    {
        name:"太平要术",
        type:"effect",
        aim:"self",
        cost: 2,
        effect:{
            my:[{"type":"atkMagic","value":2}],
            bot:[]
        },
        text:"学习道法，大幅幅增加特攻",
        attribute:"普通",
    },
    {
        name:"召雨之符",
        type:"atkMagic",
        atkMagic:"50",
        aim:"single",
        effect:{
            my:[],
            bot:[{"type":"speed","value":-1}]
        },
        cost: 1,
        text:"使用召雨符文攻击对方，小幅降低对方速度",
        attribute:"水",
    },
    {
        name:"雷公助我",
        type:"effect",
        aim:"single",
        cost: 3,
        effect:{
            my:[{type:"lock","value":3}],
            bot:[{"type":"delay",list:[
                    {"type":"hurt","value":"90","valueType":"percent",turn:2}
                ]}]
        },
        text:"2回合后造成对方最大生命值90%的伤害,使用后封印自己3回合",
        attribute:"金",
    },
    {
        name:"呼风唤雨",
        type:"atkMagic",
        atkMagic:"100",
        aim:"single",
        effect:{
            my:[],
            bot:[{"type":"speed","value":-1},{"type":"defMagic","value":-1}]
        },
        cost: 2,
        text:"呼风唤雨攻击对方，小幅降低对方速度，小幅降低对方特防",
        attribute:"水",
    },
    {
        name:"符水治愈",
        type:"team",
        aim:"single",
        cost: 2,
        effect:[{type:"cure",percent:50}],
        text:"选择一只我方精灵，回复1/2生命值",
        attribute:"普通",
    },
    {
        name:"咆哮",
        type:"effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{type:"atk","value":1}],
            bot:[]
        },
        text:"小幅增加自己攻击",
        attribute:"普通",
    },
    {
        name:"侦察兵",
        type:"effect",
        aim:"self",
        cost: 1,
        effect:{
            my:[{type:"speed","value":1}],
            bot:[]
        },
        text:"小幅增加自己移速",
        attribute:"普通",
    },
    {
        name:"右鞭腿",
        type:"atk",
        atk:"60",
        aim:"single",
        effect:{
            my:[],
            bot:[{type:"lock","value":1,"percent":"10"}]
        },
        cost: 1,
        text:"不讲武德的偷袭69岁的老年人招数，10%概率封印对方一回合",
        attribute:"水",
    },
    {
        name:"左正蹬",
        type:"atk",
        atk:"60",
        aim:"single",
        effect:{
            my:[{type:"atk","value":1}],
            bot:[]
        },
        cost: 1,
        text:"不讲武德的偷袭69岁的老年人招数，命中小幅增加自己的攻击",
        attribute:"水",
    },
    {
        name:"天兵突袭",
        type:"atkMagic",
        atkMagic:"120",
        aim:"single",
        effect:{
            my:[],
            bot:[]
        },
        cost: 2,
        text:"开坛做法召集天兵下凡，虽是障眼法但足以震慑人心",
        attribute:"水",
    },
    {
        name: "刀枪不入",
        type: "atk",
        atk: "120",
        atkAdd:{
            surelyHit:true,
            incomplete:true,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 3,
        text:"所谓刀枪不入只是一个义无反顾反抗暴政的理由，必中技能，无视闪避,自身血量越低，造成伤害越高。",
        attribute:"普通",
    },
    {
        name: "冲锋",
        type: "atk",
        atk: "60",
        atkAdd:{
            rebound:25,
        },//攻击附带的特殊效果
        aim:"single",
        cost: 2,
        text:"舍身技，会受到1/4的伤害反弹",
        attribute:"普通",
    },


]
let monsterSkillListByLevel = [
    {
        name:"张角-庶民",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"制药治人"},
            {level:12,name:"召雷之符"},
            {level:16,name:"问道"},
            {level:23,name:"召雨之符"},
            {level:27,name:"太平要术"},
        ]
    },//张角-庶民
    {
        name:"张角-天公将军",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"制药治人"},
            {level:12,name:"召雷之符"},
            {level:16,name:"问道"},
            {level:23,name:"召雨之符"},
            {level:27,name:"太平要术"},
            {level:29,name:"雷公助我"},
            {level:36,name:"呼风唤雨"},
            {level:42,name:"符水治愈"},
        ],
        logic:(allMes,skillList)=>{
            //skillList 里面有完整数据
            console.log("张角-天公将军的技能特殊处理逻辑")
            let skillListName = []
            
            let needCure = false
            let zhangjiaoHurt = false
            let remainingList = []
            skillList.map((item,index)=>{
                skillListName.push(item.name)
                if(!["符水治愈","制药治人","雷公助我"].includes(item.name)){
                    remainingList.push(index)
                }//除去特殊条件触发的技能剩下的技能
            })
            allMes.fightMes.botMes.monsterList.forEach(item=>{
                if(item.nowLife<item.life/3&&item.isDead===false){
                    needCure = true
                }
                if(item.name==="张角-天公将军"&&item.nowLife<item.life/2){
                    zhangjiaoHurt = true
                }//如果张角残了
            })//外面已经自动锁定到血量最低的人身上
            //如果满足了某些较为苛刻的条件，就会优先发动对应的技能，不然一般都是随机
            if(needCure===true&&skillListName.includes("符水治愈")){
                return skillList.findIndex(item=>item.name==="符水治愈")
            }
            if(needCure===true&&skillListName.includes("制药治人")){
                return skillList.findIndex(item=>item.name==="制药治人")
            }//如果血量不健康就优先开治疗能力
            if(skillListName.includes("雷公助我")&&(zhangjiaoHurt===true||
                allMes.fightMes.myMes.monsterList.length>2)){
                return skillList.findIndex(item=>item.name==="雷公助我")
            }//如果张角残了，或者敌方有超过2个怪，就优先开始劈人

            return remainingList[Math.floor(Math.random()*remainingList.length)]
            //如果都不满足，就随机开一个技能
        }
    },//张角-天公将军
    {
        name:"张宝-庶民",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"咆哮"},
            {level:12,name:"侦察兵"},
            {level:20,name:"右鞭腿"},
            {level:23,name:"左正蹬"},
            {level:26,name:"一马当先"},
        ]
    },//张宝-庶民
    {
        name:"张宝-地公将军",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"咆哮"},
            {level:12,name:"侦察兵"},
            {level:20,name:"右鞭腿"},
            {level:23,name:"左正蹬"},
            {level:26,name:"一马当先"},
            {level:29,name:"天兵突袭"},
        ],
        logic:(allMes,skillList)=>{
            //skillList 里面有完整数据
            let skillListName = []
            let zhangbaoHurt = false
            let remainingList = []
            skillList.map((item,index)=>{
                skillListName.push(item.name)
                if(!["天兵突袭"].includes(item.name)){
                    remainingList.push(index)
                }//除去特殊条件触发的技能剩下的技能
            })
            allMes.fightMes.botMes.monsterList.forEach(item=>{
                if(item.name==="张宝-地公将军"&&item.nowLife<item.life/2){
                    zhangbaoHurt = true
                }//如果张宝残了
            })//外面已经自动锁定到血量最低的人身上
            //如果满足了某些较为苛刻的条件，就会优先发动对应的技能，不然一般都是随机
            if(skillListName.includes("天兵突袭")&&zhangbaoHurt===true){
                return skillList.findIndex(item=>item.name==="天兵突袭")
            }//如果张宝残了，就优先开始做法吓人
            return remainingList[Math.floor(Math.random()*remainingList.length)]
            //如果都不满足，就随机开一个技能
        }
    },//张宝-地公将军
    {
        name:"张梁-庶民",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"咆哮"},
            {level:12,name:"侦察兵"},
            {level:20,name:"右鞭腿"},
            {level:23,name:"左正蹬"},
            {level:26,name:"一马当先"},
        ]
    },//张梁-庶民
    {
        name:"张梁-人公将军",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"咆哮"},
            {level:12,name:"侦察兵"},
            {level:20,name:"右鞭腿"},
            {level:23,name:"左正蹬"},
            {level:26,name:"一马当先"},
            {level:29,name:"刀枪不入"},
        ],
        logic:(allMes,skillList)=>{
            //skillList 里面有完整数据
            let skillListName = []
            let zhangLiangHurt = false
            let remainingList = []
            skillList.map((item,index)=>{
                skillListName.push(item.name)
                if(!["刀枪不入"].includes(item.name)){
                    remainingList.push(index)
                }//除去特殊条件触发的技能剩下的技能
            })
            allMes.fightMes.botMes.monsterList.forEach(item=>{
                if(item.name==="张梁-人公将军"&&item.nowLife<item.life/2){
                    zhangLiangHurt = true
                }//如果张梁残了
            })//外面已经自动锁定到血量最低的人身上
            //如果满足了某些较为苛刻的条件，就会优先发动对应的技能，不然一般都是随机
            if(skillListName.includes("刀枪不入")&&zhangLiangHurt===true){
                return skillList.findIndex(item=>item.name==="刀枪不入")
            }//如果张梁残了，就优先开始展示数值
            return remainingList[Math.floor(Math.random()*remainingList.length)]
            //如果都不满足，就随机开一个技能
        }
    },//张梁-人公将军
    {
        name:"黄巾军先锋",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"符水护体"},
            {level:10,name:"一马当前"},
        ]
    },//黄巾军先锋
    {
        name:"黄巾军士兵",
        skillList:[
            {level:1,name:"刺拳"},
            {level:5,name:"符水护体"},
            {level:8,name:"冲锋"},
        ]
    },//黄巾军士兵
    {
        name:"曹操-群",
        skillList:[
            {level:1,name:"刺拳"},

        ]
    },//曹操
    {
        name:"刘备-群",
        skillList:[
            {level:1,name:"刺拳"}
        ]
    },//刘备
    {
        name:"孙坚-群",
        skillList:[
            {level:1,name:"刺拳"}
        ]
    },//孙坚
]
export default{
    getThreeKingdomsSkillList(){
        return skillList
    },
    getSkillList(){
        return monsterSkillListByLevel
    }
}