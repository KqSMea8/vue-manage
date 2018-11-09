<template>
  <div class="purchase">
    <div>
    <label>用户名称:</label>
        <Select v-model="search_owner_id" size="small" clearable style="width:150px;margin-right: 15px">
              <Option v-for="item in accountList" :value="item.id" :key="item.id">{{ item.nick_name}}</Option>
    </Select>
    <label>执行方式:</label>
      <Select v-model="search_execute_type" size="small" clearable style="width:150px;margin-right: 15px">
            <Option v-for="item in ExecuteTypeList" :value="item.id" :key="item.id">{{ item.label}}</Option>
      </Select>
    <label>关联类型:</label>
    <Select v-model="search_relation_type" size="small" clearable style="width:150px;margin-right: 15px">
          <Option v-for="item in relationList" :value="item.relation" :key="item.relation">{{item.relation}}<Icon type="md-key"></Icon>{{item.relation_name}}</Option>
    </Select>

    <label>日期间隔:</label>
    <DatePicker v-model="search_month" format="yyyy年MM月" size="small" type="month" placeholder="Select date" style="width:200px;"></DatePicker>
  <Button icon="md-search" size="small" @click="search()" style="margin-left: 5px">搜索</Button>
  </div>
  <div style="margin:6px;">
    列边框：<i-switch size="small" v-model="showBorder" style="margin-right: 5px"></i-switch>
    斑马纹：<i-switch size="small" v-model="showStripe" style="margin-right: 5px"></i-switch>
    滚动条：<i-switch size="small" v-model="fixedHeader" style="margin-right: 5px"></i-switch>
    表尺寸：
     <RadioGroup size="small" v-model="tableSize" >
         <Radio label="large">large</Radio>
         <Radio label="default">medium</Radio>
         <Radio label="small">small</Radio>
     </RadioGroup>
     <!-- <Button type="success" size="small"  @click="modal3 = true" ><Icon type="ios-flash"></Icon>SQL录入</Button> -->
     <Button type="primary"  size="small" @click="exportData()" style="float:right"><Icon type="md-cloud-download"></Icon>数据导出</Button>
     <Button type="success" size="small"  @click="modal4 = true" style="float:right;margin-right: 5px"><Icon type="ios-flash"></Icon>新建任务</Button>
      <Modal v-model="modal2" style="width:720px">
        <p slot="header" style="color:#1c2438;text-align:center">
                  <Icon type="ios-book-outline"></Icon>
                    <span>新建执行任务☆采购计划</span>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" inline>
          <FormItem label="执行方式" prop="request_type">
            <Select v-model="formValidate.request_type" size="small" clearable style="width:200px;margin-right: 5px">
                  <Option v-for="item in ExecuteTypeList" :value="item.id" :key="item.id">{{ item.label}}</Option>
            </Select>
           </FormItem>
           <br>
           <FormItem label="purchaseplan_id" prop="purchase_id">
               <Input v-model="formValidate.purchase_id" size="small" placeholder="采购计划id" required="true" style="width:200px;"></Input>
           </FormItem>
           <br>
           <FormItem label="user_id" prop="user_id">
               <Input v-model="formValidate.user_id" size="small" placeholder="责任人id" style="width: 200px;"></Input>
           </FormItem>
           <br>
           <FormItem label="relation_type" prop="local_relation_id">
                <Select v-model="formValidate.local_relation_id" size="small" filterable clearable style="width:200px">
                  <Option v-for="item in relationList" :value="item.id" :key="item.id">{{ item.relation}}<Icon type="md-key"></Icon>{{ item.relation_name}}</Option>
                </Select>
            </FormItem>
            <br>
            <FormItem label="relation_id" prop="relation_id">
                 <Input v-model="formValidate.relation_id" size="small" placeholder="关联业务id" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="amount" prop="amount">
                <Input v-model="formValidate.amount" size="small" placeholder="金额" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="quantity" prop="quantity">
                <Input v-model="formValidate.quantity" size="small" placeholder="数量" style="width: 200px;"></Input>
            </FormItem>

      </Form>
      <div slot="footer">
          <Button type="text" size="large" @click="formCancel()">取消</Button>
          <Button type="dashed" @click="reset('formValidate')">重置</Button>
          <Button type="primary" @click="purchaseAdd('formValidate')">执行</Button>
      </div>
      </Modal>
      <Modal title="新建执行任务☆采购计划" v-model="modal3" @on-ok="purchaseAddBySQL" @on-cancel="cancel" style="display: flex;align-items: center;justify-content: center;">
          <div style="margin-left: 20px">
            执行方式：<Select v-model="formSQL.request_type" size="small" clearable style="width:250px;margin-right: 5px">
                  <Option v-for="item in ExecuteTypeList" :value="item.id" :key="item.id">{{ item.label}}</Option>
            </Select>
            <br>
            关联SQL：<Input v-model="formSQL.sql" type="textarea"  :autosize="{minRows:5,maxRows: 10}"  placeholder="insert into db_settlement.purchaseplan_relation( purchaseplan_relation_id,  purchaseplan_id,  user_id,  relation_type,  relation_id,  amount,  quantity,  status,  create_time) values(1000000000000071180, 1000000000000111107, 100012898, 9, 2732, 4568100, 1, 1, '2017-08-21 10:02:59');" />
          </div>
      </Modal>
      <Modal v-model="modal4" title="调用方式" width="300" @on-ok="remoteTypeChoose" @on-cancel="cancel">
        <RadioGroup v-model="remote_type">
        <Radio label="读取">SQL录入</Radio>
        <Radio label="录入">手工键入</Radio>
        </RadioGroup>
    </Modal>
 </div>
 <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData" :columns="columns" ref="table"></Table>
  <div style="margin: 10px;overflow: hidden">
     <div style="float: right;">
         <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage" :show-elevator="true" :total="total" @on-page-size-change="changesize"></Page>
     </div>
 </div>
