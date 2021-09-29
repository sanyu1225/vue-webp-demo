<template>
  <h1>png</h1>
  <img src="@/assets/img/logo.png" />
  <h1>webp</h1>
  <img v-webp src="@/assets/img/logo.png" />
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
