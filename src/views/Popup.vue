<template>
  <div v-on:open='set(data,title)'>
    <NavBar
    nextRoute=""
    backRoute="MainMenu"
    :showCart="Boolean.false">
      <h1 slot="center-component">  {{ title }}</h1>
    </NavBar>
    <div class='OrderItem'>
      <div class='wrapper'>
        <div>

          <div><img v-bind:src="menuItem.image" width="50%"></div>
          <div><span><button v-on:click='resetToOrder()'>-</button> {{menuItem.counter}} <button v-on:click='addToOrder(menuItem)'>+</button></span></div>
        </div>
        <div>
          <span v-if="menuItem.milk_free"><img
              src="../assets/milkfree.png"
              class="icon"
            /></span>
          <span v-if="menuItem.gluten_free"><img
              src="../assets/glutenfree.png"
              class="icon"
            /></span>
          <span v-if="menuItem.vegan"><img
              src="../assets/vegan.png"
              class="icon"
              width="10%"
            /></span>
        </div>
      </div>
      <button id='btn' v-on:click="finishOrder()">{{ uiLabels.ready }}</button>
      <button id='btn' v-on:click="cancelItem()">{{ uiLabels.cancel }}</button>
      <button id='btn' v-on:click="confirmItem()">{{ uiLabels.confirm }}</button>


    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import sharedVueStuff from "@/components/sharedVueStuff.js";
import SplitPage from "@/components/SplitPage.vue";
require('@/assets/globalCSS.css')
export default {
  name: "Popup",
  components: {
    NavBar,
    SplitPage

  },
  mixins: [sharedVueStuff],
  data: function() {
    return {
      active: false,
      title: null,
      glutenfree: Boolean,
      lastosefree: Boolean,
      vegan: Boolean,
      price: Number,
      menuItemName: String,
      menuItem: Object
    };
  },
  methods: {
    NextPage: function() {

      this.$router.push({ name: "MainMenu" });
      //location.reload()
    },

    Cancel: function(){

    },
    addToOrder: function(item) {

    },
    resetToOrder: function() {

    },
    set(data, title) {
      this.menuItem = data;
      this.title = title;
    }
  }
}
</script>
<style scoped>
h1 {
text-align: center}

#btn {
  font-size: 18pt;
  float: right;
  margin-right: 5%;
  font-weight: bold
}

.order{
  margin-left: 2%
}
</style>
