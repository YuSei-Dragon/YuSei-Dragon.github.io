let skillList = [
    {
        name:"摇尾巴",
        type:"eft",
        desc:"哈基汪兴奋的时候会摇尾巴，大幅增加自己的速度",
        speedChange: 30,
        speed:2,
    },
    {
        name:"撕咬",
        type:"atk",
        desc:"哈基汪会用自己的爪子和牙齿攻击敌人，造成物理伤害",
        damage: 20,
        speed:2,
    },
    {
        name:"低吼",
        type:"eft",
        desc:"哈基汪会用自己的嘴咆哮，大幅增加自己的攻击力",
        atk: 2,
        speed:2,
    },
    {
        name:"哈基汪大旋风",
        type:"afk",
        desc:"哈基汪会用自己的牙齿咬住对方，进行大风车转转转",
        damage: 40,
        speed:2,
    },
    
]
//eft 不造成直接伤害的技能
//atk 直接造成物理伤害
//atkMagic 直接造成魔法伤害
export default {
    getSkillByName(name){
        let res = {}
        skillList.forEach(item=>{
            if(item.name==name){
                res = item
            }
        })
        return res
    },
    useCard(allMes,name,user){
        return allMes
    },//使用技能方法
}
