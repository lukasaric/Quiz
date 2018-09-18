<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey darken-1">
                <v-toolbar-title>Register</v-toolbar-title>
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
                <v-spacer></v-spacer>
                <v-btn @click="register" class="orange accent-3">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
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
.login-box {
  margin: auto;
  margin-top: 9rem;
}
</style>
