<template>
  <div>
    <NavBar text="Welcome to Kraft Burgers">
      <p slot="center-component" style="text-align:center center;">Welcome to ...</p>
    </NavBar>
    <div id="body">
      <SplitPage>
        <template slot="left">
          <basicButton
            text="Make Your Own Burger"
            :icon="require('../assets/restaurant.png')"
            v-on:buttonclick="NextPage('EatIn')"
          ></basicButton>
        </template>
        <template slot="right">
          <basicButton
            text="Pre-Made Burgers"
            :icon="require('../assets/takeaway.png')"
            v-on:buttonclick="NextPage('TakeAway')"
          ></basicButton>
          <basicButton
            text="Drinks"
            :icon="require('../assets/takeaway.png')"
            v-on:buttonclick="NextPage('TakeAway')"
          ></basicButton>
          <basicButton
            text="Sides"
            :icon="require('../assets/takeaway.png')"
            v-on:buttonclick="NextPage('TakeAway')"
          ></basicButton>>
        </template>
      </SplitPage>
    </div>
  </div>
</template>
<script>

import sharedVueStuff from "@/components/sharedVueStuff.js";
import SplitPage from "@/components/SplitPage.vue";
import basicButton from "@/components/basicButton.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Welcome",
  components: {
    SplitPage,
    basicButton,
    NavBar
  },

  data: function() {
    return {
      diningOption: ""
    };
  },
  methods: {
    NextPage: function(dO) {
      this.diningOption = dO;
      console.log("DO: " + dO);
      //console.log("Dining Option: " + diningOption); <-- Issue with defining diningOption
      this.$router.push({ name: "MainMenu" });
      location.reload()
    },
  }



};
</script>
<style scoped>
h1 {
  text-transform: uppercase;
  font-size: 1.4em;
  text-align: center;
}
</style>
