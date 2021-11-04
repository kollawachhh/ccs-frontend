import Vue from 'vue'
import Vuex from 'vuex'
import CustomerService from '@/services/CustomerService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },

    getters: {
        customer: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload;
        },
        push(state, payload){
            state.data = payload
        }
    },

    actions: {
        async createCustomer({ commit }, newCustomer){
            let payload = await CustomerService.createCustomer(newCustomer);
            commit("push", payload.data)
        },
        async createRequest({ commit }, newRequest){
            let payload = await CustomerService.createRequest(newRequest);
            commit("push", payload.data)
        },
        async getAllRequestsById({ commit }, id){
            let payload = await CustomerService.getAllRequestsById(id);
            commit("fetch", payload.data)
        },
        async getRequestDetailById({ commit }, id){
            let payload = await CustomerService.getRequestDetailById(id);
            commit("fetch", payload.data)
        },
        async getAllAppointedDate({ commit }){
            let payload = await CustomerService.getAllAppointedDate();
            commit("fetch", payload.data)
        },
    },

    modules: {
        //
    }
});