<template>
  <section class="hero is-fullheight has-background-white-ter">
    <page-header/>
    <router-view/>
    <page-footer/>
  </section>
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
