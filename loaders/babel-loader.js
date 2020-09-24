const babel = require('@babel/core')
const loaderUtils = require('loader-utils')

function loader (source) {
  const options = loaderUtils.getOptions(this)  // 通过loader工具获取options，options里面有presets预设
  const callback = this.async() //  异步返回需要用到 async 函数
  //  babel 转换代码
  babel.transform(source, {
    ...options,
    sourceMaps: true,  //  // 是否设置sourceMap 还需要在webpack.config.js中配置 devtool: 'source-map'
    filename: this.resourcePath.split('/').pop() //  `source-map`指定名字
  }, (err, result) => {
    const { code, map } = result
    callback(err, code, map)  //  // 异步 参数（错误，转化后的代码，sourceMap）
  })
}

module.exports = loader