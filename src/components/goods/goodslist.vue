<template>
    <div class="temp">
        <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list">
                    <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}" id="link">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">{{item.title}}</div>
                        <div class="price">
                            <p>
                                <span class="nowprice">￥{{item.sell_price}}</span>
                                <s>￥ {{item.market_price}}</s>
                            </p>
                            <p>
                                <span>热卖中</span>
                                <span>剩余{{item.stock_quantity}}件</span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getmes()
        },
        methods: {
            getmes() {
                var url = 'http://182.254.146.100:8899/api/getgoods?pageindex=1';
                this.$http.get(url).then(function (res) {
                    if (res.body.status != 0) {
                        Toast(res.body.message);
                        return;
                    }
                    this.list = res.body.message;
                })
            }
        }
    }
</script>
<style scoped>
    * {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .temp .mui-content{
        padding:5px;
    }
    .temp .mui-content .mui-table-view{
        padding:0;
        margin:0;
    }
    .temp .mui-content .mui-table-view-cell{
        border:1px solid #ccc;
        box-shadow: 0 0 3px #ccc;
        padding:3px;
        margin:0px;
        box-sizing: border-box;
        text-align: center;
    }
    .temp .mui-content .mui-table-view-cell #link{
        width:100%;
        margin:0;
    }
    .temp .mui-content #link .mui-media-body{
        font-size: 14px;
    }
    .price{
        background-color: #eee;
        margin-top: 5px;
    }
    .price .nowprice{
        color:red;
        font-size: 20px;
        text-align: left;
    }
</style>