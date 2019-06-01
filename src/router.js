import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import WebAudio from './components/WebAudio.vue'
import GuitarTuner from './components/GuitarTuner.vue'
import PannerNode from './components/PannerNode.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/webAudio',
      name: 'webAudio',
      component: WebAudio,
    },
    {
      path: '/guitarTuner',
      name: 'guitarTuner',
      component: GuitarTuner,
    },
    {
      path: '/pannerNode',
      name: 'pannerNode',
      component: PannerNode,
    },
  ],
});
