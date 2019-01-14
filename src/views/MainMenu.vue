<template>
  <div>
    <NavBar
      nextRoute=""
      backRoute="Welcome"
      showCart=false
    ></NavBar>
    <div id="body">
      <SplitPage>
        <template slot="left">
          <basicButton
            :text="uiLabels.myob"
            :icon="require('../assets/restaurant.png')"
            v-on:buttonclick="NextPage('BurgerMenu')"
          ></basicButton>
        </template>
        <template slot="right" >
          <div class="side-grid">
          <basicButton
            :text="uiLabels.premade_burgers"
            v-on:buttonclick="NextPage('PremadeBurgers')"
          ></basicButton>
          <basicButton
            :text="uiLabels.drinks"
            v-on:buttonclick="NextPage('Drinks')"
          ></basicButton>
          <basicButton
            :text="uiLabels.sides"
            v-on:buttonclick="NextPage('Sides')"
          ></basicButton>
          </div>
        </template>
      </SplitPage>
    </div>
  </div>
</template>
<script>

import SplitPage from "@/components/SplitPage.vue";
import basicButton from "@/components/basicButton.vue";
import NavBar from "@/components/NavBar.vue";
import sharedVueStuff from "@/components/sharedVueStuff.js";

export default {
  name: "Welcome",
  components: {
    SplitPage,
    basicButton,
    NavBar
  },
  mixins: [sharedVueStuff],
  data: function() {
    return {
      diningOption: ""
    };
  },
  methods: {
    NextPage: function(route) {
      this.$router.push({ name: route });
    },
  }



};
</script>
<style scoped>

.side-grid {
  text-align: center;
  border-bottom-color: grey;
  border-bottom-style: solid;
  padding-bottom: 0.5%;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: 33% 33% 33%;
}
</style>
