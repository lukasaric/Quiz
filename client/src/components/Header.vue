<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="../assets/devRhcrop.png" alt="devRhapsody"/>
      </a>
    </div>
    <div id="navMenu" class="navbar-menu is-active">
      <div class="navbar-end is-pulled-right">
        <b-dropdown position="is-bottom-left">
          <a slot="trigger" class="navbar-item has-text-white" >
            <span>Menu</span>
            <span class="icon">
              <i class="fa fa-angle-double-down"></i>
            </span>
          </a>
          <div v-if="!loggedIn">
            <b-dropdown-item custom>
              <router-link to="/login" class="navbar-item">
                Login
              </router-link>
            </b-dropdown-item>
            <hr class="dropdown-divider"/>
            <b-dropdown-item custom>
              <router-link to="/register" class="navbar-item">
                Register
              </router-link>
            </b-dropdown-item>
          </div>
          <div v-else>
            <b-dropdown-item custom>
              Logged in as <b> {{ this.$store.state.user.username || this.$store.state.user.email }}</b>
            </b-dropdown-item>
            <div v-for="(item, index) in items" :key="index">
              <hr class="dropdown-divider"/>
              <b-dropdown-item has-link>
                <router-link :to="item.link">
                  <span class="icon">
                    <i :class="`fa fa-${item.icon}`"></i>
                  </span>
                  {{ item.label }}
                </router-link>
              </b-dropdown-item>
            </div>
            <hr class="dropdown-divider"/>
            <b-dropdown-item @click="logout" has-link>
              <router-link to="/login">
                <span class="icon">
                  <i class="fa fa-sign-out"></i>
                </span>
                Log out
              </router-link>
            </b-dropdown-item>
          </div>
        </b-dropdown>
      </div>
    </div>
  </nav>
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
      return this.$store.getters.isUserLoggedIn;
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },

    async logout() {
      try {
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #003333;
  display: flex;
}

.navbar-brand .navbar-item {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
}

.navbar-brand .navbar-item img {
  max-height: 50px;
}

#navMenu .navbar-end .navbar-item:hover {
  background-color: orange;
}
#navItems .navbar-item:hover {
  background-color: orange;
}

#navMenu {
  flex-grow: 1;
  background: transparent;
}
</style>
