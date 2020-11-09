import {isObject} from './util'
function normalizeHeaderName(headers:any,name:any):void{
    console.log(1222)
    if(!headers){
        return
    }
    console.log(222)
    Object.keys(headers).forEach((item:any)=>{
        if(item!==name&&item.toUpperCase()===name.toUpperCase()){
            headers[name]=headers[item]
            delete headers[item]
        }
    })
}
export function processHeaders(headers:any,data:any){
    normalizeHeaderName(headers, 'Content-Type')
    if(isObject(data)){
        console.log(data,123)
        if(headers&&!headers['Content-Type']){
            headers['Content-Type']='application/json;charset=utf-8'
        }
    }
    
    return headers
}