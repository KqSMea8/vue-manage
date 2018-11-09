<template>
    <div class="purchase_create">
      <center><h2>采购计划详情</h2></center>
      <br>
      <Steps :current="current" >
        <Step title="创建" :content="process_create"></Step>
        <Step title="提交" :content="process_sub"></Step>
        <Step title="审核" :content="process_audit"></Step>
        <Step title="执行" :content="process_exe"></Step>

    </Steps>
      <Button type="dashed" @click="handleCancel()"  style="float:right">返回</Button>
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
          <p>采购金额：{{formAudit.unitPrice}}</p>
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
        <div style="width:300px;height:auto;display:inline;float:left">
          <h4>附件信息→→→<Button type="success" @click="doneFileData()" size="small" >查看</Button></h4>
          <br>
          <div v-for="file in fileData" :id="file.id" class="filename">
                 {{file.name}}<a :href="file.view_path" target="_blank" style="margin-left:10px;">预览</a><a :href="file.down_path" style="margin-left:10px;">下载</a>
         </div>

        </div>
    </div>
    <div style="width:200px;height:auto;display:block;marginLeft:400px;">
          <Button type="dashed" @click="handleCancel()" >返回</Button>
      </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      current: 0,
      modal:false,
      id: this.$route.params.id,
      uid:Cookies.get('id'),
      role:Cookies.get('role'),
      audit:'20',
      audit_remark:'',
      process_create:'',
      process_sub:'',
      process_audit:'',
      process_exe:'',
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
        capitalTypeList:[],
        isTemporary:'',
        isOverSea:'',
        isGovernmentPurchaseService:'0',
        unitPrice:'',
        quantity:'',
        financialPurchasePlanId:'',
        financialBudgetId:'',
        financialProjectNo:'',
        audit:0,
        fileId:'',
        
      },



    }
  },
  created () {
    this.doneAuditData();
  },
  methods: {
    doneAuditData () {
      this.$api.get('/plan/find_by_id' , {id:this.id}, r => {
        this.formAudit = r.data.data
        let status=r.data.data.audit;
        let execu=r.data.data.execute;
        if(status==0){
          this.current = 1;
          this.process_create='创建成功';
          this.process_sub='未提交';
        }else if(status==10){
          this.current = 2;
          this.process_create='创建成功';
          this.process_sub='已提交,创建者:'+r.data.data.operator_name;
          this.process_audit='正在努力审核中...';
        }else if(status==30){
          this.current = 1;
          this.process_create='创建成功';
          this.process_sub='审核不通过,驳回原因:'+r.data.data.audit_remark;
        }else{
          this.current = 3;
          this.process_create='创建成功';
          this.process_sub='已提交,创建者:'+r.data.data.operator_name;
          this.process_audit='审核通过,['+r.data.data.audit_remark+']';
          if(execu==10){
             this.process_exe='审核通过,待执行';
          }else if(execu==20){
            this.process_exe='执行成功';
          }else{
              this.process_exe='执行失败';
          }
        }
      })
    },
    doneFileData () {
      this.$api.get('/file/findByIds' , {ids:this.formAudit.fileId}, r => {
        this.fileData=r.data.data;

      })
    },
    handleCancel (){
      this.$router.push('/purchase_create');
    },
    cancel () {
     this.$Message.info('操作已取消')
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
