<template>
  <div class="h-100 set-font-family">
      <div class="flex w-100">
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
        <b-row v-if="user.role === 'Customer'" class="flex text-center h-25 w-100 deleted-margin">
            <b-col class="h-full">
                <button @click="requsetListBtn" class="button yellow w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/request-list-btn.png" alt="">
                </button>
                <br>
                <span>รายการคำขอประเมิน</span>
            </b-col>
            <b-col class="h-100">
                <button @click="requestBtn" class="button old-green w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>ขั้นตอนส่งคำขอประเมิน</span>
            </b-col>
        </b-row>
        <b-row v-if="user.role === 'Employee'" class="flex text-center h-25 w-100 deleted-margin">
            <b-col class="h-full">
                <button @click="customerList" class="button yellow w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>รายชื่อลูกค้าในระบบ</span>
            </b-col>
            <b-col class="h-100">
                <button @click="requsetListBtn" class="button old-green w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>รายการคำขอประเมินของลูกค้า</span>
            </b-col>
        </b-row>
        <b-row v-if="user.role === 'Admin'" class="flex text-center h-25 w-100 deleted-margin">
            <b-col class="h-full">
                <button @click="userListBtn" class="button yellow w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>รายชื่อผู้ใช้งานในระบบ</span>
            </b-col>
            <b-col class="h-100">
                <button class="button old-green w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>อันนี้ไม่รู้เอาไรดี</span>
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
export default {
    data(){
        return {
            user: {
                name: AuthUser.getters.user.name,
                image: AuthUser.getters.user.image,
                role: AuthUser.getters.user.role,
            }
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
        requsetListBtn(){
            this.$router.push('/request')
        },
        requestBtn(){
            this.$router.push('/appraise')
        },
        userListBtn(){
            this.$router.push('/userList')
        },
        customerList(){
            this.$router.push('/userList')
        },
        formatRoleTH(role){
            return FormatThai.formatRoleTH(role)
        }
    }
}
</script>

<style lang="scss" scoped>
.home_btn{
    margin-right: auto;
    margin: 20px auto 20px 20px;
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