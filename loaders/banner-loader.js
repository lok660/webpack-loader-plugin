const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils') //  检验属性
const fs = require('fs')  //  异步

function loader (source) {
  const time = new Date().toLocaleString()
  const options = loaderUtils.getOptions(this)
  const callback = this.async() //  读取文件是异步

  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }

  validateOptions(schema, options, 'banner-loader') //  检验配置

  if (options.filename) {
    this.cacheable && this.cacheable()  //  使用缓存,推荐使用
    // this.cacheable(false) //  不用缓存
    this.addDependency(options, filename) //  自动添加依赖,这个模块文件变化webpack会自动打包

    fs.readFile(options.filename, 'utf8', function (err, data) {
      callback(err, `
        /**
         * ${data}
         * @time ${time}
         * **/
        ${source}`)
    })
  } else {
    callback(null, `/**${options.text}**/${source}`)
  }
}

module.exports = loader