import Vue from 'vue';
import VueRouter from 'vue-router';

const Foo = () => import('./components/Foo.vue');
const Bar = () => import('./components/Bar.vue');

Vue.use(VueRouter);

export default () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Foo },
      { path: '/bar', component: Bar }
    ]
  })
  return router;
}