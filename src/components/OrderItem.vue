<template>
  <td colspan="4" height="100">
    {{orderId}} {{order.type}} {{uiLabels.ingredients}}: <div id="comleteItems">{{ order.ingredients.filter(function(item, index, array){return order.prepare[item.category] === 1;}).map(item=>item["ingredient_"+ lang]).join(", ") }}</div>
    <div id="uncomleteItems">{{ order.ingredients.filter(function(item, index, array){return order.prepare[item.category] === 0;}).map(item=>item["ingredient_"+ lang]).join(", ") }}</div>
    <button v-if="needDoneButton==true" v-on:click="orderDone(orderId)">
      {{uiLabels.ready}}
    </button>		
  </td>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: Number,
    lang: String,
    needDoneButton: Boolean
  },
  methods: {
    orderDone: function (id) {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$store.state.socket.emit("orderDone", id);
    }  
  }
}
</script>
<style scoped>
  #comleteItems {
    color: green;
  }
  #uncomleteItems {
    color: gray;
  }  
</style>