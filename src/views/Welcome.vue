<template>
<div >
  <h1>Welcome to Kraft Burgers</h1>
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
  name: 'Welcome',
  components: {
    SplitPage
  },
  // mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      text1:'Eat in',
      text2:'Take Away',
      icon1:'https://cdn4.iconfinder.com/data/icons/kitchen-glyph-2/96/eat._restaurant_plate_utensil_kitchen-512.png',
      icon2:'http://www.meathgoldcoast.com/ServicePics/CategoryIcons/takeaway.png'
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
