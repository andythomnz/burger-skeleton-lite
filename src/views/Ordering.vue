<template>
  <div id="ordering">
    <NavBar>
    </NavBar>

    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <h1>{{ uiLabels.ingredients }}</h1>

    <Ingredient
      ref="ingredient"
      v-for="item in ingredients"
      v-on:increment="addToOrder(item)"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id">
    </Ingredient>

    <h1>{{ uiLabels.order }}</h1>
    {{ cartDisplay }}
    <br/>
    <button v-on:click="placeOrder()"><img class="cart-img" src="@/assets/cart.png">{{ uiLabels.placeOrder }}  {{ price }} kr</button>

    <h1>{{ uiLabels.ordersInQueue }}</h1>
    <div>
      <OrderItem
        v-for="(order, key) in orders"
        v-if="order.status !== 'done'"
        :order-id="Number(key)"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItem>
    </div>
  </div>
</template>
<script>

//import nav bar
import NavBar from '@/components/NavBar.vue'

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem,
    NavBar
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
    cartDisplay: "",
    commodity: {}
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
      
    var itemName = item["ingredient_sv"];
    if(itemName in this.commodity){
    this.commodity[itemName]+=1;
    }
    else{
    this.commodity[itemName]=1;
      }
    
    this.cartDisplay="";
    for(var i in this.commodity){
      this.cartDisplay += i+":"+this.commodity[i]+",";
    }
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
      this.$router.push({ name: "payment" })
    }
  }
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin:auto;
  width: 40em;
}

.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}
.ingredient {
  border: 1px solid #ccd;
  padding: 1em;
  background-image: url('~@/assets/exampleImage.jpg');
  color: white;
}
.cart-img {
  width: 15px;
  height: 15px;
}
</style>
