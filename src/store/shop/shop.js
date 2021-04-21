import products from "./productInfo";
export default {
  namespaced: true,
  state: {
    products,
    showFilter: null,
    searching: false,
    keyword: "",
    filters: {
      cars: {
        Interior: false,
        Exterior: false,
        Screens: false,
        Wheel: false,
      },
      motorbikes: {
        Mirrors: false,
        Safety: false,
        Gloves: false,
        Helmets: false,
      },
      bikes: {
        Gloves: false,
        Helmets: false,
        Baskets: false,
      },
      misc: {
        Vinyls: false,
        Paintjobs: false,
        Extra: false,
      },
    },
    filterIds: {
      cars: {
        Interior: "ci",
        Exterior: "c",
        Screens: "sc",
        Wheel: "cw",
      },
      motorbikes: {
        Mirrors: "mbm",
        Safety: "mbs",
        Gloves: "mbg",
        Helmets: "mbh",
      },
      bikes: {
        Gloves: "bg",
        Helmets: "bh",
        Baskets: "bb",
      },
      misc: {
        Vinyls: "v",
        Paintjobs: "pj",
        Extra: "x",
      },
    },
  },
  mutations: {
    searching(state, payload) {
      if (payload === 'none') {
        state.searching = !state.searching;
      } else {
        state.searching = payload;
      }
    },
    setKeyword(state, keyword) {
      state.keyword = keyword;
    },
    setShowFilter(state, showFilter) {
      state.showFilter = showFilter;
    },
  },
  actions: {
    searching({ commit }, payload = 'none') {
      commit("searching", payload);
    },
    setKeyword({ commit }, keyword) {
      commit("setKeyword", keyword);
    },
    setShowFilter({ commit }, showFilter) {
      commit("setShowFilter", showFilter);
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    filters(state) {
      return state.filters;
    },
    activeFilters(state) {
      const filterList = Object.keys(state.filters);
      const finalList = {};
      const ids = [];
      filterList.forEach((el) => {
        for (const key in state.filters[el]) {
          if (state.filters[el][key]) {
            if (!finalList[el]) finalList[el] = {};
            finalList[el][key] = true;
            ids.push(state.filterIds[el][key]);
          }
        }
      });
      if (ids.length) finalList.ids = ids;
      return finalList;
    },
    searching(state) {
      return state.searching;
    },
    keyword(state) {
      return state.keyword;
    },
    showFilter(state) {
      return state.showFilter;
    },
  },
};
