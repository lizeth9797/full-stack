const fetch = require('node-fetch')
const fs = require('fs')

const fetchPeople = (page = 1) => {
  return fetch(`https://swapi.dev/api/people/?page=${page}`)
    .then(response => response.json())
    .then(({ results }) => results)
}

const saveJSON = (name, data) => {
  return new Promise ((resolve, reject) => {
    fs.writeFile(name, data, (err) => {
      if (err) {
        reject(err)
      }
      resolve({ success: true })
    })
  })
}

const toJSON = (data) => JSON.stringify(data, null, 4)

const fetchAllPeople = async () => {
  try {
    const p1 = await fetchPeople(1)
    const p2 = await fetchPeople(2)
    const p3 = await fetchPeople(3)
    const p4 = await fetchPeople(4)
    const p5 = await fetchPeople(5)
    const p6 = await fetchPeople(6)

    const people = [...p1, ...p2, ...p3, ...p4, ...p5, ...p6]

    const males = people.filter(p => p.gender === 'male')
    const females = people.filter(p => p.gender === 'female')

    console.log('males: ', males.length)
    console.log('females: ', females.length)

    saveJSON('males.json', toJSON(males))
    saveJSON('females.json', toJSON(females))
  } catch(err) {
    console.error(err)
  }
}

fetchAllPeople()
