<template>
<div class="h-100 w-100">
    <div class="header">
        <b-row class="text-center h-100 w-100 deleted-margin">
            <b-col>
                <button @click="backBtn" class="back">&#60;</button>
            </b-col>
            <b-col cols="6"><span>รายละเอียด</span></b-col>
            <b-col><img src="/icons/document-form-header.png" class="w-50 mt-2" alt=""></b-col>
        </b-row>
    </div>
    <div class="w-90 h-75 pt-4 content-wrapper mx-auto mt-3">
        <div class="w-75 top">
            <div class="w-90 pt-3">
                <span class="flex text-left mb-3 mx-2">Type : {{this.request.type}}</span>
                <span v-if="this.request.type === 'Developed housing'" class="flex text-left mb-3 mx-2">Project name : {{this.request.project_name}}</span>
                <span class="flex text-left mb-3 mx-2">Appointment : {{this.request.appointment}}</span>
                <span class="flex text-left mb-3 mx-2">Created : {{this.request.created_at}}</span>
                <span class="flex text-left mx-2">Status : {{this.request.status}}</span>
            </div>
        </div>
        <div class="w-75 pt-2 mt-4 bottom">
            <span class="flex font-bold my-2 mx-3">เอกสาร</span>
            <div class="form-wrapper mx-auto w-90 h-75">
                <div class="w-100 my-3">
                    <span class="flex font-bold text-left">1.ใบปะหน้าที่ขอประเมิน</span>
                    <div>
                        <img @click="handleCoverSheetImage" class="flex w-25" :src="this.request.cover_sheet" alt="">
                    </div>
                </div>
                <div class="w-100 my-3">
                    <span class="flex font-bold text-left">2.ใบเสร็จค่าธรรมเนียมการประเมิน</span>
                    <div>
                        <img @click="handleFeeReceiptImage" class="flex w-25" :src="this.request.fee_receipt" alt="">
                    </div>
                </div>
                <div class="w-100 my-3">
                    <span class="flex font-bold text-left">3.สัญญาซื้อขาย</span>
                    <div>
                        <img @click="handleContractImage" class="flex w-25" :src="this.request.contract" alt="">
                    </div>
                </div>
                <div class="w-100 my-3">
                    <span class="flex font-bold text-left">4.ใบอนุญาติปลูกสร้าง หรือ เอกสารแสดงกรรมสิทธิ์สิ่งปลูกสร้าง</span>
                    <div>
                        <img @click="handleConstructionPermitImage" class="flex w-25" :src="this.request.construction_permit" alt="">
                    </div>
                </div>
                <div class="w-100 my-3">
                    <span class="flex font-bold text-left">5.โฉนดที่ดิน + สารบัญจดทะเบียน</span>
                    <div>
                        <img @click="handleTitleDeedImage" class="flex w-25" :src="this.request.title_deed" alt="">
                    </div>
                </div>
                <div class="w-100 my-3">
                    <span class="flex font-bold text-left">6.แผนที่สังเขป</span>
                    <div>
                        <img @click="handleMapImage" class="flex w-25" :src="this.request.map" alt="">
                    </div>
                </div>
                <div v-if="this.request.type === 'Waste land'" class="w-100 my-3">
                    <span class="flex font-bold text-left">7.แบบแปลน</span>
                    <div>
                        <img @click="handlePlanImage" class="flex w-25" :src="this.request.plan" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button 
        v-if="this.request.status === 'Appointment required'" 
        @click="appointBtn"
        class="stepBtn mt-3">
        Appointment
    </button>
    <div v-if="this.role === 'Employee'" class="flex">
        <button
            @click="confirmBtn"
            class="stepBtn mx-auto mt-3">
            Confirm
        </button>
        <button
            @click="rejectBtn"
            class="rejectBtn mx-auto mt-3">
            Reject
        </button>
    </div>
    
    <Footer></Footer>
