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

module.exports = loader