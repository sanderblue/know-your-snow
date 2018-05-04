<template>
  <div class="home-component">
    <chart-component :type="'line'" :chartData="chartData" :chartOptions="chartOptions"></chart-component>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import ChartComponent from '@/components/ChartComponent'
import { mapGetters, mapActions } from 'vuex'

const DATE_FORMAT = 'YYYY-MM-DD';

const colorMap = {
  MtHoodMeadowsBase: '#003F91', // getRandomColor(),
  TimberlineLodge: '#57E2E5', // getRandomColor(),
  SkiBowlSummit: '#5DA9E9', // getRandomColor(),
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

export default {
  name: 'HomeComponent',
  components: {
    ChartComponent,
  },
  data() {
    return {
      observationData: [],
      chartData: {},
      chartOptions: {
        scales: {
          yAxes: [{
            stacked: false,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            },
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      },
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
    startDate: {
      get() {
        return this.$store.state.startDate;
      }
    },
    endDate: {
      get() {
        return this.$store.state.endDate;
      }
    }
  },
  watch: {
    mountains() {
      if (!this.mountains.length) {
        return;
      }

      this.updateChart();
    },

    startDate() {
      this.updateChart();
    },

    endDate() {
      this.updateChart();
    }
  },
  methods: {
    updateChart() {
      let chartLabels = [];
      let datasets = [];

      let aggregatedData = this.aggregateObservationData();

      this.mountains.forEach((mtn) => {
        let matchedData = _.filter(aggregatedData, (dataObj) => {
          return dataObj.location === mtn;
        });

        matchedData = _.orderBy(matchedData, ['timestamp'], ['desc']);

        if (!chartLabels.length) {
          chartLabels = _.map(matchedData, (dataObj, key) => {
            return dataObj.date;
          });
        }

        let numericalData = _.map(matchedData, (dataObj) => {
          return dataObj.averageSnowDepthForDate;
        });

        datasets.push({
          label: mtn,
          data: numericalData.reverse(),
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: colorMap[mtn],
          borderWidth: 1,
          spanGaps: true
        });
      });

      // console.log('chartLabels:', chartLabels);

      this.chartData = {
        labels: chartLabels.reverse(),
        datasets: datasets
      };
    },

    aggregateObservationData() {
      const dataForSelectedMountains = this.getDataByMountain();
      const dataInRange = this.getDataForDateRange(
        this.startDate,
        this.endDate,
        dataForSelectedMountains
      );

      // console.log(`Aggregate data between ${this.startDate} - ${this.endDate}`);
      // console.log('dataForSelectedMountains:', dataForSelectedMountains);
      // console.log('dataInRange:', dataInRange);

      return dataInRange;
    },

    getDataByMountain() {
      return _.filter(this.observationData, (item) => {
        return _.indexOf(this.mountains, item.location) !== -1;
      });
    },

    getDataForDateRange(startDate, endDate, data) {
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();

      return _.filter(data, (item, i) => {
        return item.timestamp >= startTimestamp && item.timestamp <= endTimestamp;
      });
    }
  },

  created() {
    // const dataUrl = '/static/data/all/daily_snow_depth_observations.json';
    const dataUrl = 'http://localhost:4040/snow-depth/daily';

    axios.get(dataUrl).then((res) => {
      console.log('All data:', res.data);

      this.observationData = res.data;

      this.updateChart();
    });
  },

  mounted() {
    this.chartOptions = this.chartOptions;
  }
}
</script>

<style scoped>
.home-component {
  display: flex;
  flex: 1;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
