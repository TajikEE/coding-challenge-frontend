<template>
  <div id="app">
    <div id="nav">
      <img alt="Vue logo" src="./assets/logo.png" />

      <router-link to="/">Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #382222;
  font-size: 1rem;
  text-align: center;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}

#nav {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;

  >img {
    max-width: 8rem;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
