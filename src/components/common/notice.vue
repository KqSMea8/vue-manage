<template>
<div class="notice">
      <div class="notice-content">
            <div v-for="notice in result">
                    <h3><Icon type="android-notifications" style="margin-right:5px"></Icon><router-link :to="'/notice_detail' + notice.id">{{notice.title}}<p class="content">{{notice.gmt_create}}</p></router-link></h3>
            </div>
      </div>
       <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage" :show-elevator="true" :total="total" @on-page-size-change="changesize" style="width:100%;margin-top:5px;margin-bottom: 5px;"></Page>
</div>
</template>
<script>
    export default {
        data () {
            return {
                id:this.$route.params.id,
                rows:10,
                total:0,
                result:[],
                resp:[]

            }
        },
        created () {
          this.initNotice()
        },
        methods: {
          changepage(index){
            var _start = ( index - 1 ) * this.rows;
            var _end = index * this.rows;
            this.result= this.resp.slice(_start,_end);
          },
          changesize(size){
            this.rows=size;
            if(this.resp.length<this.rows){
              this.result=this.resp
            }else{
              this.result=this.resp.slice(0,this.rows)
            }
          },
          initNotice(){
            this.$api.get('/notice/query',null,r => {
                if(r.data.data.length===0){
                    this.$Message.warning('暂无相关公告')
                }else{
                    let total=r.data.data.length
                    this.$Message.success('已罗列出'+total+'条公告，点击查看详情')
                    this.resp=r.data.data
                    this.total=total
                    if(r.data.data.length<this.rows){
                      this.result=this.resp
                    }else{
                      this.result=this.resp.slice(0,this.rows)
                    }
                }

            })

          }
      }

  }
</script>
<style scoped>
.notice {
  margin: 10px 20px 0 0px;
}
.notice-content {
  margin: 10px 20px 0 0px;

}
.time{
       font-size: 14px;
       font-weight: bold;
   }
.content{
    float: right;
   }

</style>
