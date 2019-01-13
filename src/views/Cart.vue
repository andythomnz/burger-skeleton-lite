<template>
  <div>
    <NavBar
    nextRoute=""
    backRoute="MainMenu"
    :showCart="Boolean.false">
      <h1 slot="center-component"><img src=@/assets/cart.png width=10%>  {{ uiLabels.cart }}</h1>
    </NavBar>
    <div class='order'>
      <h2 id="yourOrder">{{ uiLabels.yourOrder}}</h2>
      <h2 style='margin-top: 0'>{{ uiLabels.burgers }}</h2>
      <div style="width: 100%;height: auto;">
        <div class='item-wrapper' v-for="(orderedBurger, index) in orderedBurgers" :key="orderedBurger.bun['ingredient_id'] + index">
          <div>
            <img v-bind:src="orderedBurger.bun.image" width="5%" style="padding-right:3%">
            <span id='item_name'>Customized burger {{index+1}}</span>
            <button class='removeButton' id='btn' v-on:click="RemoveItem(orderedBurger, index)"> X </button>
            <button class='editButton' id='btn' v-on:click="editBurger(orderedBurger, index)">Edit</button>
            <span class="item-price">{{ orderedBurger.price }} kr</span>
          </div>
        </div>
        <div class='item-wrapper' v-for="(burger, index) in OrderedPremadeBurgers" :key="burger.item['ingredient_id'] +index">
          <div>
            <img v-bind:src="burger.item.image" width="5%" style="padding-right:3%">
            <span id="item_name">{{ burger.item["ingredient_"+lang] }} {{burger.count}}</span>
            <button class='removeButton' id='btn' v-on:click='RemoveItem(burger.item, index)'>X</button>
            <button class='editButton' id='btn' v-on:click="editBurger(burger, index)">Edit</button>
            <span class="item-price">{{ burger.price }} kr</span>
        </div>
      </div>
      </div>
      <h2>{{ uiLabels.drinks }}</h2>
      <p>
      <div class="item-wrapper">
        <div v-for="(item, index) in OrderedDrinks" :key="item.item.ingredient_id + index">
          <img
            v-bind:src="item.item.image"
            width="3%"
            style="padding-right:3%">
          <span id='item_name'>{{ item.item["ingredient_"+lang] }}</span>
          <span id='count' v-if="item.counter>1"> {{ item.counter }} </span>
          <button v-on:click='RemoveItem(item, index)' class='removeButton' id='btn'>X</button>
          <button v-on:click='EditItem(item, index)' class='editButton' id='btn'> Edit </button>
        <span class="item-price">{{ item.item.selling_price }} kr</span></div>
      </div></p>
      <h2>{{ uiLabels.sides }}</h2>
      <p><div class="item-wrapper" style="padding-bottom=3%">
        <div v-for="(item, index) in OrderedSides" :key="item.item.ingredient_id +index">
          <img
            v-bind:src="item.item.image"
            width="5%"
            style="padding-right:3%">
          <span id='item_name'>{{ item.item["ingredient_"+lang] }}</span>
          <span id='count' v-if="item.counter>1"> {{ item.counter }} </span>
          <button class='removeButton' id='btn' v-on:click='RemoveItem(item, index)'>X</button>
          <button class='editButton' id='btn' v-on:click='EditItem(item, index)'> Edit </button>
        <span class="item-price">{{ item.item.selling_price }} kr</span></div>
      </div></p>
      </div>
      <p style="font-weight:bold" class="price">{{ uiLabels.sum }}: {{ this.price }} kr</p>
      <button id='btn' class='btn' v-on:click="Cancel()">{{ uiLabels.cancelOrder }}</button>
      <button id='btn' class='btn' v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

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
        let countD=0;
        while (countD<item.counter) {
          this.$store.state.cartCount -= 1;
          countD += 1
        }
        this.price=0;
        this.calculatePrice();
      }
      else if (item.item.category===5) {
        this.$store.state.sides=item.item;
        this.$store.state.socket.emit('popup', {data: 'Sides', counter:item.counter});
        this.$store.state.orderedSides.splice(index, 1);
        let countS=0;
        while (countS<item.counter) {
          this.$store.state.cartCount -= 1;
          countS += 1
        }
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
        chosenIngredients.push(this.orderedBurgers[b].bun);
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
        for (var v = 0; v < this.OrderedPremadeBurgers[p].vegetables.length; v++) {
          chosenIngredients.push(this.OrderedPremadeBurgers[p].vegetables[v])
        }
        for (var s = 0; s < this.OrderedPremadeBurgers[p].sauces.length; s++) {
          chosenIngredients.push(this.OrderedPremadeBurgers[p].sauces[s])
        }
      }
      let order = {
        ingredients: chosenIngredients,
        price: this.price,
        type: this.$store.state.dO
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
        this.$store.state.selectedPremadeBurger={item: item.item, count: item.count};
        this.OrderedPremadeBurgers.splice(index, 1);
        this.$store.state.cartCount -= 1;
        this.price=0;
        this.calculatePrice();
        this.$store.state.socket.emit('popup', {data: 'PremadeBurger', counter: 1, cart: true});
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
#yourOrder {
  text-align: center;
  margin-bottom: 1%}

h2 {
  margin-bottom: 1%
}

.order{
  margin-left: 2%;
  font-size: 1.2vw;
  border-bottom-width:  5%;
  border-bottom-color: lightblue;
  border-bottom-style: outset;
  margin-bottom: 2%
}

.item-wrapper button {
  font-size: 0.7vw;
  width: 3%;
  text-align: center;
}

.price {
  position: absolute;
  right: 50%;
  font-size: 1.5vw;
  font-family: "Verdana";
  margin-top: -0.1%
}

.item-price {
  position: absolute;
  right: 52%;
  bottom: 35%
}

.item-wrapper {
  display: grid;
  grid-template-rows: auto;
}

.item-wrapper div{
  position: relative;
  border-style:inset;
  border-radius: 8px;
  border-color: rgb(253, 202, 124);
  background-color:rgb(255, 225, 185);
  padding: 0.5% 0 0.5% 2%;
  margin-bottom: 0.5%
}

.editButton {
  position: absolute;
  right: 35%;
  bottom: 35%;
}

.removeButton {
  position: absolute;
  right: 30%;
  bottom: 35%;
}

#count {
  position: absolute;
  right: 75%;
  bottom: 35%;
}

#item_name {
  padding-right:2%;
  position: absolute;
  bottom: 35%;
  text-transform: capitalize;
}

@media (max-width: 800px) {
  .item-wrapper button{
    font-size: 0.8vw;
    width: auto
  }
}


</style>
