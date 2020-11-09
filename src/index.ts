import { bulidURL } from './helpers/url'
import {AxiosConfig} from './types'
import xhr from './xhr' 
import {transformData} from './helpers/data'
function axios (config:AxiosConfig):void{
    processConfig(config)
    xhr(config)
}
function processConfig (config: AxiosConfig): void {
    config.url = transformUrl(config)
    config.data=transformRequsetData(config)
  }
  
function transformUrl (config: AxiosConfig): string {
    const { url, params } = config
    return bulidURL(url, params)
}
function transformRequsetData(config: AxiosConfig){
    return transformData(config.data)
}
export default axios