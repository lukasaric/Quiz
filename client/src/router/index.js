import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Topics from '@/components/Topics';
import Profile from '@/components/Profile';
import Test from '@/components/Test';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/topics',
      name: 'topics',
      component: Topics
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
});

const openRoutes = ['login', 'register'];

router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next();
  } else if (store.getters.isAuthenticated) {
    next();
  } else {
    next('/login');
  }
});

export default router;
