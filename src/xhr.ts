import {AxiosConfig} from './types'
export default function xhr (config:AxiosConfig):void{
    const {method='get',data=null,url,headers}=config
    const request= new XMLHttpRequest()
    request.open(method.toLocaleUpperCase(),url,true)
    Object.keys(headers).forEach(item=>{
        console.log(headers[item],'headers[item]')
        if(data==null&&item.toLowerCase() === 'content-type'){
            delete headers[item]
        }else {
            
            request.setRequestHeader(item, headers[item])
          }
    })
    request.send(data)
}