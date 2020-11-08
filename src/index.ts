import { bulidURL } from './helpers/url'
import {AxiosConfig} from './types'
import xhr from './xhr'
function axios (config:AxiosConfig):void{
    processConfig(config)
    xhr(config)
}
function processConfig (config: AxiosConfig): void {
    config.url = transformUrl(config)
  }
  
function transformUrl (config: AxiosConfig): string {
    const { url, params } = config
    return bulidURL(url, params)
}
export default axios