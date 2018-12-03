<template>
<div >
  <NavBar :text='headtext' id='textinbar'>
    <span slot="back">
      <basicButton :text='backtext' id='backbutton'></basicButton></span>
    <span slot="next">
      <basicButton :text='nexttext' id='nextbutton'></basicButton></span></NavBar>
  <div id='body'>
    <SplitPage>
      <template slot="left">
        <basicButton id='buttons' :text="text1" :icon="icon1" v-on:buttonclick="NextPage()"></basicButton>
      </template>
      <template slot="right">
        <basicButton id='buttons' :text="text2" :icon="icon2" v-on:buttonclick="NextPage()"></basicButton>
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
      backtext: 'Back',
      nexttext: 'Next'
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

#buttons {
  width:50%;
}

#backbutton {
  width:auto;
  font-size: 16pt;
  padding-bottom: 0;
}

#nextbutton {
  font-size: 16pt;
  float:right
}


</style>
