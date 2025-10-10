export default {
    getPokeCardList(){
        const numList = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
        const typeList = ['diamond','club','heart','spades']
        let result = []
        typeList.forEach(type=>{
            numList.forEach(num=>{
                result.push(
                    {
                        num:num,
                        realNum:this.getRealNum(num),
                        type:type,
                    }
                )
            })
        })
        result = result.sort(()=>{
            return (0.5-Math.random())
        })//二次打乱
        return result
    },
    getRealNum(num){
        if(num === 'A'){
            return '1'
        }
        if(num === 'J'){
            return '11'
        }
        if(num === 'Q'){
            return '12'
        }
        if(num === 'K'){
            return '13'
        }
        return num
    },
    getBotTest(){
        return [
            {
                num:'A',
                realNum:'1',
                type:'diamond',
            },
            {
                num:'A',
                realNum:'1',
                type:'club',
            },
            {
                num:'A',
                realNum:'1',
                type:'heart',
            },
            {
                num:'A',
                realNum:'1',
                type:'spades',
            },
            {
                num:'2',
                realNum:'2',
                type:'diamond',
            },
            {
                num:'2',
                realNum:'2',
                type:'club',
            },
            {
                num:'2',
                realNum:'2',
                type:'heart',
            },
            {
                num:'2',
                realNum:'2',
                type:'spades',
            },
        ]
    },
    getMyTest(){
        return [
            {
                num:'A',
                realNum:'1',
                type:'diamond',
            },
            {
                num:'A',
                realNum:'1',
                type:'club',
            },
            {
                num:'A',
                realNum:'1',
                type:'heart',
            },
            {
                num:'A',
                realNum:'1',
                type:'spades',
            },
            {
                num:'2',
                realNum:'2',
                type:'diamond',
            },
            {
                num:'2',
                realNum:'2',
                type:'club',
            },
            {
                num:'2',
                realNum:'2',
                type:'heart',
            },
            {
                num:'2',
                realNum:'2',
                type:'spades',
            },
            {
                num:'3',
                realNum:'3',
                type:'diamond',
            },
            {
                num:'3',
                realNum:'3',
                type:'club',
            },
            {
                num:'3',
                realNum:'3',
                type:'heart',
            },
            {
                num:'3',
                realNum:'3',
                type:'spades',
            },
            {
                num:'4',
                realNum:'4',
                type:'diamond',
            },
            {
                num:'4',
                realNum:'4',
                type:'club',
            },
            {
                num:'4',
                realNum:'4',
                type:'heart',
            },
            {
                num:'4',
                realNum:'4',
                type:'spades',
            },
        ]
    },
    getTypeName(name){
        if(name === "heart"){
            return "红桃"
        }
        if(name === "diamond"){
            return "钻石"
        }
        if(name === "club"){
            return "梅花"
        }
        if(name === "spades"){
            return "黑桃"
        }
    }
}