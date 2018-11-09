<template>
  <div class="tran">
    <div id="formitem" :style="{float: 'left'}">
        <Form ref="formDynamic" :model="formDynamic" :label-width="50" style="width: 350px">
              <FormItem
                      v-for="(item, index) in formDynamic.items"
                      v-if="item.status"
                      :key="index"
                      :label="item.label"
                      :prop="'items.' + index + '.value'"
                      :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                  <Row>
                      <Col span="18">
                          <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
                      </Col>
                      <Col span="3" offset="1">
                          <Button type="ghost" @click="handleRemove(index)">Delete</Button>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleReset('formDynamic')">重置</Button>
                  <Button type="primary" @click="handleClear('formDynamic')">清空</Button>
                  <Button type="primary" @click="handleSubmit('formDynamic')" style="margin-left: 8px">提交</Button>
              </FormItem>
          </Form>
      </div>
      <div id="transfer" :style="{float: 'right'}">
          <Transfer
              :data="mockDatas.nc"
              :target-keys="targetKeys"
              :list-style="listStyle"
              :render-format="render"
              :operations="['To left','To right']"
              filterable
              @on-change="handleChange">
              <div :style="{float: 'left', margin: '5px'}">
                  <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
              </div>
              <div :style="{float: 'right', margin: '5px'}">
                  <Button type="ghost" size="small" @click="submitsData()">confirm</Button>
              </div>
          </Transfer>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                mockDatas:
                      {
                        id:12,
                        va:'235',
                        nc:[
                          {"key":"1","label":"notify_url","description":"notify_url","disabled":false,value:"asf",cos:"1235",id:1},
                          {"key":"2","label":"body","description":"body","disabled":false,value:"asf",cos:"15",id:2},
                          {"key":"3","label":"subject","description":"subject","disabled":false,value:"asf",cos:"1235",id:3},
                          {"key":"4","label":"out_trade_no","description":"out_trade_no","disabled":false,value:"asf",cos:"1235",id:4},
                          {"key":"5","label":"product_code","description":"product_code","disabled":false,value:"asf",cos:"1235",id:5},
                          {"key":"6","label":"total_amount","description":"total_amount","disabled":false,value:"asf",cos:"1235",id:6},
                          {"key":"7","label":"total_amount","description":"total_amount","disabled":false,value:"asf",cos:"1235",id:7},
                          {"key":"8","label":"total_amount","description":"total_amount","disabled":false,value:"asf",cos:"1235",id:8},
                          {"key":"9","label":"total_amount","description":"total_amount","disabled":false,value:"asf",cos:"1235",id:9},
                        ]
                      },

                targetKeys: [],
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1,
                            label:'111'
                        }
                    ]
                },
                listStyle: {
                    width: '230px',
                    height: '600px',
                }
            }
        },
        methods: {
            handleChange (newTargetKeys) {
                this.targetKeys = newTargetKeys;
            },
            render (item) {
                return item.label + ' - ' + item.description;
            },
            reloadMockData () {
                //this.mockDatas = [];
                this.targetKeys =[];
            },
            submitsData () {
              this.formDynamic.items=[]
              for (let i = 1; i <=this.targetKeys.length; i++) {
                this.index++;
                this.formDynamic.items.push({
                    value: this.mockDatas.nc[i-1].label,
                    index: this.index,
                    status: 1,
                    label:this.mockDatas.nc[i-1].label
                });
              }
            },
            handleRemove (index) {
               this.formDynamic.items[index].status = 0;
           },
           handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                  this.formDynamic.items=[];
            },
            handleClear (name) {
                this.$refs[name].resetFields();
            },
        }
    }
</script>
<style scoped>
.tran {
  margin: 10px 20px 0 0px;
  width: 100%;
  height: 865px;
}
</style>
