<template>
  <div class="purchase_script">
    <Tabs>
      <TabPane label="python script-列表" >
       <iframe src="http://10.110.2.31/webTool" frameborder="0" scrolling="auto" width="100%" height="720"></iframe>
      </TabPane>
      <TabPane label="代办hander-转换" >
        <div style="width: 800px;margin:80px 100px 30px 100px;">
           <!-- <Input search enter-button v-model="handler" @on-search="searchs" placeholder="enter db_backlog.zcy_backlog_hot_t table handler value here" style="margin-bottom:10px;width: 750px;"/> -->
           <InputNumber v-model="handler"  @on-change="searchs" placeholder="enter db_backlog.zcy_backlog_hot_t table handler value here" style="margin-bottom:10px;width: 750px;"></InputNumber>
            <i-progress :percent="percent" :stroke-width="5"/>
        </div>
        <div style="width: 800px;margin-left:360px;" v-if="result>=0">

          <i-Circle :size="225":trail-width="4" :stroke-width="5" :percent="100" stroke-linecap="square" stroke-color="#43a3fb">
            <div class="demo-Circle-custom">
                <h1>{{result}}</h1>
          </div>
        </i-Circle>
        </div>
      </TabPane>
      <TabPane label="DES解密" >
        <Form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="80">
          <FormItem label="Code" prop="area">
            <Input v-model="formItem.area" type="textarea" :autosize="{minRows:4,maxRows:15}" placeholder="2452b99abbc09a745416310e08dc04b2,d324fb79c59415155416310e08dc04b2,17b45d51e388e4f25416310e08dc04b2" style="width:800px;"></Input>
          </FormItem>
          <FormItem>
          <Button type="primary" style="margin:0 auto; width:100px;margin-left:320px;" @click="handleSubmit('formItem')">Decrypt</Button>
          </FormItem>
        </Form>
        <div style="margin:0 auto;margin-left:80px;">
          <h3 v-html="decrypt"></h3>
        </div>

      </TabPane>
      <TabPane label="休闲聊天室" >
          <Button type="warning" ghost size="small" style="marginLeft:350px;" @click="chat">点击进入聊天室</Button>
      </TabPane>
     </Tabs>
   </div>
</template>
<script>
export default {
        data () {
            return {
                percent: 0,
                handler:1,
                result:-1,
                decrypt:'',
                formItem: {
                    area:''
                },
                ruleInline: {
                    area: [
                        { required: true, message: 'Please fill in the verify code list', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            color () {
                let color = '#2db7f5';
                if (this.percent == 100) {
                    color = '#5cb85c';
                }
                return color;
            }
        },
        methods: {
            searchs () {
              if(this.handler == null || this.handler == ""){
                  this.$Message.info('handler code is null')
              }else{
                if (this.percent < 100) {
                        this.percent += 100;
                    }

                this.$api.post('/menu/hash' , {handler:this.handler}, r => {
                        this.result=r.data.data;

                 })
             }
            },
            chat (){
              this.$router.push('/scoket');
            },
            handleSubmit(name) {
               this.$refs[name].validate((valid) => {
                   if (valid) {
                       this.$Message.success('Success!');
                       this.$api.post('/menu/des/decode' , {code:this.formItem.area}, r => {
                               this.decrypt=r.data.data;
                        })
                   } else {
                       this.$Message.error('Fail!');
                   }
               })
           }

        }
    }
</script>
<style scoped>
    .demo-Circle-custom{
        & h1{
            color: #3f414d;
            font-size: 28px;
            font-weight: normal;
        }

    }
</style>
