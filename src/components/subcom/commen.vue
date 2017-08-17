<template>
    <div class="temp">
        <div class="submes">
            <h3 class="title">提交评论</h3>
            <p class="p"></p>
            <textarea placeholder="请填写你的评论..." v-model="textinfo"></textarea>
            <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="subinfo">提交</button>
        </div>
        <div class="getmes">
            <h3>最新评论</h3>
            <p class="p"></p>
            <ul class="mui-table-view">
                 <li class="mui-table-view-cell" v-for="item in list">
                     <p>
                         <span>{{item.user_name}}</span>
                         <span>{{item.add_time | datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
                     </p>
                     <p>{{item.content}}</p>
                 </li>
            </ul>
            <button type="button" class="mui-btn mui-btn-block more" @click="getmore">加载更多</button>
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
    export default {
        props:['id'],
        data(){
            return {
                textinfo:"",
                pageindex:1,
                list:[]
            }
        },
        created(){
            this.getinfo(this.pageindex);
        },
        methods:{
            getmore(){
                this.pageindex ++;
                this.getinfo(this.pageindex);
            },
            getinfo(pageindex){
                pageindex = pageindex || 1;
                var url = 'http://182.254.146.100:8899/api/getcomments/'+this.id+'?pageindex='+pageindex;
                this.$http.get(url).then(function(res){
                    if(res.body.status != 0){
                        Toast(res.body.message);
                    } else {
                       this.list = res.body.message;
                    }
                })
            },
            subinfo(){
                var url = 'http://182.254.146.100:8899/api/postcomment/'+this.id;
                this.$http.post(url,{content:this.textinfo},{emulateJSON:true}).then(function(res){
                    Toast(res.body.message);
                     this.list = [
                            {
                                "user_name":"匿名用户",
                                "add_time":new Date(),
                                "content":this.textinfo
                            }
                        ].concat(this.list);

                    this.textinfo = "";
                })
            }
        }
    }
</script>
<style scoped>
    .temp{
        padding:5px;
    }
    .mui-btn{
        padding:6px;
    }
    .more{
        border:1px solid red;
        color:red;
    }
    .p{
        height: 1px;
        width:100%;
        background:#ccc;
    }
</style>