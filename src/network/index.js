import Vue from 'vue'
import axios from 'axios'

// const yyBaseURL = 'http://192.168.1.108:8080'
const yyBaseURL = 'https://www.gdutcatming.top:8888'

const yyTimeout = 60000

export function yyRequest(config) {
    const instance = axios.create({
        baseURL: yyBaseURL,
        timeout: yyTimeout,
    })

    // http response 拦截器
    instance.interceptors.response.use(
        response => {
            //拦截响应，做统一处理
            if (response.data.code === 500000) {
                return response.data
            } else {
                throw response.data
            }
        },
        //接口错误状态处理，也就是说无响应时的处理
        error => {
            return Promise.reject(error) // 返回接口返回的错误信息
        })
    
    // 返回promise实例
    return instance(config)
}

Vue.prototype.$yyRequest = yyRequest