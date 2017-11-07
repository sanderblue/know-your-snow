<template>
  <div id="app">
    <div class="row collapse expanded">
      <div class="small-3 medium-6 columns">
        <div class="app-title padding-left-1 padding-right-1">
          <div class="app-title-text margin-bottom-0">
            <i class="fa fa-snowflake-o" aria-hidden="true"></i>
            <span>Know Your Snow</span>
          </div>
        </div>
        <aside class="sidebar padding-2">
          <ul class="vertical menu">
            <li>
              <h5>Mountain</h5>
              <ul class="nested vertical menu padding-bottom-1">
                <li>
                  <input id="meadows" type="checkbox" value="MtHoodMeadowsBase" v-model="mountains">
                  <!-- <input id="meadows" type="checkbox" value="MtHoodMeadowsBase" @change="onChangeMountainSelection"> -->
                  <label for="meadows">Mt. Hood Meadows</label>
                </li>
                <li>
                  <input id="timberline" type="checkbox" value="TimberlineLodge" v-model="mountains">
                  <!-- <input id="skibowl" type="checkbox" value="TimberlineLodge" @change="onChangeMountainSelection"> -->
                  <label for="timberline">Mt. Hood Timberline</label>
                </li>
                <li>
                  <input id="skibowl" type="checkbox" value="SkiBowlSummit" v-model="mountains">
                  <!-- <input id="skibowl" type="checkbox" value="SkiBowlSummit" @change="onChangeMountainSelection"> -->
                  <label for="skibowl">Mt. Hood Ski Bowl</label>
                </li>
                <li>{{ mountains }}</li>
              </ul>
            </li>
            <li>
              <h5>Years</h5>
              <ul class="nested vertical menu padding-bottom-1">
                <li>
                  <input id="2017-2018" type="checkbox" value="2017-2018" v-model="years">
                  <label for="2017-2018">2017 - 2018</label>
                </li>
                <li>
                  <input id="2016-2017" type="checkbox" value="2016-2017" v-model="years">
                  <label for="2016-2017">2016 - 2017</label>
                </li>
                <li>
                  <input id="2015-2016" type="checkbox" value="2015-2016" v-model="years">
                  <label for="2015-2016">2015 - 2016</label>
                </li>
                <li>
                  <input id="2014-2015" type="checkbox" value="2014-2015" v-model="years">
                  <label for="2014-2015">2014 - 2015</label>
                </li>
                <li>{{ years }}</li>
              </ul>
            </li>
            <li>
              <h5>Date Range</h5>
              <ul class="nested vertical menu padding-bottom-1">
                <li class="row collapse">
                  <label class="small-8 columns">Start Date
                    <input type="text" placeholder="Start Date">
                  </label>
                  <label class="small-8 columns">End Date
                    <input type="text" placeholder="End Date">
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
      <div class="small-13 medium-18 columns">
        <header class="header-main padding-left-1 padding-right-1">
          <div class="header-inner">
            <ul class="menu align-right">
              <li>Data</li>
            </ul>
          </div>
        </header>
        <section class="main-content padding-2">
          <router-view/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
console.clear(); // FOR DEBUGGING
console.log(new Date().getMilliseconds());

import { mapState } from 'vuex'

export default {
  name: 'app',

  data() {
    return {
      // mountains: [],
      years: [],
    }
  },

  computed: {
    mountains: {
      get() {
        return this.$store.state.mountains
      },
      set(value) {
        this.$store.commit('updateMountains', value)
      }
    }
    // ...mapState({
    //   mountains: state => state.mountains
    // })
  },

  methods: {
    // onChangeMountainSelection(e) {
    //   console.log('onChangeMountainSelection', e.target);

    //   this.$store.commit('updateMountains', e.target.value)
    // }
  },

  watch: {
    // mountains() {
    //   console.log('Mountains changed:', this.mountains);

    //   this.$router.push({
    //     name: 'home',
    //     params: {
    //       mountains: this.mountains,
    //       years: this.years,
    //     },
    //   });
    // },

    // years() {
    //   this.$router.push({
    //     name: 'home',
    //     params: {
    //       mountains: this.mountains,
    //       years: this.years,
    //     },
    //   });
    // }
  },

  mounted() {
    console.log('App Component - vuex state:', this.$store.state);
  }
}
</script>

<style lang="scss">
  @import "./styles/app";
</style>
