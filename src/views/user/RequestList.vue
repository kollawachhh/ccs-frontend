<template>
    <div class="w-100 h-100 set-font-family">
        <Header tab="CCs" :back=true path="/home"></Header>
        <div class="content_wrapper w-90 mt-4 mx-auto">
            <div class="header_content w-100">
                <div class="flex w-100">
                    <span class="flex my-1 mx-auto">รายการคำขอประเมิน</span>
                </div>
                <select v-model="date.month" class="flex w-50 search_bar mx-auto">
                    <option v-for="(month, index) in months" :key="index" :value='month.name' class="bg-white text-primary">{{ month.th + ' - ' + formatYearTH(date.year) }}</option>
                </select>
            </div>
            <table class="w-100 h-90">
                <thead class="w-100 table_head">
                    <tr class="flex my-2 w-100">
                        <th id="id" class="id">ประเภท</th>
                        <th v-if="role === 'Employee'" id="name" class="name">ชื่อ</th>
                        <th v-if="role === 'Customer'" id="name" class="name">วันที่สร้าง</th>
                        <th id="login" class="login">สถานะ</th>
                    </tr>
                </thead>
                <div id="table_body" class="flex w-100 mt-2">
                    <tbody class="w-100">
                            <tr v-for="(request, index) in resultQuery" :key="index" class="flex w-100 py-1 row">
                                <button class="flex w-100" @click="getDetail(request.id)">
                                    <td id="id">{{formatTypeTH(request.type)}}</td>
                                    <td v-if="role === 'Employee'" id="name">{{request.name}}</td>
                                    <td v-if="role === 'Customer'" id="name">{{getCreateTime(request.created_at)}}</td>
                                    <td id="login" v-bind:class="{'successText':request.status === 'Success', 'rejectText':request.status === 'Rejected'}">{{formatStatusTH(request.status)}}</td>
                                </button>
                            </tr>
                    </tbody>
                </div>
                <button v-if="role === 'Customer'" @click="addBtn" class="mt-2 addBtn px-3 py-1">ส่งคำขอประเมิน</button>
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
import FormatThai from '@/services/FormatThai'
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
                { id: '1', name: 'January', th: 'มกราคม' },
                { id: '2', name: 'Febuary', th: 'กุมภาพันธ์' },
                { id: '3', name: 'March', th: 'มีนาคม' },
                { id: '4', name: 'April', th: 'เมษายน' },
                { id: '5', name: 'May', th: 'พฤษภาคม' },
                { id: '6', name: 'June', th: 'มิถุนายน' },
                { id: '7', name: 'July', th: 'กรกฎาคม' },
                { id: '8', name: 'August', th: 'สิงหาคม' },
                { id: '9', name: 'September', th: 'กันยายน' },
                { id: '10', name: 'October', th: 'ตุลาคม' },
                { id: '11', name: 'November', th: 'พฤศจิกายน' },
                { id: '12', name: 'December', th: 'ธันวาคม' },
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
                title: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้!!",
                text: 'กรุณาลงชื่อเข้าใช้ระบบก่อน',
                icon: 'warning',
                confirmButtonText: 'ตกลง'
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
            return moment(time).format("DD-MM") + '-' + this.formatYearTH(moment(time).format("YYYY"))
        },
        formatStatusTH(status){
            return FormatThai.formatStatusTH(status)
        },
        formatTypeTH(type){
            return FormatThai.formatTypeTH(type)
        },
        formatYearTH(year){
            return FormatThai.formatYearTH(year)
        }
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
                padding: 0px;
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
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
    }
    .successText{
        color: #439b56;
    }
    .rejectText{
        color: #9b3030;
    }
</style>