import Chart from 'chart.js'

export default class ChartVue {
  constructor(element, options) {

    this.options = options || {};
    this.chart = new Chart(element, options);

    console.log('VueChart Class - element', element);
    console.log('VueChart Class - options', options);
    console.log('VueChart Class - chart', this.chart);
  }

  update() {
    this.chart
  }
}
