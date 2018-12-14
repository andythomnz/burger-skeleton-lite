<template>
  <!-- Note in this component that it is using another component -->
<div>
  <table id="completeTable" >
    <thead>
      <tr>
        <th colspan="3" class="tableName">Complete</th>
        <th colspan="3">Hot drink</th>
        <th colspan="3">Cold kitchen</th>
        <th colspan="3">Sides drink</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" height="100">Burger</td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
      <tr>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
    </tbody>
  </table>
  <table id="hotTable" >
    <thead>
      <tr>
        <th colspan="3">Complete</th>
        <th colspan="3" class="tableName">Hot drink</th>
        <th colspan="3">Cold kitchen</th>
        <th colspan="3">Sides drink</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" height="100">Burger</td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
      <tr>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
    </tbody>
  </table>
  <table id="coldTable" >
    <thead>
      <tr>
        <th colspan="3">Complete</th>
        <th colspan="3">Hot drink</th>
        <th colspan="3" class="tableName">Cold kitchen</th>
        <th colspan="3">Sides drink</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" height="100">Burger</td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
      <tr>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
    </tbody>
  </table>
  <table id="sideTable" >
    <thead>
      <tr>
        <th colspan="3">Complete</th>
        <th colspan="3">Hot drink</th>
        <th colspan="3">Cold kitchen</th>
        <th colspan="3" class="tableName">Sides drink</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" height="100">Burger</td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
      <tr>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
        <td colspan="4" height="100"></td>
      </tr>
    </tbody>
  </table>

  <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="order">
  </OrderItem>
  <button v-on:click="orderDone">
    {{uiLabels.ready}}
  </button>
</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    },
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
  table, td, th{
    border: 1px solid black;
  }
  .tableName {
    color : red;
  }
</style>