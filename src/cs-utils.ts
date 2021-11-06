import find from 'lodash/find'
import get from 'lodash/get'


/**
 * 资源地址替换
 * @export string
 */
export function genPreviewUrl(csHost: string, url: string) {
  return url && url.replace(/^cs_path:\$\{ref-path\}/, `${csHost}/v0.1/static`)
}

/**
 * 解析 cs_path:${ref-path} 的相对路径cs文件地址资源
 *
 * 换个名字好理解
 */
export const resolveCSRefPath = genPreviewUrl

/**
 * 异步获取媒体的播放时长
 *
 * @param tag 媒体标签，video表示视频，audio表示音频
 */
export function getVideoDuraction(tag: 'video' | 'audio'): (mediaUri: string) => Promise<number> {
  return (mediaUri: string) => {
    return new Promise((resolve) => {
      const elm = document.createElement(tag)
      elm.muted = true
      elm.style.height = '0'
      elm.src = mediaUri
      document.body.appendChild(elm)
      elm.addEventListener('loadedmetadata', () => {
        resolve(elm.duration)
        document.body.removeChild(elm)
      })
      /**
       * 加载异常的处理
       */
      elm.addEventListener('error', () => {
        resolve(-1)
        document.body.removeChild(elm)
      })
    })
  }
}

/**
 * 获取视频时长
 * @export
 * @returns number
 */
export function genVideoDuration(source: any) {
  const tiItem = find(source.ti_items, {
    ti_file_flag: 'source'
  })
  const duration = find(get(tiItem, 'custom_properties.requirements'), {
    name: 'Duration'
  })
  return duration && duration.value ? duration.value.replace(/[a-zA-Z]/g, '') : 0
}
