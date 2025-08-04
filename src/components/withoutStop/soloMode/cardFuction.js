const killList = [
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"金",text:"选定攻击目标并发起攻击",type:"基本卡"},

    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"木",text:"选定攻击目标并发起攻击",type:"基本卡"},

    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"水",text:"选定攻击目标并发起攻击",type:"基本卡"},

    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"火",text:"选定攻击目标并发起攻击",type:"基本卡"},

    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},
    {name:"杀",attribute:"土",text:"选定攻击目标并发起攻击",type:"基本卡"},

]//40张杀
const mainList = [
    {name:"过河拆桥",text:"将对方一张非怪兽卡送入弃牌堆",type:"锦囊卡"},
    {name:"过河拆桥",text:"将对方一张非怪兽卡送入弃牌堆",type:"锦囊卡"},
    {name:"过河拆桥",text:"将对方一张非怪兽卡送入弃牌堆",type:"锦囊卡"},
    {name:"过河拆桥",text:"将对方一张非怪兽卡送入弃牌堆",type:"锦囊卡"},

    {name:"顺手牵羊",text:"获取对方一张非怪兽卡",type:"锦囊卡"},
    {name:"顺手牵羊",text:"获取对方一张非怪兽卡",type:"锦囊卡"},
    {name:"顺手牵羊",text:"获取对方一张非怪兽卡",type:"锦囊卡"},
    {name:"顺手牵羊",text:"获取对方一张非怪兽卡",type:"锦囊卡"},

    {name:"无中生有",text:"指名一个属性，直到出现对应属性，将翻开的牌加入手牌，并受到数量*100的伤害",type:"锦囊卡"},
    {name:"无中生有",text:"指名一个属性，直到出现对应属性，将翻开的牌加入手牌，并受到数量*100的伤害",type:"锦囊卡"},
    {name:"无中生有",text:"指名一个属性，直到出现对应属性，将翻开的牌加入手牌，并受到数量*100的伤害",type:"锦囊卡"},

    {name:"借刀杀人",text:"指定一只有武器的非我方怪兽，攻击一只其他怪兽，随机去掉对方手上一张‘杀’，如果没有杀，则夺取武器",type:"锦囊卡"},
    {name:"借刀杀人",text:"指定一只有武器的非我方怪兽，攻击一只其他怪兽，随机去掉对方手上一张‘杀’，如果没有杀，则夺取武器",type:"锦囊卡"},

    {name:"决斗",text:"查看对方所有手牌，并进行双方“杀”的数量对比，数量少的一方受到对方“杀”的数量+1 *100的伤害",type:"锦囊卡"},
    {name:"决斗",text:"查看对方所有手牌，并进行双方“杀”的数量对比，数量少的一方受到对方“杀”的数量+1 *100的伤害",type:"锦囊卡"},
    {name:"决斗",text:"查看对方所有手牌，并进行双方“杀”的数量对比，数量少的一方受到对方“杀”的数量+1 *100的伤害",type:"锦囊卡"},

    {name:"乐不思蜀",text:"指定一只怪兽发动，乐不思蜀多次使用不会叠加，下次对方的回合进行判定，如果和乐不思蜀的属性不同，该怪兽无法攻击无法发动技能",type:"锦囊卡"},
    {name:"乐不思蜀",text:"指定一只怪兽发动，乐不思蜀多次使用不会叠加，下次对方的回合进行判定，如果和乐不思蜀的属性不同，该怪b兽无法攻击无法发动技能",type:"锦囊卡"},
    {name:"乐不思蜀",text:"指定一只怪兽发动，乐不思蜀多次使用不会叠加，下次对方的回合进行判定，如果和乐不思蜀的属性不同，该怪兽无法攻击无法发动技能",type:"锦囊卡"},
    {name:"乐不思蜀",text:"指定一只怪兽发动，乐不思蜀多次使用不会叠加，下次对方的回合进行判定，如果和乐不思蜀的属性不同，该怪兽无法攻击无法发动技能",type:"锦囊卡"},
    
    {name:"兵粮寸断",text:"指定一只怪兽发动，兵粮寸断多次使用不会叠加，下次对方的回合进行判定，如果中了该怪兽全属性减半直到下个对方回合结束",type:"锦囊卡"},
    {name:"兵粮寸断",text:"指定一只怪兽发动，兵粮寸断多次使用不会叠加，下次对方的回合进行判定，如果中了该怪兽全属性减半直到下个对方回合结束",type:"锦囊卡"},
    {name:"兵粮寸断",text:"指定一只怪兽发动，兵粮寸断多次使用不会叠加，下次对方的回合进行判定，如果中了该怪兽全属性减半直到下个对方回合结束",type:"锦囊卡"},
    {name:"兵粮寸断",text:"指定一只怪兽发动，兵粮寸断多次使用不会叠加，下次对方的回合进行判定，如果中了该怪兽全属性减半直到下个对方回合结束",type:"锦囊卡"},

    {name:"醍醐灌顶",text:"解除一只怪兽受到的所有效果",type:"锦囊卡"},
    {name:"醍醐灌顶",text:"解除一只怪兽受到的所有效果",type:"锦囊卡"},
    {name:"醍醐灌顶",text:"解除一只怪兽受到的所有效果",type:"锦囊卡"},
    {name:"醍醐灌顶",text:"解除一只怪兽受到的所有效果",type:"锦囊卡"},

    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},
    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},
    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},
    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},
    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},
    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},
    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},
    {name:"桃",text:"选择对怪兽使用，则其生命值直接回满，对自己使用则恢复100生命值",type:"基本卡"},

    {name:"青龙偃月刀",text:"使用杀之后 如果没有造成击杀，本回合可使用杀次数重置",type:"装备卡",equip:"武器",distance:3},

    {name:"诸葛连弩",text:"本回合可使用杀次数无限（永续效果结算）",type:"装备卡",equip:"武器",distance:1},

    {name:"贯石斧",text:"本回合使用杀，造成伤害后，造成的伤害额外结算到玩家身上，并去掉对方怪物装备的一匹马",type:"装备卡",equip:"武器",distance:2},

    {name:"方天画戟",text:"本回合使用杀可指定攻击距离内最多三个怪兽作为目标",type:"装备卡",equip:"武器",distance:3},

    {name:"麒麟弓",text:"可以直接越过怪兽攻击玩家",type:"装备卡",equip:"武器",distance:5},

    {name:"青钢剑",text:"可以无视对方怪兽护具",type:"装备卡",equip:"武器",distance:2},

    {name:"丈八蛇矛",text:"两张牌当一张杀用，如果两张牌属性相同，这张杀伤害翻倍",type:"装备卡",equip:"武器",distance:3},

    {name:"仁王盾",text:"对方对我方装备怪兽“杀”时，进行一次判定，如果和“杀”/仁王盾内的牌相同属性，此“杀”无效化，我方回合可以往仁王盾内放牌，放满五张不同属性直接无效所有 杀",type:"装备卡",equip:"防具"},
    {name:"仁王盾",text:"对方对我方装备怪兽“杀”时，进行一次判定，如果和“杀”/仁王盾内的牌相同属性，此“杀”无效化，我方回合可以往仁王盾内放牌，放满五张不同属性直接无效所有 杀",type:"装备卡",equip:"防具"},

    {name:"白银狮子",text:"装备白银狮子的怪兽失去白银狮子后，血量补满，装备怪兽每次收到的伤害-50%",type:"装备卡",equip:"防具"},

    {name:"八卦阵",text:"对方对我方装备怪兽“杀”时，将会随机命中怪兽或八卦阵中的牌，如果命中的是牌，则弃置该卡，令该“杀”失效，我方回合可以往八卦阵里面藏牌，而且没有上限",type:"装备卡",equip:"防具"},
    {name:"八卦阵",text:"对方对我方装备怪兽“杀”时，将会随机命中怪兽或八卦阵中的牌，如果命中的是牌，则弃置该卡，令该“杀”失效，我方回合可以往八卦阵里面藏牌，而且没有上限",type:"装备卡",equip:"防具"},

    {name:"+1马",text:"对方对装备此+1马的怪兽处理距离+1",type:"装备卡",equip:"加一马"},
    {name:"+1马",text:"对方对装备此+1马的怪兽处理距离+1",type:"装备卡",equip:"加一马"},

    {name:"-1马",text:"对方对装备此+1马的怪兽处理距离-1",type:"装备卡",equip:"减一马"},
    {name:"-1马",text:"对方对装备此+1马的怪兽处理距离-1",type:"装备卡",equip:"减一马"},
]
export default {
    getDeck(setting={
        jin:10,mu:10,shui:10,huo:10,tu:10
    }){
        //设置每个属性有几张(杀的属性为了平衡数量是不变的)
        const jin = setting.jin
        const mu = setting.mu
        const shui = setting.shui
        const huo = setting.huo
        const tu = setting.tu
        //获取数量
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
        //给所有卡赋予属性
        let desk = []
        killList.forEach(item=>{
            desk.push(item)
        })
        //把所有杀加入最终卡组
        deskMain.forEach(item=>{
            desk.push(item)
        })
        //把剩下的卡加入最终卡组
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
        })//二次打乱并加上保持唯一性用id
        return desk
    },//获取数组
    getBotAllMonsters(){
        return [
            {
                name:"小呆猫",
                atk:30,
                def:30,
                liv:30,
                lev:3,
            },
            {
                name:"大呆猫",
                atk:60,
                def:60,
                liv:60,
                lev:20,
            },
        ]
    },//获取bot的所有怪兽
    getMeAllMonsters(){
        return [
            {
                name:"秦力士",
                atk:20,
                def:20,
                liv:20,
                lev:1
            },
            {
                name:"秦先锋",
                atk:40,
                def:40,
                liv:40,
                lev:1
            },
            {
                name:"秦统军",
                atk:60,
                def:60,
                liv:60,
                lev:1
            },
            {
                name:"秦始皇",
                atk:100,
                def:100,
                liv:100,
                lev:100
            },
        ]
    },//获取我的所有怪兽
    canCallMonster(name,cardList,monsterList){
        //me/bot公用方法，通过传入的数据使用
        // console.log("检查"+ name + "是否可召唤")
        let callMonsterMes = this.getMonsterMesByName(name)
        let checkResult = this.checkCanCall(callMonsterMes.callNeed,cardList,monsterList)
        // console.log("召唤检查结果:"+checkResult)
        if(checkResult){
            //如果可以召唤
            return {
                result :true
            }
        }else{
            //不满足召唤条件
            return{
                result:false,
            }
        }
    },//检查召唤怪兽条件是否成立
    getMonsterMesByName(name){
        if(name == "小呆猫"){
            return {
                name:"小呆猫",
                atk:30,
                def:30,
                liv:30,
                lev:3,
                dec: "虽然战斗能力不强，但是每次老大挂掉，我都能用猫车把他拉回来喵！",
                callNeed:[{
                    type:"any",
                    num:2
                }],
                //召唤需要，任意属性两张牌
                skill:[
                    {
                        lev:"D",
                        name:"别打我喵",
                        dec:"对小呆猫的攻击将会由玩家承受",
                        type:"passive",
                    },
                    {
                        lev:"C",
                        name:"猫饭时间到",
                        dec:"从牌堆抽取两张卡，然后将手中一种属性卡全部丢弃，每一张玩家恢复50血",
                        type:"active",
                    },
                    {
                        lev:"B",
                        name:"老大你怎么死了喵",
                        dec:"玩家生命值清零但是场上有小呆猫的情况下，丢弃所有装备，将生命值回到200，手牌补充到4张，并将小呆猫除外",
                        type:"active",
                        once:true,//一回合一次
                    },
                    {
                        lev:"A",
                        name:"登龙学习中",
                        dec:"玩家使用的卡的属性集齐五种时候，小呆猫可以进化为大呆猫",
                        type:"active",
                    },
                    {
                        lev:"S",
                        name:"抱着火药桶和你爆了喵",
                        dec:"丢弃所有手牌，将呆猫和对方场上一只怪兽送入墓地",
                        type:"active",
                        once:true,//一回合一次
                    },
                ]
            }
        }
        if(name == "大呆猫"){
            return {
                name:"大呆猫",
                atk:60,
                def:60,
                liv:60,
                lev:20,
                dec: "不仅能做猫饭，还能老大并肩作战喵，学会了登龙的大呆猫实力不容小觑！",
                callNeed:[
                    {
                        type:"火",
                        num:1
                    },
                    {
                        type:"水",
                        num:1
                    },
                    {
                        type:"木",
                        num:1
                    },
                ],
                skill:[
                    {
                        lev:"D",
                        name:"呆猫集结",
                        dec:"没有手卡，而且墓地存在“呆猫”字段怪兽的时候可以发动，将墓地“呆猫”尽可能的进行无要求召唤，每拉一只抽一张卡",
                        type:"passive",
                        once:true,//一回合一次
                    },
                ]
            }
        }
        if(name=="秦力士"){
            return {
                name:"秦力士",
                atk:20,
                def:20,
                liv:20,
                lev:1,
                dec:"",
                callNeed:[{
                    type:'same',
                    num:2
                }],
            }
        }
        if(name=="秦先锋"){
            return {
                name:"秦先锋",
                atk:40,
                def:40,
                liv:40,
                lev:1,
                dec:"",
                callNeed:[{
                    type:'same',
                    num:3
                }],
            }
        }
        if(name=="秦统军"){
            return {
                name:"秦统军",
                atk:60,
                def:60,
                liv:60,
                lev:1,
                dec:"",
                callNeed:[{
                    type:'same',
                    num:4
                }],
            }
        }
        if(name=="秦始皇"){
            return {
                name:"秦始皇",
                atk:67,
                def:67,
                liv:67,
                lev:1,
                dec:"",
                callNeed:[{
                    type:'same',
                    num:5
                }],
            }
        }
    },//通过名字获取详情信息
    checkCanCall(callNeed,handList,botMonsterList){
        //召唤条件默认 具体属性 -> 同一属性 -> 任意属性
        //因此直接从头到尾过一遍就行
        // console.log(callNeed,handList,botMonsterList)
        let hand = handList
        let callneed = callNeed
        let can = true
        if(this.havePlace(botMonsterList)){
            //检查有没有位置
            // console.log("有位置，继续检查祭品条件")
            callneed.forEach(item=>{
                // console.log(item)
                if(can){
                    if(item.type!="any"&&item.type!="same"){
                        //如果不是任意也不是同一属性
                        const result = this.delByAttribute(item.type,item.num,hand)
                        if(result.result){
                            hand = result.list
                        }else{
                            can = false
                        }
                    }else if(item.type=="same"){
                        //同一属性
                        const result = this.delBySame(item.num,hand)
                        if(result.result){
                            hand = result.list
                        }else{
                            can = false
                        }
                    }else if(item.type=="any"){
                        //any
                        const result = this.delByAny(item.num,hand)
                        // console.log("any",result)
                        if(result.result){
                            hand = result.list
                        }else{
                            can = false
                        }
                    } 
                }
                
            })
            if(can){
                return true
            }else{
                return false
            } 
        }else{
            console.log("没有位置召唤了")
            return false
        } 
    },//判断能不能召唤
    delByAny(num,list){
        // console.log("处理any",num,list)
        if(Array.isArray(list)&&list.length>=num){
            let i = 0
            let resList = []
            let stop = false
            let discardPile = []
            list.forEach(item=>{
                if(stop){
                    resList.push(item)
                }else{
                    discardPile.push(item)
                    i++
                    if(i >= num){
                        stop = true
                    }
                    
                }
            })
            return {
                result:true,
                list:resList,
                discardPile:discardPile
            }
        }else{
            return {
                result : false
            }
        }
    },//针对任意属性的处理
    delBySame(num,list){
        console.log(num,list)
        let hand = list
        let numObject = {
            jin: 0,
            mu: 0,
            shui: 0,
            huo: 0,
            tu: 0
        }
        let biggest = {
            attribute:"",
            num: 0,
        }
        let discardPile = []
        if(Array.isArray(list)&&list.length>=num){
            list.forEach(item=>{
                if(item.attribute == "金"){
                    numObject.jin = numObject.jin+1
                }
                if(item.attribute == "木"){
                    numObject.mu = numObject.mu+1
                }
                if(item.attribute == "水"){
                    numObject.shui = numObject.shui+1
                }
                if(item.attribute == "火"){
                    numObject.huo = numObject.huo+1
                }
                if(item.attribute == "土"){
                    numObject.tu = numObject.tu+1
                }
            })
            if(numObject.jin>=num||numObject.mu>=num||numObject.shui>=num||numObject.huo>=num||numObject.tu>=num){
                if(numObject.jin>biggest.num){
                    biggest.num = numObject.jin
                    biggest.attribute = "金"
                }
                if(numObject.mu>biggest.num){
                    biggest.num = numObject.mu
                    biggest.attribute = "木"
                }
                if(numObject.shui>biggest.num){
                    biggest.num = numObject.shui
                    biggest.attribute = "水"
                }
                if(numObject.huo>biggest.num){
                    biggest.num = numObject.huo
                    biggest.attribute = "火"
                }
                if(numObject.tu>biggest.num){
                    biggest.num = numObject.tu
                    biggest.attribute = "土"
                }
                let resList = []
                let delNum = 0
                let stop = false
                console.log(biggest)
                hand.forEach(item=>{
                    if(stop||item.attribute!=biggest.attribute){
                        resList.push(item)
                    }else{
                        delNum++
                        if(delNum >= num){
                            stop = true
                        }
                        discardPile.push(item)
                    }
                })
                return {
                    result : true,
                    list:resList,
                    discardPile:discardPile
                }
            }else{
                return {
                    result : false
                }
            }
        }else{
            return {
                result : false
            }
        }
    },//针对相同属性的处理
    delByAttribute(type,num,list){
        //针对固定属性的处理
        let result = true 
        let reslList = []
        let stop = false
        let discardPile = []
        if(Array.isArray(list)&&list.length>=num&&!stop){
            let i = 0
            list.forEach((item,index)=>{
                if(item.attribute==type&&!stop){
                    i++
                    if(i>=num){
                        stop = true
                    }
                    discardPile.push(item)
                }else{
                    reslList.push()
                }
            })
            if(stop){
                return {
                    list:reslList,
                    result:true,
                    discardPile:discardPile
                }
            }else{
                return {
                    result:false
                }
            }
        }else{
            return {
                result:false
            }
        }
    },//针对固定属性的处理
    havePlace(place){
        let res = false
        place.forEach(item=>{
            if(item.name == ""){
                res = true
            }
        })
        return res
    },//检查还有没有位置
    checkDistance(fightMonster,monsterList,player){
        //攻击怪兽 被攻击者的怪兽 被攻击者 id 1和1相邻
        let res = false
        let fightDistance = 1+ fightMonster.house2!=""?1:0+fightMonster.weapon!=""?this.getWeaponDistance(fightMonster.weapon)-1:0
        monsterList.forEach(item=>{
            if(item.name!=""&&!res){
                if(this.getDistance(fightMonster,item)<fightDistance){
                    //如果距离足够
                    res = true
                }
            }
        })//检查攻击对方怪兽的距离
        if(!res){
            if(fightDistance>this.getDistanceToPlay(fightMonster,player)){
                res = true
            }
        }//检查攻击对方玩家的距离
        return res
    },//距离计算
    getDistance(monster1,monster2){
        if(monster1.id == monster2.id){
            return 1
        }else if(Math.abs(monster1.id - monster2.id == 1)){
            return 2
        }else if(Math.abs(monster1.id - monster2.id == 2)){
            return 3
        }
    },//获取两只怪兽之间的距离
    getDistanceToPlay(monster,player){
        if(monster.id == 1||monster.id == 3){
            return 3
        }if(monster.id == 2){
            return 4
        }
    },//获取怪兽和玩家之间的距离
    getWeaponDistance(name){
        let distance = 0
        mainList.forEach(item=>{
            if(name == item.name){
                distance = item.distance
            }
        })
    },//获取武器的攻击距离
    getRandomAttribute(){
        let choice = ""
        const randomNum = Math.floor(Math.random() * 101)
        //获取一个0~100的随机数
        if(randomNum<=20){
            choice = "金"
        }else if(randomNum>20&&randomNum<=40){
            choice = "木"
        }else if(randomNum>40&&randomNum<=60){
            choice = "水"
        }
        else if(randomNum>60&&randomNum<=80){
            choice = "火"
        }
        else if(randomNum>80&&randomNum<=100){
            choice = "土"
        }
        return choice
    },//获取随机属性值
}