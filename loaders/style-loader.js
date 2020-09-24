const loaderUtils = require('loader-utils')

// 将css插入到html头部
function loader (source) {
  const str = `
    const style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
   `
  return str
}

// pitch 执行的顺序是 style-loader css-loader less-loader
// 这里 remainingRequest 剩余请求表示的就是 css-loader!less-loader!./index.less
// 也就是剩下的还没操作的 css-loader less-loader
loader.pitch = (remainingRequest) => {
  // 使用 stringifyRequest 的作用是
  // 将请求转换为可以在 require() 或 import 中使用的字符串，同时避免使用绝对路径
  const req = loaderUtils.stringifyRequest(this, '!!' + remainingRequest)
  const str = `
    let style = document.createElement('style')
    style.innerHTML = require(${req})
    document.head.appendChild(style)
  `
  return str
}

module.exports = loader


// 这样写的好处就是，style - loader 的 pitch loader 会首先执行，但是上面的普通 loader 就不会执行了。
// 这里参数 remainingRequest 相当于剩下的请求，打印出来其实就相当于局部路径 css - loader!less - loader!./ index.less。还记得前面说的这些感叹号的意思么？
//  require('css-loader!less-loader!./index.less') 表示内联 loader，优先级是 
//  .less 会先从 style - loader 的 pitch 开始，因为有 require 的存在，会经过 less - loader 和 css - loader，然后又会经过 style - loader 的 pitch，这样一来就会死循环了。
//  所以需要在 require 时添加!!，也就是 require('!!css-loader!less-loader!./index.less') ，
//  这里!! 号就表示执行完 less - loader 和 css - loader 就不会调用 style - loader 去执行了，也就解决了之前的死循环的问题。