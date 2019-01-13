<template>
  <!-- Note in this component that it is using another component -->
  <tr>
    <OrderItem
      v-for="n in 3"
      v-if="isDone[orderId+n-1] !== undefined"
      :key="n"
      :order-id="isDone[orderId+n-1]"
      :order="orders[isDone[orderId+n-1]]"
      :needDoneButton="false">
    </OrderItem>
  </tr>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import sharedVueStuff from "@/components/sharedVueStuff.js";
export default {
  name: 'OrderItemIsDone',
  components: { OrderItem },
  props: {
    orderId: Number,
  },
  mixins: [sharedVueStuff],
  data: function () {
    return {
      isDone: Array,
  	  orders: Object,
    };
  },
  methods: {

  }
}
</script>
<style scoped>

  table, td, th{
    border-style:inset;
    border-radius: 8px;
    border-color: rgb(253, 202, 124);
    background-color:rgb(255, 225, 185);
  }



</style>
