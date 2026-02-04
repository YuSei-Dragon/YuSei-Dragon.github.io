let monsterList = [
    {
        name:"应激の哈基米",
        level:1,
        monsterList:[
            {
                "name": "应激の哈基米",
                "race": {
                    "atk": 100,
                    "def": 100,
                    "atkMagic": 100,
                    "defMagic": 100,
                    "life": 100,
                    "speed": 180
                },//种族值
                "individual": {
                    "atk": 50,
                    "atkMagic": 50,
                    "def": 50,
                    "defMagic": 50,
                    "life": 50,
                    "speed": 50
                },//个体值
                "potentiality": {
                    "atk": 9,
                    "def": 0,
                    "atkMagic": 0,
                    "defMagic": 0,
                    "life": 0,
                    "speed": 0
                },//潜力值
                "attribute": "土",
                "level": 10,
                "skillList": [
                    "老吴",
                    "哈气",
                    "小白手套",
                    "圆头形态"
                ]
            },
            {
                "name": "应激の哈基米",
                "race": {
                    "atk": 100,
                    "def": 100,
                    "atkMagic": 100,
                    "defMagic": 100,
                    "life": 100,
                    "speed": 180
                },//种族值
                "individual": {
                    "atk": 50,
                    "atkMagic": 50,
                    "def": 50,
                    "defMagic": 50,
                    "life": 50,
                    "speed": 50
                },//个体值
                "potentiality": {
                    "atk": 9,
                    "def": 0,
                    "atkMagic": 0,
                    "defMagic": 0,
                    "life": 0,
                    "speed": 0
                },//潜力值
                "attribute": "土",
                "level": 10,
                "skillList": [
                    "老吴",
                    "哈气",
                    "小白手套",
                    "圆头形态"
                ]
            },
        ]
    },
    {
        name:"齐齐哈尔",
        level:2,
        monsterList:[
            {
                "name": "应激の哈基米",
                "race": {
                    "atk": 100,
                    "def": 100,
                    "atkMagic": 100,
                    "defMagic": 100,
                    "life": 100,
                    "speed": 180
                },//种族值
                "individual": {
                    "atk": 50,
                    "atkMagic": 50,
                    "def": 50,
                    "defMagic": 50,
                    "life": 50,
                    "speed": 50
                },//个体值
                "potentiality": {
                    "atk": 9,
                    "def": 0,
                    "atkMagic": 0,
                    "defMagic": 0,
                    "life": 0,
                    "speed": 0
                },//潜力值
                "attribute": "土",
                "level": 10,
                "skillList": [
                    "老吴",
                    "哈气",
                    "小白手套",
                    "圆头形态"
                ]
            },
            {
                "name": "冷静の哈基米",
                "race": {
                    "atk": 100,
                    "def": 100,
                    "atkMagic": 100,
                    "defMagic": 100,
                    "life": 100,
                    "speed": 180
                },//种族值
                "individual": {
                    "atk": 60,
                    "atkMagic": 60,
                    "def": 60,
                    "defMagic": 60,
                    "life": 60,
                    "speed": 60
                },//个体值
                "potentiality": {
                    "atk": 9,
                    "def": 0,
                    "atkMagic": 0,
                    "defMagic": 0,
                    "life": 0,
                    "speed": 0
                },//潜力值
                "attribute": "火",
                "level": 10,
                "skillList": [
                    "老吴",
                    "哈气",
                    "小白手套",
                    "圆头形态"
                ]
            },
        ]
    }
]
import skillApi from "./skillList.js"
export default {
    getMonsterMesByLevel(level){
        return {
            ...monsterList[level-1],
            isWild:false,
            probability:0,
        }
    },
    getMonster(){
        return monsterList
    },
    getMonsterFightList(list){
        let fightList = []
        console.log(list)
        list.forEach(monster=>{
            // console.log(monster)
            fightList.push({
                ...this.getMonsterFightMes(monster),
                onGround:false,
                isDead:false,
                status:"standBy",
            })
        })
        return fightList
    },//处理精灵上场属性
    getMonsterFightMes(data){
        return {
            //race individual potentiality
            name:data.name,
            attribute:data.attribute,
            level:data.level,
            experience:data.experience,
            skillList:data.skillList,
            atk:data.race.atk + data.individual.atk + data.potentiality.atk,
            atkMagic:data.race.atkMagic + data.individual.atkMagic + data.potentiality.atkMagic,
            def:data.race.def + data.individual.def + data.potentiality.def,
            defMagic:data.race.defMagic + data.individual.defMagic + data.potentiality.defMagic,
            life:data.race.life + data.individual.life + data.potentiality.life,
            speed:data.race.speed + data.individual.speed + data.potentiality.speed,
            haveUseSkill:false,
            isWild:data.isWild||false,
            probability:data.probability||0,
            lock:0,
            hurtValue:0,
            hurtTurn:0,
            healValue:0,
            healTurn:0,
            stable:0,
            clean:0,
            protect:0,
            magnification:0,
            delay:[],
        }//战斗属性
    },//处理精灵战斗属性
    getRandomMonster(){
        return {
            //race individual potentiality
            name: "名字" + Math.floor(Math.random()*1000000),
            attribute:"属性" + Math.floor(Math.random()*4),
            level:Math.floor(Math.random())+10,
            skillList:["技能1","技能2","技能3","技能4"],
            atk:Math.floor(Math.random()*100),
            atkMagic:Math.floor(Math.random()*100),
            def:Math.floor(Math.random()*100),
            defMagic:Math.floor(Math.random()*100),
            life:200,
            // nowLife:Math.floor(Math.random()*200),
            nowLife:150,
            speed:Math.floor(Math.random()*100),
        }//战斗属性
    },//获取手上精灵信息
    callMonster(who="botMes",index,allMes,store){
        if(index < 0 || index >= allMes.fightMes[who].monsterList.length){
            store.commit("hajimiReset/setTipList",["请先选择召唤的精灵"])
            return allMes
        }
        if(allMes.fightMes[who].monsterList[index].isDead===true){
            store.commit("hajimiReset/setTipList",["该精灵已战败"])
            return allMes
        }
        if(who === "botMes"){
            if(allMes.fightMes.botMes.power < 2){
                store.commit("hajimiReset/setTipList",["bot灵力不足"])
                return allMes
            }
            allMes.fightMes.botMes.monsterList[index].onGround = true
            allMes.fightMes.botMes.monsterList[index].nowLife = allMes.fightMes.botMes.monsterList[index].life
            allMes.fightMes.botMes.power -= 2
        }else{
            if(allMes.fightMes.myMes.power < 2){
                store.commit("hajimiReset/setTipList",["灵力不足"])
                return allMes
            }
            allMes.fightMes.myMes.monsterList[index].onGround = true
            allMes.fightMes.myMes.monsterList[index].nowLife = allMes.fightMes.myMes.monsterList[index].life
            allMes.fightMes.myMes.power -= 2
        }
        allMes.fightMes[who].monsterList[index].atkLv = 0
        allMes.fightMes[who].monsterList[index].defLv = 0
        allMes.fightMes[who].monsterList[index].atkMagicLv = 0
        allMes.fightMes[who].monsterList[index].defMagicLv = 0
        allMes.fightMes[who].monsterList[index].speedLv = 0

        return allMes
    },//召唤精灵方法
    endTrun(allMes,store){
        allMes.fightMes.myMes.monsterList.map(monster=>{
            if(monster.lock>0){
                monster.lock--
            }//处理封印回合数
            if(monster.clean>0){
                monster.clean--
            }//处理无视能力降低效果回合数
            if(monster.stable>0){
                monster.stable--
            }//处理稳定（必中）回合数
            if(monster.magnification>0){
                monster.magnification--
            }//处理伤害翻倍回合数
            if(monster.delay.length>0){
                monster.delay.map(item=>{
                    if(item.turn>0){
                        item.turn--
                        if(item.turn <=0){
                            monster[item.type] += this.preventExceed(item.value,5,-5)
                        }
                    }
                })
            }//处理延迟效果
            if(monster.hurtTurn>0){
                monster.hurtTurn--
                monster.nowLife -= monster.hurtValue
                if(monster.nowLife<=0){
                    monster.nowLife = 0
                    store.commit("hajimiReset/setTipList",[monster.name + "倒下了！"])
                    monster.onGround = false
                    monster.isDead = true
                    if(!skillApi.haveMoreMonster(allMes.fightMes.myMes.monsterList)) {
                        // 所有精灵都死亡了
                        store.commit("hajimiReset/setTipList",["游戏结束"])
                        allMes.fightMes.result = "lose"
                    }
                }
            }
            if(monster.healTurn>0){
                monster.healTurn--
                monster.nowLife += monster.healValue
                if(monster.nowLife>monster.life){
                    monster.nowLife = monster.life
                }
            }
        })//处理封印状态
        allMes.fightMes.botMes.monsterList.map(monster=>{
            if(monster.hurtTurn>0){
                monster.hurtTurn--
                monster.nowLife -= monster.hurtValue
                if(monster.nowLife<=0){
                    monster.nowLife = 0
                    store.commit("hajimiReset/setTipList",[monster.name + "倒下了！"])
                    monster.onGround = false
                    monster.isDead = true
                    if(!skillApi.haveMoreMonster(allMes.fightMes.botMes.monsterList)) {
                        // 所有精灵都死亡了
                        store.commit("hajimiReset/setTipList",["游戏结束"])
                        allMes.fightMes.result = "win"
                    }
                }
            }
            if(monster.healTurn>0){
                monster.healTurn--
                monster.nowLife += monster.healValue
                if(monster.nowLife>monster.life){
                    monster.nowLife = monster.life
                }
            }
        })//处理封印状态
        allMes.fightMes.whosTurn = "bot"
        store.commit("hajimiReset/setTipList",["我的回合结束"])
        return allMes
    },//结束回合方法
    gameStart(allMes,store){
        // allMes.fightMes.whosTurn = "my"
        // store.commit("hajimiReset/setTipList",["我的回合开始"])
        allMes.fightMes.whosTurn = "bot"
        store.commit("hajimiReset/setTipList",["对方回合开始"])
        return this.botTurn(allMes,store)
    },//开始游戏
    async botTurn(allMes,store){
        allMes.fightMes.whosTurn = "bot"
        if(allMes.fightMes.turn>1){
            allMes.fightMes.botMes.power+=2
        }
        if(allMes.fightMes.turn>=11){
            allMes.fightMes.botMes.power++
        }//回合数超过10 灵力恢复速度+1
        if(allMes.fightMes.botMes.power > 8){
            allMes.fightMes.botMes.power = 8
        }
        allMes.fightMes.turn++
        allMes.fightMes.botMes.monsterList.forEach(monster=>{
            monster.haveUseSkill = false
        })//重置场上精灵使用技能权限
        allMes.fightMes.botMes.monsterList.map(monster=>{
            monster.status = "standBy"
        })//重置场上精灵动画
        //重置动画
        //开始操作
        await this.waitToDo(2000,async()=>{
            allMes = await this.botMove(allMes,store)
        })
        //结束回合
        await this.waitToDo(2000,()=>{
            allMes.fightMes.botMes.monsterList.map(monster=>{
                if(monster.lock>0){
                    monster.lock--
                }//处理封印回合数
                if(monster.stable>0){
                    monster.stable--
                }//处理稳定（必中）回合数
                if(monster.magnification>0){
                    monster.magnification--
                }//处理伤害翻倍回合数
                if(monster.clean>0){
                    monster.clean--
                }//处理无视能力降低效果回合数
                if(monster.delay.length>0){
                    monster.delay.map(item=>{
                        if(item.turn>0){
                            item.turn--
                            if(item.turn <=0){
                                monster[item.type] += this.preventExceed(item.value,5,-5)
                            }
                        }
                    })
                }//处理延迟效果
                if(monster.hurtTurn>0){
                    monster.hurtTurn--
                    monster.nowLife -= monster.hurtValue
                    if(monster.nowLife<=0){
                        monster.nowLife = 0
                        store.commit("hajimiReset/setTipList",[monster.name + "倒下了！"])
                        monster.onGround = false
                        monster.isDead = true
                        if(!skillApi.haveMoreMonster(allMes.fightMes.botMes.monsterList)) {
                            // 所有精灵都死亡了
                            store.commit("hajimiReset/setTipList",["游戏结束"])
                            allMes.fightMes.result = "win"
                        }
                    }
                }
                if(monster.healTurn>0){
                    monster.healTurn--
                    monster.nowLife += monster.healValue
                    if(monster.nowLife>monster.life){
                        monster.nowLife = monster.life
                    }
                }
            })//处理封印状态
            allMes.fightMes.myMes.monsterList.map(monster=>{
                if(monster.hurtTurn>0){
                    monster.hurtTurn--
                    monster.nowLife -= monster.hurtValue
                    if(monster.nowLife<=0){
                        monster.nowLife = 0
                        store.commit("hajimiReset/setTipList",[monster.name + "倒下了！"])
                        monster.onGround = false
                        monster.isDead = true
                        if(!skillApi.haveMoreMonster(allMes.fightMes.myMes.monsterList)) {
                            // 所有精灵都死亡了
                            store.commit("hajimiReset/setTipList",["游戏结束"])
                            allMes.fightMes.result = "lose"
                        }
                    }
                }
                if(monster.healTurn>0){
                    monster.healTurn--
                    monster.nowLife += monster.healValue
                    if(monster.nowLife>monster.life){
                        monster.nowLife = monster.life
                    }
                }
            })//处理封印状态
            store.commit("hajimiReset/setTipList",["我的回合开始"])
            allMes = this.myTurn(allMes,store)
        })
        return allMes
    },//bot回合
    async botMove(allMes,store){
        //bot的灵力使用优先级
        //场上有精灵>精灵出招>场上有多只精灵
        //如果场上精灵已经出招，就会尝试再召唤一只
        let monsterOnGroundList = []
        allMes.fightMes.botMes.monsterList.forEach((monster,index)=>{
            if(monster.onGround&&!monster.haveUseSkill){
                monsterOnGroundList.push({
                    data:monster,
                    index:index})
            }
        })//获取场上没有开过技能的精灵
        //优先让等级高的精灵使用技能
        monsterOnGroundList.sort((a,b)=>{
            return b.data.level - a.data.level
        })//按等级从高到低排序
        //让所有场上的精灵都尝试开技能
        for(const monsterOne of monsterOnGroundList) {
            if(allMes.fightMes.botMes.power <= 0) {
                break // 灵力不足，停止行动
            }
            let monster = monsterOne.data
            if(monster.lock>0){
                //如果精灵被封印，就不可以使用技能
                continue
            }
            monster.groundIndex = monsterOne.index
            if(monster.skillList.length>0){
                //随机使用当前等级学会了的技能
                //爬塔挑战的都是4个固定技能，野生的是全技能(包括boss)
                let skillList = []
                monster.skillList.forEach((skill=>{
                    let skillMes = skillApi.getSkillDetailByName(skill)

                    if(skillMes.cost<=allMes.fightMes.botMes.power){
                        skillList.push(skillMes)
                        //获取详细的技能信息
                    }//检查有没有足够的灵力开技能
                }))
                let useSkill = {
                    max:0,
                    name:""
                }
                //优先攻击血量最低的
                let aimMonsterIndex = null
                let minLife = 9999
                allMes.fightMes.myMes.monsterList.filter((monster,index)=>{
                    if(monster.onGround===true){
                        if(monster.nowLife<minLife){
                            minLife = monster.nowLife
                            aimMonsterIndex = index
                        }//找出血量最少的
                    }
                })//获取目标精灵
                let skillIndex
                if(aimMonsterIndex === null){
                    //如果场上没有精灵，直接对玩家使用招数
                    let canUseSkillList = []
                    skillList.forEach((skill=>{
                        if(skill.aim==="single"){
                            if(skill.type==="atk"||skill.type==="atkMagic"){
                                if(skill.type==="atk"&&skill.atk>useSkill.max){
                                    useSkill.max = skill.atk
                                    useSkill.name = skill.name
                                }else if(skill.type==="atkMagic"&&skill.atkMagic>useSkill.max){
                                    useSkill.max = skill.atkMagic
                                    useSkill.name = skill.name
                                }
                            }//找出攻击力最高的招式
                        }else{
                            canUseSkillList.push(skill)
                        }
                    }))
                    skillList.forEach((skill=>{
                        if(skill.name===useSkill.name){
                            canUseSkillList.push(skill)
                        }
                    }))
                    skillList = canUseSkillList
                    skillIndex = Math.floor(Math.random()*skillList.length)
                    //随机出一招
                }else{
                   skillIndex = Math.floor(Math.random()*monster.skillList.length)
                   //如果有精灵，随便出一招
                }
                useSkill = skillList[skillIndex]
                console.log(useSkill,skillList,monster.skillList)
                
                allMes = skillApi.useSkill(useSkill.name,"myMes",monster,aimMonsterIndex,allMes,store)
                monster.haveUseSkill = true
                //记录精灵已经使用了技能
                await this.waitToDo(2000)
                // 等待2秒再处理下一个精灵
            }
        }//让所有场上的精灵都尝试开技能
        // console.log("处理场上精灵发动技能完毕",allMes)
        if(allMes.fightMes.botMes.power>=2){
            //如果还有剩余的灵力，再召唤一只
            console.log("bot有多的灵力，尝试再召唤一只",allMes)
            let monsterList = []
            allMes.fightMes.botMes.monsterList.forEach((monster,index)=>{
                if(monster.onGround===false&&!monster.isDead){
                    monsterList.push({
                        data:monster,
                        index:index})
                }
            })//获取未上场的精灵和他的定位index
            //随机召唤一只
            if(monsterList.length>0){
                let randomIndex = Math.floor(Math.random()*monsterList.length)
                let randomMonster = monsterList[randomIndex]
                //获取到随机召唤的精灵和他的定位index
                console.log("bot召唤一只",randomMonster.data.name)
                this.callMonster("botMes",randomMonster.index,allMes,store)
                //召唤精灵
            }else{
                console.log("bot没有未上场的精灵可以召唤")
            }
        }
        return allMes
    },//bot的出招逻辑
    async myTurn(allMes,store){
        allMes.fightMes.whosTurn = "my"
        if(allMes.fightMes.turn>1){
            allMes.fightMes.myMes.power+=2
        }
        if(allMes.fightMes.turn>=11){
            allMes.fightMes.myMes.power++
        }//回合数超过10 灵力恢复速度+1
        if(allMes.fightMes.myMes.power > 8){
            allMes.fightMes.myMes.power = 8
        }
        allMes.fightMes.turn++
        allMes.fightMes.myMes.monsterList.forEach(monster=>{
            monster.haveUseSkill = false
        })//重置场上精灵使用技能权限
        allMes.fightMes.myMes.monsterList.map(monster=>{
            monster.status = "standBy"
        })//重置场上精灵动画
        //结束回合
        return allMes
    },//我的回合
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
    preventExceed(num,max,min){
        if(num>max){
            return max
        }
        if(num<min){
            return min
        }
        return num
    },//限制最大最小值，自动回调
}