<template>
  <td colspan="4" height="100">
    {{uiLabels.order}} {{orderId}}{{order.type}}:
    <ul id="completeItems">
      <li v-for="(item, index) in order.ingredients.filter(function(item){return order.prepare[item.category] === 1;})" :key="index">
        {{ item["ingredient_" +lang] }}
      </li>
    </ul>
    <ul id="uncompleteItems">
      <li v-for="(item, index) in order.ingredients.filter(function(item){return order.prepare[item.category] === 0;})" :key="index">
        {{ item["ingredient_" +lang] }}
      </li>
    </ul>
    <button v-if="needDoneButton==true" v-on:click="orderDone(orderId)">
      {{uiLabels.ready}}
    </button>
  </td>
</template>
<script>
import sharedVueStuff from "@/components/sharedVueStuff.js";
export default {
  name: 'OrderItem',
  props: {
    order: Object,
    orderId: Number,
    needDoneButton: Boolean
  },
  mixins: [sharedVueStuff],
  data: function () {
    return {

    }
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
  #completeItems {
    color: green;
  }
  #uncompleteItems {
    color: gray;
  }
  button {
    font-size: 1vw
  }
</style>
