<template>
  <div>
    <NavBar
    nextRoute=""
    backRoute="MainMenu"
    :showCart="Boolean.false">
      <h1 slot="center-component"><img src=@/assets/cart.png width=10%>  {{ uiLabels.cart }}</h1>
    </NavBar>
    <div class='order'>
      <h1>{{ uiLabels.yourOrder}}</h1>
      <h2>{{ uiLabels.burgers }}</h2>
      <div style="width: 100%;height: auto;">
        <ul v-for="(orderedBurger, index) in orderedBurgers" :key="orderedBurger.buns['ingredient_id'] + index">
          <li>Customized burger {{index+1}} <button v-on:click="RemoveItem(orderedBurger, index)"> X </button>
          <span class="price">{{ orderedBurger.price }} kr</span></li>
        </ul>
        <ul v-for="(burger, index1) in OrderedPremadeBurgers" :key="burger['ingredient_id'] +index1">
          <li >{{ burger["ingredient_"+lang] }} <button v-on:click='RemoveItem(burger, index1)'>X</button>
          <span v-for="(Bprice, index2) in BurgersPrices" :key="index2" v-if="index1==index2"class="price">{{ Bprice }} kr</span></li>
          </ul>
        <!-- <ul
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
        </ul> -->
      </div>
      <h2>{{ uiLabels.drinks }}</h2>
      <p>
      <ul>
        <li v-for="(item, index) in OrderedDrinks" :key="item.ingredient_id + index">{{ item["ingredient_"+lang] }} <button v-on:click='RemoveItem(item, index)'>X</button>
        <span class="price">{{ item.selling_price }} kr</span></li>
      </ul></p>
      <h2>{{ uiLabels.sides }}</h2>
      <p><ul>
        <li v-for="(item, index) in OrderedSides" :key="item.ingredient_id +index">{{ item["ingredient_"+lang] }} <button v-on:click='RemoveItem(item, index)'>X</button>
        <span class="price">{{ item.selling_price }} kr</span></li>
      </ul></p>

      <p style="font-weight:bold" class="price">{{ uiLabels.sum }}: {{ this.price }} kr</p>
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
      OrderedPremadeBurgersIng: this.$store.state.orderedPremadeBurgers,
      OrderedPremadeBurgers: [],
      price: 0,
      BurgersPrices: this.$store.state.burgerPrices,
      orderNumber: "",

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
    else {
    this.OrderedPremadeBurgers=[];
    for (var i = 0; i < this.OrderedPremadeBurgersIng.length; i++) {
      if (this.OrderedPremadeBurgersIng[i].category===7) {
        this.OrderedPremadeBurgers.push(this.OrderedPremadeBurgersIng[i])
      }
      // else if (typeof(this.OrderedPremadeBurgersIng[i])=='number') {
      //   this.BurgersPrices.push(this.OrderedPremadeBurgersIng[i]);
      // }
    }
    }
    this.price=0;
    this.calculatePrice();
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
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
      this.$store.state.orderedPremadeBurgers.splice(0,this.$store.state.orderedPremadeBurgers.length)
    },
    NextPage: function() {

      this.$router.push({ name: "Popup" });
      //location.reload()
    },
    RemoveItem: function(item, index) {
      if (item.category===6) {
        this.$store.state.socket.emit('decrementCounterDrinks', {data: item});
        this.$store.state.orderedDrinks.splice(index, 1);
        this.price=0;
        this.calculatePrice();
      }
      else if (item.category===5) {
        this.$store.state.socket.emit('decrementCounterSides', {data: item});
        this.$store.state.orderedSides.splice(index, 1);
        this.price=0;
        this.calculatePrice();
      }
      else if (item.category===7) {
        this.$store.state.socket.emit('decrementCounterPremadeBurgers', {data: item});
        this.OrderedPremadeBurgers.splice(index, 1);
        this.price=0;
        this.calculatePrice();
      }
      else {
        this.orderedBurgers.splice(index, 1);
        this.price=0;
        this.calculatePrice()
      }
    },
    Cancel: function(){
      let i=0;
      while (i < this.OrderedDrinks.length) {
        this.RemoveItem(this.OrderedDrinks[i],i);
      }
      let j=0;
      while (j < this.OrderedSides.length) {
        this.RemoveItem(this.OrderedSides[j],j);
      }
      // let k=0
      // while ( k < this.orderedBurgers.length) {
      //   this.RemoveItem(this.orderedBurgers[k],k);}
      this.orderedBurgers=[];
      this.OrderedPremadeBurgers=[];
      this.OrderedPremadeBurgersIng=[];
      this.BurgersPrices=[];
      // let l=0;
      // while (l < this.OrderedPremadeBurgers.length) {
      //   this.RemoveItem(this.OrderedPremadeBurgers[l],l);
      // }
      this.price=0

    },
    placeOrder: function () {
      //Wrap the order in an object
      let chosenIngredients=[];
      // chosenIngredients.push(this.OrderedBurger);
      for (var i = 0; i < this.OrderedDrinks.length; i++) {
        chosenIngredients.push(this.OrderedDrinks[i]);
      }
      for (var j = 0; j < this.OrderedSides.length; j++) {
        chosenIngredients.push(this.OrderedSides[j]);
      }
      for (var b = 0; b < this.orderedBurgers.length; b++) {
        chosenIngredients.push(this.orderedBurgers[b].buns);
        chosenIngredients.push(this.orderedBurgers[b].protein);
        for (var v = 0; v < this.orderedBurgers[b].vegetables.length; v++) {
          chosenIngredients.push(this.orderedBurgers[b].vegetables[v])
        }
        for (var s = 0; s < this.orderedBurgers[b].sauces.length; s++) {
          chosenIngredients.push(this.orderedBurgers[b].sauces[s])
        }
        for (var e = 0; e < this.orderedBurgers[b].extras.length; e++) {
          chosenIngredients.push(this.orderedBurgers[b].extras[e])
        }
      }
      let order = {
        ingredients: chosenIngredients,
        price: this.price
      };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit("order", { order: order });
      //set all counters to 0. Notice the use of $refs
      this.Cancel()
      this.price = 0;
      this.$router.push({ name: "payment" });
    },
    calculatePrice: function() {
      for (var i = 0; i < this.OrderedDrinks.length; i++) {
        this.price += this.OrderedDrinks[i].selling_price;
      }
      for (var j = 0; j < this.OrderedSides.length; j++) {
        this.price += this.OrderedSides[j].selling_price;
      }
      for (var k = 0; k < this.orderedBurgers.length; k++) {
        this.price += this.orderedBurgers[k].price
      }
      for (var l = 0; l < this.BurgersPrices.length; l++) {
        this.price += this.BurgersPrices[l]
      }
    }

  }
}
</script>
<style scoped>
h1 {
text-align: center}

#btn {
  font-size: 1.5vw;
  float: right;
  margin-right: 5%;
  font-weight: bold
}

.order{
  margin-left: 2%;
  font-size: 1.2vw
}

.order li button {
  font-size: 0.7vw;
  width: 3%;
  text-align: center;
}

.price {
  position: absolute;
  right: 60%;
  font-size: 1.2vw
}
</style>
