<template>
  <div class="h-100 set-font-family">
      <div class="flex">
              <div class="home_btn mt-2 mx-3">
                <button @click="backBtn" class="back">&#60;</button>
              </div>
              <div class="noti_btn w-25">
                  <img src="/icons/ccs-logo.png" class="w-75" alt="">
              </div>
          </div>
      <div class="content">
        <b-row class="flex text-center w-100 mb-5 deleted-margin">
            <b-col class="h-100">
                <div class="mx-3 my-4">
                    <img :src="user.image" class="profile" alt="">
                </div>
            </b-col>
            <b-col cols="7" class="h-100 px-0">
                <span class="flex mt-4 font-bold">ยินดีต้อนรับ</span>
                <span class="flex mt-1 username">{{user.name}}</span>
                <span class="flex mt-1 username">({{formatRoleTH(user.role)}})</span>
            </b-col>
        </b-row>
        <div class="mb-5">
            <span class="topic">ขั้นตอนการส่งคำร้องขอประเมิน</span>
        </div>
        <div class="w-90 mb-4 mx-auto description ">
            <div 
                class="flex w-100"
                v-bind:class="{'opacity-03' : request.status === 'Appointment required'}">
                <div class="flex">
                    <span 
                        class="flex font-bold mx-2 underline">ขั้นตอนที่ 1</span>
                </div>
                <div class="flex">
                    :
                    <span class="flex text-left mx-1">กดบันทึกและส่งคำร้อง <br> แนบรูปเอกสารที่่เกี่ยวข้อง</span>
                </div>
            </div>
            <span class="flex" v-bind:class="{'opacity-03' : request.status !== 'Appointment required'}">
                <span class="mx-2 font-bold underline">ขั้นตอนที่ 2</span>
                <span>: ระบุวันเวลาที่ต้องการนัดหมาย</span> 
            </span>
            <div class="flex opacity-03">
                <span class="mx-2 font-bold underline">ขั้นตอนที่ 3</span>: ตรวจสอบสถานะการประเมิน
            </div>

        </div>
        <b-row class="flex text-center h-25 w-100 deleted-margin">
            <b-col class="h-full" v-bind:class="{'opacity-03' : request.status === 'Appointment required'}">
                <button 
                    @click="documentBtn" 
                    class="button yellow w-75 py-2 my-2">
                    1
                    <br>
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>บันทึกและส่งคำร้อง</span>
            </b-col>
            <b-col class="h-100" v-bind:class="{'opacity-03' : request.status !== 'Appointment required'}">
                <button
                    @click="appointmentBtn"
                    class="button old-green w-75 py-2 my-2">
                    2
                    <br>
                    <img class="w-75 h-75" src="/icons/appointment-btn.png" alt="">
                </button>
                <br>
                <span>วันเวลาที่ต้องการนัดหมาย</span>
            </b-col>
        </b-row>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import AuthUser from "@/store/AuthUser"
import FormatThai from '@/services/FormatThai'
import CustomerStore from "@/store/Customer"
export default {
    data() {
        return {
            request_id: this.$route.params.id,
            user: {
                name: AuthUser.getters.user.name,
                image: AuthUser.getters.user.image,
                role: AuthUser.getters.user.role,
            },
            request:{
                appointment: '',
                construction_permit: '',
                contract: '',
                cover_sheet: '',
                created_at: '',
                fee_receipt: '',
                id: '',
                map: '',
                plan: '',
                project_name: '',
                status: '',
                title_deed: '',
                type: '',
                updated_at: '',
                user: {
                    address: '',
                    created_at: '',
                    id: '',
                    id_card: '',
                    image: '',
                    name: '',
                    role: '',
                    tel: '',
                    updated_at: '',
                    username: '',
                },
            },
            status: '',
        }
    },
    created(){
        if(this.request_id){
            this.fetchRequestById()
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
        handleImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.image = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        async fetchRequestById(){
            await CustomerStore.dispatch('getRequestDetailById', this.request_id)
            this.request = CustomerStore.getters.customer[0]
            if(this.request.value){
               this.value = this.request.value 
            }
        },
        backBtn(){
            this.$router.go(-1)
        },
        documentBtn(){
            if(this.request.status !== 'Appointment required'){
                this.$router.push('/docForm')
            }
        },
        appointmentBtn(){
            if(this.request.status === 'Appointment required'){
                this.$router.push('/appointment/' + this.request_id)
            }
            
        },
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        formatRoleTH(role){
            return FormatThai.formatRoleTH(role)
        },
    }
}
</script>

<style lang="scss" scoped>
.description{
    width: 80%;
}
.underline{
    text-decoration: underline;
}
.home_btn{
    margin-right: auto;
    // margin: 20px auto 20px 20px;
}
.back{
    border: 0;
    background-color: #fff;
    font-size: 2rem;
}
.noti_btn{
    margin-left: auto;
}
.content{
    height: 85%;
    .background{
        width: 200px;
        height: 200px;
    }
    .profile{
        width: 80px;
        height: 80px;
        border: 5px solid #BCC8D6;
        border-radius: 100%;
        background-color: #fff;
    }
    .topic{
        background-color: #EDEDED;
        border-radius: 5px;
        padding: 10px 10px;
    }
    .button{
        height: 65%;
        border: 0px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 9px;
    }
    .yellow{
        background-color: #FFDF6C;
    }
    .old-green{
        background-color: #CED262;
    }
    .old-pink{
        background-color: #FAC2C1;
    }
    .old-blue{
        background-color: #7DD3D0;
    }
    .history_wrapper{
        margin-top: 80px;
        a{
            color: black;
        }
    }
}
.deleted-margin{
    margin: 0px;
}
.logo{
    width: 100px;
    height: 100px;
}
.text-left{
    text-align: left;
}
</style>