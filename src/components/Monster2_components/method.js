
const monsterGroundSetting = {type:"monster",backgroundColor:"rgb(46 51 58)",}
const trapGroundSetting = {type:"monster",backgroundColor:"rgb(83 69 89)",}
const myDeskList = [
    {
        name:"诺克萨斯之手",type:"monster",start:8,
    strength:10,attack:8,defense:7,strengthRe:6 ,
    field:["诺克萨斯","诺克萨斯之手"],
    ability:[
        {
            effect:"这张卡召唤时，从牌组中检索一张'诺克萨斯的战斧'",
            scene:"self-call",
            place:"any"
        },
        {
            effect: "这张卡每进行一次战斗，攻击力上升1点",
            scene:"after-fight",
            place:"ground"
        }
        ]
    },
    {
        name:"诺克萨斯的战斧",type:"equip",
    field:["诺克萨斯","诺克萨斯之手"],
    ability:[
        {
            effect: "这张卡进入墓地时可以发动，从牌组中将一张'诺克萨斯之手'加入手卡",
            scene:"enter-gy",
            place:"gy"
        },
        {
            effect: "装备怪兽战斗破坏对方怪兽时，恢复对方怪兽攻击力的体力值，",
            scene:"enter-gy",
            place:"ground"
        },
        ]
    },
    {
        name:"对力量的渴望", type:"magic",
    field:["诺克萨斯","诺克萨斯之手"],
    ability:[
        {
            effect:"弃置一张手卡，失去2点生命值，从牌组中把两张'诺克萨斯' 魔法/陷阱卡 加入手卡",
            scene:"self-call",
            place:"hand"
        },
        {
            effect:"一回合只能发动一张,不能检索自身",
            scene:"any",
            place:"hand"
        },
        ]
    },
    {
        name:"无可匹敌的力量",type: "trap",
    field:["诺克萨斯","诺克萨斯之手"],
    ability:[
        {
            effect: "本回合我方场上一只'诺克萨斯'怪兽不会被战斗破坏",
            scene:"effect",
            place:"ground"
        },
        {
            effect: "这张卡可以献祭场上一只'诺克萨斯'怪兽并支付一点生命值，从墓地盖放到场上",
            scene:"effct",
            place:"gy"
        }
        ]
    },
    {
        name:"诺克萨斯断头台",type:"magic",
    field:["诺克萨斯","诺克萨斯之手"],
    ability:[
        {
            effect: "当我方场上有'诺克萨斯之手'时可以发动，破坏一只比其攻击力低的怪兽，并给予对方生命值等额伤害",
            scene:"effect",
            place:"ground"
        }
        ]
    },
    {
        name:"诺克萨斯的牺牲品",type:"monster",start:4,
    strength:4,attack:3,defense:4,strengthRe:2,
    field:["诺克萨斯"],
    ability:[
        {
            effect:"该怪兽攻击不低于8后破坏",
            scene: "any",
            place:"ground"
        },
        {
            effect:"每回合结束，该怪兽攻击力增加3，并给予使用者1点伤害",
            scene: "end-turn",
            place:"ground"
        },
        ]
    },
    {
        name:"诺克萨斯的平民",type:"monster",start:2,
    strength:2,attack:1,defense:1,strengthRe:1,
    field:["诺克萨斯"],
    ability:[
        {
            effect:"回合开始时，这张卡可以从墓地召唤",
            scene:"round-start",
            place:"gy"
        },
        {
            effect:"献祭场上的这张卡，从墓地选五张'诺克萨斯'卡回到卡组，并抽两张卡",
            scene:"effect",
            place:"ground"
        }
        ]
    },
    {
        name:"诺克萨斯的处刑官",type:"monster",start:6,
    strength:6,attack:6,defense:4,strengthRe:6,
    field:["诺克萨斯","诺克萨斯的处刑官"],
    ability:[
        {
            effect:"场上有其他'诺克萨斯'怪兽的场合才可以召唤",
            scene:"any",
            place:"ground"
        },
        {
            effect:"召唤成功时，从牌组中将一张'旋转飞斧'加入手卡",
            scene:"self-call",
            place:"ground"
        },
        {
            effect:"这张卡攻击力增加场上/墓地'诺克萨斯'怪兽数量*1",
            scene:"any",
            place:"ground"
        },
        {
            effect:"这张卡进入墓地时，将'诺克萨斯之手'加入手卡",
            scene:"self-enter-gy",
            place:"gy"
        },
        ]
    },
    {
        name:"旋转飞斧",type:"equip",
    field:["诺克萨斯","诺克萨斯的处刑官"],
    ability:[
        {
            effect:"这张卡装备的怪兽可以直接攻击，然后破坏",
            scene:"any",
            place:"ground"
        },
        {
            effect:"旋转飞斧装备者造成伤害后，旋转飞斧将回到手卡,并把牌组最上方一张卡移入墓地",
            scene:"effect",
            place:"ground"
        },
        ]
    },
    {
        name:"强大力量的背后",type:"trap",
    field:["诺克萨斯"],
    ability:[
        {
            effect:"场上双方'诺克萨斯'怪兽仅在战斗阶段，攻击力+2，能发起攻击必须发起攻击",
            scene:"enter-fight,start-fight,fighting",
            place:"ground"
        },
        {
            effect:"所有进行过攻击的怪兽破坏",
            scene:"end-fightTurn",
            place:"ground"
        },
       ]
    },
    {
        name:"不择手段的强化",type:"equip",
    field:["诺克萨斯"],
    ability:[
        {
            effect:"选中一只'诺克萨斯'怪兽才能发动，每回合开始使用者失去2点生命值",
            scene:"round-start",
            place:"ground"
        },
        {
            effect:"装备怪兽不会被效果破坏",
            scene:"any",
            place:"ground"
        },
        ]
    }

]//desk
export default {
    getSomething(sb){
        return sb
    },
    getCardGroundSetting:[trapGroundSetting,trapGroundSetting,
            monsterGroundSetting,monsterGroundSetting,monsterGroundSetting,
            monsterGroundSetting,monsterGroundSetting,monsterGroundSetting,
            trapGroundSetting,trapGroundSetting],
    useCardsCheck(monster,blood,monsterList){
        let result = {
            res : false,
            state : "",
            monster:"",
            equip:"",
        }
        if(monster.type=='monster'){
            //如果是怪兽的处理
            let Monsterblood = 0
            monsterList.forEach(item=>{
                Monsterblood+= item.start
            })
            console.log(monster.name,Monsterblood)
            if(monster.start>blood){
                console.log("没有足够的生命值进行召唤")
            }else if(monster.start > (Monsterblood*2)&&monster.start>4){
                console.log("没有足够的祭品进行召唤")
            }else{
                result.monster = monster
                if(monster.start>4){
                    result.state = "wait"
                }else{
                    console.log("召唤"+ monster.name)
                    result.state = "summon"
                }
            }
        }else if(monster.type=='equip'){
            //对装备卡的处理
            if(this.canEquipMonster(monsterList)){
                result.state = "equip"
                result.equip = monster
            }else{
                console.log("场上没有可以进行装备的怪兽")
            }
        }else if(monster.type=='magic'){
            //对魔法卡的处理，由于比较复杂丢到后面单独处理
                result.state = "magic"
        }
        return result
    },//对手卡进行检查,进行处理分类
    canEquipMonster(list){
        if(list.length<=0){
            return false
        }else{
            return true
        }
    },//对场上怪兽是否可以装备进行检测
    checkEquipStart(name,who,mesList){
        let result = mesList
        if(name=="???"){
            //
        }
        return result
    },//对装备使用的时点是否可用进行判断
    checkMonsterSkill(monster,who,mesList){
        let result = mesList
        if(monster.name == "诺克萨斯之手"){
            console.log(monster.name+ "效果发动！")
            if(who == "my"){
                const card = this.findCardByName("诺克萨斯的战斧",mesList.myDesk)
                if(card!=false){
                    result.myHandCardList.push(card)
                    result.method = "showmyhand" 
                    console.log("从卡组将一张'诺克萨斯的战斧'加入手卡")
                }else{
                    console.log("检索失败，卡组中没有指定的卡")
                }
                
            }else{
                const card = this.findCardByName("诺克萨斯的战斧",mesList.itsDesk)
                if(card!=false){
                    result.itsHandCardList.push(card)
                    result.method = "showitshand"
                    console.log("从卡组将一张'诺克萨斯的战斧'加入手卡")
                }else{
                    console.log("检索失败，卡组中没有指定的卡")
                }
            }
        }
        
        return result
    },//检查召唤的怪兽是否有召唤成功触发的效果
    checkMagic(name,who,mesList){
        let result = mesList
        result.res = true
        //默认可用,用于判断是否可发动该魔法
        if(result.banList.indexOf(name)!=-1){
            console.log("这张卡的效果一回合只能用一次！")
            return false
        }
        if(name == "对力量的渴望"){
            if(who=="my"){
                if(mesList.myBlood<=2||mesList.myHandCardList.length<2){
                    console.log("血量不足或无可弃手牌，无法发动")
                    result.res = false
                }else{
                    this.showCardsName("我方手卡",mesList.myHandCardList)
                    console.log("请选择一张丢弃的手卡")
                }
            }else{
                if(mesList.itsBlood<=2||mesList.itsHandCardList.length<2){
                    console.log("血量不足或无可弃手牌，无法发动")
                    result.res = false
                }else{
                    this.showCardsName("敌方手卡",mesList.itsHandCardList)
                    console.log("请选择一张丢弃的手卡")
                }
            }
        }
        return result
        
    },//魔法卡发动条件检测
    makeMagic(name,who,mesList,thisIndex){
        let result = mesList
        if(name=="对力量的渴望"){
            result.useState = "discard"
            result.todo = {
                name:name,
                num:1,
                type:"discard",
                index:thisIndex,
            }
        }
        return result
    },//魔法卡发动
    cardFinishDiscard(name,who,mesList){
        let result = mesList
        if(name == "对力量的渴望"){
            if(who=="my"){
                let list = []
                let remainingList = []
                mesList.myDesk.forEach(item=>{
                    if(item.field.indexOf("诺克萨斯")&&item.name!="对力量的渴望"){
                        list.push(item)
                    }else{
                        remainingList.push(item)
                    }
                })
                result.todo = {
                    list: list,
                    num: 2,
                    type:"choice",
                    remainingList: remainingList,
                }
                this.showCardsName("可选择的卡",list)
                result.useState = "choice"
            }else{
                //
            }
        }
        return result
    },//完成丢弃触发效果处理
    getMyDesk(){
        return myDeskList
    },//获取我的卡组数据
    findCardByName(name,list){
        let res = false
        list.forEach(item=>{
            console.log(item,item.name)
            if(item.name == name){
                res = item
            }
        })
        return res
    },//通过怪兽name查找怪兽详细信息
    showCardsName(name,list,indexList=[]){
        console.log(name+ "为：")
        let result = ""
        list.forEach((item,index)=>{
            if(indexList.indexOf(String(index)==-1)){
                result+= (index + item.name+'  ')
            }
        })
        console.log(result)
    }//查看某个地方的卡牌情况
}
