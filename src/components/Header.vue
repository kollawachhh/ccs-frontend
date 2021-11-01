<template>
  <div class="header">
        <b-row class="text-center h-100 w-100 deleted-margin">
            <b-col><button v-if="back" @click="backBtn(path)" class="back">&#60;</button></b-col>
            <b-col cols="6"><span>{{tab}}</span></b-col>
            <b-col><img src="/icons/header-ico.png" class="" alt=""></b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props:['tab', 'back', 'path'],
    methods:{
        backBtn(path){
            if(path === '-1'){
                this.$router.go(-1)
            }
            else{
                this.$router.push(path)
            }
        },
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