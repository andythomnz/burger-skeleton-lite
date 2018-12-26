<template>
  <!-- Note in this component that it is using another component -->
  <tr>
    <OrderItem
      v-for="n in 3"
      v-if="isDone[orderId+n-1] !== undefined"
      :ui-labels="uiLabels"
      :lang="lang"
      :order-id="isDone[orderId+n-1]"
      :order="orders[isDone[orderId+n-1]]"
      :needDoneButton="false">
    </OrderItem>
  </tr>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemIsDone',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    orderId: Number,
    lang: String,
    isDone: Array,
    orders: Object
  },
  methods: {

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