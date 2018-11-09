<template>
  <div class="purchase_create">
    <Tabs>
      <TabPane label="采购单位-配置" >
        <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData" :columns="columns" ref="table"></Table>
         <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage" :show-elevator="true" :total="total" @on-page-size-change="changesize"></Page>
            </div>
        </div>
        <Modal v-model="modal1"  @on-ok="institutionAdd" @on-cancel="cancel" style="width:400px">
          <p slot="header" style="color:#1c2438;text-align:center">
                    <Icon type="md-bonfire" />
                      <span>新增-采购单位</span>
          </p>
          <div style="margin-left: 100px">
          区划ID：<Input v-model="institutionForm.distid" placeholder="例如：339900" clearable style="width: 200px"></Input><br><br>
          机构ID：<Input v-model="institutionForm.orgid" placeholder="例如：123456" clearable style="width: 200px"></Input><br><br>
          单位名称：<Input v-model="institutionForm.name" placeholder="例如：浙江省邮政业安全中心" clearable style="width: 200px"></Input><br><br>
          单位简称：<Input v-model="institutionForm.short_name" placeholder="例如：省邮政业安全" clearable style="width: 200px"></Input><br><br>
          组织代码：<Input v-model="institutionForm.org_code" placeholder="例如：123456" clearable style="width: 200px"></Input><br><br>
          预算编码：<Input v-model="institutionForm.budget_code" placeholder="例如：123456" clearable style="width: 200px"></Input><br><br>
        </div>
        </Modal>
      </TabPane>
      <TabPane label="采购目录-配置" >
        <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_gpcatlog" :columns="columns_gpcatlog" ref="table"></Table>
         <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage_gpcatlog" :show-elevator="true" :total="total_gpcatlog" @on-page-size-change="changesize_gpcatlog"></Page>
            </div>
        </div>
        <Modal v-model="modal2"  @on-ok="gpcatlogAdd" @on-cancel="cancel" style="width:400px">
          <p slot="header" style="color:#1c2438;text-align:center">
                    <Icon type="md-bookmarks" />
                      <span>新增-采购目录</span>
          </p>
          <div style="margin-left: 100px">
          目录节点：<Input v-model="gpcatlogForm.node" placeholder="例如：396278399257837184" clearable style="width: 200px"></Input><br><br>
          父节点值：<Input v-model="gpcatlogForm.partner" placeholder="例如：396278399257837184" clearable style="width: 200px"></Input><br><br>
          目录名称：<Input v-model="gpcatlogForm.name" placeholder="例如：普教仪器设备" clearable style="width: 200px"></Input><br><br>
          目录码值：<Input v-model="gpcatlogForm.code" placeholder="例如：A03341201" clearable style="width: 200px"></Input><br><br>
          目录级别：<Select v-model="gpcatlogForm.level"  clearable style="width: 200px">
                      <Option value="1">一级</Option>
                      <Option value="2">二级</Option>
                      <Option value="3">三级</Option>
                      <Option value="4">四级</Option>
                      <Option value="5">五级</Option>
                  </Select><br><br>
        </div>
        </Modal>
      </TabPane>
      <TabPane label="采购科目-配置" >
        <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_subject" :columns="columns_subject" ref="table"></Table>
         <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage_subject" :show-elevator="true" :total="total_subject" @on-page-size-change="changesize_subject"></Page>
            </div>
        </div>
        <Modal v-model="modal3"  @on-ok="subjectAdd" @on-cancel="cancel" style="width:400px">
          <p slot="header" style="color:#1c2438;text-align:center">
                    <Icon type="md-compass" />
                      <span>新增-采购科目</span>
          </p>
          <div style="margin-left: 100px">
          科目名称：<Input v-model="subjectForm.name" placeholder="例如：一般津贴" clearable style="width: 200px"></Input><br><br>
          科目码值：<Input v-model="subjectForm.code" placeholder="例如：30101" clearable style="width: 200px"></Input><br><br>
          上级码值：<Input v-model="subjectForm.partner" placeholder="例如：301" clearable style="width: 200px"></Input><br><br>
          科目类型：<Select v-model="subjectForm.type"  clearable style="width: 200px">
                      <Option value="1">预算科目</Option>
                        <Option value="2">经济科目</Option>
                  </Select><br><br>
        </div>
        </Modal>
      </TabPane>

      <TabPane label="类型方式-配置" >
        <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData_type" :columns="columns_type" ref="table"></Table>
         <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage_type" :show-elevator="true" :total="total_type" @on-page-size-change="changesize_type"></Page>
            </div>
        </div>
        <Modal v-model="modal4"  @on-ok="typeAdd" @on-cancel="cancel" style="width:400px">
          <p slot="header" style="color:#1c2438;text-align:center">
                    <Icon type="md-key" />
                      <span>新增-类型方式</span>
          </p>
          <div style="margin-left: 100px">
          类型名称：<Input v-model="typeForm.name" placeholder="例如：网上超市采购" clearable style="width: 200px"></Input><br><br>
          类型码值：<Input v-model="typeForm.code" placeholder="例如：94" clearable style="width: 200px"></Input><br><br>
          类型年度：<Input v-model="typeForm.year" placeholder="例如：2018" clearable style="width: 200px"></Input><br><br>
          业务类型：<Select v-model="typeForm.type" clearable style="width: 200px">
                      <Option value="1">采购类型</Option>
                        <Option value="2">采购方式</Option>
                          <Option value="3">资金类型</Option>
                            <Option value="4">付款方式</Option>
                  </Select><br><br>
        </div>
        </Modal>
      </TabPane>
      <TabPane label="附件存储-管理" >

      </TabPane>
     </Tabs>
   </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    data () {
        return {

          columns: [
                {
                    title: '采购单位名称',
                    minWidth:120,
                    maxWidth:200,
                    tooltip:true,
                    key: 'name',

                },
                {
                    title: '机构ID',
                    minWidth:120,
                    maxWidth:150,
                    key: 'orgid',
                },
                {
                    title: '所属区划',
                    minWidth:90,
                    maxWidth:120,
                    key: 'distid',
                },
                {
                    title: '组织代码',
                    minWidth:120,
                    maxWidth:200,
                    tooltip:true,
                    key: 'org_code',
                },

                {
                    title: '预算编码',
                    minWidth:120,
                    maxWidth:150,
                    key: 'budget_code',
                },
                {
                    title: '创建时间',
                    minWidth:150,
                    maxWidth:180,
                    key:'gmt_create',
                },
                {
                    title: '更新时间',
                    minWidth:150,
                    maxWidth:180,
                    key:'gmt_modify',
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
                    maxWidth:210,
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
                                          this.add_institution()
                                      }
                                  }
                              }, '新增'),
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
                                          this.update(params.row.id)
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
                                        this.remove_institution(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            columns_gpcatlog: [
                  {
                      title: 'ID',
                      minWidth:120,
                      maxWidth:250,
                      tooltip:true,
                      key: 'id',

                  },
                  {
                      title: '节点',
                      minWidth:160,
                      maxWidth:200,
                      tooltip:true,
                      key: 'node',
                  },
                  {
                      title: '父节点',
                      minWidth:160,
                      maxWidth:200,
                      tooltip:true,
                      sortable: true,
                      key: 'partner',
                  },
                  {
                      title: '目录名称',
                      minWidth:120,
                      maxWidth:200,
                      tooltip:true,
                      key: 'name',
                  },

                  {
                      title: '码值',
                      minWidth:90,
                      maxWidth:150,
                      tooltip:true,
                      sortable: true,
                      key: 'code',

                  },
                  {
                      title: '级别',
                      minWidth:90,
                      maxWidth:120,
                      sortable: true,
                      key:'level',
                  },
                  {
                      title: '状态',
                      minWidth:120,
                      maxWidth:120,
                      key:'flag_name',
                      render: (h, params) => {
                             const row = params.row;
                             const color = row.flag === 0 ? 'primary' : row.flag === 1 ? 'error' : 'success';
                             return h('Tag', {
                                 props: {
                                     type: 'dot',
                                     color: color
                                 }
                             }, row.flag_name);
                         }
                  },
                  {
                      title: '创建时间',
                      minWidth:150,
                      maxWidth:155,
                      sortable: true,
                      key:'gmt_create',
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
                                            this.add_gpcatlog()
                                        }
                                    }
                                }, '新增'),
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
                                            this.update(params.row.id)
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
                                          this.remove_gpcatlog(params.row.id)
                                      }
                                  }
                              }, '删除')
                          ]);
                      }
                  }
              ],
              columns_subject: [
                    {
                        title: 'ID',
                        minWidth:120,
                        maxWidth:250,
                        tooltip:true,
                        key: 'id',

                    },
                    {
                        title: '父节点',
                        minWidth:120,
                        maxWidth:150,
                        tooltip:true,
                        sortable: true,
                        key: 'partner',
                    },
                    {
                        title: '科目名称',
                        minWidth:150,
                        maxWidth:250,
                        tooltip:true,
                        key: 'name',
                    },

                    {
                        title: '科目码值',
                        minWidth:120,
                        maxWidth:150,
                        tooltip:true,
                        sortable: true,
                        key: 'code',
                    },
                    {
                        title: '科目类型',
                        minWidth:90,
                        maxWidth:150,
                        key:'type_name',
                    },
                    {
                        title: '状态',
                        minWidth:120,
                        maxWidth:120,
                        key:'flag_name',
                        render: (h, params) => {
                               const row = params.row;
                               const color = row.flag === 0 ? 'primary' : row.flag === 1 ? 'error' : 'success';
                               return h('Tag', {
                                   props: {
                                       type: 'dot',
                                       color: color
                                   }
                               }, row.flag_name);
                           }
                    },
                    {
                        title: '创建时间',
                        minWidth:150,
                        maxWidth:150,
                        sortable: true,
                        key:'gmt_create',
                    },
                    {
                        title: '更新时间',
                        minWidth:150,
                        maxWidth:150,
                        sortable: true,
                        key:'gmt_modify',
                    },
                    {
                        title: '创建者',
                        minWidth:90,
                        maxWidth:150,
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
                                              this.add_subject()
                                          }
                                      }
                                  }, '新增'),
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
                                              this.update(params.row.id)
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
                                            this.remove_subject(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                columns_type: [
                      {
                          title: 'ID',
                          minWidth:150,
                          maxWidth:250,
                          tooltip:true,
                          key: 'id',

                      },
                      {
                          title: '年度',
                          minWidth:90,
                          maxWidth:120,
                          sortable: true,
                          key: 'year',
                      },
                      {
                          title: '名称',
                          minWidth:150,
                          maxWidth:250,
                          tooltip:true,
                          key: 'name',
                      },

                      {
                          title: '码值',
                          minWidth:90,
                          maxWidth:120,
                          sortable: true,
                          key: 'code',
                      },
                      {
                          title: '类别',
                          minWidth:90,
                          maxWidth:120,
                          key:'type_name',
                      },
                      {
                          title: '创建时间',
                          minWidth:150,
                          maxWidth:200,
                          sortable: true,
                          key:'gmt_create',
                      },
                      {
                          title: '更新时间',
                          minWidth:150,
                          maxWidth:200,
                          sortable: true,
                          key:'gmt_modify',
                      },
                      {
                          title: '状态',
                          minWidth:120,
                          maxWidth:150,
                          sortable: true,
                          key:'status_name',
                          render: (h, params) => {
                                 const row = params.row;
                                 const color = row.status === 0 ? 'primary' : row.status === 1 ? 'error' : 'success';
                                 return h('Tag', {
                                     props: {
                                         type: 'dot',
                                         color: color
                                     }
                                 }, row.status_name);
                             }
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
                                                this.add_type()
                                            }
                                        }
                                    }, '新增'),
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
                                                this.update(params.row.id)
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
                                              this.remove_type(params.row.id)
                                          }
                                      }
                                  }, '删除')
                              ]);
                          }
                      }
                  ],
            role:Cookies.get('role'),
            modal1:false,
            modal2:false,
            modal3:false,
            modal4:false,
            showBorder: true,
            showStripe: true,
            fixedHeader: false,
            tableSize: 'default',
            rows:10,
            total:0,
            total_gpcatlog:0,
            total_subject:0,
            total_type:0,
            tableData: [],
            tableData_gpcatlog: [],
            tableData_subject: [],
            tableData_type: [],
            resp:[],
            resp_gpcatlog:[],
            resp_subject:[],
            resp_type:[],

            institutionForm:{
            operator_id:Cookies.get('id'),
            operator_name:Cookies.get('nick_name'),
            orgid:'',
            distid:'',
            name:'',
            short_name:'',
            org_code:'',
            budget_code:'',
            },
            gpcatlogForm:{
            operator_id:Cookies.get('id'),
            operator_name:Cookies.get('nick_name'),
            node:'',
            partner:'',
            name:'',
            code:'',
            level:'',
            },
            subjectForm:{
            operator_id:Cookies.get('id'),
            operator_name:Cookies.get('nick_name'),
            code:'',
            partner:'',
            name:'',
            type:'',
            },
            typeForm:{
            operator_id:Cookies.get('id'),
            operator_name:Cookies.get('nick_name'),
            type:'',
            year:'',
            name:'',
            code:'',
            },
        }
    },
    created () {
      this.doneTableList();
    },
    methods: {
      remove_institution (id) {
        if(this.role==0){
          this.$Modal.confirm({
                title: '删除记录',
                content: '<p>该操作为物理删除,确认删除吗？</p>',
                onOk: () => {
                  this.$api.post('/institution/del' , {id:id}, r => {
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
       changepage_gpcatlog(index){
         var _start = ( index - 1 ) * this.rows;
         var _end = index * this.rows;
         this.tableData_gpcatlog= this.resp_gpcatlog.slice(_start,_end);
       },
       changesize_gpcatlog(size){
         this.rows=size;
         if(this.resp_gpcatlog.length<this.rows){
           this.tableData_gpcatlog=this.resp_gpcatlog
         }else{
           this.tableData_gpcatlog=this.resp_gpcatlog.slice(0,this.rows)
         }
      },
      changepage_subject(index){
        var _start = ( index - 1 ) * this.rows;
        var _end = index * this.rows;
        this.tableData_subject= this.resp_subject.slice(_start,_end);
      },
      changesize_subject(size){
        this.rows=size;
        if(this.resp_subject.length<this.rows){
          this.tableData_subject=this.resp_subject
        }else{
          this.tableData_subject=this.resp_subject.slice(0,this.rows)
        }
     },
     changepage_type(index){
       var _start = ( index - 1 ) * this.rows;
       var _end = index * this.rows;
       this.tableData_type= this.resp_type.slice(_start,_end);
     },
     changesize_type(size){
       this.rows=size;
       if(this.resp_type.length<this.rows){
         this.tableData_type=this.resp_type
       }else{
         this.tableData_type=this.resp_type.slice(0,this.rows)
       }
    },
      doneTableList (){
        this.$api.get('/institution/findAll', null, r => {
          this.resp=r.data.data
          this.total=r.data.data.length
          if(r.data.data.length<this.rows){
            this.tableData=this.resp
          }else{
            this.tableData=this.resp.slice(0,this.rows)
          }
        });
        this.$api.get('/gpcatlog/findAll', null, r => {
          this.resp_gpcatlog=r.data.data
          this.total_gpcatlog=r.data.data.length
          if(r.data.data.length<this.rows){
            this.tableData_gpcatlog=this.resp_gpcatlog
          }else{
            this.tableData_gpcatlog=this.resp_gpcatlog.slice(0,this.rows)
          }
        });
        this.$api.get('/subject/findAll', null, r => {
          this.resp_subject=r.data.data
          this.total_subject=r.data.data.length
          if(r.data.data.length<this.rows){
            this.tableData_subject=this.resp_subject
          }else{
            this.tableData_subject=this.resp_subject.slice(0,this.rows)
          }
        });
        this.$api.get('/purchase_type/findAll', null, r => {
          this.resp_type=r.data.data
          this.total_type=r.data.data.length
          if(r.data.data.length<this.rows){
            this.tableData_type=this.resp_type
          }else{
            this.tableData_type=this.resp_type.slice(0,this.rows)
          }
        })
      },
      remove_gpcatlog (id) {
        if(this.role==0){
          this.$Modal.confirm({
                title: '删除记录',
                content: '<p>该操作为物理删除,确认删除吗？</p>',
                onOk: () => {
                  this.$api.post('/gpcatlog/del' , {id:id}, r => {
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
      remove_subject (id) {
        if(this.role==0){
          this.$Modal.confirm({
                title: '删除记录',
                content: '<p>该操作为物理删除,确认删除吗？</p>',
                onOk: () => {
                  this.$api.post('/subject/del' , {id:id}, r => {
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
      remove_type (id) {
        if(this.role==0){
          this.$Modal.confirm({
                title: '删除记录',
                content: '<p>该操作为物理删除,确认删除吗？</p>',
                onOk: () => {
                  this.$api.post('/purchase_type/del' , {id:id}, r => {
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
      update (id){
        this.$Message.info('暂无权限')
      },
      add_institution () {
        this.modal1=true;
      },
      add_gpcatlog () {
        this.modal2=true;
      },
      add_subject () {
        this.modal3=true;
      },
      add_type () {
        this.modal4=true;
      },
      cancel (){
          this.$Message.info('操作已取消');
      },
      institutionAdd () {
        if(this.role==0||this.role==1){
          this.$api.post('/institution/add' , this.institutionForm, r => {
            if(r.data.data===true){
                this.$Message.success('新增成功！')
                this.doneTableList();
            }else{
                this.$Message.error('新增失败！')
            }
          })
       }else{
         this.$Message.warning('暂无权限，请联系管理员')
       }
     },
      gpcatlogAdd () {
         if(this.role==0||this.role==1){
           this.$api.post('/gpcatlog/add' , this.gpcatlogForm, r => {
             if(r.data.data===true){
                 this.$Message.success('新增成功！')
                 this.doneTableList();
             }else{
                 this.$Message.error('新增失败！')
             }
           })
        }else{
          this.$Message.warning('暂无权限，请联系管理员')
        }
      },
      subjectAdd () {
         if(this.role==0||this.role==1){
           this.$api.post('/subject/add' , this.subjectForm, r => {
             if(r.data.data===true){
                 this.$Message.success('新增成功！')
                 this.doneTableList();
             }else{
                 this.$Message.error('新增失败！')
             }
           })
        }else{
          this.$Message.warning('暂无权限，请联系管理员')
        }
      },
    typeAdd () {
         if(this.role==0||this.role==1){
           this.$api.post('/purchase_type/add' , this.typeForm, r => {
             if(r.data.data===true){
                 this.$Message.success('新增成功！')
                 this.doneTableList();
             }else{
                 this.$Message.error('新增失败！')
             }
           })
        }else{
          this.$Message.warning('暂无权限，请联系管理员')
        }
      },

    }


}
</script>
