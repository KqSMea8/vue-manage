<template>
  <div class="achievements">
      <div>
      <label>角色:</label>
      <Select v-model="search_user" size="small" clearable style="width:150px;margin-right: 15px">
            <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name}}</Option>
      </Select>
      <label>组别:</label>
      <Select v-model="search_group" size="small" clearable style="width:150px;margin-right: 15px">
            <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.label}}</Option>
      </Select>
      <label>日期间隔:</label>
      <DatePicker v-model="search_month" format="yyyy年MM月" size="small" type="month" placeholder="Select date" style="width:200px;"></DatePicker>
    <Button type="ghost" icon="ios-search" size="small" @click="search()" style="margin-left: 5px">搜索</Button>
    </div>
    <div style="margin:2px">

      列边框：<i-switch size="small" v-model="showBorder" style="margin-right: 5px"></i-switch>
      斑马纹：<i-switch size="small" v-model="showStripe" style="margin-right: 5px"></i-switch>
      滚动条：<i-switch size="small" v-model="fixedHeader" style="margin-right: 5px"></i-switch>
      表尺寸：
       <RadioGroup size="small" v-model="tableSize" type="button">
           <Radio label="large">large</Radio>
           <Radio label="default">medium</Radio>
           <Radio label="small">small</Radio>
       </RadioGroup>
       <Button type="ghost" icon="flag" size="small" @click="flag()"></Button>
       <Button type="primary"  size="small" @click="exportData()" style="float:right"><Icon type="archive"></Icon>数据导出</Button>
       <Button type="info" size="small"  @click="modal = true" style="margin-left: 5px"><Icon type="ios-star"></Icon>新增角色</Button>
       <Modal v-model="modal" title="新增角色" @on-ok="userAdd" @on-cancel="cancel" style="width:400px">
         员工姓名：<Input v-model="usernameAdd" placeholder="Enter something..." clearable style="width: 200px"></Input><br><br>
         员工组别：<RadioGroup v-model="userGroup">
            <Radio label="0">
              <Icon type="ios-body"></Icon>
                <span>新人组</span>
            </Radio>
            <Radio label="1">
              <Icon type="ios-person"></Icon>
                <span>支付一组</span>
            </Radio>
            <Radio label="2">
                <Icon type="android-contact"></Icon>
                <span>支付二组</span>
            </Radio>
          </br>
            <Radio label="3">
                 <Icon type="android-contacts"></Icon>
                <span>综合组</span>
            </Radio>
            <Radio label="4">
                <Icon type="person-stalker"></Icon>
                <span>ISV小组</span>
            </Radio>
            <Radio label="5">
                <Icon type="ios-people"></Icon>
                <span>大商户组</span>
            </Radio>
        </RadioGroup>
        <br><br>
        入职时间：<DatePicker type="datetime" v-model="userJoinDate" placeholder="Select date and time" style="width: 200px"></DatePicker>
       </Modal>
       <Button type="success" size="small"  @click="modal2 = true" style="float:right;margin-right: 5px"><Icon type="paintbrush"></Icon>新增记录</Button>
        <Modal v-model="modal2"style="width:500px">
          <p slot="header" style="color:#1c2438;text-align:center">
                    <Icon type="ios-book-outline"></Icon>
                      <span>新增质检信息</span>
          </p>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline>
             <FormItem label="员工姓名" prop="record_user_model">
                  <Select v-model="formValidate.record_user_model" size="small" filterable style="width:150px">
                    <Option v-for="item in userList" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <br>
              <FormItem label="应答总量" prop="reply_quantity">
                  <Input v-model="formValidate.reply_quantity" size="small" placeholder="reply_quantity" required="true" style="width:150px;"></Input>
              </FormItem>
              <FormItem label="评价总量" prop="evaluate_quantity">
                   <Input v-model="formValidate.evaluate_quantity" size="small" placeholder="evaluate_quantity" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="满意总量" prop="satisfy_quantity">
                  <Input v-model="formValidate.satisfy_quantity" size="small" placeholder="satisfy_quantity" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="不满意量" prop="unsatisfy_quantity">
                  <Input v-model="formValidate.unsatisfy_quantity" size="small" placeholder="unsatisfy_quantity" style="width: 150px;"></Input>
              </FormItem>
               <FormItem label="质检月度" prop="month">
                  <DatePicker v-model="formValidate.month" format="yyyy年MM月" size="small" type="month" placeholder="Select date" style="width:150px;"></DatePicker>
              </FormItem>
              <FormItem label="质检周次" prop="weeks">
                  <Select v-model="formValidate.weeks" size="small" filterable style="width:150px;">
                        <Option v-for="item in weeksList" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="本周质检分" prop="current_record">
                  <Input v-model="formValidate.current_record" size="small" placeholder="current_record_score" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="质检考核分/周" prop="record_score">
                  <Input v-model="formValidate.record_score" size="small" placeholder="score" style="width:150px"></Input>
              </FormItem>
              <FormItem label="本周平均在线时长/h" prop="online_time_avg">
                  <Input v-model="formValidate.online_time_avg" size="small" placeholder="online_time_avg" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="时长考核分/周" prop="online_time_ascore">
                  <Input v-model="formValidate.online_time_ascore" size="small" placeholder="online_time_ascore" style="width:150px"></Input>
              </FormItem>
              <FormItem label="本周调休备注">
                  <Input v-model="formValidate.online_leave_point" size="small" placeholder="enter here somthing" style="width: 390px"></Input>
              </FormItem>
              <FormItem label="本周平均处理时长/m" prop="handle_time_avg">
                  <Input v-model="formValidate.handle_time_avg" size="small" placeholder="handle_time_avg" style="width: 150px;"></Input>
              </FormItem>
              <FormItem label="时长考核分/周" prop="handle_time_ascore">
                  <Input v-model="formValidate.handle_time_ascore" size="small" placeholder="score" style="width: 150px"></Input>
              </FormItem>
              <FormItem label="异常离线/次" prop="unlawful_offline_num">
                  <Input v-model="formValidate.unlawful_offline_num" size="small" placeholder="unlawful_offline_num" style="width: 150px"></Input>
            </FormItem>
            <FormItem label="正常上线分/周" prop="online_num">
                  <Input v-model="formValidate.online_num" size="small" placeholder="score" style="width: 150px"></Input>
            </FormItem>
            <FormItem label="周次离线列表">
                <Input v-model="formValidate.unlawful_time_list" size="small" placeholder="input date" style="width: 390px"></Input>
            </FormItem>
            <FormItem label="质检录入时段">
                <DatePicker v-model="formValidate.record_time_slot" type="daterange" size="small" placement="bottom-end" placeholder="Please be sure select date" style="width: 390px"></DatePicker>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" size="large"  @click="formCancel()">取消</Button>
            <Button type="ghost"  @click="reset('formValidate')">重置</Button>
            <Button type="primary"  @click="recordAdd('formValidate')">新增</Button>
        </div>
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
                        key: 'user_info',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.user_info[0].name)
                            ]);
                        }
                    },
                    {
                        title: '组别',
                        width: 100,
                        key: 'user_info',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'android-contacts'
                                    }
                                }),
                                h('strong', params.row.user_info[0].group_name)
                            ]);
                        }

                    },

                    {
                        title: '应答量',
                        width: 90,
                        sortable: true,
                        key: 'reply_quantity',
                    },
                    {
                        title: '满意量',
                        width: 90,
                        sortable: true,
                        key: 'satisfy_quantity',
                    },
                    {
                        title: '不满意',
                        width: 90,
                        sortable: true,
                        key: 'unsatisfy_quantity',
                    },
                    {
                        title: '评价量',
                        width: 90,
                        sortable: true,
                        key: 'evaluate_quantity',
                    },
                    {
                        title: '相对满意率',
                        width: 120,
                        sortable: true,
                        key: 'relative_percent',
                    },
                    {
                        title: '第1周质检分',
                        width: 90,
                        sortable: true,
                        key: 'firstly',
                    },
                    {
                        title: '第2周',
                        width: 90,
                        sortable: true,
                        key: 'seconds',
                    },
                    {
                        title: '第3周',
                        width: 90,
                        sortable: true,
                        key: 'thirdly',
                    },
                    {
                        title: '第4周',
                        width: 90,
                        sortable: true,
                        key: 'fourthly',
                    },
                    {
                        title: '月均质检分',
                        width: 70,
                        sortable: true,
                        key: 'record_avg',
                        className: 'demo-table-info-column'
                    },
                    {
                        title: '分值',
                        width: 60,
                        sortable: true,
                        key: 'record_score',
                        className:'demo-table-success-column'
                    },
                    {
                        title: '月均在线时长',
                        width: 80,
                        sortable: true,
                        key: 'online_time_avg',
                    },
                    {
                        title: '分值',
                        width: 60,
                        sortable: true,
                        key:'online_time_ascore',
                        className:'demo-table-success-column'
                    },
                    {
                        title: '月均处理时长',
                        width: 80,
                        sortable: true,
                        key:'handle_time_avg',
                    },
                    {
                        title: '分值',
                        width: 60,
                        sortable: true,
                        key:'handle_time_ascore',
                        className:'demo-table-success-column'
                    },
                    {
                        title: '异常离线次数',
                        width: 80,
                        sortable: true,
                        key:'unlawful_offline_num',
                        render: (h, params) => {
                          return h('div', [
                              h('strong', params.row.unlawful_offline_num),
                              h('Button', {
                                  props: {
                                      size: 'small',
                                      icon:'android-textsms'
                                  },
                                  style: {
                                      marginLeft: '3px'
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
                        title: '正常上线分值',
                        width: 60,
                        sortable: true,
                        key:'online_num',
                        className:'demo-table-success-column'
                    },
                    {
                        title: '总分',
                        width: 60,
                        sortable: true,
                        key:'record_total_score',
                        className:'demo-table-error-column'
                    },
                    {
                        title: '月度',
                        width: 90,
                        sortable: true,
                        key: 'month',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
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
                                }, '明细'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.update(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
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
                showBorder: true,
                showStripe: false,
                fixedHeader: false,
                tableSize: 'default',
                user:Cookies.get('user'),
                rows:10,
                total:0,
                //新增用户字段
                usernameAdd:"",
                userGroup:0,
                userJoinDate:'',
                //用户列表、表格数据、分页数据
                userList:[],
                groupList:[
                  {
                       id: '0',
                       label: '新人组'
                   },
                   {
                       id: '1',
                       label: '支付一组'
                   },
                   {
                       id: '2',
                       label: '支付二组'
                   },
                   {
                       id: '3',
                       label: '综合组'
                   },
                   {
                       id: '4',
                       label: 'ISV小组'
                   },
                   {
                       id: '5',
                       label: '大商户组'
                   },
                ],
                weeksList:[
                  {
                    id: '第一周',
                    name: '第一周'
                   },
                  {
                    id: '第二周',
                    name: '第二周'
                  },
                  {
                    id: '第三周',
                    name: '第三周'
                  },
                  {
                    id: '第四周',
                    name: '第四周'
                  },
                ],
                tableData: [],
                resp:[],
                //菜单模型
                search_user: '',
                search_group:'',
                search_month:'',
                //记录模型
                formValidate: {
                  record_user_model:'',
                  reply_quantity:'',
                  satisfy_quantity:'',
                  evaluate_quantity:'',
                  unsatisfy_quantity:'',
                  month:'',
                  weeks:'',
                  current_record:'',
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
                    online_time_avg: [
                            { required: true, message: 'The online time cannot be empty', trigger: 'blur' }
                    ],
                    handle_time_avg: [
                            { required: true, message: 'The handle time cannot be empty', trigger: 'blur' }
                    ],
                    unlawful_offline_num: [
                            { required: true, message: 'The offline time cannot be empty', trigger: 'blur' }
                    ],
                 }

            }
        },
        created () {
          this.doneUserList();
          this.doneTableList();
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '质检明细',
                    content: `员工姓名：${this.tableData[index].user_info[0].name}<br>组别：${this.tableData[index].user_info[0].group_name}<br>入职时间：${this.tableData[index].user_info[0].join_date}<br>质检月度:${this.tableData[index].month}<br>应答总量:${this.tableData[index].reply_quantity}个 满意:${this.tableData[index].satisfy_quantity}个 不满意:${this.tableData[index].unsatisfy_quantity}个 评价:${this.tableData[index].evaluate_quantity}个<br>相对满意率:${this.tableData[index].relative_percent} 绝对满意率:${this.tableData[index].absolute_percent}<br>第1周质检:${this.tableData[index].firstly}分 第2周质检:${this.tableData[index].seconds}分 第3周质检:${this.tableData[index].thirdly}分 第4周质检:${this.tableData[index].fourthly}分<br>月度平均质检:${this.tableData[index].record_avg}分  月度质检考核:${this.tableData[index].record_score}分<br>月度平均在线时长:${this.tableData[index].online_time_avg}h 平均在线时长考核:${this.tableData[index].online_time_ascore}分 <br>月度平均处理时长:${this.tableData[index].handle_time_avg}m 平均处理时长考核:${this.tableData[index].handle_time_ascore}分<br>异常离线次数:${this.tableData[index].unlawful_offline_num}次<br>异常离线日期列表:${this.tableData[index].unlawful_time_list}<br>正常上线考核:${this.tableData[index].online_num}分<br>考核总分:${this.tableData[index].record_total_score}<br>应答量/每周:${this.tableData[index].reply_week}<br>满意量/每周:${this.tableData[index].satisfy_week}<br>不满意量/每周:${this.tableData[index].untisfy_week}<br>评价量/每周:${this.tableData[index].evaluate_week}<br>质检录入时间段:${this.tableData[index].record_time_slot}<br>操作记录:${this.tableData[index].remark}`
                })
            },
            show_offline (index) {
                this.$Modal.info({
                    title: '离线调休明细',
                    content: `#员工姓名#：${this.tableData[index].user_info[0].name}<br><br>#异常离线次数#：${this.tableData[index].unlawful_offline_num}<br><br>#异常离线明细#：${this.tableData[index].unlawful_time_list}<br><br>#调休明细#：${this.tableData[index].online_leave_point}<br>`
                })
            },
            flag (){
              this.$Modal.info({
                  title: '操作简要',
                  content: `#查询#：可根据员工姓名、组别、质检月份查询记录，默认全量查询、月度排序。<br><br>#删除员工#：根据[http://ip:8080/demo/user/findAll]获取相应data.id,请求[http://ip:8080/demo/user/del?id=data.id]进行角色删除。<br><br>#新增记录#：分周次录入，需鉴权（登录账号），每次录入本周相关数据即可，后台计算均值；如何录入某小二完整月度记录：每次新增选择同一员工、质检月度，不同质检周次即可，常规以四周计月度。<br><br>#明细#：查看小二当前月度明细、系统记录<br><br>#修改/删除#：修改-鉴权不校验数据，强制覆盖部分数据记录;删除-鉴权并校验密码`
              })
            },
            remove (id) {
              this.$Modal.confirm({
                   render: (h) => {
                       return h('Input', {
                           props: {
                               type:'password',
                               autofocus: true,
                               placeholder: '请输入管理员密码'
                           },
                           on: {
                               input: (val) => {
                                 if(this.user==='super'){
                                   if(val==='super123'){
                                     this.$api.post('/record/del' , {id:id}, r => {
                                       if(r.data.data===true){
                                           this.$Message.success('校验通过,删除成功！')
                                           this.doneTableList()
                                           this.$Modal.remove()

                                       }
                                     })
                                   }else{
                                      this.$Message.warning('校验中..密码不正确..请继续输入!')
                                   }
                                 }else{
                                     this.$Message.warning('暂无权限进行该操作！')
                                 }
                               }
                           }
                       })
                   }
               })

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
          userAdd () {
            if(this.user==='super'){
                let name=this.usernameAdd;
                let group=this.userGroup;
                let join_date=this.formatDate(this.userJoinDate);
                if(name===''||join_date===''){
                  this.$Message.info('角色姓名或入职时间不能为空！')
                }else{
                    this.$api.post('/user/add', {name:name,group:group,join_date:join_date}, r => {
                        if(r.data.data===true){
                            this.$Message.info('新增成功')
                            this.doneUserList()
                            this.usernameAdd=''
                            this.userGroup=0,
                            this.userJoinDate=''

                        }else{
                            this.$Message.info('failure')
                        }

                    })
                }
            }else{
                this.$Message.warning('暂无权限进行该操作')
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
          },
          recordAdd (name){
            this.$refs[name].validate((valid) => {
                   if (valid) {
                     if(this.user==='super'){
                         let form=this.formValidate;
                         let uid=form.record_user_model;
                         let month=form.month;
                         let weeks=form.weeks;
                         if(form.record_time_slot.length==0){
                           this.$Message.info('周次质检录入时段不能为空！')
                         }else{
                           var arr=new Array();
                           arr.push(this.formatDate(form.record_time_slot[0]));
                           arr.push("--")
                           arr.push(this.formatDate(form.record_time_slot[1]))
                           let record_time_slot=arr.join("");
                             this.$api.post('/record/add', {uid:uid,reply_quantity:form.reply_quantity,satisfy_quantity:form.satisfy_quantity,evaluate_quantity:form.evaluate_quantity,unsatisfy_quantity:form.unsatisfy_quantity,month:this.formatMonth(form.month),weeks:form.weeks,current_record:form.current_record,record_score:form.record_score,online_time_avg:form.online_time_avg,online_time_ascore:form.online_time_ascore,online_leave_point:form.online_leave_point,handle_time_avg:form.handle_time_avg,handle_time_ascore:form.handle_time_ascore,unlawful_offline_num:form.unlawful_offline_num,unlawful_time_list:form.unlawful_time_list,record_time_slot:record_time_slot,online_num:form.online_num}, r => {
                                 if(r.data.data===true){
                                     this.$Message.info('新增成功')
                                     this.doneTableList()
                                     this.month=''
                                     this.record_user_model=0
                                     this.weeks=''
                                     this.modal2=false
                                 }else{
                                     this.$Message.info('对方不想说话，并且向你抛出了一个异常')
                                 }

                             })
                         }
                     }else{
                         this.$Message.warning('暂无权限进行该操作')
                     }

                   } else {
                       this.$Message.error('员工姓名或质检月度等必填数据不能为空！');
                   }
               })

          },
          formatDate (date) {
             var y = date.getFullYear();
             var m = date.getMonth() + 1;
                 m = m < 10 ? ('0' + m) : m;
             var d = date.getDate();
                 d = d < 10 ? ('0' + d) : d;
             var h = date.getHours();
                 h = h< 10 ? ('0' + h) : h;
             var minute = date.getMinutes();
                 minute = minute < 10 ? ('0' + minute) : minute;
             var seconds=date.getSeconds();
                 seconds = seconds < 10 ? ('0'+seconds):seconds;
             return y + '-' + m + '-' + d+' '+h+':'+minute+':'+seconds;
          },
          formatMonth (date) {
             var y = date.getFullYear();
             var m = date.getMonth() + 1;
                 m = m < 10 ? ('0' + m) : m;
             return y + '-' + m ;
          },
          doneUserList () {
            this.$api.get('/user/findAll' , null, r => {
              this.userList = r.data.data
            })
          },
          search (){
            let months;
            if(this.search_month!=''){
              months=this.formatMonth(this.search_month);
            }else{
              months='';
            }
            this.$api.get('/record/find_by_condition' , {uid:this.search_user,month:months,group:this.search_group}, r => {
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
            this.$api.get('/record/findAll', null, r => {
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
.achievements {
  width: 100%;
  height: 865px;
}
</style>
