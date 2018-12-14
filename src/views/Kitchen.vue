<template>
<div id="orders">
  <h1>{{ uiLabels.ordersInQueue }}</h1>
  <table id="completeTable" >
    <thead>
      <tr>
        <th colspan="3" class="tableName" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="3" v-on:click="changeTable('hotTable')">Hot kitchen</th>
        <th colspan="3" v-on:click="changeTable('coldTable')">Cold kitchen</th>
        <th colspan="3" v-on:click="changeTable('sideTable')">Sides drink</th>
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
  <table id="hotTable" >
    <thead>
      <tr>
        <th colspan="3"  v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="3" class="tableName" v-on:click="changeTable('hotTable')">Hot kitchen</th>
        <th colspan="3" v-on:click="changeTable('coldTable')">Cold kitchen</th>
        <th colspan="3" v-on:click="changeTable('sideTable')">Sides drink</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>        
      </tr>
      <tr>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>        
      </tr>
    </tbody>
  </table>
  <table id="coldTable" >
    <thead>
      <tr>
        <th colspan="3" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="3" v-on:click="changeTable('hotTable')">Hot kitchen</th>
        <th colspan="3" class="tableName" v-on:click="changeTable('coldTable')">Cold kitchen</th>
        <th colspan="3" v-on:click="changeTable('sideTable')">Sides drink</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
      </tr>
      <tr>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
      </tr>
    </tbody>
  </table>
  <table id="sideTable" >
    <thead>
      <tr>
        <th colspan="3" v-on:click="changeTable('completeTable')">Complete</th>
        <th colspan="3" v-on:click="changeTable('hotTable')">Hot kitchen</th>
        <th colspan="3" v-on:click="changeTable('coldTable')">Cold kitchen</th>
        <th colspan="3" class="tableName" v-on:click="changeTable('sideTable')">Sides drink</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
      </tr>
      <tr>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
        <td colspan="3" height="100"></td>
      </tr>
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

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
	OrderItemIsDone
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
      var tables = document.getElementsByTagName("table")
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