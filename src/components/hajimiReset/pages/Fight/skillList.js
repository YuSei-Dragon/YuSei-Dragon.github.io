let skillList = [
    {
        name:"老吴",
        type:"effect",
        effect:{
            my:[{"type":"atk","value":1,}],
            bot:[]
        },
        aim:"self",
        cost: 1,
        text:"小幅提升自己物理攻击",
        attribute:"普通",
    },
    {
        name:"哈气",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"def","value":-1,}]
        },
        aim:"single",
        cost: 1,
        text:"小幅降低对方物理防御",
        attribute:"普通",
    },
    {
        name:"小白手套",
        type:"atk",
        atk:"20",
        aim:"single",
        cost: 1,
        text:"使用小白手套对对方进行致命攻击",
        attribute:"普通",
    },
    {
        name:"圆头形态",
        type:"effect",
        effect:{
            my:[{"type":"def","value":2,}],
            bot:[]
        },
        aim:"self",
        text:"大幅提升自己物理防御",
        cost: 1,
        attribute:"普通",
    },
    {
        name:"摇尾巴",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"speed","value":-2,}]
        },
        aim:"single",
        text:"迷惑对手，大幅降低对手速度",
        cost: 1,
        attribute:"普通",
    },
    {
        name:"撕咬",
        type:"atk",
        atk:"25",
        aim:"single",
        cost: 1,
        text:"使用牙齿对对手进行攻击",
        attribute:"普通",
    },
    {
        name:"低吼",
        type:"effect",
        effect:{
            my:[],
            bot:[{"type":"atk","value":-1,}]
        },
        aim:"single",
        text:"震慑对手，小幅降低对手攻击",
        cost: 1,
        attribute:"普通",
    },
    {
        name:"犬吠",
        type:"effect",
        effect:{
            my:[{"type":"atk","value":1,}],
            bot:[]
        },
        aim:"self",
        text:"大声吼叫，小幅提升自己攻击",
        cost: 1,
        attribute:"普通",
    },
    {
        name:"哈基汪大旋风",
        type:"atk",
        atk:"45",
        effect:{
            my:[{"type":"atk","value":1,}],
            bot:[]
        },
        aim:"single",
        cost: 2,
        text:"用牙齿控制住对手后进行甩动，是哈基汪的绝招,每次命中小幅增加自身攻击力",
        attribute:"普通",
    },
    {
        name:"大狗大狗嚼嚼嚼",
        type:"atk",
        atk:"90",
        aim:"single",
        cost: 2,
        text:"用骇人的尖牙攻击敌方的要害，是大狗嚼的绝招",
        attribute:"普通",
    },
]
//aim
//self 自己
//single 单个目标
//aoe 全体目标
//aoe技能无法对玩家进行攻击

//一般来说 
//1~50 攻击力技能 cost 1
//50~100 攻击力技能 cost 2
//100~150 攻击力技能 cost 3

//atk 物理攻击
//atkMagic 魔法攻击
//effect 效果
//效果加成 小幅1 大幅2 巨幅3
//最高加成等级5 最低消弱等级5
//2/2 
// 加成 分子+1
// 消弱 分母+1
import saierSkill from "../Skill/saierSkill.js"
import threeKingdomsSkill from "../Skill/threeKingdomsSkill.js"

