<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="15"
        class="elevation-0"
    ></v-data-table>
</template>

<script>
export default {
    data(){
        return{
            headers:[],
            desserts:[],

        }
    },
    props:{
        data:{
            type:Array
        }
    },
    watch:{
        data:{
            immediate:true,
            handler(val){
                
            }
        }
    }
};
</script>

<style>
</style>