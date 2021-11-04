<template>
<div class="h-100 w-100 body set-font-family">
    <div class="header">
        <b-row class="text-center h-100 w-100 deleted-margin">
            <b-col>
                <button @click="backBtn" class="back">&#60;</button>
            </b-col>
            <b-col cols="6"><span>บันทึกเอกสาร</span></b-col>
            <b-col><img src="/icons/document-form-header.png" class="w-50 mt-2" alt=""></b-col>
        </b-row>
    </div>
    <div class="w-100 h-75">
        <form @submit.prevent="submit" class="w-100 h-100" action="">
            <div class="w-75 mx-auto mt-4">
                <span class="flex font-bold">ประเภท</span>
                <select 
                    class="flex mt-2 px-2 choices w-100" 
                    v-model="form.type"
                    v-bind:class="{'field-required': this.errors === 'fields required' || this.errors === 'type required'}">
                    <option value="" disabled selected hidden>เลือกประเภท</option>
                    <option 
                        v-for="(type, index) in types" 
                        :key="index"
                        :value="type.name">{{formatTypeTH(type.name)}}</option>
                </select>
            </div>
            
            <div class="form-wrapper mt-4 w-100 h-90">
                <div v-if="this.form.type === 'Developed housing'" class="w-75 mx-auto">
                    <span class="flex font-bold">ชื่อโครงการ</span>
                    <input 
                        v-model="form.project_name" 
                        class="flex w-100 px-2 choices" 
                        type="text"
                        v-bind:class="{'field-required': this.errors === 'fields required' || this.errors === 'project_name required'}">
                </div>
                <div class="w-75 mx-auto my-3">
                    <span class="flex font-bold">แนบรูปเอกสารที่เกี่ยวข้อง</span>
                </div>
                
                <div class="w-75 mx-auto my-3">
                    <span 
                        class="flex font-bold text-left">
                        1.ใบปะหน้าที่ขอประเมิน 
                        <span 
                            v-if="this.errors === 'cover_sheet required' || this.errors === 'fields required'" 
                            class="flex warning mx-2">
                            !
                        </span>
                    </span>
                    <div>
                        <img class="flex w-25" :src="this.form.cover_sheet" alt="">
                        <input @change="handleCoverSheetImage" class="flex mt-2" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span 
                        class="flex font-bold text-left">
                        2.ใบเสร็จค่าธรรมเนียมการประเมิน
                        <span
                            v-if="this.errors === 'fee_receipt required' || this.errors === 'fields required'" 
                            class="flex warning mx-2">
                            !
                        </span>
                    </span>
                    <div>
                        <img class="flex w-25" :src="this.form.fee_receipt" alt="">
                        <input @change="handleFeeReceiptImage" class="flex mt-2" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span 
                        class="flex font-bold text-left">
                        3.สัญญาซื้อขาย
                        <span
                            v-if="this.errors === 'contract required' || this.errors === 'fields required'" 
                            class="flex warning mx-2">
                            !
                        </span>
                    </span>
                    <div>
                        <img class="flex w-25" :src="this.form.contract" alt="">
                        <input @change="handleContractImage" class="flex mt-2" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span 
                        class="flex font-bold text-left">
                        4.ใบอนุญาตปลูกสร้าง หรือ เอกสารแสดงกรรมสิทธิ์สิ่งปลูกสร้าง
                        <span
                            v-if="this.errors === 'construction_permit required' || this.errors === 'fields required'" 
                            class="flex warning mx-2">
                            !
                        </span>
                    </span>
                    <div>
                        <img class="flex w-25" :src="this.form.construction_permit" alt="">
                        <input @change="handleConstructionPermitImage" class="flex mt-2" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span 
                        class="flex font-bold text-left">
                        5.โฉนดที่ดิน + สารบัญจดทะเบียน
                        <span
                            v-if="this.errors === 'title_deed required' || this.errors === 'fields required'" 
                            class="flex warning mx-2">
                            !
                        </span>
                    </span>
                    <div>
                        <img class="flex w-25" :src="this.form.title_deed" alt="">
                        <input @change="handleTitleDeedImage" class="flex mt-2" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span 
                        class="flex font-bold text-left">
                        6.แผนที่สังเขป
                        <span
                            v-if="this.errors === 'map required' || this.errors === 'fields required'" 
                            class="flex warning mx-2">
                            !
                        </span>
                    </span>
                    <div>
                        <img class="flex w-25" :src="this.form.map" alt="">
                        <input @change="handleMapImage" class="flex mt-2" type="file">
                    </div>
                </div>
                <div v-if="this.form.type === 'Waste land'" class="w-75 mx-auto my-3">
                    <span 
                        class="flex font-bold text-left">
                        7.แบบแปลน
                        <span
                            v-if="this.errors === 'plan required' || this.errors === 'fields required'" 
                            class="flex warning mx-2">
                            !
                        </span>
                    </span>
                    <div>
                        <img class="flex w-25" :src="this.form.plan" alt="">
                        <input @change="handlePlanImage" class="flex mt-2" type="file">
                    </div>
                </div>
            </div>
            <button class="submit-btn" type="submit">ยืนยัน</button>
        </form>
    </div>
    <Footer></Footer>
