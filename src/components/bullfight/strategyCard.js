let strategyCard = [
    //金属性能力 -速度
    {name:"金准一击",type:"",attribute:"金",
        dec:"我方本回合攻击不可闪避",
        condition:"aaa",
    },
    {name:"锐利",type:"",attribute:"金",
        dec:"本回合对方防御力减半",
        condition:"aaabb"
    },
    {
        name:"金碧辉煌",type:"",attribute:"金",
        dec:"本回合双方怪兽攻击不可闪避",
        condition:"aa"
    },

    //木属性能力 -回血
    {name:"再生",type:"",attribute:"木",
        dec:"小幅恢复生命值",
        condition:"aaa"
    },
    {name:"吸收",type:"",attribute:"木",
        dec:"本回合对方造成伤害变为增加我方生命值",
        condition:"aaabb"
    },
    {name:"年轮",type:"",attribute:"木",
        dec:"为自身回复一定血量，手卡越多回复越多,每一张会2%",
        condition:"aa"
    },

    //水属性能力 -刷牌
    {name:"源源不绝",type:"",attribute:"水",
        dec:"摸两张",
        condition:"aaa"
    },
    {name:"断源",type:"",attribute:"水",
        dec:"丢弃我方所有手卡，每有两张，弃置对方一张策略卡",
        condition:"aaabb"
    },
    {name:"涌泉",type:"",attribute:"水",
        dec:"展示牌堆最上面的卡，如果不是水属性，则加入手卡并重复此流程，直到展示的卡为水属性或展示了5张卡,对方抽取同样数量的卡",
        condition:"aa"
    },

    //火属性能力 -攻击
    {name:"灼烧",type:"",attribute:"火",
        dec:"攻击时额外造成10%最大生命值伤害",
        condition:"aaa"
    },
    {name:"火烧连营",type:"",attribute:"火",
        dec:"本回合双方收到伤害翻倍",
        condition:"aaabb"
    },
    {name:"熔岩",type:"",attribute:"火",
        dec:"为敌方造成3回合易损和重伤baff",
        condition:"aa"
    },

    //土属性能力 -防御
    {name:"城墙",type:"",attribute:"土",
        dec:"本回合中幅提高防御",
        condition:"aaa"
    },
    {name:"王车易位",type:"",attribute:"土",
        dec:"本回合我方怪兽攻击的时候，攻击力和防御力互换",
        condition:"aaabb"
    },
    {name:"敲山震虎",type:"",attribute:"土",
        dec:"本回合对方攻击的时候，攻击力和防御力互换",
        condition:"aa"
    },

]
export default {
    getOneStrategy(){
        //从所有的测量卡中随机拿一张返回
        let result = strategyCard
        result = result.sort(()=>{
            return (0.5-Math.random())
        })//二次打乱
        return result[0]
    },
    checkStrategy(list,condition){
        console.log(list,condition)
        if(condition === "aa"){
            let res = false
            let numList=[]
            list.forEach(item=>{
                let add = true
                numList.forEach(num=>{
                    if(item.num===num){
                        add = false
                    }
                })
                if(add){
                    numList.push(item.num)
                }
            })
            //把所有类型收集一遍
            numList.forEach(item=>{
                let num = 0
                list.forEach(listItem=>{
                    if(item === listItem.num){
                        num++
                    }
                })
                if(num>=2){
                    res = true
                }//如果出现两个或以上的相同数字
            })
            return res
        }//aa的处理
        if(condition === "aaa"){
            let res = false
            let numList=[]
            list.forEach(item=>{
                let add = true
                numList.forEach(num=>{
                    if(item.num===num){
                        add = false
                    }
                })
                if(add){
                    numList.push(item.num)
                }
            })
            //把所有类型收集一遍
            numList.forEach(item=>{
                let num = 0
                list.forEach(listItem=>{
                    if(item === listItem.num){
                        num++
                    }
                })
                if(num>=3){
                    res = true
                }//如果出现两个或以上的相同数字
            })
            return res
        }//aaa的处理
        if(condition === "aaabb"){
            let res = false
            let con = false
            let aaa = ""
            let numList=[]
            list.forEach(item=>{
                let add = true
                numList.forEach(num=>{
                    if(item.num===num){
                        add = false
                    }
                })
                if(add){
                    numList.push(item.num)
                }
            })
            //把所有类型收集一遍
            numList.forEach(item=>{
                let num = 0
                list.forEach(listItem=>{
                    if(item === listItem.num){
                        num++
                    }
                })
                if(num>=3){
                    con = true
                    aaa = item
                    //记录aaa的名称
                }//如果出现三个或以上的相同数字
            })
            if(con){
                numList.forEach(item=>{
                    let num = 0
                    list.forEach(listItem=>{
                        if(item === listItem.num&&aaa!==item){
                            num++
                        }
                    })
                    if(num>=2){
                        res = true
                    }//如果出现两个或以上的相同数字
                })
            }
            return res
        }//aaabb的处理
    },
    getRequiredCardsForStrategy(list,strategy){
        let condition = this.getConditionByName(strategy)
        let allNumList = []
        list.forEach(item=>{
            if(allNumList.some(num=>num["realNum"]===item.realNum)){
                allNumList.map(numItem=>{
                    if(numItem.realNum === item.realNum){
                        numItem.howmany++
                    }
                })
            }else{
                allNumList.push({
                    ...item,
                    howmany:1
                })
            }
        })
        console.log(allNumList)
        //得到所有牌的点数和数量
    },
    getConditionByName(name){
        let res = ""
        this.strategyCard.forEach(item=>{
            if(item.name === name){
                res = item.condition
            }
        })
        return res
    }
}