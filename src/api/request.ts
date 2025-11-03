import axios from 'axios';
import { RequestWrapper,type TSchema } from './pre_request';
import Token from './tokener';


const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}/api/`,
  timeout: 5 * 60 * 1000
})

instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = "application/json"
    config.headers['Authorization'] = `Bearer ${Token.get().api_token}`
    return config
  },
  error => {
    console.error('request error:', error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const data = response.data ?? {}
    const message = data.msg ?? data.message ?? response.statusText 
    if (response.status !== 200) {
      return Promise.reject(new Error(message ?? 'there were error for the server, have a try later please'))
    }else {
      data.message = message
    }
    return data
  },
  error => {
    console.error('response error:', error)
    return Promise.reject(error)
  }
)


interface IRequest {
  (url: string, param?: TObject | FormData, withToken?: boolean, parseSchem?: TSchema): Promise<TResponse<TObject>>
}
type TRequester = {
  [key:string]: IRequest;
}

const Requester: TRequester = {
  get: async(url, param, withToken, parseSchem) => await RequestWrapper((url,param) => instance.get(url, { params: param }),url,param,withToken,parseSchem),
  post: async (url, param, withToken, parseSchem) => await RequestWrapper(async(url,param) => await instance.post(url, param),url,param,withToken,parseSchem),
  patch: async (url, param, withToken, parseSchem) => await RequestWrapper(async(url,param) => await instance.patch(url, param),url,param,withToken,parseSchem),
  delete: async (url, param, withToken, parseSchem) => await RequestWrapper(async(url,_param) => await instance.delete(url),url,param,withToken,parseSchem),
}

export default Requester
