<template>
<div class="duty">
    <div style="float: right;marginRight:10px;">
      <div  v-if="role==0">
        <Button type="dashed" shape="circle" size="small"><router-link :to="'/system'">返回</router-link></Button>
        <Button type="warning" size="small"  @click="modal = true" >删除</Button>
        <Modal v-model="modal" title="Tip" @on-ok="delSheet" @on-cancel="cancel">
          <p>确认删除当前工作表吗?</p>
        </Modal>
     </div>
     <div v-else>
        <Button type="dashed" shape="circle" size="small"><router-link :to="'/system'">返回</router-link></Button>
     </div>

    </div>
    <h2>{{data.sheetName}}</h2>
    <div style="marginLeft:10px;margin-top:15px;height:auto;display:inline;float:left">
      <Timeline>
       <TimelineItem v-for="duty in data.duty" :key="duty.id" style="margin:10px 5px 35px 5px;">
           <p style="font-size:14px;font-weight:bold">{{duty.workLot}}</p>
           <p style="padding-left:5px;" v-if="duty.week<5">第{{duty.week}}周,{{duty.user_name}},开始时间:{{duty.startTime}} 结束时间:{{duty.endTime}}</p>
            <p style="padding-left:5px;" v-if="duty.week==5">结余周,{{duty.user_name}},开始时间:{{duty.startTime}} 结束时间:{{duty.endTime}}</p>
       </TimelineItem>
     </Timeline>

    </div>
    <div style="marginRight:20px;margin-top:15px;height:auto;display:inline;float:right">
    <Alert show-icon closable>
       温馨提示
       <Icon type="ios-bulb-outline" slot="icon"></Icon>
       <template slot="desc">值班内容：<br>早上八点半到岗、周末oncall值班.<br>以下为{{data.month}}月技术支持非工作时间值班表 </template>
   </Alert>
    </div>
    <div style="margin-top:20px;">
   <table class="altrowstable" id="alternatecolor" >
     <tr>
        <th>时间段</th>
        <td v-for="duty in data.duty">{{duty.workLot}}</td>
      </tr>
      <tr>
         <th>人员</th>
         <td v-for="duty in data.duty">{{duty.user_name}}</td>
       </tr>
       <tr>
          <th>电话</th>
           <td v-for="duty in data.duty">{{duty.phone}}</td>
        </tr>
    </table>
    </div>
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
      this.$api.get('/duty/findSheetById' , {id:this.id}, r => {
        this.data = r.data.data
      })
    },
    delSheet (){
      if(this.role==0){
        this.$api.post('/duty/delSheet' , {id:this.id}, r => {
          if(r.data.data===true){
              this.$Message.success('successful operation')
              this.$router.push('/system');
          }
        })
      }else{
          this.$Message.warning('暂无权限进行该操作！')
      }

    },
    cancel(){
          this.$Message.info('cancel the operation')
    }

  }
}
</script>
<style scoped>
.duty{
    height: 865px;
}
.duty h2{
  font-style: normal;
  text-align: center;
}

.article{
  padding: inherit;
  margin-top: 5px;
}
table{
  width: 100%;
}
table.altrowstable {
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
}
table.altrowstable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
table.altrowstable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
  font-size: 14px;
}
.oddrowcolor{
  background-color:#d4e3e5;
}
.evenrowcolor{
  background-color:#c3dde0;
}
</style>
