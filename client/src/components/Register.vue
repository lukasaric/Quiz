<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex class="register-container" xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="cyan darken-4">
              <v-toolbar-title>Sign up</v-toolbar-title>
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
            <v-spacer></v-spacer>
            <v-btn @click="register" bottom class="orange accent-3">Submit</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import AuthService from '@/services/AuthService';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async register() {
      try {
        await AuthService.register({
          email: this.email,
          password: this.password
        });
        this.$router.push({ path: '/login' });
      } catch (error) {
        this.error = error;
      }
    }

  }
};
</script>

<style scoped>
.register-container {
  margin: 70px;
  max-width:450px;
}
.v-btn {
  width: 90%;
  font-weight: bold;
}
</style>
