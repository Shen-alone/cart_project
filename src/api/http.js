import  axios from 'axios'
import QS from 'qs'

axios.defaults.baseURL = 'http://localhost:711/'

// 设置请求超时
axios.defaults.timeout = 10000
// post请求的时候在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use(
        config => {
            return config
        },
        error => {
            return Promise.error(error)
        }
    )


axios.interceptors.response.use(
    res => {
        if(res.status == 200){
            return Promise.resolve(response)
        }else{
            return  Promise.reject(response)
        }
    },
    error => {
        return Promise.reject(error.response)
    }
)

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}