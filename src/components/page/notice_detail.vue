<template>
<div class="notice">
    <Button type="ghost" shape="circle" size="small"><router-link :to="'/notice'">返回</router-link></Button>
    <Button type="ghost" size="small"  icon="trash-b" @click="modal = true" style="float: right;">删除</Button>
    <Modal v-model="modal" title="Tip" @on-ok="delQues" @on-cancel="cacel">
      <p>确认要删除当前记录吗?</p>
    </Modal>

    <h1>{{data.title}}</h1>
    <div :style="{float: 'right'}">{{data.gmt_create}}</div>
    <div class="article" v-html="data.content"></div>
</div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      id: this.$route.params.id,
      modal:false,
      role:Cookies.get('role'),
      data:{},
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('/notice/query_by_id' , {id:this.id}, r => {
        this.data = r.data.data
      })
    },
    delQues (){
      if(this.role==0){
        this.$api.post('/notice/del' , {id:this.id}, r => {
          if(r.data.data===true){
              this.$Message.success('successful operation')
              this.$router.push('/notice');
          }
        })
      }else{
          this.$Message.warning('暂无权限进行该操作！')
      }

    },
    cacel(){
          this.$Message.info('cancel the operation')
    }

  }
}
</script>
<style scoped>
.notice{
    height: 865px;
}
.notice h1{
  font-style: normal;
  text-align: center;
}
.article{
  padding: inherit;
  margin-top: 5px;
}
</style>
