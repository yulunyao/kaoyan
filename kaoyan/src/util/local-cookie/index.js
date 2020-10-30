/* 用于判断electron状态下使用localstorage替换js-cookie */
import jscookie from 'js-cookie'
import localcookie from './local-cookie'

const isElectronApp = window.navigator.userAgent.indexOf('Electron') !== -1

export default isElectronApp ? localcookie : jscookie
