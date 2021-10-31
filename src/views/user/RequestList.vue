<template>
    <div class="w-100 h-100">
        <Header tab="CCs" :back=true></Header>
        <div class="content_wrapper w-90 mt-4 mx-auto">
            <div class="header_content w-100">
                <div class="flex w-100">
                    <span class="flex my-1 mx-auto">Request List</span>
                </div>
                <!-- <input v-model="searchUser" class="flex search_bar mx-auto" type="text" placeholder="Search"> -->
                <select v-model="date.month" class="flex w-50 search_bar mx-auto">
                    <option v-for="(month, index) in months" :key="index" :value='month.name' class="bg-white text-primary">{{ month.name + ' - ' + date.year }}</option>
                </select>
            </div>
            <table class="w-100 h-90">
                <thead class="w-100 table_head">
                    <tr class="flex my-2 w-100">
                        <th id="id" class="id">Type</th>
                        <th id="name" class="name">Date</th>
                        <th id="login" class="login">Status</th>
                    </tr>
                </thead>
                <div id="table_body" class="flex w-100 mt-2">
                    <tbody class="w-100">
                            <tr v-for="(request, index) in resultQuery" :key="index" class="flex w-100 py-1 row">
                                <button class="flex w-100" @click="getDetail(request.id)">
                                    <td id="id">{{request.type}}</td>
                                    <td id="name">{{getCreateTime(request.created_at)}}</td>
                                    <td id="login">{{request.status}}</td>
                                </button>
                            </tr>
                    </tbody>
                </div>
                <button v-if="role === 'Customer'" @click="addBtn" class="mt-2 addBtn px-3 py-1">Send request</button>
            </table>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import CustomerStore from "@/store/Customer"
import EmployeeStore from "@/store/Employee"
import AuthUser from "@/store/AuthUser"
import moment from 'moment'
export default {
    data() {
        return {
            role: AuthUser.getters.user.role,
            searchRequest: null,
            allRequests: [],
            searchList: [],
            date: {
                month: "",
                year: "",
                day: ""
            },
            months:[
                { id: '1', name: 'January' },
                { id: '2', name: 'Febuary' },
                { id: '3', name: 'March' },
                { id: '4', name: 'April' },
                { id: '5', name: 'May' },
                { id: '6', name: 'June' },
                { id: '7', name: 'July' },
                { id: '8', name: 'August' },
                { id: '9', name: 'September' },
                { id: '10', name: 'October' },
                { id: '11', name: 'November' },
                { id: '12', name: 'December' },
            ],
        }
    },
    components:{
        Header,
        Footer
    },
    mounted(){
        if (!this.isAuthen()) {
            Swal.fire({
                title: "You don't have permission!!",
                text: 'Please login',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
            this.$router.push("/")
        }
    },
    created(){
        let today = new Date();
        this.date.month = today.toLocaleString('default', { month: 'long' })
        this.date.year = today.getFullYear()
        this.date.day = today.toLocaleDateString('en-CA');
        if(this.role === 'Customer'){
            this.fetchAllRequest()
        }
        else{
            this.fetchAllWaitingRequest()
        }
    },
    methods:{
        async fetchAllRequest(){
            await CustomerStore.dispatch('getAllRequestsById', AuthUser.getters.user.id)
            this.allRequests = CustomerStore.getters.customer
            this.searchList = CustomerStore.getters.customer
        },
        async fetchAllWaitingRequest(){
            await EmployeeStore.dispatch('getAllWaitingRequest', AuthUser.getters.user.id)
            this.allRequests = EmployeeStore.getters.customer
            this.searchList = EmployeeStore.getters.customer
        },
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        async getDetail(requestId){
            this.$router.push('/request/' + requestId)
        },
        addBtn(){
            this.$router.push('/appraise')
        },
        getCreateTime(time){
            return moment(time).format("DD-MM-YYYY")
        },
    },
    
    computed: {
        resultQuery(){
            if(this.date.month){
                return this.allRequests.filter((item)=>{
                    return this.date.month.toLowerCase().split(' ').every(v => (moment(item.created_at).format('MMMM')).toLowerCase().includes(v))
                })
                }else{
                    return this.allRequests;
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
        #id{
            width: 33%;
            height: 75%;
        }
        #name{
            width: 33%;
        }
        #login{
            width: 34%;
        }
        .row{
            border-bottom: 1px solid #000000;
            margin-left: 0px;
            button{
                background-color: #C6E5FF;
                border:0px;
            }
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