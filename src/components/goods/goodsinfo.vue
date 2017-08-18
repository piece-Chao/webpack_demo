<template>
    <div class="temp">
        <div class="swipe">
            <mt-swipe :auto="2000">
                <mt-swipe-item v-for="item in list">
                    <img :src="item.img" >
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="buy">
            <h4 class="title">{{info.title}}</h4>
            <p class="p"></p>
            <div class="price">
                <s>市场价:{{info.market_price}}</s>
                <span>销售价:{{info.sell_price}}</span>
            </div>
            <div class="buynum">
                <span>购买数量</span><inputNumber v-on:dataobj="getcount"></inputNumber>
            </div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
        </div>
        <div class="param">
            <h5>产品参数</h5>
            <p class="p"></p>
            <ul>
                <li>商品货号 : {{info.goods_no}}</li>
                <li>库存情况 : {{info.stock_quantity}}</li>
                <li>上架时间 : {{info.add_time | datefmt("YYYY-MM-DD")}}</li>
            </ul>
        </div>
        <router-link v-bind="{to:'/goods/goodsdesc/'+info.id}">
            <mt-button class="btn" type="primary" size="large">详细信息</mt-button>
        </router-link>
        <router-link v-bind="{to:'/goods/goodscomment/'+info.id}">
            <mt-button type="danger" size="large">评价详情</mt-button>
        </router-link>
    </div>
</template>
<script>
    import inputNumber from '../subcom/inputNumber.vue';
    import {vm,COUNTSTR} from '../subcom/vm.js';
    import {Toast} from 'mint-ui';
    export default {
        components:{
            inputNumber
        },
        data(){
            return {
                list:[],
                info:{},
                inputNumberCount:1
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getimg();
            this.getinfo();
        },
        methods:{
            getcount(count){
                this.inputNumberCount = count;
            },
            toshopcar(){
                vm.$emit(COUNTSTR,this.inputNumberCount);
            },
            getimg(){
                var url = 'http://182.254.146.100:8899/api/getthumimages/'+this.id;
                this.$http.get(url).then(function (res) {
                    if(res.body.status != 0){
                        Toast(res.body.message);
                        return ;
                    }
                    this.list = res.body.message;
                })
            },
            getinfo(){
                var url = 'http://182.254.146.100:8899/api/goods/getinfo/'+this.id;
                this.$http.get(url).then(function (res) {
                    if(res.body.status != 0){
                        Toast(res.body.message);
                        return ;
                    }
                    this.info = res.body.message[0];
                })
            }
        }
    }
</script>
<style scoped>
    .swipe{
        height:300px;
        margin:3px;
        border:1px solid #ccc;
        border-radius: 8px;
        box-sizing: border-box;
    }
    .buy,
    .param{
        margin:3px;
        border:1px solid #ccc;
        border-radius: 8px;
        padding:5px;
    }
    .p{
        height:1px;
        background-color: #ccc;
    }
    .title{
        color:skyblue;
    }
    .price{
        font-size: 14px;
        color:#aaa;
        line-height: 36px;
    }
    .price span{
        margin-left: 20px;
    }
    .buynum{
        line-height: 38px;
    }
    .param ul li{
        list-style: none;
        color:#aaa;
        font-size: 15px;
    }
    .btn{
        margin:5px 0;
    }
</style>