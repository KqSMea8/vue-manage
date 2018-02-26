<template>
<div class="tools">
<table class="altrowstable" id="alternatecolor" v-for="list in lists">
      <tr>
        <td v-bind:colspan="list.col_span" align="center"><Icon v-bind:type="list.icon"></Icon> {{list.tr_value}}</td>
      </tr>
      <tr>
        <td v-for="td in list.td_list" align="center"><a v-bind:href="td.td_link" target="_blank">{{td.td_key}}</a></td>
      </tr>
</table>
</div>
</template>
<script>
export default {
  data(){
    return {
      lists:[
        {
          tb_id:'1',
          tr_value:'常用文档',
          col_span:'6',
          icon:'ios-book',
          td_list:[
            {
              col_span:'1',
              td_key:'开放平台',
              td_link:'https://docs.open.alipay.com/200'
            },
            {
              col_span:'1',
              td_key:'开放者社区',
              td_link:'https://openclub.alipay.com/'
            },
            {
              col_span:'1',
              td_key:'接口资源下载平台',
              td_link:'https://apires.alipay.com/exterface/document/list-public-latest.htm?exterfaceName=dut.customer.unsign'
            },
            {
              col_span:'1',
              td_key:'智能小宝知识库',
              td_link:'https://cspropmng.alipay.com/kbase/learning/index.htm#/archived_articles/20060'
            },
            {
              col_span:'1',
              td_key:'阿里云邮箱',
              td_link:'https://webmail.alibaba-inc.com/alimail/#h=W1siMiIsIiIseyJmSWQiOiIyIiwib2Zmc2V0IjowfV1d'
            },
            {
              col_span:'1',
              td_key:'接口管理平台',
              td_link:'https://isp.alipay.com/isp/newApiSearch.htm'
            }
          ]
        },
        {
          tb_id:'2',
          tr_value:'常用工具',
          col_span:'6',
          icon:'social-codepen-outline',
          td_list:[
            {
              col_span:'1',
              td_key:'小二上线',
              td_link:'https://clive.alipay.com/server/toRecord.htm'
            },
            {
              col_span:'1',
              td_key:'应用查询',
              td_link:'https://abossmashup.alipay.com/openmng/appQuery.mul'
            },
            {
              col_span:'1',
              td_key:'智慧平台',
              td_link:'https://csplatform.alipay.com/bench/i.htm?loginType=0&userId=2088411059171744&privateUserId=88888888&authType=PERSONAL_ACCOUNT&publicUserId=2088411059171744&enctraceid=LhYhclGlFO7KtL18lYqVM9qO1ryRpD1MWjx3PxpkCbE%2C&hasAbossPer=true&loginAdPicLink=https%3A%2F%2Fzos.alipayobjects.com%2Frmsportal%2FetGnbOqGrBmUOym.jpg&loginAdLink=https%3A%2F%2Fbumonitor.alipay.com%2Freport%2FsafeCenter.htm%23%2F%3F_k%3Dalzg3w&loginType=0&enctraceid=diwVvqG1iMdczmbZpbyq6n-w1HWTwiS7jOYFNLhnd0M'
            },
            {
              col_span:'1',
              td_key:'支付宝URL Scheme大全',
              td_link:'http://idoc.alipay.net/article/55dd5dda2a8ea40f27a9ea54'
            },
            {
              col_span:'1',
              td_key:'线上日志平台',
              td_link:'https://workflow.alipay.com/developtool/cloudparse.htm'
            },
            {
              col_span:'1',
              td_key:'沙箱日志平台',
              td_link:'http://techsupport.alipay.net/sandbox/log/search'
            }
          ]
        },
        {
          tb_id:'3',
          tr_value:'请假平台',
          col_span:'6',
          icon:'android-walk',
          td_list:[
            {
              col_span:'3',
              td_key:'阿里外包请假',
              td_link:'http://ito.alipay.net/leave.htm'
            },
            {
              col_span:'3',
              td_key:'文思Hub请假',
              td_link:'http://hub.pactera.com/?q=home-page'
            }
          ]
        },
        {
          tb_id:'4',
          tr_value:'操作手册',
          col_span:'6',
          icon:'ios-lightbulb',
        },
        {
          tb_id:'5',
          tr_value:'培训文档',
          col_span:'6',
          icon:'ios-calendar-outline'
        },
        {
          tb_id:'6',
          tr_value:'质检制度',
          col_span:'6',
          icon:'ios-star-half'
        },
      ]
    }
  }

}
</script>
<style scoped>
.tools{
  width: 100%;
  height: 765px;
}
table{
  width: 100%;
}
table.altrowstable {
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
}
table.altrowstable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
table.altrowstable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
  font-size: 14px;
}
.oddrowcolor{
  background-color:#d4e3e5;
}
.evenrowcolor{
  background-color:#c3dde0;
}
</style>
