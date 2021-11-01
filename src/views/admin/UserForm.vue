<template>
  <div class="h-100 set-font-family">
      <Header tab='User Account' :back=true></Header>
      <div class="content">
          <div class="mt-3">
              <img class="logo" src="/icons/ccs-logo.png" alt="">
          </div>
          <div class="my-4 h-75">
              <form @submit.prevent="register" class="mb-3 h-100" action="">
                    <div class="form_wrapper h-100">
                            <div class="mb-4 username_wrapper">
                                <span 
                                    class="font-bold">
                                    รูปประจำตัว
                                    <span 
                                        v-if="this.errors === 'image required' || this.errors === 'fields required'" 
                                        class="flex warning mx-2">
                                        !
                                    </span>
                                </span>
                                <img :src="this.form.image" alt="" class="w-50 h-50 my-2">
                                <div v-bind:class="{'field-required': this.errors === 'image required' || this.errors === 'fields required'}">
                                    <input @change="handleImage" class="first_color w-100" type="file" accept="image/*">
                                </div>
                                
                            </div>
                            <div class="mb-4 username_wrapper">
                                <span class="font-bold">ชื่อผู้ใช้</span>
                                <div v-bind:class="{'field-required': this.errors === 'username required' || this.errors === 'fields required'}">
                                    <input v-model="form.username" class="second_color w-100" type="text">
                                </div>
                            </div>
                            <div class="mb-4 username_wrapper">
                                <span class="font-bold">รหัสผ่าน</span>
                                <div class="flex">
                                    <div class="password left" v-bind:class="{'field-required': this.errors === 'password required' || this.errors === 'fields required' || this.errors === 'invalid password required'}">
                                        <input 
                                            v-model="form.password" 
                                            class="first_color w-100 " 
                                            type="password" 
                                            placeholder="ใส่รหัสผ่าน">
                                    </div>
                                    <div class="password right" v-bind:class="{'field-required': this.errors === 'confirm_password required' || this.errors === 'fields required' || this.errors === 'invalid password required'}">
                                        <input 
                                            v-model="form.confirmPassword" 
                                            class="first_color w-100 " 
                                            type="password" 
                                            placeholder="ยืนยันรหัสผ่าน">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4 username_wrapper">
                                <span class="font-bold">ชื่อ</span>
                                <div v-bind:class="{'field-required': this.errors === 'name required' || this.errors === 'fields required'}">
                                    <input 
                                        v-model="form.name" 
                                        class="second_color w-100" 
                                        type="text">
                                </div>
                            </div>
                        </div>
                  <div >
                      <button class="mt-1 px-3 py-1 submit_button">Submit</button>
                  </div>
              </form>
          </div>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import CustomerStore from "@/store/Customer"
import AuthUser from "@/store/AuthUser"
export default {
    data() {
        return {
            form: {
                image: "/images/user-test-img.png",
                username: "",
                password: "",
                confirmPassword: "",
                name: "",
                role:"Employee",
            },
            errors: '',
        }
    },
    components:{
        Header,
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
        register(){
            Swal.fire({
                title: 'Register',
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
                    if(this.form.image === "/images/user-test-img.png" && 
                       this.form.username === "" &&
                       this.form.password === "" &&
                       this.form.confirmPassword === "" &&
                       this.form.name === "" ){
                        this.errors = 'fields required'
                        Swal.fire({
                            title: 'ลงทะเบียนไม่สำเร็จ!',
                            icon: 'error',
                            showCloseButton: true,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                    else if(this.form.image === "/images/user-test-img.png"){
                        this.errors = 'image required'
                        Swal.fire({
                            title: 'กรุณาแนบรูป!',
                            icon: 'error',
                            showCloseButton: true,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                    else if(this.form.username === ''){
                        this.errors = 'username required'
                        Swal.fire({
                            title: 'กรุณาใส่ชื่อผู้ใช้!',
                            icon: 'error',
                            showCloseButton: true,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                    else if(this.form.password === ''){
                        this.errors = 'password required'
                        Swal.fire({
                            title: 'กรุณาใส่ชื่อรหัสผ่าน!',
                            icon: 'error',
                            showCloseButton: true,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                    else if(this.form.confirmPassword === ''){
                        this.errors = 'confirm_password required'
                        Swal.fire({
                            title: 'กรุณาใส่ยืนยันรหัสผ่าน!',
                            icon: 'error',
                            showCloseButton: true,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                    else if(this.form.name === ''){
                        this.errors = 'name required'
                        Swal.fire({
                            title: 'กรุณาใส่ชื่อ!',
                            icon: 'error',
                            showCloseButton: true,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                    else if(this.form.password !== this.form.confirmPassword ){
                        this.errors = 'invalid password required'
                        Swal.fire({
                            title: 'ยืนยันรหัสผ่านไม่ถูกต้อง!',
                            icon: 'error',
                            showCloseButton: true,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                    else{
                        let newCustomer = {
                            image: this.form.image,
                            username: this.form.username,
                            password: this.form.password,
                            name: this.form.name,
                            role:"Employee",
                        } 
                        CustomerStore.dispatch('createCustomer', newCustomer)
                        Swal.fire({
                            title: 'Register Complete!',
                            icon: 'success',
                            showCloseButton: true,
                            confirmButtonText: 'Okay'
                        })
                        this.$router.push('/userList')
                    }
                    
                }
            });
        },
        clearForm(){
            this.form = {
                image: this.form.image,
                username: this.form.username,
                password: "",
                confirmPassword: "",
                name: this.form.name,
                idCard: this.form.idCard,
                tel: this.form.tel,
                address: this.form.address,
                role:"Employee",
            }
        }
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
.warning{
    color: #bb2828;
}
</style>