<template>
<div class="mavon">
<mavonEditor :ishljs = "false" v-model="value" />
</div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
      components: {
          mavonEditor
        },
        data(){
          return{
            value:''
          }
        },
        methods:{
          handleSubmit2(){
            //console.log(a);
          }
        }

}
</script>
<style scoped>
.mavon{
  margin: 10px 20px 0 30px;
  height: 755px;
}
</style>
