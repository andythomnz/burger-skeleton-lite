<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
body {
  height: 100%;
  background: #FAFAFA;
  background-size: 200% 200%;
  font-family: "Verdana"
}

@keyframes Gradient {
  0% {
    background-position: 10% 10%;
  }
  20% {
    background-position: 50% 50%;
  }
  40% {
    background-position: 10% 90%;
  }
  60% {
    background-position: 90% 90%;
  }
  80% {
    background-position: 90% 10%;
  }
  100% {
    background-position: 10% 10%;
  }
}
</style>
