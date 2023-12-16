import { createStore } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default createStore({
  state: {
    productsData: [],
    cartData: localStorage.getItem('cartData') ? JSON.parse(localStorage.cartData) : [],
    orderInfo: null,
    productsLoading: false,
    productsLoadingFailed: false,
    windowWidth: null,
    mailServerResponse: '',
  },
  getters: {
    getWindowWidth(state) {
      return state.windowWidth;
    },
    getmailServerResponse(state) {
      return state.mailServerResponse;
    },
    getCartData(state) {
      return state.cartData;
    },
    getCartTotal(state) {
      let total = 0;
      function increaseTotal(arg) {
        total += arg;
      }
      state.cartData.forEach((a) => increaseTotal(a.price * a.quantity));
      return total;
    },
    getProducts(state) {
      return state.productsData;
    },
    getProductsLoading(state) {
      return state.productsLoading;
    },
  },
  mutations: {
    setWindowWidth(state, width) {
      state.windowWidth = width;
    },
    setMailServerResponse(state, response) {
      state.mailServerResponse = response;
    },
    updateCartDataStorage(state) { // not sure if needed
      localStorage.setItem('cartData', JSON.stringify(state.cartData));
    },
    addItemToCart(state, itemToAdd) {
      state.cartData.push({ ...itemToAdd, quantity: 1 });
    },
    ChangeCartItemQty(state, payload) {
      const itemOfInterest = state.cartData.find((a) => a.id === payload.id);
      if (payload.qty > 0) {
        if (itemOfInterest.quantity > 0 && itemOfInterest.quantity < 10) {
          itemOfInterest.quantity += payload.qty;
        }
      } else { // eslint-disable-next-line
        if (itemOfInterest.quantity > 1 && itemOfInterest.quantity <= 10) {
          itemOfInterest.quantity += payload.qty;
        }
      }
    },
    DeleteCartItem(state, id) {
      state.cartData = state.cartData.filter((e) => e.id !== id);
    },
    CleanCartData(state) {
      state.cartData = [];
    },
    setProductsData(state, productsData) {
      state.productsData = productsData;
    },
    setProductsLoadingFailed(state, arg) {
      state.productsLoadingFailed = arg;
    },
    setProductsLoading(state, arg) {
      state.productsLoading = arg;
    },
  },
  actions: {
    changeWindowWidth(context, arg) {
      context.commit('setWindowWidth', arg);
    },
    addToCart(context, itemObj) {
      context.commit('addItemToCart', itemObj);
      context.commit('updateCartDataStorage');
    },
    changeCartItemQty(context, payload) {
      context.commit('ChangeCartItemQty', payload);
      context.commit('updateCartDataStorage');
    },
    deleteCartItem(context, id) {
      context.commit('DeleteCartItem', id);
      context.commit('updateCartDataStorage');
    },
    cleanCart(context) {
      context.commit('CleanCartData');
      context.commit('updateCartDataStorage');
    },
    loadProductsCatalogue(context) {
      context.commit('setProductsLoading', true);
      return axios.get(`${API_BASE_URL}/products`)
        .then((response) => {
          context.commit('setProductsData', response.data);
          context.commit('setProductsLoading', false);
        })
        .catch(() => context.commit('setProductsLoadingFailed', true));
      // .then(() => context.commit('setProductsLoading', false));
    },
    sendMail(context, payload) {
      return axios.post(`${API_BASE_URL}/mail`, payload)
        .then((response) => {
          console.log('vuex response to mail send: ', response);
          context.commit('setMailServerResponse', response.data.result);
          return response.data.result;
        })
        .catch((e) => context.commit('setMailServerResponse', e.result));
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
    windowWidth() {
      return this.windowWidth;
    },
  },
});