</div>
</template>
<script>
import Cookies from 'js-cookie'
  export default {
      data () {
          return {
            columns: [
                  {
                      title: '姓名',
                      width: 90,
                      //key: 'owner_name',
                      render: (h, params) => {
                          return h('div', [
                              h('Icon', {
                                  props: {
                                      type: 'ios-person'
                                  }
                              }),
                              h('strong', params.row.owner_name)
                          ]);
                      }
                  },
                  {
                      title: '采购计划ID',
                      minWidth:165,
                      maxWidth:180,
                      tooltip:true,
                      key: 'purchase_id',
                  },
                  {
                      title: '关联类型',
                      minWidth:120,
                      maxWidth:180,
                      tooltip:true,
                      sortable: true,
                      key: 'relation_name',
                  },
                  {
                      title: '执行方式',
                      minWidth:150,
                      maxWidth:200,
                      tooltip:true,
                      sortable: true,
                      key: 'execute_name',
                  },

                  {
                      title: '结果',
                      minWidth:150,
                      sortable: true,
                      key: 'execute_result',
                      render: (h, params) => {
                             const row = params.row;
                             const color = row.execute_result ==='SUCCESS' ? 'success' : row.execute_result === 'FAILURE' ? 'warning' : 'primary';
                             return h('Tag', {
                                 props: {
                                     type: 'dot',
                                     color: color
                                 }
                             }, row.execute_result);
                         }
                  },

                  {
                      title: '接口',
                      minWidth:80,
                      maxWidth:90,
                      //key: 'execute_method1',
                      render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    size:'small',
                                    icon:'ios-bonfire'
                                },
                                style: {
                                    marginLeft: '2px'
                                },
                                on: {
                                    click: () => {
                                        this.show_offline(params.index)
                                    }
                                }
                            }, ),

                          ])
                        }
                  },
                  {
                      title: '请求',
                      minWidth:80,
                      maxWidth:90,
                      //key:'biz_content1',
                      render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    size:'small',
                                    icon:'ios-pulse'
                                },
                                style: {
                                    marginLeft: '3px'
                                },
                                on: {
                                    click: () => {
                                        this.show_offline2(params.index)
                                    }
                                }
                            }, ),

                          ])
                        }
                  },
                  {
                      title: '响应',
                      minWidth:80,
                      maxWidth:90,
                      key:'response_data1',
                      render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    size:'small',
                                    icon:'logo-playstation'
                                },
                                style: {
                                    marginLeft: '3px',

                                },
                                on: {
                                    click: () => {
                                        this.show_offline3(params.index)
                                    }
                                }
                            }, ),

                          ])
                        }
                  },
                  {
                      title: '执行时间',
                      minWidth:150,
                      maxWidth:180,
                      key:'gmt_create',
                  },
                  {
                      title: '操作',
                      key: 'action',
                      minWidth:180,
                      maxWidth:300,
                      align: 'center',
                      render: (h, params) => {
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'success',
                                      size: 'small'
                                  },
                                  style: {
                                      marginRight: '5px'
                                  },
                                  on: {
                                      click: () => {
                                          this.show(params.index)
                                      }
                                  }
                              }, '入参明细'),

                              h('Button', {
                                  props: {
                                      type:'error',
                                      size:'small'
                                  },
                                  on: {
                                      click: () => {
                                          this.remove(params.row.id)
                                      }
                                  }
                              }, '删除')
                          ]);
                      }
                  }
              ],
              //菜单栏
              modal:false,
              modal2:false,
              modal3:false,
              modal4:false,
              remote_type:'读取',
              showBorder: true,
              showStripe: false,
              fixedHeader: false,
              tableSize: 'default',
              uid:Cookies.get('id'),
              role:Cookies.get('role'),
              pwd:Cookies.get('pwd'),
              rows:10,
              total:0,

              //用户列表、表格数据、分页数据
              relationList:[],
              accountList:[],
              ExecuteTypeList:[
                 {
                     id: '1',
                     label: '冻结：可用→冻结☆新增'
                 },
                 {
                     id: '2',
                     label: '冻结：可用→冻结☆更新'
                 },
                 {
                     id: '5',
                     label: '冻结：已用→冻结'
                 },
                 {
                     id: '3',
                     label: '释放：冻结→可用'
                 },
                 {
                     id: '4',
                     label: '释放：已用→可用'
                 },
                 {
                     id: '6',
                     label: '结算：冻结→已用'
                 }

              ],
              tableData: [],
              resp:[],
              //菜单模型
              search_owner_id: '',
              search_execute_type:'',
              search_relation_type:'',
              search_month:'',
              //type new_pwd
              // new_relation_name:'',
              // new_relation_type:'',
              // new_relation_code:'',
              //记录模型
              formSQL: {
                request_type:'',
                sql:'',
                uid:Cookies.get('id'),
              },
              formValidate: {
                request_type:'',
                purchase_id:'',
                local_relation_id:'',
                relation_id:'',
                user_id:'',
                amount:'',
                quantity:''
              },
               ruleValidate: {
                 request_type: [
                   {required: true, message: 'Please select the execute thread type!', trigger: 'change' }
                  ],
                  local_relation_id: [
                      {required: true, message: 'Please select the relation type!', trigger: 'blur' }
                  ],
                  purchase_id: [
                          {required: true, message: 'The purchaseplan_id cannot be empty', trigger: 'blur' }
                  ],
                  relation_id: [
                          {required: true, message: 'The relation_id cannot be empty', trigger: 'blur' }
                  ],
                  user_id: [
                          {required: true, message: 'The user_id cannot be empty', trigger: 'blur' }
                  ],
                  amount: [
                          {required: true, message: 'The amount cannot be empty', trigger: 'blur' }
                  ],
                  quantity: [
                          {required: true, message: 'The quantity cannot be empty', trigger: 'blur' }
                  ]

               }

          }
      },
      created () {
        this.doneRelationList();
        this.doneAccountList();
        this.doneTableList();
      },
      methods: {
          show (index) {
              this.$Modal.info({
                  title: '入参明细',
                  width:'1024px',
                  height:'500px',
                  content: `${this.tableData[index].biz_content}`
              })
          },
          show_offline (index) {
              this.$Modal.info({
                  title: '请求接口',
                  width:'450px',
                  content: `${this.tableData[index].execute_method}`
              })
          },
          show_offline2 (index) {
              this.$Modal.info({
                  title: '请求明细',
                    width:'800px',
                    height:'500px',
                  content: `${this.tableData[index].request_data}`
              })
          },
          show_offline3 (index) {
              this.$Modal.info({
                  title: '同步通知',
                  width:'80px',
                  height:'500px',
                  content: `${this.tableData[index].response_data}`
              })
          },
          remove (id) {
            if(this.role==0){
              this.$Modal.confirm({
                    title: '删除记录',
                    content: '<p>该操作为物理删除,确认删除吗？</p>',
                    onOk: () => {
                      this.$api.post('/purchase/del' , {id:id}, r => {
                        if(r.data.data===true){
                            this.$Message.success('删除成功！')
                            this.doneTableList()

                        }
                      })
                    },
                    onCancel: () => {
                        this.$Message.info('操作已取消');
                    }
                });
           }else{
             this.$Message.error('暂无权限，请联系管理员删除')
           }

          },
          update (row){
            this.$router.push('/record'+row.id);
          },
          changepage(index){
            var _start = ( index - 1 ) * this.rows;
            var _end = index * this.rows;
            this.tableData= this.resp.slice(_start,_end);
          },
          changesize(size){
            this.rows=size;
            if(this.resp.length<this.rows){
              this.tableData=this.resp
            }else{
              this.tableData=this.resp.slice(0,this.rows)
            }
         },
         exportData () {
            this.$refs.table.exportCsv({
                    filename: 'original_data',
                    columns: this.columns.filter((col, index) => index < 22),
                    data: this.tableData.filter((data, index) => index< 22)
                });
         },
        remoteTypeChoose (){
          if(this.remote_type =="录入"){
            this.modal2=true;
          }else{
            this.modal3=true;
          }

        },
        cancel () {
              this.$Message.info('操作已取消')
        },
        reset (name) {
          this.$refs[name].resetFields();
        },
        formCancel () {
           this.modal2=false;
           this.$Message.info('任务已取消')
        },
        purchaseAdd (name){
          this.$refs[name].validate((valid) => {
                 if (valid) {
                    let forms=this.formValidate;
                    //console.log(forms);
                    this.$api.post('/purchase/add', {operator_id:this.uid,request_type:forms.request_type,local_relation_id:forms.local_relation_id,user_id:forms.user_id,relation_id:forms.relation_id,purchase_id:forms.purchase_id,amount:forms.amount,quantity:forms.quantity}, r => {
                        let resp=r.data.data;
                        if(resp.status==200){
                            this.modal2=false
                            this.$Message.info('执行成功')
                            this.$Notice.success({
                              title: '执行成功!',
                              desc: resp.response,
                              duration: 3
                             });
                            this.doneTableList();
                            this.$refs[name].resetFields();

                        }else if(resp.status==201){
                            this.modal2=false
                            this.$Message.info('鉴权通过，构造请求中，待执行...')
                            this.$Notice.warning({
                              title: resp.request,
                              desc: resp.response,
                              duration: 3
                              });
                            this.doneTableList()
                        }else if(resp.status==500){
                           this.modal2=false
                           this.$Message.info('鉴权通过，请求中...')
                           this.$Notice.error({
                             title: 'tip',
                             desc: resp.response,
                             duration: 3
                             });
                        }else{
                          this.modal2=false
                          this.$Message.info('鉴权中，待校验...')
                          this.$Notice.info({
                            title: 'tip',
                            desc: resp.response,
                            duration: 3
                            });
                        }

                    })

               } else {
                   this.$Message.error('表单验证失败,请检查参数必填项!');
               }
           })
        },
        purchaseAddBySQL (){
          if(this.formSQL.sql == null || this.formSQL.sql == "" || this.formSQL.request_type == null || this.formSQL.request_type == ""){
              this.$Message.warning('执行方式或sql不能为空！！！')
          }else{
            if(RegExp(/purchaseplan_relation/).test(this.formSQL.sql)&&RegExp(/values/).test(this.formSQL.sql)){
                  this.$api.post('/purchase/sql',this.formSQL, r => {
                      let resp=r.data.data;
                      if(resp.status==200){
                          this.modal3=false
                          this.$Message.info('执行成功')
                          this.$Notice.success({
                            title: '执行成功!',
                            desc: resp.response,
                            duration: 3
                           });
                          this.doneTableList();
                          this.formSQL.sql='';
                      }else if(resp.status==201){
                          this.modal3=false
                          this.$Message.info('鉴权通过，构造请求中，待执行...')
                          this.$Notice.warning({
                            title: resp.request,
                            desc: resp.response,
                            duration: 3
                            });
                          this.doneTableList()
                      }else if(resp.status==500){
                         this.modal3=false
                         this.$Message.info('鉴权通过，请求中...')
                         this.$Notice.error({
                           title: 'tip',
                           desc: resp.response,
                           duration: 3
                           });
                      }else{
                        this.modal3=false
                        this.$Message.info('鉴权中，待校验...')
                        this.$Notice.info({
                          title: 'tip',
                          desc: resp.response,
                          duration: 3
                          });
                      }
                  })
                }else{
                  this.$Message.warning('请键入标准的relation表insert sql')
                }
            }
        },
        doneRelationList () {
          this.$api.get('/relation/findAll' , null, r => {
            this.relationList = r.data.data
          })
        },
        doneAccountList () {
          this.$api.get('/account/findAll' , null, r => {
                  this.accountList = r.data.data
                })
        },
        search (){
          this.$api.get('/purchase/query' , {owner_id:this.search_owner_id,execute_type:this.search_execute_type,relation_type:this.search_relation_type}, r => {
               this.resp=r.data.data
               this.total=r.data.data.length
               if(r.data.data.length<this.rows){
                 this.tableData=this.resp
               }else{
                 this.tableData=this.resp.slice(0,this.rows)
               }
          })
        },
        doneTableList (){
          this.$api.get('/purchase/findAll', null, r => {
            this.resp=r.data.data
            this.total=r.data.data.length
            if(r.data.data.length<this.rows){
              this.tableData=this.resp
            }else{
              this.tableData=this.resp.slice(0,this.rows)
            }
          })
        },
      }
  }
</script>
<style>
.ivu-table td.demo-table-info-column{
     background-color: #2db7f5;
     color: #fff;
 }
.ivu-table td.demo-table-error-column{
background-color: #ff6600;
color: #fff;
}
.ivu-table td.demo-table-success-column{
  background-color: #19be6b;
  color: #fff;
}
.purchase {
width: 100%;
height: 865px;
}
</style>
