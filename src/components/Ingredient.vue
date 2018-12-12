<template>
  <div class="ingredient" >
    <label>
      <button v-on:click="incrementCounter">{{ counter }}</button>
      <ul>
        <img v-bind:src="item.image" width="20%">
        <!--image can be changed by editing the "image colon" in ingredients.csv-->
        <li>{{item["ingredient_"+ lang]}}</li>
        <!--<li>{{item.selling_price}}:-</li>
        <li>{{item.stock}} pcs</li>-->
        <li v-if="item.addi_cost>0">+ {{item.addi_cost}}kr</li>
        <span v-if="item.milk_free"><img src="../assets/milkfree.png" class="icon" /></span>
        <span v-if="item.gluten_free"><img src="../assets/glutenfree.png" class="icon" /></span>
        <span v-if="item.vegan"><img src="../assets/vegan.png" class="icon" width="10%"/></span>
      </ul>
    </label>

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

.icon{
  width:2em;
}

</style>
