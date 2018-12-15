<template>
  <div v-on:popup='set(data,title)'>
    <NavBar
    nextRoute=""
    backRoute="MainMenu"
    :showCart="Boolean.false">
      <h1 slot="center-component">  {{ menuItem["ingredient_"+lang] }}</h1>
    </NavBar>
    <div class='OrderItem'>
      <div class='wrapper'>
        <div id='half'>

          <div><img v-bind:src="menuItem.image" width="50%"></div>
          <div><span><button v-on:click='resetToOrder()'>-</button> {{menuItem.counter}} <button v-on:click='addToOrder(menuItem)'>+</button></span></div>
        </div>
        <div id='half'>
          <span v-if="menuItem.milk_free"><img
              src="../assets/milkfree.png"
              class="icon" id='info' v-on:click='clickInfo()'
            /><p v-if='show'><span class="popuptext" id="myInfo">A Simple Popup!</span></p></span>
          <span v-if="menuItem.gluten_free"><img
              src="../assets/glutenfree.png"
              class="icon"
            /></span>
          <span v-if="menuItem.vegan"><img
              src="../assets/vegan.png"
              class="icon"
              width="10%"
            /></span>
        </div>
      </div>
      <button id='btn' v-on:click="finishOrder()">{{ uiLabels.ready }}</button>
      <button id='btn' v-on:click="cancelItem()">{{ uiLabels.cancel }}</button>
      <button id='btn' v-on:click="confirmItem()">{{ uiLabels.confirm }}</button>


    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import sharedVueStuff from "@/components/sharedVueStuff.js";
import SplitPage from "@/components/SplitPage.vue";
require('@/assets/globalCSS.css')
export default {
  name: "Popup",
  components: {
    NavBar,
    SplitPage

  },
  mixins: [sharedVueStuff],
  data: function() {
    return {
      active: false,
      title: null,
      glutenfree: Boolean,
      lastosefree: Boolean,
      vegan: Boolean,
      price: Number,
      menuItemName: String,
      menuItem: Object,
      show: false
    };
  },
  created: function() {
    this.$store.state.socket.on('openPopup', function (data) {
      this.menuItem = data.data;
      this.title = data.category;
    }.bind(this));
  },
  methods: {
    NextPage: function() {

      this.$router.push({ name: "MainMenu" });
      //location.reload()
    },

    Cancel: function(){

    },
    addToOrder: function(item) {

    },
    resetToOrder: function() {

    },
    confirmItem: function() {

    },
    clickInfo: function() {
      if(this.show==false) {this.show=true}
      else this.show=false
    }
  }
}
</script>
<style scoped>
h1 {
text-align: center}

#btn {
  font-size: 18pt;
  float: right;
  margin-right: 5%;
  font-weight: bold
}


.wrapper {
  grid-template-columns: 50% 50%
}

#half  {
  margin-left: 20%;
  margin-top: 5%
}

#half button {
  margin-top: 5%;
  margin-left: 10%
}

#info {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#myInfo {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

#info .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

#info .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
@-webkit-keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}

</style>
