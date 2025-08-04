const skillList = [
    //公用技能
    {name:"冲撞",dec:"对对方造成50点伤害",cost:5,num:20,damage:30,type:"attribute",aim:"other",},
    {name:"鼓舞",dec:"提高自身10点攻击力",cost:5,num:5,myAtk:20,type:"attribute",aim:"self",},
    {name:"恐吓",dec:"提高自身10点防御和特殊防御，并降低对方10点移动速度",myDef:10,myDefS:10,botSpeed:-20,cost:5,num:5,type:"attribute",aim:"both",},
    //专属技能

    //艾露猫
    {name:"老大别怕，猫车来了", dec:"消耗自身一半生命值，将我方一只怪兽血量恢复到一半，并替换上场，并为他＋10速度",cost:10,num:2,only:"艾露猫",type:"special",aim:"self",},
    //诺手/诺克萨斯之手
    {name:"血怒", damage:50, dec:"每次发动这个技能，自身血怒层数+1，每一层血怒，最高五层，五层后获得额外伤害",cost:5,num:10,only:"诺克萨斯之手",type:"special",aim:"both",},

    //狗头/沙漠死神
    {name:"汲魂痛击",dec:"每次发动这个技能，将会恢复少量血量，并为自身增加50层汲魂痛击层数",cure:"少量",cost:5,num:20,only:"沙漠死神",type:"special",aim:"self",},
    {name:"枯萎",dec:"降低对方50点移动速度",cost:10,num:5,only:"沙漠死神",botSpeed:-50,type:"attribute",aim:"other",},
    {name:"灵魂烈焰",dec:"对对方造成50点特殊伤害，并降低25物抗和特抗",cost:10,num:5,only:"沙漠死神", damageS:50,botDef:-25,botDefS:-25,type:"attribute",aim:"other",},
    {name:"死神降临",dec:"对对方造成汲魂痛击层数伤害",cost:30,num:5,only:"沙漠死神",type:"special",aim:"other",specialAtk:true},
    
]
const plies = {
    jihuntongjiPlies:0,
    xuenuPlies:0,
}
export default {
    getSkillDetailMes(monster){
        let res = {}
        skillList.forEach(item=>{
            if(item.name === monster){
                res = item
            }
        })
        return res
    },
    getPlies(){
        return plies
    },
    getPliesName(name){
        if(name==="jihuntongjiPlies"){
            return "汲魂痛击层数"
        }
        if(name==="xuenuPlies"){
            return "血怒层数"
        }
    }
}