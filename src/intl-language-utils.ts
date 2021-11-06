/**
 * 转换语言标识到标准形式, 典型的例如 en -> en-US ， 常用于ndr的多语言状态标识
 *
 * @param locale 语言language值，例如 en， en-US， zh-CN， zh-HK， zh-TW
 */
export function translateToStandardLocale(locale: string) {
  switch (locale.toLocaleLowerCase()) {
    case 'en':
      return 'en-US'
    default:
      return locale
  }
}

/**
 * 转换语言标识到兼容模式，常用于： 聚合后台， 翻译门户使用的en情况
 *
 * @param locale 语言language值， 例如 en， en-US， zh-CN等
 */
export function translateToCompatibilitiesLocale(locale: string) {
  switch (locale.toLocaleLowerCase()) {
    case 'en-us':
      return 'en'
    default:
      return locale
  }
}
