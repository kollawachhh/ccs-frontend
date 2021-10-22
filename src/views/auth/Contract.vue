<template>
    <div class="h-100">
        <div class="flex w-100 admin-text">
            <span class="admin px-5 mx-auto">Admin</span>
        </div>
        <div class="w-100 h-25 mb-3">
            <img class="background" src="/images/contract-img.png" alt="">
        </div>
        <div class="w-100 h-25">
            <div class="w-75 h-100 mx-auto">
                <span class="flex mb-3">ติดต่อสอบถาม : </span>
                <div class="request-box">
                    <div class="flex top">
                        <img class="square ml-2" src="/icons/square.png" alt="">
                        <img class="circle " src="/icons/circle.png" alt="">
                        <img class="triangle h-100" src="/icons/triangle.png" alt="">
                    </div>
                    <div class="content">
                        <div>
                            <div class="flex w-100">
                                <img class="admin-image" src="/icons/user_test_img.png" alt="">
                                <span class="admin-name">Admin</span>
                            </div>
                            <p class="admin-text-box flex"> test chat box Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, aperiam saepe! Dicta officiis, culpa vero voluptate neque corrupti numquam eveniet placeat sequi praesentium, assumenda porro accusantium sint eos perspiciatis explicabo!</p>
                        </div>
                        <div>
                            <div class="flex w-100">
                                <span class="user-name">User</span>
                                <img class="user-image" src="/icons/user_test_img.png" alt="">
                            </div>
                            <p class="user-text-box flex"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae architecto dolore qui asperiores cumque eius dolor cupiditate tenetur distinctio accusantium non, consequuntur soluta vero in unde officia inventore, magnam iure.</p>
                        </div>
                    </div>
                    <div class="bottom">
                        <form class="flex w-100 h-100" action="">
                            <input class="input" type="text">
                            <button class="submit" type="submit">
                                <img class="w-25" src="/icons/send-ico.png" alt="">
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .admin-text{
        height: 15%;
        text-align: center;
        .admin{
            height: 30px;
            background-color: #D4EBFA;
            color: #0B4870;
            font-weight: bold;
            margin-top: 15%;
            line-height: 200%;
        }
    }
    .background{
        width: 60%;
    }
    .request-box{
        height: 80%;
        background-color: rgb(216, 243, 250);
        border: 2px solid #000000;
        border-radius: 10px;
        .top{
            border-bottom: 2px solid #000000;
            border-radius: 10px 10px 0px 0px;
            width: 100%;
            height: 15%;
            background-color: rgb(243, 218, 137);
            .square{
                margin-left: 4px;
                margin-top: 2px;
                width: 17px;
                height: 17px;
            }
            .circle{
                margin-top: 3px;
                width: 15px;
                height: 15px;
            }
            .triangle{
                width: 20px;
                height: 20px;
            }
        }
        .content{
            overflow-x: scroll;
            padding-top: 10px;
            width: 100%;
            height: 60%;
            .admin-image{
                margin-left: 15px;
                background-color: #fff;
                width: 30px;
                height: 30px;
                border-radius: 100%;
            }
            .admin-name{
                margin: 4px 0px 0px 10px;
                font-size: 15px;
                font-weight: bold;
            }
            .admin-text-box{
                width: 90%;
                margin-top: 10px;
                margin-left: auto;
                margin-right: auto;
                border-radius: 0px 10px 10px 10px;
                background-color: #fff;
            }
            .user-image{
                margin-right: 15px;
                background-color: #fff;
                width: 30px;
                height: 30px;
                border-radius: 100%;
            }
            .user-name{
                margin: 4px 10px 0px auto;
                font-size: 15px;
                font-weight: bold;
            }
            .user-text-box{
                width: 90%;
                margin-top: 10px;
                margin-left: auto;
                margin-right: auto;
                border-radius: 10px 0px 10px 10px;
                background-color: #fff;
            }
            
        }
        .bottom{
            width: 100%;
            height: 25%;
            .input{
                width: 70%;
                height: 25px;
                border: 0px;
                border-radius: 5px;
                margin-left: auto;
                margin-top: 5px;
            }
            .submit{
                width: 20%;
                height: 25px;
                border: 0px;
                border-radius: 5px;
                margin-left: auto;
                margin-right: auto;
                margin-top: 5px;
            }
        }
    }
</style>