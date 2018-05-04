<template>
  <div class="component">
    <chart-component :type="'line'" :chartData="chartData" :chartOptions="chartOptions"></chart-component>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import ChartComponent from '@/components/ChartComponent';
import { mapGetters, mapActions } from 'vuex';

console.log('CompareYearToYearComponent');

const colorMap = {
  MtHoodMeadowsBase: '#003F91',
  TimberlineLodge: '#57E2E5',
  SkiBowlSummit: '#5DA9E9',
};

const DATES_2014_2015 = {
  startDate: '2014-09-01',
  endDate: '2015-06-30',
};

const DATES_2015_2016 = {
  startDate: '2015-09-01',
  endDate: '2016-06-30',
};

const DATES_2016_2017 = {
  startDate: '2016-09-01',
  endDate: '2017-06-30',
};

const DATES_2017_2018 = {
  startDate: '2017-09-01',
  endDate: '2018-06-30',
};

export default {
  name: 'CompareYearToYearComponent',
  components: {
    ChartComponent,
  },

  methods: {
    updateChart() {
      let chartLabels = [];
      let datasets = [];
      let matchedData = _.orderBy(this.observationData, ['timestamp'], ['desc']);

      if (!chartLabels.length) {
        chartLabels = _.map(matchedData, (dataObj, key) => {
          return dataObj.date;
        });
      }

      let numericalData = _.map(matchedData, (dataObj) => {
        return dataObj.averageSnowDepthForDate;
      });

      datasets.push({
        label: 'MtHoodMeadowsBase',
        data: numericalData.reverse(),
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: colorMap['MtHoodMeadowsBase'],
        borderWidth: 1,
        spanGaps: true
      });

      this.chartData = {
        labels: chartLabels.reverse(),
        datasets: datasets
      };
    }
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

  created() {
    // const dataUrl = '/static/data/all/daily_snow_depth_observations.json';
    const dataUrl = `http://localhost:4040/snow-depth/daily/MtHoodMeadowsBase/${DATES_2014_2015.startDate}/${DATES_2014_2015.endDate}`;

    axios.get(dataUrl).then((res) => {
      console.log('Year to year data:', res.data);

      this.observationData = res.data;

      this.updateChart();
    });
  },

  mounted() {
    this.chartOptions = this.chartOptions;
  }
};
</script>
