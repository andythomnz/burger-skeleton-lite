<template>
  <div id="ordering">
    <NavBar
      nextRoute=""
      backRoute="MainMenu"
      showCart='true'>
      <h1 slot="center-component">Pre-Made Burgers</h1>
    </NavBar>
    <!-- <button v-on:click="switchLang()">{{ uiLabels.language }}</button> -->

    <h1>{{ uiLabels.burgers }}</h1> <!-- matching text in ui_en and ui_sv -->

    <div class="wrapper">
      <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        v-on:increment="addToOrder(item)"
        :item="item"
        v-if="item.category == 7"
        :lang="lang"
        :key="item.ingredient_id"
      ></Ingredient>
    </div>
  </div>
</template>
<script>
//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components

import Ingredient from "@/components/Ingredient.vue";
import OrderItem from "@/components/OrderItem.vue";
import NavBar from "@/components/NavBar.vue";

//Importing global CSS
require('@/assets/globalCSS.css')

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from "@/components/sharedVueStuff.js";

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: "Ordering",
  components: {
    Ingredient,
    OrderItem,
    NavBar
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() {
    //Not that data is a function!
    return {
      chosenBurger: [],
      price: 0,
      orderNumber: "",
      bun: Object,
      protein: Object,
      vegetables: [],
      sauces: []
    };
  },
  mounted: function() {
    this.$store.state.socket.on(
      "incrementCounterPremadeBurgers", function(data) {
        console.log('increment');
        this.id=data.data.ingredient_id;
        this.$refs.ingredient[this.id -62].incrementCounter();
      }.bind(this)
    );
    this.$store.state.socket.on(
      "decrementCounterPremadeBurgers", function(data) {
        console.log('decrement');
        this.id=data.data.ingredient_id;
        this.$refs.ingredient[this.id -62].decrementCounter();
      }.bind(this)
    );
  },
  methods: {
    addToOrder: function(item) {
      this.chosenBurger = [];
      this.price = 0;
      this.chosenBurger.push(item);
      this.price += +item.selling_price;
      this.$store.state.premadeBurgerName=item;
      this.bun= {};
      this.protein= {};
      this.vegetables=[];
      this.sauces=[];
      item.burger_vegetables=item.burger_vegetables.split(',');
      item.burger_sauces=item.burger_sauces.split(',');
      for (var i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i].ingredient_id===item.burger_bun)
        {this.$store.state.selectedBurger.bun=this.ingredients[i]}
        else if (this.ingredients[i].ingredient_id===item.burger_protein) {
          this.$store.state.selectedBurger.protein=this.ingredients[i]}
        else if (this.ingredients[i].category==2)
        {
        // item.burger_vegetables=item.burger_vegetables.split(',');
        for (var v = 0; v < item.burger_vegetables.length; v++) {
          if (this.ingredients[i].ingredient_id==parseInt(item.burger_vegetables[v])) {
            this.$store.state.selectedBurger.vegetables.push(this.ingredients[i]);
        }}}
        else if (this.ingredients[i].category==3){
        // item.burger_sauces=item.burger_sauces.split(',');
        for (var s = 0; s < item.burger_sauces.length; s++) {
        if (this.ingredients[i].ingredient_id==parseInt(item.burger_sauces[s])) {
          this.$store.state.selectedBurger.sauces.push(this.ingredients[i])}
        }
      }
      }
      // this.$store.commit('changeBurgerBun', this.bun);
      // this.$store.commit('changeBurgerProtein', this.protein);
      // this.$store.commit('changeBurgerVegetables', this.vegetables);
      // this.$store.commit('changeBurgerSauces', this.sauces);
      this.$store.commit('toggleClose');
      this.$store.commit('toggleFinish');
      this.$store.state.socket.emit('popup', {data: 'PremadeBurger', counter:this.$refs.ingredient[item.ingredient_id -62].counter});
      this.$router.push({ name: "Popup" });
    }
    /*placeOrder: function() {
      var i,
        //Wrap the order in an object
        order = {
          ingredients: this.$store.state.drinks,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit("order", { order: order });
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      // this.chosenIngredients = [];
      this.$router.push({ name: "payment" });
    }*/
  }
};
</script>
<style scoped>
</style>
