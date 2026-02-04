export default {
  namespaced: true, // 开启命名空间[citation:7]
  state: () => ({
    tipList:[],
    allMes:{}
  }),
  mutations: {
    setTipList(state, newTipList) {
      state.tipList = newTipList;
    },
    setAllMes(state, newAllMes) {
      state.allMes = newAllMes;
    }
  },
  actions: {
    updateTipList({ commit }, tipList) {
      commit('setTipList', tipList);
    },
    updateAllMes({ commit }, allMes) {
      commit('setAllMes', allMes);
    }
  },
  getters: {
    tipList: (state) => state.tipList,
    allMes: (state) => state.allMes
  }
};