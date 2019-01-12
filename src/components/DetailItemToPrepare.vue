<template>
  <!-- Note in this component that it is using another component -->
  <tr>
    <DetailItem
      v-for="n in 4"
      v-if="notDone[orderId+n-1] !== undefined"
      :lang="lang"
      :order-id="notDone[orderId+n-1]"
      :order="orders[notDone[orderId+n-1]]"
      :category="category">
    </DetailItem>
  </tr>
</template>
<script>
import DetailItem from '@/components/DetailItem.vue'
import sharedVueStuff from "@/components/sharedVueStuff.js";
export default {
  name: 'DetailItemToPrepare',
  components: { DetailItem },
  props: {
    orderId: Number,
    lang: String,
	  notDone: Array,
	  orders: Object,
	  category: Number
  },
  mixins: [sharedVueStuff],
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
