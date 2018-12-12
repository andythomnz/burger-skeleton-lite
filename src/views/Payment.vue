<template>
<div >
  <NavBar>
  </NavBar>
  <h1>Choose your payment method</h1>
  <div>
    <SplitPage>
      <template slot="left">
        <basicButton :text="text1" :icon="icon1"></basicButton>
      </template>
      <template slot="right">
        <basicButton :text="text2" :icon="icon2"></basicButton>
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

export default {
  name: 'Payment',
  components: {
    SplitPage,
    basicButton,
    NavBar
  },
  // mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      text1:'Cash',
      text2:'Credit Card',
      icon1:require('../assets/Cash-Pay.png'),
      icon2:require('../assets/credit-card.png')
    }
  },
  methods: {

  }
}
</script>
<style scoped>

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
    text-align:center;
  }
</style>
