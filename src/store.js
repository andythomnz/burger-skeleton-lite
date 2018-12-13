import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    uiLabels: {},
    lang: 'en',
    drinks: [],
    sides: [],
    cartCount: 0,
    myoB: [],
    close: false,
    orders: {
      buns: {},
      protein: {},
      vegetables: [],
      sauces: [],
      extras: []
    },
    currentTab: 'Buns'
  },
  getters: {
    getSocket: state => state.socket
  },
  mutations: {
    setUiLabels: function (store, labels) {
      store.uiLabels = labels;
    },
    switchLang: function (store, lang) {
      store.lang = lang;
    },
    changeCurrentTab: function (store, tab) {
      store.currentTab = tab;
    },
    changeOrders: function (store, value) {
      store.orders[value.type] = value.value;
    },
    toggleClose: function (store) {
      store.close = !store.close;
    }
  },
  actions: {

  }
})