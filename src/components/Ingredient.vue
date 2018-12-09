<template>
  <div class="ingredient" v-on:click="incrementCounter">
    <label>
      <button>{{ counter }}</button>
    </label>

    <!-- TODO Change the text in the basicButton to be language sensitive 
    {{item["ingredient_"+ lang]}}

    also do something with the stock and price {{item.selling_price}}:-, {{item.stock}} pcs
    -->

    <basicButton
      :text="item.ingredient_en" 
      :secondaryText="item.selling_price"
      :icon="require('../assets/restaurant.png')"
    ></basicButton>
    {{item["ingredient_"+ lang]}}, {{item.selling_price}}, {{item.stock}}

  </div>
</template>

<script>
import sharedVueStuff from "@/components/sharedVueStuff.js";
import basicButton from "@/components/basicButton.vue";

export default {
  name: 'Ingredient',
  components: {
    basicButton
  },
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    //make a function that switches to another tab for the bread and burgers pages. 
    //make the buttons highlihgt for the veggies and extras. with stylings and v-if

    incrementCounter: function () {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    },
    resetCounter: function () {
      this.counter = 0;
    }
  }
}
</script>
<style scoped>
  
</style>