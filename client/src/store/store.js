import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import axios from '@/services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || '',
    status: ''
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    authSuccess(state, user) {
      state.token = user.token;
      state.user = user;
      state.status = 'Successfully logged in';
    },
    authError(state) {
      state.token = '';
      state.status = 'Error';
    },
    authLogout(state) {
      state.token = '';
      state.user = null;
      state.status = 'Logged out.';
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        AuthService.login(payload)
          .then(response => {
            const { user } = response.data;
            context.commit('authSuccess', user);
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.Authorization = `Bearer ${user.token}`;
            resolve(response);
          })
          .catch(err => {
            localStorage.removeItem('token');
            context.commit('authError');
            reject(err);
          });
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        context.commit('authLogout');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.Authorization;
        resolve();
      });
    }
  }
});
