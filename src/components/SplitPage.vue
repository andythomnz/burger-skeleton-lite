<template>
  <div class="splitpage">
    <div>
      <slot name='left'></slot>
    </div>
    <div>
      <slot name='right'></slot>
    </div>

  </div>
</template>
<script>
export default {
  name: 'SplitPage',
  props: {

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
.splitpage{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50% 50%;

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
  width: 100%;
  height: 100%;
}
</style>
