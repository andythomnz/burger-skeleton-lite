<template>
  <div class="bar-wrapper">
    <!-- needs boolean for show,
         an icon
        and the parent component should pass a function
    or URL to the page for the funtion-->
    <div>
      <button class='lang' v-on:click="switchLang()">{{ uiLabels.language }}</button>
    </div>
    <div>
      <basicButton
        style="padding-bottom: 20%"
        :text="uiLabels.back"
        v-if="backRoute !== ''"
        v-on:buttonclick="BackPage(backRoute)"
      ></basicButton>
    </div>
    <div class="center">
      <slot name="center-component"></slot>
    </div>
    <div>
      <basicButton
        style="padding-bottom: 20%"
        v-if="nextButton"
        :text="uiLabels.next"
        v-on:buttonclick="NextPage(currentTab)"
      ></basicButton>
      <basicButton
        style="padding-bottom: 20%"
        v-else-if="finishButton"
        :text="uiLabels.finish"
        v-on:buttonclick="FinishPage(currentTab)"
      ></basicButton>
    </div>
    <div>
      <basicButton
        id='cartButton'
        v-if="showCart"
        :text="uiLabels.cart"
        v-on:buttonclick="CartPage('Cart')"
      ><p slot="cart" id="cartNumber" v-if="this.cartCount>0">{{cartCount}}</p></basicButton>
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
  mixins: [sharedVueStuff],
  props: {
    text: String,
    icon: String,
    nextRoute: "",
    backRoute: "",
    showCart: Boolean.true
  },
  data: function () {
    return {
    };
  },
  activated () {
    // console.log(this.currentTab);
  },
  computed: {
    currentTab: function () {
      return this.$store.state.currentTab
    },
    nextButton () {
      if (this.$router.currentRoute.name !== 'BurgerMenu') {
        return false;
      }
      return this.currentTab === 'Vegetables' || this.currentTab === 'Sauces';
    },
    finishButton () {
      if (this.$router.currentRoute.name !== 'BurgerMenu') {
        return false;
      }
      return this.currentTab === 'Extras';
    },
    cartCount () {
      return this.$store.state.cartCount
    }
  },
  methods: {
    NextPage: function (route, type) {
      //console.log("Back route: " + this.backRoute);
      if (this.currentTab === 'Vegetables') {
        this.$store.commit('changeCurrentTab', 'Sauces');
      } else if (this.currentTab === 'Sauces') {
        this.$store.commit('changeCurrentTab', 'Extras');
      }
      // else if (this.currentTab === 'Extras' && type !== 'back') {
      //   this.$store.commit('toggleClose');
      //   this.$router.push({ name: 'Cart' });
      // }
    },
    BackPage (route) {
      this.$router.push({ name: route });
    },
    FinishPage (route) {
      this.$store.commit('toggleClose');
      this.$store.commit('toggleFinish');
      this.$store.state.socket.emit('popup', {data: 'CustomBurger', counter: 1});
      this.$router.push({ name: 'Popup' });
    },
    CartPage (route) {
      this.$router.push({ name: route });
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

.lang {
  font-size: 0.8vw;
}

.center {
  margin: auto auto;
}

#cartButton {
  position: relative;
  padding-bottom: 20%;
}

#cartNumber {
  position: absolute;
  left: 75%;
  bottom: 60%;
  font-size: 1vw;
  color: white;
  background: red;
  border-radius: 50%;
  width: 30%
}

</style>
