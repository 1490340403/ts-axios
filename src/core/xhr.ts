import {AxiosConfig,AxiosPromise,AxiosResponse} from '../types'
import {parseHeader} from '../helpers/util'
import { createError } from '../helpers/error'
export default function xhr (config:AxiosConfig):AxiosPromise{
  return new Promise((resolve,reject)=>{
    const {method='get',data=null,url,headers,responseType,timeout}=config
    const request= new XMLHttpRequest()
    if(responseType)request.responseType=responseType
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toLocaleUpperCase(),url!,true)
    request.onerror = function handleError() {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }
    request.ontimeout=function handleTimeout() {
      reject(createError(
        `Timeout of ${config.timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      ))
    }
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      //获取响应头
      const responseHeaders =parseHeader(request.getAllResponseHeaders()) 
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    function handleResponse(response:AxiosResponse){
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
    }
    Object.keys(headers).forEach(item=>{
        if(data==null&&item.toLowerCase() === 'content-type'){
            delete headers[item]
        }else {
            request.setRequestHeader(item, headers[item])
          }
    })
    request.send(data)
  })
    
}