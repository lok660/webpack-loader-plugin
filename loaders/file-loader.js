const loaderUtils = require('loader-utils')

function loader (source) {
  //  生成文件名称: 如f39f46fb006762fe76521230792edc1a.png
  const filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source })

  //  发生文件到 dist目录
  this.emitFile(filename, source)

  return `module.exports=${filename}`

}
//  图片改成二级制buffer
loader.raw = true

module.exports = loader