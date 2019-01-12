<template>
  <div>
    <NavBar
      nextRoute=""
      backRoute=""
      :showCart="Boolean.false">
      <h1 slot="center-component">{{ uiLabels.welcome }}</h1>
    </NavBar>
    <div id="body">
      <div :class="Class"><div id='message'><span class="close" v-on:click='closeModal()'>&times;</span>
    <p style="padding-left: 10%">Tilt screen</p>
      </div></div>
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
      diningOption: "",
      Class:""
    };
  },
  created: function() {
    this.Class="modal"
  },
  methods: {
    NextPage: function(dO) {
      this.diningOption = dO;
      console.log("DO: " + dO);
      //console.log("Dining Option: " + diningOption); <-- Issue with defining diningOption
      this.$router.push({ name: "MainMenu" });
      //location.reload()
    },
    closeModal: function() {
      this.Class="closeModal"
    }
  }
};
</script>
<style scoped>

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

#message {
  background-color: lightgrey;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.closeModal {
  display: none;
}

@media (min-width: 600px) {
  .modal {
    display: none;
  }
}


</style>
