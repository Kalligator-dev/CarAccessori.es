import { createStore } from "vuex";
import shop from "./shop/shop.js";
import cart from "./cart/cart.js";

const store = createStore({
  modules: {
    shop,
    cart,
  },
  state: {
    loggedIn: false,
  },
  mutations: {
      auth(state){
          state.loggedIn = !state.loggedIn
      }
  },
  actions: {
      auth({commit}){
        commit('auth')
      }
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
  },
});

export default store;
