//技能合集
import chainSkill20 from './chainSkill20.js'
export default {
    getSkillByName(name){
        //等级1~20级的技能
        if( chainSkill20.getSkillByName(name)!==""){
            return chainSkill20.getSkillByName(name)
        }
        console.log("未找到技能"+name)
    },
    

}