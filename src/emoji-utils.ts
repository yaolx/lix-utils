import { get } from 'lodash'
const DEFAULT_EMOTION_CDN = 'http://gcdncs.101.com/v0.1/static/recreation_chat_assets/smiley/default/{code}.gif'
/**
 * 富文本emoji表情渲染
 *
 * @export
 */
export function genEmojiText(text: string) {
  return text && text.replace(/\[sys:(\d+)\]/g, (item) => {
    const defaultEmotionCodeMacthes = item.match(/\[sys:(\d+)\]/) || []
    return `<img src='${DEFAULT_EMOTION_CDN.replace('{code}', get(defaultEmotionCodeMacthes, '[1]'))}' />`
  })
}

