const toString=Object.prototype.toString
export function isDate (val:any): val is Date{
    return toString.call(val)=='[object Date]'
}
export function isObject(val:any):val is Object{
    return toString.call(val)=='[object Object]'
}

export function parseHeader(headers:string):any{
    if(!headers){
        return
    }
    let parsed=Object.create(null)
    headers.split('\r\n').forEach(item=>{
       let [key,value]= item.split(':')
       if(!key){return}
       key=key.trim()
       parsed[key]=value
    })
    return parsed
}