<template>
  <div id="achievements">
      <div style="margin:2px">
      <label>角色:</label>
      <Select v-model="model" filterable style="width:150px;margin-right: 15px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label>周次:</label>
      <Select v-model="model" filterable style="width:150px;margin-right: 15px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label>回火:</label>
      <Select v-model="model" filterable style="width:150px;margin-right: 15px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label>日期间隔:</label>
      <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width:200px"></DatePicker>
    <Button type="ghost" shape="circle" icon="ios-search">搜索</Button>
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
       <Button type="info"  size="small" @click="exportData()" style="float:right"><Icon type="archive"></Icon>数据导出</Button>
       <Button type="success" size="small"  @click="modal = true" style="float:right;margin-right: 5px"><Icon type="paintbrush"></Icon>新增记录</Button>
       <Modal v-model="modal" title="Tip" @on-ok="add" @on-cancel="cancel" style="width:300px">
         员工姓名：<Input v-model="usernameAdd" placeholder="Enter something..." clearable style="width: 200px"></Input><br><br>
         员工组别：<RadioGroup v-model="userGroup">
            <Radio label="0">
              <Icon type="ios-person"></Icon>

                <span>新人组</span>
            </Radio>
            <Radio label="1">
               <Icon type="android-contacts"></Icon>
                <span>支付二组</span>
            </Radio>
            <Radio label="2">
               <Icon type="person-stalker"></Icon>
                <span>综合组</span>
            </Radio>
            <Radio label="2">
               <Icon type="ios-people"></Icon>
                <span>ISV组</span>
            </Radio>
            <Radio label="2">
               <Icon type="person-stalker"></Icon>
                <span>大商户组</span>
            </Radio>
        </RadioGroup>
        <br><br>
        入职时间：<DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
       </Modal>

   </div>
   <Table :border="showBorder" :stripe="showStripe"  :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData" :columns="columns" ref="table"></Table>
    <div style="margin: 10px;overflow: hidden">
       <div style="float: right;">
           <Page :total="100" :current="1" @on-change="changePage"></Page>
       </div>
   </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
              columns: [
                    {
                       type: 'selection',
                       width: 60,
                       align: 'center'
                    },
                    {
                        title: '姓名',
                        width: 140,
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '年龄',
                        width: 120,
                        sortable: true,
                        key: 'age',
                        filters: [
                            {
                                label: 'Greater than 100',
                                value: 1
                            },
                            {
                                label: 'Less than 200',
                                value: 2
                            }
                        ],

                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age > 100;
                            } else if (value === 2) {
                                return row.age > 200;
                            }
                        },

                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                            this.show(params.index)
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
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tableData: [
                    {
                        name: '小明',
                        age: 80,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: '小二',
                        age: 40,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: '小三',
                        age: 130,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: '小四',
                        age: 260,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ],
                modal:false,
                showBorder: false,
                showStripe: false,
                fixedHeader: false,
                tableSize: 'default',
                usernameAdd:"",
                userGroup:0,
                cityList: [
                   {
                       value: 'New York',
                       label: 'New York'
                   },
                   {
                       value: 'London',
                       label: 'London'
                   },
                   {
                       value: 'Sydney',
                       label: 'Sydney'
                   },
               ],
               model: [],
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData[index].name}<br>Age：${this.tableData[index].age}<br>Address：${this.tableData[index].address}`
                })
            },
            remove (index) {
                this.tableData.splice(index, 1);
            },
            changePage () {
               this.tableData = this.tableData;
           },
           exportData () {
              this.$refs.table.exportCsv({
                      filename: 'original_data',
                      columns: this.columns.filter((col, index) => index < 4),
                      data: this.tableData.filter((data, index) => index< 4)
                  });
          }
        }
    }
</script>
