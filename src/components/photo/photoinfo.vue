<template>
    <div class="temp">
        <h4 class="title">{{infolist.title}}</h4>
        <p class="info">
            <span>{{infolist.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
            <span>{{infolist.click}} 次点击</span>
        </p>
        <p class="p"></p>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in imglist">
                    <img class="preview-img" :src="item.img" height="100" @click="$preview.open(index, imglist)">
            </li>
        </ul>
        <div class="content" v-html="infolist.content">

        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                infolist:{},
                imglist:[]
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getinfo();
            this.getimg();
        },
        methods:{
            getimg(){
                var url = 'http://182.254.146.100:8899/api/getthumimages/'+this.id;
                this.$http.get(url).then(function (res) {
                    if(res.body.status != 0){
                        Toast(res.body.message);
                        return;
                    }
                        res.body.message.forEach(function (item) {
                            var img = document.createElement("img");
                            img.src = item.src;
                            item.h = img.height;
                            item.w = img.width;
                        })
                        this.imglist = res.body.message;
                })
            },
            getinfo(){
                var url = 'http://182.254.146.100:8899/api/getimageInfo/'+this.id;
                this.$http.get(url).then(function (res) {
                    if(res.body.status != 0){
                        Toast(res.body.message);
                    } else {
                        this.infolist = res.body.message[0];
                    }
                })
            }
        }
    }

</script>
<style scoped>
    .temp{
        padding:5px;
    }
    .title{
        color: skyblue;
    }
    .info{
        color:#aaa;
    }
    .p{
        height:1px;
        width: 100%;
        background-color: #ccc;
    }
    .content{
        margin-top: 10px;
        color: #999;
    }
    .mui-table-view-cell img{
        height:100px;
        width:100px;
    }
</style>