//精灵的种族值存放
let monsterRaceList = [
    {
        name:"小哈基汪",
        atk:300,
        atkMagic:100,
        def:300,
        defMagic:300,
        life:300,
        speed:500,
        all:1800
    },
    {
        name:"小沙包",
        atk:100,
        atkMagic:100,
        def:400,
        defMagic:400,
        life:300,
        speed:200,
        all:1500
    }
]
export default {
    getMonsterRaceByName(name,level){
        let res = monsterRaceList.find(item => item.name === name)
        // console.log(res)
        return {
            name:res.name,
            atk:res.atk * (level/100),
            atkMagic:res.atkMagic * (level/100),
            def:res.def * (level/100),
            defMagic:res.defMagic * (level/100),
            life:res.life * (level/100),
            speed:res.speed * (level/100),
            all:res.all * (level/100)
        }
    }
}