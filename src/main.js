import Vue from 'vue';
import App from './App';
import router from './router';
import initComponents from './initComponents';
import Http from './libs/http';
initComponents(Vue);
Vue.use(Http);
// rem 换算
import { remChange } from './components/basic/remChange';
remChange();

// checkwebp
import './components/basic/checkwebp';

import { Switch, Toast, Indicator, Lazyload } from 'mint-ui';
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);

Vue.prototype.$Toast = Toast;
Vue.prototype.$Indicator = Indicator;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

