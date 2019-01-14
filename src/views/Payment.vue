<template>
<div >
  <NavBar
    nextRoute=""
    backRoute="MainMenu"
    showCart=''><h1 slot="center-component">{{ uiLabels.payment }}</h1>
  </NavBar>

  <div>
    <SplitPage>
      <template slot="left">
        <basicButton :text="uiLabels.cash" :icon="icon1" v-on:buttonclick="Welcome()"></basicButton>
      </template>
      <template slot="right">
        <basicButton :text="uiLabels.card" :icon="icon2" v-on:buttonclick="Welcome()"></basicButton>
      </template>
    </SplitPage>
  </div>
</div>
</template>
<script>

//import methods and data that are shared between ordering and kitchen views
import SplitPage from '@/components/SplitPage.vue'
import basicButton from '@/components/basicButton.vue'
import NavBar from '@/components/NavBar.vue'
import sharedVueStuff from "@/components/sharedVueStuff.js";
export default {
  name: 'Payment',
  components: {
    SplitPage,
    basicButton,
    NavBar
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      icon1:require('../assets/Cash-Pay.png'),
      icon2:require('../assets/credit-card.png')
    }
  },
  methods: {
    Welcome: function() {
      this.$router.push({ name: "Welcome" });
    }
  }
}
</script>
<style scoped>

</style>
