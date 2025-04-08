import Mock from 'mockjs'
// 1.拦截的请求地址
// 2.请求方式
// 3.返回数据

import HomeApi from './mockData/home'

Mock.mock('/api/user/plan', 'get', HomeApi.getTableData)