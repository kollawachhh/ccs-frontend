<template>
    <div class="w-100 h-100 set-font-family">
        <Header tab="CCs" :back=true path="/home"></Header>
        <div class="content_wrapper w-90 mt-4 mx-auto">
            <div class="header_content w-100">
                <div class="flex w-100">
                    <span v-if="this.role === 'Admin'" class="flex my-1 mx-auto">รายชื่อผู้ใช้งานในระบบ</span>
                    <span v-if="this.role === 'Employee'" class="flex my-1 mx-auto">รายชื่อลูกค้าในระบบ</span>
                </div>
                <input v-model="searchUser" class="flex search_bar mx-auto" type="text" placeholder="ค้นหา">
            </div>
            <table class="w-100 h-90">
                <thead class="w-100 table_head">
                    <tr class="flex my-2 w-100">
                        <th id="id" class="id">ไอดี</th>
                        <th id="name" class="name">ชื่อ</th>
                        <th id="login" class="login">เข้าใช้เมื่อ</th>
                    </tr>
                </thead>
                <div id="table_body" class="flex w-100 mt-2">
                    <tbody class="w-100">
                        <tr v-for="(user, index) in resultQuery" :key="index" class="flex w-100 py-1 row">
                            <button class="flex w-100" @click="getDetail(user.id)">
                                <td id="id">{{user.id}}</td>
                                <td id="name">{{user.name}}</td>
                                <td id="login">{{formatCreatedAtTH(user.updated_at)}}</td>
                            </button>
                        </tr>
                    </tbody>
                </div>
                <button v-if="this.role === 'Admin'" @click="addBtn" class="mt-2 addBtn px-3 py-1">เพิ่มผู้ใช้</button>
            </table>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import AdminStore from "@/store/Admin"
import EmployeeStore from "@/store/Employee"
import AuthUser from "@/store/AuthUser"
import moment from 'moment'
import FormatThai from '@/services/FormatThai'
export default {
    data() {
        return {
            searchUser: null,
            allUsers: [],
            searchList: [],
            role: AuthUser.getters.user.role
        }
    },
    components:{
        Header,
        Footer
    },
    mounted(){
        if (!this.isAuthen()) {
            Swal.fire({
                title: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้!!",
                text: 'กรุณาลงชื่อเข้าใช้ระบบก่อน',
                icon: 'warning',
                confirmButtonText: 'ตกลง'
            })
            this.$router.push("/")
        }
    },
    created(){
        if(this.role === 'Admin'){
            this.fetchAllUser()
        }
        else{
            this.fetchAllCustomer()
        }
    },
    methods:{
        async fetchAllUser(){
            await AdminStore.dispatch('fetchAllUser')
            this.searchList = AdminStore.getters.users
            this.allUsers = AdminStore.getters.users
        },
        async fetchAllCustomer(){
            await EmployeeStore.dispatch('getAllCustomers')
            this.searchList = EmployeeStore.getters.customer
            this.allUsers = EmployeeStore.getters.customer
        },
        async getDetail(userId){
            if(this.role === 'Employee'){
                this.$router.push('/user/' + userId)
            }
        },
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        addBtn(){
            this.$router.push('userForm')
        },
        formatCreatedAtTH(dateTime){
            if(!dateTime){
                return 'รอตรวจสอบเอกสาร'
            }
            return moment(dateTime).format('DD-MM') + '-' + FormatThai.formatYearTH(moment(dateTime).format('YYYY')) + ' ' + moment(dateTime).format('HH:mm:ss')
        }
    },
    computed: {
        resultQuery(){
            if(this.searchUser){
                return this.allUsers.filter((item)=>{
                    return this.searchUser.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                })
                }else{
                    return this.allUsers;
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .content_wrapper{
        height: 80%;
        background-color: #C6E5FF;
        border-radius: 10px;
        .header_content{
            color: white;
            height: 10%;
            background-color: #0B4870;
            border-radius: 10px;
        }
        .search_bar{
            border: 0px;
            border-radius: 5px;
            text-align: center;
        }
        .table_head{
            border-bottom: 2px solid #000000;
            height: 43px;
        }
        #table_body{
            overflow-y: scroll;
            height: 90%;
        }
        #row{
            border-bottom: 1px solid #000000;
        }
        .row{
            border-bottom: 1px solid #000000;
            margin-left: 0px;
            button{
                background-color: #C6E5FF;
                border:0px;
                padding: 0px;
            }
        }
        #id{
            width: 10%;
            height: 75%;
        }
        #name{
            width: 50%;
        }
        #login{
            width: 40%;
        }
        .name{
            border-left: 2px solid #000000;
            border-right: 2px solid #000000;
        }
        .addBtn{
            color: #fff;
            border-radius: 5px;
            border: 0px;
            background-color: #0B4870;
        }
    }
</style>