<template>
  <div class="home-component">
    <chart-component :type="'line'" :chartData="chartData" :chartOptions="chartOptions" ></chart-component>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import ChartComponent from '@/components/ChartComponent'

export default {
  name: 'HomeComponent',
  components: {
    ChartComponent,
  },

  created() {
    Promise.all([
      axios.get('/static/data/mt-hood-meadows/mt-hood-meadows-2014_2015.json'),
      axios.get('/static/data/mt-hood-meadows/mt-hood-meadows-2015_2016.json'),
      axios.get('/static/data/mt-hood-meadows/mt-hood-meadows-2016_2017.json')
    ])
    .then(resArray => {
      let chartLabels = _.map(resArray[0].data, (data, key) => {
        let date = new Date(key);

        return date.getMonth() + '-' + date.getDate();
      });
      let datasets = [];

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';

        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
      }

      resArray.forEach((res) => {
        let year = null;
        let data = _.map(res.data, (value, key) => {

          // console.log('key', key);
          if (!year) {
            year = new Date(key).getFullYear();
          }

          return value.avg;
        });

        let color = getRandomColor();

        // console.log('Year', year);

        datasets.push({
          label: year,
          data: data.reverse(),
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: color,
          borderWidth: 1,
          spanGaps: true
        });
      });

      this.chartData = {
        labels: chartLabels.reverse(),
        datasets: datasets
      };

      this.chartOptions = {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
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
      };
    });
  },

  data() {
    return {
      chartOptions: {

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
