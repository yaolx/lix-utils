import { isEmpty } from 'lodash'

/**
 * 查询接口需要对keyword参数（包含%,\）特殊处理
 */
export function urlParamsFormat(value: string) {
  if (isEmpty(value)) {
    return value
  }
  return value.replace(/([\\'_%])/g, '\\$1')
}
