const getDefaultState = () => {
  return {
    curChoice: {
      type: '0',
      id: null
    },
    infoList: [],
    douyinList: [],
    doudianList: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_INFO_LIST(state, list) {
    state.infoList = list
  },
  SET_DOUYIN_LIST(state, list) {
    state.douyinList = list
  },
  SET_DOUDIAN_LIST(state, list) {
    state.doudianList = list
  },
  SET_CURCHOICETYPE(state, type) {
    state.curChoice.type = type
  },
  SET_CURCHOICEID(state, id) {
    state.curChoice.id = id
    console.log(state.curChoice)
  }
}

const actions = {
  setInfoList({ commit }, list) {
    commit('SET_INFO_LIST', list)
  },
  setDouyinList({ commit }, list) {
    commit('SET_DOUYIN_LIST', list)
  },
  setDoudianList({ commit }, list) {
    commit('SET_DOUDIAN_LIST', list)
  },
  setCurChoiceType({ commit }, type) {
    commit('SET_CURCHOICETYPE', type)
  },
  setCurChoiceId({ commit }, id) {
    commit('SET_CURCHOICEID', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
