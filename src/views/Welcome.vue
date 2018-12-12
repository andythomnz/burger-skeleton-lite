<template>
  <div>
    <NavBar text="Welcome to Kraft Burgers"
      nextRoute=""
      backRoute=""
      :showCart="Boolean.false">
      <h1 slot="center-component">Welcome to Kraft Burgers</h1>
    </NavBar>
    <div id="body">
      <SplitPage>
        <template slot="left">
          <basicButton
            text="Eat In"
            :icon="require('../assets/restaurant.png')"
            v-on:buttonclick="NextPage('EatIn')"
          ></basicButton>
        </template>
        <template slot="right">
          <basicButton
            text="Take Away"
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
      //location.reload()
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

#buttons {
  width:50%;
}

#backbutton {
  width:auto;
  font-size: 16pt;
  padding-bottom: 0;
}

#nextbutton {
  font-size: 16pt;
  float:right
}
</style>
