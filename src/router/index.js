import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    mode: 'history',
    base:'/technical',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/search',
            component: resolve => require(['@/components/common/index.vue'], resolve),
            children: [{
                    path: '',
                    component: resolve => require(['@/components/common/search.vue'], resolve)
                },
                {
                    path: '/backof:id',
                    name:'分享搜索',
                    component: resolve => require(['@/components/common/search.vue'], resolve)
                },
                {
                    path: '/increase',
                    name:'新增分享',
                    component: resolve => require(['@/components/page/increase.vue'], resolve)
                },
                {
                    path: '/manage',
                    name:'文件上传',
                    component: resolve => require(['../components/page/manage.vue'], resolve)
                },
                {
                    path: '/markdown',
                    name:'MD编辑器',
                    component: resolve => require(['../components/editor/markdown/markdown-editor.vue'], resolve)
                },
                {
                    path: '/mavon',
                    name:'常用',
                    component: resolve => require(['../components/page/mavon.vue'], resolve)
                },
                {
                    path: '/link:id',
                    name:'分享详情',
                    component: resolve => require(['../components/page/question.vue'], resolve)
                },
                {
                    path: '/transfer',
                    name:'接口测试',
                    component: resolve => require(['../components/page/transfer.vue'], resolve)
                },
                {
                    path: '/notice',
                    name:'公共模块',
                    component: resolve => require(['../components/common/notice.vue'], resolve)
                },
                {
                    path: '/notice_detail:id',
                    name:'公告详情',
                    component: resolve => require(['../components/page/notice_detail.vue'], resolve)
                },
                {
                    path: '/achievements',
                    name:'业务列表',
                    component: resolve => require(['../components/page/achievements.vue'], resolve)
                },
                {
                    path: '/record:id',
                    name:'记录详情',
                    component: resolve => require(['../components/page/record_detail.vue'], resolve)
                },
                {
                    path: '/account',
                    name:'账号设置',
                    component: resolve => require(['../components/page/account.vue'], resolve)
                },
                {
                    path: '/purchase_create',
                    name:'采购计划申请',
                    component: resolve => require(['../components/page/purchase_create.vue'], resolve)
                },
                {
                    path: '/purchase_audit',
                    name:'采购计划审核',
                    component: resolve => require(['../components/page/purchase_audit.vue'], resolve)
                },
                {
                    path: '/purchase_revoke',
                    name:'采购计划释放',
                    component: resolve => require(['../components/page/purchase_revoke.vue'], resolve)
                },
                {
                    path: '/purchase_relation',
                    name:'采购计划-关联类型',
                    component: resolve => require(['../components/page/relation.vue'], resolve)
                },
                {
                    path: '/purchase_config',
                    name:'采购计划-业务配置',
                    component: resolve => require(['../components/page/purchase_config.vue'], resolve)
                },
                {
                    path: '/user',
                    name:'用户管理',
                    component: resolve => require(['../components/page/user.vue'], resolve)
                },
                {
                    path: '/create',
                    name:'采购计划申请-创建',
                    component: resolve => require(['../components/page/purchase/create.vue'], resolve)
                },
                {
                    path: '/audit:id',
                    name:'采购计划详情-审核',
                    component: resolve => require(['../components/page/purchase/audit.vue'], resolve)
                },
                {
                    path: '/view:id',
                    name:'采购计划详情-查看',
                    component: resolve => require(['../components/page/purchase/view.vue'], resolve)
                },
                {
                    path: '/system',
                    name:'系统设置',
                    component: resolve => require(['../components/page/purchase/system.vue'], resolve)
                },
                {
                    path: '/script',
                    name:'辅助工具集',
                    component: resolve => require(['../components/page/purchase/script.vue'], resolve)
                },
                {
                    path: '/duty:id',
                    name:'值班计划详情',
                    component: resolve => require(['../components/page/purchase/duty.vue'], resolve)
                },
                {
                    path: '/scoket',
                    name:'聊天室',
                    component: resolve => require(['../components/page/purchase/scoket.vue'], resolve)
                },
                {
                    path: '/car_init',
                    name:'车辆控购-单位初始化',
                    component: resolve => require(['../components/page/car/init.vue'], resolve)
                },
                {
                    path: '/car_stock',
                    name:'车辆控购-车辆入库',
                    component: resolve => require(['../components/page/car/stock.vue'], resolve)
                },

            ]
        },
        {
            path: '/login',
            name:'登陆',
            component: resolve => require(['@/components/common/login.vue'], resolve)
        },
    ]
})
