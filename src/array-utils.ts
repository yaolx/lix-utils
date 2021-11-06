/**
 * 根据传入的 predicate 拆分出不同的array分组，将其分成符合的和不符合的
 *
 * @param array any[] 任意数组
 * @param predicate (element: any, index?: number, array?: any[]) => boolean 检测函数
 */
export function diverterToArrays(array: any[], predicate: (element: any, index?: number, array?: any[]) => boolean) {
  const matches = []
  const notMatches = []

  if (!Array.isArray(array)) {
    throw new TypeError('diverterToArrays: please input array')
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('diverterToArrays: predicate is not function')
  }

  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (predicate(element, index, array)) {
      matches.push(element)
    } else {
      notMatches.push(element)
    }
  }

  return [matches, notMatches]
}

