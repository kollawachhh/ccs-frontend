<template>
<div class="h-100 w-100 set-font-family">
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
                <span class="flex text-left mb-3 mx-2">ประเภท : {{formatTypeTH(this.request.type)}}</span>
                <span class="flex text-left mb-3 mx-2">สถานะ : {{formatStatusTH(this.request.status)}}</span>
                <span v-if="this.request.type === 'Developed housing'" class="flex text-left mb-3 mx-2">ชื่อโครงการ : {{this.request.project_name}}</span>
                <span class="flex text-left mb-3 mx-2">นัดหมายวันประเมิน : {{formatCreatedAtTH(this.request.appointment)}}</span>
                <span class="flex text-left mb-3 mx-2">สร้างเมื่อ : {{formatCreatedAtTH(this.request.created_at)}}</span>
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
        นัดหมายวันประเมิน
    </button>
    <div v-if="this.role === 'Employee'" class="flex">
        <button
            v-if="this.request.status === 'Waiting approve'"
            @click="confirmBtn"
            class="stepBtn mx-auto mt-3">
            อนุมัติ
        </button>
        <button
            v-if="this.request.status === 'Waiting approve'"
            @click="rejectBtn"
            class="rejectBtn mx-auto mt-3">
            ปฏิเสธ
        </button>
        <button
            v-if="this.request.status === 'Explore required'"
            @click="exploreBtn"
            class="stepBtn mx-auto mt-3">
            กำลังออกสำรวจ
        </button>
        <button
            v-if="this.request.status === 'Exploring'"
            @click="appraiseBtn"
            class="stepBtn mx-auto mt-3">
            ประเมิณมูลค่าทรัพย์สิน
        </button>
        <button
            v-if="this.request.status === 'Explore required'"
            @click="exploreBtn"
            class="stepBtn mx-auto mt-3">
            Exploring
        </button>
        <button
            v-if="this.request.status === 'Exploring'"
            @click="appraiseBtn"
            class="stepBtn mx-auto mt-3">
            ประเมิณมูลค่าทรัพย์สิน
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
import moment from 'moment'
import FormatThai from '@/services/FormatThai'
export default {
    data() {
        return {
            request:[],
            request_id: this.$route.params.id,
            role: AuthUser.getters.user.role,
            value: 0,
        }
    },
    components:{
        Footer
    },
    created(){
        this.fetchRequestById()
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
    methods:{
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        async fetchRequestById(){
            await CustomerStore.dispatch('getRequestDetailById', this.request_id)
            this.request = CustomerStore.getters.customer
            if(this.request.value){
               this.value = this.request.value 
            }
            if(this.request.status === 'Exploring' && role === 'Employee'){
                this.appraiseBtn()
            }
        },
        backBtn(){
            this.$router.push('/request')
        },
        appointBtn(){
            this.$router.push('/appointment/' + this.request_id)
        },
        confirmBtn(){
            Swal.fire({
                title: 'ตรวจสอบความถูกต้องของเอกสาร',
                text: 'คุณต้องการอนุมัติใช่หรือไม่?',
                icon: 'question',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            })
            .then((r) => {
                if(r.value){
                    this.actionBtn('confirm')
                    Swal.fire({
                        title: 'อนุมัติเรียบร้อย!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'ตกลง'
                    })
                    this.$router.push('/request')
                }
            });
        },
        rejectBtn(){
            Swal.fire({
                title: 'ปฏิเสธคำขอ',
                text: 'คุณต้องการปฏิเสธคำขอประเมินนี้ใช่หรือไม่?',
                icon: 'question',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            })
            .then((r) => {
                if(r.value){
                    this.actionBtn('reject')
                    Swal.fire({
                        title: 'ปฏิเสธคำขอเรียบร้อย!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'ตกลง'
                    })
                    this.$router.push('/request')
                }
            });
        },
        exploreBtn(){
            Swal.fire({
                title: 'กำลังออกสำรวจ',
                text: 'คุณต้องการอัพเดทสถานะคำขอนี้ใช่หรือไม่?',
                icon: 'question',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            })
            .then((r) => {
                if(r.value){
                    this.actionBtn('exploring')
                    Swal.fire({
                        title: 'อัพเดทสถานะเรียบร้อย!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'ตกลง'
                    })
                    this.$router.push('/request')
                }
            });
        },
        appraiseBtn(){
            Swal.fire({
                title: 'มูลค่าทรัพย์สิน',
                input: 'number',
                icon: 'question',
                confirmButtonText: 'ตกลง',
                showCloseButton: true,
                showLoaderOnConfirm: true,
                
                preConfirm: (number) => {
                    this.value = number
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'ประเมินมูลค่า',
                        text: `คุณต้องการประเมินมูลค่า ${this.value} บาท ใช่หรือไม่?`,
                        icon: 'question',
                        showCancelButton: true,
                        showCloseButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ใช่',
                        cancelButtonText: 'ไม่',
                    })
                    .then((r) => {
                        if(r.value){
                            this.actionBtn('appraised')
                            Swal.fire({
                                title: 'ประมูลค่าสำเร็จ!',
                                icon: 'success',
                                showCloseButton: true,
                                confirmButtonText: 'ตกลง'
                            })
                            this.$router.push('/request')
                        }
                    });
                }
            })
        },
        async actionBtn(type){
            if(type === 'confirm'){
                let request = {
                    id: this.request_id,
                    status: "Appointment required"
                }
                await EmployeeStore.dispatch('confirmRequest', request)
            }
            else if(type === 'exploring'){
                let request = {
                    id: this.request_id,
                    status: "Exploring"
                }
                await EmployeeStore.dispatch('confirmRequest', request)
            }
            else if(type === 'appraised'){
                let request = {
                    id: this.request_id,
                    status: "Appraised",
                    value: this.value,
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
                title: 'ใบปะหน้าที่ขอประเมิน',
                imageUrl: this.request.cover_sheet,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleFeeReceiptImage(){
            Swal.fire({
                title: 'ใบเสร็จค่าธรรมเนียมการประเมิน',
                imageUrl: this.request.fee_receipt,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleContractImage(){
            Swal.fire({
                title: 'สัญญาซื้อขาย',
                imageUrl: this.request.contract,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleConstructionPermitImage(){
            Swal.fire({
                title: 'ใบอนุญาตปลูกสร้าง หรือเอกสารแสดงกรรมสิทธิ์สิ่งปลูกสร้าง',
                imageUrl: this.request.construction_permit,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleTitleDeedImage(){
            Swal.fire({
                title: 'โฉนดที่ดิน + สารบัญจดทะเบียน',
                imageUrl: this.request.title_deed,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handleMapImage(){
            Swal.fire({
                title: 'แผนที่สังเขป',
                imageUrl: this.request.map,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        handlePlanImage(){
            Swal.fire({
                title: 'แบบแปลน',
                imageUrl: this.request.plan,
                imageWidth: 400,
                imageAlt: 'Custom image',
            })
        },
        formatStatusTH(status){
            return FormatThai.formatStatusTH(status)
        },
        formatTypeTH(type){
            return FormatThai.formatTypeTH(type)
        },
        formatCreatedAtTH(dateTime){
            if(!dateTime){
                return 'รอตรวจสอบเอกสาร'
            }
            return moment(dateTime).format('DD-MM') + '-' + FormatThai.formatYearTH(moment(dateTime).format('YYYY')) + ' ' + moment(dateTime).format('HH:mm:ss')
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
    padding: 10px 20px;
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