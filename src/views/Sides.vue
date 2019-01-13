<template>
  <div id="ordering">
    <NavBar
        nextRoute=""
        backRoute="MainMenu"
        showCart='true'>
        <h1 slot="center-component">{{uiLabels.sides}}</h1>
    </NavBar>

    <div class="wrapper">
      <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        v-on:increment="addToOrder(item)"
        :item="item"
        v-if="item.category == 5"
        :lang="lang"
        :key="item.ingredient_id"
      ></Ingredient>
    </div>
    <!-- <h1>{{ uiLabels.order }}</h1>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }},
    {{ price }} kr
    <button
      v-on:click="placeOrder()"
    >{{ uiLabels.placeOrder }}</button>

    <h1>{{ uiLabels.ordersInQueue }}</h1>
    <div>
      <OrderItem
        v-for="(order, key) in orders"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key"
      ></OrderItem>
    </div> -->
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
      chosenIngredients: [],
      price: 0,
      orderNumber: ""
    };
  },
  // created: function() {
  //   this.$store.state.socket.on(
  //     "orderNumber",
  //     function(data) {
  //       this.orderNumber = data;
  //     }.bind(this)
  //   );
  // },
  mounted: function() {
    this.$store.state.socket.on(
      "incrementCounterSides", function(data) {
        console.log('increment');
        this.id=data.data.ingredient_id;
        this.$refs.ingredient[this.id -54].incrementCounter();
      }.bind(this)
    );
    this.$store.state.socket.on(
      "decrementCounterSides", function(data) {
        console.log('decrement');
        this.id=data.data.ingredient_id;
        this.$refs.ingredient[this.id -54].decrementCounter();
      }.bind(this)
    );
  },
  methods: {
    addToOrder: function(item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
      this.$store.state.sides=item;
      this.$store.state.socket.emit('popup', {data: 'Sides', counter:this.$refs.ingredient[item.ingredient_id -54].counter, cart:false});
      this.$router.push({ name: "Popup" })
    },
    // placeOrder: function() {
    //   var i,
    //     //Wrap the order in an object
    //     order = {
    //       ingredients: this.$store.state.sides,
    //       price: this.price
    //     };
    //   // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
    //   this.$store.state.socket.emit("order", { order: order });
    //   //set all counters to 0. Notice the use of $refs
    //   for (i = 0; i < this.$refs.ingredient.length; i += 1) {
    //     this.$refs.ingredient[i].resetCounter();
    //   }
    //   this.price = 0;
    //   this.chosenIngredients = [];
    //   this.$router.push({ name: "payment" });
    // }
  }
};
</script>
<style scoped>
</style>
