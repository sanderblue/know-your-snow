<template>
  <div class="home-component">
    {{ mountains }}

    <chart-component :type="'line'" :chartData="chartData" :chartOptions="chartOptions" ></chart-component>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import ChartComponent from '@/components/ChartComponent'
import { mapGetters, mapActions } from 'vuex'

const colorMap = {
  meadows: getRandomColor(),
  timberline: getRandomColor(),
  skibowl: getRandomColor(),
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
  props: [
    // 'mountains',
    // 'years',
  ],

  computed: {
    mountains: {
      get() {

        console.log('GET MOUNTAINS - HELLS YEAH', this.$store.state.mountains);

        // Now we just need get the chart data based on which mountains are selected

        return this.$store.state.mountains
      },
      set(value) {
        this.$store.commit('updateMountains', value)
      }
    }
  },

  // props: {
  //   mountains: {
  //     type: Array,
  //     default() {
  //       return [];
  //     },
  //   },
  //   years: {
  //     type: Array,
  //     default() {
  //       return [];
  //     },
  //   },
  // },
  components: {
    ChartComponent,
  },
  watch: {
    mountains() {
      console.log('\nHomeComponent mountains changed:', this.mountains);

      let matchedData = _.filter(this.observationData, { location: this.mountains[0] })

      console.log('matchedData:', matchedData, '\n');
    },

    years() {
      console.log('\nHomeComponent years changed:', this.years);
    }
  },
  methods: {
    aggregateChartData(data) {
      return new Promise((resolve, reject) => {

      });
    }
  },

  created() {
    Promise.all([
      axios.get('/static/data/mt-hood/meadows/2014_2015.json'),
      axios.get('/static/data/mt-hood/meadows/2015_2016.json'),
      axios.get('/static/data/mt-hood/meadows/2016_2017.json'),
      axios.get('/static/data/mt-hood/timberline/2014_2015.json'),
      axios.get('/static/data/mt-hood/timberline/2015_2016.json'),
      axios.get('/static/data/mt-hood/timberline/2016_2017.json'),
      // axios.get('/static/data/mt-hood/skibowl/2014_2015.json'),
      // axios.get('/static/data/mt-hood/skibowl/2015_2016.json'),
      // axios.get('/static/data/mt-hood/skibowl/2016_2017.json'),
    ])
    .then(resArray => {

      console.log('resArray:', resArray);

      let observationData = _.map(resArray, (obj) => {
        return obj.data;
      });

      this.observationData = _.flatten(observationData);

      console.log('observationData', _.flatten(observationData) );

      let chartLabels = _.map(resArray[0].data, (data, key) => {
        return data.date;
      });

      let datasets = [];

      resArray.forEach((res) => {
        // console.log('res', res.data.location);

        let year = null;
        let data = _.map(res.data.data, (value, key) => {
          if (!year) {
            year = new Date(key).getFullYear();
          }

          return value.avg;
        });

        // console.log('Year', year);

        datasets.push({
          label: `${res.data.location} - ${year}`,
          data: data.reverse(),
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: colorMap[res.data.location],
          borderWidth: 1,
          spanGaps: true
        });
      });

      this.chartData = {
        labels: chartLabels.reverse(),
        datasets: datasets
      };
    });
  },

  data() {
    return {
      observationData: [],
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

      chartData: {}
    }
  },

  mounted() {
    console.log('HomeComponent - mounted:', this.chartOptions);

    this.chartOptions = this.chartOptions;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
