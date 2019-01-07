<template>
  <div
    id="ordering"
    class="container"
  >
    <NavBar
      nextRoute=""
      backRoute="MainMenu"
      showCart='true'
    >
      <!--button slot="center-component" v-on:click="switchLang()">{{ uiLabels.language }}</button-->
      <div slot="center-component">
        <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="changeTab(tab)"
        >
          {{ tab }}
        </button>
      </div>
    </NavBar>

    <h2> tab: {{currentTab}}</h2>
    <div class="page">
      <keep-alive>
        <component
          v-bind:is="currentTab"
          class="tab"
          type="inline-template"
        >
        </component>
      </keep-alive>
    </div>

  </div>
</template>
<script>

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import basicButton from "@/components/basicButton.vue";
import NavBar from "@/components/NavBar.vue";

//import the components for the tabs
//import MYOB from '@/components/MYOB.vue' MYOB - Make your own burger is the old version
import Buns from '@/components/Buns.vue'
import Protein from '@/components/Protein.vue'
import Vegetables from '@/components/Vegetables.vue'
import Sauces from '@/components/Sauces.vue'
import Extras from '@/components/Extras.vue'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem,
    basicButton,
    NavBar,

    //Define the components for the tabs - Buns, Protein, Vegetables, Sauces, Extras,
    //MYOB - Make your own burger is the old version
    Buns,
    Protein,
    Vegetables,
    Sauces,
    Extras,
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function () {        //Not that data is a function!
    return {
      // currentTab: 'Buns',
      tabs: ['Buns', 'Protein', 'Vegetables', 'Sauces', 'Extras'],
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
    }
  },
  activated () {
    this.$store.commit('changeCurrentTab', 'Buns');
  },
  computed: {
    currentTab: function () {
      return this.$store.state.currentTab
    },
    nextButton () {
      return this.currentTab === 'Vegetables' || this.currentTab === 'Sauces';
    }
  },
  // created: function () {
  //   this.$store.state.socket.on('orderNumber', function (data) {
  //     this.orderNumber = data;
  //   }.bind(this));
  // },
  methods: {
    changeTab (tab) {
      this.$store.commit('changeCurrentTab', tab);
      // this.currentTab = tab
    },
    // addToOrder: function (item) {
    //   this.chosenIngredients.push(item);
    //   this.price += +item.selling_price;
    // },
    // placeOrder: function () {
    //   var i,
    //     //Wrap the order in an object
    //     order = {
    //       ingredients: this.chosenIngredients,
    //       price: this.price
    //     };
    //   // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
    //   this.$store.state.socket.emit('order', { order: order });
    //   //set all counters to 0. Notice the use of $refs
    //   for (i = 0; i < this.$refs.ingredient.length; i += 1) {
    //     this.$refs.ingredient[i].resetCounter();
    //   }
    //   this.price = 0;
    //   this.chosenIngredients = [];
    // }
  }
}
</script>
<style scoped>
</style>
