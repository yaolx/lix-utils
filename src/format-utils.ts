
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
