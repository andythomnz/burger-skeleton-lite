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
      <h2>{{ uiLabels.drinks }}</h2>
      <p>{{ OrderedDrinks.map(item => item["ingredient_"+lang]).join(', ' ) }}
      <!-- <button v-on:click='RemoveDrink(item)'>X</button> -->
      </p>
      <h2>{{ uiLabels.sides }}</h2>
      <p>{{ OrderedSides.map(item => item["ingredient_"+lang]).join(', ' )}}</p>
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
      OrderedBurgers: [],
      OrderedDrinks: this.$store.state.drinks,
      OrderedSides: this.$store.state.sides,

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
