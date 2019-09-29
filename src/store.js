import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //new State
    cartItems: [],

    //Old states
    socket: io(),
    uiLabels: {},
    lang: 'en',
    drinks: {},
    sides: {},
    cartCount: 0,
    close: false,
    selectedPremadeBurger:[],
    selectedBurger:[],
    orderedBurgers: [],
    orderedDrinks: [],
    orderedSides: [],
    orderedPremadeBurgers: [],
    finish: false,
    currentTab: 'Buns',
    ingredients: [],
    dO: ''
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
    toggleClose: function (store) {
      store.close = !store.close;
    },
    toggleFinish: function (store) {
      store.finish = !store.finish;
    },
    //New API sudo methods below 
    addItemToCart (store, item){
      
    }
  },
  actions: {
    async confirmItemAsync ({ commit, state }, item) {
      // save the items currently in the cart
      //const savedCartItems = [...state.cart]
      // send out checkout request, and optimistically clear the cart
      //commit('addItemToCart', item)
      // the shop API accepts a success callback and a failure callback
      const result = await axios.get("https://nwen304-group-proj-t26-backend.herokuapp.com/api/cart")
      console.log(result);
    }
  }
})
