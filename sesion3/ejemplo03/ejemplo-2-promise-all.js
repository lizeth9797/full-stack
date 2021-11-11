const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ data: 1 })
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('oops'))
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ data: 3 })
  }, 3000)
})

Promise.all([p1, p3, p2])
  .then(([result1, result2, result3]) => {
    console.log(result1)
    console.log(result2)
    console.log(result3)
  })
  .catch(console.error)
