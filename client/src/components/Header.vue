<template>
  <v-toolbar fixed class="navbar" dark>
    <v-toolbar-title class="mr-4">
      <div class="navbar-brand">
        <a @click="navigateTo('/')" class="navbar-item">
          <img src="../assets/devRhcrop.png" alt="devRhapsody"/>
        </a>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="!loggedIn"
        @click="navigateTo('/login')"
        flat>
        Login
      </v-btn>
      <v-btn
        v-if="!loggedIn"
        @click="navigateTo('/register')"
        flat>
        Sign Up
      </v-btn>
      <v-menu v-if="loggedIn" bottom left transition="slide-x-transition">
        <v-btn slot="activator" icon>
          <v-icon>list</v-icon>
        </v-btn>
        <v-list light>
          <v-list-tile
            v-for="(item, i) in items"
            :key="i"
            @click="navigateTo(item.link)">
            <v-icon>fa fa-{{ item.icon }}</v-icon>
            <v-list-tile-title>{{ item.label }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            @click="logout">
            <v-icon>fa fa-sign-in</v-icon>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
const items = [{
  label: 'Home',
  link: '/',
  icon: 'home'
},
{
  label: 'Profile',
  link: '/profile',
  icon: 'user'
}];

export default {
  name: 'app-header',

  data() {
    return { items };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },

    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    }
  }
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: rgb(219, 112, 25);
}
.navbar-brand .navbar-item img {
  max-height: 60px;
  margin-top:8px;
}
.navbar {
  background-color: #7ed6df;
  background-image: linear-gradient(315deg, #006064 0%, #000000 74%);
}
.v-icon {
  padding-right: 10px;
  color: #FF9100;
}
</style>
