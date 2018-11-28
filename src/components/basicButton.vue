<template>

  <div><button v-on:click="ButtonClick()"><img :src="icon" width=300px> <br> {{text}}</button></div>

</template>
<script>
export default {
  name: 'basicButton',
  props: {
    text: String,
    icon: String,
  },
    data: function () {
    return {

    };
  },
  methods: {
    ButtonClick: function(){
      this.$emit('buttonclick');
    },

    }
  }

</script>
<style scoped>

div {
  text-align: center;
  width: 50%;
  height:100%;



}

img {
  padding-bottom: 2em;
}

button:hover,
button:focus{
  background: lightyellow; cursor: pointer;
}


button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}

button:active {
    transform: scale(0.99);
}



button{
  border:none;
  background: none;
  text-align: center;
  font-size: 20pt;
  font-weight: bold;
  transition: background 250ms ease-in-out,
                transform 150ms ease;
  display: block;
  width: 100%
}
</style>
