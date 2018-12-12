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
      <p>{{ OrderedBurgers.map(item => item["ingredient_"+lang]).join(', ' ) }}
      <h2>{{ uiLabels.drinks }}</h2>
      <p>{{ OrderedDrinks.map(item => item["ingredient_"+lang]).join(', ' ) }}
      <!-- <button v-on:click='RemoveDrink(item)'>X</button> -->
      </p>
      <h2>{{ uiLabels.sides }}</h2>
      <p>{{ OrderedSides.map(item => item["ingredient_"+lang]).join(', ' )}}</p>
      <button id='btn' v-on:click="Cancel()">{{ uiLabels.cancelOrder }}</button>
      <button id='btn'>{{ uiLabels.placeOrder }}</button>

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
      OrderedBurgers: this.$store.state.myoB
    };
  },
  methods: {
    NextPage: function() {

      this.$router.push({ name: "MainMenu" });
      //location.reload()
    },
    RemoveDrink: function(item) {
      this.$store.state.drinks.splice(this.$store.state.drinks.indexOf(item), 1)
    },
    Cancel: function(){
      this.$store.state.myoB.splice(0, this.$store.state.myoB.length);
      this.$store.state.drinks.splice(0, this.$store.state.drinks.length);
      this.$store.state.sides.splice(0, this.$store.state.sides.length);
    }
  }



};
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
