import strategyCard from "../../strategyCard"

let newMonstersList = [
    {
        id:"001",
        name:"艾露猫",
        raceMes:{
            atk:30,
            atkMagic:30,
            def:30,
            defMagic:30,
            life:60,
            speed:70,
        },
        attribute:"金",
        desc:"豪猫的代表之一，虽然自身攻击和防御以及血量都不高，但是有着很高的速度和超高的战斗智商，让它能随着等级提升解锁各种武器强化自身。",
        evolution:[
            {
                name:"艾鲁猫",
                level:1,
            }
        ]
    },
    {
        id:"002",
        name:"胆小菇",
        raceMes:{
            atk:15,
            atkMagic:15,
            def:15,
            defMagic:30,
            life:80,
            speed:20,
        },
        attribute:"木",
        desc:"虽然看起来很弱小，但是生命力极其顽强，传说中能进化为威力惊人的毁灭菇",
        evolution:[
            {
                name:"胆小菇",
                level:1,
            },
            {
                name:"小喷菇",
                level:20,
            },
            {
                name:"大喷菇",
                level:50,
            },
            {
                name:"毁灭菇",
                level:80,
            },
        ]
    },
    {
        id:"003",
        name:"鲤鱼",
        raceMes:{
            atk:20,
            atkMagic:20,
            def:20,
            defMagic:20,
            life:50,
            speed:30,
        },
        attribute:"水",
        desc:"传说中鲤鱼王跃过龙门能进化为鱼龙王",
        evolution:[
            {
                name:"鲤鱼",
                level:1,
            },
            {
                name:"鲤鱼王",
                level:30,
            },
            {
                name:"鱼龙王",
                level:70,
            }
        ]
    },
    {
        id:"004",
        name:"小火猴",
        raceMes:{
            atk:40,
            atkMagic:20,
            def:20,
            defMagic:20,
            life:30,
            speed:50,
        },
        attribute:"火",
        desc:"小火猴在山里经常出没，常常因为控制不住自己的火焰导致每天都忙于救自己放的火。",
        evolution:[
            {
                name:"小火猴",
                level:1,
            },
            {
                name:"烈焰猴",
                level:30,
            },
            {
                name:"地狱火猴",
                level:70,
            },
        ]
    },
    {
        id:"005",
        name:"碎岩蛇",
        raceMes:{
            atk:30,
            atkMagic:20,
            def:40,
            defMagic:40,
            life:20,
            speed:50,
        },
        attribute:"土",
        desc:"碎岩蛇可以轻松用尾巴击碎石头，也能用坚硬的脑袋钻开一条路",
        evolution:[
            {
                name:"碎岩蛇",
                level:1,
            },
            {
                name:"碎岩蛇王",
                level:30,
            },
            {
                name:"裂地蛇",
                level:70,
            },
        ]

    }

]
export default {
    getNewList(){
        return newMonstersList
    },
    getRandomTalent(){
        let list = []
        for(let i=0;i<5;i++){
            const num = this.getRandomNum(Math.random())
            list.push(num)
        }
        return list
    },
    getRandomNum(num){
        if(num>0&&num<=0.2){
            return 1
        }
        if(num>0.2&&num<=0.4){
            return 2
        }
        if(num>0.4&&num<=0.6){
            return 3
        }
        if(num>0.6&&num<=0.8){
            return 4
        }
        if(num>0.8&&num<=1){
            return 5
        }
    },
    getRandomByName(name){
        let monster = {}
        newMonstersList.forEach(item=>{
            if(item.name == name){
                monster = item
            }
        })//得到怪物基础数据
        const talentList = this.getRandomTalent()
        //获取怪物随机刷新的天赋
        monster.talent = {
            atk:talentList[0],
            def:talentList[1],
            atkMagic:talentList[2],
            defMagic:talentList[3],
            life:talentList[4],
            speed:talentList[5],
        }

    },
    playNextLevelReward(playMes){
        if(playMes.playLevel===100){
            return playMes
        }//限制最高100级
        playMes.playExpNext+=20
        //每次升级需要的经验+20
        return playMes
    },//玩家升级奖励
    monsterNextLevelReward(level){
        
    },//怪兽升级奖励

    setNewPlayerMes(playerName,monsterName){
        const firstMonster = this.getRandomByName(monsterName)
        let monsterList = []
        monsterList.push(firstMonster)
        return {
            playName:playerName,
            //玩家名称
            playLevel:1,
            //玩家等级
            monsterList:monsterList,
            //拥有的怪兽
            strategyCardList:[],
            //拥有的策略卡
            playExp:0,
            //玩家当前拥有经验
            playExpNext:100,
            //玩家升级需要的经验
            

        }
    },//新建玩家的数据处理
}
