<template lang="html">
    <div class="temp">
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content">

        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            id : 0,
            info : {}
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.getinfo();
    },
    methods : {
        getinfo(){
            var url = 'http://182.254.146.100:8899/api/getnew/' + this.id;

            this.$http.get(url).then(function(res){
                var body = res.body;
                if (body.status != 0) {
                    Toast(body.message);
                    return;
                }
                console.log(body.message);
                this.info = body.message[0]
            })
        }
    }
}
</script>

<style scoped lang="css">
    .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,.content{
        padding: 5px;
    }
</style>
