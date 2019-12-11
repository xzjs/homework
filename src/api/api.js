
import axios from 'axios'
import qs from 'qs'

// import router from '@/router'

// 响应时间
// axios.defaults.timeout = 5000;

// 设置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 配置cookie
// axios.defaults.withCredentials = true

//axios.baseURL='http://zypt.exejk12.com:8787';

//axios.defaults.baseURL = process.env.API_ROOT;
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  err => {
    // console.log('错误的传参', 'fail')
    // Message.error('错误的传参')
    return Promise.reject(err)
  }
);

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res.data
    } else if (res.data.code === 401) {
      // router.replace({ name: 'Login' })
    } else {
      return Promise.reject(res)
    }
  },
  err => {
    // console.log('异常：' + err.message)
    // Message.error('接口异常：' + err.message)
    return Promise.reject(err.message)
  }
)

export default axios
