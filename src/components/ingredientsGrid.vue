<template>
  <div id="ordering" class="container">
    <head>
      <link href='https://fonts.googleapis.com/css?family=Amaranth' rel='stylesheet'>
    </head>
    <div class="header">
      <div class="btn_cancel">
        <button :class="['btn_header']" v-on:click="switchLang()">
          <img src="https://img.icons8.com/material/52/FFE4B5/delete-sign.png" height="50vh">
          </button>
      </div>
      <div class="btn_lang">
        <button :class="['btn_header', lang]" v-on:click="switchLang()"></button>
      </div>
      <div class="title">
        {{ uiLabels.welcome }}
      </div>
      <div class="btn_cart">
        <button :class="['btn_header']" v-on:click="switchLang()">
          <img src="https://img.icons8.com/material/52/FFE4B5/shopping-cart.png" height="50vh">
          </button>
      </div>
    </div>


    <div class="page">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab">
        {{ tab }}
      </button>


      <component
        v-bind:is="currentTabComponent"
        class="tab"
        type="inline-template">
      </component>
    </div>

  </div>
</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import Start from '@/views/Start.vue'
import SelectionOverview from '@/views/selectionOverview.vue'
import BurgerCreation from '@/views/burgerCreation.vue'
import IngredientsSelection from '@/components/IngredientsSelection.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem,
    Start,
    SelectionOverview,
    BurgerCreation,
    IngredientsSelection
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      currentTab: '',
      tabs: ['Start', 'SelectionOverview', 'BurgerCreation', 'IngredientsSelection'],
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
    }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab;
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
    }
  }
}
</script>
<style scoped>

</style>
