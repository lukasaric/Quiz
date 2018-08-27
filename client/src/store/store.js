import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    googleUser: null,
    cookie: window.sessionStorage.getItem('eyJwYXNzcG9ydCI6eyJ1c2VyIjoyfX0='),
    user: null,
    topicId: 0
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setGoogleUser(state, user) {
      state.user = user;
      state.googleUser = user;
    },
    clearUser(state, user) {
      state.user = user;
      state.googleUser = user;
    },
    setTopicId(state, topicId) {
      state.topicId = topicId;
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('setUser', user);
    },
    setGoogleUser({commit}, user) {
      commit('setGoogleUser', user);
    },
    clearUser({commit}, user) {
      commit('clearUser', user);
    },
    setTopicId({commit}, topicId) {
      commit('setTopicId', topicId);
    }
  }
});
