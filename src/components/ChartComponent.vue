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
      // console.log('WATCH - chartData:', this.chartData);

      this.updateChart(this.chartData.labels, this.chartData.datasets);
    },
  },

  data() {
    return {
      defaultOptions: {
        elements: {
          point: {
            radius: 2
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }
  },

  mounted() {
    // console.log('Chart component props:', this._props);
    // console.log('TEST', Object.assign(this.defaultOptions, this.chartOptions));

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
  }

  .chart-window {
    width: auto;
    overflow-x: scroll;
  }

  .chart-frame {
    position: relative;
    /*width: 4000px;*/
    height: 500px;
  }

  canvas {

  }
</style>
