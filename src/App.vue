<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="quote in quotes" :key="quote.text">
        {{ quote.text }} - {{ quote.author }}
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Axios from 'axios';
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    quotes: [],
  }),
  async created() {
    const response = await Axios.get('getQuotes');
    this.quotes = response.data.quotes;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
