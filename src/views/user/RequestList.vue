<template>
    <div class="w-100 h-100">
        <Header tab="CCs" :back = true></Header>
        <div class="content_wrapper w-90 mt-4 mx-auto">
            <div class="header_content w-100">
                <div class="flex w-100 h-100">
                    <span class="flex my-3  mx-auto">รายชื่อลูกค้าที่ขอประเมิน</span>
                </div>
            </div>
            <table class="w-100 h-90">
                <thead class="w-100 table_head">
                    <tr class="flex my-2 w-100">
                        <th class="no">อันดับ</th>
                        <th class="type">ประเภท</th>
                        <th class="date">วันที่</th>
                        <th class="status">สถานะ</th>
                    </tr>
                </thead>
                <div id="table_body" class="flex w-100 mt-2">
                    <tbody class="w-100">
                        <tr id="row" class="flex py-1">
                            <td id="no">1</td>
                            <td id="type">Building</td>
                            <td id="date">00/00/00</td>
                            <td id="status">ตรวจสอบเอกสาร</td>
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
            line-height:200%;
            height: 10%;
            font-weight:bold;
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
        .no{
            width:15%;
            border-right: 2px solid #000000;
        }
        .type{
            width:20%;
        }
        .date{
            width:30%;
            border-left: 2px solid #000000;
            border-right: 2px solid #000000;
        }
        .status{
            width:35%;
        }
        #no{
            width:15%;
        }
        #type{
            width:20%;
        }
        #date{
            width:30%;
        }
        #status{
            width:35%;
        }
    }
</style>