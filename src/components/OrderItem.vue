<template>
  <td colspan="4" height="100">
    {{orderId}} {{order.type}} {{uiLabels.ingredients}}: {{ order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
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
      if(this.order.status == "started"){
        this.$store.state.socket.emit("orderDone", id);
      }
    }  
  }
}
</script>
<style scoped>
	
</style>