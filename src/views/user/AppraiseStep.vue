<template>
  <div class="h-100">
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
                <span class="flex mt-4 font-bold">Welcome</span>
                <span class="flex mt-1 username">{{user.name}}</span>
                <span class="flex mt-1 username">({{user.role}})</span>
            </b-col>
        </b-row>
        <div class="mb-5">
            <span class="topic">ขั้นตอนการส่งคำร้องขอประเมิน</span>
        </div>
        <b-row class="flex text-center h-25 w-100 deleted-margin">
            <b-col class="h-full">
                <button 
                    @click="documentBtn" 
                    class="button yellow w-75 py-2 my-2"
                    v-bind:class="{'opacity-03':this.status === 'Waiting approve'}">
                    1
                    <br>
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>บันทึกเอกสาร</span>
            </b-col>
            <b-col class="h-100">
                <button 
                    class="button old-green w-75 py-2 my-2"
                    v-bind:class="{'opacity-03':this.status === ''}">
                    2
                    <br>
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>วันเวลาที่ต้องการนัดหมาย</span>
            </b-col>
        </b-row>
        <b-row class="flex text-center h-25 w-100 deleted-margin">
            <b-col class="h-full">
                <button 
                    class="button old-pink w-75 py-2 my-2"
                    v-bind:class="{'opacity-03':this.status === '' || this.status === 'Waiting approve'}">
                    3
                    <br>
                    <img class="w-75 h-75" src="/icons/send-request.png" alt="">
                </button>
                <br>
                <span>ส่งคำร้องขอประเมิน</span>
            </b-col>
            <b-col class="h-100">
                <button 
                    class="button old-blue w-75 py-2 my-2"
                    v-bind:class="{'opacity-03':this.status === '' || this.status === 'Waiting approve'}">
                    4
                    <br>
                    <img class="w-75 h-75" src="/icons/estate-btn.png" alt="">
                </button>
                <br>
                <span>สถานะการประเมิน</span>
            </b-col>
        </b-row>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import AuthUser from "@/store/AuthUser"
export default {
    data() {
        return {
            user: {
                name: AuthUser.getters.user.name,
                image: AuthUser.getters.user.image,
                role: AuthUser.getters.user.role,
            },
            status: '',
        }
    },
    components:{
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
    methods:{
        handleImage(e){
            const selectedImage = e.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.form.image = reader.result;
            }
            reader.readAsDataURL(selectedImage)
        },
        backBtn(){
            this.$router.go(-1)
        },
        documentBtn(){
            this.$router.push('/docForm')
        },
        appointmentBtn(){
            this.$router.push('/appointment')
        },
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
    }
}
</script>

<style lang="scss" scoped>
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
</style>