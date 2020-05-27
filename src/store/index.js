import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import common from '@/store/modules/common';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        common,
    },
    strict: process.env.NODE_ENV !== 'production',
    // plugins: [createPersistedState()],
});