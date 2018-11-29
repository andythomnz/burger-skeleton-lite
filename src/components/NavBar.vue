<template>

  <div class='bar-wrapper'>
    <slot name="back"></slot><span id="text">{{ text }}</span></div>

</template>
<script>
export default {
  name: 'NavBar',
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
  text-align: center;
  width: 100%;
  padding-top:0;
  border-bottom-color: grey;
  border-bottom-style: solid;
  padding-bottom: 0.5%
}

#text {
  font-weight: bold
}

</style>
