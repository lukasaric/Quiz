<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey darken-1">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    prepend-icon="person"
                    name="email"
                    type="Email"
                    label="Email">
                  </v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    type="password"
                    label="Password">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <a href="/auth/google" target="_blank">
                  <i class="fa fa-google-plus"></i>
                </a>
                <v-spacer></v-spacer>
                <v-btn @click="login" class="orange accent-3">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    login() {
      const credentials = { email: this.email, password: this.password };
      this.$store.dispatch('login', credentials)
        .then(() => {
          this.$router.push({ path: '/topics' });
        });
    }
  }
};
</script>

<style scoped>
.fa-google-plus {
  color: #d34836;
  margin-left: 10px;
  font-size: 2rem;
}
</style>
