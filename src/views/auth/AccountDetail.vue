<template>
<<<<<<< HEAD
    <div class="h-100">
        <div class="flex">
              <div class="home_btn">
                <button @click="backBtn" class="flex back">&#60;</button>
              </div>
              <div class="noti_btn">
                  <img src="/icons/noti-btn.png">
                  <br>
                  <span>แจ้งเตือน</span>
              </div>
        </div>
        <div class="content">
            <b-row class="flex text-center w-100 mb-5 mx-auto">
                <b-col cols="4" class=""><img :src="user.image" class="profile"></b-col>
                <b-col class="h-100"><span class="flex mt-4 username">{{user.role + ' : ' + user.name}}</span></b-col>
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
            <button @click="logout" class="logout px-3 py-1">Logout</button>
=======
    <div class="w-100 h-100">
        <div class="flex">
            <div class="home_btn">
                <button @click="backBtn" class="back">&#60;</button>
            </div>
            <div class="noti_btn">
                <img src="/icons/noti-btn.png" alt="">
                <br>
                <span>แจ้งเตือน</span>
            </div>
        </div>
        <div class="w-100">
            <div class="w-90 mx-auto">
                <img class="profile-img" src="/icons/user_test_img.png" alt="">
                <br>
                <span class="flex name w-100 mx-auto mt-4">นายสมชวย เรืองอินทนนทร์</span>
            </div>
            <div>

            </div>
>>>>>>> 55aa49677bfb109fe39d391056fc52aa0108b6ec
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
<<<<<<< HEAD
import AuthUser from "@/store/AuthUser"
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
                title: "You don't have permission!!",
                text: 'Please login',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
            this.$router.push("/")
        }
=======
export default {
    components:{
        Footer,
>>>>>>> 55aa49677bfb109fe39d391056fc52aa0108b6ec
    },
    methods:{
        backBtn(){
            this.$router.go(-1)
        },
<<<<<<< HEAD
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        async logout() {
            Swal.fire({
                title: 'Logout',
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
                    AuthUser.dispatch('logout')
                    Swal.fire({
                        title: 'Logout Complete!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'Okay'
                    })
                    this.$router.push('/')
                }
            });
        }
    }
=======
    }

>>>>>>> 55aa49677bfb109fe39d391056fc52aa0108b6ec
}
</script>

<style lang='scss' scoped>
<<<<<<< HEAD
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
    margin: 20px 20px 20px auto;
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
=======
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
        margin: 20px 20px 20px auto;
    }
    .deleted-margin{
        margin: 0px;
    }
    .profile-img{
        border:20px solid #BCC8D6;
        border-radius: 100%;
    }
    .name{
        text-align:center;
    }
>>>>>>> 55aa49677bfb109fe39d391056fc52aa0108b6ec
</style>