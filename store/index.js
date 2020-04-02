import Vuex from 'vuex'

new Vuex.Store({
state: {
        token: ""
    },
    mutations: {
    },
    actions: {
    },
    modules: {},
    getters: {
        isLoggedIn: state => !!state.token,
    }
});