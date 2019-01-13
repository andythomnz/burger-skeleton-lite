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
        </button>
      </div>
    </NavBar>

    <!-- <h2 style='padding-left: 5%'>{{currentTab}}</h2> -->
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
      // chosenIngredients: [],
      // price: 0,
      // orderNumber: "",
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
    changeSingClass(index) {
      this.currentId = index;
    },
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

/* button:hover{
  background: rgb(255, 214, 149); cursor: pointer;
}

button:active {
    transform: scale(0.99);
    outline:yellow auto 5
}

button{
  border-color: rgb(255, 214, 149);
  border-radius: 10%;
  text-align: center;
  font-size: 1.2vw;
  font-weight: bold;
  background-color:rgb(255, 225, 185);
  transition: background 250ms ease-in-out,
                transform 150ms ease;
  margin-right: 1%;
  margin-bottom: 1%
} */

</style>
