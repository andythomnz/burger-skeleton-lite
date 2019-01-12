<template>
  <div
    id="ordering"
    v-if="vegetables">

    <div class="wrapper">
      <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        v-on:increment="addToOrder(item)"
        v-on:reset="resetToOrder(item)"
        :item="item"
        v-if="item.category == 2"
        :lang="lang"
        :key="item.ingredient_id"
      ></Ingredient>
    </div>
  </div>
</template>
<script>
//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from "@/components/Ingredient.vue";
import OrderItem from "@/components/OrderItem.vue";

//Importing global CSS
require('@/assets/globalCSS.css')

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from "@/components/sharedVueStuff.js";
// import bridge from './vue-temp/vue-editor-bridge';

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: "Ordering",
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function () {
    //Not that data is a function!
    return {
      vegetables: true
    };
  },
  computed: {
    close () {
      return this.$store.state.close;
    }
  },
  watch: {
    close () {
      this.vegetables = false
      this.$nextTick(_ => {
        this.vegetables = true;
      })
    }
  },
  methods: {
    addToOrder: function (item) {
      this.$store.state.selectedBurger.push(item);
    },
    resetToOrder: function (item) {
      for (var i = 0; i < this.$store.state.selectedBurger.length; i++) {
        if(this.$store.state.selectedBurger[i].ingredient_id==item.ingredient_id) {
          this.$store.state.selectedBurger.splice(i, 1)
        }
      }
      //delete
    }
  }
};
</script>
<style scoped>
</style>
