import { isFunction } from 'lodash'
// 将图片转换为Base64
export function imgConvertBase64(url: string, callback: Function) {
  let canvas: any = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = () => {
    canvas.height = img.height
    canvas.width = img.width
    ctx.drawImage(img, 0, 0)
    const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
    const dataURL = canvas.toDataURL('image/' + ext)
    callback(dataURL)
    canvas = null
    img.src = url
  }
}
/**
 * base64转为file
 * @param  dataurl string 地址
 * @param  filename string 文件名称
 */
function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',') || []
  const mime = arr[0].match(/:(.*?);/)
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime ? mime[1] : '' })
}
/**
 * url图片地址转file
 * @param url string 地址
 * @param Function callback 回调方法
 */
export function urlToFile(url: string, callback: Function) {
  imgConvertBase64(url, (imgBase64: string) => {
    const imgFile = dataURLtoFile(imgBase64, 'avatar')
    if (isFunction(callback)) {
      callback(imgFile)
    }
  })
}
