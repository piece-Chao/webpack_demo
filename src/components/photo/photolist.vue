<template>
    <div class="temp">
        <div class="topnav">
            <ul v-bind="{style:'width:' + ulw + 'px' }">
                <li @click="getimg(0)">全部</li>
                <li v-for="item in list" @click="getimg(item.id)">{{item.title}}</li>
            </ul>
        </div>
        <div class="desc" v-for="item in imglist">
            <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                <img :src="item.img_url" alt="">
                <div class="imginfo">
                    <h5>{{item.title}}</h5>
                    <p>{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                list:[],
                ulw:320,
                id:0,
                imglist:[]
            }
        },
        created(){
            this.getnav();
            this.id = this.$route.params.id;
            this.getimg(0);
        },
        methods:{
            getimg(catesid){
                catesid = catesid || 0;
              var url = 'http://182.254.146.100:8899/api/getimages/'+catesid;
              console.log(url);
              this.$http.get(url).then(function (res) {
                  if(res.body.status != 0){
                      Toast(res.body.message);
                      return ;
                  } else {
                      this.imglist = res.body.message;
                  }
              })
            },
            getnav(){
                var url = 'http://182.254.146.100:8899/api/getimgcategory';
                this.$http.get(url).then(function(res){
                    if(res.body.status != 0){
                        Toast(res.body.message);
                    } else {
                        this.list = res.body.message;
                        var liw = 72;
                        this.ulw = liw * (this.list.length + 1);
                    }
                })
            }
        }
    }
</script>
<style scoped>
    ul{
        list-style-type: none;
        padding-left: 0;
    }
    .topnav ul li{
        float:left;
        padding:0 8px;
        font-size:14px;
    }
    .topnav{
        width:100%;
        overflow: auto;
    }
    .desc{
        width:100%;
        padding:5px;
        text-align: center;
        position: relative;
    }
    .imginfo{
        background-color:rgba(0,0,0,0.4);
        position: absolute;
        bottom:0;
        width:300px;
        left:50%;
        transform: translate(-50%,0);
    }
    .imginfo p{
        color:#fff;
    }
</style>