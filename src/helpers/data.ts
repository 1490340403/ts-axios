import {isObject} from './util'
export function transformData(data:any):any{
    if(isObject(data)){
        return JSON.stringify(data)
    }
    return data
}