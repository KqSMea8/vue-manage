<style media="screen">
  .rtf-content {
    height: 603px;
  }
  .submit-style{
    margin-top: auto;
    margin-bottom: 10px;
    float: right;
  }
</style>
<template>
  <div id="qa">
    <div class="submit-style">
      <Button type="primary" @click="modal = true">issuance</Button>
      <Modal v-model="modal" title="Tip" @on-ok="increase" @on-cancel="cancel">
        <p>are you sure?</p>
      </Modal>
    </div>
    <div>
    <h2>标题:</h2>
    <Input v-model="question" placeholder="Enter question title here" style="width: 100%"></Input>
    <h2>类型:</h2>
    <RadioGroup v-model="types">
       <Radio label="0">
          <Icon type="bonfire"></Icon>
           <span>分享</span>
       </Radio>
       <Radio label="1">
          <Icon type="android-notifications"></Icon>
           <span>公告</span>
       </Radio>
   </RadioGroup>
    <h2>内容:</h2>
    <div class="rtf-content">
        <quill-editor ref="myTextEditor" v-model="answer" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"></quill-editor>
    </div>
    </div>
  </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data: function(){
            return {
                modal:false,
                question:'',
                remark:'',
                answer: '',
                types:0,
                editorOption: {

                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
          onEditorBlur(editor) {
            //console.log(this.answer)
          },
          onEditorFocus(editor) {
            //console.log('editor focus!', this.answer)
          },
          onEditorReady(editor) {
            //console.log('editor ready!', editor)
          },
          onEditorChange({editor, html, text }) {
            //console.log('editor change!', editor, html, text) //使用v-model=answer，去除@change
            if(this.ishtml==true){
              this.answer =text
            }else{
              this.answer =html
            }

          },
          increase(){

            let question=this.question;
            let answer=this.answer;
            let type=this.types;
            if(question===''||answer===''){
              this.$Message.info('question or answer content is null')
            }else{
                this.$api.post('/question/add', {question:question,answer:answer,type:type}, r => {

                    if(r.data.data===true){
                        this.$Message.info('increase successful')
                        this.question=''
                        this.remark=''
                        this.answer=''
                    }else{
                        this.$Message.info('increase failure')
                    }

                })

            }

          },
          cancel () {
              this.$Message.info('cancel increase question')
          }
        },
        computed: {
            editor() {
              return this.$refs.myTextEditor.quill
            }
        },
        mounted() {
          //console.log('this is current quill instance object', this.answer)
        }

    }
</script>
