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
              <h5>Mountains</h5>
              <ul class="nested vertical menu padding-bottom-1">
                <li>
                  <input id="meadows" type="checkbox" value="MtHoodMeadowsBase" v-model="mountains">
                  <label for="meadows">Mt. Hood Meadows</label>
                </li>
                <li>
                  <input id="timberline" type="checkbox" value="TimberlineLodge" v-model="mountains">
                  <label for="timberline">Mt. Hood Timberline</label>
                </li>
                <li>
                  <input id="skibowl" type="checkbox" value="SkiBowlSummit" v-model="mountains">
                  <label for="skibowl">Mt. Hood Ski Bowl</label>
                </li>
              </ul>
            </li>
            <!-- <li>
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
            </li> -->
            <li>
              <h5>Date Range</h5>
              <ul class="nested vertical menu padding-bottom-1">
                <li class="row collapse">
                  <form v-on:submit.prevent="onSubmitDateRange">
                    <div class="input-group">
                      <input class="input-group-field" name="startDate" type="text" placeholder="Start Date" :value="startDate">
                      <input class="input-group-field" name="endDate" type="text" placeholder="End Date" :value="endDate">
                      <div class="input-group-button">
                        <button type="submit" class="button">Submit</button>
                      </div>
                    </div>
                  </form>
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
      startDate: this.$store.state.startDate,
      endDate: this.$store.state.endDate,
      years: [],
    }
  },

  computed: {
    mountains: {
      get() {
        return this.$store.state.mountains;
      },
      set(value) {
        this.$store.commit('updateMountains', value);
      }
    },
    // ...mapState({
    //   mountains: state => state.mountains
    // })
  },

  watch: {
    startDate(value) {
      this.$store.commit('updateStartDate', value);
    },

    endDate(value) {
      this.$store.commit('updateEndDate', value);
    }
  },

  methods: {
    onSubmitDateRange(e) {
      // console.log('onSubmitDateRange', e);

      const formData = new FormData(e.target);
      const startDate = formData.get('startDate');
      const endDate = formData.get('endDate');

      // console.log('formData:', formData.get('startDate'), formData.get('endDate') );

      this.startDate = startDate;
      this.endDate = endDate;

      this.$router.push({
        query: {
          startDate: this.startDate,
          endDate: this.endDate,
        }
      });
    },
    // onChangeMountainSelection(e) {
    //   console.log('onChangeMountainSelection', e.target);

    //   this.$store.commit('updateMountains', e.target.value)
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
