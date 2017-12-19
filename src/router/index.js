import Vue from 'vue';
import Router from 'vue-router';
import PaginatorDemo from '@/components/Paginator/Demo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PaginatorDemo',
      component: PaginatorDemo
    }
  ]
});
