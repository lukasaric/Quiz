import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    status: '',
    topicId: 0
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.token;
    },
    authStatus(state) {
      return state.status;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      state.status = status;
      window.localStorage.setItem('token', token);
      if (token === null) window.localStorage.removeItem('token', token);
    },
    setTopicId(state, topicId) {
      state.topicId = topicId;
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('setUser', user);
    },
    setToken({commit}, token) {
      commit('setToken', token);
    },
    setTopicId({commit}, topicId) {
      commit('setTopicId', topicId);
    }
  }
});
