export default [
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './User/Login', name: '登录' }],
  },
  /*{ path: '/welcome', icon: 'smile', component: './Welcome',name:'仪表盘'  },
  {
    path: '/admin',
    icon: 'crown',
    name:'系统管理',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page'},
      { path: '/admin/sub-page', component: './Admin',name:'二级页面' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList',name:'规则表' },*/
  {
    path: '/user-business',
    icon: 'crown',
    name: '客户业务',
    routes: [
      { path: '/user-business', redirect: '/user-business/works' },
      { path: '/user-business/works', component: './Works', name: '工作信息' },
      { path: '/user-business/work_type', component: './WorkType', name: '工作类型' },
    ],
  },
  { path: '/', redirect: '/user-business' },
  { path: '*', layout: false, component: './404' },
];
