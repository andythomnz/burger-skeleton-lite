<template>
  <div>
    <NavBar
      nextRoute=""
      backRoute=""
      :showCart="Boolean.false">
      <h1 slot="center-component">{{ uiLabels.welcome }}</h1>
    </NavBar>
    <div id="body">
      <SplitPage>
        <template slot="left">
          <basicButton
            :text="uiLabels.eatin"
            :icon="require('../assets/restaurant.png')"
            v-on:buttonclick="NextPage('EatIn')"
          ></basicButton>
        </template>
        <template slot="right">
          <basicButton
            :text="uiLabels.takeaway"
            :icon="require('../assets/takeaway.png')"
            v-on:buttonclick="NextPage('TakeAway')"
          ></basicButton>
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
    NavBar,
  },
  mixins: [sharedVueStuff],
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
      //location.reload()
    },
  }
};
</script>
<style scoped>
h1 {
  text-transform: uppercase;
  font-size: 150%;
  text-align: center;
}



</style>
