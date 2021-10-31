<template>
  <div class="h-100">
      <Header tab='User Account' :back=true></Header>
      <div class="content">
          <div class="mt-3">
              <img class="logo" src="/icons/ccs-logo.png" alt="">
          </div>
          <div class="my-4 h-75">
              <form @submit.prevent="register" class="mb-3 h-100" action="">
                    <div class="form_wrapper h-100">
                            <div class="mb-4 username_wrapper">
                                <span>Profile image :</span>
                                <img :src="this.form.image" alt="" class="w-50 h-50 my-2">
                                <input @change="handleImage" class="first_color w-100" type="file" accept="image/*">
                            </div>
                            <div class="mb-4 username_wrapper">
                                <span>Username :</span>
                                <input v-model="form.username" class="second_color w-100" type="text">
                            </div>
                            <div class="mb-4 username_wrapper">
                                <span>Password :</span>
                                <div class="flex">
                                    <input v-model="form.password" class="first_color password left" type="password" placeholder="Password ...">
                                    <input v-model="form.confirmPassword" class="first_color password right" type="password" placeholder="Confirm ...">
                                </div>
                            </div>
                            <div class="mb-4 username_wrapper">
                                <span>Name :</span>
                                <input v-model="form.name" class="second_color w-100" type="text">
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
export default {
    data() {
        return {
            form: {
                image: "",
                username: "",
                password: "",
                confirmPassword: "",
                name: "",
                // idCard:"",
                // tel:"",
                // address:"",
                role:"Employee",
            },
        }
    },
    components:{
        Header,
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
                    if(this.form.image === "" || 
                       this.form.username === "" ||
                       this.form.password === "" ||
                       this.form.confirmPassword === "" ||
                       this.form.name === "" ||
                       this.form.idCard === "" ||
                       this.form.tel === "" ||
                       this.form.address === ""){
                            this.clearForm()
                            Swal.fire({
                                title: 'Register Incomplete!',
                                icon: 'error',
                                showCloseButton: true,
                                confirmButtonText: 'Okay'
                            })
                       }
                    else{
                        let newCustomer = {
                            image: this.form.image,
                            username: this.form.username,
                            password: this.form.password,
                            name: this.form.name,
                            // id_card: this.form.idCard,
                            // tel: this.form.tel,
                            // address: this.form.address,
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
</style>