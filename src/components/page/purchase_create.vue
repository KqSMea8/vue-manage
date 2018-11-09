<template>
  <div class="purchase_create">
    <Tabs>
         <TabPane :label="creates">
           <div>
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
            <Button type="success" size="small"  @click="create" style="margin-left: 10px;">申请-采购计划</Button>

           <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_create" :columns="columns" ref="table"></Table>
            <div style="margin: 10px;overflow: hidden">
               <div style="float: right;">
                   <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage" :show-elevator="true" :total="total" @on-page-size-change="changesize"></Page>
               </div>
           </div>
           </div>
           </div>
         </TabPane>
         <TabPane :label="executes">
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
           <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_execute" :columns="execolumns" ref="table"></Table>
            <div style="margin: 10px;overflow: hidden">
               <div style="float: right;">
                   <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage_exe" :show-elevator="true" :total="total_exe" @on-page-size-change="changesize_exe"></Page>
               </div>
           </div>
           </div>
         </TabPane>
         <TabPane :label="full">
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
           <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_all" :columns="allcolumns" ref="table"></Table>
            <div style="margin: 10px;overflow: hidden">
               <div style="float: right;">
                   <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage_all" :show-elevator="true" :total="total_all" @on-page-size-change="changesize_all"></Page>
               </div>
           </div>
           </div>
         </TabPane>
       <TabPane label="采购目录集预览">
       <div style="height:auto;display:inline;">
       <Dropdown>
         <a href="javascript:void(0)">
             采购目录子集-预览
             <Icon type="ios-arrow-down"></Icon>
         </a>
         <DropdownMenu slot="list">
             <Dropdown trigger="click" placement="right-start" v-for="gp1 in gp1" :key="gp1.id">
                 <DropdownItem >
                   [{{gp1.code }}] {{gp1.name }}
                     <Icon type="ios-arrow-forward"></Icon>
                 </DropdownItem>
                 <DropdownMenu slot="list" v-if="gp1.node==gp2.partner" v-for="gp2 in gp2" :key="gp2.id">
                     <Dropdown trigger="click"  placement="right-start">
                       <DropdownItem>
                         [{{gp2.code}}] {{gp2.name }}
                           <Icon type="ios-arrow-forward"></Icon>
                       </DropdownItem>
                       <!-- 3 start-->
                       <DropdownMenu slot="list" v-if="gp2.node==gp3.partner" v-for="gp3 in gp3" :key="gp3.id">
                          <Dropdown trigger="click"  placement="right-start">
                              <DropdownItem>
                                 [{{gp3.code}}] {{gp3.name }}
                                 <Icon type="ios-arrow-forward"></Icon>
                              </DropdownItem>
                              <!-- 4 start-->
                              <DropdownMenu slot="list" v-if="gp3.node==gp4.partner" v-for="gp4 in gp4" :key="gp4.id">
                                 <Dropdown trigger="click" placement="right-start">
                                     <DropdownItem>
                                        [{{gp4.code}}] {{gp4.name }}
                                        <Icon type="ios-arrow-forward"></Icon>
                                     </DropdownItem>
                                      <!-- 5 start-->
                                     <DropdownMenu slot="list" v-if="gp4.node==gp5.partner" v-for="gp5 in gp5" :key="gp5.id">
                                        <Dropdown trigger="click" placement="right-start">
                                            <DropdownItem>
                                               [{{gp5.code}}] {{gp5.name }}
                                               <Icon type="ios-arrow-forward"></Icon>
                                            </DropdownItem>
                                             <!-- 6 start-->
                                            <DropdownMenu slot="list" v-if="gp5.node==gp6.partner" v-for="gp6 in gp6" :key="gp6.id">
                                               <Dropdown trigger="click" placement="right-start">
                                                   <DropdownItem>
                                                      [{{gp6.code}}] {{gp6.name }}
                                                      <Icon type="ios-arrow-forward"></Icon>
                                                   </DropdownItem>
                                                   <DropdownMenu slot="list" v-if="gp6.node==gp7.partner" v-for="gp7 in gp7" :key="gp7.id">
                                                          <DropdownItem>
                                                             [{{gp7.code}}] {{gp7.name }}
                                                          </DropdownItem>
                                                   </DropdownMenu>
                                                    <!-- 7 end-->
                                               </Dropdown>
                                            </DropdownMenu>
                                              <!-- 6 end-->
                                        </Dropdown>
                                     </DropdownMenu>
                                       <!-- 5 end-->
                                 </Dropdown>
                              </DropdownMenu>
                               <!-- 4 end-->
                          </Dropdown>
                       </DropdownMenu>
                       <!--3 end  -->
                     </Dropdown>
                 </DropdownMenu>

             </Dropdown>
         </DropdownMenu>
        </Dropdown>
        </div>
      </TabPane>
     </Tabs>
   </div>
