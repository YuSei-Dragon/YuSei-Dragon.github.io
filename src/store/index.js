import {createStore} from "vuex";
const $store = createStore({
   //state可以看作是全局公共的数据，需要的组件可以调用
    state: {
        count: 0,
        usingList: [],
        botUsingList:[],
        myList:[],
        botLiveNumNow:20,
        myLiveNumNow:20,
        IisEnd:true,
        BotisEnd:true,
    },
    getters: {},
    //mutations可以看作是调用state的事件，在组件中可以通过commit方法调用和响应
    mutations: {
        increment(state, payload) {
            state.count = state.count + 1
            console.log('payload:' + payload)
        },
        changeUsingList(state,list){
            state.usingList = list
        },
        changeBotUsingList(state,list){
            state.botUsingList = list
        },
        setBotLive(state,num){
            state.botLiveNumNow = num
        },
        setMyLive(state,num){
            state.myLiveNumNow = num
        },
        IshouldEnd(state,is){
            state.IisEnd = is
        },
        BotshouldEnd(state,is){
            state.BotisEnd = is
        },
        setMyList(state,list){
            state.myList = list
        }
    },
    actions: {},
    modules: {}
})

export default $store;