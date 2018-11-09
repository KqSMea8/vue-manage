<template>
<div class="user">
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
     <Button type="info" size="small"  @click="modal3 = true" style="margin-right: 5px;float:right"><Icon type="ios-star"></Icon>新增角色</Button>
     <Modal v-model="modal3" title="新增角色 Tip:初始密码123456 管理员【data rwx】 其他【data rw】 " @on-ok="accountAdd" @on-cancel="cancel" style="width:500px">
       <div style="margin-left:90px">
       用户姓名：<Input v-model="nick_names" placeholder="Enter employee name here..." clearable style="width: 200px"></Input><br>
       用户组别：<RadioGroup v-model="userGroup">
          <Radio label="0">
            <Icon type="ios-body"></Icon>
              <span>项目采购</span>
          </Radio>
          <Radio label="1">
              <Icon type="ios-contact" />
              <span>网上超市</span>
          </Radio>
          <Radio label="2">
              <Icon type="md-contacts" />
              <span>定点服务</span>
          </Radio>
          <Radio label="3">
              <Icon type="md-person" />
              <span>协议供货</span>
          </Radio>
          </br>
          <Radio label="4">
            <Icon type="md-people" />
              <span>业务审核</span>
          </Radio>
          <Radio label="5">
              <Icon type="ios-people" />
              <span>客满服务</span>
          </Radio>
          <Radio label="6">
            <Icon type="ios-rose" />
              <span>其他类别</span>
          </Radio>
      </RadioGroup>
      <br><br>
        用户账号：<Input v-model="new_account" placeholder="for example rongcheng" clearable style="width: 200px"></Input><br><br>
        账号类别：<RadioGroup v-model="role">
           <Radio label="3">
             <Icon type="md-man" />
               <span>用户</span>
           </Radio>
           <Radio label="2">
            <Icon type="logo-octocat" />
               <span>审核</span>
           </Radio>
           <Radio label="1">
            <Icon type="md-ionitron"/>
               <span>运营</span>
           </Radio>
           <Radio label="0">
              <Icon type="md-ribbon" />
               <span>管理员</span>
           </Radio>
         </br>
       </RadioGroup>
       <br><br>

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
                      minWidth:90,
                      maxWidth:150,
                       render: (h, params) => {
                           return h('div', [
                               h('Icon', {
                                   props: {
                                       type: 'person'
                                   }
                               }),
                               h('strong', params.row.nick_name)
                           ]);
                       }
                   },
                   {
                       title: '账号',
                       minWidth:160,
                       maxWidth:200,
                       key: 'account',
                   },
                   {
                       title: '组别',
                       minWidth:150,
                       maxWidth:200,
                       sortable: true,
                       key: 'group',
                   },
                   {
                       title: '注册时间',
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
                       title: '权限',
                       minWidth:90,
                       maxWidth:150,
                       key:'role_name',
                   },
                   {
                       title: '状态',
                       minWidth:120,
                       maxWidth:150,
                       key:'status',
                       render: (h, params) => {
                              const row = params.row;
                              const color = row.status === 10 ? 'success' : row.status === 20 ? 'error' : 'primary';
                              return h('Tag', {
                                  props: {
                                      type: 'dot',
                                      color: color
                                  }
                              }, row.status_name);
                          }
                   },

                   {
                       title: '操作',
                       key: 'action',
                       minWidth:90,
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
               modal3:false,
               showBorder: true,
               showStripe: true,
               fixedHeader: false,
               tableSize: 'default',
               uid:Cookies.get('id'),
               role:Cookies.get('role'),
               pwd:Cookies.get('pwd'),
               rows:10,
               total:0,

               nick_names:'',
               userGroup:'0',
               role:'3',
               new_account:'',

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
                                if(this.role==='0'){
                                  if(val===this.pwd){
                                    this.$api.post('/account/del' , {id:id}, r => {
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
         accountAdd () {
             if(this.new_account===''||this.nick_names===''){
               this.$Message.warning('姓名或账号不能为空！')
             }else{
                 this.$api.post('/account/add', {account:this.new_account,nick_name:this.nick_names,role:this.role,group:this.userGroup}, r => {
                     if(r.data.data===true){
                         this.$Message.info('新增成功')
                         this.new_account=''
                         this.nick_names=''
                         this.role='1'
                         this.userGroup='0'
                         this.doneTableList()
                     }else{
                         this.$Message.error('failure')
                     }

                 })
             }
         },
         doneTableList (){
           this.$api.get('/account/findAll', null, r => {
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
<style scoped>
.user{
  width: 100%;
  height: 865px;
}
</style>
