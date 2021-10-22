<template>
    <div class="w-100 h-100">
        <Header tab="CCs"></Header>
        <div class="content_wrapper w-90 mt-4 mx-auto">
            <div class="header_content w-100">
                <div class="flex w-100">
                    <span class="flex my-1 mx-auto">รายชื่อลูกค้าที่ขอประเมิน</span>
                </div>
                <input class="flex search_bar mx-auto" type="text" placeholder="ค้นหาลูกค้า">
            </div>
            <table class="w-100 h-90">
                <thead class="w-100 table_head">
                    <tr class="flex my-2 w-100">
                        <th id="id" class="id">ไอดี</th>
                        <th id="name" class="name">ชื่อ</th>
                        <th id="login" class="login">ล็อคอิน</th>
                    </tr>
                </thead>
                <div id="table_body" class="flex w-100 mt-2">
                    <tbody class="w-100">
                        <tr id="row" class="flex py-1">
                            <td id="id">01</td>
                            <td id="name">name</td>
                            <td id="login">00:00 น</td>
                        </tr>
                    </tbody>
                </div>
                
            </table>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
export default {
    components:{
        Header,
        Footer
    },
}
</script>

<style lang='scss' scoped>
    .content_wrapper{
        height: 80%;
        background-color: #C6E5FF;
        border-radius: 10px;
        .header_content{
            color: white;
            height: 10%;
            background-color: #0B4870;
            border-radius: 10px;
        }
        .search_bar{
            border: 0px;
            border-radius: 5px;
            text-align: center;
        }
        .table_head{
            border-bottom: 2px solid #000000;
            height: 43px;
        }
        #table_body{
            overflow-y: scroll;
            height: 95%;
        }
        #row{
            border-bottom: 1px solid #000000;
        }
        #id{
            width: 10%;
            height: 75%;
        }
        #name{
            width: 50%;
        }
        #login{
            width: 40%;
        }
        .name{
            border-left: 2px solid #000000;
            border-right: 2px solid #000000;
        }
    }
</style>