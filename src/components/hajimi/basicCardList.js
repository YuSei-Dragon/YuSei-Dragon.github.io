//公用卡池

let basicCardList = [
    //四张基本卡
    {
        id: "001",
        name: '桃',
        desc:"为当前我方精灵回复少量生命值",
        //根据少量/大量/巨额 恢复10%/20%/30%最大生命值 * (100/双抗)
        type:"basic",
        scene:"active",
        speed:1,
        cost: 0,
        num:10,
    },
    {
        id: "002",
        name: "酒",
        desc:"本回合我方精灵攻击力/特殊攻击力增加20",
        type:"basic",
        scene:"active",
        speed:1,
        cost: 0,
        num:10,
    },
    {
        id: "003",
        name: "闪",
        desc:"本回合我方精灵不受伤害,这张卡只能在对方回合发动",
        type:"basic",
        scene:"passive",
        speed:3,
        cost: 0,
        num:10,
    },
    {
        id: "004",
        name:"兴奋剂",
        desc:"本回合精灵速度提升至99",
        type:"basic",
        scene:"active",
        speed:2,
        cost: 1,
        num:10,
    },
    //14张策略卡

    {
        id: "005",
        name:"落井下石",
        desc:"对方精灵发动技能时可以发动，使此次技能消耗的气+1",
        type:"strategy",
        scene:"passive",
        speed:2,
        cost: 1,
        num:6,
    },
    {
        id:"006",
        name: "兵粮寸断",
        desc:"为对方玩家点亮兵粮寸断印记。兵粮寸断印记被点亮的玩家将在自己回合开始进行判定，如果为策略卡则本回合回合开始只回复1气",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 1,
        num:4,
    },
    {
        id:"007",
        name:"如法炮制",
        desc:"视为使用本回合当前最后使用的一张基本卡效果发动",
        type:"strategy",
        scene:"active",
        speed:2,
        cost: 1,
        num:4,
    },
    {
        id:"008",
        name:"党同伐异",
        desc:"对方展示一张手卡，我方展示所有同类型手卡并全部弃置，然后随机弃置同样数量对方不同类型的手卡",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 1,
        num:4,
    },
    {
        id:"009",
        name:"各怀鬼胎",
        desc:"双方各展示一张手卡，如果类型相同，我方获得这两张卡，并随机弃置对方一张卡。如果类型不同，则对方获得。",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 0,
        num:4,
    },
    {
        id:"010",
        name:"洞若观火",
        desc:"无效一张策略卡的发动",
        type:"strategy",
        scene:"passive",
        speed:3,
        cost: 1,
        num:3,
    },
    {
        id:"011",
        name:"整编",
        desc:"从牌堆中摸两张卡加入手卡，然后弃置一张手卡",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 0,
        num:8,
    },
    {
        id:"012",
        name:"观星",
        desc:"查看牌堆最上面三张卡，把一张加入手卡，剩余两张可放回牌堆顶部或者底部",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 1,
        num:5,
    },
    {
        id:"013",
        name:"凝神运气",
        desc:"弃置一张手卡才能发动，回复1气，如果自己此时手卡为0，则回复2气",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 0,
        num:4,
    },
    {
        id:"014",
        name:"得寸进尺",
        desc:"猜测牌堆顶部的卡，如果猜对了就加入手卡，直接猜错为止，猜错后抽一张卡。",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 2,
        num:4,
    },
    {
        id:"015",
        name:"重整旗鼓",
        desc:"从弃牌堆中获取一张基本卡。",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 0,
        num:4,
    },
    {
        id:"016",
        name:"等价交换",
        desc:"双方战术区都有卡的时候才能发动，选中对方战术区一张卡和我方战术区一张卡，那两张卡位置互换。",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 2,
        num:2,
    },
    {
        id:"017",
        name:"黑魔法",
        desc:"选取弃牌堆一张满足发动条件的策略卡，将其发动，随后随机弃置发动需要气数量的手卡。",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 1,
        num:2,
    },
    {
        id:"018",
        name:"破釜沉舟",
        desc:"消耗不超过当前气数量的气，摸同样数量的卡，随后进入3回合虚弱状态",
        type:"strategy",
        scene:"active",
        speed:1,
        cost: 0,
        num:2,
    }
]//卡池
export default {
    getAllCardList(){
        let list = []
        basicCardList.forEach(item => {
            for(let i = 0;i<item.num;i++){
                list.push({
                    ...item,
                })
            }
        })
        list = list.sort(()=>{
            return (0.5-Math.random())
        })//二次打乱
        return list
    },
    getTestAllCardList(){
        let card =  {
            id: "001",
            name: '桃',
            desc:"为当前我方精灵回复少量生命值",
            //根据少量/大量/巨额 恢复10%/20%/30%最大生命值 * (100/双抗)
            type:"basic",
            scene:"active",
            speed:1,
            cost: 0,
            num:10,
        }//桃
        let card1 = 
        {
            id: "003",
            name: "闪",
            desc:"本回合我方精灵不受伤害,这张卡只能在对方回合发动",
            type:"basic",
            scene:"passive",
            speed:3,
            cost: 0,
            num:10,
        }//闪
        let list = []
        for(let i = 0;i<40;i++){
            list.push({
                ...card,
            })
            list.push({
                ...card1,
            })
        }
        return list
    },//全是桃和闪的测试卡池
    drawCard(allMes,type,num){
        let list = allMes.cardList
        let listNew = []
        //当前卡池
        list.forEach((item,index)=>{
            if(index<num){
                allMes[type].handCardList.push(item)
            }else{
                listNew.push(item)
            }
        })//把卡加入手卡
        allMes.cardList = listNew
        //刷新卡池
        return allMes
    },
    getMesByCardName(name){
        let res
        basicCardList.forEach(item=>{
            if(name === item.name){
                res = item
            }
        })
        return res
    },
    getTestUsedCardList(){
        let cards = [
            {
                name:"落井下石",
                desc:"对方精灵发动技能时可以发动，使此次技能消耗的气+1",
                type:"strategy",
                scene:"active",
                speed:2,
                cost: 1,
                num:6,
            },
            {
                name:"落井下石",
                desc:"对方精灵发动技能时可以发动，使此次技能消耗的气+1",
                type:"strategy",
                scene:"active",
                speed:2,
                cost: 1,
                num:6,
            },
            {
                name:"落井下石",
                desc:"对方精灵发动技能时可以发动，使此次技能消耗的气+1",
                type:"strategy",
                scene:"active",
                speed:2,
                cost: 1,
                num:6,
            },
        ]
        cards.map(item=>{
            item.prepare = false
            //是否覆盖超过一回合
        })
        return 
    },
    isCard(name){
        let res = false
        basicCardList.forEach(item=>{
            if(name === item.name){
                res = true
            }
        })
        return res
    },//确认是不是卡
    useCard(allMes,name,user){
        return allMes
    },//使用卡方法
}