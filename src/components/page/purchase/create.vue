<template>
    <div class="purchase_create">
      <center><h2>采购计划申请</h2></center>
      <br>
      <!-- <Button type="primary" small @click="next">查看流程</Button> -->
      <Steps :current="current" size="small">
        <Step title="创建" content="填写信息,创建采购计划"></Step>
        <Step title="提交" content="提交采购计划"></Step>
        <Step title="审核" content="审核采购计划"></Step>
        <Step title="执行" content="执行采购计划,导入政采云"></Step>
    </Steps>
    <br>

    <Form ref="formCreate" :model="formCreate" :rules="ruleValidate" :label-width="80" inline>
        <h3>基本信息</h3>
       <FormItem label="行政区划" prop="districtCode">
          <Select v-model="formCreate.districtCode" size="small" style="width: 150px">
            <Option value="339900">浙江省本级</Option>
              <!-- <Option value="450599">测试省</Option> -->
          </Select>
        </FormItem>
        <FormItem label="申请年份" prop="applyYear">
          <DatePicker v-model="formCreate.applyYear" format="yyyy" size="small" type="year" placeholder="Select year" style="width:150px;"></DatePicker>
       </FormItem>

       <FormItem label="联系人">
          <Input v-model="formCreate.contactPerson" size="small" style="width: 150px"  placeholder="Enter contact name here"></Input>
        </FormItem>
        <FormItem label="联系电话">
           <Input v-model="formCreate.contactTelephone" size="small" style="width: 150px" placeholder="Enter director phone here"></Input>
         </FormItem>
         <br>
        <FormItem label="项目名称" prop="projectName">
           <Input v-model="formCreate.projectName" size="small" style="width:880px" clearable placeholder="Enter project name here"></Input>
         </FormItem>
         <FormItem label="采购内容">
            <Input v-model="formCreate.procurementContent" size="small" style="width:880px" clearable placeholder="Enter something here"></Input>
          </FormItem>
      <br>
      <h3>项目信息</h3>
        <FormItem label="采购单位" prop="organName">
              <Select v-model="formCreate.organName" size="small" clearable  filterable style="width:395px;">
                <Option v-for="it in institutionList" :value="it.id" :key="it.id">{{it.name}} <Icon type="ios-redo" /> [{{it.budget_code}}]</Option>
              </Select>
         </FormItem>
        <FormItem label="采购目录" prop="gpcatalogName">
           <Select v-model="formCreate.gpcatalogName" size="small"  filterable clearable style="width:395px">
             <Option v-for="it in gpcatalogList" :value="it.id" :key="it.id">{{it.name}} <Icon type="ios-redo" /> [{{it.code}}]</Option>
           </Select>
         </FormItem>
         <br>
         <FormItem label="预算科目" prop="functionalSubjectName">
            <Select v-model="formCreate.functionalSubjectName" size="small" clearable  filterable style="width:395px;">
              <Option v-for="it in functionalSubjectList" :value="it.id" :key="it.id">{{it.name}}  <Icon type="ios-redo" /> [{{it.code}}]</Option>
            </Select>
          </FormItem>
          <FormItem label="经济科目" prop="economicSubjectName">
             <Select v-model="formCreate.economicSubjectName" size="small" clearable  filterable style="width:395px;">
               <Option v-for="it in economicSubjectList" :value="it.id" :key="it.id">{{it.name}} <Icon type="ios-redo" /> [{{it.code}}]</Option>
             </Select>
           </FormItem>
         <br>
         <FormItem label="采购金额(万元)" prop="unitPrice">
            <Input v-model="formCreate.unitPrice" size="small" style="width: 150px"></Input>
          </FormItem>
          <FormItem label="采购数量">
             <InputNumber v-model="formCreate.quantity" size="small" style="width: 150px"></InputNumber>
           </FormItem>
           <FormItem label="是否进口">
               <RadioGroup v-model="formCreate.isTemporary">
                  <Radio label="1">
                      <span>是</span>
                  </Radio>
                  <Radio label="0">
                      <span>否</span>
                  </Radio>
               </RadioGroup>
            </FormItem>

        <br>
        <h3>计划详情</h3>
        <FormItem label="计划文号">
           <Input size="small" style="width: 150px" value="自动生成" disabled></Input>
       </FormItem>
        <FormItem label="备案方式">
             <Input size="small" style="width: 150px" value="外网备案" disabled></Input>
         </FormItem>
         <FormItem label="资金类型" prop="capitalName">
           <Select v-model="formCreate.capitalName" size="small" clearable style="width:150px">
             <Option v-for="it in capitalTypeList" :value="it.id" :key="it.id">[{{it.code}}]<Icon type="ios-redo" /> {{it.name}} </Option>
           </Select>
          </FormItem>
          <FormItem label="付款方式" prop="paymentMethodName">
            <Select v-model="formCreate.paymentMethodName" size="small" clearable style="width:150px">
              <Option v-for="it in paymentMethodList" :value="it.id" :key="it.id">[{{it.code}}]<Icon type="ios-redo" /> {{it.name}}</Option>
            </Select>
           </FormItem>
             <br>
        <FormItem label="采购类型" prop="procurementTypeName">
          <Select v-model="formCreate.procurementTypeName" size="small"  filterable clearable style="width:200px">
            <Option v-for="it in procurementTypeList" :value="it.id" :key="it.id">[{{it.code}}]<Icon type="ios-redo" /> {{it.name}}</Option>
          </Select>
         </FormItem>
         <FormItem label="采购方式" prop="procurementMethodName">
           <Select v-model="formCreate.procurementMethodName" size="small"  filterable clearable style="width:200px">
             <Option v-for="it in procurementMethodList" :value="it.id" :key="it.id"> [{{it.code}}]<Icon type="ios-redo" /> {{it.name}}</Option>
           </Select>
          </FormItem>
              <FormItem label="是否临时">
                  <RadioGroup v-model="formCreate.isOverSea">
                     <Radio label="1">
                         <span>是</span>
                     </Radio>
                     <Radio label="0">
                         <span>否</span>
                     </Radio>
                  </RadioGroup>
               </FormItem>
               <FormItem label="政府购买">
                 <RadioGroup v-model="formCreate.isGovernmentPurchaseService" >
                    <Radio label="1">
                        <span>是</span>
                    </Radio>
                    <Radio label="0">
                        <span>否</span>
                    </Radio>
                 </RadioGroup>
                </FormItem>
        <br>
      <h3>附件信息(tips:附件大小最大限制为10M)</h3>
      <Upload multiple type="drag" :on-success="handleSuccess" :max-size="10240" :on-exceeded-size="handleMaxSize" action="http://10.110.2.31:8080/technical/file/upload">
              <div style="padding: 3px 0">
                  <Icon type="ios-cloud-upload" size="40" style="color: #3399ff"></Icon>
                  <p>点击或将文件拖拽到这里上传</p>
              </div>
          </Upload>
      <br>
      <div style="margin-left:380px;">
        <Button type="dashed" @click="handleReset('formCreate')" style="margin-right:15px;" >重置</Button>
        <Button type="warning" @click="handleCancel()" >取消</Button>
        <Button type="success"  @click="handleSave('formCreate')" style="margin-left:15px;">保存</Button>
        <Button type="primary"  @click="handleSubmit('formCreate')" style="margin-left:15px;">保存并提交</Button>
      </div>
  </Form>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      current: 0,
      modal:false,
      uid:Cookies.get('id'),
      uname:Cookies.get('nick_name'),
      institutionList:[],
      procurementTypeList:[],
      procurementMethodList:[],
      paymentMethodList:[],
      capitalTypeList:[],
      functionalSubjectList:[],
      economicSubjectList:[],
      gpcatalogList:[],
      formCreate: {
        districtCode:'',
        applyYear:'',
        contactPerson:'',
        contactTelephone:'',
        projectName:'',
        procurementContent:'',
        organName:'',
        functionalSubjectName:'',
        economicSubjectName:'',
        gpcatalogName:'',
        procurementTypeName:'',
        procurementMethodName:'',
        paymentMethodName:'',
        capitalName:'',
        isTemporary:'0',
        isOverSea:'0',
        isGovernmentPurchaseService:'0',
        unitPrice:'',
        quantity:1,
        fileId:'',
      },
       ruleValidate: {
         districtCode: [
           { required: true, message: 'Please select the district', trigger: 'change' }
          ],
          applyYear: [
            {required: true, type:'date',message: 'Please select the year', trigger: 'change' }
         ],
          projectName: [
              { required: true, message: 'The projectName cannot be empty', trigger: 'blur' }
          ],
          organName: [
            { required: true, message: 'Please select the organ', trigger: 'change' }
           ],
          economicSubjectName: [
             { required: true, message: 'Please select the economicSubject', trigger: 'change' }
          ],
          functionalSubjectName: [
             { required: true, message: 'Please select the functionalSubject', trigger: 'change' }
          ],
          gpcatalogName: [
             { required: true, message: 'Please select the gpcatalog', trigger: 'change' }
          ],
          procurementMethodName: [
             { required: true, message: 'Please select the procurementMethod', trigger: 'change' }
          ],
          procurementTypeName: [
             { required: true, message: 'Please select the procurementType', trigger: 'change' }
          ],
          capitalName: [
             { required: true, message: 'Please select the capitalType', trigger: 'change' }
          ],
          paymentMethodName: [
             { required: true, message: 'Please select the paymentMethod', trigger: 'change' }
          ],
          unitPrice: [
              { required: true, message: 'The amount cannot be empty', trigger: 'blur' }
          ],
          quantity: [
              { required: true, message: 'The quantity cannot be empty', trigger: 'blur' },
              { type: 'number', message: '请输入数字格式', trigger: 'blur'}
          ],
       },

    }
  },
  created () {
    this.doneInstitutionList();
    this.doneProcurementTypeList();
    this.doneProcurementMethodList();
    this.donePaymentMethodList();
    this.doneCapitalTypeList();
    this.doneFunctionalSubjectList();
    this.doneEconomicSubjectList();
    this.doneGpcatalogList();
  },
  methods: {
    handleMaxSize (file) {
                 this.$Notice.warning({
                     title: 'Exceeding file size limit',
                     desc: 'File  ' + file.name + ' is too large, no more than 10M.'
                 });
     },
     handleSuccess (res, file) {
          var cur=this.formCreate.fileId;
          if(cur!=null||cur!=''){
            this.formCreate.fileId=cur+','+res.data;
          }else{
            this.formCreate.fileId=res.data;
          }

     },
    doneInstitutionList () {
      this.$api.get('/institution/findAll' , null, r => {
        this.institutionList = r.data.data
      })
    },
    doneProcurementTypeList () {
      this.$api.get('/purchase_type/findByType?type=1' ,null, r => {
        this.procurementTypeList = r.data.data
      })
    },
    doneProcurementMethodList () {
      this.$api.get('/purchase_type/findByType?type=2' ,null, r => {
        this.procurementMethodList = r.data.data
      })
    },
    donePaymentMethodList () {
      this.$api.get('/purchase_type/findByType?type=4' ,null, r => {
        this.paymentMethodList = r.data.data
      })
    },
    doneCapitalTypeList () {
      this.$api.get('/purchase_type/findByType?type=3' ,null, r => {
        this.capitalTypeList = r.data.data
      })
    },
    doneFunctionalSubjectList () {
      this.$api.get('/subject/findByType?type=1' ,null, r => {
        this.functionalSubjectList = r.data.data
      })
    },
    doneEconomicSubjectList () {
      this.$api.get('/subject/findByType?type=2' ,null, r => {
        this.economicSubjectList = r.data.data
      })
    },
    doneGpcatalogList () {
      this.$api.get('/gpcatlog/findByFlag' ,null, r => {
        this.gpcatalogList = r.data.data
      })
    },
    handleCancel (){
      this.$router.push('/purchase_create');
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    formatMonth (date) {
       var y = date.getFullYear();
       var m = date.getMonth() + 1;
           m = m < 10 ? ('0' + m) : m;
       return y + '-' + m ;
    },
    formatYear (date) {
       return date.getFullYear() ;
    },
    handleSave (form){
      this.$refs[form].validate((valid) => {
          if(valid){
            let fc=this.formCreate;
            let year=this.formatYear(fc.applyYear);
            let mount=(fc.unitPrice)*1000000;
            if(typeof(fc.quantity)=="number"){
              this.$api.post('/plan/create',{operator_id:this.uid,operator_name:this.uname,applyYear:year,type:1,districtCode:fc.districtCode,contactPerson:fc.contactPerson,contactTelephone:fc.contactTelephone,projectName:fc.projectName,procurementContent:fc.procurementContent,
                orgId:fc.organName,fileId:fc.fileId,functionalSubjectId:fc.functionalSubjectName,economicSubjectId:fc.economicSubjectName,gpcatalogId:fc.gpcatalogName,procurementTypeId:fc.procurementTypeName,procurementMethodId:fc.procurementMethodName,capitalTypeId:fc.capitalName,paymentMethodId:fc.paymentMethodName,unitPrice:mount,quantity:fc.quantity}, r => {
                this.$router.push('/purchase_create');
              })
            }else{
              this.$Message.warning('采购数量需为number类型,范围-128``127');
            }
          }else{
              this.$Message.error('表单验证失败,请检查参数必填项!');
          }
      })
    },
    handleSubmit (form){
      this.$refs[form].validate((valid) => {
          if(valid){
            let fc=this.formCreate;
            let year=this.formatYear(fc.applyYear);
            let mount=(fc.unitPrice)*1000000;
            this.$api.post('/plan/create',{operator_id:this.uid,operator_name:this.uname,applyYear:year,type:2,districtCode:fc.districtCode,contactPerson:fc.contactPerson,contactTelephone:fc.contactTelephone,projectName:fc.projectName,procurementContent:fc.procurementContent,
              orgId:fc.organName,fileId:fc.fileId,functionalSubjectId:fc.functionalSubjectName,economicSubjectId:fc.economicSubjectName,gpcatalogId:fc.gpcatalogName,procurementTypeId:fc.procurementTypeName,procurementMethodId:fc.procurementMethodName,capitalTypeId:fc.capitalName,paymentMethodId:fc.paymentMethodName,unitPrice:mount,quantity:fc.quantity}, r => {
              this.$router.push('/purchase_create');
            })

          }else{
              this.$Message.error('表单验证失败,请检查参数必填项!');
          }
      })

    }

  }
}
</script>
<style>
.create {
width: 100%;
height: 865px;
}
</style>
