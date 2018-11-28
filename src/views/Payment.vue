<template>
<div >
  <h1>Choose your payment method</h1>
  <div>
    <SplitPage
      :text1="text1"
      :text2="text2"
      :icon1="icon1"
      :icon2="icon2">
    </SplitPage>
  </div>
</div>
</template>
<script>

//import methods and data that are shared between ordering and kitchen views
import SplitPage from '@/components/SplitPage.vue'

export default {
  name: 'Payment',
  components: {
    SplitPage
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
