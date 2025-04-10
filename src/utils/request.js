import axios from "axios";
import { ElMessage } from "element-plus";

// 创建axios实例
const service = axios.create({
  // TODO:开发环境移除baseURL，以便Mock可以正常工作
  // baseURL: import.meta.env.VITE_EDUX_SERVICE_API_URL || 'http://localhost:8005',
  timeout: 15000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 开发环境打印请求信息
    if (import.meta.env.DEV) {
      console.log("请求配置:", {
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    console.log("请求错误", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 如果后端返回的数据结构是 { code, data, message } 的格式，可以这样处理
    const res = response.data;

    // 开发环境打印响应信息
    if (import.meta.env.DEV) {
      console.log("响应数据:", res);
    }

    if (res.code && res.code !== 200) {
      ElMessage.error(res.message || "请求失败");
      return Promise.reject(new Error(res.message || "请求失败"));
    }
    return res; // 直接返回响应数据，简化调用方使用
  },
  (error) => {
    console.log("响应错误", error);
    ElMessage.error(error.message || "服务器异常");
    return Promise.reject(error);
  }
);

// 简化的API调用方法
export const createAPI = (
  url,
  method = "get",
  params = undefined,
  data = undefined
) => {
  if (import.meta.env.DEV) {
    // 移除可能的查询字符串，以便与Mock的精确路径匹配
    const cleanUrl = url.split('?')[0];
    console.log(`API请求: ${method.toUpperCase()} ${cleanUrl}`, { params, data });
  }
  
  let config = {};
  config.url = url;
  config.method = method;
  
  if (params) {
    config.params = params;
  }
  
  if (data) {
    config.data = data;
  }
  
  return service(config);
};

export default service;
