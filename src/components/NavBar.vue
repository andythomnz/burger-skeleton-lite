<template>
  <div class="bar-wrapper">
    <!-- needs boolean for show, 
         an icon
        and the parent component should pass a function
    or URL to the page for the funtion-->
    <div>
      <!--button v-on:click="switchLang()">{{ uiLabels.language }}</button-->
    </div>
    <div>
      <basicButton 
      text="back"
      v-if="backRoute !== ''"
      v-on:buttonclick="NextPage(backRoute)"
      ></basicButton>
    </div>
    <div class="center">
      <slot name="center-component"></slot>
    </div>
    <div>
      <basicButton 
      v-if="nextRoute !== ''"
      text="Next"></basicButton>
    </div>
    <div>
      <basicButton 
      v-if="showCart"
      text="Cart">Cart</basicButton>
    </div>
  </div>
</template>
<script>
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

import basicButton from "@/components/basicButton.vue";

export default {
  name: "NavBar",
  components: {
    basicButton
  },
  props: {
    text: String,
    icon: String,
    nextRoute: "",
    backRoute: "",
    showCart: Boolean.true,
  },
  data: function() {
    return {};
  },
  methods: {
     NextPage: function(route) {
     //console.log("Back route: " + this.backRoute);
      this.$router.push({ name: route });
      //location.reload()
    }
  }
};
</script>

<style scoped>
.bar-wrapper {
  text-align: center;
  width: 100%;
  padding-top: 0;
  border-bottom-color: grey;
  border-bottom-style: solid;
  padding-bottom: 0.5%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 10% 10% auto 10% 10%;
}

#text {
  font-weight: bold;
}

.center {
  margin: auto auto;
}
</style>
