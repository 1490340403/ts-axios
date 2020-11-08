export type Method='get'|'GET'|'post'|'POST'|'delete'|'DELETE'|'HEAD'|'head'
|'options'|'OPTIONS'|'PUT'|'put'|'patch'|'PATCH'|'request'|'REQUEST'
export interface AxiosConfig{
    url:string;
    method?:Method;
    data?:any;
    params?:any;
}