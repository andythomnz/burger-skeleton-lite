<template>
  <div class="splitpage">
    <slot name='left'></slot>
    <slot name='right'></slot>
    <!-- <p><button v-on:click="Button1Click()"><img :src="icon1" width=300px> <br> {{text1}}</button></p>
    <p><button v-on:click="Button2Click()"><img :src="icon2" width=300px> <br> {{text2}}</button></p> -->
  </div>
</template>
<script>
export default {
  name: 'SplitPage',
  props: {
    text1: String,
    text2: String,
    icon1: String,
    icon2: String
  },
    data: function () {
    return {

    };
  },
  methods: {
    Button1Click: function(){
      this.$emit('button1click');
    },
    Button2Click: function(){
      this.$emit('button2click');
    },
    }
  }

</script>
<style scoped>
.splitpage{
  display: flex; justify-content:space-evenly; wrap:wrap; flex-wrap:wrap;
}

.splitpage p {
  text-align: center;
  width: 50%;
  height:100%;



}

.splitpage img {
  padding-bottom: 2em;
}

.splitpage button:hover,
.splitpage button:focus{
  background: lightyellow; cursor: pointer;
}


.splitpage button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}

.splitpage button:active {
    transform: scale(0.99);
}



.splitpage button{
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
