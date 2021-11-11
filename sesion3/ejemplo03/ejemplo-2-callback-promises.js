const fs = require('fs')

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, content) => {
      if (err) reject(err)
      else resolve(content)
    })
  })
}

readFile('input.tx')
  .then(data => console.log(data))
  .catch(console.error)