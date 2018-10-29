// 公用
import TopBar from 'common/TopBar.vue';
import BottomBar from 'common/BottomBar.vue';
import PageEmpty from 'common/PageEmpty.vue';
import Confirm from 'common/Confirm.vue';

const Components = {
  TopBar,
  BottomBar,
  PageEmpty,
  Confirm
};

export default function(Vue) {
  var keys = Object.keys(Components);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let component = Components[key];
    Vue.component(component.name || key.toLowerCase(), Components[key]);
  }
}
