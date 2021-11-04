<template>
  <div class="h-100 set-font-family">
      <Header tab='CCs'></Header>
      <div class="content">
          <div>
              <img class="background" src="/images/login-img.png" alt="">
          </div>
          <div>
              <img class="logo" src="/icons/ccs-logo.png" alt="">
          </div>
          <div class="my-4">
              <form @submit.prevent="login" class="mb-3">
                  <div class="mb-4 username_wrapper">
                      <span>ชื่อผู้ใช้</span>
                      <div class="w-100 mt-2" v-bind:class="{'field-required' : this.errors === 'fields required' || this.errors === 'username required'}">
                        <input v-model="form.username" class="w-100 " type="text">
                      </div>
                      
                  </div>
                  <div class="mb-4 password_wrapper">
                      <span>รหัสผ่าน</span>
                      <div class="password w-100 mt-2" v-bind:class="{'field-required' : this.errors === 'fields required' || this.errors === 'password required'}">
                          <input v-model="form.password" class="password w-100" type="password">
                      </div>
                  </div>
                  <div >
                      <button class="px-4 py-1 submit_button">ลงชื่อเข้าใช้</button>
                  </div>
              </form>
              <a class="register" href="/register">ลงทะเบียน</a>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import AuthUser from '../../store/AuthUser'
export default {
    components:{
        Header
    },
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            errors: '',
        }
    },
    methods:{
        async login(e) {
            e.preventDefault()
            this.errors = ''
            if (this.form.username == "" || this.form.password == "") {
              if(this.form.username == "" && this.form.password == ""){
                this.errors = 'fields required'
                Swal.fire({
                    title: "กรุณากรอกข้อมูลให้ครบ", 
                    text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                    icon: "error",
                    confirmButtonText: 'ตกลง'
                })
              }
              else if(this.form.username == ""){
                this.errors = 'username required'
                Swal.fire({
                    title: "กรุณากรอกชื่อผู้ใช้", 
                    text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                    icon: "error",
                    confirmButtonText: 'ตกลง'
                })
              }
              else if(this.form.password == ""){
                this.errors = 'password required'
                Swal.fire({
                    title: "กรุณากรอกรหัสผ่าน", 
                    text: "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", 
                    icon: "error",
                    confirmButtonText: 'ตกลง'
                })
              }
              
            }
            else {
                let res = await AuthUser.dispatch('login', this.form)
                if (res.success) {
                    Swal.fire({
                        title: 'ลงชื่อเข้าใช้ สำเร็จ!',
                        text: 'ยินดีต้อนรับ' + ' ' + AuthUser.getters.user.name,
                        icon: 'success',
                        confirmButtonText: 'ตกลง'
                    })
                    this.$router.push('/home')
                }
                else {
                    this.errors = 'username or password invalid.'
                    Swal.fire({
                        title: 'ลงชื่อเข้าใช้ไม่สำเร็จ!',
                        text: 'ลองใหม่อีกครั้ง.',
                        icon: 'error',
                        confirmButtonText: 'ตกลง'
                    })
                    this.clearForm()
                }
            }
        },
        clearForm() {
            this.form = {
                username: "",
                password: ""
            }
        }
    },
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
    .background{
        width: 200px;
        height: 200px;
    }
    form{
        .username_wrapper{
            width: 55%;
            margin: 0 auto;
            span{
                display: flex;
            }
            input{
                background-color: #BCC8D6;
                border:0;
                padding: 5px 5px;
                border-radius: 5px;
            }
        }
        .password_wrapper{
            width: 55%;
            margin: 0 auto;
            span{
                display: flex;
            }
            div{
                display: flex;
                background-color: #BCC8D6;
                border-radius: 5px;
                .password{
                    border-radius: 5px;
                    background-color: #BCC8D6;
                    border:0;
                    padding: 5px 5px;
                }
                a{
                    color: black;
                    font-size: 0.8rem;
                    line-height: 200%;
                    text-decoration: none;
                }
            }

        }
        .submit_button{
            background-color: #FFC839;
            border:0;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
        }
    }
    .register{
        color: black;
    }
    .contract_wrapper{
        width: 95%;
        display: flex;
        margin-top: 150px;
        .contract{
            margin-left: auto;
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