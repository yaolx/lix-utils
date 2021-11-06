/**
 * 根据浏览器用户代理字符串， 获得当前浏览器版本号
 *
 * @param userAgent 浏览器代理字符串
 */
export function getIEVersion(userAgent: string): number | undefined {
  const msie = userAgent.indexOf('MSIE ')
  /**
   * IE10- 以下版本
   */
  if (msie > 0) {
    return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10)
  }

  /**
   * IE11 版本
   */
  const trident = userAgent.indexOf('Trident/')
  if (trident > 0) {
    const rv = userAgent.indexOf('rv:')
    return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10)
  }

  /**
   * IE12 Edge 版本
   */
  const edge = userAgent.indexOf('Edge/')
  if (edge > 0) {
    return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10)
  }
}

/**
 * 是否IE9及其以下版本
 *
 * @param userAgent 用户代理字符串
 */
export function isIE9Lower(userAgent: string) {
  const version = getIEVersion(userAgent)
  return version && version <= 9
}

/**
 * 是否IE10及其以下版本
 *
 * @param userAgent 用户代理字符串
 */
export function isIE10Lower(userAgent: string) {
  const version = getIEVersion(userAgent)
  return version && version <= 10
}
