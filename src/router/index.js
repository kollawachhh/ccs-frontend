import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Contract from '../views/auth/Contract.vue'
import AccountDetail from '../views/auth/AccountDetail.vue'
import Home from '../views/user/Home.vue'
import RequestDetail from '../views/user/RequestDetail.vue'
import DocumentForm from '../views/user/DocumentForm.vue'
import Appointment from '../views/user/Appointment.vue'
import Appraise from '../views/user/AppraiseStep.vue'
import UserList from '../views/admin/UserList.vue'
import UserForm from '../views/admin/UserForm.vue'
import Request from '../views/user/RequestList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/contract',
    name: 'Contract',
    component: Contract
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/request',
    name: 'RequestList',
    component: Request
  },
  {
    path: '/request/:id',
    name: 'RequestDetail',
    component: RequestDetail
  },
  {
    path: '/docForm',
    name: 'DocumentForm',
    component: DocumentForm
  },
  {
    path: '/appointment/:id',
    name: 'Appointment',
    component: Appointment
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/userForm',
    name: 'UserForm',
    component: UserForm
  },
  {
    path: '/appraise',
    name: 'Appraise',
    component: Appraise
  },
  {
    path: '/appraise/:id',
    name: 'Appraise step',
    component: Appraise
  },
  {
    path: '/detail',
    name: 'AccountDetail',
    component: AccountDetail
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: AccountDetail
  },
  {
    path: '/request',
    name: 'Request',
    component: Request
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
