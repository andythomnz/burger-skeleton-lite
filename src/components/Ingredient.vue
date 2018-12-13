<template>

  <div
    class="ingredient"
    v-on:click="incrementCounter"
  >
    <label>
      <button
        :ref="'itemButton'+item.ingredient_id"
        :class="currentClass"
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
        <span v-if="item.milk_free"><img
            src="../assets/milkfree.png"
            class="icon"
          /></span>
        <span v-if="item.gluten_free"><img
            src="../assets/glutenfree.png"
            class="icon"
          /></span>
        <span v-if="item.vegan"><img
            src="../assets/vegan.png"
            class="icon"
            width="10%"
          /></span>
      </button>
    </label>

    <!-- TODO Change the text in the basicButton to be language sensitive
=======
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
export default {
  name: "Ingredient",
  components: {
    sharedVueStuff,
  },
  props: {
    item: Object,
    lang: String,
    currentKey: [String, Number],
    allCount: [String, Number]
  },
  data: function () {
    return {
      counter: 0,
      currentClass: ''
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
      if (this.counter === 1) {
        this.currentClass = '';
        this.counter = 0;
        this.$emit("reset");
        return;
      }
      if (+this.allCount >= 2) {
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
    },
    resetCounter: function () {
      this.counter = 0;
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

.icon {
  width:10%}
</style>
