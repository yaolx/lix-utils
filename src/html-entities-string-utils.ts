const ENCODE_ENTITIES_MAPPER: { [key: string]: string } = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;'
}

const DECODE_ENTITIES_INDEX_MAPPER: { [key: string]: string } = {
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&nbsp;': ' '
}

/**
 * 输入的目标串将其进行html entities的转换，目前只支持
 * ['<', '>', '&', ' '] 最后一个是空格
 *
 * @param text string 目标字符串
 */
export function encode(text: string) {
  if (!text || !text.length) {
    return ''
  } else {
    return text
      .replace(/<|>|&/g, (str) => {
        return ENCODE_ENTITIES_MAPPER[str]
      })
      .replace(' ', '&nbsp;')
  }
}

/**
 * 输入的目标串，将其中的 html entities 进行转换成一般的文本，目前只支持
 * ['&lt;', '&gt;', '&amp;', '&nbsp;'] 最后一个是空格
 *
 * @param text string 目标字符串
 */
export function decode(text: string) {
  if (!text || !text.length) {
    return ''
  } else {
    return text
      .replace(/&[a-zA-Z]+;/g, (str) => {
        return DECODE_ENTITIES_INDEX_MAPPER[str]
      })
  }
}

/**
 * 将字符串给一个dom元素，获取存入后获取出来的数据结果
 * 经常用于editor富文本中
 * 在数据设置到富文本中前提供一种相同环境的转换
 *
 * @param text string
 */
export function valueOfHtmlElement(text: string) {
  const element = document.createElement('div')
  element.contentEditable = 'true'
  element.innerHTML = text

  return element.innerHTML
}
