<template>
  <div class="h-100">
      <Header tab='Register'></Header>
      <div class="content">
          <div class="mt-3">
              <img class="logo" src="/icons/ccs-logo.png" alt="">
          </div>
          <div class="my-4 h-75">
              <form class="mb-3 h-100" action="">
                  <div class="form_wrapper h-100">
                        <div class="mb-4 username_wrapper">
                            <span>รูปประจำตัว :</span>
                            <img :src="this.form.image" alt="" class="w-50 h-50 my-2">
                            <input @change="handleImage" class="first_color w-100" type="file" accept="image/*">
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>ชื่อผู้ใช้ :</span>
                            <input class="second_color w-100" type="text">
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>รหัสผ่าน :</span>
                            <div class="flex">
                                <input class="first_color password left" type="password" placeholder="ใส่รหัสผ่าน">
                                <input class="first_color password right" type="password" placeholder="ยืนยันรหัสผ่าน">
                            </div>
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>ชื่อ :</span>
                            <input class="second_color w-100" type="text">
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>นามสกุล : </span>
                            <input class="first_color w-100" type="text">
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>วัน/เดือน/ปี : </span>
                            <input v-model="this.form.date" class="second_color w-100" type="date">
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>หมายเลขบัตรประชาชน : </span>
                            <input class="first_color w-100" type="text">
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>เบอร์โทรศัพท์ : </span>
                            <input class="second_color w-100" type="text">
                        </div>
                        <div class="mb-4 username_wrapper">
                            <span>ที่อยู่ : </span>
                            <textarea class="first_color address w-100" name="" id="" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                  
                  <div >
                      <button class="mt-3 px-3 py-1 submit_button">ตรวจสอบ</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
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
        Header
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
    }
}
</script>

<style lang="scss" scoped>
.header{
    color: #fff;
    font-size: 1.5rem;
    margin: 0px;
    height: 50px;
    background-color: #0B4870;
    
    span{
        line-height: 200%;
    }
    img{
        width: 70px;
        height: 50px;
    }
}
.content{
    height: 85%;
    .background{
        width: 200px;
        height: 200px;
    }
    form{
        .form_wrapper{
            overflow: scroll;
            height: 80%;
            padding-bottom: 5px;
        }
        .first_color{
            background-color: #C6E5FF;
        }
        .second_color{
            background-color: #BCC8D6;
        }
        .username_wrapper{
            width: 70%;
            margin: 0 auto;
            span{
                display: flex;
            }
            input{
                border:0;
                padding: 5px 5px;
                border-radius: 5px;
            }
            .password{
                width: 45%;
            }
            .left{
                margin-right: auto;
            }
            .right{
                margin-left: auto;
            }
        }
        .address{
            border:0;
            border-radius: 5px;
        }
        .submit_button{
            background-color: #F3D158;
            border:0;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
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