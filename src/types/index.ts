import InterceptorManager from "../core/interceptorManager";

export type Method='get'|'GET'|'post'|'POST'|'delete'|'DELETE'|'HEAD'|'head'
|'options'|'OPTIONS'|'PUT'|'put'|'patch'|'PATCH'|'request'|'REQUEST'
export interface AxiosConfig{
    url?:string;
    method?:Method;
    data?:any;
    params?:any;
    headers?:any;
    timeout?:number;
    responseType?:XMLHttpRequestResponseType
}
export interface AxiosResponse<T=any>{
    data:T;
    status:number;
    statusText:string;
    headers:any;
    config:AxiosConfig;
    request:any;
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}
export interface AxiosError extends Error {
    config: AxiosConfig
    code?: string
    request?: any
    response?: AxiosResponse
    isAxiosError: boolean
  }
  
  export interface Axios {
    interceptors: {
      request: InterceptorManager<AxiosConfig>
    response: InterceptorManager<AxiosResponse>
    }
    request<T = any>(url:any,config?: any): AxiosPromise<T>
    get<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
    delete<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
    head<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
    options<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
    post<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
    put<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
    patch<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>
  }
  export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosConfig): AxiosPromise<T>
    <T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
  }
  export interface AxiosInterceptorManager<T>{
    use(resolved:ResolvedFn<T>,rejected?:RejectedFn):number
    eject(id:number):void
  }
  export interface ResolvedFn<T=any>{
    (val:T):T|Promise<T>
  }
  export interface RejectedFn{
    (err:any):any
  }