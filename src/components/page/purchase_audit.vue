<template>
  <div class="purchase_create">
    <Tabs>
         <TabPane :label="audits">
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
           <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_audit_init" :columns="columns" ref="table"></Table>
            <div style="margin: 10px;overflow: hidden">
               <div style="float: right;">
                   <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage" :show-elevator="true" :total="total" @on-page-size-change="changesize"></Page>
               </div>
           </div>
           </div>
         </TabPane>
         <TabPane :label="audit_over" >
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
           <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_audit" :columns="auditcolumns" ref="table"></Table>
            <div style="margin: 10px;overflow: hidden">
               <div style="float: right;">
                   <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage_audit" :show-elevator="true" :total="total_audit" @on-page-size-change="changesize_audit"></Page>
               </div>
           </div>
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
           audits: (h) => {
                    return h('div', [
                        h('span', '待审核列表'),
                        h('Badge', {
                            props: {
                                type:'warning',
                                count: this.total,

                            },
                        })
                    ])
                },
                audit_over: (h) => {
                         return h('div', [
                             h('span', '已审核列表'),
                             h('Badge', {
                                 props: {
                                     type:'info',
                                     count: this.total_audit,

                                 },
                             })
                         ])
                     },
           columns: [
                   {
                       title: '单位名称',
                       minWidth:120,
                       maxWidth:250,
                       tooltip:true,
                       key:'organName'
                   },
                   {
                     title: '采购文号',
                     minWidth:160,
                     maxWidth:200,
                     key: 'purchaseplanDOCNO',
                 },
                 {
                     title: '负责人',
                     minWidth:90,
                     maxWidth:120,
                     key: 'director',
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
                     maxWidth:160,
                     tooltip:true,
                     sortable: true,
                     key: 'procurementTypeName',
                 },
                 {
                     title: '采购方式',
                     minWidth:120,
                     maxWidth:160,
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
                     title: '提交时间',
                     minWidth:150,
                     maxWidth:160,
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
                     title: '提交人',
                     minWidth:90,
                     maxWidth:120,
                     key:'operator_name',
                 },
                 {
                     title: '操作',
                     key: 'action',
                     minWidth:90,
                     maxWidth:180,
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
                                       this.audit(params.row.id)
                                   }
                               }
                           }, '审核')

                         ]);
                     }
                 }
             ],
             auditcolumns: [
                   {
                       title: '单位名称',
                       minWidth:120,
                       maxWidth:250,
                       tooltip:true,
                       key:'organName'
                   },
                   {
                       title: '采购文号',
                       minWidth:160,
                       maxWidth:200,
                       tooltip:true,
                       key: 'purchaseplanDOCNO',
                   },
                   {
                       title: '负责人',
                       minWidth:90,
                       maxWidth:120,
                       tooltip:true,
                       key: 'director',
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
                       maxWidth:160,
                       tooltip:true,
                       sortable: true,
                       key: 'procurementTypeName',
                   },
                   {
                       title: '采购方式',
                       minWidth:120,
                       maxWidth:160,
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
                       minWidth:155,
                       sortable: true,
                       key: 'gmt_modify',
                   },
                   {
                       title: '提交人',
                       minWidth:90,
                       maxWidth:120,
                       key:'operator_name',
                   },
                   {
                       title: '状态',
                       minWidth:90,
                       key:'audit_status',
                   },
                   {
                       title: '执行状态',
                       minWidth:90,
                       key:'execute_status',
                   },

                   {
                       title: '操作',
                       key: 'action',
                       minWidth:90,
                       maxWidth:180,
                       align: 'center',
                       render: (h, params) => {
                           return h('div', [
                             h('Button', {
                                 props: {
                                     type: 'info',
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

                           ]);
                       }
                   }
               ],


             //菜单栏
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
             total_audit:0,
             tableData_audit_init: [],
             tableData_audit: [],
             audit_init_resp:[],
             audit_resp:[],


         }
     },
     created () {
       this.doneInitTableList();
       this.doneAuditTableList();
     },
     methods: {
         changepage(index){
           var _start = ( index - 1 ) * this.rows;
           var _end = index * this.rows;
           this.tableData_audit_init= this.audit_init_resp.slice(_start,_end);
         },
         changesize(size){
           this.rows=size;
           if(this.audit_init_resp.length<this.rows){
             this.tableData_audit_init=this.audit_init_resp
           }else{
             this.tableData_audit_init=this.audit_init_resp.slice(0,this.rows)
           }
        },
        changepage_audit(index){
          var _start = ( index - 1 ) * this.rows;
          var _end = index * this.rows;
          this.tableData_audit= this.audit_resp.slice(_start,_end);
        },
        changesize_audit(size){
          this.rows=size;
          if(this.audit_resp.length<this.rows){
            this.tableData_audit=this.audit_resp
          }else{
            this.tableData_audit=this.audit_resp.slice(0,this.rows)
          }
       },

       cancel () {
             this.$Message.info('操作已取消')
       },
       review (id) {
            this.$router.push('/view'+id);
       },
       audit (id) {
           if(this.role==2){
            this.$router.push('/audit'+id);
          }else{
             this.$Message.error('暂无权限进行该操作！')
          }
       },
       doneInitTableList (){
         this.$api.get('/plan/query_audit', null, r => {
           this.audit_init_resp=r.data.data
           this.total=r.data.data.length
           if(r.data.data.length<this.rows){
             this.tableData_audit_init=this.audit_init_resp
           }else{
             this.tableData_audit_init=this.audit_init_resp.slice(0,this.rows)
           }
         })
       },

       doneAuditTableList (){
         this.$api.get('/plan/query_audit_over', null, r => {
           this.audit_resp=r.data.data
           this.total_audit=r.data.data.length
           if(r.data.data.length<this.rows){
             this.tableData_audit=this.audit_resp
           }else{
             this.tableData_audit=this.audit_resp.slice(0,this.rows)
           }
         })
       },
     }
 }
</script>
<style>
.purchase_audit {
width: 100%;
height: 865px;
}
</style>
