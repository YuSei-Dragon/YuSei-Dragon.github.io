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
    }
}