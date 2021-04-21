export default {
  namespaced: true,
  state: {
    items: [],
    orders: [],
    cartUpdated: 0,
    comp: "cart",
    terms: false,
    address: null,
    card: null,
  },
  mutations: {
    add(state, item) {
      let found = -1;
      for (const i in state.items) {
        if (state.items[i].id == item.id) found = i;
      }
      if (found === -1) {
        state.items.push(item);
      } else {
        state.items[found].qty++;
      }
      state.cartUpdated++;
      const cart = JSON.stringify(state.items);
      localStorage.setItem("cart", cart);
    },
    increment(state, ind) {
      if (state.items[ind].qty > 4) return;
      state.items[ind].qty++;
      const cart = JSON.stringify(state.items);
      localStorage.setItem("cart", cart);
    },
    decrement(state, ind) {
      if (state.items[ind].qty < 2) return;
      state.items[ind].qty--;
      const cart = JSON.stringify(state.items);
      localStorage.setItem("cart", cart);
    },
    del(state, ind) {
      state.items.splice(ind, 1);
      const cart = JSON.stringify(state.items);
      localStorage.setItem("cart", cart);
    },
    setComp(state, comp) {
      state.comp = comp;
    },
    setTerms(state, terms) {
      state.terms = terms;
    },
    setCart(state, payload) {
      state.items = payload;
    },
    setOrders(state, payload) {
      state.orders = payload;
    },
    setCard(state, payload) {
      state.card = payload;
    },
    setAddress(state, payload) {
      state.address = payload;
    },
    addOrders(state) {
      const now = new Date();
      let order = {
        order: state.items,
        date: now.getTime(),
        card: state.card,
        address: state.address,
      };
      state.orders.push(order);
      const ord = JSON.stringify(state.orders);
      localStorage.setItem("orders", ord);
      state.items = [];
      const cart = JSON.stringify(state.items);
      localStorage.setItem("cart", cart);
    },
  },
  actions: {
    add({ commit }, item) {
      commit("add", item);
    },
    increment({ commit }, ind) {
      commit("increment", ind);
    },
    decrement({ commit }, ind) {
      commit("decrement", ind);
    },
    del({ commit }, ind) {
      commit("del", ind);
    },
    setComp({ commit }, comp) {
      commit("setComp", comp);
    },
    setCart({ commit }, payload) {
      commit("setCart", payload);
    },
    setOrders({ commit }, payload) {
      commit("setOrders", payload);
    },
    setCard({ commit }, payload) {
      let lsCard = JSON.stringify(payload);
      localStorage.setItem("card", lsCard);
      commit("setCard", payload);
    },
    setAddress({ commit }, address) {
      let lsAdd = JSON.stringify(address);
      localStorage.setItem("address", lsAdd);
      commit("setAddress", address);
    },
    setTerms({ commit }, terms) {
      commit("setTerms", terms);
    },
    addOrders({ commit }) {
      commit("addOrders");
    },
  },
  getters: {
    cart(state) {
      return state.items;
    },
    qty(state) {
      return state.items.length;
    },
    total(state) {
      let result = 0;
      state.items.forEach((el) => {
        result += el.price * el.qty;
      });
      return result;
    },
    cartUpdated(state) {
      return state.cartUpdated;
    },
    comp(state) {
      return state.comp;
    },
    terms(state) {
      return state.terms;
    },
    address(state) {
      return state.address;
    },
    card(state) {
      return state.card;
    },
    orders(state) {
      return state.orders;
    },
    ordersLength(state) {
      return state.orders.length;
    },
  },
};
