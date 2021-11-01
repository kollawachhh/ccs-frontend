import Vue from 'vue'
import Vuex from 'vuex'
import EmployeeService from '@/services/EmployeeService'

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
        async getAllCustomers({ commit }){
            let payload = await EmployeeService.getAllCustomers();
            commit("fetch", payload.data)
        },
        async getAllWaitingRequest({ commit }){
            let payload = await EmployeeService.getAllWaitingRequest();
            commit("fetch", payload.data)
        },
        async confirmRequest({ commit }, request){
            let payload = await EmployeeService.confirmRequest(request);
            commit("push", payload.data)
        },
        async appointment({ commit }, { id, appointment, status }){
            let payload = await EmployeeService.appointment(id, appointment, status);
            commit("push", payload.data)
        },
    },

    modules: {
        //
    }
});