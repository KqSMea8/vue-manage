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
    <h2>Question:</h2>
    <Input v-model="question" placeholder="Enter question title here" style="width: 100%"></Input>
    <h2>Remark:</h2>
    <Input v-model="remark" placeholder="Enter remark here" style="width: 100%"></Input>
    <h2>Answer:</h2>
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
            //console.log('editor change!', editor, html, text)
            this.answer = html
          },
          increase(){
            let question=this.question;
            let answer=this.answer;
            if(question===''||answer===''){
              this.$Message.info('question or answer content is null')
            }else{
                console.log("222",question,this.remark,answer)
                this.$api.post('/question/add', {question:question,remark:this.remark,answer:answer}, r => {
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
