<template>
<div id="orders">
  <NavBar
    style="height:10vh"
    nextRoute=""
    backRoute=""
    showCart=''>
  </NavBar>
  <h1>{{ uiLabels.ordersInQueue }}</h1>
  <div class='kitchen'>
    <span :class='kitchenAll' v-on:click="changeKitchen('AllKitchen')">{{ uiLabels.all }}</span>
    <span :class='kitchenHot' v-on:click="changeKitchen('HotKitchen')">{{ uiLabels.hotKitchen }}</span>
    <span :class='kitchenCold' v-on:click="changeKitchen('ColdKitchen')" >{{ uiLabels.coldKitchen }}</span>
  </div>
  <table id="completeTable" class="orderQueue">
    <thead>
      <tr>
        <th colspan="2" :class="tableComplete" v-on:click="changeTable('CompleteTable')">{{ uiLabels.all }}</th>
        <th colspan="2" :class="tableProtein" v-on:click="changeTable('MainTable')" v-if='hot===true'>{{ uiLabels.protein }}</th>
        <th colspan="2" :class="tableVeggies" v-on:click="changeTable('SideTable')" v-if='cold===true'>{{ uiLabels.vegetables }}</th>
        <th colspan="1" :class="tableSauces" v-on:click="changeTable('SauceTable')" v-if='cold===true'>{{ uiLabels.sauces }}</th>
        <th colspan="1" :class="tableBuns" v-on:click="changeTable('BreadTable')" v-if='cold===true'>{{ uiLabels.bun }}</th>
        <th colspan="1" :class="tableSides" v-on:click="changeTable('SnackTable')" v-if='hot===true'>{{ uiLabels.sides }}</th>
        <th colspan="1" :class="tableDrinks" v-on:click="changeTable('DrinkTable')" v-if='cold===true'>{{ uiLabels.drinks }}</th>
      </tr>
    </thead>
  <tbody v-if="cat===0">
    <OrderItemToPrepare
      v-for="(val, key) in notDone"
      v-if="key%3 == 0"
      :order-id="key"
      :not-done="notDone"
      :orders="orders"
      :key="key">
    </OrderItemToPrepare>
  </tbody>
  <tbody v-else>
    <DetailItemToPrepare
      v-for="(val, key) in notDone"
      v-if="key%4 == 0"
      :order-id="key"
      :not-done="notDone"
      :orders="orders"
      :category="cat"
      :key="key">
    </DetailItemToPrepare>
  </tbody>
  </table>
  <h1>{{ uiLabels.ordersFinished }}</h1>
  <table id="finishTable" v-if="isDone.length>0">
  <tbody>
      <OrderItemIsDone
        v-for="(val, key) in isDone"
        v-if="key%3 == 0"
        :order-id="key"
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
import NavBar from "@/components/NavBar.vue";

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemIsDone,
    DetailItemToPrepare,
    NavBar
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      tableComplete: 'tableName',
      tableProtein: '',
      tableBuns: '',
      tableVeggies: '',
      tableSauces: '',
      tableSides: '',
      tableDrinks: '',
      cat: 0,
      kitchenHot: '',
      kitchenCold: '',
      kitchenAll: '',
      hot: true,
      cold: true
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    changeTable: function (table) {
      this.clear();
      if (table==='CompleteTable') {
        this.tableComplete='tableName';
        this.cat=0
      }
      else if (table==='MainTable') {
        this.tableProtein='tableName';
        this.cat=1
      }
      else if (table==='SideTable') {
        this.tableVeggies='tableName';
        this.cat=2
      }
      else if (table==='SauceTable') {
        this.tableSauces='tableName';
        this.cat=3
      }
      else if (table==='BreadTable') {
        this.tableBuns='tableName';
        this.cat=4
      }
      else if (table==='SnackTable') {
        this.tableSides='tableName';
        this.cat=5
      }
      else if (table==='DrinkTable') {
        this.tableDrinks='tableName';
        this.cat=6
      }
    },
    changeKitchen: function (kitchen) {
      if (kitchen=='HotKitchen') {
        this.kitchenCold='';
        this.kitchenAll='';
        this.kitchenHot= 'tableName';
        this.hot=true;
        this.cold=false
      }
      else if (kitchen==='ColdKitchen'){
        this.kitchenHot='';
        this.kitchenAll='';
        this.kitchenCold= 'tableName',
        this.cold=true;
        this.hot=false
      }
      else {
        this.kitchenHot='';
        this.kitchenAll='tableName';
        this.kitchenCold= '',
        this.cold=true;
        this.hot=true
      }
    },
    clear: function () {
      this.tableComplete= '';
      this.tableProtein= '';
      this.tableBuns= '';
      this.tableVeggies= '';
      this.tableSauces= '';
      this.tableSides= '';
      this.tableDrinks= '';
      this.cat=0
    }
  }
}
</script>
<style scoped>
  body{
    background: #FAFAFA;
  }

  h1 {
    border-bottom-style: outset;
    border-bottom-color: rgb(253, 202, 124);
    border-bottom-width: medium;
    width: 55%
  }

  #orders {
    font-size:1.5vw;
  }

  th {
    border-style:inset;
    border-radius: 8px;
    border-color: rgb(253, 202, 124);
    background-color:rgb(255, 225, 185);
    padding-left: 0.5%
  }
  table {
    margin-left:auto;
    margin-right:auto;
    display:none;
    width: 100%;
    text-align: left;
  }

  #completeTable {
    display:table;
    margin-top: 1%
  }
  #finishTable {
    display:table;
  }
  table, td, th{
    border-style:inset;
    border-radius: 8px;
    border-color: rgb(253, 202, 124);
  }
  .tableName {
    color : red;
  }
  .kitchen{
    margin-top: 1%;
    font-weight: bold;
    margin-left: 35%
  }
  .kitchen span {
    padding-left: 1%;
    padding-right: 1%;
    margin-right: 1%;
    border-style:inset;
    border-radius: 8px;
    border-color: rgb(253, 202, 124);
    background-color:rgb(255, 225, 185);
  }
</style>
