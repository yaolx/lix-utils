/**
 * 将数值进行缩进展示
 *
 * @export
 */
export function thousandAbbreviate(value: number) {
  if (!value) {
    return '0'
  }
  if (Math.abs(value) < 1000) {
    return `${value}`
  }
  return `${parseInt(`${value / 100}`, 10) / 10}K`
}

export interface ResObject<T> {
  [key: string]: T
}
/**
 * 清理数据，删除对象中属性值为空的参数（null, undefined, ''）
 * @param obj 任意对象
 */
export function deleteEmptyKey(obj: ResObject<any>) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key]
      if (typeof val === 'object') {
        deleteEmptyKey(obj[key])
      }
      if (!val) {
        delete obj[key]
      }
    }
  }
}
