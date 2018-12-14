<template>
<div id="orders">
  <h1>{{ uiLabels.ordersInQueue }}</h1>
  <table id="completeTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" class="tableName" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="2" v-on:click="changeTable('MainTable')">Main course</th>
        <th colspan="2" v-on:click="changeTable('sideTable')">Side</th>
        <th colspan="2" v-on:click="changeTable('sauceTable')">Sauce</th>
		<th colspan="2" v-on:click="changeTable('breadTable')">Bread</th>
		<th colspan="1" v-on:click="changeTable('snackTable')">Snack</th>
		<th colspan="1" v-on:click="changeTable('drinkTable')">Drink</th>
      </tr>
    </thead>
	<tbody>
      <OrderItemToPrepare
        v-for="(val, key) in notDone"
        v-if="key%3 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:not-done="notDone"
		:orders="orders"
        :key="key">
      </OrderItemToPrepare>
	</tbody>
  </table>
  <table id="MainTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="2" class="tableName" v-on:click="changeTable('MainTable')">Main course</th>
        <th colspan="2" v-on:click="changeTable('sideTable')">Side</th>
        <th colspan="2" v-on:click="changeTable('sauceTable')">Sauce</th>
		<th colspan="2" v-on:click="changeTable('breadTable')">Bread</th>
		<th colspan="1" v-on:click="changeTable('snackTable')">Snack</th>
		<th colspan="1" v-on:click="changeTable('drinkTable')">Drink</th>
      </tr>
    </thead>
    <tbody>
      <DetailItemToPrepare
        v-for="(val, key) in notDone"
        v-if="key%4 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:not-done="notDone"
		:orders="orders"
		:category="1"
        :key="key">
      </DetailItemToPrepare>
    </tbody>
  </table>
  <table id="sideTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="2" v-on:click="changeTable('MainTable')">Main course</th>
        <th colspan="2" class="tableName" v-on:click="changeTable('sideTable')">Side</th>
        <th colspan="2" v-on:click="changeTable('sauceTable')">Sauce</th>
		<th colspan="2" v-on:click="changeTable('breadTable')">Bread</th>
		<th colspan="1" v-on:click="changeTable('snackTable')">Snack</th>
		<th colspan="1" v-on:click="changeTable('drinkTable')">Drink</th>
      </tr>
    </thead>
    <tbody>
      <DetailItemToPrepare
        v-for="(val, key) in notDone"
        v-if="key%4 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:not-done="notDone"
		:orders="orders"
		:category="2"
        :key="key">
      </DetailItemToPrepare>
    </tbody>
  </table>
  <table id="sauceTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="2" v-on:click="changeTable('MainTable')">Main course</th>
        <th colspan="2" v-on:click="changeTable('sideTable')">Side</th>
        <th colspan="2" class="tableName" v-on:click="changeTable('sauceTable')">Sauce</th>
		<th colspan="2" v-on:click="changeTable('breadTable')">Bread</th>
		<th colspan="1" v-on:click="changeTable('snackTable')">Snack</th>
		<th colspan="1" v-on:click="changeTable('drinkTable')">Drink</th>
      </tr>
    </thead>
    <tbody>
      <DetailItemToPrepare
        v-for="(val, key) in notDone"
        v-if="key%4 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:not-done="notDone"
		:orders="orders"
		:category="3"
        :key="key">
      </DetailItemToPrepare>
    </tbody>
  </table>
  <table id="breadTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="2" v-on:click="changeTable('MainTable')">Main course</th>
        <th colspan="2" v-on:click="changeTable('sideTable')">Side</th>
        <th colspan="2" v-on:click="changeTable('sauceTable')">Sauce</th>
		<th colspan="2" class="tableName" v-on:click="changeTable('breadTable')">Bread</th>
		<th colspan="1" v-on:click="changeTable('snackTable')">Snack</th>
		<th colspan="1" v-on:click="changeTable('drinkTable')">Drink</th>
      </tr>
    </thead>
    <tbody>
      <DetailItemToPrepare
        v-for="(val, key) in notDone"
        v-if="key%4 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:not-done="notDone"
		:orders="orders"
		:category="4"
        :key="key">
      </DetailItemToPrepare>
    </tbody>
  </table> 
  <table id="snackTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="2" v-on:click="changeTable('MainTable')">Main course</th>
        <th colspan="2" v-on:click="changeTable('sideTable')">Side</th>
        <th colspan="2" v-on:click="changeTable('sauceTable')">Sauce</th>
		<th colspan="2" v-on:click="changeTable('breadTable')">Bread</th>
		<th colspan="1" class="tableName" v-on:click="changeTable('snackTable')">Snack</th>
		<th colspan="1" v-on:click="changeTable('drinkTable')">Drink</th>
      </tr>
    </thead>
    <tbody>
      <DetailItemToPrepare
        v-for="(val, key) in notDone"
        v-if="key%4 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:not-done="notDone"
		:orders="orders"
		:category="5"
        :key="key">
      </DetailItemToPrepare>
    </tbody>
  </table> 
  <table id="drinkTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="2" v-on:click="changeTable('MainTable')">Main course</th>
        <th colspan="2" v-on:click="changeTable('sideTable')">Side</th>
        <th colspan="2" v-on:click="changeTable('sauceTable')">Sauce</th>
		<th colspan="2" v-on:click="changeTable('breadTable')">Bread</th>
		<th colspan="1" v-on:click="changeTable('snackTable')">Snack</th>
		<th colspan="1" class="tableName" v-on:click="changeTable('drinkTable')">Drink</th>
      </tr>
    </thead>
    <tbody>
      <DetailItemToPrepare
        v-for="(val, key) in notDone"
        v-if="key%4 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:not-done="notDone"
		:orders="orders"
		:category="6"
        :key="key">
      </DetailItemToPrepare>
    </tbody>
  </table>   
  <h1>{{ uiLabels.ordersFinished }}</h1>
  <table id="finishTable" >	
	<tbody>
      <OrderItemIsDone
        v-for="(val, key) in isDone"
        v-if="key%3 == 0"
        :order-id="key"
        :ui-labels="uiLabels"
        :lang="lang"
		:is-done="isDone"
		:orders="orders"
        :key="key">
      </OrderItemIsDone>
	</tbody>
  </table>  
</div>	
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemIsDone from '@/components/OrderItemIsDone.vue'
import DetailItemToPrepare from '@/components/DetailItemToPrepare.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
	OrderItemIsDone,
	DetailItemToPrepare
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    changeTable: function (id) {
      var tables = document.getElementsByClassName("orderQueue")
      for(var i=0; i<tables.length; i++){
        tables[i].style.display = "none";
      }
      document.getElementById(id).style.display = "table";
    }	
  }
}
</script>
<style scoped>
	#orders {
    font-size:24pt;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  table {
    margin-left:auto; 
    margin-right:auto;
    display:none;
  }
  #completeTable {
    display:table;
  }
  #finishTable {
    display:table;
  }  
  table, td, th{
    border: 1px solid black;
  }
  .tableName {
    color : red;
  }  
</style>