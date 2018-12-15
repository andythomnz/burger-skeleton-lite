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
    <div style="width: 100%;height: auto;">
      <ul
        v-for="(OrderedBurger, index) in OrderedBurgers"
        :key="OrderedBurger.buns['ingredient_'+lang] + index"
        style="display: inline-block; width: 300px;vertical-align: top;"
      >
        <li>Buns: {{OrderedBurger.buns['ingredient_'+lang]}}</li>
        <li>Protein: {{OrderedBurger.protein['ingredient_'+lang]}}</li>
        <li>
          Vegetables:
          <ul>
            <li
              v-for="item in OrderedBurger.vegetables"
              :key="item['ingredient_'+lang]"
            >{{item['ingredient_'+lang]}}</li>
          </ul>
        </li>
        <li>
          Sauces:
          <ul>
            <li
              v-for="item in OrderedBurger.sauces"
              :key="item['ingredient_'+lang]"
            >{{item['ingredient_'+lang]}}</li>
          </ul>
        </li>
        <li>
          Extras:
          <ul>
            <li
              v-for="item in OrderedBurger.extras"
              :key="item['ingredient_'+lang]"
            >{{item['ingredient_'+lang]}}</li>
          </ul>
        </li>
      </ul>
    </div>

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
      OrderedBurgers: [],
      OrderedDrinks: this.$store.state.drinks,
      OrderedSides: this.$store.state.sides
    };
  },
  computed: {
    finish () {
      return this.$store.state.finish
    }
  },
  mounted () {
    if (this.finish) {
      this.OrderedBurgers.push(Object.assign({}, this.$store.state.orders));
      this.clear();
      this.$store.commit('toggleFinish');
    }
  },
  activated () {
    if (this.finish) {
      this.OrderedBurgers.push(Object.assign({}, this.$store.state.orders));
      this.clear();
      this.$store.commit('toggleFinish');
    }
  },

  methods: {
    clear () {
      this.$store.commit('changeOrders', {
        type: 'buns',
        value: {}
      })
      this.$store.commit('changeOrders', {
        type: 'protein',
        value: {}
      })
      this.$store.commit('changeOrders', {
        type: 'vegetables',
        value: []
      })
      this.$store.commit('changeOrders', {
        type: 'sauces',
        value: []
      })
      this.$store.commit('changeOrders', {
        type: 'extras',
        value: []
      })
    },
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
