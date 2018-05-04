import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/components/HomeComponent';
import CompareYearToYearComponent from '@/components/CompareYearToYearComponent';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
    },
    {
      path: '/year-to-year',
      name: 'year-to-year',
      component: CompareYearToYearComponent,
    }
  ]
})
