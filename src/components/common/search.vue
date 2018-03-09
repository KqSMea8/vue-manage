<template>
<div class="search">
<Input v-model="words" @on-enter="searchdle">
        <Select v-model="select3" slot="prepend" style="width: 60px">
            <Option value="pay">pay</Option>
            <Option value="month">other</Option>
        </Select>
        <Button slot="append" icon="search" style="width:70px" @click="searchdle"></Button>
    </Input>
      <div class="search-content">
        <Timeline>
            <div v-for="re in result">
                <TimelineItem>
                    <Icon type="leaf" slot="dot"></Icon><h3><router-link :to="'/link' + re.id">{{re.question}}<p class="content">{{re.gmt_create}}</p></router-link>   </h3>

                </TimelineItem>
            </div>
      </Timeline>
      </div>
       <Page :page-size="rows" :show-total="true" :show-sizer="true" @on-change="changepage" :show-elevator="true" :total="total" @on-page-size-change="changesize" style="width:100%;margin-top:5px;margin-bottom: 5px;margin-left:30px;"></Page>
</div>
</template>
<script>
    import Cookies from 'js-cookie'
    export default {
        data () {
            return {
                select3: 'pay',
                id:this.$route.params.id,
                rows:10,
                total:0,
                words:'',
                keywords:Cookies.get('words'),
                result:[],
                resp:[]
            }
        },
        created () {
          this.backSearch()
        },
        methods: {
          searchdle () {
            this.$api.get('/question/search',{question:this.words},r => {
                if(r.data.data.length===0){
                    this.$Message.warning('没有符合该搜索条件的结果')
                }else{
                    Cookies.set('words', this.words);
                    let total=r.data.data.length
                    this.$Message.success('已搜索到'+total+'条记录')
                    this.resp=r.data.data
                    this.total=total
                    if(r.data.data.length<this.rows){
                      this.result=this.resp
                    }else{
                      this.result=this.resp.slice(0,this.rows)
                    }
                }

            })

          },
          // pagehadle(current){
          //   console.log(current);
          //   this.$api.get('/question/search',{page:current ? current-1:1,rows:this.rows,question:this.words},r => {
          //     console.log(r)
          //       this.result=r.data.data.content
          //       this.total=r.data.data.totalElements
          //   })
          // },
          changepage(index){
            var _start = ( index - 1 ) * this.rows;
            var _end = index * this.rows;
            this.result= this.resp.slice(_start,_end);
          },
          changesize(size){
            this.rows=size;
            if(this.resp.length<this.rows){
              this.result=this.resp
            }else{
              this.result=this.resp.slice(0,this.rows)
            }
          },
          backSearch(){
             if(typeof this.id != "undefined" && this.id != null && this.id!= ""){
                 this.$api.get('/question/find_by_id' , {id:this.id}, r => {
                  //this.words=r.data.data.question
                     this.words=this.keywords
                    this.searchdle()
                })
            }
            // this.words=this.keywords
             //this.searchdle()
          }
      }

  }
</script>
<style scoped>
.search {
  margin: 10px 20px 0 30px;
  color: black;
}
.search-content {
  margin: 10px 20px 0 30px;
}
.time{
       font-size: 14px;
       font-weight: bold;
   }
.content{
    float: right;
   }

</style>
