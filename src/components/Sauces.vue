<template>
  <div
    id="ordering"
    v-if="sauces"
  >
<div style="margin-left: 5%; margin-top: 1%">{{uiLabels.chooseSauces}}</div>
    <div class="wrapper" style="padding-top: 2%">
      <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        v-on:increment="addToOrder(item)"
        v-on:reset="resetToOrder(item)"
        :item="item"
        v-if="item.category == 3"
        :lang="lang"
        :key="item.ingredient_id"
        :saucesCount="allCount"
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
      allCount: 0,
      count: 0,
      sauces: true
    };
  },
  computed: {
    close () {
      return this.$store.state.close;
    }
  },
  watch: {
    close () {
      this.sauces = false
      this.allCount = 0;
      this.$nextTick(_ => {
        this.sauces = true;
      })
    }
  },
  methods: {
    addToOrder: function (item) {
      if (this.allCount >= 2) {
        return;
      }
      this.$store.state.selectedBurger.push(item);
      this.allCount = this.allCount + 1;
    },
    resetToOrder: function (item) {
      if (this.allCount <= 0) {
        return;
      }
      for (var i = 0; i < this.$store.state.selectedBurger.length; i++) {
        if(this.$store.state.selectedBurger[i].ingredient_id==item.ingredient_id) {
          this.$store.state.selectedBurger.splice(i, 1)
        }
      }
      this.allCount = this.allCount - 1
    },
  }
};
</script>
<style scoped>
</style>
