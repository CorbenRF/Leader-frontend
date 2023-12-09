import { createStore } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default createStore({
  state: {
    productsData: [],
    orderInfo: null,
    productsLoading: false,
    productsLoadingFailed: false,
  },
  getters: {
    getProducts(state) {
      return state.productsData;
    },
    getProductsLoading(state) {
      return state.productsLoading;
    },
  },
  mutations: {
    setProductsData(state, productsData) {
      state.productsData = productsData;
    },
    setproductsLoadingFailed(state, arg) {
      state.productsLoadingFailed = arg;
    },
    setProductsLoading(state, arg) {
      state.productsLoading = arg;
    },
  },
  actions: {
    loadProductsCatalogue(context) {
      this.productsLoading = true;
      return axios.get(`${API_BASE_URL}/products`)
        .then((response) => {
          context.commit('setProductsData', response.data);
        })
        .catch(() => context.commit('setProductsLoadingFailed', true))
        .then(() => context.commit('setProductsLoading', false));
    },
  },
  modules: {
  },
  watch: {
    productsLoading() {
      return this.productsLoading;
    },
    productsLoadingFailed() {
      return this.productsLoadingFailed;
    },
  },
});
