export default {
    getSomething(sb){
        return sb
    },
    meCanUse(card){
        //在我方回合可以直接使用的牌
        let result = true
        if(card.name=="闪"){
            result = false
        }else if(card.name=="无懈可击"){
            result = false
        }
        return result
    },
    meCanUseWithoutChoice(card){
        //不需要选取目标的牌
        let result = false
        if(card.name=="闪"){
            result = true
        }else if(card.name=="桃"){
            result = true
        }else if(card.name=="南蛮入侵"){
            result = true
        }else if(card.name=="万箭齐发"){
            result = true
        }else if(card.name=="酒"){
            result = true
        }else if(card.name=="无懈可击"){
            result = true
        }else if(card.name=="桃园结义"){
            result = true
        }else if(card.name=="五谷丰登"){
            result = true
        }
        return result
    }
}