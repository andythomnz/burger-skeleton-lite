<template>
  <div class="ingredient" v-on:click="incrementCounter">
    <label>
      <button>
        <img :src="require('../assets/restaurant.png')">
        <p>{{item["ingredient_"+ lang]}}</p>
        <!--p>{{uiLabels.price}}: {{item.selling_price}}</p>
        <p>{{uiLabels.stock}}: {{item.stock}}</p-->
        <p>Price: {{item.selling_price}}</p>
        <p>Stock: {{item.stock}}</p>
        Number: {{ counter }}
      </button>
    </label>

    <!-- TODO Change the text in the basicButton to be language sensitive 
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
    lang: String
  },
  data: function() {
    return {
      counter: 0
    };
  },
  methods: {
    //make a function that switches to another tab for the bread and burgers pages.
    //make the buttons highlihgt for the veggies and extras. with stylings and v-if

    incrementCounter: function() {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit("increment");
    },
    resetCounter: function() {
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
</style>