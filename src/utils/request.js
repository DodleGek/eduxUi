import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const service = axios.create({
  // TODO:开发环境移除baseURL，以便Mock可以正常工作
  // baseURL: import.meta.env.VITE_EDUX_SERVICE_API_URL || 'http://localhost:8005',
  timeout: 15000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 这里可以添加一些请求前的处理
    return config;
  },
  error => {
    console.log('请求错误', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 如果后端返回的数据结构是 { code, data, message } 的格式，可以这样处理
    const res = response.data;
    if (res.code && res.code !== 200) {
      ElMessage.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    return res; // 直接返回响应数据，简化调用方使用
  },
  error => {
    console.log('响应错误', error);
    ElMessage.error(error.message || '服务器异常');
    return Promise.reject(error);
  }
);

// 简化的API调用方法
export const createAPI = (
  url,
  method = 'get',
  params = undefined,
  data = undefined
) => {
  let config = {};
  config.url = url;
  config.method = method;
  
  if (params) {
    config.params = params;
  }
  
  if (method !== 'get' && data) {
    config.data = data;
  }
  
  return service(config);
};

export default service;