<template>
<div class="login_bg">
<div class="wrapper">
<h1>
Technical
</h1>
    <div class="login">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" >
      <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
      </FormItem>
      <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" long >Login</Button>
      </FormItem>
  </Form>
    </div>
</div>
</div>

</template>

<script>
import Cookies from 'js-cookie';
export default {
    data() {
            return {
                formInline: {
                    user: '',
                    password: ''

                },
                ruleInline: {
                    user: [{
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请填写密码',
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
        methods: {
            handleSubmit(name) {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                          let form=this.formInline;
                          this.$api.get('/account/login', {account:form.user,password:form.password}, r => {

                              if(r.data.data===null){
                                this.$Message.error('用户名或密码错误');
                              }else{
                                Cookies.set('id', r.data.data.id);
                                Cookies.set('user', r.data.data.account);
                                Cookies.set('role', r.data.data.role);
                                Cookies.set('pwd', r.data.data.password);
                                Cookies.set('nick_name', r.data.data.nick_name);
                                Cookies.set('group', r.data.data.group);
                                this.$Message.success(r.data.data.nick_name +',欢迎登录!');
                                this.$router.push('/account');
                                if(r.data.data.role==2){
                                  this.$api.get('/plan/query_audit', null, r => {
                                    if(r.data.data.length>0){
                                      let count=r.data.data.length;
                                      this.$Notice.success({
                                        title: '友情提示',
                                        render: h => {
                                          return h('div', [
                                              h('span','您有'+count+'条采购计划申请需要审核! '),
                                            h('a', {
                                                props: {
                                                    type: 'info',
                                                    size: 'small'

                                                },
                                                style: {
                                                    marginRight: '3px'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.toAudit()
                                                    }
                                                }
                                            }, '去处理'),

                                          ]);
                                        },
                                        duration: 5
                                       });
                                    }
                                  })
                                }
                                if(r.data.data.role==3){
                                  this.$api.get('/plan/query_execute', null, r => {
                                    if(r.data.data.length>0){
                                      let count=r.data.data.length;
                                      this.$Notice.success({
                                        title: '友情提示',
                                        render: h => {
                                          return h('div', [
                                              h('span','您有'+count+'条采购计划需要执行! '),
                                            h('a', {
                                                props: {
                                                    type: 'info',
                                                    size: 'small'

                                                },
                                                style: {
                                                    marginRight: '3px'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.toExecute()
                                                        //window.open("https://pay.zcy.gov.cn/customer-service/reporting/pplan/detail?id="+id);
                                                    }
                                                }
                                            }, '去执行'),

                                          ]);
                                        },
                                        duration: 5
                                       });
                                    }
                                  })
                                }
                              }

                          })


                        } else {
                            this.$Message.error('表单验证失败!');
                        }
                    })
                },
                handleReset(val) {
                    console.log(val)
                },
               toAudit() {
                    this.$router.push('/purchase_audit');
                },
               toExecute() {
                    this.$router.push('/purchase_create');
               }

        }
}

</script>
<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 180px;
    padding-bottom: 200px;

}
.wrapper > h1{
  text-align: center;
  vertical-align: middle;
  margin-bottom: 20px;
  color:white;
}
.login {
    margin: 0 auto;
    padding: 200px auto;
    width: 250px;
    height: 100%;
}
/* .login_bg{
    background-image: url('../../assets/img/login-bg.jpg');
} */

</style>
