<template>

  <div
    class="ingredient"
    :id="currentID"
  >
    <div class='icons'>
    <span v-if="item.milk_free" v-on:click="clickInfo('lactose')" id='info'>
      <img src="../assets/milkfree.png" class="icon">
      <p v-if='showLactose'><span class="popuptext" id="myInfo">This item is lactose-free</span></p>
    </span>
    <span v-if="item.gluten_free" v-on:click="clickInfo('gluten')" id='info'>
      <img src="../assets/glutenfree.png" class="icon">
      <p v-if='showGluten'><span class="popuptext" id="myInfo">This item is gluten-free</span></p>
    </span>
    <span v-if="item.vegan" v-on:click="clickInfo('vegan')" id='info'>
      <img src="../assets/vegan.png" class="icon">
      <p v-if='showVegan'><span class="popuptext" id="myInfo">This item is vegan</span></p>
    </span></div>
    <label>
      <button
        :ref="'itemButton'+item.ingredient_id"
        v-on:click="incrementCounter"
      >
        <p style='margin-top: 5%'>{{item["ingredient_"+ lang]}}</p>
        <img
          v-bind:src="item.image"
          width="50%"
          style="padding-top: 5%; padding-bottom: 6%"
        >
        <div class="price_number">
        <p v-if="item.category === 5 || item.category === 6 || item.category === 7">{{uiLabels.price}}: {{item.selling_price}} kr</p>
        <!--p>{{uiLabels.stock}}: {{item.stock}}</p-->
        <p v-if="item.addi_cost>0">+ {{item.addi_cost}}kr</p>
        <!-- <p>Stock: {{item.stock}}</p> -->
        <p id="counter" v-if="this.counter>0">{{ counter }}</p></div>
      </button>
    </label>



    <!-- TODO Change the text in the basicButton to be language sensitive

  <div class="ingredient" >
    <label>
      <button v-on:click="incrementCounter">{{ counter }}</button>
      <ul>
        <img v-bind:src="item.image" width="20%">

        <li>{{item["ingredient_"+ lang]}}</li>
        <li>{{item.selling_price}}:-</li><li>{{item.stock}} pcs</li>-->

    <!--  Change the text in the basicButton to be language sensitive

    {{item["ingredient_"+ lang]}}

    also do something with the stock and price {{item.selling_price}}:-, {{item.stock}} pcs
    -->
  </div>
</template>

<script>
import sharedVueStuff from '@/components/sharedVueStuff.js'
require('@/assets/globalCSS.css')
export default {
  name: "Ingredient",
  components: {

  },
  mixins: [sharedVueStuff],
  props: {
    item: Object,
    // lang: String,
    currentKey: [String, Number],
    saucesCount: [String, Number],
    proteinCount: [String, Number]
  },
  data: function () {
    return {
      counter: 0,
      currentID: '',
      showVegan: false,
      showGluten: false,
      showLactose: false,
    };
  },
  computed: {
    currentTab: function () {
      return this.$store.state.currentTab
    }
  },
  watch: {
    currentKey () {
      if (this.currentTab === 'Buns' || this.currentTab === 'Protein') {
        if (this.currentKey !== this.item.ingredient_id) {
          this.counter = 0;
          this.currentID = '';
        }
      }
    }
  },
  methods: {
    //make a function that switches to another tab for the bread and burgers pages.
    //make the buttons highlihgt for the veggies and extras. with stylings and v-if

    incrementCounter: function (increment) {
      if (this.item.category === 5 || this.item.category === 6)
        { this.counter += 1;
          this.currentID = 'yellow-bg';
          this.$emit("increment") }
      else if (this.item.category === 7) {
        this.counter += 1;
        this.currentID = 'yellow-bg';
        this.$emit("increment")

      }
      else {
        if (this.counter === 1) {
          this.currentID = '';
          this.counter = 0;
          this.$emit("reset");
          return;
        }
        if (+this.saucesCount >= 2) {
          return;
        }
        if (+this.proteinCount >= 1) {
          return;
        }
        this.counter = 1;
        this.currentID = 'yellow-bg';
        // sending 'increment' message to parent component or view so that it
        // can catch it with v-on:increment in the component declaration
        this.$emit("increment");
        if (this.currentTab === 'Buns') {
          this.$store.commit('changeCurrentTab', 'Protein');
        } else if (this.currentTab === 'Protein') {
          this.$store.commit('changeCurrentTab', 'Vegetables');
        }
      }
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
    decrementCounter: function () {
        this.counter -= 1;
        if (this.counter==0) {this.currentID=''}
    },
    resetCounter: function () {
      this.counter = 0;
      this.currentID = ''
    }
  }
};
</script>
<style scoped>
p {
  margin: 0 0;
}

img {
  padding-bottom: 0em;
  padding-top: 0em;
}

#yellow-bg {
  background: rgb(253, 202, 124);
}

.ingredient:hover {
  /*background: lightyellow;*/
  /* cursor: pointer; */
  background: rgb(253, 202, 124);
  transform: scale(1.02);
}

.ingredient:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}

.ingredient:active {
  transform: scale(0.99);
  /*outline: yellow auto 5;*/
}

button:hover {
  cursor: pointer;
}

button {
  border: none;
  background: none;
  text-align: center;
  font-weight: bold;
  /* transition: background 250ms ease-in-out, transform 150ms ease; */
  display: block;
  width: 100%;
  height: 100%;
  font-size: 1.5vw;
}

.icon{
  width: 100%
}

.icons {
  position: absolute;
  top: 93%;
  width: 50%
}

.popuptext {
  left: -8%;
}

.ingredient {
  background-color:rgb(255, 225, 185);
  border-style: none;
  border-radius: 1.3vw;
  transition: background 250ms ease-in-out, transform 150ms ease;
  position: relative
}

.price_number {
  font-size: 1.2vw;
  text-align: left;
  margin-left: 20%;
  padding-bottom: 8%
}

@media (max-width: 600px) {
  .price_number {
    margin-left: 25%
  }
  #counter {
    bottom: 100%;
    font-size: 2vw
  }
  .popuptext {
    left: 150%;
    width: 300%;
    font-size: 1.5vw
  }
  .price_number {
    font-size: 1.5vw
  }
  button {
    font-size: 2vw
  }
}

#counter {
  position: absolute;
  left: 95%;
  bottom: 95%;
  background-color: red;
  border-radius: 50%;
  width: 11%;
  text-align: center;
  color: white;
  /* font-size: 1vw; */
  font-weight: bold;
}

</style>
