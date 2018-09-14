<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">
            <figure class="image center">
              <img src="../assets/devRh.png" style="width: 17rem">
            </figure>
          </h3>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Test your knowledge!</div>
          <v-btn
            @click="navigateTo()"
            class="mx-0"
            color="orange accent-3"
            large>
            Start
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
</style>
