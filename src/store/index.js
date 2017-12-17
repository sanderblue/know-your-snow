import Vue from 'vue'
import Vuex from 'vuex'
import * as moment from 'moment'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    startDate: '2017-10-01', // arbitrary default for now
    endDate: moment().format('YYYY-MM-DD'), // arbitrary default for now
    mountains: ['MtHoodMeadowsBase']
  },
  getters: {
    // getter functions go here
  },
  mutations: {
    updateMountains(state, data) {
      console.log('Mutations::updateMountains - state:', state);
      console.log('Mutations::updateMountains - data:', data);

      state.mountains = data
    },

    updateStartDate(state, data) {
      console.log('Mutations::updateStartDate - state:', state);
      console.log('Mutations::updateStartDate - data:', data);

      state.startDate = data
    },

    updateEndDate(state, data) {
      console.log('Mutations::updateEndDate - state:', state);
      console.log('Mutations::updateEndDate - data:', data);

      state.endDate = data
    }
  },
  modules: {
    // custom modules go here
  },
  strict: debug,
})
