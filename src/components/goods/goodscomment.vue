<template>
    <div class="temp">
    <commen :id="id"></commen>
    </div>
</template>
<script>
    import commen from '../subcom/commen.vue';
    export default {
        components:{
            commen
        },
        data(){
            return {
                id:0
            }
        },
        created(){
            this.id = this.$route.params.id;
        },
        methods:{

        }
    }
</script>
<style scoped>

</style>