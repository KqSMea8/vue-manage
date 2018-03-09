<template>
<div class="question">
    <Button type="ghost" shape="circle" size="small"><router-link :to="'/backof' + id">返回</router-link></Button>
    <Button type="ghost" size="small"  icon="trash-b" @click="modal = true" style="float: right;">删除</Button>
    <Modal v-model="modal" title="Tip" @on-ok="delQues" @on-cancel="cacel">
      <p>确认删除当前记录吗?</p>
    </Modal>

    <h1>{{data.question}}</h1>
    <div :style="{float: 'right'}">{{data.gmt_create}}</div>
    <div class="article" v-html="data.answer"></div>
</div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      id: this.$route.params.id,
      modal:false,
      user:Cookies.get('user'),
      data:{},
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('/question/find_by_id' , {id:this.id}, r => {
        this.data = r.data.data
      })
    },
    delQues (){
      if(this.user==='super'){
        this.$api.post('/question/del' , {id:this.id}, r => {
          if(r.data.data===true){
              this.$Message.success('successful operation')
              this.$router.push('/search');
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
.question{
    height: 763px;
}
.question h1{
  font-style: normal;
  text-align: center;
}
.article{
  padding: inherit;
  margin-top: 5px;
}
</style>
