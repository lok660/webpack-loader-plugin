const loaderUtils = require('loader-utils')

function loader (source) {
  // 生成文件名称：  例 f39f46fb006762fe76521230792edc1a.gif
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source })

  // 发射文件到dist目录
  this.emitFile(filename, source)

  return `module.exports="${filename}"`
}

// 图片改成二进制模式buffer
loader.raw = true

module.exports = loader