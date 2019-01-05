<template>
  <div v-on:popup='set(data,title)'>
    <NavBar
      nextRoute=""
      backRoute=""
      :showCart="Boolean.false">
      <h1 slot="center-component">  {{ this.title }}</h1>
    </NavBar>
    <div class='OrderItem'>
      <div class='wrapper'>
        <div id='half1'>
          <div v-if="itemCategory!= 'CustomBurger'" style="font-weight:bold; font-size:2vw; margin-bottom:10px"> {{ menuItem["ingredient_" +lang] }} </div>
          <div><img v-bind:src="menuItem.image" width="50%"></div>
          <div><span><button v-on:click='decrement(menuItem)' style="font-size:1vw">-</button>
            <span id='counter' style="font-size:1.5vw">{{this.counter}}</span>
            <button v-on:click='increment(menuItem)' style="font-size:1vw">+</button></span></div>
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
          <div v-if="itemCategory === 'CustomBurger' || itemCategory==='PremadeBurger'" class='ingredients'>
            <div style="padding-left: 5px; padding-right: 5px">
              <p style="font-weight: bold; font-size: 1.6vw">{{ uiLabels.ingredients }}: </p>
              <p>{{ uiLabels.bun }}: {{ bun["ingredient_"+lang] }}</p>
              <p>{{ uiLabels.protein }}: {{ protein['ingredient_'+lang]}}
                <span v-if="protein.addi_cost>0"> (+ {{ protein.addi_cost }} kr)</span></p>
              <p>{{ uiLabels.vegetables }}:
                <ul v-for="item in vegetables" :key="item.ingredient_id">
                  <li>{{ item['ingredient_'+lang] }} <span v-if="item.addi_cost>0"> (+ {{ item.addi_cost }} kr)</span><span v-if="vegetables.length>0"> <button v-on:click="removeIngredient('vegetables', item)"> x </button></span></li>
                </ul></p>
              <p>{{ uiLabels.sauces }}:
                <ul v-for="item in sauces" :key="item.ingredient_id">
                  <li>{{ item['ingredient_'+lang] }} <span v-if="item.addi_cost>0"> (+ {{ item.addi_cost }} kr)</span><span v-if="sauces.length>0"> <button v-on:click="removeIngredient('sauces', item)"> x </button></span></li>
                </ul></p>
              <p>{{ uiLabels.extras }}:
                <ul v-for="item in extras" :key="item.ingredient_id">
                  <li>{{ item['ingredient_'+lang] }} <span v-if="item.addi_cost>0"> (+ {{ item.addi_cost }} kr)</span><span v-if="extras.length>0"> <button v-on:click="removeIngredient('extras', item)"> x </button></span></li>
                </ul></p>
            </div>
          </div>

          <!-- <div v-if="itemCategory === 'PremadeBurger'" class='ingredients'>
            <div style="padding-left: 5px; padding-right: 5px">
              <p style="font-weight: bold; font-size: 16pt">{{ uiLabels.PremadeBurgerIngredients }}: </p>
              <p>{{ uiLabels.bun }}: {{ bun }}</p>
              <p>{{ uiLabels.protein }}: {{ protein }}</p>
              <p>{{ uiLabels.vegetables }}: {{ vegetables }}</p>
              <p>{{ uiLabels.sauces }}: {{ sauces }}</p>
            </div>
          </div> -->

          <div class="price">
            <p>{{ uiLabels.price }}:
              <span v-if="itemCategory === 'CustomBurger' || itemCategory==='PremadeBurger'">{{ price }} kr</span>
              <span v-else >{{ menuItem.selling_price }} kr</span></p>
            <p>{{ uiLabels.sum }}:
              <span v-if="itemCategory === 'CustomBurger' || itemCategory==='PremadeBurger'">{{ price*counter }} kr</span>
              <span v-else >{{ menuItem.selling_price*this.counter }} kr</span></p>
          </div>
        </div>
      </div>
      <button id='btn' v-on:click="confirm('Cart')">{{ uiLabels.finish_order }}</button>
      <button id='btn' v-on:click="cancelItem()">{{ uiLabels.cancel }}</button>
      <button id='btn' v-on:click="confirm('MainMenu')">{{ uiLabels.confirm }}</button>


    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import sharedVueStuff from "@/components/sharedVueStuff.js";
