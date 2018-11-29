<template>
<div >
  <NavBar :text='headtext' id='textinbar'>
    <template slot="back">
      <basicButton :text='backtext'></basicButton></template></NavBar>
  <div id='body'>
    <SplitPage>
      <template slot="left">
        <basicButton :text="text1" :icon="icon1" v-on:buttonclick="NextPage()"></basicButton>
      </template>
      <template slot="right">
        <basicButton :text="text2" :icon="icon2" v-on:buttonclick="NextPage()"></basicButton>
      </template>
    </SplitPage>
  </div>
</div>
</template>
<script>


import SplitPage from '@/components/SplitPage.vue'
import basicButton from '@/components/basicButton.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Welcome',
  components: {
    SplitPage,
    basicButton,
    NavBar
  },

  data: function(){
    return {
      text1:'Eat in',
      text2:'Take Away',
      icon1:require('../assets/restaurant.png'),
      icon2:require('../assets/takeaway.png'),
      headtext:'Welcome to Kraft Burgers',
      backtext: 'Back'
    }
  },
  methods: {
    NextPage: function(){
      this.$router.push({ name: "ordering" });
      location.reload()
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

#textinbar {
    font-size: 20pt;
  }



</style>
