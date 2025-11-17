let skillList = [
    {
        name:"摇尾巴",
        type:"eft",
        desc:"小幅增加自己的速度",
        self:{
            speed:2,
        },
        other:{

        },
    },
    {
        name:"撕咬",
        type:"atk",
        desc:"造成物理伤害",
        self:{

        },
        other:{
            damage: 20,
        },
    },
    {
        name:"低吼",
        type:"eft",
        desc:"小幅增加自己的攻击力",
        self:{
            atk: 2,
        },
        other:{

        },
    },
    {
        name:"哈基汪大旋风",
        type:"afk",
        desc:"造成物理伤害",
        self:{

        },
        other:{
            damage: 40,
        },
    },
    {
        name:"变硬",
        type:"eft",
        desc:"小幅增加自己的防御力",
        self:{
            def: 2,
        },
        other:{

        },
    },
    {
        name:"流沙",
        type:"aft",
        desc:"对对方造成伤害并大幅降低速度",
        self:{

        },
        other:{
            damage: 10,
            speed: -2,
        },
    }
    
]
export default {
    //等级0~20级的技能

    getSkillByName(name){
        //等级1~20级的技能
        let res = {}
        skillList.forEach(item=>{
            if(item.name==name){
                res = item
            }
        })
        return res
    },
}