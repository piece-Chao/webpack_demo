<template>
    <div class="temp">
        <div>
            <h4>{{desc.title}}</h4>
            <div v-html="desc.content">

            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                desc:{}
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getdesc();
        },
        methods:{
            getdesc(){
                var url = 'http://182.254.146.100:8899/api/goods/getdesc/'+this.id;
                this.$http.get(url).then(function(res){
                    if(res.body.status != 0){
                        Toast(res.body.message);
                        return ;
                    }
                    this.desc = res.body.message[0];
                })
            }
        }
    }
</script>
<style scoped>
    .temp{
        padding:5px;
    }
    .temp h4{
        color:skyblue;
    }
</style>