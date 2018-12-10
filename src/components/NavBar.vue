<template>
  <div class="bar-wrapper">
    <!-- needs boolean for show, 
         an icon
        and the parent component should pass a function
    or URL to the page for the funtion-->
    <div>
      <basicButton text="back"></basicButton>
    </div>
    <div class="center">
    <slot name="center-component"></slot>
    </div>
    <div>
      <basicButton text="Next"></basicButton>
    </div>
    <div>
      <basicButton text="Cart">Cart</basicButton>
    </div>
  </div>
</template>
<script>
import basicButton from "@/components/basicButton.vue";

export default {
  name: "NavBar",
  components: {
    basicButton
  },
  props: {
    text: String,
    icon: String
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.bar-wrapper {
  text-align: center;
  width: 100%;
  padding-top: 0;
  border-bottom-color: grey;
  border-bottom-style: solid;
  padding-bottom: 0.5%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 10% auto 10% 10%;
}

#text {
  font-weight: bold;
}

.center {
  margin: auto auto; 
}
</style>
