<template>
  <div>
    <NavBar
      nextRoute=""
      backRoute=""
      :showCart="Boolean.false">
      <h2 slot="center-component">  {{ this.title }}</h2>
    </NavBar>
    <div class='OrderItem'>
      <div class='wrapper'>
        <div id='half1'>
          <div id="item_name" v-if="itemCategory != 'CustomBurger'" style="font-weight:bold; font-size:2vw; margin-bottom:10px"> 
            {{ menuItem["ingredient_" +lang] }} 
          </div>
          <img id="image" v-bind:src="menuItem.image" width="50%">
          <div style="padding-top:2%">
            <span>
              <button v-if="this.cart==false" id='btn' v-on:click='decrement(menuItem)' style="font-size:0.8vw">
                -
              </button>
              <span :id="counterID">
                {{this.counter}}
              </span>
              <button v-if="this.cart==false" v-on:click='increment(menuItem)' id='btn' style="font-size:0.8vw">
                +
              </button>
            </span>
          </div>
        </div>
        <div id='half2'>
          <div class='icons' v-if="itemCategory!= 'CustomBurger'" >
            <div v-if="menuItem.milk_free" v-on:click="clickInfo('lactose')" id='info'>
              <img src="../assets/milkfree.png" class="icon">
              <p v-if='showLactose'><span class="popuptext" id="myInfo">{{ uiLabels.lactose }}</span></p>
            </div>
            <div v-if="menuItem.gluten_free" v-on:click="clickInfo('gluten')" id='info'>
              <img src="../assets/glutenfree.png" class="icon">
              <p v-if='showGluten'><span class="popuptext" id="myInfo">{{ uiLabels.gluten }}</span></p>
            </div>
            <div v-if="menuItem.vegan" v-on:click="clickInfo('vegan')" id='info'>
              <img src="../assets/vegan.png" class="icon">
              <p v-if='showVegan'><span class="popuptext" id="myInfo">{{ uiLabels.vegan }}</span></p>
            </div></div>
            <div v-if="itemCategory === 'CustomBurger' || itemCategory==='PremadeBurger'" class='ingredients'>
              <div style="padding-left: 5%">
                <p style="font-weight: bold; font-size: 1.5vw">{{ uiLabels.ingredients }}: </p>
                <p>{{ uiLabels.bun }}: {{ bun["ingredient_"+lang] }}</p>
                <p>{{ uiLabels.protein }}: {{ protein['ingredient_'+lang]}}
                  <span v-if="protein.addi_cost>0"> (+ {{ protein.addi_cost }} kr)</span></p>
                <p>{{ uiLabels.vegetables }}:
                  <ul v-for="item in vegetables" :key="item.ingredient_id">
                    <li>{{ item['ingredient_'+lang] }} <span v-if="item.addi_cost>0"> (+ {{ item.addi_cost }} kr)</span><span v-if="vegetables.length>0"> <button id='btn' v-on:click="removeIngredient('vegetables', item)">x</button></span></li>
                  </ul></p>
                <p>{{ uiLabels.sauces }}:
                  <ul v-for="item in sauces" :key="item.ingredient_id">
                    <li>{{ item['ingredient_'+lang] }} <span v-if="item.addi_cost>0"> (+ {{ item.addi_cost }} kr)</span><span v-if="sauces.length>0"> <button id='btn' v-on:click="removeIngredient('sauces', item)">x</button></span></li>
                  </ul></p>
                <p v-if="extras.length>0">{{ uiLabels.extras }}:
                  <ul v-for="item in extras" :key="item.ingredient_id">
                    <li>{{ item['ingredient_'+lang] }} <span v-if="item.addi_cost>0"> (+ {{ item.addi_cost }} kr)</span><span v-if="extras.length>0"> <button id='btn' v-on:click="removeIngredient('extras', item)">x</button></span></li>
                  </ul>
                </p>
              </div>
            </div>
          <div class="price">
            <p>{{ uiLabels.price }}:
              <span v-if="itemCategory === 'CustomBurger' || itemCategory==='PremadeBurger'">
                {{ price }} kr
              </span>
              <span v-else >
                {{ menuItem.selling_price }} kr
              </span>
            </p>
            <p>{{ uiLabels.sum }}:
              <span v-if="itemCategory === 'CustomBurger' || itemCategory==='PremadeBurger'">
                {{ price*counter }} kr
              </span>
              <span v-else >
                {{ menuItem.selling_price*this.counter }} kr
              </span></p>
          </div>
        </div>
      </div>
      <button id='btn' class='btn' v-on:click="confirm('Cart')">{{ uiLabels.finish_order }}</button>
      <button id='btn' class='btn' v-on:click="cancelItem()">{{ uiLabels.cancel }}</button>
      <button id='btn' class='btn' v-on:click="confirm('MainMenu')">{{ uiLabels.confirm }}</button>


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
      bun: Object,
      protein:Object,
      vegetables: Array,
      sauces: Array,
      extras: Array,
      orderedBurgers: [],
      cart: false,
      counterID: "counter",
      premadeBurgerNo: 0,
      burgerNo: 0,
      Bcart: false
    };
  },
  created: function() {
    this.clear();
    this.$store.state.socket.on('openPopup', function (data) {
      if (data.data=='CustomBurger') {
        this.Bcart=data.cart;
        this.clear();
        this.itemCategory='CustomBurger';
        this.orderedBurgers=this.$store.state.orderedBurgers;
        let ingredients=[];
        ingredients=this.$store.state.selectedBurger;
        for (var j = 0; j < ingredients.length; j++) {
          if (ingredients[j].category===4) {
            this.bun=ingredients[j];
            this.menuItem=this.bun
          }
          else if (ingredients[j].category===1) {
            this.protein=ingredients[j]
          }
          else if (ingredients[j].category===2) {
            let vegetable=true
            for (var k = 0; k < this.vegetables.length; k++) {
              vegetable=true
              if (ingredients[j].ingredient_id === this.vegetables[k].ingredient_id) {
                this.extras.push(ingredients[j]);
                vegetable=false;
                break
              }
            }
            if (vegetable===true){this.vegetables.push(ingredients[j])}
          }
          else if (ingredients[j].category===3) {
            this.sauces.push(ingredients[j])
          }
          else {
            if (this.Bcart==true) {
            this.burgerNo=ingredients[j];
            console.log(this.burgerNo);}}
          let number=0
          if (this.Bcart==true) {
            number=this.burgerNo
          }
          else {
            number= this.orderedBurgers.length+1
          }
          this.title=this.uiLabels.customBurger +' '+ number;

        }

        this.calculatePrice();
      }
      else if (data.data =='Drinks') {
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
        let ingredients= [];
        ingredients=this.$store.state.selectedPremadeBurger;
        for (var i = 0; i < ingredients.length; i++) {
          if (ingredients[i].category===7)
          {this.menuItem=ingredients[i]}
          else if (ingredients[i].category===4) {
            this.bun=ingredients[i]}
          else if (ingredients[i].category===1) {
            this.protein=ingredients[i]}
          else if (ingredients[i].category==2) {
            this.vegetables.push(ingredients[i]);
          }
          else if (ingredients[i].category==3){
            this.sauces.push(ingredients[i]) }
          else {
              if (this.cart==true) {
                this.premadeBurgerNo=ingredients[i];
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
      this.bun= {};
      this.protein={};
      this.vegetables= [];
      this.sauces= [];
      this.extras= [];
      this.premadeBurgerNo= 0;
      this.burgerNo=0
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
        console.log(this.$store.state.selectedBurger.length);}
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
        this.$store.state.selectedBurger.splice(0, this.$store.state.selectedBurger.length);
        let BurgersinCart=0;
        BurgersinCart=this.orderedBurgers.length;
        console.log(BurgersinCart);
        let j=0;
        while (j < this.counter) {
          let burger={};
          let No=0;
          if (this.Bcart==true) {
            if (this.counter==1) {
              No=this.burgerNo
            }
            else {
              if (this.burgerNo>BurgersinCart) {
                No=this.burgerNo+j
              }
              else {
                if (j==0) {
                  No=this.burgerNo
                }
                else {
                  No=BurgersinCart+j+1
                }
              }
            }
          }
          else {
            No=j+1
          }
          burger={item: '', bun: this.bun, protein: this.protein, vegetables: this.vegetables, sauces: this.sauces, extras: this.extras, price: this.price, count: No};
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
              if (this.premadeBurgerNo==0) {
                this.premadeBurgerNo=count+1;
              }
              else {
              this.premadeBurgerNo=this.premadeBurgerNo+1}
            }
            burger={item: this.menuItem, bun: this.bun, protein: this.protein, vegetables: this.vegetables, sauces: this.sauces, price: this.price, count: this.premadeBurgerNo}
          }
          this.$store.state.orderedPremadeBurgers.push(burger);
          this.$store.state.cartCount += 1;

          i += 1
        }
        this.$store.state.selectedPremadeBurger=[];
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

#item_name{
  text-transform: capitalize;
}

.btn {
  margin-bottom: 0
}

.popuptext {
  width: 300%;
  left: 5%
}

.wrapper {
  grid-template-columns: 50% 50%;
  grid-column-gap: 0;
  padding-top: 0
}

#half1  {
  margin-left: 10%;
  margin-top: 5%;
}

#half1 button {
  margin-top: 5%;
  margin-left: 8%
}

.price {
  font-size: 1vw;
  font-weight: bold;
  border-style:inset;
  border-radius: 10%;
  border-color: #f2f2f2;
  background-color:#f2f2f2;
  width: 25%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.price p {
  margin: 5% 5% 5% 15%;
}

#counter {
  margin-left: 8%;
  padding-left: 2%;
  padding-right: 2%;
  border-style: inset;
  border-radius: 5%;
  border-color: #f2f2f2;
  /*background-color: rgb(255, 225, 185);*/
  background-color:#f2f2f2;
  border-width:medium;
  font-size:1.2vw
}

#counterCart {
  margin-left: 23%;
  padding-left: 2%;
  padding-right: 2%;
  border-style: inset;
  border-radius: 5%;
  border-color: rgb(253, 202, 124);
  background-color: rgb(255, 225, 185);
  border-width:medium;
  font-size:1.2vw
}

.ingredients {
  border-style:inset;
  border-radius: 10%;
  border-color: #f2f2f2;
  background-color:#f2f2f2;
  width: 70%;
  margin-top: 3%;
  font-size: 1vw;
  font-family: "Verdana"
}

.ingredients button {
  font-size: 0.8vw;
  text-align: center;
  /* width: 4%; */
  font-family: "Verdana"
}

.ingredients li {
  padding-top: -1%
}

@media (max-width: 800px) {
  #image {
    padding-left: 5%
  }
  #item_name {
    padding-left: 5%
  }
  .ingredients {
    margin-top: 5%
  }
  .popuptext {
    width: 300%;
    left: 115%
  }
}

</style>
