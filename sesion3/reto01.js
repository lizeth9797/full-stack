/* //ej internet (doesn't work)
const https = require('https');

https.get('https://swapi.dev/api/people/', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const users = JSON.parse(Buffer.concat(data).toString());

    console.log(data)
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});

 */

//PROFE
//solución con fetch

const fetch = require('node-fetch')
const fs = require('fs')

const byFilms = (a, b) => a.films.length - b.films.length
const byName = (a, b) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
}

const saveJSON = (name, data) => {
  fs.writeFile(name, data, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

fetch('https://swapi.dev/api/people/')
  .then(response => response.json())
  .then(({ results }) => {
    results.sort(byFilms)
    saveJSON('by-film.json', JSON.stringify(results, null, 4))
    results.sort(byName)
    saveJSON('by-name.json', JSON.stringify(results, null, 4))
  })