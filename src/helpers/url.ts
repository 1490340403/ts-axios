import {isDate,isObject} from './util'
function encode (val: string): string {
    return encodeURIComponent(val)
      .replace(/%40/g, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  }
export function bulidURL(url:string,params?:any){
    if(!params){
        return url
    }
    let part:string[]=[]
    Object.keys(params).forEach(key=>{
        let val=params[key]
        let values:string[]=[]
        if(val==''|| typeof val=='undefined'){
            return 
        }
        if(Array.isArray(val)){
            values=val
            key+=[]
        }else{
            values=[val]
        }
        values.forEach((val)=>{
            if(isDate(val)){
                val=val.toISOString()
            }else if(isObject(val)){
                val=JSON.stringify(val)
            } 
            part.push(`${encode(key)}=${encode(val)}`)
        })
    })
    let paramsData=part.join('&')
    if(paramsData){
        const index=url.indexOf('#')
        if(index!=-1){
            url=url.slice(0,index)
        }
        url+=(url.indexOf('?')==-1?'?':'&')+paramsData
    }
    return url
} 