<template>
  <div v-on:popup='set(data,title)'>
    <NavBar
    nextRoute=""
    backRoute="MainMenu"
    :showCart="Boolean.false">
      <h1 slot="center-component">  {{ this.title }}</h1>
    </NavBar>
    <div class='OrderItem'>
      <div class='wrapper'>
        <div id='half1'>
          <div v-if="itemCategory!= 'CustomBurger'" style="font-weight:bold; font-size:16pt; margin-bottom:10px"> {{ menuItem["ingredient_" +lang] }} </div>
          <div><img v-bind:src="menuItem.image" width="50%"></div>
          <div><span><button v-on:click='decrement(menuItem)'>-</button>
            <span id='counter'>{{this.counter}}</span>
            <button v-on:click='increment(menuItem)'>+</button></span></div>
        </div>
        <div id='half2'>
          <div class='icons'>
          <span v-if="menuItem.milk_free" v-on:click="clickInfo('lactose')" id='info'>
            <img src="../assets/milkfree.png" class="icon">
            <p v-if='showLactose'><span class="popuptext" id="myInfo">This item is lactose-free</span></p>
          </span>
          <span v-if="menuItem.gluten_free" v-on:click="clickInfo('gluten')" id='info'>
            <img src="../assets/glutenfree.png" class="icon">
            <p v-if='showGluten'><span class="popuptext" id="myInfo">This item is gluten-free</span></p>
          </span>
          <span v-if="menuItem.vegan" v-on:click="clickInfo('vegan')" id='info'>
            <img src="../assets/vegan.png" class="icon">
            <p v-if='showVegan'><span class="popuptext" id="myInfo">This item is vegan</span></p>
          </span></div>
          <div v-if="itemCategory === 'CustomBurger'" class='ingredients'>
            <div style="padding-left: 5px; padding-right: 5px">
            <p style="font-weight: bold; font-size: 16pt">{{ uiLabels.ingredients }}: </p>
            <p>{{ uiLabels.bun }}: {{ ingredients.buns["ingredient_"+lang] }}</p>
            <p>{{ uiLabels.protein }}: {{ ingredients.protein['ingredient_'+lang]}}</p>
            <p>{{ uiLabels.vegetables }}:
              <ul v-for="item in ingredients.vegetables" :key="item.ingredient_id">
                <li>{{ item['ingredient_'+lang] }}</li>
              </ul></p>
            <p>{{ uiLabels.sauces }}:
              <ul v-for="item in ingredients.sauces" :key="item.ingredient_id">
                <li>{{ item['ingredient_'+lang] }}</li>
              </ul></p>
            <p>{{ uiLabels.extras }}:
              <ul v-for="item in ingredients.extras" :key="item.ingredient_id">
                <li>{{ item['ingredient_'+lang] }}</li>
              </ul></p></div>
          </div>
          <div class="price">
            <p>{{ uiLabels.price }}: {{ menuItem.selling_price }} kr</p>
            <p>{{ uiLabels.sum }}: {{ menuItem.selling_price*this.counter }} kr </p>
          </div>
        </div>
      </div>
      <button id='btn' v-on:click="confirm('Cart')">{{ uiLabels.finish }}</button>
      <button id='btn' v-on:click="cancelItem()">{{ uiLabels.cancel }}</button>
      <button id='btn' v-on:click="confirm('MainMenu')">{{ uiLabels.confirm }}</button>


    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import sharedVueStuff from "@/components/sharedVueStuff.js";
import SplitPage from "@/components/SplitPage.vue";
require('@/assets/globalCSS.css')
export default {
  name: "Popup",
  components: {
    NavBar,
    SplitPage

  },
  mixins: [sharedVueStuff],
  data: function() {
    return {
      price: Number,
      counter:0,
      menuItem: Object,
      showVegan: false,
      showGluten: false,
      showLactose: false,
      itemCategory: String,
      title: String,
      ingredients: {}
    };
  },
  created: function() {
    this.$store.state.socket.on('openPopup', function (data) {
      if (data.data=='CustomBurger') {
        this.menuItem=this.$store.state.orders.buns;
        this.itemCategory='CustomBurger';
        this.title=this.uiLabels.customBurger;
        this.ingredients=this.$store.state.orders;
        // this.ingredients= {bun: this.$store.state.orders.buns, protein: this.$store.state.orders.protein, vegetables: this.$store.state.orders.vegetables, sauces: this.$store.state.orders.sauces, extras: this.$store.state.orders.extras};
      }
      else if (data.data=='Drinks') {
        this.menuItem=this.$store.state.drinks;
        this.itemCategory='Drinks';
        this.title=this.uiLabels.drinks
      }
      this.counter = data.counter;
    }.bind(this));
  },
  computed: {

  },
  methods: {
    NextPage: function() {

      this.$router.push({ name: "MainMenu" });
      //location.reload()
    },

    cancelItem: function(){
      let i=0;
      while (i < this.counter) {
        this.decrement(this.menuItem)
      }
      this.$router.push({ name: "MainMenu" });
    },
    increment: function(item) {
      this.counter +=1;
      this.$store.state.socket.emit('incrementCounter', {data: item})
    },
    decrement: function(item) {
      if (this.counter==0) {return}
      else this.counter -=1;
      this.$store.state.socket.emit('decrementCounter', {data: item})
    },
    confirm: function(route) {
      if (this.menuItem.category === 1) {}
      else if (this.menuItem.category === 5) {
        let i=0;
        while (i < this.counter) {
          this.$store.state.sides.push(this.menuItem);
          i += 1
        }
      }
      else if (this.menuItem.category === 6) {
        let i=0;
        while (i < this.counter) {
          this.$store.state.drinks.push(this.menuItem);
          i += 1
        }
      }
      this.$router.push({ name: route });
    },
    clickInfo: function(category) {
      if (category=='lactose'){
        if(this.showLactose==false) {this.showLactose=true}
        else this.showLactose=false }
      else if (category=='gluten') {
        if(this.showGluten==false) {this.showGluten=true}
        else this.showGluten=false }
      else
        if(this.showVegan==false) {this.showVegan=true}
        else this.showVegan=false
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
  font-weight: bold;
}

.icon{
  width: 3em;
  margin-right: 5%
}

.icons {
  margin-left: 20%
}

.wrapper {
  grid-template-columns: 50% 50%
}

#half1  {
  margin-left: 20%;
  margin-top: 5%
}

#half1 button {
  margin-top: 5%;
  margin-left: 8%
}

#info {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#myInfo {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

.popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

#info .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
@-webkit-keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}

.price {
  font-size: 16pt;
  font-weight: bold;
}

#counter {
  margin-left: 8%;
  border-color: grey;
  border-width: medium;
}

.ingredients {
  border-style:dashed;
  width: 70%
}

</style>
