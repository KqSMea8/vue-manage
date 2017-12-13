<style>
    @import 'markdown-editor.less';
</style>


<template>
    <div class="markdown">
        <Row class="margin-top-20">
            <Col span="16" offset="4">
                <div class="markdown-con">
                    <Card>
                        <textarea  id="iview_admin_markdown_editor" style="display:none;"></textarea>
                    </Card>
                </div>
            </Col>
        </Row>
        <!-- <Button type="primary" @click="handleSubmit2" long>Login</Button> -->
    </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import './simplemde.min.css';
export default {
    name: 'markdown-editor',
    data () {
        return {
            answer:''
        }
    },
    mounted () {
      var simplemde= new SimpleMDE({
            element: document.getElementById('iview_admin_markdown_editor'),
            //autoDownloadFontAwesome: true,
            toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', '|', 'code', 'quote', 'unordered-list', 'clean-block', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'preview', 'guide']
        });

      this.init(simplemde);
    },
    methods: {

        init(simplemde) {
          let html;
          simplemde.codemirror.on("change", function(){
              let mark_value=simplemde.value()
              html=simplemde.markdown(mark_value)


          });
          if(html==null){
            this.$Notice.open({
                  title: 'Notice',
                  desc: 'please dot use it ',
                  duration: 1
              });
          }

        },
        handleSubmit2(){
          //console.log(this.answer);
        }
    }
};
</script>
<style scoped>
.markdown{
  margin: 25px 30px 0 30px;
}
</style>
