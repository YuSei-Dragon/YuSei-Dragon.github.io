export default{
    async waitToDo(howLong,method){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            method()
            resolve(howLong)
        },howLong)
        })
    }//同步化
}