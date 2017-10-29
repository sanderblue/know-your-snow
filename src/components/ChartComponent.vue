<template>
  <div class="chart-container">
    <div class="chart-window">
      <div class="chart-frame">
        <canvas id="chart"></canvas>
      </div>
    </div>
  </div>
  <!-- <div class="chart-container scrollable">
    <div class="chart-window">
      <div class="chart-frame">
        <canvas id="chart"></canvas>
      </div>
    </div>
  </div> -->
</template>

<script type="text/javascript">
import ChartVue from '@/modules/chart-vue'

export default {
  name: 'ChartComponent',
  props: [
    'type',
    'chartData',
    'chartOptions',

  ],
  methods: {
    updateChart(labels, datasets) {
      // console.log('UPDATE CHART - this.chart:', this.chartVue);

      this.chart.data.labels = labels;
      this.chart.data.datasets = datasets;

      this.chart.update();
    }
  },

  watch: {
    chartData() {
      // console.log('WATCH - chartOptions:', this.options);
      // console.log('WATCH - this.chart:', this.chartVue);

      // this.chart.data.labels = this.chartData.labels;
      // this.chart.data.datasets = this.chartData.datasets;

      this.updateChart(this.chartData.labels, this.chartData.datasets);
    },

    // chartOptions() {

    // }
  },

  data() {
    return {
      defaultOptions: {
        legend: {
          display: true,
          position: 'left'
        }
      }
    }
  },

  mounted() {
    console.log('Chart component props:', this._props);
    console.log('TEST', Object.assign(this.defaultOptions, this.chartOptions));

    this.el = document.getElementById('chart');

    this.chart = new Chart(this.el, {
      type: this.type,
      data: this.chartData,
      options: Object.assign(this.chartOptions, this.defaultOptions),
    });

    // this.chartVue = new ChartVue(this.el, this.chartOptions);
  }
}
</script>

<style scoped>
  .chart-container {
    width: 100%;
    max-width: 90vw;
    margin: 0 auto;
    overflow: hidden;
    /*position: relative;
    width: 3000px;
    height: 400px;*/
  }

  .chart-window {
    /*height: 400px;*/
    width: auto;
    overflow-x: scroll;
  }

  .chart-frame {
    position: relative;
    width: 3000px;
    height: 300px;
  }

  canvas {
    /*width: 3000px;*/
    /*height: 300px;*/
  }
</style>
