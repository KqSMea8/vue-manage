<template>
  <div class="purchase_create">
    <Tabs>
      <TabPane label="值班计划-配置" >
        <div style="margin-left:500px;" v-if="role==0">
        <Button type="info" @click="modal1 = true">新建工作</Button>
        <Button type="warning" ghost size="small" @click="modal2 = true" style="float:right;marginRight:10px;">手动生成计划表</Button>
       </div>
       <div v-else>
         <center><h2>技术支持月度值班列表</h2></center>
       </div>
       <br>
       <div>
       <Timeline>
           <div v-for="duty in tableData2" style="height:auto;display:inline;margin-bottom: 5px;">
               <TimelineItem>
                   <Icon type="leaf" slot="dot"></Icon><h3><router-link :to="'/duty' + duty.id">{{duty.sheetName}}<p style="float:right;marginRight:20px;">······························································································································{{duty.gmt_create}}</p></router-link> </h3>
               </TimelineItem>
           </div>
         </Timeline>
       </div>
       <div style="float: right;">
       <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage_duty" :show-elevator="true" :total="total2" @on-page-size-change="changesize_duty" style="width:100%;margin-top:5px;margin-bottom: 5px;margin-left:30px;margin-right:10px"></Page>
       </div>
        <Modal v-model="modal1"  @on-ok="workAdd" @on-cancel="cancel" style="width:500px">
          <p slot="header" style="color:#1c2438;text-align:center">
                    <Icon type="md-key" /><span>创建-值班计划</span>
          </p>
          <div>
            <div style="margin-left: 80px;">
              值班月度：<DatePicker type="month" v-model="months" format="yyyy年MM月" placeholder="Select month" @on-change="chose_month" style="width: 250px"></DatePicker>
            </div>
          <h3>第一周</h3>
          <div style="margin-left: 80px;">
          值班角色：<Select v-model="formwork[0].userId" clearable style="width:250px;">
                        <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.nick_name}}</Option>
                   </Select><br><br>
          值班时段：<DatePicker type="daterange" v-model="first" format="yyyy年MM月dd日" split-panels confirm placeholder="Select date" style="width: 250px" @on-ok="first_week"></DatePicker>
          </div>
          <h3>第二周</h3>
          <div style="margin-left: 80px;">
          值班角色：<Select v-model="formwork[1].userId" clearable style="width:250px;">
                        <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.nick_name}}</Option>
                    </Select><br><br>
          值班时段：<DatePicker type="daterange" v-model="second" format="yyyy年MM月dd日" split-panels confirm placeholder="Select date" style="width: 250px" @on-ok="second_week"></DatePicker>
          </div>
          <h3>第三周</h3>
          <div style="margin-left: 80px;">
          值班角色：<Select v-model="formwork[2].userId" clearable style="width:250px;">
                        <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.nick_name}}</Option>
                    </Select><br><br>
          值班时段：<DatePicker type="daterange" v-model="three" format="yyyy年MM月dd日" split-panels confirm placeholder="Select date" style="width: 250px" @on-ok="three_week"></DatePicker>
          </div>
          <h3>第四周</h3>
          <div style="margin-left: 80px;">
          值班角色：<Select v-model="formwork[3].userId" clearable style="width:250px;">
                            <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.nick_name}}</Option>
                   </Select><br><br>
          值班时段：<DatePicker type="daterange" v-model="four" format="yyyy年MM月dd日" split-panels confirm placeholder="Select date" style="width: 250px" @on-ok="four_week"></DatePicker>
          </div>
          <h3>结余周-可选</h3>
          <div style="margin-left: 80px;">
          值班角色：<Select v-model="formwork[4].userId" clearable style="width:250px;">
                            <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.nick_name}}</Option>
                   </Select><br><br>
          值班时段：<DatePicker type="daterange" v-model="five" format="yyyy年MM月dd日" split-panels confirm placeholder="Select date" style="width: 250px" @on-ok="five_week"></DatePicker>
          </div>
        </div>
        </Modal>
          <Modal v-model="modal2"  title="月度值班计划表生成" @on-ok="reBuild" @on-cancel="cancel" style="display: flex;align-items: center;justify-content: center;">
            <div>
              <div style="margin-left: 60px;">
                月度选择：<DatePicker type="month" v-model="remonth" format="yyyy年MM月" placeholder="Select month" style="width: 250px"></DatePicker>
              </div>
             </div>
          </Modal>
        </TabPane>
        <TabPane label="菜单权限-配置" >

          <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 680 : ''" :size="tableSize" :data="tableData" :columns="columns" ref="table"></Table>
           <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                  <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage" :show-elevator="true" :total="total" @on-page-size-change="changesize"></Page>
              </div>
          </div>
          <Modal v-model="modalMenu"  @on-ok="menuAdd" @on-cancel="cancel" style="width:400px">
            <p slot="header" style="color:#1c2438;text-align:center">
                      <Icon type="md-key" />
                        <span>新增-系统菜单</span>
            </p>
            <div style="margin-left: 80px">
            菜单名称：<Input v-model="menuForm.nav_name" placeholder="例如：车辆控购" clearable style="width: 250px"></Input><br><br>
            路由入口：<Input v-model="menuForm.menu_name" placeholder="例如：/car" clearable style="width: 250px"></Input><br><br>
            菜单图标：<Input v-model="menuForm.icon" placeholder="例如：ios" clearable style="width: 250px"></Input><br><br>
            组件链路：<Input v-model="menuForm.menu_url" placeholder="例如：../components/car" clearable style="width: 250px"></Input><br><br>
            菜单分级：<Select v-model="menuForm.role" clearable style="width: 250px">
                        <Option value="0">仅管理员</Option>
                          <Option value="1">运营</Option>
                            <Option value="2">审核</Option>
                              <Option value="3">通用</Option>
                    </Select><br><br>
            排序编码：<Input v-model="menuForm.sort_code" placeholder="例如：3" clearable style="width: 250px"></Input><br><br>
          </div>
          </Modal>
        </TabPane>
     </Tabs>
   </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    data () {
        return {
          role:Cookies.get('role'),
          first:'',
          second:'',
          three:'',
          four:'',
          five:'',
          modal1:false,
          modal2:false,
          months:'',
          remonth:'',
          build:'',
          results:false,
          formwork:[
            {
              userId:'',
              moth:'',
              week:1,
              startTime:'',
              endTime:'',
              workLot:''
            },
            {
              userId:'',
              moth:'',
              week:2,
              startTime:'',
              endTime:'',
              workLot:''
            },
            {
              userId:'',
              moth:'',
              week:3,
              startTime:'',
              endTime:'',
              workLot:''
            },
            {
              userId:'',
              moth:'',
              week:4,
              startTime:'',
              endTime:'',
              workLot:''
            },
            {
              userId:'',
              moth:'',
              week:5,
              startTime:'',
              endTime:'',
              workLot:''
            }
          ],
          userList:[],
          columns: [
                {
                    title: '编号',
                    minWidth:120,
                    maxWidth:250,
                    tooltip:true,
                    key: 'id',

                },
                {
                    title: '菜单名称',
                    minWidth:120,
                    maxWidth:150,
                    key: 'nav_name',
                },
                {
                    title: '路由入口',
                    minWidth:130,
                    maxWidth:150,
                    key: 'menu_name',
                },
                {
                    title: '图标',
                    minWidth:120,
                    maxWidth:150,
                    key: 'icon',
                },

                {
                    title: 'components',
                    minWidth:150,
                    maxWidth:300,
                    tooltip:true,
                    key: 'menu_url',
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
                    title: '序',
                    minWidth:60,
                    maxWidth:120,
                    key:'sort_code',
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
                                      this.createMenu()
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
                                          this.remove(params.row.id)
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
            modalMenu:false,
            menuForm:{
              menu_name:'',
              nav_name:'',
              icon:'',
              menu_url:'',
              role:'',
              sort_code:'',
            },
            showBorder: true,
            showStripe: true,
            fixedHeader: false,
            tableSize: 'default',
            rows:10,
            total:0,
            tableData: [],
            resp:[],
            total2:0,
            tableData2: [],
            resp2:[],

        }
    },
    created () {
      this.doneTableList();
      this.doneAccountList();
    },
    methods: {
        createMenu() {
          this.modalMenu=true;
        },
        menuAdd (){
          this.$api.post('/menu/add',this.menuForm, r => {
                  if(r.data.data){
                    this.$Message.success('菜单已新增');
                      this.doneTableList();
                  }else{
                      this.$Message.success('菜单新增失败');
                  }
            })
        },
        remove (id) {
           this.$Message.warning('暂无权限进行该操作！')
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
       changepage_duty(index){
         var _start = ( index - 1 ) * this.rows;
         var _end = index * this.rows;
         this.tableData2= this.resp2.slice(_start,_end);
       },
       changesize_duty(size){
         this.rows=size;
         if(this.resp2.length<this.rows){
           this.tableData2=this.resp2
         }else{
           this.tableData2=this.resp2.slice(0,this.rows)
         }
      },
      doneTableList (){
        this.$api.get('/menu/findAll', null, r => {
          this.resp=r.data.data
          this.total=r.data.data.length
          if(r.data.data.length<this.rows){
            this.tableData=this.resp
          }else{
            this.tableData=this.resp.slice(0,this.rows)
          }
        })
        this.$api.get('/duty/findAllSheet', null, r => {
          this.resp2=r.data.data
          this.total2=r.data.data.length
          if(r.data.data.length<this.rows){
            this.tableData2=this.resp2
          }else{
            this.tableData2=this.resp2.slice(0,this.rows)
          }
        })
      },
      doneAccountList () {
        this.$api.get('/account/findAll' , null, r => {
                this.userList = r.data.data
              })
      },
      cancel () {
            this.$Message.info('操作已取消')
      },
      workAdd () {
        let flag=0;
        for (var i=0;i<5;i++){
          console.log(this.formwork[4]);
          if(this.formwork[i].userId!=null&&this.formwork[i].userId!=""){
            this.$api.post('/duty/create',this.formwork[i], r => {
                    this.results=r.data.data
              })
          }
            ++flag;
        }
        console.log(flag);
          if(flag===5){
            this.$Message.info('值班流程创建成功')
                this.$api.post('/duty/buildDutySheet',{month:this.build}, r => {
                        if(r.data.data===true){
                          this.$Message.success("值班安排表已生成")
                          this.doneTableList();
                        }else{
                          this.$Message.error("值班安排表生成失败,请点击手动生成");
                        }
                  })

          }

      },
      reBuild (){
        let months=this.formatMonth(this.remonth);
        if(typeof months=="undefined" || months==null || months==""){
              this.$Message.warning("未选择月份，无法生成安排表")
        }else{
          this.$api.post('/duty/buildDutySheet',{month:months}, r => {
              if(r.data.data===true){
                this.$Message.success(months+"月-值班安排表已生成")
                this.doneTableList();
              }else{
                this.$Message.warning("生成失败,暂无"+months+"月值班数据或"+months+"月-值班表已存在")
              }
          })
        }
      },
      first_week (){
        var arr=new Array();
        let _start=this.formatDate(this.first[0]);
        let _end=this.formatDate(this.first[1]);
        arr.push(_start);
        arr.push("~~")
        arr.push(_end)
        const time_slot=arr.join("");
        this.formwork[0].startTime=_start;
        this.formwork[0].endTime=_end;
        this.formwork[0].workLot=time_slot;
      },
      second_week (){
        var arr=new Array();
        let _start=this.formatDate(this.second[0]);
        let _end=this.formatDate(this.second[1]);
        arr.push(_start);
        arr.push("~~")
        arr.push(_end)
        const time_slot=arr.join("");
        this.formwork[1].startTime=_start;
        this.formwork[1].endTime=_end;
        this.formwork[1].workLot=time_slot;
      },
      three_week (){
        var arr=new Array();
        let _start=this.formatDate(this.three[0]);
        let _end=this.formatDate(this.three[1]);
        arr.push(_start);
        arr.push("~~")
        arr.push(_end)
        const time_slot=arr.join("");
        this.formwork[2].startTime=_start;
        this.formwork[2].endTime=_end;
        this.formwork[2].workLot=time_slot;
      },
      four_week (){
        var arr=new Array();
        let _start=this.formatDate(this.four[0]);
        let _end=this.formatDate(this.four[1]);
        arr.push(_start);
        arr.push("~~")
        arr.push(_end)
        const time_slot=arr.join("");
        this.formwork[3].startTime=_start;
        this.formwork[3].endTime=_end;
        this.formwork[3].workLot=time_slot;
      },
      five_week (){
        var arr=new Array();
        let _start=this.formatDate(this.five[0]);
        let _end=this.formatDate(this.five[1]);
        arr.push(_start);
        arr.push("~~")
        arr.push(_end)
        const time_slot=arr.join("");
        this.formwork[4].startTime=_start;
        this.formwork[4].endTime=_end;
        this.formwork[4].workLot=time_slot;
      },
      chose_month (){
        const _month=this.formatMonth(this.months);
        this.build=_month;
        this.formwork[0].moth=_month;
        this.formwork[1].moth=_month;
        this.formwork[2].moth=_month;
        this.formwork[3].moth=_month;
        this.formwork[4].moth=_month;
      },

      formatDate (date) {
         var y = date.getFullYear();
         var m = date.getMonth() + 1;
             m = m < 10 ? ('0' + m) : m;
         var d = date.getDate();
             d = d < 10 ? ('0' + d) : d;
         return y + '-' + m + '-' + d;
      },
      formatMonth (date) {
         var y = date.getFullYear();
         var m = date.getMonth() + 1;
             m = m < 10 ? ('0' + m) : m;
         return y + '-' + m;
      },


    }
}
</script>
