<template>
  <div class="w-100 h-100">
      <Header tab='CCs' :back=true></Header>
      <div class="flex h-90">
          <div class="background w-90 h-90 mx-auto mt-5">
              <img class="profile_image" :src="user.image" alt="">
              <div class="flex h-15 w-100 mt-5">
                  <span class="mt-5 mx-auto font-bold">นัดหมายวัน และ เวลาประเมิน</span>
              </div>
              <form @submit.prevent="submit" class="w-100 h-50" action="">
                    <div class="flex w-100 h-50">
                        <div class="content-wrapper w-75 h-75 mx-auto">
                            <span class="flex mx-3 mt-4"><img class="flex icons font-bold mx-2" src="/icons/appointment-date.png" alt=""> วันที่ต้องการนัดหมาย :</span>
                            <input v-model="date" class="flex w-75 mx-auto mt-4 px-2 date-input" type="date">
                        </div>
                    </div>
                    <div class="flex w-100 h-50">
                        <div class="content-wrapper w-75 h-75 mx-auto">
                            <span class="flex mx-3 mt-4"><img class="flex icons font-bold mx-2" src="/icons/appointment-time.png" alt="">เวลาที่ต้องการนัดหมาย :</span>
                            <input v-model="time" class="flex w-75 mx-auto mt-4 px-2 date-input" type="time">
                        </div>
                    </div>
                    <button class="flex mx-auto submit-btn px-4 py-1 font-bold">ยืนยัน</button>
              </form>
              
              <div class="w-100 h-25"></div>
          </div>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import AuthUser from "@/store/AuthUser"
import EmployeeStore from "@/store/Employee"
import moment from 'moment'
export default {
    data() {
        return {
            request_id: this.$route.params.id,
            date:'',
            time:'',
            user: {
                name: AuthUser.getters.user.name,
                image: AuthUser.getters.user.image,
                role: AuthUser.getters.user.role,
            },
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
        submit(){
            Swal.fire({
                title: 'Submit',
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
                    this.pushData();
                    Swal.fire({
                        title: 'Appointment Complete!',
                        icon: 'success',
                        showCloseButton: true,
                        confirmButtonText: 'Okay'
                    })
                    this.$router.push('/request')
                }
            });
        },
        async pushData(){
            let request = {
                id: this.request_id,
                appointment: moment(this.date).format('YYYY-MM-DD') + " " + this.time + ':00',
                status: 'Explore required',
            }
            await EmployeeStore.dispatch('appointment', request)
        }
    },

}
</script>

<style lang='scss' scoped>
.background{
    background-color: #BCC8D6;
    border-radius: 10px;
}
.h-15{
    height: 15%;
    font-size: 1.2rem;
}
.profile_image{
    position: absolute;
    background-color: #fff;
    border: 5px solid #BCC8D6;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    top: 65px;
    left: 155px;
}
.icons{
    width: 25px;
    height: 25px;
}
.date-input{
    border:0;
    border-radius: 10px;
    
}
.submit-btn{
    border: 0px;
    border-radius: 10px;
}
.content-wrapper{
    background-color: #E1F1FE;
    border-radius: 10px;
}
</style>