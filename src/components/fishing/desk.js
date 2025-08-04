const killList = [
    {name:"杀",attribute:"金",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"金",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"金",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"木",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"木",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"木",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"水",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"水",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"水",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"火",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"火",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"火",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"土",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"土",text:"对其他玩家发起一次攻击，可以被闪抵消"},
    {name:"杀",attribute:"土",text:"对其他玩家发起一次攻击，可以被闪抵消"},
]
//标准卡池 15杀 每个属性3张杀
//一共60张 每个属性各有12张
const mainList = [
    {name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},{name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},
    {name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},{name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},
    {name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},{name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},
    {name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},{name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},
    {name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},{name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},
    {name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},{name:"闪",text:"可以用来响应 杀 或者 万箭齐发 "},
    {name:"桃",text:"回复自己场上怪兽生命值数量+100 的生命值"},{name:"桃",text:"回复自己场上怪兽生命值数量+100 的生命值"},
    {name:"桃",text:"回复自己场上怪兽生命值数量+100 的生命值"},{name:"桃",text:"回复自己场上怪兽生命值数量+100 的生命值"},
    {name:"决斗",text:"双方一直轮流出 杀 ，不然受到出的 杀数量*100 的伤害"},
    {name:"决斗",text:"双方一直轮流出 杀 ，不然受到出的 杀数量*100 的伤害"},
    {name:"南蛮入侵",text:"除了发起者，全场玩家都要受到150伤害，可以出一张 杀 抵消"},
    {name:"南蛮入侵",text:"除了发起者，全场玩家都要受到150伤害，可以出一张 杀 抵消"},
    {name:"南蛮入侵",text:"除了发起者，全场玩家都要受到150伤害，可以出一张 杀 抵消"},
    {name:"万箭齐发",text:"除了发起者，全场玩家都要受到150伤害，可以出一张 闪 抵消"},
    {name:"万箭齐发",text:"除了发起者，全场玩家都要受到150伤害，可以出一张 闪 抵消"},
    {name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},{name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},
    {name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},{name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},
    {name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},{name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},
    {name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},{name:"酒",text:"本回合下一张杀伤害结算伤害翻倍，可叠加"},
    {name:"无懈可击",text:"无效一张锦囊牌的发动 对我方造成效果"},{name:"无懈可击",text:"无效一张锦囊牌的发动 对我方造成效果"},
    {name:"无懈可击",text:"无效一张锦囊牌的发动 对我方造成效果"},{name:"无懈可击",text:"无效一张锦囊牌的发动 对我方造成效果"},
    {name:"过河拆桥",text:"选对方一张手卡，送入弃卡堆"},{name:"过河拆桥",text:"选对方一张手卡，送入弃卡堆"},
    {name:"过河拆桥",text:"选对方一张手卡，送入弃卡堆"},{name:"过河拆桥",text:"选对方一张手卡，送入弃卡堆"},
    {name:"顺手牵羊",text:"选对方一张手卡，加入我方手卡"},{name:"顺手牵羊",text:"选对方一张手卡，加入我方手卡"},
    {name:"顺手牵羊",text:"选对方一张手卡，加入我方手卡"},
    {name:"桃园结义",text:"双方回复200生命值"},
    {name:"五谷丰登",text:"从卡堆翻开场上玩家数量 数量的卡，从发动者 顺时针轮流一人选一张加入手卡"},
    {name:"五谷丰登",text:"从卡堆翻开场上玩家数量 数量的卡，从发动者 顺时针轮流一人选一张加入手卡"},
]
const cardPriorityList = [
    {name:"顺手牵羊",priority: 1},
    {name:"过河拆桥",priority:2},
    {name:"南蛮入侵",priority:3},
    {name:"万箭齐发",priority:4},
    {name:"决斗",priority:5},
    {name:"酒",priority:6},
    {name:"杀",priority:7},
    {name:"五谷丰登",priority:8},
    {name:"桃园结义",priority:9},
    {name:"桃",priority:10},
]
//bot使用卡牌的优先级
export default {
    getSomething(sb){
        return sb
    },
    getDesk(setting={
        jin:12,mu:12,shui:12,huo:12,tu:12
    }){
        const jin = setting.jin
        const mu = setting.mu
        const shui = setting.shui
        const huo = setting.huo
        const tu = setting.tu
        let desk = []
        //属性配置
        let deskMain = mainList.sort(()=>{
            return (0.5-Math.random())
        })//打乱主要卡组
        deskMain.map((item,index)=>{
            if(index<jin){
                item.attribute = "金"
            }else if(jin<=index<(jin+mu)){
                item.attribute = "木"
            }else if((jin+mu)<=index<(jin+mu+shui)){
                item.attribute = "水"
            }else if((jin+mu+shui)<=index<(jin+mu+shui+huo)){
                item.attribute = "火"
            }else if((jin+mu+shui+huo)<=index<(jin+mu+shui+huo+tu)){
                item.attribute = "土"
            }
        })
        killList.forEach(item=>{
            desk.push(item)
        })
        deskMain.forEach(item=>{
            desk.push(item)
        })
        let getIdList = []
        for(let index = 0;index<desk.length;index++){
            getIdList.push({
                ...desk[index],
                id:index
            })
        }
        desk = getIdList
        desk = desk.sort(()=>{
            return (0.5-Math.random())
        })//二次打乱
        return desk
    },
    getMesByName(name){
        if(name=="呆猫"){
            return {
                name:"呆猫",
                attribute:"木",
                skill:[
                  {name:"吃团子",text:"1木1水1火发动,回复200生命",type:"主动技"},
                  {name:"和你爆了",text:"2火2金发动,对一名角色造成200伤害,自身受到100伤害",type:"主动技"},
                  {name:"生气了喵",text:"1火1水发动,回合结束前攻击力*队伍内呆猫的数量",type:"主动技"},
                ],
                race:{
                    attack:66,
                    defense:50,
                    life:60,
                },
                initialRace:{
                    attack:33,
                    defense:17,
                    life:27,
                }
              }
        }
        if(name=="呆猫王"){
            return {
                name:"呆猫王",
                attribute:"木",
                skill:[
                  {name:"登龙",text:"1木1火发动,造成伤害时可以发动，对方生命值减半",type:"主动技"},
                  {name:"推猫车",text:"登场发动，回复500生命值",type:"登场技"},
                  {name:"与老大并肩作战喵",text:"登场发动，生命值*队伍中呆猫数量",type:"登场技"},
                ],
                race:{
                    attack:80,
                    defense:60,
                    life:70,
                },
                initialRace:{
                    attack:47,
                    defense:27,
                    life:37,
                }
              }
        }
    },
    botUserCardMethod(list,allMes){
        let isUsedDrink = allMes.isUsedDrink
        //是否用过酒了，一回合只能用一次
        let index = 0
        for(let i = 0;i<list.length;i++){
            cardPriorityList.forEach(item=>{
                if(item.name == list[i].name){
                    if(item.name == "酒"&&isUsedDrink){
                        //无事发生，酒不能重复喝
                    }else{
                        if(i>index){
                            index = i
                        }  
                    }
                }
            })
        }

        return index
    },
}