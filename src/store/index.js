import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    mountains: []
  },
  getters: {
    // getter functions go here
  },
  mutations: {
    updateMountains(state, data) {
      console.log('Mutations::updateMountains - state:', state);
      console.log('Mutations::updateMountains - data:', data);

      state.mountains = data
    }
  },
  modules: {
    // custom modules go here
  },
  strict: debug,
})
