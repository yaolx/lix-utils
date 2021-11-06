import { Base64 } from 'js-base64'
import { findKey, isString, startsWith, values } from 'lodash'

import { Authorization } from './constant'
import { isBase64String, notEmptyString } from './detection-is-utils'
import { resolveQuery } from './url-query-parser-utils'

export interface CombineQuery {
  __mac?: string
  auth?: string
  access_token?: string
  mac_key?: string
}

export interface TokenParam {
  access_token: string
  mac_key: string
}

export interface AccessTokenSenseable {
  isAccessTokenMode: () => boolean
}

const MAC_TOKEN_KEYS = {
  MAC: '__mac',
  AUTH: 'auth'
}

const ACCESS_TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  MAC_KEY: 'mac_key'
}

/**
 * MacToken认证转换工具
 */
export class MacTokenParser implements AccessTokenSenseable {
  public static AUTHORIZATION_PREFIX_STR = `${Authorization}: `
  private _value: string
  public constructor(macTokenStr: string) {
    this._value = macTokenStr
  }
  public value() {
    return this._value
  }
  public isAccessTokenMode() {
    return false
  }
  public binaryWrapperInvoker(invoker: (macTokenStr: string) => string) {
    const value = this._value
    const is64 = isBase64String(value)
    if (is64) {
      const invokerReturnValue = invoker.call(this, Base64.atob(value))
      this._value = Base64.btoa(invokerReturnValue)
    } else {
      this._value = invoker.call(this, value)
    }
    return this
  }
  public noBase64() {
    const value = this._value
    if (isBase64String(value)) {
      // 如果是Base64，就转换成非 Base64
      this._value = Base64.atob(value)
    }
    return this
  }
  public base64() {
    const value = this._value
    if (!isBase64String(value)) {
      // 如果没有 Base64， 就转换成 Base64
      this._value = Base64.btoa(value)
    }
    return this
  }
  /**
   * 确保mac token前置是符合UCSDK下的UCKey， 即有"Authorization: "的前置
   */
  public authorizationPreix() {
    return this.binaryWrapperInvoker((macTokenStr) => {
      let returnMackTokenStr = macTokenStr
      if (!startsWith(macTokenStr, MacTokenParser.AUTHORIZATION_PREFIX_STR)) {
        returnMackTokenStr =
          MacTokenParser.AUTHORIZATION_PREFIX_STR + macTokenStr
      }
      return returnMackTokenStr
    })
  }
  /**
   * 确认mac token中是不包含 Authorization: 这个前缀的（该前缀是 UCKey 生成时使用的）
   */
  public noAuthorizationPrefix() {
    return this.binaryWrapperInvoker((macTokenStr) => {
      let returnMackTokenStr = macTokenStr
      if (startsWith(macTokenStr, MacTokenParser.AUTHORIZATION_PREFIX_STR)) {
        returnMackTokenStr = macTokenStr.replace(
          MacTokenParser.AUTHORIZATION_PREFIX_STR,
          ''
        )
      }
      return returnMackTokenStr
    })
  }
}

/**
 * UC Token认证转换工具类
 */
export class AccessTokenParser implements AccessTokenSenseable {
  private _value: TokenParam | undefined
  public constructor(accessToken: string, mackey: string) {
    this._value = {
      access_token: accessToken,
      mac_key: mackey
    }
  }
  public isAccessTokenMode() {
    return true
  }
  public value() {
    return this._value
  }
}

export class URLTokenParser {
  public static isMacParamKey(paramKey: string) {
    return values(MAC_TOKEN_KEYS).indexOf(paramKey) > -1
  }
  public static hasTokenParams(param: object) {
    return (
      ACCESS_TOKEN_KEYS.ACCESS_TOKEN in param &&
      ACCESS_TOKEN_KEYS.MAC_KEY in param
    )
  }
  private combineQuery: CombineQuery
  public constructor(url: string) {
    this.combineQuery = resolveQuery(url)
  }

  public autoToMode() {
    return this.isAccessTokenMode()
      ? this.toAccessTokenMode()
      : this.toMacTokenMode()
  }

  public toAccessTokenMode() {
    const combineQuery = this.combineQuery
    if (this.isAccessTokenMode()) {
      // 若是 token 登录，则result字段放入token需要的字段
      return new AccessTokenParser(
        combineQuery.access_token as string,
        combineQuery.mac_key as string
      )
    }

    this.onError()
  }

  public toMacTokenMode() {
    const combineQuery = this.combineQuery

    // 在 combineQuery 中搜索定义的 mackeys 中
    const queryKey = findKey<CombineQuery>(
      combineQuery,
      (value, key) =>
        notEmptyString(value as string) && URLTokenParser.isMacParamKey(key)
    ) as string
    if (notEmptyString(queryKey as string)) {
      const macTokenStr = notEmptyString(combineQuery.__mac as string)
        ? combineQuery.__mac
        : combineQuery.auth
      if (isString(macTokenStr)) {
        return new MacTokenParser(macTokenStr)
      }
    }

    this.onError()
  }

  private onError() {
    throw new ReferenceError("Url-token-parser can't parser token")
  }

  private isAccessTokenMode() {
    const combineQuery = this.combineQuery
    return (
      URLTokenParser.hasTokenParams(combineQuery) &&
      combineQuery.access_token &&
      combineQuery.mac_key
    )
  }
}
