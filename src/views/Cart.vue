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
        <ul v-for="(orderedBurger, index) in orderedBurgers" :key="orderedBurger.bun['ingredient_id'] + index">
          <li>Customized burger {{index+1}} <button v-on:click="RemoveItem(orderedBurger, index)"> X </button><button v-on:click="editBurger(orderedBurger, index)">EDIT </button>
          <span class="price">{{ orderedBurger.price }} kr</span></li>
        </ul>
        <ul v-for="(burger, index) in OrderedPremadeBurgers" :key="burger.item['ingredient_id'] +index">
          <li >{{ burger.item["ingredient_"+lang] }} <button v-on:click='RemoveItem(burger.item, index)'>X</button><button v-on:click="editBurger(burger, index)">EDIT </button>
            <span class="price">{{ burger.price }} kr</span>
        </li>
          </ul>
      </div>
      <h2>{{ uiLabels.drinks }}</h2>
      <p>
      <ul>
        <li v-for="(item, index) in OrderedDrinks" :key="item.item.ingredient_id + index">{{ item.item["ingredient_"+lang] }}
          <span v-if="item.counter>1"> {{ item.counter }} </span>
          <button v-on:click='RemoveItem(item, index)'>X</button>
          <button v-on:click='EditItem(item, index)'> Edit </button>
        <span class="price">{{ item.item.selling_price }} kr</span></li>
      </ul></p>
      <h2>{{ uiLabels.sides }}</h2>
      <p><ul>
        <li v-for="(item, index) in OrderedSides" :key="item.item.ingredient_id +index">{{ item.item["ingredient_"+lang] }}
          <span v-if="item.counter>1"> {{ item.counter }} </span>
          <button v-on:click='RemoveItem(item, index)'>X</button>
          <button v-on:click='EditItem(item, index)'> Edit </button>
        <span class="price">{{ item.item.selling_price }} kr</span></li>
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
      orderedBurgers: this.$store.state.orderedBurgers,
      OrderedDrinks: this.$store.state.orderedDrinks,
      OrderedSides: this.$store.state.orderedSides,
      OrderedPremadeBurgers: this.$store.state.orderedPremadeBurgers,
      price: 0,
      orderNumber: "",

    };
  },
  // computed: {
  //   finish () {
  //     return this.$store.state.finish
  //   }
  // },

  activated () {
    // if (this.finish) {
    //   // this.orderedBurgers.push(Object.assign({}, this.$store.state.orders));
    //   this.clear();
    //   // this.$store.commit('toggleFinish');
    // }
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
      this.$store.state.orderedBurgers.splice(0, this.$store.state.orderedBurgers.length);
      this.$store.state.orderedPremadeBurgers.splice(0,this.$store.state.orderedPremadeBurgers.length)
    },
    NextPage: function() {

      this.$router.push({ name: "Popup" });
      //location.reload()
    },
    RemoveItem: function(item, index) {
      if (item.category==7) {
        this.$store.state.socket.emit('decrementCounterPremadeBurgers', {data: item});
        this.OrderedPremadeBurgers.splice(index, 1);
        this.$store.state.cartCount -= 1;
        this.price=0;
        this.calculatePrice();
      }
      else if (item.item.category==6) {
        let d=0;
        while (d<item.counter) {
          this.$store.state.socket.emit('decrementCounterDrinks', {data: item.item});
          this.$store.state.cartCount -= 1;
          d += 1
        }
        this.$store.state.orderedDrinks.splice(index, 1);
        this.price=0;
        this.calculatePrice();
      }
      else if (item.item.category==5) {
        let s=0;
        while (s<item.counter) {
          this.$store.state.socket.emit('decrementCounterSides', {data: item.item});
          this.$store.state.cartCount -= 1;
          s +=1
        }
        this.$store.state.orderedSides.splice(index, 1);
        this.price=0;
        this.calculatePrice();
      }
      else {
        this.orderedBurgers.splice(index, 1);
        this.$store.state.orderedBurgers.splice(index, 1);
        this.$store.state.cartCount -= 1;
        this.price=0;
        this.calculatePrice()
      }
    },
    EditItem: function (item, index) {
      if (item.item.category===6) {
        this.$store.state.drinks=item.item;
        this.$store.state.socket.emit('popup', {data: 'Drinks', counter:item.counter});
        this.$store.state.orderedDrinks.splice(index, 1);
        this.price=0;
        this.calculatePrice();
      }
      else if (item.item.category===5) {
        this.$store.state.sides=item.item;
        this.$store.state.socket.emit('popup', {data: 'Sides', counter:item.counter});
        this.$store.state.orderedSides.splice(index, 1);
        console.log(this.$store.state.orderedSides.length);
        this.price=0;
        this.calculatePrice();
      }
      this.$router.push({ name: "Popup" })
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
      let k=0
      while ( k < this.orderedBurgers.length) {
        this.RemoveItem(this.orderedBurgers[k],k);}
      let l=0;
      while (l < this.OrderedPremadeBurgers.length) {
        this.RemoveItem(this.OrderedPremadeBurgers[l].item,l);
      }
      this.price=0

    },
    placeOrder: function () {
      //Wrap the order in an object
      let chosenIngredients=[];
      // chosenIngredients.push(this.OrderedBurger);
      for (var i = 0; i < this.OrderedDrinks.length; i++) {
        let countD=0;
        while (countD<this.OrderedDrinks[i].counter) {
          chosenIngredients.push(this.OrderedDrinks[i].item);
          countD += 1
        }
      }
      for (var j = 0; j < this.OrderedSides.length; j++) {
        let countS=0;
        while (countS<this.OrderedSides[j].counter) {
          chosenIngredients.push(this.OrderedSides[j].item);
          countS += 1
        }
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
      for (var p = 0; p < this.OrderedPremadeBurgers.length; p++) {
        chosenIngredients.push(this.OrderedPremadeBurgers[p].bun);
        chosenIngredients.push(this.OrderedPremadeBurgers[p].protein);
        for (var v = 0; v < this.OrderedPremadeBurgers[b].vegetables.length; v++) {
          chosenIngredients.push(this.OrderedPremadeBurgers[b].vegetables[v])
        }
        for (var s = 0; s < this.OrderedPremadeBurgers[b].sauces.length; s++) {
          chosenIngredients.push(this.OrderedPremadeBurgers[b].sauces[s])
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
        let countD=0;
        while (countD<this.OrderedDrinks[i].counter) {
          this.price += this.OrderedDrinks[i].item.selling_price;
          countD += 1
        }
      }
      for (var j = 0; j < this.OrderedSides.length; j++) {
        let countS=0;
        while (countS<this.OrderedSides[j].counter) {
          this.price += this.OrderedSides[j].item.selling_price;
          countS += 1
        }
      }
      for (var k = 0; k < this.orderedBurgers.length; k++) {
        this.price += this.orderedBurgers[k].price
      }
      for (var l = 0; l < this.OrderedPremadeBurgers.length; l++) {
        this.price += this.OrderedPremadeBurgers[l].price;
        console.log(this.OrderedPremadeBurgers[l].price)
      }
    },
    editBurger: function(item, index) {
      if (item.item.category === 7) {
        this.$store.state.selectedPremadeBurger.push(item.item);
        this.$store.state.selectedPremadeBurger.push(item.bun);
        this.$store.state.selectedPremadeBurger.push(item.protein);
        for (var i = 0; i < item.vegetables.length; i++) {
          this.$store.state.selectedPremadeBurger.push(item.vegetables[i])
        }
        for (var j = 0; j < item.sauces.length; j++) {
          this.$store.state.selectedPremadeBurger.push(item.sauces[j])
        }
        this.$store.state.selectedPremadeBurger.push(item.price);
        this.RemoveItem(item.item, index);
        this.$store.state.socket.emit('popup', {data: 'PremadeBurger', counter: 1});
      }
      else {
        this.$store.state.selectedBurger.push(item.bun);
        this.$store.state.selectedBurger.push(item.protein);
        for (var i = 0; i < item.vegetables.length; i++) {
          this.$store.state.selectedBurger.push(item.vegetables[i])
        }
        for (var j = 0; j < item.sauces.length; j++) {
          this.$store.state.selectedBurger.push(item.sauces[j])
        }
        for (var j = 0; j < item.extras.length; j++) {
          this.$store.state.selectedBurger.push(item.extras[j])
        }
        this.$store.state.selectedBurger.push(item.price);
        this.RemoveItem(item, index);
        this.$store.state.socket.emit('popup', {data: 'CustomBurger', counter: 1});
      }
      this.$router.push({ name: 'Popup' });
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

.drink-wrapper {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%
}
</style>
