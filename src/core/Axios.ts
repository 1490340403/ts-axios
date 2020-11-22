import {AxiosConfig,AxiosPromise,AxiosResponse,Method, RejectedFn, ResolvedFn} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
interface Interceptors {
    request: InterceptorManager<AxiosConfig>
    response: InterceptorManager<AxiosResponse>
  }
  interface PromiseChain {
    resolved: ResolvedFn | ((config: AxiosConfig) => AxiosPromise)
    rejected?: RejectedFn
  }
export default class Axios{
    interceptors: Interceptors
    
    constructor() {
        this.interceptors = {
          request: new InterceptorManager<AxiosConfig>(),
          response: new InterceptorManager<AxiosResponse>()
        }
      }
    request(url:any,config?:any):AxiosPromise{
        if(typeof url =='string'){
            if(!config){
                config={}
            }
            config.url=url
        }else{
            config = url
        }
        const chain: PromiseChain[] = [{
            resolved: dispatchRequest,
            rejected: undefined
          }]
        
          this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
          })
        
          this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
          })
        
          let promise = Promise.resolve(config)
        
          while (chain.length) {
            const { resolved, rejected } = chain.shift()!
            promise = promise.then(resolved, rejected)
          }
        
          return promise
       // return dispatchRequest(config)
    }
    get(url:string,config:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData('get',url,config)
    }
    delete(url:string,config:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData('delete',url,config)
    }
    head(url:string,config:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData('head',url,config)
    }
    options(url:string,config:AxiosConfig):AxiosPromise{
        return this._requestMethodWithoutData('options',url,config)
    }
    post(url:string,data?: any,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithData('post',url,data,config)
    }
    put(url:string,data?: any,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithData('put',url,data,config)
    }
    patch(url:string,data?: any,config?:AxiosConfig):AxiosPromise{
        return this._requestMethodWithData('patch',url,data,config)
    }
     _requestMethodWithoutData(method:Method,url:string,config:AxiosConfig){
        return this.request({...config,method,url})
    }
    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosConfig) {
        return this.request({...config,method,url,data})
      }
}