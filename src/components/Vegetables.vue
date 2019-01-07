<template>
  <div
    id="ordering"
    v-if="vegetables">

    <div class="wrapper">
      <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        v-on:increment="addToOrder(item)"
        v-on:reset="resetToOrder(item)"
        :item="item"
        v-if="item.category == 2"
        :lang="lang"
        :key="item.ingredient_id"
      ></Ingredient>
    </div>

    <!-- <h1>{{ uiLabels.order }}</h1>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }},
    {{ price }} kr
    <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

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

//Importing global CSS
require('@/assets/globalCSS.css')

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from "@/components/sharedVueStuff.js";
// import bridge from './vue-temp/vue-editor-bridge';

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: "Ordering",
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function () {
    //Not that data is a function!
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      vegetables: true
    };
  },
  // created: function () {
  //   this.$store.state.socket.on(
  //     "orderNumber",
  //     function (data) {
  //       this.orderNumber = data;
  //     }.bind(this)
  //   );
  // },
  computed: {
    close () {
      return this.$store.state.close;
    }
  },
  watch: {
    close () {
      this.vegetables = false
      this.chosenIngredients = []
      this.price = 0
      this.$nextTick(_ => {
        this.vegetables = true;
      })
    }
  },
  methods: {
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
      // let store = this.$store.state.orders.vegetables;
      // store.push(item);
      this.$store.state.selectedBurger.push(item);
      // this.$store.commit('changeOrders', {
      //   type: 'vegetables',
      //   value: store
      // })
    },
    resetToOrder: function (item) {
      let store = this.$store.state.orders.vegetables;
      let arr = this.chosenIngredients;
      for (let i in store) {
        if (store[i].ingredient_sv === item.ingredient_sv && item.ingredient_id === store[i].ingredient_id) {
          store.splice(i, 1);
          arr.splice(i, 1);
          break;
        }
      }
      this.chosenIngredients = arr;
      this.$store.commit('changeOrders', {
        type: 'vegetables',
        value: store
      })
      //delete
      this.price -= +item.selling_price;
    },
    // placeOrder: function () {
    //   var i,
    //     //Wrap the order in an object
    //     order = {
    //       ingredients: this.chosenIngredients,
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