</template>
<script>
import Cookies from 'js-cookie'
 export default {
     data () {
         return {
           creates: (h) => {
                    return h('div', [
                        h('span', '采购计划申请列表'),
                        h('Badge', {
                            props: {
                                type:'normal',
                                count: this.total,

                            },
                        })
                    ])
                },
              executes: (h) => {
                         return h('div', [
                             h('span', '待执行列表'),
                             h('Badge', {
                                 props: {
                                     type:'success',
                                     count: this.total_exe,

                                 },
                             })
                         ])
                     },
             full: (h) => {
                                return h('div', [
                                    h('span', '全部列表'),
                                    h('Badge', {
                                        props: {
                                            type:'info',
                                            count: this.total_all,

                                        },
                                    })
                                ])
                            },
           columns: [
                 {
                     title: '单位名称',
                     minWidth:120,
                     maxWidth:180,
                     tooltip:true,
                     key: 'organName',
                 },
                 {
                     title: '采购文号',
                     minWidth:160,
                     maxWidth:180,
                     key: 'purchaseplanDOCNO',
                 },
                 {
                     title: '年度',
                     minWidth:90,
                     maxWidth:120,
                     key: 'applyYear',
                     sortable: true,
                 },
                 {
                     title: '项目名称',
                     minWidth:120,
                     maxWidth:160,
                     tooltip:true,
                     key: 'projectName',
                 },
                 {
                     title: '采购类型',
                     minWidth:120,
                     maxWidth:180,
                     tooltip:true,
                     sortable: true,
                     key: 'procurementTypeName',
                 },
                 {
                     title: '采购方式',
                     minWidth:120,
                     maxWidth:180,
                     tooltip:true,
                     sortable: true,
                     key: 'procurementMethodName',
                 },
                 {
                     title: '金额',
                     minWidth:90,
                     maxWidth:120,
                     tooltip:true,
                     sortable: true,
                     key: 'unitPrice',
                 },
                 {
                     title: '创建时间',
                     minWidth:150,
                     maxWidth:180,
                     tooltip:true,
                     sortable: true,
                     key: 'gmt_create',
                 },
                 {
                     title: '创建者',
                     minWidth:90,
                     maxWidth:120,
                     key:'operator_name',
                 },
                 {
                     title: '状态',
                     minWidth:120,
                     maxWidth:120,
                     key:'audit_status',
                     render: (h, params) => {
                            const row = params.row;
                            const color = row.audit === 0 ? 'purple' : row.audit === 10 ? 'primary' : row.audit === 20 ? 'success' : row.audit === 30 ? 'warning' : 'error';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, row.audit_status);
                        }
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
                                   marginRight: '3px'
                               },
                               on: {
                                   click: () => {
                                       this.submit(params.row)
                                   }
                               }
                           }, '提交'),
                           h('Button', {
                               props: {
                                   type: 'info',
                                   size: 'small',

                               },
                               style: {
                                   marginRight: '3px'
                               },
                               on: {
                                   click: () => {
                                       this.edit_create(params.row)
                                   }
                               }
                           }, '查看'),
                             h('Button', {
                                 props: {
                                     type: 'error',
                                     size: 'small'
                                 },
                                 on: {
                                     click: () => {
                                         this.remove_create(params.row)
                                     }
                                 }
                             }, '作废')
                         ]);
                     }
                 }
             ],
             execolumns: [
                   {
                       title: '单位名称',
                       minWidth:120,
                       maxWidth:180,
                       tooltip:true,
                       key: 'organName',
                   },
                   {
                       title: '采购文号',
                       minWidth:160,
                       maxWidth:180,
                       key: 'purchaseplanDOCNO',
                   },
                   {
                       title: '年度',
                       minWidth:90,
                       maxWidth:120,
                       key: 'applyYear',
                       sortable: true,
                   },
                   {
                       title: '项目名称',
                       minWidth:120,
                       maxWidth:160,
                       tooltip:true,
                       key: 'projectName',
                   },
                   {
                       title: '采购类型',
                       minWidth:120,
                       maxWidth:180,
                       tooltip:true,
                       sortable: true,
                       key: 'procurementTypeName',
                   },
                   {
                       title: '采购方式',
                       minWidth:120,
                       maxWidth:180,
                       tooltip:true,
                       sortable: true,
                       key: 'procurementMethodName',
                   },
                   {
                       title: '金额',
                       minWidth:90,
                       maxWidth:120,
                       tooltip:true,
                       sortable: true,
                       key: 'unitPrice',
                   },
                   {
                       title: '更新时间',
                       minWidth:150,
                       maxWidth:180,
                       sortable: true,
                       key: 'gmt_modify',
                   },
                   {
                       title: '状态',
                       minWidth:90,
                       maxWidth:120,
                       key:'audit_status',
                   },
                   {
                       title: '执行状态',
                       minWidth:90,
                       maxWidth:120,
                       key:'execute_status',
                   },
                   {
                       title: '创建者',
                       minWidth:90,
                       maxWidth:120,
                       key:'operator_name',
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
                                     marginRight: '3px'
                                 },
                                 on: {
                                     click: () => {
                                         this.review(params.row.id)
                                     }
                                 }
                             }, '查看'),
                             h('Button', {
                                 props: {
                                     type: 'primary',
                                     size: 'small'

                                 },
                                 style: {
                                     marginRight: '3px'
                                 },
                                 on: {
                                     click: () => {
                                         this.execute(params.row)
                                     }
                                 }
                             }, '执行'),
                             h('Button', {
                                 props: {
                                     type: 'error',
                                     size: 'small'
                                 },
                                 style: {
                                     marginLeft: '15px'
                                 },
                                 on: {
                                     click: () => {
                                         this.remove_audit(params.row)
                                     }
                                 }
                             }, '撤销')

                           ]);
                       }
                   }
               ],
               allcolumns: [
                 {
                     title: '单位名称',
                     minWidth:120,
                     maxWidth:180,
                     tooltip:true,
                     key: 'organName',
                 },
                 {
                     title: '采购文号',
                     minWidth:160,
                     maxWidth:180,
                     key: 'purchaseplanDOCNO',
                 },
                 {
                     title: '年度',
                     minWidth:90,
                     maxWidth:120,
                     key: 'applyYear',
                     sortable: true,
                 },
                 {
                     title: '项目名称',
                     minWidth:120,
                     maxWidth:160,
                     tooltip:true,
                     key: 'projectName',
                 },
                 {
                     title: '采购类型',
                     minWidth:120,
                     maxWidth:180,
                     tooltip:true,
                     sortable: true,
                     key: 'procurementTypeName',
                 },
                 {
                     title: '采购方式',
                     minWidth:120,
                     maxWidth:180,
                     tooltip:true,
                     sortable: true,
                     key: 'procurementMethodName',
                 },
                 {
                     title: '金额',
                     minWidth:90,
                     maxWidth:120,
                     tooltip:true,
                     key: 'unitPrice',
                 },
                 {
                     title: '状态',
                     minWidth:120,
                     maxWidth:150,
                     sortable: true,
                     key: 'audit_status',
                     render: (h, params) => {
                            const row = params.row;
                            const color = row.audit === 0 ? 'purple' : row.audit === 10 ? 'primary' : row.audit === 20 ? 'success' : row.audit === 30 ? 'warning' : 'error';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, row.audit_status);
                        }
                 },
                 {
                     title: '执行状态',
                     minWidth:120,
                     maxWidth:150,
                     sortable: true,
                     key: 'execute_status',
                     render: (h, params) => {
                            const row = params.row;
                            const color = row.execute === 10 ? 'primary' : row.execute === 20 ? 'success' : row.execute === 30 ? 'error' : 'default';
                            let status = row.execute_status;
                            if(typeof status == "undefined" || status == null || status == ""){
                              status='待审'
                            }
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, status);
                        }
                 },
                 {
                     title: '更新时间',
                     minWidth:150,
                     maxWidth:180,
                     sortable: true,
                     key: 'gmt_modify',
                 },
                     {
                         title: '请求',
                          minWidth:90,
                         render: (h, params) => {
                           return h('div', [
                               h('Button', {
                                   props: {
                                       size: 'small',
                                       icon:'ios-pulse'
                                   },
                                   style: {
                                       marginLeft: '3px'
                                   },
                                   on: {
                                       click: () => {
                                           this.show_request(params.index)
                                       }
                                   }
                               }, ),

                             ])
                           }
                     },
                     {
                         title: '结果',
                         minWidth:90,
                         render: (h, params) => {
                           return h('div', [
                               h('Button', {
                                   props: {
                                       size: 'small',
                                       icon:'logo-designernews'
                                   },
                                   style: {
                                       marginLeft: '3px',

                                   },
                                   on: {
                                       click: () => {
                                           this.show_response(params.index)
                                       }
                                   }
                               }, ),

                             ])
                           }
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
                                       marginRight: '3px'
                                   },
                                   on: {
                                       click: () => {
                                           this.review(params.row.id)
                                       }
                                   }
                               }, '查看'),
                               h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '3px'
                                    },
                                    on: {
                                        click: () => {
                                            this.upgrade(params.row)
                                        }
                                    }
                                }, '收回'),
                                h('Button', {
                                     props: {
                                         type: 'error',
                                         size: 'small'
                                     },
                                     on: {
                                         click: () => {
                                             this.remove(params.row)
                                         }
                                     }
                                 }, '删除')
                             ]);
                         }
                     }
                 ],
             //菜单栏
             modal:false,
             modal3:false,
             showBorder: true,
             showStripe: true,
             fixedHeader: false,
             tableSize: 'default',
             uid:Cookies.get('id'),
             uname:Cookies.get('nick_name'),
             role:Cookies.get('role'),
             pwd:Cookies.get('pwd'),
             rows:10,
             total:0,
             total_exe:0,
             total_all:0,
             tableData_create: [],
             tableData_execute: [],
             tableData_all: [],
             create_resp:[],
             exe_resp:[],
             all_resp:[],

             gp1:[],
             gp2:[],
             gp3:[],
             gp4:[],
             gp5:[],
             gp6:[],
             gp7:[],
             gpgp:'',

         }
     },
     created () {
       this.doneCreateTableList();
       this.doneExeTableList();
       this.doneAllTableList();
       this.doneGpList();
     },
     methods: {
         remove (row) {
           if(this.role==0){
             this.$Modal.confirm({
                   title: '删除记录',
                   content: '<p>该操作为物理删除,确认删除吗？</p>',
                   onOk: () => {
                     this.$api.post('/plan/del' , {id:row.id}, r => {
                       if(r.data.data===true){
                           this.$Message.success('删除成功！')
                           this.doneCreateTableList();
                           this.doneExeTableList();
                           this.doneAllTableList();

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
         show_request (index) {
             this.$Modal.info({
                 title: '请求入参',
                 width:'80px',
                 height:'500px',
                 content: `${this.tableData_all[index].execute_req}`
             })
         },
         show_response (index) {
             this.$Modal.info({
                 title: '同步返回',
                 width:'80px',
                 height:'500px',
                 content: `${this.tableData_all[index].execute_resp}`
             })
         },
         changepage(index){
           var _start = ( index - 1 ) * this.rows;
           var _end = index * this.rows;
           this.tableData_create= this.create_resp.slice(_start,_end);
         },
         changesize(size){
           this.rows=size;
           if(this.create_resp.length<this.rows){
             this.tableData_create=this.create_resp
           }else{
             this.tableData_create=this.create_resp.slice(0,this.rows)
           }
        },
        changepage_exe(index){
          var _start = ( index - 1 ) * this.rows;
          var _end = index * this.rows;
          this.tableData_execute= this.exe_resp.slice(_start,_end);
        },
        changesize_exe(size){
          this.rows=size;
          if(this.exe_resp.length<this.rows){
            this.tableData_execute=this.exe_resp
          }else{
            this.tableData_execute=this.exe_resp.slice(0,this.rows)
          }
       },
       changepage_all(index){
         var _start = ( index - 1 ) * this.rows;
         var _end = index * this.rows;
         this.tableData_all= this.all_resp.slice(_start,_end);
       },
       changesize_all(size){
         this.rows=size;
         if(this.all_resp.length<this.rows){
           this.tableData_all=this.all_resp
         }else{
           this.tableData_all=this.all_resp.slice(0,this.rows)
         }
      },

       cancel () {
             this.$Message.info('操作已取消')
       },
       review (id){
           this.$router.push('/view'+id);
       },
       create () {
           this.$router.push('/create');
       },
       submit (row){
         if(this.uid==row.operator_id){
           if(row.audit==0||row.audit==20){
             this.$api.post('/plan/submit' , {id:row.id}, r => {
               if(r.data.data===true){
                 this.$Message.success('提交成功')
                  this.doneCreateTableList();
               }else{
                     this.$Message.error('系统繁忙,请稍后再试')
               }

             })
           }else if(row.audit==10){
              this.$Message.warning('该采购计划已在审核中，请勿重复提交')
           }else{
             this.$Message.warning('该采购计划申请已废弃，(づ｡◕ᴗᴗ◕｡)づ无法提交')
           }
         }else{
           this.$Message.error('无法提交其他角色创建的采购计划')
         }

       },
       edit_create (row) {
          this.$router.push('/view'+row.id);
          //this.$Message.error('暂不支持')
       },
       remove_create (row){
         if(this.uid==row.operator_id){
           if(row.audit==10){
             this.$Message.warning('审核中的采购计划申请,不支持废弃!')
           }else if(row.audit==1){
              this.$Message.info('该采购计划申请已被废弃啦,求放过o(╥﹏╥)o')
           }else{
             this.$api.post('/plan/cancel' , {id:row.id}, r => {
                 if(r.data.data===true){
                   this.$Message.success('废弃成功')
                    this.doneCreateTableList();
                 }else{
                       this.$Message.error('系统繁忙,请稍后再试')
                 }
              })
           }
         }else{
           this.$Message.error('无法废弃其他角色创建的采购计划')
         }
       },
       remove_audit (row){
         if(this.uid==row.operator_id){
           if(row.audit==20&&row.execute==10){
             this.$api.post('/plan/cancel' , {id:row.id}, r => {
                 if(r.data.data===true){
                   this.$Message.success('撤销成功')
                     this.doneExeTableList();
                     this.doneCreateTableList();
                 }else{
                       this.$Message.error('系统繁忙,请稍后再试')
                }
              })
            }
         }else{
           this.$Message.error('无法撤销其他角色创建的采购计划')
         }
       },
       upgrade (row){
            this.$Message.error('暂不支持')
       },
       execute (row) {
         if(this.uid==row.operator_id){
             this.$api.post('/plan/execute' , {id:row.id}, r => {
               if(r.data.data.status==200){
                 this.$Notice.success({
                   title: '执行成功',
                   render: h => {
                     return h('div', [
                         h('span','采购计划已导入政采云，采购计划id='+r.data.data.response),
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
                                   window.open("https://pay.zcy.gov.cn/customer-service/reporting/pplan/detail?id="+r.data.data.response);
                               }
                           }
                       }, '查看详情'),

                     ]);
                   },
                   duration: 15
                  });
                  this.doneExeTableList();
                  this.doneAllTableList();
               }else if(r.data.data.status==201){
                   this.$Notice.warning({
                     title: '执行失败',
                     desc: r.data.data.response,
                     duration: 30
                   });
               }else{
                 this.$Notice.error({
                   title: '系统繁忙',
                   desc: r.data.data.response,
                   duration: 30
                 });
               }

             })
         }else{
           this.$Message.error('该采购计划由'+row.operator_name+'创建,无法执行其他用户的采购计划')
         }
       },
       doneCreateTableList (){
         this.$api.get('/plan/query_create', null, r => {
           this.create_resp=r.data.data
           this.total=r.data.data.length
           if(r.data.data.length<this.rows){
             this.tableData_create=this.create_resp
           }else{
             this.tableData_create=this.create_resp.slice(0,this.rows)
           }
         })
       },
       doneExeTableList (){
         this.$api.get('/plan/query_execute', null, r => {
           this.exe_resp=r.data.data
           this.total_exe=r.data.data.length
           if(r.data.data.length<this.rows){
             this.tableData_execute=this.exe_resp
           }else{
             this.tableData_execute=this.exe_resp.slice(0,this.rows)
           }
         })
       },
       doneAllTableList (){
         this.$api.get('/plan/findAll', null, r => {
           this.all_resp=r.data.data
           this.total_all=r.data.data.length
           if(r.data.data.length<this.rows){
             this.tableData_all=this.all_resp
           }else{
             this.tableData_all=this.all_resp.slice(0,this.rows)
           }
         })
       },
       doneGpList (){
         this.$api.get('/gpcatlog/queryList?level=1', null, r => {
           this.gp1=r.data.data
         });
         this.$api.get('/gpcatlog/queryList?level=2', null, r => {
           this.gp2=r.data.data

         });
         this.$api.get('/gpcatlog/queryList?level=3', null, r => {
           this.gp3=r.data.data

         });
         this.$api.get('/gpcatlog/queryList?level=4', null, r => {
           this.gp4=r.data.data

         });
         this.$api.get('/gpcatlog/queryList?level=5', null, r => {
           this.gp5=r.data.data

         });
         this.$api.get('/gpcatlog/queryList?level=6', null, r => {
           this.gp6=r.data.data

         });
         this.$api.get('/gpcatlog/queryList?level=7', null, r => {
           this.gp7=r.data.data

         })
       },
     }
 }
</script>
<style>
.purchase_create {
width: 100%;
height: 865px;
}
</style>
