export default {
    getWildMonster(data){
        // console.log(data)
        return {
            name : data.name,
            level : data.level,
            monsterList:[data]
        }
    },
}