<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex class="login-container" xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="cyan darken-4">
              <v-toolbar-title>Sing in</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  prepend-icon="person"
                  name="email"
                  type="Email"
                  label="Email"
                  color ="orange accent-3">
                </v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  type="password"
                  label="Password"
                  color ="orange accent-3">
                </v-text-field>
              </v-form>
            </v-card-text>
            <a @click="navigateTo('register')">Don't have account? Click here.</a>
            <br>
            <v-btn @click="login" class="orange accent-3">Login</v-btn>
            <br>
            <v-chip>or</v-chip>
            <br>
            <v-btn class="white--text" href="/auth/google" target="_blank" color="#d34836">
              <i class="fa fa-google-plus"></i>
              Sign in with google
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    }
  }
};
</script>

<style scoped>
.fa-google-plus {
  color: white;
  margin-left: 10px;
  padding-right: 5px;
  font-size: 2rem;
}
.v-btn {
  width: 90%;
  font-weight: bold;
}
.white--text {
  text-transform: none !important;
  font-weight: normal;
}
.login-container {
  margin: 70px;
  max-width:450px;
}
.elevation-12 {

}
</style>
