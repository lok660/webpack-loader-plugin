
// 处理css中的图片链接，把url转换成require
// 解析@import语法
// 把url("./pic.png")替换成``url(require("./pic.png"))`
function loader (source) {
  let reg = /url\((.+?)\)/g   // 匹配url
  let pos = 0 // 匹配的指针位置
  let current //  当前匹配的结果

  let arr = ['let list = []'] // 这个数组本质上就是保存一个代码段的

  while (current = reg.exec(source)) {
    const [matchUrl, g] = current  // 'url("./pic.png")', "./pic.png"
    const lastIndex = reg.lastIndex - matchUrl.length    // 拿到css从开始到url链接之前的index
    const preCode = source.slice(pos, lastIndex)  //  //  截取第一部分

    arr.push(`list.push(${JSON.stringify(preCode)})`)
    pos = reg.lastIndex //  指针移动
    arr.push(`list.push('url('+ require(${g}) +')')`)    // 图片地址改成require形式放回去
  }

  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)  // 拼上url地址到结尾的代码
  // 将整个 less 文件作为一个模块返回，而这个模块是一整个字符串
  // 当 style-loader require 引入时，里面的代码就可以直接执行了
  arr.push(`module.exports = list.join('')`)

  return arr.join('\r\n') //  为了好看,每行代码之间加回车
}

module.exports = loader