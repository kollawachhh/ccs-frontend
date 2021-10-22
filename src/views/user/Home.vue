<template>
  <div class="h-100">
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
      <div class="content">
        <b-row class="flex text-center w-100 mb-5 deleted-margin">
            <b-col class="h-100">
                <div class="mb-3">
                    <span class="flex">ยินดีต้อนรับ</span>
                    <span class="flex">เข้าสู่ระบบ</span>
                </div>
                
            </b-col>
            <b-col cols="4"><img src="/images/user-test-img.png" class="profile" alt=""></b-col>
            <b-col class="h-100"><span class="flex">ไอ สมโชค</span></b-col>
        </b-row>
        <b-row class="flex text-center h-25 w-100 deleted-margin">
            <b-col class="h-full">
                <button @click="documentBtn" class="button yellow w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>รายการคำขอทั้งหมด</span>
            </b-col>
            <b-col class="h-100">
                <button @click="requestBtn" class="button old-green w-75 py-2 my-2">
                    <img class="w-75 h-75" src="/icons/doc-btn.png" alt="">
                </button>
                <br>
                <span>ส่งคำขอประเมิน</span>
            </b-col>
        </b-row>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
export default {
    data() {
        return {
            form: {
                image: "",
                username: "",
                password: "",
                confirmPassword: "",
                firstname: "",
                surname:"",
                date: "",
                idCard:"",
                tel:"",
                address:"",
            },
        }
    },
    components:{
        Footer
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
        requestBtn(){
            this.$router.push('/appraise')
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
        background-color: #BCC8D6;
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