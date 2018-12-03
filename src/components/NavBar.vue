<template>
  <div class="bar-wrapper">
    <!-- needs boolean for show,
         an icon
        and the parent component should pass a function
        or URL to the page for the funtion -->
    <basicButton text="back"></basicButton>
    <slot name="center-component"></slot>
    <basicButton text="Next"></basicButton>
    <basicButton text="Cart">Cart</basicButton>
  </div>
</template>
<script>

import basicButton from '@/components/basicButton.vue'

export default {
  name: 'NavBar',
  components:{
    basicButton
  },
  props: {
    text: String,
    icon: String,
  },
    data: function () {
    return {

    };
  },
  methods: {


    }
  }

</script>
<style scoped>

.bar-wrapper {
  text-align: center ;
  width: 100%;
  padding-top:0;
  border-bottom-color: grey;
  border-bottom-style: solid;
  padding-bottom: 0.5%;
  display: grid;
	grid-gap: 10px;
	grid-template-columns: auto auto auto auto;
}

#text {
  font-weight: bold
}

</style>
