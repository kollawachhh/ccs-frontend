<template>
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
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
export default {
    components:{
        Footer,
    },
    methods:{
        backBtn(){
            this.$router.go(-1)
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
</style>