require('@/assets/globalCSS.css')
export default {
  name: "Popup",
  components: {
    NavBar,

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
      ingredients: Object,
      bun: Object,
      protein:Object,
      vegetables: Array,
      sauces: Array,
      extras: Array,
      orderedBurgers: [],
    };
  },
  created: function() {
    this.clear();
    this.$store.state.socket.on('openPopup', function (data) {
      if (data.data=='CustomBurger') {
        this.menuItem=this.$store.state.selectedBurger.bun;
        this.itemCategory='CustomBurger';
        this.orderedBurgers.push(Object.assign({}, this.$store.state.orders));
        this.title=this.uiLabels.customBurger +' '+ this.orderedBurgers.length;
        this.ingredients=this.$store.state.orders;

        this.bun=this.$store.state.selectedBurger.bun;
        this.protein=this.$store.state.selectedBurger.protein;
        this.vegetables=this.$store.state.selectedBurger.vegetables;
        this.sauces=this.$store.state.selectedBurger.sauces;
        this.extras=this.$store.state.selectedBurger.extras;
        this.calculatePrice();
        // this.ingredients= {bun: this.$s tore.state.selectedBurger.buns, protein: this.$store.state.selectedBurger.protein, vegetables: this.$store.state.selectedBurger.vegetables, sauces: this.$store.state.selectedBurger.sauces, extras: this.$store.state.selectedBurger.extras};
      }
      else if (data.data=='Drinks') {
        this.menuItem=this.$store.state.drinks;
        this.itemCategory='Drinks';
        this.title=this.uiLabels.drink +' '+(this.$store.state.orderedDrinks.length+1);
      }
      else if (data.data=='Sides'){
        this.menuItem=this.$store.state.sides;
        this.itemCategory='Sides';
        this.title=this.uiLabels.side +' '+(this.$store.state.orderedSides.length+1);
      }
      else if (data.data=='PremadeBurger') {
        this.menuItem=this.$store.state.premadeBurgerName;
        console.log(this.menuItem.category);
        this.itemCategory='PremadeBurger';
        this.title=this.uiLabels.premade_burgers;
        //this.ingredients=this.$store.state.premadeBurgerIngredients;
        this.bun=this.$store.state.selectedBurger.bun;
        this.protein=this.$store.state.selectedBurger.protein;
        this.vegetables=this.$store.state.selectedBurger.vegetables;
        this.sauces=this.$store.state.selectedBurger.sauces;
        this.calculatePrice()
      }
      this.counter = data.counter;
      console.log(this.itemCategory)
    }.bind(this));
  },
  methods: {
    clear: function() {
      this.price= 0;
      this.counter=0;
      this.menuItem= {};
      this.showVegan= false;
      this.showGluten= false;
      this.showLactose= false;
      this.itemCategory= "";
      this.title= "";
      this.ingredients= {};
      this.bun= {};
      this.protein={};
      this.vegetables= [];
      this.sauces= [];
      this.extras= []
    },
    calculatePrice: function() {
      this.price=0;
      this.price=this.bun.selling_price + this.protein.selling_price;
      for (var i = 0; i < this.vegetables.length; i++) {
        this.price += this.vegetables[i].selling_price;
      }
      for (var j = 0; j < this.sauces.length; j++) {
        this.price += this.sauces[j].selling_price;
      }
      for (var k = 0; k < this.extras.length; k++) {
        this.price += this.extras[k].selling_price;
      }
    },

    cancelItem: function(){
      let i=0;
      while (i < this.counter) {
        this.decrement(this.menuItem);
      }
      if (this.itemCategory=='CustomBurger' || this.itemCategory==='PremadeBurger') {
        this.$store.state.selectedBurger.vegetables.splice(0, this.$store.state.selectedBurger.vegetables.length);
        this.$store.state.selectedBurger.sauces.splice(0, this.$store.state.selectedBurger.sauces.length);
        this.$store.state.selectedBurger.extras.splice(0, this.$store.state.selectedBurger.extras.length);}
      this.$router.push({ name: "MainMenu" });
    },
    increment: function(item) {
      this.counter +=1;
      if (this.itemCategory=='Drinks')
      {this.$store.state.socket.emit("incrementCounterDrinks", {data: item})}
      else if (this.itemCategory=='Sides')
      {this.$store.state.socket.emit('incrementCounterSides', {data: item})}
      else if (this.itemCategory=='PremadeBurger')
      {this.$store.state.socket.emit('incrementCounterPremadeBurgers', {data: item})}
    },
    decrement: function(item) {
      if (this.counter==0) {return}
      else this.counter -=1;
      if (this.itemCategory=='Drinks')
      {this.$store.state.socket.emit('decrementCounterDrinks', {data: item})}
      else if (this.itemCategory=='Sides')
      {this.$store.state.socket.emit('decrementCounterSides', {data: item})}
      else if (this.itemCategory=='PremadeBurger')
      {this.$store.state.socket.emit('decrementCounterPremadeBurgers', {data: item})}
    },
    confirm: function(route) {
      if (this.itemCategory=='CustomBurger') {
        for (var j = 0; j < this.counter; j++) {
        this.$store.commit('changeOrders', {
          type: 'buns',
          value: Object(this.bun)
        });
        this.$store.commit('changeOrders', {
          type: 'protein',
          value: Object(this.protein)
        });
        let orderedVeggies= [];
        for (var i = 0; i < this.vegetables.length; i++) {
          orderedVeggies.push(this.vegetables[i]);
        }
        this.$store.commit('changeOrders', {
          type: 'vegetables',
          value: orderedVeggies
        });
        let orderedSauces= [];
        for (var l = 0; l < this.sauces.length; l++) {
          orderedSauces.push(this.sauces[l]);
        }
        this.$store.commit('changeOrders', {
          type: 'sauces',
          value: orderedSauces
        });
        let orderedExtras= [];
        for (var k = 0; k < this.extras.length; k++) {
          orderedExtras.push(this.extras[k]);
        }
        this.$store.commit('changeOrders', {
          type: 'extras',
          value: orderedExtras
        });
        this.$store.commit('changeOrders', {
          type: 'price',
          value: this.price
        });
        // this.$store.commit('toggleFinish');
        // this.$store.commit('toggleClose');
        // this.$store.commit('toggleFinish');
        console.log('save');}
        this.$store.state.selectedBurger.vegetables.splice(0, this.$store.state.selectedBurger.vegetables.length);
        this.$store.state.selectedBurger.sauces.splice(0, this.$store.state.selectedBurger.sauces.length);
        this.$store.state.selectedBurger.extras.splice(0, this.$store.state.selectedBurger.extras.length);
        // this.$store.commit('toggleClose');
        // this.$store.commit('toggleFinish');
      }
      else if (this.menuItem.category === 5) {
        let i=0;
        while (i < this.counter) {
          this.$store.state.orderedSides.push(this.menuItem);
          i += 1
        }
      }
      else if (this.menuItem.category === 6) {
        let i=0;
        while (i < this.counter) {
          this.$store.state.orderedDrinks.push(this.menuItem);
          i += 1
        }
      }
      else if (this.itemCategory =='PremadeBurger') {
        let i=0;
        while (i < this.counter) {
          console.log('save PremadeBurger');
          this.$store.commit('changePremadeBurger', {
            type: 'item',
            value: Object(this.menuItem)
          });
          console.log(this.$store.state.orderedPremadeBurgers.item.ingredient_en);
          this.$store.state.orderedPremadeBurgers.price= this.price;
          // this.$store.state.orderedPremadeBurgers.item= this.menuItem;
          this.$store.state.orderedPremadeBurgers.buns= this.bun;
          this.$store.state.orderedPremadeBurgers.protein= this.protein;
          this.$store.state.orderedPremadeBurgers.vegetables= this.vegetables;
          this.$store.state.orderedPremadeBurgers.sauces= this.sauces;
          console.log(this.$store.state.orderedPremadeBurgers.protein.ingredient_en);
          i += 1
        }
        this.$store.state.selectedBurger.vegetables.splice(0, this.$store.state.selectedBurger.vegetables.length);
        this.$store.state.selectedBurger.sauces.splice(0, this.$store.state.selectedBurger.sauces.length);
        this.$store.state.selectedBurger.extras.splice(0, this.$store.state.selectedBurger.extras.length);
      }
      this.$router.push({ name: route });
    },
    clickInfo: function(category) {
      if (category=='lactose'){
        if(this.showLactose==false) {
          if (this.showGluten==true) {
            this.showGluten=false
          }
          if (this.showVegan==true) {
            this.showVegan=false
          }
          this.showLactose=true
        }
        else this.showLactose=false }
      else if (category=='gluten') {
        if(this.showGluten==false) {
          if (this.showLactose==true) {
            this.showLactose=false
          }
          if (this.showVegan==true) {
            this.showVegan=false
          }
          this.showGluten=true
        }
        else this.showGluten=false }
      else
        if(this.showVegan==false) {
          if (this.showGluten==true) {
            this.showGluten=false
          }
          if (this.showLactose==true) {
              this.showLactose=false
          }
          this.showVegan=true
        }
        else this.showVegan=false
    },
    removeIngredient: function(type, ingredient) {
      if (type=='vegetables') {
        var v=0;
        while (v < this.vegetables.length) {
          if (this.vegetables[v].ingredient_id == ingredient.ingredient_id) {
            break
          }
          v += 1;
        }
        this.vegetables.splice(v, 1);
      }
      else if (type=='sauces') {
        var s=0;
        while (s < this.sauces.length) {
          if (this.sauces[s].ingredient_id == ingredient.ingredient_id) {
            break
          }
          s += 1;
        }
        this.sauces.splice(s, 1);
      }
      else if (type=='extras') {
        var e=0;
        while (e < this.extras.length) {
          if (this.extras[e].ingredient_id == ingredient.ingredient_id) {
            break
          }
          e+= 1;
        }
        this.extras.splice(e, 1);
      }
      this.calculatePrice();
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
  font-weight: bold;
}

.icon{
  width: 40%;
  float:left
}

.icons {
  display:grid;
  grid-template-columns: 33% 33% 33%;
  margin-left: 10%;
  margin-right: 10%;
  position: absolute;
  top: 15%;
}

@media screen and (max-width: 1100px) {
  .icons{
    top:10%
  }
}

/*@media (max-width: 600px) {
  .icons{
    top:15%
  }
} */

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

.price {
  font-size: 1.5vw;
  font-weight: bold;
  padding-top: 70px;
}

#counter {
  margin-left: 8%;
  border-color: grey;
  border-width: medium;
}

.ingredients {
  border-style:dashed;
  width: 70%;
  margin-top: 70px;
  font-size: 1.2vw
}

.ingredients button {
  font-size: 1vw;
  text-align: center;
  width: 8%
}

</style>
