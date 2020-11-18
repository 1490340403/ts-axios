import {AxiosConfig,AxiosPromise,AxiosResponse} from './types'
import {parseHeader} from './helpers/util'
export default function xhr (config:AxiosConfig):AxiosPromise{
  return new Promise((resolve)=>{
    const {method='get',data=null,url,headers,responseType}=config
    const request= new XMLHttpRequest()
    if(responseType)request.responseType=responseType
    
    request.open(method.toLocaleUpperCase(),url,true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
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
      resolve(response)
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