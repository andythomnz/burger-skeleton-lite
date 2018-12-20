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
          v-for="(orderedBurger, index) in orderedBurgers"
          :key="orderedBurger.buns['ingredient_'+lang] + index"
          style="display: inline-block; width: 300px;vertical-align: top;"
        >
          <li>Buns: {{orderedBurger.buns['ingredient_'+lang]}} <button v-on:click='' v-if='Object.keys(orderedBurger.buns).length>0'>X</button></li>
          <li>Protein: {{orderedBurger.protein['ingredient_'+lang]}} <button v-if='Object.keys(orderedBurger.protein).length>0'>X</button></li>
          <li>
            Vegetables:
            <ul>
              <li
                v-for="item in orderedBurger.vegetables"
                :key="item['ingredient_'+lang]"
              >{{item['ingredient_'+lang]}} <button>X</button></li>
            </ul>
          </li>
          <li>
            Sauces:
            <ul>
              <li
                v-for="item in orderedBurger.sauces"
                :key="item['ingredient_'+lang]"
              >{{item['ingredient_'+lang]}} <button>X</button></li>
            </ul>
          </li>
          <li>
            Extras:
            <ul>
              <li
                v-for="item in orderedBurger.extras"
                :key="item['ingredient_'+lang]"
              >{{item['ingredient_'+lang]}} <button>X</button></li>
            </ul>
          </li>
        </ul>
      </div>
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
      orderedBurgers: [],
      OrderedDrinks: this.$store.state.orderedDrinks,
      OrderedSides: this.$store.state.orderedSides,

    };
  },
  computed: {
    finish () {
      return this.$store.state.finish
    }
  },
  mounted () {
    if (this.finish) {
      this.orderedBurgers.push(Object.assign({}, this.$store.state.orders));
      this.clear();
      this.$store.commit('toggleFinish');
    }
  },
  activated () {
    if (this.finish) {
      this.orderedBurgers.push(Object.assign({}, this.$store.state.orders));
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
    RemoveDrinks: function(item) {
      console.log(this.$store.state.orderedDrinks[this.$store.state.orderedDrinks.indexOf(item)].counter);
      // this.$store.state.drinks.splice(this.$store.state.drinks.indexOf(item), 1);
      // this.$store.state.drinks[this.$store.state.drinks.indexOf(item)].counter -=1;
      this.$store.commit('decrementCounterDrinks', this.$store.state.orderedDrinks.indexOf(item))
      console.log(this.$store.state.orederedDrinks)
      // console.log(this.$store.state.drinks[this.$store.state.drinks.indexOf(item)].counter)
      // need to reset counter of item
    },
    RemoveSides: function(item) {
      this.$store.state.orderedSides.splice(this.$store.state.orderedSides.indexOf(item), 1)
    },
    Cancel: function(){
      this.$store.state.orderedDrinks.splice(0, this.$store.state.orderedDrinks.length);
      this.$store.state.orderedSides.splice(0, this.$store.state.orderedSides.length);
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