export default {
    getSkillDetailByName(name){
        // console.log(name)
        let allSkillList = []
        allSkillList = [
            ...skillList,
            ...saierSkill.getSaierSkillList(),
            ...threeKingdomsSkill.getThreeKingdomsSkillList()
        ]
        // console.log(allSkillList)
        return allSkillList.find(skill=>skill.name===name)||
        {
            name:"未知",
            type:"未知",
            cost: 0,
            text:"这是未知的技能，所以无法使用",
            attribute:"普通",
        }
    },
    getSkillSituation(toWho="botMes",name,allMes){
        //此处toWho不是释放者而是目标
        const skill = this.getSkillDetailByName(name)
        let situation = []
        const selfEffect = toWho==="botMes"?"myMes":"botMes"
        if(skill.type==="team"){
            allMes.fightMes[selfEffect].monsterList.forEach((monster,index)=>{
                if(monster.onGround===true){
                    situation.push({
                        data:monster
                        ,index
                    })
                }
            })
        }else{
            allMes.fightMes[toWho].monsterList.forEach((monster,index)=>{
                if(monster.onGround===true){
                    situation.push({
                        data:monster
                        ,index
                    })
                }
            })
        }
        return situation
    },//获取技能释放对象
    checkNeedChoice(name){
        let skill = this.getSkillDetailByName(name)
        return skill.aim==="single"
    },//检查技能是否需要选择目标
    async useSkill(name,toWho="botMes",user, targetIndex=null,allMes,store){
        //此处toWho不是释放者而是目标
        let selfEffect = ""
        if(toWho==="botMes"){
            selfEffect = "myMes"
        }else{
            selfEffect = "botMes"
        }
        if(user.haveUseSkill===true){
            // 已使用技能
            store.commit("hajimiReset/setTipList",[user.name + "本回合已使用技能"])
            allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "haveUsed"
            //展示动画
            return allMes
        }
        if(user.lock>0){
            // 已被锁定
            store.commit("hajimiReset/setTipList",[user.name + "处于封印状态"])
            allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "lock"
            //展示动画
            return allMes
        }
        let skill = this.getSkillDetailByName(name)
        console.log("执行技能",skill.name,skill.type)
        if(toWho==="botMes"){
            // 对机器人进行处理
            if(allMes.fightMes.myMes.power<skill.cost){
                // 灵力不足
                console.log("灵力不足")
                store.commit("hajimiReset/setTipList",["灵力不足"])
                allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "haveUsed"
                return allMes
            }else{
                // 消耗灵力
                allMes.fightMes.myMes.power -= skill.cost
            }
        }else if(toWho==="myMes"){
            // 对玩家进行处理
            if(allMes.fightMes.botMes.power<skill.cost){
                // 灵力不足
                console.log("灵力不足")
                store.commit("hajimiReset/setTipList",["灵力不足"])
                allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "haveUsed"
                return allMes
            }else{
                // 消耗灵力
                allMes.fightMes.botMes.power -= skill.cost
            }
        }//灵力测试是否足够
        console.log("消耗灵力",skill.cost)
        if(skill.aim==="aoe"){
            //aoe技能处理
        }else if(skill.aim==="single"){
            if(targetIndex===null){
                // 没有目标精灵，直接对玩家使用技能
                if(skill.type==="atk"||skill.type==="atkMagic"){
                    let damage
                    if(skill.type==="atk"){
                        damage = Number(Number(this.calculateLv(user.atk,user.atkLv))+Number(skill.atk))
                    }else{
                        damage = Number(Number(this.calculateLv(user.atkMagic,user.atkMagicLv))+Number(skill.atkMagic))
                    }
                    if(allMes.fightMes.ground===skill.attribute&&skill.attribute!=="普通"){
                        // 地面类型匹配
                        damage = Number(damage*1.5.toFixed(0))
                    }//如果使用的招数和当前场地属性相同，则伤害增加50%
                    allMes.fightMes[toWho].life -= damage
                    console.log("玩家受到伤害",damage)
                    if(allMes.fightMes[toWho].life<=0){
                        // 玩家死亡
                        allMes.fightMes[toWho].life = 0
                        store.commit("hajimiReset/setTipList",["游戏结束"])
                        allMes.fightMes.result = toWho==="myMes"?"lose":"win"
                    }
                    return allMes
                }else{
                    store.commit("hajimiReset/setTipList",["此技能不能直接对玩家使用！"])
                    console.log("此技能不能直接对玩家使用！")
                    return allMes
                }
            }
            if(skill.type!=="team"&&allMes.fightMes[toWho].monsterList[targetIndex].protect>0){
                //如果目标有保护，就减少保护值 对team类型技能不做处理
                allMes.fightMes[toWho].monsterList[targetIndex].protect = 0
            }else{
                if(skill.type==="atk"||skill.type==="atkMagic"){
                    // console.log("进行伤害处理")
                    if(skill.type==="atk"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "atk"
                    }else{
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "atkMagic"
                    }
                    //攻击动画
                    for(let index=0;index<allMes.fightMes[toWho].monsterList.length;index++){
                        let item = allMes.fightMes[toWho].monsterList[index]
                        if(index===targetIndex){
                            // 找到场上的精灵
                            //处理闪避概率
                            //直接攻击玩家不会触发这里的精灵影响效果
                            console.log("攻击index:",targetIndex)
                            let atkSpeed = this.calculateLv(user.speed,user.speedLv)
                            let defSpeed = this.calculateLv(item.speed,item.speedLv)
                            let result = this.getSpeedResult(atkSpeed,defSpeed,user)
                            if(result===true){
                                // 闪避成功
                                store.commit("hajimiReset/setTipList",["闪避成功"])
                                console.log(item.name + "闪避" + user.name+"成功")
                                allMes.fightMes[toWho].monsterList[targetIndex].status = "miss"
                                return allMes
                            }else{
                                let lifeChange = this.lifeChange(user,item,skill)
                                console.log("最终结算伤害",lifeChange)
                                if(allMes.fightMes.ground===item.ground&&item.ground!=="普通"){
                                    // 地面类型匹配
                                    lifeChange = Number(lifeChange*1.5.toFixed(0))
                                }//如果使用的招数和当前场地属性相同，则伤害增加50%
                                item.nowLife += lifeChange
                                if(item.atkAdd?.more){
                                    // 多攻击
                                    let atkNum = Math.round(Math.random()*(item.atkAdd.more.max-item.atkAdd.more.min)+item.atkAdd.more.min)
                                    console.log("多攻击次数",atkNum)
                                    for(let i=0;i<atkNum;i++){
                                        item.nowLife += lifeChange
                                    }
                                }//随机多次攻击处理
                                if(skill.atkAdd?.halfDouble){
                                    // 伤害加倍
                                    if(item.nowLife<item.life/2){
                                        item.nowLife += lifeChange
                                    }
                                }
                                if(skill.name === "同生共死"&&item.nowLife>user.nowLife){
                                    // 同生共死
                                    item.nowLife = user.nowLife
                                }
                                if(skill?.atkAdd&&skill.atkAdd?.rebound){
                                    allMes.fightMes[selfEffect].monsterList[user.groundIndex].nowLife += Number((lifeChange*skill.atkAdd.rebound/100).toFixed(0))
                                }//处理反弹伤害
                                if(Array.isArray(skill.atkAdd?.addList)&&skill.atkAdd?.addList.length>0){
                                    let num = 0
                                    skill.atkAdd.addList.forEach((addItem)=>{
                                        if(item[addItem]&&item[addItem]>user[addItem]){
                                            // 对方能力值超过自身
                                            num++
                                        }//得到有几项能力值超过自身
                                        item.nowLife += lifeChange * 0.3 * num
                                    })
                                }//处理对方能力高伤害加成
                                if(skill.atkAdd?.absorb){
                                    // 吸取伤害
                                    allMes.fightMes[selfEffect].monsterList[user.groundIndex].nowLife -= Number((lifeChange*skill.atkAdd.absorb/100).toFixed(0))
                                }//处理吸取伤害恢复生命
                                if(skill.atkAdd?.myLoss){
                                    allMes.fightMes[selfEffect].monsterList[user.groundIndex].nowLife -= (user.life-user.nowLife)*skill.atkAdd.myLoss/100
                                }//处理自身已损生命值的百分比伤害返还
                                if(skill.atkAdd?.incomplete){
                                    // 根据自身残血程度增加伤害
                                    let incomplete = allMes.fightMes[selfEffect].monsterList[user.groundIndex].nowLife/allMes.fightMes[selfEffect].monsterList[user.groundIndex].life
                                    item.nowLife += Math.round(lifeChange*(1-incomplete))
                                }
                                //处理生命值变化
                                if(item.nowLife<=0){
                                    if(skill.name==="手下留情"){
                                        item.nowLife = 1
                                    }else{
                                        // store.commit("hajimiReset/setTipList",[item.name + "倒下了！"])
                                        await this.waitToDo(1000,() => {
                                            item.nowLife = 0
                                            item.onGround = false
                                            item.isDead = true
                                            console.log(item.name + "似了喵")
                                            if(!this.haveMoreMonster(allMes.fightMes[toWho].monsterList)) {
                                                // 所有精灵都死亡了
                                                console.log("游戏结束")
                                                store.commit("hajimiReset/setTipList",["游戏结束"])
                                                allMes.fightMes.result = toWho==="myMes"?"lose":"win"
                                            }
                                        })
                                    }
                                    return allMes
                                }
                                // 执行技能
                                if(skill?.effect){
                                    //如果存在额外效果
                                    if(skill.effect.bot.length>0){
                                        skill.effect.bot.forEach((effectItem)=>{
                                            if(((effectItem.type==="atk")||(effectItem.type==="def")||(effectItem.type==="speed")||
                                                (effectItem.type==="atkMagic")||(effectItem.type==="defMagic"))&&(item.clean>0&&effectItem.value<0)){
                                                //如果处于clean状态，直接跳过能力降低的效果
                                            }else{
                                                if(effectItem.type==="atk"){
                                                    item.atkLv += effectItem.value
                                                }
                                                if(effectItem.type==="atkMagic"){
                                                    item.atkMagicLv += effectItem.value
                                                }
                                                if(effectItem.type==="def"){
                                                    item.defLv += effectItem.value
                                                }
                                                if(effectItem.type==="defMagic"){
                                                    item.defMagicLv += effectItem.value
                                                }
                                                if(effectItem.type==="speed"){
                                                    item.speedLv += effectItem.value
                                                }
                                                if(effectItem.type==="lock"&&item.lock===0){
                                                    //处于封印状态不可再次被封印
                                                    if(Math.random()<effectItem.percent/100){
                                                        item.lock += effectItem.value
                                                    }//处理封印概率
                                                }
                                            }
                                        })
                                        // 限制等级
                                        item.atkLv = this.preventExceed(item.atkLv,5,-5)
                                        item.atkMagicLv = this.preventExceed(item.atkMagicLv,5,-5)
                                        item.defLv = this.preventExceed(item.defLv,5,-5)
                                        item.defMagicLv = this.preventExceed(item.defMagicLv,5,-5)
                                        item.speedLv = this.preventExceed(item.speedLv,5,-5)
                                    }//处理对对方的额外效果
                                    if(skill.effect.my.length>0){
                                        //处理对自己使用的技能
                                        skill.effect.my.forEach(effectItem=>{
                                            if(effectItem.type==="atk"){
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv += effectItem.value
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv,5,-5)
                                            }
                                            if(effectItem.type==="def"){
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv += effectItem.value
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv,5,-5)
                                            }
                                            if(effectItem.type==="atkMagic"){
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv += effectItem.value
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv,5,-5)
                                            }
                                            if(effectItem.type==="defMagic"){
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv += effectItem.value
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv,5,-5)
                                            }
                                            if(effectItem.type==="speed"){
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv += effectItem.value
                                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv,5,-5)
                                            }
                                            if(effectItem.type==="lock"&&item.lock===0){
                                                //处于封印状态不可再次被封印
                                                if(Math.random()<effectItem.percent/100){
                                                    item.lock += effectItem.value
                                                }//处理封印概率
                                            }
                                        })
                                    }//处理对自己的额外效果
                                }
                            }
                        }//forEach/map无法正确的处理await
                    }
                }
                if(skill.type==="effect"){
                    //处理效果技能
                    // console.log("进行效果处理")
                    allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "effect"
                    //对对方造成效果动画
                    allMes.fightMes[toWho].monsterList.map((item,index)=>{
                        if(index===targetIndex){
                            // 找到场上的精灵
                            let randow = Math.random()
                            // console.log("找到要处理的精灵",item,skill.effect.bot)
                            skill.effect.bot.forEach((effectItem)=>{
                                if(effectItem?.percent&&randow<effectItem.percent/100){
                                    return
                                }//如果在这里出现了概率，而且没有触发，就直接跳过单次循环
                                if(effectItem.type==="atk"){
                                    item.atkLv += effectItem.value
                                    item.atkLv = this.preventExceed(item.atkLv,5,-5)
                                }
                                if(effectItem.type==="atkMagic"){
                                    item.atkMagicLv += effectItem.value
                                    item.atkMagicLv = this.preventExceed(item.atkMagicLv,5,-5)
                                }
                                if(effectItem.type==="def"){
                                    item.defLv += effectItem.value
                                    item.defLv = this.preventExceed(item.defLv,5,-5)
                                }
                                if(effectItem.type==="defMagic"){
                                    item.defMagicLv += effectItem.value
                                    item.defMagicLv = this.preventExceed(item.defMagicLv,5,-5)
                                }
                                if(effectItem.type==="speed"){
                                    item.speedLv += effectItem.value
                                    item.speedLv = this.preventExceed(item.speedLv,5,-5)
                                }
                                if(effectItem.type==="lock"&&item.lock===0){
                                    //处于封印状态不可再次被封印
                                    item.lock += effectItem.value//处理封印
                                }
                                if(effectItem.type==="absorb"){
                                    //处理吸收类技能
                                    if(effectItem.valueType==="percent"){
                                        let lifeValue = Math.floor(item.life  * Number(effectItem.value) / 100)
                                        item.hurtValue = lifeValue
                                        item.hurtTurn = effectItem.turn
                                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].healValue = lifeValue
                                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].healTurn = effectItem.turn
                                    }
                                }
                                if(effectItem.type==="hurt"){
                                    //处理持续伤害类技能
                                    if(effectItem.valueType==="percent"){
                                        let lifeValue = Math.floor(item.life  * Number(effectItem.value) / 100)
                                        item.hurtValue = lifeValue
                                        item.hurtTurn = effectItem.turn
                                    }
                                }
                                if(effectItem.type==="atkReturn"){
                                    //强制让对方攻击并全额返还伤害
                                    item.nowLife += this.lifeChange(user,item,{
                                        name:"伤害返还",
                                        attribute:"伤害返还",
                                        type:"atk",
                                        atk: item.atk
                                        //被强制发起攻击的攻击力越高，返还的伤害也越高
                                    })
                                }
                                if(effectItem.type==="cleanUp"){
                                    //处理清空对方能力提升效果
                                    if(item.atkLv>0){
                                        item.atkLv = 0
                                    }
                                    if(item.atkMagicLv>0){
                                        item.atkMagicLv = 0
                                    }
                                    if(item.defLv>0){
                                        item.defLv = 0
                                    }
                                    if(item.defMagicLv>0){
                                        item.defMagicLv = 0
                                    }
                                    if(item.speedLv>0){
                                        item.speedLv = 0
                                    }
                                }
                                if(effectItem.type==="delay"){
                                    effectItem.list.forEach(one=>{
                                        item.delay.push(one)
                                    })
                                }//处理延迟效果
                            })
                            randow = Math.random()
                            let mySelf = allMes.fightMes[selfEffect].monsterList[user.groundIndex]
                            skill.effect.my.forEach(effectItem=>{
                                if(effectItem?.percent&&randow<effectItem.percent/100){
                                    return
                                }//如果在这里出现了概率，而且没有触发，就直接跳过单次循环
                                if(effectItem.type==="atk"){
                                    mySelf.atkLv += effectItem.value
                                    mySelf.atkLv = this.preventExceed(mySelf.atkLv,5,-5)
                                }
                                if(effectItem.type==="atkMagic"){
                                    mySelf.atkMagicLv += effectItem.value
                                    mySelf.atkMagicLv = this.preventExceed(mySelf.atkMagicLv,5,-5)
                                }
                                if(effectItem.type==="def"){
                                    mySelf.defLv += effectItem.value
                                    mySelf.defLv = this.preventExceed(mySelf.defLv,5,-5)
                                }
                                if(effectItem.type==="defMagic"){
                                    mySelf.defMagicLv += effectItem.value
                                    mySelf.defMagicLv = this.preventExceed(mySelf.defMagicLv,5,-5)
                                }
                                if(effectItem.type==="speed"){
                                    mySelf.speedLv += effectItem.value
                                    mySelf.speedLv = this.preventExceed(mySelf.speedLv,5,-5)
                                }
                                if(effectItem.type==="lock"&&mySelf.lock===0){
                                    //处于封印状态不可再次被封印
                                    mySelf.lock += effectItem.value//处理封印
                                }
                                if(effectItem.type==="hurt"){
                                    //处理持续伤害类技能
                                    if(effectItem.valueType==="percent"){
                                        let lifeValue = mySelf.life  * Number(effectItem.value) / 100
                                        mySelf.hurtValue = lifeValue
                                        mySelf.hurtTurn = effectItem.turn
                                    }
                                }
                                if(effectItem.type==="cleanUp"){
                                    //处理清空对方能力提升效果
                                    if(mySelf.atkLv>0){
                                        mySelf.atkLv = 0
                                    }
                                    if(mySelf.atkMagicLv>0){
                                        mySelf.atkMagicLv = 0
                                    }
                                    if(mySelf.defLv>0){
                                        mySelf.defLv = 0
                                    }
                                    if(mySelf.defMagicLv>0){
                                        mySelf.defMagicLv = 0
                                    }
                                    if(mySelf.speedLv>0){
                                        mySelf.speedLv = 0
                                    }
                                }
                                if(effectItem.type==="delay"){
                                    effectItem.list.forEach(one=>{
                                        mySelf.delay.push(one)
                                    })
                                }//处理延迟效果
                            })
                            allMes.fightMes[selfEffect].monsterList[user.groundIndex] = mySelf
                            //把处理完的结果赋值回去

                            // 执行技能
                            if(item.nowLife<=0){
                                item.nowLife = 0
                                item.onGround = false
                                item.isDead = true
                                console.log(item.name + "似了喵")
                                store.commit("hajimiReset/setTipList",[item.name + "倒下了！"])
                                if(!this.haveMoreMonster(allMes.fightMes[toWho].monsterList)) {
                                    // 所有精灵都死亡了
                                    store.commit("hajimiReset/setTipList",["游戏结束"])
                                    allMes.fightMes.result = toWho==="myMes"?"lose":"win"
                                }
                            }
                        }
                    })
                }
                if(skill.type==="team"){
                    //处理团队技能
                    skill.effect.forEach(item=>{
                        if(item.type==="protect"){
                            allMes.fightMes[selfEffect].monsterList[targetIndex].protect = item.num
                        }//保护罩不能叠加
                        if(item.type==="cure"){
                            //处理治疗类技能
                            let selectOne = allMes.fightMes[selfEffect].monsterList[targetIndex]
                            let lifeValue = Math.round(item.percent * selectOne.life / 100)
                            selectOne.nowLife += lifeValue
                            allMes.fightMes[selfEffect].monsterList[targetIndex].nowLife = this.preventExceed(selectOne.nowLife,selectOne.life,0)
                        }//友方治疗效果
                    })
                } 
            }
            
        }else if(skill.aim==="self"){
            //处理对自己使用的技能
            allMes.fightMes[selfEffect].monsterList[user.groundIndex].status = "atkUp"
            skill.effect.my.forEach(item=>{
                if(((item.type==="atk")||(item.type==="def")||(item.type==="speed")||
                    (item.type==="atkMagic")||(item.type==="defMagic"))&&(item.clean>0&&item.value<0)){
                    //如果处于clean状态，直接跳过能力降低的效果
                }else{
                    if(item.type==="atk"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv += item.value
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv,5,-5)
                    }
                    if(item.type==="def"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv += item.value
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv,5,-5)
                    }
                    if(item.type==="atkMagic"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv += item.value
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv,5,-5)
                    }
                    if(item.type==="defMagic"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv += item.value
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv,5,-5)
                    }
                    if(item.type==="speed"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv += item.value
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv = this.preventExceed(allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv,5,-5)
                    }
                    if(item.type==="lock"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].lock += item.value
                    }//处理封印状态
                    if(item.type==="stable"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].stable += item.value
                    }//处理稳定状态(必中效果)
                    if(item.type==="magnification"){
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].magnification += item.turn
                    }//处理稳定状态(必中效果)
                    if(item.type==="heal"){
                        let lifeValue = item.value
                        if(item.valueType==="percent"){
                            lifeValue = item.value * item.life / 100
                        }
                        item.healValue = lifeValue
                        item.healTurn = item.turn
                    }//处理回复生命值
                    if(item.type==="clean"){
                        if(allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv<0){
                            allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv = 0
                        }
                        if(allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv<0){
                            allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv = 0
                        }
                        if(allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv<0){
                            allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv = 0
                        }
                        if(allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv<0){
                            allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv = 0
                        }
                        if(allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv<0){
                            allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv = 0
                        }
                        allMes.fightMes[selfEffect].monsterList[user.groundIndex].clean += item.turn
                    }//处理清空能力下降效果
                    if(item.type==="reverse"){
                        item.list.forEach(type=>{
                            if(type==="atk"){
                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkLv *= -1
                            }
                            if(type==="def"){
                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].defLv *= -1
                            }
                            if(type==="atkMagic"){
                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].atkMagicLv *= -1
                            }
                            if(type==="defMagic"){
                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].defMagicLv *= -1
                            }
                            if(type==="speed"){
                                allMes.fightMes[selfEffect].monsterList[user.groundIndex].speedLv *= -1
                            }
                        })
                    }//处理反转能力效果
                    if(item.type==="delay"){
                        item.list.forEach(one=>{
                            allMes.fightMes[selfEffect].monsterList[user.groundIndex].delay.push(one)
                        })
                    }//处理延迟效果
                }
                
            })//处理增益/削弱效果
        }
        allMes.fightMes[selfEffect].monsterList[user.groundIndex].haveUseSkill = true
        //标记已使用技能
        return allMes
    },//使用技能
    lifeChange(atk,def,skill){
        //攻击者，防守者，发动的技能
        let atkNum = this.calculateLv(atk.atk,atk.atkLv)
        let defNum = this.calculateLv(def.def,def.defLv)
        let atkMagicNum = this.calculateLv(atk.atkMagic,atk.atkMagicLv)
        let defMagicNum = this.calculateLv(def.defMagic,def.defMagicLv)
        let damage = 0
        console.log(atkNum,defNum)
        if(skill.type==="atk"){
            let skillValue = skill.atk
            if(skill?.atkAdd&&skill.atkAdd?.speedAdd){
                skillValue += skill.atkAdd.speedAdd * atk.speedLv
            }//处理速度加成
            damage = -(skillValue/2) * ( (100+(atkNum-defNum))/100)
            console.log(skillValue,damage)
        }
        if(skill.type==="atkMagic"){
            const skillValue = skill.atkMagic
            damage = -(skillValue/2) * ( (100+(atkMagicNum-defMagicNum))/100)
        }
        if(atk.attribute===skill.attribute){
            damage *= 1.5
        }//同属性伤害*1.5
        damage = this.calculateAttribute(atk,def,damage)
        if(skill.attribute === def.attribute&&skill.attribute!=="普通"){
            console.log("同属性伤害减半")
            damage *= 0.5
        }//同属性招式伤害减半
        if(atk?.magnification&&atk.magnification>0){
            damage *= 2
        }//翻倍伤害结算
        damage = damage/3
        //平衡最终伤害和生命值之间的数值
        console.log(atk.name,atk,def.name,def,skill.name,Number(damage.toFixed(0)))
        return Number(damage.toFixed(0))
    },//伤害计算
    calculateAttribute(atk,def,damage){
        // 处理属性克制
        //木->土->水->火->金->木
        console.log(atk.attribute,def.attribute)
        let upList = [
            {atk:"木",def:"土"},{atk:"土",def:"水"},
            {atk:"水",def:"火"},{atk:"火",def:"金"},
            {atk:"金",def:"木"}]
        let downList = upList.map(item=>{
            return {atk:item.def,def:item.atk}
        })
        let attributeRes = 1
        upList.forEach(item=>{
            if(item.atk===atk.attribute && item.def===def.attribute){
                attributeRes *= 2
            }
        })//克制双倍伤害
        downList.forEach(item=>{
            if(item.atk===atk.attribute && item.def===def.attribute){
                attributeRes *= 0.5
            }
        })//被克制伤害减半
        damage *= attributeRes
        return damage
    },//属性克制处理
    calculateLv( num,lv){
        if(lv>0){
            return num* ((2+lv)/2)
        }
        return num* (2/(2-lv))
    },//增益/削弱等级处理
    preventExceed(num,max,min){
        if(num>max){
            return max
        }
        if(num<min){
            return min
        }
        return num
    },//限制最大最小值，自动回调
    getSpeedResult(atkSpeed,defSpeed,user){
        if(user?.atkAdd&&user.atkAdd?.surelyHit){
            if(user.atkAdd.surelyHit===true){
                return false
            }//必中效果
        }
        if(user?.stable){
            if(user.stable>0){
                return false
            }//稳定必中
        }
        // 速度值越大，越难以闪避
        if(atkSpeed>defSpeed){
            return false
        }else{
            let speed = atkSpeed/defSpeed
            console.log(speed)
            let randow = Math.random()
            return randow>=speed
        }
    },//速度值对比
    haveMoreMonster(monsterList){
        let haveMore = false
        monsterList.forEach(monster=>{
            console.log(monster)
            if(monster.isDead!==true){
                haveMore = true
            }
        })
        return haveMore
    },//检查还有没有能上场的精灵
    getSkillList(name,level){
        let allSkillList = [
            ...saierSkill.getSkillList(),
            ...threeKingdomsSkill.getSkillList(),
        ]
        let skillList = []
        allSkillList.forEach(skill=>{
            if(skill.name===name){
                skill.skillList.forEach(item=>{
                    if(item.level<=level){
                        skillList.push(item.name)
                    }
                })
            }
        })
        return skillList
    },//根据名字和等级获取技能列表
    getAllSkillList(name){
        let allSkillList = [
            ...saierSkill.getSkillList(),
            ...threeKingdomsSkill.getSkillList(),
        ]
        let skillList = []
        allSkillList.forEach(skill=>{
            if(skill.name===name){
                skillList = skill.skillList
            }
        })
        return skillList
    },//不限等级全部获取信息
    getAllSkillListNew(name){
        let allSkillList = [
            ...saierSkill.getSkillList(),
            ...threeKingdomsSkill.getSkillList(),
        ]
        let skillList = {}
        allSkillList.forEach(skill=>{
            if(skill.name===name){
                skillList = skill
            }
        })
        return skillList
    },//不限等级全部获取信息
    getSkillListByLv(name,level){
        let allSkillList = [
            ...saierSkill.getSkillList(),
            ...threeKingdomsSkill.getSkillList(),
        ]
        let skillList = []
        allSkillList.forEach(skill=>{
            if(skill.name===name){
                skill.skillList.forEach(item=>{
                    if(item.level===level){
                        // console.log(skill,name,level)
                        skillList.push(item.name)
                    }
                })
            }
        })
        return skillList
    },//根据名字和具体某一等级获取技能列表
    getLogicUseSkillByName(skillList,monster,allMes,store,router){
        let allSkillMes = this.getAllSkillListNew(monster.name)
        if(allSkillMes?.logic&&allSkillMes.logic.length>0){
            return allSkillMes.logic(allMes,skillList)
        }else{
            return Math.floor(Math.random()*skillList.length)
        }
    },
    async waitToDo(time,fun){
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time);
        })
        if (typeof fun === 'function') {
            return await fun();
        }
    },//等待执行完成
}