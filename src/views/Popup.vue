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
          <div id="item_name" v-if="itemCategory!= 'CustomBurger'" style="font-weight:bold; font-size:2vw; margin-bottom:10px"> {{ menuItem["ingredient_" +lang] }} </div>
          <div><img id="image" v-bind:src="menuItem.image" width="50%"></div>
          <div style="padding-top:2%"><span><button v-if="this.cart==false" v-on:click='decrement(menuItem)' style="font-size:1vw">-</button>
            <span :id="counterID" style="font-size:1.5vw">{{this.counter}}</span>
            <button v-if="this.cart==false" v-on:click='increment(menuItem)' style="font-size:1vw">+</button></span></div>
        </div>
        <div id='half2'>
          <div class='icons' v-if="itemCategory!= 'CustomBurger'" >
          <div v-if="menuItem.milk_free" v-on:click="clickInfo('lactose')" id='info'>
            <img src="../assets/milkfree.png" class="icon">
            <p v-if='showLactose'><span class="popuptext" id="myInfo">This item is lactose-free</span></p>
          </div>
          <div v-if="menuItem.gluten_free" v-on:click="clickInfo('gluten')" id='info'>
            <img src="../assets/glutenfree.png" class="icon">
            <p v-if='showGluten'><span class="popuptext" id="myInfo">This item is gluten-free</span></p>
          </div>
          <div v-if="menuItem.vegan" v-on:click="clickInfo('vegan')" id='info'>
            <img src="../assets/vegan.png" class="icon">
            <p v-if='showVegan'><span class="popuptext" id="myInfo">This item is vegan</span></p>
          </div></div>
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
              <p v-if="extras.length>0">{{ uiLabels.extras }}:
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
      burgerIngredients: [],
      bun: Object,
      protein:Object,
      vegetables: Array,
      sauces: Array,
      extras: Array,
      orderedBurgers: [],
      cart: false,
      counterID: "counter",
      premadeBurgerNo: 0,
      ingredients: this.$store.state.ingredients
    };
  },
  created: function() {
    this.clear();
    this.$store.state.socket.on('openPopup', function (data) {
      if (data.data=='CustomBurger') {
        this.clear();
        this.itemCategory='CustomBurger';
        this.orderedBurgers=this.$store.state.orderedBurgers;
        let number=0
        number= this.orderedBurgers.length+1
        this.title=this.uiLabels.customBurger +' '+ number;
        this.burgerIngredients=this.$store.state.selectedBurger;
        for (var j = 0; j < this.burgerIngredients.length; j++) {
          if (this.burgerIngredients[j].category===4) {
            this.bun=this.burgerIngredients[j];
            this.menuItem=this.bun
          }
          else if (this.burgerIngredients[j].category===1) {
            this.protein=this.burgerIngredients[j]
          }
          else if (this.burgerIngredients[j].category===2) {
            let vegetable=true
            for (var k = 0; k < this.vegetables.length; k++) {
              vegetable=true
              if (this.burgerIngredients[j].ingredient_id === this.vegetables[k].ingredient_id) {
                this.extras.push(this.burgerIngredients[j]);
                vegetable=false;
                break
              }
            }
            if (vegetable===true){this.vegetables.push(this.burgerIngredients[j])}
          }
          else if (this.burgerIngredients[j].category===3) {
            this.sauces.push(this.burgerIngredients[j])
          }
        }
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
        this.clear();
        this.cart=data.cart;
        if (this.cart==true) {
          this.counterID="counterCart"
        }
        else {
          this.counterID="counter"
        }
        this.itemCategory='PremadeBurger';
        console.log(this.ingredients.length);
        this.menuItem=this.$store.state.selectedPremadeBurger.item;
        let burger_vegetables= [];
        burger_vegetables=this.menuItem.burger_vegetables.split(',');
        let burger_sauces= [];
        burger_sauces=this.menuItem.burger_sauces.split(',');
        for (var i = 0; i < this.ingredients.length; i++) {
          if (this.ingredients[i].ingredient_id===this.menuItem.burger_bun)
          {this.bun=this.ingredients[i]}
          else if (this.ingredients[i].ingredient_id===this.menuItem.burger_protein) {
            this.protein=this.ingredients[i]}
          else if (this.ingredients[i].category==2)
          {
          for (var v = 0; v < burger_vegetables.length; v++) {
            if (this.ingredients[i].ingredient_id==parseInt(burger_vegetables[v])) {
              this.vegetables.push(this.ingredients[i]);
          }}}
          else if (this.ingredients[i].category==3){
          for (var s = 0; s < burger_sauces.length; s++) {
          if (this.ingredients[i].ingredient_id==parseInt(burger_sauces[s])) {
            this.sauces.push(this.ingredients[i])}
          }
          }
          else {
              if (this.cart==true) {
                this.premadeBurgerNo=this.$store.state.selectedPremadeBurger.count;
                console.log(this.premadeBurgerNo)
              }
            }
        }
        if (this.cart==false) {
          this.title=this.uiLabels.premade_burger+' '+(this.$store.state.orderedPremadeBurgers.length+1);
        }
        else {
          this.title=this.uiLabels.premade_burger+' '+(this.premadeBurgerNo);
        }
        // for (var i = 0; i < this.$store.state.selectedPremadeBurger.length; i++) {
        //   if (this.$store.state.selectedPremadeBurger[i].category===7) {
        //     this.menuItem=this.$store.state.selectedPremadeBurger[i];
        //     console.log(this.menuItem.category);
        //   }
        //   else if (this.$store.state.selectedPremadeBurger[i].category===4) {
        //     this.bun=this.$store.state.selectedPremadeBurger[i]
        //   }
        //   else if (this.$store.state.selectedPremadeBurger[i].category===1) {
        //     this.protein=this.$store.state.selectedPremadeBurger[i]
        //   }
        //   else if (this.$store.state.selectedPremadeBurger[i].category===2) {
        //     this.vegetables.push(this.$store.state.selectedPremadeBurger[i])
        //   }
        //   else if (this.$store.state.selectedPremadeBurger[i].category===3) {
        //     this.sauces.push(this.$store.state.selectedPremadeBurger[i])
        //   }
        //   else {
        //     if (this.cart==true) {
        //       this.premadeBurgerNo=this.$store.state.selectedPremadeBurger[i];
        //       console.log(this.premadeBurgerNo)
        //     }
        //   }
        // }
        this.calculatePrice()
      }
      this.counter = data.counter;
      console.log(this.itemCategory);
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
      this.burgerIngredients= {};
      this.bun= {};
      this.protein={};
      this.vegetables= [];
      this.sauces= [];
      this.extras= [];
      this.premadeBurgerNo= 0
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
      if (this.itemCategory=='CustomBurger') {
        this.$store.state.selectedBurger.splice(0, this.$store.state.selectedBurger.length);
        console.log(this.$store.state.selectedBurger.length)}
      else if (this.itemCategory=='PremadeBurger') {
        this.$store.state.selectedPremadeBurger={}
      }
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
        let j=0
        while (j < this.counter) {
          let burger={};
          burger={item: '', bun: this.bun, protein: this.protein, vegetables: this.vegetables, sauces: this.sauces, extras: this.extras, price: this.price};
          this.$store.state.orderedBurgers.push(burger);
          this.$store.state.cartCount += 1;
          j += 1
        console.log('save');}
        this.$store.state.selectedBurger.splice(0, this.$store.state.selectedBurger.length);
      }
      else if (this.menuItem.category === 5) {

          this.$store.state.orderedSides.push({item: this.menuItem, counter: this.counter});
        let i=0;
        while (i < this.counter) {
          this.$store.state.cartCount += 1;
          i += 1
        }
      }
      else if (this.menuItem.category === 6) {
          this.$store.state.orderedDrinks.push({item: this.menuItem, counter: this.counter});
          let i=0;
          while (i < this.counter) {
            this.$store.state.cartCount += 1;
            i += 1
          }
      }
      else if (this.itemCategory =='PremadeBurger') {
        let count=0;
        for (var j = 0; j < this.$store.state.orderedPremadeBurgers.length; j++) {
          if (this.$store.state.orderedPremadeBurgers[j].item.ingredient_id==this.menuItem.ingredient_id) {
            count += 1
          }
        }
        let number=0;
        if (this.cart==true) {
          number=this.counter
        }
        else {
          number=this.counter-count
        }
        let i=0;
        while (i < number) {
          console.log('save PremadeBurger');
          let burger= {};
          if (this.cart==true) {
            burger={item: this.menuItem, bun: this.bun, protein: this.protein, vegetables: this.vegetables, sauces: this.sauces, price: this.price, count: this.premadeBurgerNo};
          }
          else {
            if (count == 0 ) {
              this.premadeBurgerNo=i+1}
            else {
              this.premadeBurgerNo=count+1
            }
            burger={item: this.menuItem, bun: this.bun, protein: this.protein, vegetables: this.vegetables, sauces: this.sauces, price: this.price, count: this.premadeBurgerNo}
          }
          this.$store.state.orderedPremadeBurgers.push(burger);
          this.$store.state.cartCount += 1;

          i += 1
        }
        this.$store.state.selectedPremadeBurger={};
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
  width: 70%;
  float:left
}

.icons {
  margin-top: 5%;
  display:grid;
  grid-template-columns: 33% 33% 33%;
  margin-left: 10%;
  margin-right: 10%;
  width: 30%
}

.popuptext {
  width: 250%;
  left: 25%
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

.price {
  font-size: 1.5vw;
  font-weight: bold;
  padding-top: 5%;
}

#counter {
  margin-left: 8%;
  border-color: grey;
  border-width: medium;
}

#counterCart {
  margin-left: 23%
}

.ingredients {
  border-style:dashed;
  width: 70%;
  margin-top: 5%;
  font-size: 1.2vw
}

.ingredients button {
  font-size: 1vw;
  text-align: center;
  width: 8%
}

@media (max-width: 600px) {
  #image {
    padding-left: 5%
  }
  #item_name {
    padding-left: 5%
  }
  .ingredients {
    margin-top: 5%
  }
  .price {
    padding-top: 5%
  }
}

.wrapper {
  padding-top:0
}

</style>
