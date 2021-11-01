<template>
    <div class="h-100">
        <div class="flex">
              <div class="home_btn">
                <button @click="backBtn" class="flex back">&#60;</button>
              </div>
                <div class="noti_btn w-25 deleted-margin">
                  <img src="/icons/ccs-logo.png" class="w-75" alt="">
              </div>
        </div>
        <div class="content">
            <b-row class="flex text-center w-100 mb-5 mx-auto">
                <b-col cols="4" class=""><img :src="user.image" class="profile"></b-col>
                <b-col class="h-100"><span class="flex mt-4 username">{{formatRoleTH(user.role) + ' : ' + user.name}}</span></b-col>
            </b-row>
            <div class="w-90 h-50 mb-5 mx-auto user_detail_wrapper">
                <div class="flex w-100 h-50">
                    <div class="w-75 h-90 user_detail_top_wrapper">

                    </div>
                </div>
                <div class="flex w-100 h-50">
                    <div class="w-75 h-90 user_detail_bottom_wrapper">

                    </div>
                </div>
                
            </div>
            <button @click="logout" class="logout px-3 py-1">ออกจากระบบ</button>
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
            },
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
        backBtn(){
            this.$router.go(-1)
        },
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        async logout() {
            Swal.fire({
                title: 'ออกจากระบบ',
                text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
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
                    AuthUser.dispatch('logout')
                    Swal.fire({
                        title: 'ออกจากระบบสำเร็จ!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'ตกลง'
                    })
                    this.$router.push('/')
                }
            });
        },
        formatRoleTH(role){
            return FormatThai.formatRoleTH(role)
        },
    }
}
</script>

<style lang='scss' scoped>
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
    .user_detail_wrapper{
        background-color: #FFDF6C;
        border-radius: 10px;
    }
    .logout{
        border: 0px;
        border-radius: 5px;
        background-color: #7DD3D0;
    }
    .user_detail_top_wrapper{
        background-color: #C6E5FF;
        border-radius: 5px;
        margin-right: auto;
        margin-left: 10px;
        margin-top: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 9px;
    }
    .user_detail_bottom_wrapper{
        background-color: #FAC2C1;
        border-radius: 5px;
        margin-right: 10px;
        margin-left: auto;
        margin-top: 5px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 9px;
    }
}
</style>