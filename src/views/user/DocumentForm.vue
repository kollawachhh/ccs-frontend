<template>
<div class="h-100 w-100 body">
    <div class="header">
        <b-row class="text-center h-100 w-100 deleted-margin">
            <b-col>
                <button @click="backBtn" class="back">&#60;</button>
            </b-col>
            <b-col cols="6"><span>บันทึกเอกสาร</span></b-col>
            <b-col><img src="/icons/document-form-header.png" class="w-50 mt-2" alt=""></b-col>
        </b-row>
    </div>
    <div class="w-100 h-75">
        <form @submit.prevent="submit" class="w-100 h-100" action="">
            <div class="form-wrapper mt-5 w-100 h-100">
                <div class="w-75 mx-auto my-3">
                    <span class="flex font-bold text-left">1.ใบปะหน้าที่ขอประเมิน</span>
                    <div>
                        <img class="flex w-25" src="/icons/add-file-btn.png" alt="">
                        <input class="flex" type="file">
                    </div>
                    
                </div>
                <div class="w-75 mx-auto my-3">
                    <span class="flex font-bold text-left">2.ใบเสร็จค่าธรรมเนียมการประเมิน</span>
                    <div>
                        <img class="flex w-25" src="/icons/add-file-btn.png" alt="">
                        <input class="flex" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span class="flex font-bold text-left">3.สัญญาซื้อขาย</span>
                    <div>
                        <img class="flex w-25" src="/icons/add-file-btn.png" alt="">
                        <input class="flex" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span class="flex font-bold text-left">4.ใบอนุญาติปลูกสร้าง หรือ เอกสารแสดงกรรมสิทธิ์สิ่งปลูกสร้าง</span>
                    <div>
                        <img class="flex w-25" src="/icons/add-file-btn.png" alt="">
                        <input class="flex" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span class="flex font-bold text-left">5.โฉนดที่ดิน + สารบัญจดทะเบียน</span>
                    <div>
                        <img class="flex w-25" src="/icons/add-file-btn.png" alt="">
                        <input class="flex" type="file">
                    </div>
                </div>
                <div class="w-75 mx-auto my-3">
                    <span class="flex font-bold text-left">6.แผนที่สังเขป</span>
                    <div>
                        <img class="flex w-25" src="/icons/location-btn.png" alt="">

                    </div>
                </div>
            </div>
            <button class="submit-btn" type="submit">SUBMIT</button>
        </form>
    </div>
    <Footer></Footer>
</div>
  
</template>

<script>
import Footer from '../../components/Footer.vue'
export default {
    components:{
        Footer
    },
    methods:{
        submit(){
            Swal.fire({
                title: 'Are you sure?',
                text: "Your documents will be saved!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Submit'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Complete!',
                'Your documents has been submit.',
                'success'
                )
            }
            })
        },
        backBtn(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang='scss'scoped>
.body{
    background-color: #E1F1FE;
}
.back{
    color: #fff;
    border: 0;
    background-color: #0B4870;
    font-size: 2rem;
}
.header{
    color: #fff;
    font-size: 1.5rem;
    margin: 0px;
    height: 50px;
    background-color: #0B4870;
    span{
        line-height: 200%;
    }
}
.form-wrapper{
    overflow-x: scroll;
}

.text-left{
    text-align: left;
}
.submit-btn{
    position: absolute;
    color:#fff;
    bottom: 110px;
    right: 20px;
    padding: 10px 20px;
    background-color: #0B4870;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}
.deleted-margin{
    margin: 0px;
}
</style>