</div>
  
</template>

<script>
import Footer from '../../components/Footer.vue'
import AuthUser from "@/store/AuthUser"
import CustomerStore from "@/store/Customer"
import EmployeeStore from "@/store/Employee"
export default {
    data() {
        return {
            request:[],
            request_id: this.$route.params.id,
            role: AuthUser.getters.user.role,
        }
    },
    components:{
        Footer
    },
    created(){
        this.fetchAllRequest()
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
    methods:{
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        async fetchAllRequest(){
            await CustomerStore.dispatch('getRequestDetailById', this.request_id)
            this.request = CustomerStore.getters.customer
        },
        backBtn(){
            this.$router.go(-1)
        },
        appointBtn(){
            this.$router.push('/appointment/' + this.request_id)
        },
        confirmBtn(){
            Swal.fire({
                title: 'Confirm',
                text: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            })
            .then((r) => {
                if(r.value){
                    this.actionBtn('confirm')
                    Swal.fire({
                        title: 'Confirmed!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'Okay'
                    })
                    this.$router.push('/request')
                }
            });
        },
        rejectBtn(){
            Swal.fire({
                title: 'Reject',
                text: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            })
            .then((r) => {
                if(r.value){
                    this.actionBtn('reject')
                    Swal.fire({
                        title: 'Rejected!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'Okay'
                    })
                    this.$router.push('/request')
                }
            });
        },
        async actionBtn(type){
            if(type === 'confirm'){
                let request = {
                    id: this.request_id,
                    status: "Appointment required"
                }
                await EmployeeStore.dispatch('confirmRequest', request)
            }
            else{
                let request = {
                    id: this.request_id,
                    status: "Rejected"
                }
                await EmployeeStore.dispatch('confirmRequest', request)
            }
        },
        handleCoverSheetImage(){
            Swal.fire({
                title: 'Cover sheet',
                // text: 'Modal with a custom image.',
                imageUrl: this.request.cover_sheet,
                imageWidth: 400,
                // imageHeight: 200,
                imageAlt: 'Custom image',
            })
        },
        handleFeeReceiptImage(){
            Swal.fire({
                title: 'Fee Receipt',
                imageUrl: this.request.fee_receipt,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleContractImage(){
            Swal.fire({
                title: 'Contract',
                imageUrl: this.request.contract,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleConstructionPermitImage(){
            Swal.fire({
                title: 'Construction Permit',
                imageUrl: this.request.construction_permit,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleTitleDeedImage(){
            Swal.fire({
                title: 'Title Deed',
                imageUrl: this.request.title_deed,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleMapImage(){
            Swal.fire({
                title: 'Map',
                imageUrl: this.request.map,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handlePlanImage(){
            Swal.fire({
                title: 'Map',
                imageUrl: this.request.plan,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        }
    }
}
</script>

<style lang='scss'scoped>

.back{
    color: #fff;
    border: 0;
    background-color: #0B4870;
    font-size: 2rem;
}
.header{
    color: #fff;
    font-size: 1.5rem;
    margin: 0px;
    height: 50px;
    background-color: #0B4870;
    span{
        line-height: 200%;
    }
}
.content-wrapper{
    background-color: #FFDF6C;
    border-radius: 10px;
}
.form-wrapper{
    overflow-x: scroll;
}

.text-left{
    text-align: left;
}
.top{
    background-color: #C6E5FF;
    height: 45%;
    border-radius: 10px;
    margin: 0px auto 0px 20px;
}
.bottom{
    background-color: #FAC2C1;
    height: 45%;
    border-radius: 10px;
    margin: 0px 20px 0px auto;
}
.stepBtn{
    color:#fff;
    padding: 10px 20px;
    background-color: #0c835b;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.rejectBtn{
    color:#fff;
    padding: 10px 25px;
    background-color: #9b370f;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.deleted-margin{
    margin: 0px;
}
</style>