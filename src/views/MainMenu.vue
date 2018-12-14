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
            text="Make Your Own Burger"
            :icon="require('../assets/restaurant.png')"
            v-on:buttonclick="NextPage('BurgerMenu')"
          ></basicButton>
        </template>
        <template slot="right" >
          <div class="side-grid">
          <basicButton 
            text="Pre-Made Burgers"
            v-on:buttonclick="NextPage('PremadeBurgers')"
          ></basicButton>
          <basicButton 
            text="Drinks"
            v-on:buttonclick="NextPage('Drinks')"
          ></basicButton>
          <basicButton 
            text="Sides"
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
    NextPage: function(route) {
      this.$router.push({ name: route });
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
