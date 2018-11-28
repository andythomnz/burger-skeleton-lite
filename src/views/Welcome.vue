<template>
<div >
  <h1>Welcome to Kraft Burgers</h1>
  <div>
    <SplitPage
      v-on:button1click="NextPage()"
      :text1="text1"
      :icon1="icon1"
      v-on:button2click="NextPage()"
      :text2="text2"
      :icon2="icon2">
    </SplitPage>
  </div>
</div>
</template>
<script>


import SplitPage from '@/components/SplitPage.vue'
import basicButton from '@/components/basicButton.vue'

export default {
  name: 'Welcome',
  components: {
    SplitPage,
    basicButton
  },

  data: function(){
    return {
      text1:'Eat in',
      text2:'Take Away',
      icon1:require('../assets/restaurant.png'),
      icon2:require('../assets/takeaway.png'),
    }
  },
  methods: {
    NextPage: function(){
      this.$router.push({ name: "ordering" });
    }
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
