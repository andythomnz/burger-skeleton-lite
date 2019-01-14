<template>
<div id="orders">
  <NavBar
    style="height:10vh"
    nextRoute=""
    backRoute=""
    showCart=''>
  </NavBar>
  <h1>{{ uiLabels.stock }}</h1>
  <div class='table'>
    <div class='head'>
      <p :class="tableBuns" v-on:click="changeTable('BreadTable')">{{ uiLabels.bun }}</p>
      <p :class="tableProtein" v-on:click="changeTable('MainTable')">{{ uiLabels.protein }}</p>
      <p :class="tableVeggies" v-on:click="changeTable('SideTable')">{{ uiLabels.vegetables }}</p>
      <p :class="tableSauces" v-on:click="changeTable('SauceTable')">{{ uiLabels.sauces }}</p>
      <p :class="tableSides" v-on:click="changeTable('SnackTable')">{{ uiLabels.sides }}</p>
      <p :class="tableDrinks" v-on:click="changeTable('DrinkTable')">{{ uiLabels.drinks }}</p>
    </div>
  <div class='body'>
    <div
      v-for="item in ingredients"
      v-if='item.category==cat'
      :key="item.ingredient_id">
      <p>{{item["ingredient_"+lang]}}</p>
      <p v-if="item.stock>10" class='stock'>{{ item.stock }}</p>
      <p v-else class='stockred'>{{ item.stock }}</p>
    </div>
  </div>
</div>
</div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Stock',
  components: {
    NavBar
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      tableProtein: '',
      tableBuns: 'tableName',
      tableVeggies: '',
      tableSauces: '',
      tableSides: '',
      tableDrinks: '',
      cat: 4,
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    changeTable: function (table) {
      this.clear();
      if (table==='MainTable') {
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
    clear: function () {
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

h1 {
    border-bottom-style: outset;
    border-bottom-color: rgb(253, 202, 124);
    border-bottom-width: medium;
    width: 10%
  }

#orders {
    font-size:1.5vw;
  }
.head {
  display: flex
}
.head p {
    margin-top:0;
    margin-bottom:0;
    font-weight: bold;
    border-style:inset;
    border-radius: 8px;
    border-color: rgb(253, 202, 124);
    background-color:rgb(255, 225, 185);
    padding-left: 1%;
    padding-right: 1%;
  }
.table {
    margin-left:auto;
    margin-right:auto;
    height: auto;
    text-align: left;
    border-style:inset;
    border-radius: 8px;
    border-color: rgb(253, 202, 124);
  }
.tableName {
    color : rgb(184, 136, 93);
  }
.body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  }
.body div {
    text-transform: capitalize;
    flex-basis: 10%;
    padding-left: 1%;
    padding-right: 1%;
    border-style:inset;
    border-radius: 8px;
    border-color: rgb(253, 202, 124);
    background-color:rgb(255, 225, 185);
  }
.stock {
  font-weight: bold;
  color: green
}
.stockred {
  font-weight: bold;
  color: red
}
</style>
