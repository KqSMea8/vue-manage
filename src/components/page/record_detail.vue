<template>
<div class="record">
  <Form ref="formUpdate" :model="formUpdate" :rules="ruleValidate" :label-width="80" inline>
     <FormItem label="基本信息">
       <Icon type="ios-person"></Icon><span style="margin-right:50px;">{{formUpdate.user_info[0].name}}</span>
       <Icon type="android-contacts"></Icon><span style="margin-right:50px;">{{formUpdate.user_info[0].group_name}}</span>
       <Icon type="university"></Icon></Icon><span style="margin-right:50px;">{{formUpdate.user_info[0].join_date}}</span>
      </FormItem>
      <br>
      <FormItem label="质检月度" prop="month">
        <DatePicker v-model="formUpdate.month" format="yyyy年MM月" size="small" type="month" placeholder="Select date" style="width:150px;"></DatePicker>
     </FormItem>
      <FormItem label="相对满意率">
          {{formUpdate.relative_percent}}
      </FormItem>
      <FormItem label="绝对满意率">
          {{formUpdate.absolute_percent}}
      </FormItem>
      <br>
      <FormItem label="应答总量" prop="reply_quantity">
          <Input v-model="formUpdate.reply_quantity" size="small"  required="true" style="width:150px;"></Input>
      </FormItem>
      <FormItem label="评价总量" prop="evaluate_quantity">
           <Input v-model="formUpdate.evaluate_quantity" size="small"  style="width: 150px"></Input>
      </FormItem>
      <FormItem label="满意总量" prop="satisfy_quantity">
          <Input v-model="formUpdate.satisfy_quantity" size="small" style="width: 150px"></Input>
      </FormItem>
      <FormItem label="不满意量" prop="unsatisfy_quantity">
          <Input v-model="formUpdate.unsatisfy_quantity" size="small"  style="width: 150px;"></Input>
      </FormItem>
      <br>
      <FormItem label="第一周质检分">
        <Input v-model="formUpdate.firstly" size="small"  style="width: 150px"></Input>
      </FormItem>
      <FormItem label="第二周质检分">
        <Input v-model="formUpdate.seconds" size="small"  style="width: 150px"></Input>
      </FormItem>
      <FormItem label="第三周质检分">
        <Input v-model="formUpdate.thirdly" size="small"  style="width: 150px"></Input>
      </FormItem>
      <FormItem label="第四周质检分">
        <Input v-model="formUpdate.fourthly" size="small" style="width: 150px"></Input>
      </FormItem>
        <br>
      <FormItem label="月均质检分">
          <Input v-model="formUpdate.record_avg" size="small" disabled style="width: 150px"></Input>
      </FormItem>
      <FormItem label="质检考核分/月">
          <Input v-model="formUpdate.record_score" size="small" style="width:150px"></Input>
      </FormItem>
      <FormItem label="月均在线时长/h">
          <Input v-model="formUpdate.online_time_avg" size="small"  style="width: 150px"></Input>
      </FormItem>
      <FormItem label="月均时长考核分">
          <Input v-model="formUpdate.online_time_ascore" size="small" style="width:150px"></Input>
      </FormItem>
      <br>
      <FormItem label="月均处理时长/m">
          <Input v-model="formUpdate.handle_time_avg" size="small"  style="width: 150px;"></Input>
      </FormItem>
      <FormItem label="月均时长考核分">
          <Input v-model="formUpdate.handle_time_ascore" size="small"  style="width: 150px"></Input>
      </FormItem>
      <FormItem label="异常离线/次">
          <Input v-model="formUpdate.unlawful_offline_num" size="small"  style="width: 150px"></Input>
    </FormItem>
    <FormItem label="月度正常上线分">
          <Input v-model="formUpdate.online_num" size="small" style="width: 150px"></Input>
    </FormItem>
    <br>
    <FormItem label="月度调休备注">
        <Input v-model="formUpdate.online_leave_point" size="small"  style="width: 875px"></Input>
    </FormItem>
    <FormItem label="月度离线列表">
        <Input v-model="formUpdate.unlawful_time_list" size="small" style="width: 875px"></Input>
    </FormItem>
      <br>
    <FormItem label="质检录入时段">
        {{formUpdate.record_time_slot}}
    </FormItem>
    <br>

      <div style="margin-left:450px;">
      <Button type="dashed" size="large" @click="handleCancel()">取消</Button>
      <Button type="info" size="large" @click="handleSubmit('formUpdate')" style="margin-left:15px;">保存</Button>
    </div>

