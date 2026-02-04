import saier from "./saier.js"
export default{
    getGroundByName(name){
        let ground = ""
        if(saier.getGroundByName(name)){
            ground = saier.getGroundByName(name)
        }
        return ground
    },//根据名称获取地面类型
    getGroundList(name){
        if(name==="赛尔号"){
            return[
                {
                    label: "克洛斯星",
                    value: "克洛斯星",
                    sceneList:[
                        {
                            label: "克洛斯星-草原",
                            value: "saier_Klaus_grassland",
                        },
                        {
                            label: "克洛斯星-沼泽",
                            value: "saier_Klaus_swamp",
                        },
                        {
                            label: "克洛斯星-林间",
                            value: "saier_Klaus_woodland",
                        },
                        {
                            label: "克洛斯星-地心",
                            value: "saier_Klaus_earthcore",
                        },
                    ]
                },
            ]
        }
        return []
    },//获取地面类型列表
    getWildMonsterMesByName(name){
        let result = {}
        if(saier.getWildMonsterMesByName(name)){
            result = saier.getWildMonsterMesByName(name)
        }
        return result
    },//根据名称获取野外怪物信息
} 