import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import account from './modules/account'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account,
    app,
    permission,
    settings,
    user,
  },
  getters
})

export default store