</div>
  
</template>

<script>
import Footer from '../../components/Footer.vue'
import AuthUser from "@/store/AuthUser"
import CustomerStore from "@/store/Customer"
import FormatThai from '@/services/FormatThai'
export default {
    data() {
        return {
            form: {
                type:'',
                project_name:'',
                cover_sheet: "/icons/add-file-btn.png",
                fee_receipt: "/icons/add-file-btn.png",
                contract: "/icons/add-file-btn.png",
                construction_permit: "/icons/add-file-btn.png",
                title_deed: "/icons/add-file-btn.png",
                map: "/icons/add-file-btn.png",
                plan:'/icons/add-file-btn.png',
                status: "Waiting approve"
            },
            types:[
                {name: 'Detached house'},
                {name: 'Townhouse'},
                {name: 'Condo'},
                {name: 'Waste land'},
                {name: 'Developed housing'},
            ],
            errors: '',
        }
    },
    components:{
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
    methods:{
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        submit(){
            Swal.fire({
                title: 'บันทึกเอกสาร?',
                text: "คุณต้องการบันทึกเอกสารใช่หรือไม่!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            }).then((result) => {
            if (result.isConfirmed) {
                if(this.form.type !== '' &&
                   this.form.cover_sheet !== "/icons/add-file-btn.png" &&
                   this.form.fee_receipt !== "/icons/add-file-btn.png" &&
                   this.form.contract !== "/icons/add-file-btn.png" &&
                   this.construction_permit !== "/icons/add-file-btn.png" &&
                   this.title_deed !== "/icons/add-file-btn.png" &&
                   this.map !== "/icons/add-file-btn.png"){
                       if(this.form.type === 'Waste land' &&
                          this.plan === 'icons/add-file-btn.png'){
                              this.errors = 'plan required'
                              Swal.fire({
                                title: "กรุณาแนบรูปแบบแปลน", 
                                text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                                icon: "error",
                                confirmButtonText: 'ตกลง'
                              })
                       }
                       else if(this.form.type === 'Developed housing' &&
                          this.form.project_name === 'icons/add-file-btn.png'){
                              this.errors = 'Developed housing required'
                              Swal.fire({
                                title: "กรุณาใส่ชื่อโครงการ", 
                                text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                                icon: "error",
                                confirmButtonText: 'ตกลง'
                              })
                       }
                       else{
                        let newRequest = {
                            type: this.form.type,
                            project_name: this.form.project_name,
                            cover_sheet: this.form.cover_sheet,
                            fee_receipt: this.form.fee_receipt,
                            contract: this.form.contract,
                            construction_permit: this.form.construction_permit,
                            title_deed: this.form.title_deed,
                            map: this.form.map,
                            plan: this.form.plan,
                            status: "Waiting approve",
                        }
                        this.pushData(newRequest)
                        Swal.fire({
                            title: 'บันทึกเอกสารที่เกี่ยวข้องเรียบร้อย',
                            icon: 'success'
                        })
                        this.$router.push('/request')
                       }
                    
                }
                else if(this.form.type === '' &&
                        this.form.cover_sheet === "/icons/add-file-btn.png" &&
                        this.form.fee_receipt === "/icons/add-file-btn.png" &&
                        this.form.contract === "/icons/add-file-btn.png" &&
                        this.form.construction_permit === "/icons/add-file-btn.png" &&
                        this.form.title_deed === "/icons/add-file-btn.png" &&
                        this.form.map === "/icons/add-file-btn.png"){
                            this.errors = 'fields required'
                            Swal.fire({
                                title: "กรุณาใส่ข้อมูลให้ครบ", 
                                text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                                icon: "error",
                                confirmButtonText: 'ตกลง'
                            })
                }
                else if(this.form.type === ''){
                    this.errors = 'type required'
                    Swal.fire({
                        title: "กรุณาเลือกประเภท", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.project_name === '' && this.form.type === 'Developed housing required'){
                    this.errors = 'project_name required'
                    Swal.fire({
                        title: "กรุณาใส่ชื่อโครงการ", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.cover_sheet === "/icons/add-file-btn.png"){
                    this.errors = 'cover_sheet required'
                    Swal.fire({
                        title: "กรุณาแนบรูปใบปะหน้าที่ขอประเมิน", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.fee_receipt === "/icons/add-file-btn.png"){
                    this.errors = 'fee_receipt required'
                    Swal.fire({
                        title: "กรุณาแนบรูปใบเสร็จค่าธรรมเนียมการประเมิน", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.contract === "/icons/add-file-btn.png"){
                    this.errors = 'contract required'
                    Swal.fire({
                        title: "กรุณาแนบรูปสัญญาซื้อขาย", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.construction_permit === "/icons/add-file-btn.png"){
                    this.errors = 'construction_permit required'
                    Swal.fire({
                        title: "กรุณาแนบรูปใบอนุญาตปลูกสร้าง", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.title_deed === "/icons/add-file-btn.png"){
                    this.errors = 'title_deed required'
                    Swal.fire({
                        title: "กรุณาแนบรูปโฉนดที่ดิน", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.map === "/icons/add-file-btn.png"){
                    this.errors = 'map required'
                    Swal.fire({
                        title: "กรุณาแนบรูปแผนที่สังเขป", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
                else if(this.form.plan === "/icons/add-file-btn.png" || this.form.type === 'Waste land'){
                    this.errors = 'plan required'
                    Swal.fire({
                        title: "กรุณาแนบรูปแบบแปลน", 
                        text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                        icon: "error",
                        confirmButtonText: 'ตกลง'
                    })
                }
            }
            })
        },
        async pushData(newRequest){
            await CustomerStore.dispatch('createRequest', newRequest)
        },
        handleCoverSheetImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.cover_sheet = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        handleFeeReceiptImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.fee_receipt = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        handleContractImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.contract = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        handleConstructionPermitImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.construction_permit = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        handleTitleDeedImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.title_deed = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        handleMapImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.map = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        handlePlanImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.plan = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        backBtn(){
            this.$router.go(-1)
        },
        formatTypeTH(type){
            return FormatThai.formatTypeTH(type)
        },
    }
}
</script>

<style lang='scss'scoped>
.body{
    background-color: #E1F1FE;
}
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
.form-wrapper{
    overflow-y: scroll;
    overflow-x: hidden;
}
.choices{
    border-radius: 10px;
    height: 30px;
}
.text-left{
    text-align: left;
}
.submit-btn{
    position: absolute;
    color:#fff;
    bottom: 110px;
    right: 30px;
    padding: 10px 20px;
    background-color: #0B4870;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.warning{
    color: #bb2828;
}
.deleted-margin{
    margin: 0px;
}
</style>