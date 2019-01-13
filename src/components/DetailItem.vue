<template>
  <td colspan="3" height="100">
    {{uiLabels.order}} {{orderId}}:
    <ul>
      <li v-for="(item, key) in order.ingredients.filter(function(item){return item.category === category;})" :key="key">
        {{ item["ingredient_"+ lang]}}
      </li>
    </ul>
    <button id='btn' v-if="order.prepare[category]==0" v-on:click="itemDone(orderId, category)">
      {{uiLabels.ready}}
    </button>
  </td>
</template>
<script>
import sharedVueStuff from "@/components/sharedVueStuff.js";
export default {
  name: 'DetailItem',
  props: {
    order: Object,
    orderId: Number,
    category: Number
  },
  mixins: [sharedVueStuff],
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

button {
  font-size: 1vw
}

li {
  font-size: 1.2vw
}

</style>
