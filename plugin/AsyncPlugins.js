class AsyncPlugins {
  apply (compiler) {
    console.log('AsyncPlugins')

    compiler.hooks.emit.tapAsync('AsyncPlugins', (complete, callback) => {
      setTimeout(() => {
        console.log('1s后完成')
        callback()
      }, 1000);
    })

    compiler.hooks.emit.tapPromise('AsyncPlugin', (complete, callback) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('再等1s')
          resolve()
        }, 1000);
      })
    })
  }
}

module.exports = AsyncPlugins