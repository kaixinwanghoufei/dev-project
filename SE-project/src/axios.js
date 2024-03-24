// 引入axios,外部API
import axios from 'axios';//发送HTTP请求
import router from '@/router';//处理响应错误跳转页面
import Vue from 'vue'//导入vue库

// export const baseURL = '/';
export const baseURL = 'http://localhost:8081';

// 创建实例
const instance = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL,
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000 * 10, // 默认值是 `0` (永不超时)
  // 自定义请求头
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,
});

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    if(error.response.status == 500){
      Vue.prototype.$message.error("请登录");
      router.push({
        path: "/loginb",
        query: {
        },
      },()=>{},()=>{});
      return ;
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 导出request
export default function request({
  method = 'get', // 请求方式 默认get
  url = '', // 地址
  data = {}, // post参数
  params = {}, // get参数
}) {
  return instance({
    method,
    url,
    data,
    params,
  });
}
