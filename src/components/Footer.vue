<template>
  <div class="footer">
        <b-row class="flex text-center h-100 w-100 deleted-margin">
            <b-col class="h-100">
                <img @click="homeBtn" src="/icons/home-footer.png" class="w-50 my-2" alt="">
            </b-col>
            <b-col cols="6">
            </b-col>
            <b-col class="h-100">
                <img @click="accountDetailBtn" :src="user.image" class="profile" alt="">
            </b-col>
        </b-row>
    </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
export default {
    props:['tab', 'path', 'back'],
    data(){
        return {
            user: {
                image: AuthUser.getters.user.image,
            },
        }
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
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        homeBtn(){
            this.$router.push('/home')
        },
        accountDetailBtn(){
            this.$router.push('/detail')
        },
    }
}
</script>

<style lang="scss" scoped>
.footer{
    position: absolute;
    bottom: 0px;
    color: #fff;
    font-size: 1.5rem;
    margin: 0px;
    width: 100%;
    height: 50px;
    background-color: #0B4870;
    span{
        line-height: 200%;
    }
    .w{
        width: 30%;
    }
    .profile{
        width: 40px;
        height: 40px;
        margin-top: 6px;
        background-color: #fff;
        border-radius: 100%;
    }
}
.back{
    color: #fff;
    border: 0;
    background-color: #0B4870;
    font-size: 2rem;
}
.deleted-margin{
    margin: 0px;
}
</style>