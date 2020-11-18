import { bulidURL } from './helpers/url'
import {AxiosConfig,AxiosPromise} from './types'
import xhr from './xhr' 
import {transformData} from './helpers/data'
import {processHeaders} from './helpers/headers'
function axios (config:AxiosConfig):AxiosPromise{
    processConfig(config)
    return  xhr(config)
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
export default axios