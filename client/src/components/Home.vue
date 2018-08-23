<template>
  <section>
    <div class="hero-body">
      <div class="container ">
        <figure class="image center">
          <img src="../assets/devRh.png" style="width: 17rem">
        </figure>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-half " >
        <div class="notification is-rounded" style="background-color: #003333">
          <p class="is-size-5 center has-text-white">
            Test your knowledge!
          </p> <br>
          <router-link to="/login">
            <a class="button center is-rounded is-medium">Start </a>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.notification {
  border-radius: 15px;
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

.notification a:not(.button) {
  text-decoration: none;
}
</style>
