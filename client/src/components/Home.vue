<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex class="logo-btn">
          <figure class="image center">
            <img src="../assets/devRh.png" style="width: 17rem">
          </figure>
          <v-btn
            @click="navigateTo()"
            class="mx-0"
            color="orange accent-3"
            large>
            Get started
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
  methods: {
    navigateTo() {
      const isLogged = this.$store.getters.isAuthenticated;
      if (!isLogged) this.$router.push({ name: 'login' });
      else this.$router.push({ name: 'topics' });
    }
  }
};
</script>

<style scoped>
.logo-btn {
  margin-bottom: 120px;
}
</style>
