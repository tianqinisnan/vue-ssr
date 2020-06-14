import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
  const store = new Vuex.Store({
    state: {
      name: 'nan',
      age: 18
    },
    mutations: {
      changeName(state) {
        state.name = 'haha';
      },
      changeAge(state) {
        state.age = 100;
      }
    },
    actions: {
      changeAll({commit}) { // 如果想给后端调用，就要返回一个 promise
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('changeName');
            commit('changeAge');
            resolve()
          }, 2000);
        })
      }
    }
  });
  // 如果是浏览器环境，且存在__INITIAL_STATE__，说明后端修改了 store 数据，替换即可
  if (typeof window != 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
}