<template>
  <div id="app">
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
#app {
  background: url('./assets/global_bg.jpg') no-repeat center center fixed;
  background-size: 100% 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.danger-alert {
  color: red;
}
.global_img {
  display: block;
  height: 100%;
  width: 100%;
  opacity: 1;
  position:fixed;
}
</style>
