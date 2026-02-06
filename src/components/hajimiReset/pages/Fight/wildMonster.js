let allPlanetMesList = [
    {
        name:"赛尔号",
        position:{
            x:500,
            y:300,
        }
    },
    {
        name:"三国",
        position:{
            x:600,
            y:400,
        }
    },
    {
        name:"LOL",
        position:{
            x:400,
            y:400,
        }
    },
]
export default {
    getWildMonster(data){
        // console.log(data)
        return {
            name : data.name,
            level : data.level,
            monsterList:[data]
        }
    },
    getAllPlanetMes(){
        return allPlanetMesList
    },
}