<template>
    <button v-on:click="ButtonClick()">
      <img :src="icon">
      <br>
      <p class="buttonText" id="text">{{text}}</p>
      <p>{{secondaryText}}</p>
    </button>
</template>
<script>
export default {
  name: 'basicButton',
  props: {
    text: String,
    icon: String,
    secondaryText: Number
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


img {
  padding-bottom: 0.5em;
  padding-top: 1em
}

.buttonText {
      margin-block-start: 0em;
    margin-block-end: 0em;
}

button:hover{
  background: lightyellow; cursor: pointer;
}

button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}

button:active {
    transform: scale(0.99);
    outline:yellow auto 5
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
}


</style>
