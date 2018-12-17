<template>
  <td colspan="3" height="100">
    {{orderId}} : {{ order.ingredients.filter(function(item, index, array){return item.category === category;}).map(item=>item["ingredient_"+ lang]).join(", ") }}
    <button v-if="order.prepare[category]==0" v-on:click="itemDone(orderId, category)">
      {{uiLabels.ready}}
    </button>		
  </td>
</template>
<script>
export default {
  name: 'DetailItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: Number,
    lang: String,
    category: Number
  },
  methods: {
    itemDone: function (id, item) {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$store.state.socket.emit("itemDone", id, item);
    }  
  }
}
</script>
<style scoped>

</style>