<template>
  <div class="bar-wrapper">
    <!-- needs boolean for show,
         an icon
        and the parent component should pass a function
    or URL to the page for the funtion-->
    <div>
      <button :class="[lang]" v-on:click="switchLang()"></button>
      <!--button class='lang' v-on:click="switchLang()">{{ uiLabels.language }}</button-->
    </div>
    <div>
      <basicButton
        id='buttons'
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
        id='buttons'
        v-if="nextButton"
        :text="uiLabels.next"
        v-on:buttonclick="NextPage(currentTab)"
      ></basicButton>
      <basicButton
        id='buttons'
        v-else-if="finishButton"
        :text="uiLabels.finish"
        v-on:buttonclick="FinishPage()"
      ></basicButton>
    </div>
    <div>
      <basicButton
        id='cartButton'
        v-if="showCart"
        :icon="require('@/assets/cart.png')"
        v-on:buttonclick="CartPage()"
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
    NextPage: function (route) {
      if (this.currentTab === 'Vegetables') {
        this.$store.commit('changeCurrentTab', 'Sauces');
      } else if (this.currentTab === 'Sauces') {
        this.$store.commit('changeCurrentTab', 'Extras');
      }
    },
    BackPage (route) {
      this.$router.push({ name: route });
    },
    FinishPage () {
      this.$store.commit('toggleClose');
      this.$store.commit('toggleFinish');
      this.$store.state.socket.emit('popup', {data: 'CustomBurger', counter: 1, cart:false});
      this.$router.push({ name: 'Popup' });
    },
    CartPage () {
      this.$router.push({ name: 'Cart' });
    }
  }
};
</script>

<style scoped>
#buttons {
  padding-bottom: 15%;
  border-radius: 10%
}

.bar-wrapper {
  text-align: center;
  width: 100%;
  padding-top: 0;
  border-bottom-color: grey;
  border-bottom-style: solid;
  /* padding-bottom: 0.5%; */
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
  padding-bottom: 15%;
  border-radius: 10%
}

#cartNumber {
  position: absolute;
  left: 45%;
  bottom: 60%;
  font-size: 1vw;
  color: white;
  background: red;
  border-radius: 50%;
  width: 15%
}

.sv {
  background: url('~@/assets/swedish-language-icon.png') no-repeat right 50% top 50%;
  background-size: 50%;
  width: 100%;
  height: 100%;
}
.en {
  background: url('~@/assets/english-language-icon.png') no-repeat right 50% top 50%;
  background-size: 50%;
  width: 100%;
  height: 100%;
  border-width: 0; 
}


</style>
