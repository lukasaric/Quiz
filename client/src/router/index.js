import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Topics from '@/components/Topics';
import Profile from '@/components/Profile';
import Exam from '@/components/Exam';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/topics',
      name: 'topics',
      component: Topics,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/topics/:topicId/exam',
      name: 'exam',
      component: Exam,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = store.state.user;

  if (requiresAuth && !currentUser) return next('login');
  if ((to.path === '/login' || to.path === '/register') && currentUser) return next('/');
  return next();
});

export default router;
