const less = require('less')

function loader (source) {
  let css = ''

  less.render(source, function (err, output) {
    console.log('------------')
    console.log(output)
    console.log('------------')
    css = output.css
  })

  return css
}

module.exports = loader