const toString=Object.prototype.toString
export function isDate (val:any): val is Date{
    return toString.call(val)=='[object Date]'
}
export function isObject(val:any):val is Object{
    return toString.call(val)=='[object Object]'
}
export function isString(val:any){
    return toString.call(val)=='[object String]'
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
export function parseData(data:any):any{
    if(isString(data)){
        try{
            data=JSON.parse(data)
            console.log(data)
        }catch{

        }
    }
    return data
}
export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
      ;(to as T & U)[key] = from[key] as any
    }
    return to as T & U
  }