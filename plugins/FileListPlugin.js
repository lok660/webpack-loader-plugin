class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename
  }
  apply (compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      let assets = compilation.assets; // {'build.js': {}, 'index.html': {}}
      let content = `## 文件名  资源大小\r\n`

      //[['build.js', {}], ['index.html', {}]]
      Object.entries(assets).forEach(([filename, stateObj]) => {
        content += `- ${filename}    ${stateObj.size()}\r\n`
      })

      //  在最终输出到dist的文件对象上，加上list.md文件
      assets[this.filename] = {
        source () {
          return content;
        },
        size () {
          return content.length
        }
      }
    })
  }
}

module.exports = FileListPlugin