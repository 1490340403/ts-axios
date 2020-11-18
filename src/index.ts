import { bulidURL} from './helpers/url'
import {AxiosConfig,AxiosPromise,AxiosResponse} from './types'
import xhr from './xhr' 
import {transformData} from './helpers/data'
import {processHeaders} from './helpers/headers'
import {parseData } from './helpers/util'
function axios (config:AxiosConfig):AxiosPromise{
    processConfig(config)
    return  xhr(config).then(res=>{
        return transformResData(res)
    })
}
function processConfig (config: AxiosConfig): void {
    config.url = transformUrl(config)
    config.headers=transformHeaders(config)
    config.data=transformRequsetData(config)
  }
  
function transformUrl (config: AxiosConfig): string {
    const { url, params } = config
    return bulidURL(url, params)
}
function transformRequsetData(config: AxiosConfig){
    return transformData(config.data)
}
function transformHeaders(config: AxiosConfig){
    const {headers={},data}=config
    return processHeaders(headers,data)
}
function transformResData(res: AxiosResponse):AxiosResponse {
    res.data = parseData(res.data)
    return res
  }
export default axios