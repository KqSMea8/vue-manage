<template>
<div class="account">
  <Form ref="formUpdate" :model="formUpdate"  :label-width="80" inline>
     <FormItem label="基本信息">
     </FormItem>
     <br>
    <FormItem label="编号:">
      <span style="margin-right:50px;">{{id}}</span>
     </FormItem>
     <br>
     <FormItem label="昵称:">
       <Icon type="ios-person"></Icon><span style="margin-right:50px;">{{formUpdate.nick_name}}</span>
     </FormItem>
     <br>
     <FormItem label="组别:">
       <Icon type="ios-school"></Icon><span style="margin-right:50px;">{{formUpdate.group}}</span>
     </FormItem>
     <br>
     <FormItem label="权限:">
      <span style="margin-right:50px;">{{menu_list}}</span>
     </FormItem>
     <br>
     <FormItem label="账号:">
      <span style="margin-right:50px;">{{formUpdate.account}}</span>
     </FormItem>
     <FormItem label="密码:" style="margin-left:50px;">
      <span style="margin-right:10px;">******</span><Button type="warning" size="small" @click="modal1=true" style="margin-left:10px;">修改</Button>
     </FormItem>
     <br>
     <FormItem label="注册:">
      <span style="margin-right:50px;">{{formUpdate.gmt_create}}</span>
     </FormItem>
     <FormItem label="更新:">
      <span style="margin-right:50px;">{{formUpdate.gmt_modify}}</span>
     </FormItem>
     <Modal v-model="modal1" title="修改密码" @on-ok="handerSubmit" @on-cancel="cancel">
       <Form ref="pwdUpdate" :model="pwdUpdate" :rules="ruleInline" :label-width="80" inline>
         <FormItem label="原始密码:" prop="old_pwd">
           <Input type="password" v-model="pwdUpdate.old_pwd" placeholder="old pwd">
               <Icon type="ios-lock-outline" slot="prepend"></Icon>
           </Input>
          </FormItem>
          <FormItem label="新的密码:" prop="new_pwd">
            <Input type="password" v-model="pwdUpdate.new_pwd" placeholder="new password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
           </FormItem>
           <FormItem label="确认密码:" prop="confirm_pwd">
             <Input type="password" v-model="pwdUpdate.confirm_pwd" placeholder="confirm password">
                 <Icon type="ios-lock-outline" slot="prepend"></Icon>
             </Input>
            </FormItem>

        </Form>
    </Modal>

</Form>
</div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      id: Cookies.get('id'),
      pwd:Cookies.get('pwd'),
      now_roles: Cookies.get('role'),
      modal:false,
      modal1:false,
      menu_list:'',
      formUpdate: {
          account:'',
          nick_name:'',
          group:'',
          gmt_create:'',
          gmt_modify:'',

      },
      pwdUpdate: {
          old_pwd:'',
          new_pwd:'',
          confirm_pwd:'',
      },
      ruleInline: {
          old_pwd: [{
              required: true,
              message: '请填写旧密码',
              trigger: 'blur'
          }],
          new_pwd: [{
              required: true,
              message: '请填写新密码',
              trigger: 'blur'
          }, {
              type: 'string',
              min: 6,
              message: '密码长度不能小于6位',
              trigger: 'blur'
          }],
          confirm_pwd: [{
              required: true,
              message: '请填写确认密码',
              trigger: 'blur'
          }, {
              type: 'string',
              min: 6,
              message: '密码长度不能小于6位',
              trigger: 'blur'
          }]
      }

    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$api.get('/account/find_by_id' , {id:this.id}, r => {
        this.formUpdate = r.data.data
      });
      this.$api.get('/menu/init' , {role:this.now_roles}, r => {
        for (var i=0;i<r.data.data.length;i++)
          {
            let list=this.menu_list;
            if(typeof list == "undefined" || list == null || list == ""){
              this.menu_list=r.data.data[i].nav_name;
            }else{
              this.menu_list=list+"、"+r.data.data[i].nav_name;
            }

          }
      })
    },
    handerSubmit () {
      let pwd=this.pwdUpdate.old_pwd
      let npwd=this.pwdUpdate.new_pwd;
      let cpwd=this.pwdUpdate.confirm_pwd;
      if(pwd===this.pwd){
        if(npwd===cpwd){
          this.$api.post('/account/update', {id:this.id,password:cpwd}, r => {
              if(r.data.data===true){
                  this.$Message.info('密码修改成功,请重新登陆')
                  this.pwdUpdate.old_pwd=''
                  this.pwdUpdate.new_pwd=''
                  this.pwdUpdate.confirm_pwd=''
                    this.$router.push('/login');

              }else{
                  this.$Message.info('failure')
              }

          })
        }
        else{
          this.$Message.info('两次密码输入不一致');
        }
      }else{
          this.$Message.info('原始密码输入错误');
      }

    },
    cancel () {
             this.$Message.info('操作已取消');
    },


  }
}
</script>
<style scoped>
.account{
  width: 100%;
  height: 865px;
}
</style>
