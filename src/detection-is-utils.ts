import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import some from 'lodash/some'

/**
 * 检测传入的是否是非空的数组
 *
 * @export
 */
export function notEmptyArray(array: any[]) {
  return isArray(array) && array.length > 0
}

/**
 * 检测传入的是否是空字符串
 *
 * @export
 */
export function notEmptyString(str: any) {
  return isString(str) && str.length > 0
}

/**
 * 判断两个数组是否相等
 *
 * @export
 */
export function isArrayEqual(array0: any[], array1: any[]) {
  return array0 === array1 || (array0 && array1 && array0.length === array1.length && isEqual(array0, array1))
}

/**
 * 判断两个字符串是否相等，忽略大小写
 *
 * @export
 */
export function isEqualStringIgnoreCase(str0: string, str1: string) {
  return isString(str0) && isString(str1) && String(str0).toLocaleUpperCase() === String(str1).toLocaleUpperCase()
}

/**
 * 检测字符串 str 是否包含在 strings字符串数组中， 忽略大小写
 *
 * @export
 */
export function isIncludeStringIgnoreCase(strings: string[], str: string) {
  return some(strings, (s) => isEqualStringIgnoreCase(s, str))
}

/**
 * 检测是否是http协议
 *
 * @export
 */
export function isHttp(protocol = window.location.protocol) {
  return protocol === 'http:'
}

/**
 * 检测是否是https协议
 *
 * @export
 */
export function isHttps(protocol = window.location.protocol) {
  return protocol === 'https:'
}

/**
 * 检测当前传入的 str 字符串是否是一般概念上的 base64 后的编码
 */
export function isBase64String(str: string | undefined) {
  if (isString(str)) {
    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(str)
  }

  return false
}

/**
 * 检测传入的str字符串中是否包含中文字符
 *
 * @param str 目标字符串
 */
export function isContainChinese(str: string) {
  return String(str).match(
    /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uff1a\uff0c\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\uff01-\uff5e\u3000-\u3009\u2026]/
  )
}

/**
 * 传入的str字符串是否为纯中文字符串
 *
 * @param str 目标字符串
 */
export function isAllChinese(str: string) {
  return /^([\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uff1a\uff0c\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\uff01-\uff5e\u3000-\u3009\u2026])+$/g.test(str)
}
