<template>
  <div>
    <NavBar :text="headtext" id="textinbar">
      <p slot="center-component" style="text-align:center center;"> Welcome to ...</p>
    </NavBar>
    <div id="body">
      <SplitPage>
        <template slot="left">
          <basicButton
            :text="leftComponentText"
            :icon="leftComponentIcon"
            v-on:buttonclick="NextPage()"
          ></basicButton>
        </template>
        <template slot="right">
          <basicButton
            :text="rightComponentText"
            :icon="rightComponentIcon"
            v-on:buttonclick="NextPage()"
          ></basicButton>
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
      leftComponentText:'Eat in',
      leftComponentIcon:require('../assets/restaurant.png'),
      rightComponentText:'Take Away',
      rightComponentIcon:require('../assets/takeaway.png'),
      headtext:'Welcome to Kraft Burgers',
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
    text-align: auto auto;
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