</Form>
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
      formUpdate: {
        user_info:[
          {
          name:'',
          group:'',
          group_name:'',
          join_date:''
          }
        ],
        reply_quantity:'',
        satisfy_quantity:'',
        evaluate_quantity:'',
        unsatisfy_quantity:'',
        month:'',
        absolute_percent:'',
        relative_percent:'',
        firstly:'',
        seconds:'',
        thirdly:'',
        fourthly:'',
        record_avg:'',
        record_score:'',
        online_time_avg:'',
        online_time_ascore:'',
        online_leave_point:'',
        handle_time_avg:'',
        handle_time_ascore:'',
        unlawful_offline_num:'',
        unlawful_time_list:'',
        record_time_slot:'',
        online_num:'',
      },
       ruleValidate: {
         record_user_model: [
           { required: true, message: 'Please select the user', trigger: 'change' }
          ],
          month: [
            {required: true, type: 'date', message: 'Please select the month', trigger: 'change' }
         ],
         weeks: [
           { required: true, message: 'Please select the week', trigger: 'change' }
          ],
          current_record: [
              { required: true, message: 'The score cannot be empty', trigger: 'blur' }
          ],
          record_score: [
              { required: true, message: 'The score cannot be empty', trigger: 'blur' }
          ],
          reply_quantity: [
              { required: true, message: 'The reply_quantity cannot be empty', trigger: 'blur' }
          ],
          satisfy_quantity: [
                { required: true, message: 'The satisfy_quantity cannot be empty', trigger: 'blur' }
          ],
          evaluate_quantity: [
                  { required: true, message: 'The evaluate_quantity cannot be empty', trigger: 'blur' }
          ],
          unsatisfy_quantity: [
                  { required: true, message: 'The  unsatisfy_quantity cannot be empty', trigger: 'blur' }
          ],
          online_time_ascore: [
                  { required: true, message: 'The score cannot be empty', trigger: 'blur' }
          ],
          handle_time_ascore: [
                  { required: true, message: 'The score cannot be empty', trigger: 'blur' }
          ],
          online_num: [
                  { required: true, message: 'The score cannot be empty', trigger: 'blur' }
          ],
       },

    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$api.get('/record/find_by_id' , {id:this.id}, r => {
        this.formUpdate = r.data.data
      })
    },
    handleCancel (){
      this.$router.push('/achievements');
    },
    formatMonth (date) {
       var y = date.getFullYear();
       var m = date.getMonth() + 1;
           m = m < 10 ? ('0' + m) : m;
       return y + '-' + m ;
    },
    handleSubmit (form){
      if(this.user==='super'){
          let form=this.formUpdate;
          if(form.month===''){
            this.$Message.info('员工姓名或质检月度和周次不能为空！')
          }else{
              this.$api.post('/record/update', {id:this.id,reply_quantity:form.reply_quantity,firstly:form.firstly,seconds:form.seconds,thirdly:form.thirdly,fourthly:form.fourthly,satisfy_quantity:form.satisfy_quantity,evaluate_quantity:form.evaluate_quantity,unsatisfy_quantity:form.unsatisfy_quantity,month:this.formatMonth(form.month),record_score:form.record_score,online_time_avg:form.online_time_avg,online_time_ascore:form.online_time_ascore,online_leave_point:form.online_leave_point,handle_time_avg:form.handle_time_avg,handle_time_ascore:form.handle_time_ascore,unlawful_offline_num:form.unlawful_offline_num,unlawful_time_list:form.unlawful_time_list,online_num:form.online_num}, r => {
                  if(r.data.data===true){
                      this.$Message.info('修改成功')
                      this.$router.push('/achievements');
                  }else{
                      this.$Message.info('对方不想说话，并且向你抛出了一个异常')
                  }

              })
          }
      }else{
          this.$Message.warning('暂无权限进行该操作')
      }

    }
  }
}
</script>
<style scoped>
.record{
  width: 100%;
  height: 865px;
}
</style>
