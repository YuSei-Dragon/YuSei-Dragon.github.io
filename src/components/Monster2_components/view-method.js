const NoxusList =[
    {
        name:"诺克萨斯之手",type:"monster",start:8,
    strength:10,attack:8,defense:7,strengthRe:6 ,
    field:["诺克萨斯","诺克萨斯之手"],
    ability:[
        {
            effect:"这张卡召唤时，从牌组中检索一张'诺克萨斯的战斧'",
            scene:"self-call",
            place:"ground",
            speed:1,
        },
        {
            effect: "这张卡每进行一次战斗，攻击力上升1点",
            scene:"after-fight",
            place:"ground",
            speed:5,
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
            place:"gy",
            speed:2,
        },
        {
            effect: "装备怪兽战斗破坏对方怪兽时，恢复对方怪兽攻击力的体力值，",
            scene:"enter-gy",
            place:"ground",
            speed:2,
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
            place:"hand",
            speed:1,
        },
        {
            effect:"一回合只能发动一张,不能检索自身",
            scene:"any",
            place:"hand",
            speed:5,
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
            place:"ground",
            speed:3,
        },
        {
            effect: "这张卡可以献祭场上一只'诺克萨斯'怪兽并支付一点生命值，从墓地盖放到场上",
            scene:"effct",
            place:"gy",
            speed:3,
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
            place:"ground",
            speed:1,
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
            place:"ground",
            speed:5,
        },
        {
            effect:"每回合结束，该怪兽攻击力增加3，并给予使用者1点伤害",
            scene: "end-turn",
            place:"ground",
            speed:1,
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
            place:"gy",
            speed:1,
        },
        {
            effect:"献祭场上的这张卡，从墓地选五张'诺克萨斯'卡回到卡组，并抽两张卡",
            scene:"effect",
            place:"ground",
            speed:1,
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
            place:"ground",
            speed:5,
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
//NoxusDesk
//法术速度：
    // 各种效果分为1，2，3，4级速度
    // 1级速度只能开启连锁，不能加入连锁
    // 2级速度可以随时加入连锁，但是不能连锁2级以上的效果
    // 3级速度可以随时加入连锁，但是不能连锁3级以上的效果
    // 4级速度可以随时加入连锁，而且发动之后连锁强制结束
    // 5级速度（永续/必发效果，满足条件就会触发,不入连锁
    // 一次连锁只算做一次行动
    // 如果满足了发动条件但是不满足发动速度,那么效果就会被卡掉
//连锁询问
    // 一个开启连锁的询问, 让你随时能发动2速以上的卡牌效果
//速度对是否自己回合的限制
    // 在自己回合发动将触发 '连锁优先权'
    // 连锁优先权:
    // 处于自己回合的玩家,开启/接入连锁，每次对面连锁必须使用更高级的速度
//连锁接力
    // 对方玩家接上你的连锁链
    // 1级速度只能在自己回合发动，无法连锁
    // 2级速度可以在双方回合发动
    // 3级及以上速度可以随时发动并加入连锁
    // 并带出4级速度的 '连锁终结权'
//关于4级速度的连锁终结权
    // 在发动4级速度卡后,连锁将强制终止,并进行结算
    // 5级速度卡会正常接到连锁链最后，永续不入连锁，当成生效
    // 必开效果将会另开连锁，延迟执行
//连锁询问节点
//scene场景
    // any 永续效果
    // round-start 回合开始 (当...回合开始时)
    // draw 抽卡(阶段) (当...从卡组中抽卡或者把卡加入手卡)
    // self-call 召唤（自己）
    // others-call 召唤（其他怪兽）
    // self-enter-gy 进入墓地(自己)
    // others-enter-gy 进入墓地(其他)
    // effect 发动任意效果 (计算速度)
    // enter-fight 进入战斗阶段 (触发)
    // start-fight 发出攻击宣言 (触发)
    // fighting 进行伤害结算 (触发)
    // after-fight 战斗结束 (触发)
    // end-fightTurn 战斗阶段结束 (触发)
    // end-turn 结束回合 (触发)
//place 位置
    // any 任意位置能触发
    // hand 在手卡上才能触发
    // gy 在墓地里面才能触发
    // ground 在场上才能触发(怪兽卡monster检查前场，其他卡检查后场)
export default {
    getNoxus(){
        return NoxusList
    },
    itsDrawCard(num,itsHandCardList,itsDesk){
        if(itsDesk.length<num){
            console.log("game over. its牌库抽空了")
        }else{
            if(num>0){
                let deskList = []
                itsDesk.forEach((item,index)=>{
                    if(index>=num){
                        deskList.push(item)
                    }else{
                        itsHandCardList.push(item)
                    }
                })
                itsDesk = deskList
                // console.log(itsHandCardList)
                //更新bot的牌组和手卡
                console.log("bot抽了"+num+ "张卡")
                return {
                    itsHandCardListValue:itsHandCardList,
                    itsDeskValue:itsDesk
                }
            }else{
                console.log("抽卡数量不能小于0")
            }
        }
        
    },
    myDrawCard(num,myHandCardList,myDesk){
        console.log(num,myHandCardList,myDesk)
        if(myDesk.length<num){
            console.log("game over. my牌库抽空了")
        }else{
            if(num>0){
                let deskList = []
                myDesk.forEach((item,index)=>{
                    if(index>=num){
                        deskList.push(item)
                    }else{
                        myHandCardList.push(item)
                    }
                })
                myDesk = deskList
                // console.log(myHandCardList)
                //更新bot的牌组和手卡
                console.log("me抽了"+num+ "张卡")
                return {
                    myHandCardListValue:myHandCardList,
                    myDeskValue:myDesk
                }
            }else{
                console.log("抽卡数量不能小于0")
            }
        }
        
    },
    checkMonsterAbility(item,allMes){
        allMes.checkResult = false
        if(Array.isArray(item.ability) && item.ability.length>0){
            //效果怪兽
            item.ability.forEach(item1=>{
                if(item1.place=="any"||item1.place=="hand"){
                    allMes.checkResult = true
                }
            })
        }else{
            //
        }//通常怪兽
        // allMes.recordList.push("123231")
        return allMes
        //需要对所有怪兽卡进行一一分析
    },
    checkCall(item,allMes){
        allMes.checkResult = false
        if(item.start<=4){
            allMes.checkResult = true
        }else if(item.start>4&&item.start<=8){
            if(allMes.myMonsterGround.length>=1){
                allMes.checkResult = true
            }
        }else if(item.start>8&&item.start<=12){
            if(allMes.myMonsterGround.length>=2){
                allMes.checkResult = true
            }
        }
        // console.log(allMes.checkResult)
        return allMes
    }
}