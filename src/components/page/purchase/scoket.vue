<template>
<div> 
    <center><h4>幽灵聊天室</h4></center>
  <Card>
    <div> 
      <div v-html="chatlist"></div>
      <Input v-model="msg" style="width:850px" clearable placeholder="Enter project name here"></Input>        
      <Button type="primary" @click="threadPoxi()" icon="plus">发送消息</Button>      

     </div>   
  </Card>
  </div> 
</template>

<script>
import Cookies from 'js-cookie'
export default{     
  data () {           
    return {
      nick_name:Cookies.get('nick_name'), 
      chatlist:'',  
      msg:'',
      websocket: null,      
     }     
  },
  methods:{
    threadPoxi(){ 
      // 实际调用的方法 如果ws已经连接则直接发送消息；如正在开启状态，则等待300毫秒，再发送消息；若未开启 ，则等待500毫秒，再发送消息。
     //参数
      const agentData =this.msg;           
      //若是ws开启状态           
      if (this.websocket.readyState === this.websocket.OPEN) { 
         this.websocketsend(agentData)           
       }
       // 若是 正在开启状态，则等待300毫秒
       else if (this.websocket.readyState === this.websocket.CONNECTING) {      
            let that = this;
            //保存当前对象this
            setTimeout(function () {   
             that.websocketsend(agentData)     
            },  300); 
       }
       // 若未开启 ，则等待500毫秒
       else {
         this.initWs();
         let that = this;//保存当前对象this
         setTimeout(function () {
           that.websocketsend(agentData)               
          }, 500);           
        }       
    },
    initWs () {
       if ('WebSocket' in window) {
         this.websocket = new WebSocket("ws://10.110.2.31:8080/scoket/chat/"+this.nick_name);
      } else {
        alert('Sorry, websocket not supported by your browser.')  
      }
    //数据接收
    this.websocket.onmessage = this.websocketonmessage;                            
    //this.websocket.close();       
   },
   websocketonmessage(e){
       //console.log(e);
     if(this.chatlist==''||this.chatlist==null){
       this.chatlist=this.formatDate(new Date())+" ※ "+e.data+"。";   
     }else{
         this.chatlist=this.chatlist+"</br>"+this.formatDate(new Date())+" ※ "+e.data+"。";   
     }

    },
  websocketsend(agentData){//数据发送
     this.websocket.send(agentData);
   },
   websocketclose(e){  //关闭 
     this.websocket.close();           
     console.log("connection closed (" + e.code + ")");       
   },
   formatDate(now)   {
              var   year=now.getFullYear();
              var   month=now.getMonth()+1;
              var   date=now.getDate();
              var   hour=now.getHours();
              var   minute=now.getMinutes();
              var   second=now.getSeconds();
              return   year+"-"+(month=month<10?("0"+month):month)+"-"+(date=date<10?("0"+date):date)+" "+(hour=hour<10?("0"+hour):hour)+":"+(minute=minute<10?("0"+minute):minute)+":"+(second=second<10?("0"+second):second);
   }
  },
   created(){      
       this.initWs();     
  }
}
</script>
