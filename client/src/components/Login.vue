<template>
  <section>
    <div class="hero-body">
      <div class="columns is-centered">
        <div class="column login-box">
          <div class="content is-medium">
            <h1>Log In</h1>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="email" class="input" type="email" placeholder="Email" />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </p>
          </div>
          <br/>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="password" class="input" type="password" placeholder="Password"/>
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <br/>
          <div class="columns is-centered is-mobile">
            <router-link to="/register">
              <a class="button is-light is-pulled-right" style="margin-right: 5px">Register</a>
            </router-link>
            <a @click="login" class="button is-light is-pulled-right" >Log In</a>
          </div>
          <a @click="googleLogin" href="/auth/google" target="_blank" class="button has-text-white is-text is-small is-centered">Log In with Google</a>
        </div>
      </div>
    </div>
  </section>
</template>;

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
.columns {
  width: 100%;
}

.login-box {
  border-radius: 15px;
  background-color:#003333;
  max-width: 480px;
  margin: auto;
  margin-top: 9rem;
}

.center {
  padding-bottom: 3rem;
  margin-bottom: 5rem;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content h1 {
  color: white;
}

img {
  display: inline;
}

.button {
  opacity: 0.6;
  transition: opacity .55s ease-in-out;
  -moz-transition: opacity .55s ease-in-out;
  -webkit-transition: opacity .55s ease-in-out;
}

.button:hover {
  background-color: orange;
  opacity: 1.0;
  transition: opacity .55s ease-in-out;
  -moz-transition: opacity .55s ease-in-out;
  -webkit-transition: opacity .55s ease-in-out;
}
</style>
