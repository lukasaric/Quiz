import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import axios from '@/services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
    status: '',
    topicId: 0
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    setTopicId(state, topicId) {
      state.topicId = topicId;
    },
    authSuccess(state, token) {
      state.token = token;
      state.status = 'success';
    },
    authError(state) {
      state.token = '';
      state.status = 'error';
    }
  },
  actions: {
    setTopicId({commit}, topicId) {
      commit('setTopicId', topicId);
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        AuthService.login(payload)
          .then(response => {
            const accessToken = response.data.token;
            context.commit('authSuccess', accessToken);
            localStorage.setItem('token', accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            resolve(response);
          })
          .catch(err => {
            window.localStorage.removeItem('token');
            context.commit('authError');
            reject(err);
          });
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        context.commit('authLogout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    }

  }
});
