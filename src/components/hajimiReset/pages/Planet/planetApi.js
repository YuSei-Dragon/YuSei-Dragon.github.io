import planet from "./planet.js"
export default{
    getGroundByName(name){
        let ground = ""
        if(planet.getGroundByName(name)){
            ground = planet.getGroundByName(name)
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
        }else if(name==="三国"){
            return[
                {
                    label: "群雄并起",
                    value: "群雄并起",
                    sceneList:[
                        {
                            label: "苍天已死，黄天当立",
                            value: "threeKingdoms_taipingdao",
                        },
                        {
                            label: "桃园结义",
                            value: "threeKingdoms_taoyuanjieyi",
                        },
                        // {
                        //     label: "官渡之战",
                        //     value: "threeKingdoms_guandu",
                        // }
                    ]
                },
                // {
                //     label: "天下三分",
                //     value: "天下三分",
                //     sceneList:[
                //         {
                //             label: "赤壁之战",
                //             value: "threeKingdoms_chibi",
                //         }
                //     ]
                // },
            ]
        }
        return []
    },//获取地面类型列表
    getWildMonsterMesByName(name){
        let result = {}
        if(planet.getWildMonsterMesByName(name)){
            result = planet.getWildMonsterMesByName(name)
        }
        return result
    },//根据名称获取野外怪物信息
} 