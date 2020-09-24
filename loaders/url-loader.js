const loaderUtils = require('loader-utils')
const mime = require('mime')  // 途是设置某种扩展名的文件的响应程序类型

function loader (source) {  // loader的参数就是源代码
  let { limit } = loaderUtils.getOptions(this)

  // 小文件 生成base64
  if (limit && limit > source.length) {
    return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  }

  // 大文件 使用file-loader 生成文件
  return require('./file-loader').call(this, source)
}

loader.raw = true
module.exports = loader