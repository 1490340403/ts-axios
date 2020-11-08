import {AxiosConfig} from './types'
export default function xhr (config:AxiosConfig):void{
    const {method='get',data=null,url}=config
    const request= new XMLHttpRequest()
    request.open(method.toLocaleUpperCase(),url,true)
    request.send(data)
}