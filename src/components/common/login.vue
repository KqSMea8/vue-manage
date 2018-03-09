<template>
<div class="wrapper">
<h1>
QA录入系统
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
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" long >Login</Button>
      </FormItem>
  </Form>
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
                          if(form.user === 'admin'||form.user === 'super'){
                              if((form.user === 'admin'&&form.password === 'admin123')||(form.user === 'super'&&form.password === 'super123')){
                                    Cookies.set('user', form.user);
                                    Cookies.set('password', form.password);
                                    this.$Message.success(form.user +',欢迎登录!');
                                    this.$router.push('/notice');
                              }else{
                                  this.$Message.error('密码错误，请重新输入');
                              }

                          }else{
                            this.$Message.error('用户不存在');
                          }

                        } else {
                            this.$Message.error('表单验证失败!');
                        }
                    })
                },
                handleReset(val) {
                    console.log(val)
                }

        }
}

</script>
<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    padding-bottom: 200px;

}
.wrapper > h1{
  text-align: center;
  vertical-align: middle;
  margin-bottom: 20px;
  color: #000;
}
.login {
    margin: 0 auto;
    padding: 200px auto;
    width: 250px;
    height: 100%;
}
</style>
