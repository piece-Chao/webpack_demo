<template>
    <div class="temp">
        <div class="substrict" @click="substrict">-</div>
        <div class="count"> {{count}} </div>
        <div class="add" @click="add"> + </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                count:1
            }
        },
        created(){

        },
        methods:{
            substrict(){
                this.count --;
                if(this.count <= 1){
                    this.count = 1;
                }
                this.sendmessage();
            },
            add(){
                this.count ++;
                this.sendmessage();
            },
            sendmessage(){
                this.$emit("dataobj",this.count);
            }
        }
    }
</script>
<style scoped>
    .temp>div{
        height: 22px;
        text-align:center;
        line-height:20px;
        display:inline-block;
        border:1px solid #ccc;
        width:30px;
    }
    .temp{
        margin:0;
        display:inline-block;
    }
</style>