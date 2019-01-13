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
      <!--button slot="center-component" v-on:click="switchLang()">{{ uiLabels.language }}</button-->
       <!--v-bind:class="['tab-button', { active: currentTab === tab }]"
      v-bind:class="['navbutton', { active: currentTab === tab }]"
      @click="changeTab(tab)"
   -->
      <div slot="center-component">
        <button
          v-for="(tab,index) in tabs"
          v-bind:key="tab"
          :class="[ 'navbutton', tab == currentTab ? 'actives': '' ]"
          @click="changeTab(tab); changeSingClass(index);"
        >
          {{ tab }}
        </button>
      </div>
    </NavBar>

    <!--<h2> tab: {{currentTab}}</h2>-->
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
      // currentTab: 'Buns',
      tabs: ['Buns', 'Protein', 'Vegetables', 'Sauces', 'Extras'],
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      ////////
      currentId:-1,
      ////////
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
  // created: function () {
  //   this.$store.state.socket.on('orderNumber', function (data) {
  //     this.orderNumber = data;
  //   }.bind(this));
  // },
  methods: {
    changeTab (tab) {
      this.$store.commit('changeCurrentTab', tab);
      // this.currentTab = tab
    },
        //////
    changeSingClass(index) {
      this.currentId = index;  
    },
    ///////
    // addToOrder: function (item) {
    //   this.chosenIngredients.push(item);
    //   this.price += +item.selling_price;
    // },
    // placeOrder: function () {
    //   var i,
    //     //Wrap the order in an object
    //     order = {
    //       ingredients: this.chosenIngredients,
    //       price: this.price
    //     };
    //   // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
    //   this.$store.state.socket.emit('order', { order: order });
    //   //set all counters to 0. Notice the use of $refs
    //   for (i = 0; i < this.$refs.ingredient.length; i += 1) {
    //     this.$refs.ingredient[i].resetCounter();
    //   }
    //   this.price = 0;
    //   this.chosenIngredients = [];
    // }
  }
}
</script>
<style scoped>
.navbutton {
  margin: auto auto;
  background:#fee0bb;
  /*border-radius: 16px 16px 16px 16px;*/
  text-indent:0;
  border:0;
  display:inline-block;
  font-family:Arial;
  font-size:1em;
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
}
.navbutton:active {
  background:#fcc982;
  box-shadow: inset 0 -0.1em #000;
}

.actives {
  background:lightyellow;
  box-shadow: inset 0 -0.1em #000;
}

</style>
