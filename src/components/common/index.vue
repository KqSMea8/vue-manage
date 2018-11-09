<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
  <BackTop :height="100" :bottom="120">
          <div class="top">返回顶端</div>
  </BackTop>
    <Row type="flex">
        <Col :span="spanLeft" class="layout-menu-left">
            <Menu :active-name="setActive" class="layout-menu-left" width="auto" @on-select="routeTo">
                <div class="layout-logo-left">
                    <h3>Technical</h3>
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
                    <Icon type="md-walk" size="30"></Icon>
                </Button>
                <div class="layout-icon-right">
                <Icon type="logo-windows" />
                <Icon type="logo-apple" />
                <Icon type="logo-freebsd-devil" />
                <Icon type="ios-wifi" />
                欢迎您,{{user}} of {{group}}
                <Button size="small" shape="circle" icon="md-log-out" @click="logout"></Button>
              </div>
            </div>
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb-item>首页</Breadcrumb-item>
                    <Breadcrumb-item>导航</Breadcrumb-item>
                    <Breadcrumb-item>{{this.$route.name}}</Breadcrumb-item>
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
                2018.05&copyright*samoyed
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
                user: Cookies.get('nick_name'),
                uid:Cookies.get('id'),
                roles:Cookies.get('role'),
                group:Cookies.get('group'),
                spanLeft: 5,
                spanRight: 19,
                page: ['search','form','manage'],
                navdata:[],

            }
        },
        computed: {
            iconSize() {
                return this.spanLeft === 5 ? 15 : 24;
            },
            setActive() {
              return this.$route.path.replace('/','');
            }
        },
        created () {
          this.verify()
          this.doneMenuList()
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
                verify(){
                    if(typeof this.uid === "undefined"||this.uid===null||this.uid===''){
                        this.$router.push('/login')
                    }

                },
                doneMenuList () {
                  this.$api.get('/menu/init' , {role:this.roles}, r => {
                    this.navdata = r.data.data
                  })
                },
                logout () {
                  Cookies.set('user', '');
                  Cookies.set('pwd', '');
                  Cookies.set('id', '');
                  Cookies.set('nick_name', '');
                  Cookies.set('role', '');
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
    min-height: 720px;
    margin: 15px;
    overflow: scroll;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 5px 5px;
}

.layout-copy {
    text-align: center;
    padding: 3px 0 3px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #17233d;
    min-width: 80px;
    color: #fff;
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
    background: #17233d;
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
