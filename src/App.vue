<template>
  <div id="app">
    <div class="row collapse expanded">
      <div class="small-4 columns">
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
                  <input id="meadows" type="checkbox">
                  <label for="meadows">Mt. Hood Meadows</label>
                </li>
                <li>
                  <input id="timberline" type="checkbox">
                  <label for="timberline">Mt. Hood Timberline</label>
                </li>
                <li>
                  <input id="skibowl" type="checkbox">
                  <label for="skibowl">Mt. Hood Ski Bowl</label>
                </li>
              </ul>
            </li>
            <li>
              <h5>Years</h5>
              <ul class="nested vertical menu padding-bottom-1">
                <li>
                  <input id="2017-2018" type="checkbox">
                  <label for="2017-2018">2017 - 2018</label>
                </li>
                <li>
                  <input id="2016-2017" type="checkbox">
                  <label for="2016-2017">2016 - 2017</label>
                </li>
                <li>
                  <input id="2015-2016" type="checkbox">
                  <label for="2015-2016">2015 - 2016</label>
                </li>
                <li>
                  <input id="2014-2015" type="checkbox">
                  <label for="2014-2015">2014 - 2015</label>
                </li>
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

      <div class="small-12 columns">
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

export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "./styles/app";
</style>
