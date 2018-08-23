<template>
  <section>
    <div class="hero-body">
      <div class="columns is-centered">
        <div class="column register-box is-narrow-tablet">
          <div class="content is-medium">
            <h1>Register</h1>
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
            <a @click="register" class="button is-light is-pulled-right">Register</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>;

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
        const response = await AuthService.register({
          email: this.email,
          password: this.password
        });
        console.log(response);
        this.$router.push({ path: '/login' });
      } catch (error) {
        this.error = error;
      }
    }

  }
};
</script>

<style scoped>
.columns {
  width: 100%;
}

.register-box {
  border-radius: 15px;
  background-color:#003333;
  max-width: 480px;
  margin: auto;
  margin-top: 9rem;
  padding-bottom: 2rem;
}

.content {
  width: 480px;
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
