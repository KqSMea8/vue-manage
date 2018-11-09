<template>
<div class="relation">
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
     <Button type="info" size="small"  @click="modal4 = true" style="margin-left: 5px"><Icon type="ios-star"></Icon>新增类型</Button>
     <Modal v-model="modal4"  @on-ok="typeAdd" @on-cancel="cancel" style="width:400px">
       <p slot="header" style="color:#1c2438;text-align:center">
                 <Icon type="ios-book-outline"></Icon>
                   <span>新增★采购计划★关联类型</span>
       </p>
       <div style="margin-left: 100px">
       类型名称：<Input v-model="new_relation_name" placeholder="例如：订单" clearable style="width: 200px"></Input><br><br>
       类型码值：<Input v-model="new_relation_code" placeholder="例如：ORDER" clearable style="width: 200px"></Input><br><br>
       类型数值：<Input v-model="new_relation_type" placeholder="例如：2" clearable style="width: 200px"></Input><br><br>
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
                       title: '类型ID',
                       minWidth:150,
                       maxWidth:250,
                       tooltip:true,
                       key: 'id',

                   },
                   {
                       title: '类型名称',
                       minWidth:160,
                       maxWidth:220,
                       key: 'relation_name',

                   },
                   {
                       title: '类型码值',
                       minWidth:150,
                       maxWidth:200,
                       tooltip:true,
                       key: 'relation_code',
                   },
                   {
                       title: '类型量值',
                       minWidth:90,
                       maxWidth:150,
                       sortable: true,
                       key: 'relation',
                   },
                   {
                       title: '创建时间',
                       minWidth:155,
                       maxWidth:200,
                       sortable: true,
                       key: 'gmt_create',
                   },

                   {
                       title: '更新时间',
                       minWidth:155,
                       maxWidth:200,
                       sortable: true,
                       key: 'gmt_modify',
                   },

                   {
                       title: '操作',
                       key: 'action',
                       minWidth:120,
                       maxWidth:300,
                       align: 'center',
                       render: (h, params) => {
                           return h('div', [
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
                               }, '废弃')
                           ]);
                       }
                   }
               ],
               //菜单栏
               modal:false,
               modal4:false,
               showBorder: true,
               showStripe: true,
               fixedHeader: false,
               tableSize: 'default',
               uid:Cookies.get('id'),
               role:Cookies.get('role'),
               pwd:Cookies.get('pwd'),
               rows:10,
               total:0,

               //type new_pwd
               new_relation_name:'',
               new_relation_type:'',
               new_relation_code:'',

               tableData: [],
               resp:[],

           }
       },
       created () {
         this.doneTableList();
       },
       methods: {
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
                                if(this.role==='1'){
                                  if(val===this.pwd){
                                    this.$api.post('/relation/del' , {id:id}, r => {
                                      if(r.data.data===true){
                                          this.$Message.success('校验通过,已删除！')
                                          this.$Modal.remove()
                                          this.doneTableList()

                                      }
                                    })
                                  }else{
                                     this.$Message.warning('o(╥﹏╥)o密码不正确，请继续输入!')
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

         cancel () {
               this.$Message.info('操作已取消')
         },
         typeAdd (){
           if(this.new_relation_type===''||this.new_relation_code===''){
             this.$Message.warning('类型码值或数值不能为空！')
           }else{
               this.$api.post('/relation/add', {relation_name:this.new_relation_name,relation:this.new_relation_type,relation_code:this.new_relation_code}, r => {
                   if(r.data.data===true){
                       this.$Message.info('新增成功')
                        this.doneTableList()
                       this.new_relation_name=''
                       this.new_relation_code=''
                       this.new_relation_type=''

                   }else{
                       this.$Message.error('failure')
                   }

               })
           }
         },
         doneTableList (){
           this.$api.get('/relation/findAll', null, r => {
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
</template>
<style scoped>
.relation{
  width: 100%;
  height: 865px;
}
</style>
