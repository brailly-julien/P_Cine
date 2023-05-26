<template>
  <div id="app">
    <div class="container">
      <router-link to="/">
        <img alt="Vue logo" src="./assets/logo2.png" class="logo">
      </router-link>
      <router-view></router-view>
    </div>
  </div>
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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  background-image: url('./assets/bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.container {
  padding: 50px;
  background-color: #becfdd;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  min-width: 500px;
}

.logo {
  max-width: 100px;
  margin-bottom: 10px;
}
</style>
