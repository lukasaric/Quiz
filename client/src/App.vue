<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
    <v-app>
      <page-header />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
      <page-footer />
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/Header';
import PageFooter from './components/Footer';
export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
