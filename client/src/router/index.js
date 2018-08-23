import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Topics from '@/components/Topics';
import Profile from '@/components/Profile';
import Test from '@/components/Test';

Vue.use(Router);

export default new Router({
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
