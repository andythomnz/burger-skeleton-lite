<template>
  <div
    id="ordering"
    class="container"
  >
    <NavBar
      nextRoute=""
      backRoute="MainMenu"
      showCart='true'
    >
      <div slot="center-component">
        <!-- <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['navbutton', { active: currentTab === tab }]"
          v-on:click="changeTab(tab)"
        > -->
        <button
         v-for="(tab,index) in tabs"
         v-bind:key="tab"
         :class="[ 'navbutton', tab == currentTab ? 'actives': '' ]"
         @click="changeTab(tab); changeSingClass(index);">
          {{ tab }}
        > -->
        <button
         v-for="(tab,index) in tabs"
         v-bind:key="tab"
         :class="[ 'navbutton', tab == currentTab ? 'actives': '' ]"
         @click="changeTab(tab); changeSingClass(index);">
          {{ tab }}

        </button>
      </div>
    </NavBar>
    <div class="page">
      <keep-alive>
        <component
          v-bind:is="currentTab"
          class="tab"
          type="inline-template"
        >
        </component>
      </keep-alive>
    </div>

  </div>
</template>
<script>

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import basicButton from "@/components/basicButton.vue";
import NavBar from "@/components/NavBar.vue";

//import the components for the tabs
//import MYOB from '@/components/MYOB.vue' MYOB - Make your own burger is the old version
import Buns from '@/components/Buns.vue'
import Protein from '@/components/Protein.vue'
import Vegetables from '@/components/Vegetables.vue'
import Sauces from '@/components/Sauces.vue'
import Extras from '@/components/Extras.vue'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem,
    basicButton,
    NavBar,

    //Define the components for the tabs - Buns, Protein, Vegetables, Sauces, Extras,
    //MYOB - Make your own burger is the old version
    Buns,
    Protein,
    Vegetables,
    Sauces,
    Extras,
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function () {        //Not that data is a function!
    return {
      tabs: ['Buns', 'Protein', 'Vegetables', 'Sauces', 'Extras'],
      currentId:-1,
    }
  },
  activated () {
    this.$store.commit('changeCurrentTab', 'Buns');
  },
  computed: {
    currentTab: function () {
      return this.$store.state.currentTab
    },
    nextButton () {
      return this.currentTab === 'Vegetables' || this.currentTab === 'Sauces';
    }
  },
  methods: {
    changeTab (tab) {
      this.$store.commit('changeCurrentTab', tab);
    },
    changeSingClass(index) {
      this.currentId = index;
    }
  }
}
</script>
<style scoped>

.navbutton {
  margin: auto auto;
  background:#fee0bb;
  text-indent:0;
  border:0;
  display:inline-block;
  font-size:1.2vw;
  font-weight:bold;
  font-style:normal;
  height:40px;
  line-height:40px;
  width:auto;
  text-decoration:none;
  text-align:center;
}
.navbutton:hover {
  background:#fcc982;
  box-shadow: inset 0 -0.1em #000;
  cursor: pointer
}

.navbutton:active {
  background:#fcc982;
  box-shadow: inset 0 -0.1em #000;
}

.actives {
  background:#fcc982;
  box-shadow: inset 0 -0.1em #000;
}
</style>
