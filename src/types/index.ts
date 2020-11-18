export type Method='get'|'GET'|'post'|'POST'|'delete'|'DELETE'|'HEAD'|'head'
|'options'|'OPTIONS'|'PUT'|'put'|'patch'|'PATCH'|'request'|'REQUEST'
export interface AxiosConfig{
    url:string;
    method?:Method;
    data?:any;
    params?:any;
    headers?:any;
    responseType?:XMLHttpRequestResponseType
}
export interface AxiosResponse{
    data:any;
    status:number;
    statusText:string;
    headers:any;
    config:AxiosConfig;
    request:any;
}
export interface AxiosPromise extends Promise<AxiosResponse> {
}