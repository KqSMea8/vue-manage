<template>
    <div class="purchase_create">
      <center><h2>采购计划审核</h2></center>
      <br>
      <Steps :current="current">
        <Step title="创建"></Step>
        <Step title="提交"></Step>
        <Step title="审核"></Step>
        <Step title="执行"></Step>
    </Steps>
    <br>

    <div>
        <div style="width:250px;height:auto;display:inline;float:left">
          <h4>单位信息</h4>
          <br>
          <p>单位名称：{{formAudit.organName}}</p>
          <br>
          <p>预算编码：{{formAudit.organBudgetCode}}</p>
          <br>
          <p>联系人：{{formAudit.contactPerson}}</p>
          <br>
          <p>联系电话：{{formAudit.contactTelephone}}</p>
          <br>
          <p>主管预算部门：{{formAudit.organSuperiorName}}</p>
          <br>
          <p>主管单位联系人：{{formAudit.organSuperiorName}}</p>
          <br>
          <p>主管单位联系电话：{{formAudit.organSuperiorName}}</p>
          <br>
        </div>

        <div style="width:400px;height:auto;display:inline;float:left">
          <h4>采购计划信息</h4>
          <br>
          <p>采购计划文号：{{formAudit.purchaseplanDOCNO}}</p>
          <br>
          <p>项目名称：{{formAudit.projectName}}</p>
          <br>
          <p>采购目录：{{formAudit.gpcatalogName}}</p>
          <br>
          <p>采购内容：{{formAudit.procurementContent}}</p>
          <br>
          <p>采购类型：{{formAudit.procurementTypeName}}</p>
          <br>
          <p>采购方式：{{formAudit.procurementMethodName}}</p>
          <br>
          <p>付款方式：{{formAudit.paymentMethodName}}</p>
          <br>
          <p>资金类型：{{formAudit.capitalTypeList[0].capitalName}}</p>
          <br>
          <p>采购金额：{{formAudit.unitPrice}} (分)</p>
          <br>
          <p>采购数量：{{formAudit.quantity}}</p>
          <br>
          <p>是否备案：外网备案</p>
          <br>
          <p v-if="formAudit.isGovernmentPurchaseService==0">政府购买：否</p>
          <p v-else>政府购买：是</p>
          <br>
          <p v-if="formAudit.isOverSea==0">是否进口：否</p>
          <p v-else>是否进口：是</p>
          <br>
          <p v-if="formAudit.isTemporary==0">是否临时：正式</p>
          <p v-else>是否临时：临时</p>
          <br>
          <p>是否紧急：非紧急</p>
          <br>
        </div>
        <div style="width:300px;height:auto;display:inline;float:left">
          <h4>其他信息</h4>
          <br>
          <p>功能科目：{{formAudit.functionalSubjectName}}</p>
          <br>
          <p>经济科目：{{formAudit.economicSubjectName}}</p>
          <br>
          <p>项目编号：{{formAudit.financialProjectNo}}</p>
          <br>
          <p>预算序号：{{formAudit.financialBudgetId}}</p>
          <br>
          <p>唯一标识：{{formAudit.financialPurchasePlanId}}</p>
          <br>
        </div>
        <div style="width:200px;height:auto;display:inline;float:left">
          <h4>附件信息→→→<Button type="success" @click="doneFileData()" size="small" >查看</Button></h4>
          <br>
          <div v-for="file in fileData" :id="file.id" class="filename">
                 {{file.name}}<a :href="file.view_path" target="_blank" style="margin-left:10px;">预览</a><a :href="file.down_path" style="margin-left:10px;">下载</a>
         </div>

        </div>
    </div>
    <div style="width:200px;height:auto;display:block;marginLeft:400px;">

          <Button type="dashed" @click="handleCancel()" >返回</Button>
          <Button type="primary" @click="modal = true" style="margin-left:15px;"><Icon type="md-hand" />审批</Button>
          <Modal v-model="modal" title="采购计划-审批" @on-ok="handleAudit" @on-cancel="cancel" style="width:200px">
            <div style="margin-left:15px">
             审批结果：<RadioGroup v-model="audit">
                <Radio label="20">
                <Icon type="ios-checkmark" />
                    <span>通过</span>
                </Radio>
                <Radio label="30">
              <Icon type="ios-close" />
                    <span>驳回</span>
                </Radio>
              </br>
            </RadioGroup>
            <br>
            审批意见：<Input v-model="audit_remark" type="textarea" :rows="4" placeholder="Enter something..." />
          </div>
          </Modal>

      </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      current: 2,
      modal:false,
      id: this.$route.params.id,
      uid:Cookies.get('id'),
      role:Cookies.get('role'),
      audit:'20',
      audit_remark:'',
      fileData:[],
      formAudit: {
        applyYear:'',
        director:'',
        directorTelephone:'',
        projectName:'',
        procurementContent:'',
        organName:'',
        organBudgetCode:'',
        organSuperiorName:'',
        purchaseplanDOCNO:'',
        functionalSubjectName:'',
        economicSubjectName:'',
        gpcatalogName:'',
        procurementTypeName:'',
        procurementMethodName:'',
        paymentMethodName:'',
        capitalName:'',
        isTemporary:'',
        isOverSea:'',
        isGovernmentPurchaseService:'0',
        unitPrice:'',
        quantity:'',
        financialPurchasePlanId:'',
        financialBudgetId:'',
        financialProjectNo:'',
        fileId:''
      },



    }
  },
  created () {
    this.doneAuditData();
  },
  methods: {
    doneAuditData () {
      this.$api.get('/plan/find_by_id' , {id:this.id}, r => {
        this.formAudit = r.data.data;

      })
    },
    doneFileData () {
      this.$api.get('/file/findByIds' , {ids:this.formAudit.fileId}, r => {
        this.fileData=r.data.data;

      })
    },

    handleCancel (){
      this.$router.push('/purchase_audit');
    },
    cancel () {
     this.$Message.info('操作已取消')
    },
    handleAudit (){
      if(this.role==2){
        this.$api.post('/plan/audit' , {id:this.id,audit:this.audit,audit_remark:this.audit_remark}, r => {
          if(r.data.data===true){
            this.$Message.success('审批完成')
            this.$router.push('/purchase_audit');
          }else{
                this.$Message.error('系统繁忙,请稍后再试')
          }

        })
      }else{
          this.$Message.warning('暂无权限进行该操作！')
      }
    },


  }
}
</script>
<style>
.create {
width: 100%;
height: 865px;
}

.purchase_create h4{
  font-size:13px;
  font-family:"楷体";
}
.purchase_create p{
  font-size:13px;
  word-break:normal;
  white-space:pre-warp;
  word-wrapL:break-word;
}
</style>
