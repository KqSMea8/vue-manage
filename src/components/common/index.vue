<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
  <BackTop :height="100" :bottom="120">
          <div class="top">返回顶端</div>
  </BackTop>
    <Row type="flex">
        <Col :span="spanLeft" class="layout-menu-left">
            <Menu :active-name="setActive" theme="dark" width="auto" @on-select="routeTo">
                <div class="layout-logo-left">
                    <h3>QA Systematic</h3>
                </div>
                <li v-for="nav in navdata">
                      <Menu-item v-bind:name="nav.menu_name">
                          <Icon v-bind:type="nav.icon" :size="iconSize"></Icon>
                          <span class="layout-text">{{nav.nav_name}}</span>
                      </Menu-item>
               </li>
            </Menu>
        </Col>
        <Col :span="spanRight">
            <div class="layout-header">
                <Button type="text" @click.native="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </Button>
                <div class="layout-icon-right">
                <Icon type="social-sass"></Icon>
                <Icon type="social-apple"></Icon>
                <Icon type="social-tux"></Icon>
                <Icon type="social-twitter"></Icon>
                <Icon type="social-freebsd-devil"></Icon>
                <Icon type="social-rss"></Icon>
                of  {{user}}
                <Button type="ghost" size="small" shape="circle" icon="log-out" @click="logout"></Button>
              </div>
            </div>
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb-item>Menu</Breadcrumb-item>
                    <Breadcrumb-item>Nav</Breadcrumb-item>
                    <Breadcrumb-item>{{this.$route.path.replace('/','')}}</Breadcrumb-item>
                </Breadcrumb>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">
                    <transition mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
            <div class="layout-copy">
                2017.12&copyright*samoyed
            </div>
        </Col>
    </Row>
</div>

</template>

<script>
import Cookies from 'js-cookie'
export default {

    data() {
            return {
                user: Cookies.get('user'),
                spanLeft: 5,
                spanRight: 19,
                page: ['search','form','manage'],
                navdata:[
                  {
                    id:'nav0',
                    menu_name:'notice',
                    nav_name:'Notice',
                    icon:'android-notifications-none'
                  },
                  {
                    id:'nav1',
                    menu_name:'search',
                    nav_name:'Search',
                    icon:'search'
                  },
                  {
                    id:'nav2',
                    menu_name:'increase',
                    nav_name:'Increase',
                    icon:'plus-round'
                  },
                  {
                    id:'nav3',
                    menu_name:'mavon',
                    nav_name:'Mavon',
                    icon:'edit'
                  },
                  {
                    id:'nav4',
                    menu_name:'markdown',
                    nav_name:'Markdown',
                    icon:'document-text'
                  },
                  {
                    id:'nav5',
                    menu_name:'manage',
                    nav_name:'Manage',
                    icon:'upload'
                  },
                  {
                    id:'nav6',
                    menu_name:'transfer',
                    nav_name:'Transfer',
                    icon:'document-text'
                  }
                ]


            }
        },
        computed: {
            iconSize() {
                return this.spanLeft === 5 ? 14 : 24;
            },
            setActive() {
              return this.$route.path.replace('/','');
            }
        },
        created () {
          this.noticeOfAdmin()
        },
        methods: {
            toggleClick() {
                    if (this.spanLeft === 5) {
                        this.spanLeft = 2;

                        this.spanRight = 22;
                    } else {
                        this.spanLeft = 5;
                        this.spanRight = 19;
                    }
                },
                routeTo(e) {
                    //console.log(e);
                    this.$router.push(e);
                },
                noticeOfAdmin(){
                    if(typeof this.user === "undefined"||this.user===null||this.user===''){
                        this.$router.push('/login')
                    }else{
                        if(this.user==='admin'){
                          this.$api.get('/notice/count' , null, r => {
                            let count= r.data.data
                            this.$Notice.open({
                                title: 'Notice',
                                desc: '有'+count+'条公告需要您查看',
                                duration: 3
                            })
                          })

                        }

                    }
                },
                logout () {
                  Cookies.set('user', '');
                  Cookies.set('password', '');
                  this.$router.push('/login')
                }
        }
}

</script>
<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 600px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 20px 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 10px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
    /*min-width: 100px;*/
}

.layout-header {
    height: 45px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}
.layout-icon-right{
  margin:0 auto;
  text-align:center;
  margin-top: 10px;
  float: right;
  margin-right: 15px;
  padding-right: 5px;
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    line-height: 30px;
    color: white;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-hide-text .layout-text {
    display: none;
}

.ivu-col {
    transition: width .2s ease-in-out;
}
.top{
       padding: 10px;
       background: rgba(0, 153, 229, .7);
       color: #fff;
       text-align: center;
       border-radius: 2px;
   }
</style>
