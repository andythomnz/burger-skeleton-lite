<template>
  <div>
    <NavBar
    nextRoute=""
    backRoute="MainMenu"
    :showCart="Boolean.false">
      <h1 slot="center-component"><img src=@/assets/cart.png height=40px>  {{ uiLabels.cart }}</h1>
    </NavBar>
    <div class='order'>
      <h1>{{ uiLabels.yourOrder}}</h1>
      <h2>{{ uiLabels.burgers }}</h2>
      <ul>
        <li>Buns: {{ OrderedBurger.buns["ingredient_"+lang]}} <button v-on:click='' v-if='Object.keys(OrderedBurger.buns).length>0'>X</button></li>
        <li>Protein: {{OrderedBurger.protein["ingredient_"+lang]}} <button v-if='Object.keys(OrderedBurger.protein).length>0'>X</button></li>
        <li>
          Vegetables:
          <ul>
            <li
              v-for="item in OrderedBurger.vegetables"
              :key="item.ingredient_id"
            >{{item["ingredient_"+lang]}} <button>X</button></li>
          </ul>
        </li>
        <li>
          Sauces:
          <ul>
            <li
              v-for="item in OrderedBurger.sauces"
              :key="item.ingredient_id"
            >{{item["ingredient_"+lang]}} <button>X</button></li>
          </ul>
        </li>
        <li>
          Extras:
          <ul>
            <li
              v-for="item in OrderedBurger.extras"
              :key="item.ingredient_id"
            >{{item["ingredient_"+lang]}} <button>X</button></li>
          </ul>
        </li>
      </ul>
      <h2>{{ uiLabels.drinks }}</h2>
      <p>
      <ul>
        <li v-for="item in OrderedDrinks" :key="item.ingredient_id">{{ item["ingredient_"+lang] }} <button v-on:click='RemoveDrinks(item)'>X</button></li>
      </ul></p>
      <h2>{{ uiLabels.sides }}</h2>
      <p><ul>
        <li v-for="item in OrderedSides" :key="item.ingredient_id">{{ item["ingredient_"+lang] }} <button v-on:click='RemoveSides(item)'>X</button></li>
      </ul></p>
      <button id='btn' v-on:click="Cancel()">{{ uiLabels.cancelOrder }}</button>
      <button id='btn' v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import sharedVueStuff from "@/components/sharedVueStuff.js";

require('@/assets/globalCSS.css')
export default {
  name: "Cart",
  components: {
    NavBar,

  },
  mixins: [sharedVueStuff],
  data: function() {
    return {
      OrderedDrinks: this.$store.state.drinks,
      OrderedSides: this.$store.state.sides,

    };
  },
  computed: {
    OrderedBurger () {
      return this.$store.state.orders;
    }
  },
  methods: {
    NextPage: function() {

      this.$router.push({ name: "MainMenu" });
      //location.reload()
    },
    RemoveDrinks: function(item) {
      console.log(this.$store.state.drinks[this.$store.state.drinks.indexOf(item)].counter);
      // this.$store.state.drinks.splice(this.$store.state.drinks.indexOf(item), 1);
      // this.$store.state.drinks[this.$store.state.drinks.indexOf(item)].counter -=1;
      this.$store.commit('decrementCounterDrinks', this.$store.state.drinks.indexOf(item))
      console.log(this.$store.state.drinks)
      // console.log(this.$store.state.drinks[this.$store.state.drinks.indexOf(item)].counter)
      // need to reset counter of item
    },
    RemoveSides: function(item) {
      this.$store.state.sides.splice(this.$store.state.sides.indexOf(item), 1)
    },
    Cancel: function(){
      this.$store.state.drinks.splice(0, this.$store.state.drinks.length);
      this.$store.state.sides.splice(0, this.$store.state.sides.length);
    },
    placeOrder: function () {
      var i,
        //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit("order", { order: order });
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
      this.$router.push({ name: "payment" });
    }

  }
}
</script>
<style scoped>
h1 {
text-align: center}

#btn {
  font-size: 18pt;
  float: right;
  margin-right: 5%;
  font-weight: bold
}

.order{
  margin-left: 2%
}
</style>
