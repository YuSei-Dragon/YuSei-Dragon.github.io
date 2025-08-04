export default {
    totalJudge(monster){
        //怪兽的整体评级,取最高的六维中的四维
        //S  90~100
        //A  80~90
        //B  70~80
        //C  60~70
        //N  <60
        let list = []
        for(let i in monster){
            if(i!=='name'){
                list.push(monster[i])
            }//除了名字以外都可以计算
        }
        list.sort((a, b) => b - a)
        // console.log(list)
        let score = list[0] + list[1] + list[2] + list[3]
        score = Number(score/4).toFixed(2)
        if(score>=90){
            return "S"
        }else if(score<90&&score>=80){
            return "A"
        }else if(score<80&&score>=70){
            return "B"
        }else if(score<70&&score>=60){
            return "C"
        }else{
            return "N"
        }
    },
    attributeJudge(monster){
        if(monster.attribute === "金"){
            return require("./img/jin.png")
        }else if(monster.attribute === "木"){
            return require("./img/mu.png")
        }else if(monster.attribute === "水"){
            return require("./img/shui.png")
        }else if(monster.attribute === "火"){
            return require("./img/huo.png")
        }else if(monster.attribute === "土"){
            return require("./img/tu.png")
        }else{
            console.log("未知属性")
        }
    },
}