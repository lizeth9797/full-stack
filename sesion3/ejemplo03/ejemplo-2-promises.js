const p = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve({ message: 1 })
  }, 2000)
})

p.then(message => console.log(message))
  .then(() => Promise.reject(new Error('oops')))
  .then(() => console.log('1'))
  .then(() => console.log('2'))
  .then(() => console.log('3'))
  .then(() => console.log('4'))
  .catch(err => console.error(err))
  .then(() => console.log('final'))
  .catch(err => console.error(err))
