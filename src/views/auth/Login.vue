<template>
  <div class="h-100">
      <Header tab='CCs'></Header>
      <div class="content">
          <div>
              <img class="background" src="/images/login-img.png" alt="">
          </div>
          <div>
              <img class="logo" src="/icons/ccs-logo.png" alt="">
          </div>
          <div class="my-4">
              <form @submit.prevent="login" class="mb-3" action="">
                  <div class="mb-4 username_wrapper">
                      <span>User id :</span>
                      <input class="userId w-100" type="text">
                  </div>
                  <div class="mb-4 password_wrapper">
                      <span>Password : </span>
                      <div class="password w-100">
                          <input class="password w-75" type="password">
                          <a href="">ลืมรหัส?</a>
                      </div>
                  </div>
                  <div >
                      <button class="px-5 py-1 submit_button">Login</button>
                  </div>
              </form>
              <a class="register" href="/register">register</a>
          </div>
          <div class="contract_wrapper">
              <a class="contract" href="/contract">ติดต่อ admin</a>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
    components:{
        Header
    },
    methods:{
        login(){
            this.$router.push('/home')
            Swal.fire({
                title: 'Login Complete!',
                text: 'Welcome User',
                icon: 'success',
                confirmButtonText: 'Okay'
            })
            console.log('worked!');
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
            background-color: #F3D158;
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