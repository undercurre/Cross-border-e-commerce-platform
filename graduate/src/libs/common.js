/**
 * base64转blob
 * @param {*} base64对象
 */
export function dataUrlToBlob(dataUrl) {
  let mimeString = dataUrl
    .split(',')[0]
    .split(':')[1]
    .split(';')[0] // mime类型
  let byteString = atob(dataUrl.split(',')[1]) //base64 解码
  let arrayBuffer = new ArrayBuffer(byteString.length) //创建缓冲数组
  let intArray = new Uint8Array(arrayBuffer) //创建视图

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}
/**
 * blob转base64
 * @param {*} blob blob对象  callback 回调函数
 */
export function blobToDataURI(blob, callback) {
  var reader = new FileReader()
  reader.onload = function(e) {
    callback(e.target.result)
  }
  reader.readAsDataURL(blob)
}
/**
 * blob转file
 * @param {*} theBlob blob对象  fileName 文件名
 */
export function blobToFile(theBlob, fileName) {
  let file = new File([theBlob], fileName, {
    lastModified: new Date()
  })
  return file
}
/**
 * 图片压缩
 * @param  image 原始图片 ratio 压缩比(0-1)
 * @return  返回一个base64编码的数据
 */
export function compress(image, ratio = 0.3) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  // let initSize = image.src.length
  let { width } = image
  let { height } = image
  canvas.width = width
  canvas.height = height
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(image, 0, 0, width, height)

  // 进行最小压缩0.1
  let compressData = canvas.toDataURL('image/jpeg', ratio)
  return compressData
}
