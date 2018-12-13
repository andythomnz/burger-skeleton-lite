<template>
  <div>
    <NavBar
      nextRoute=""
      backRoute="MainMenu"
      :showCart="Boolean.false"
    >
      <h1 slot="center-component">{{ uiLabels.cart }}</h1>
    </NavBar>
    <h1>Your order</h1>
    <h2>Burgers</h2>
    <ul>
      <li>Buns: {{OrderedBurger.buns.ingredient_en}}</li>
      <li>Protein: {{OrderedBurger.protein.ingredient_en}}</li>
      <li>
        Vegetables:
        <ul>
          <li
            v-for="item in OrderedBurger.vegetables"
            :key="item.ingredient_sv"
          >{{item.ingredient_sv}}</li>
        </ul>
      </li>
      <li>
        Sauces:
        <ul>
          <li
            v-for="item in OrderedBurger.sauces"
            :key="item.ingredient_sv"
          >{{item.ingredient_sv}}</li>
        </ul>
      </li>
      <li>
        Extras:
        <ul>
          <li
            v-for="item in OrderedBurger.extras"
            :key="item.ingredient_sv"
          >{{item.ingredient_sv}}</li>
        </ul>
      </li>
    </ul>
    <h2>Drinks</h2>
    <p>{{ OrderedDrinks.map(item => item["ingredient_"+lang]).join(', ' ) }}
      <!-- <button v-on:click='RemoveDrink(item)'>X</button> -->
    </p>
    <h2>Sides</h2>
    <p>{{ OrderedSides.map(item => item["ingredient_"+lang]).join(', ' )}}</p>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import sharedVueStuff from "@/components/sharedVueStuff.js";
export default {
  name: "Cart",
  components: {
    NavBar
  },
  mixins: [sharedVueStuff],
  data: function () {
    return {
      OrderedDrinks: this.$store.state.drinks,
      OrderedSides: this.$store.state.sides
    };
  },
  computed: {
    OrderedBurger () {
      return this.$store.state.orders;
    }
  },
  methods: {
    NextPage: function () {
      this.$router.push({ name: "MainMenu" });
      //location.reload()
    },
    RemoveDrink: function (item) {
      this.$store.state.drinks.splice(this.$store.state.drinks.indexOf(item), 1)
    }
  }



};
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>
