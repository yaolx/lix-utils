import { isString, last } from 'lodash'

/**
 * 将url前缀地址转换为 // 自适应形式
 * 例如 'http://www.baidu.com' => '//www.baidu.com',  'https://www.baidu.com' => '//www.baidu.com'
 *
 * @param url url地址
 */
export function translatAdpaterUrlProtocl(url: string | undefined) {
  return isString(url) ? url.replace(/^http(s?):\//, '/') : url
}

export function resolvePathFileExt(url: string) {
  const path = url.replace(/\?[\s\S]+/, '')
  const lastSplitPath = last(path.split('/'))

  if (lastSplitPath && lastSplitPath.indexOf('.') > -1) {
    const extMatcher = lastSplitPath.match(/\.[a-zA-Z0-9.]+/)
    if (extMatcher) {
      return extMatcher[0]
    }
  }

  return ''
}
