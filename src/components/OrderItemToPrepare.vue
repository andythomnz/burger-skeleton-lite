<template>
  <!-- Note in this component that it is using another component -->
  <tr>
    <OrderItem
      v-for="n in 3"
      v-if="notDone[orderId+n-1] !== undefined"
      :key="n"
      :order-id="notDone[orderId+n-1]"
      :order="orders[notDone[orderId+n-1]]"
      :needDoneButton="orders[notDone[orderId+n-1]].status == 'started'">
    </OrderItem>
  </tr>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import sharedVueStuff from "@/components/sharedVueStuff.js";
export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    orderId: Number,
  },
  mixins: [sharedVueStuff],
  data: function () {
    return {
      notDone: Array,
  	  orders: Object,
    };
  },
  methods: {

    cancelOrder: function () {
      // not implemented
    }
  }
}
</script>
<style scoped>
  table {
    margin-left:auto;
    margin-right:auto;
    display:none;
  }
  #completeTable {
    display:table;
  }
  table, td, th{
    border: 1px solid black;
  }
  .tableName {
    color : red;
  }
</style>
