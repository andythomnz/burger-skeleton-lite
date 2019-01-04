<template>

  <div
    class="ingredient"

  >
    <label>
      <button
        :ref="'itemButton'+item.ingredient_id"
        :class="currentClass"
        v-on:click="incrementCounter"
      >

        <img
          v-bind:src="item.image"
          width="50%"
        >
        <p>{{item["ingredient_"+ lang]}}</p>
        <!--p>{{uiLabels.price}}: {{item.selling_price}}</p>
        <p>{{uiLabels.stock}}: {{item.stock}}</p-->
        <p v-if="item.addi_cost>0">+ {{item.addi_cost}}kr</p>
        <p>Stock: {{item.stock}}</p>
        Number: {{ counter }}
      </button>
    </label>
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
    sharedVueStuff,
  },
  props: {
    item: Object,
    lang: String,
    currentKey: [String, Number],
    saucesCount: [String, Number],
    proteinCount: [String, Number]
  },
  data: function () {
    return {
      counter: 0,
      currentClass: '',
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
          this.currentClass = '';
        }
      }
    }
  },
  methods: {
    //make a function that switches to another tab for the bread and burgers pages.
    //make the buttons highlihgt for the veggies and extras. with stylings and v-if

    incrementCounter: function () {
      if (this.item.category === 5 || this.item.category === 6)
        { this.counter += 1;
          this.currentClass = 'yellow-bg';
          this.$emit("increment") }
      else if (this.item.category === 7) {
        this.counter += 1;
        this.currentClass = 'yellow-bg';
        if (this.counter == 1) {
          this.$emit("increment")
        }
      }
      else {
        if (this.counter === 1) {
          this.currentClass = '';
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
        this.currentClass = 'yellow-bg';
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
        if (this.counter==0) {this.currentClass=''}
        // sending 'increment' message to parent component or view so that it
        // can catch it with v-on:increment in the component declaration


    },
    resetCounter: function () {
      this.counter = 0;
      this.currentClass = ''
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

.yellow-bg {
  background: lightyellow;
}

button:hover {
  background: lightyellow;
  cursor: pointer;
}

button:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}

button:active {
  transform: scale(0.99);
  outline: yellow auto 5;
}

button {
  border: none;
  background: none;
  text-align: center;
  font-size: 20pt;
  font-weight: bold;
  transition: background 250ms ease-in-out, transform 150ms ease;
  display: block;
  width: 100%;
}

.icon{
  width: 2em;
  margin-right: 10%
}

.icons {
  padding-left: 25%
}




</style>
