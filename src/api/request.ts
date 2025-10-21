import axios from 'axios'

type TResponse = {
  data: any
  msg: string
}

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}/api/`,
  timeout: 5 * 60 * 1000
})

instance.interceptors.request.use(
  config => config,
  error => {
    console.error('request error:', error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const data = response.data || {}

    if (response.status !== 200) {
      return Promise.reject(new Error(data.msg ?? 'there were error for the server, have a try later please'))
    }

    return data
  },
  error => {
    console.error('response error:', error)
    return Promise.reject(error)
  }
)


const Requester = {
  get(url: string, param?: any): Promise<TResponse> {
    return instance.get(url, { params: param })
  },
  post(url: string, data?: any): Promise<TResponse> {
    return instance.post(url, data)
  }
}

export default Requester
