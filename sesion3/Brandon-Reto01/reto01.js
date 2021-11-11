const https = require('https');

function getSWAPI() {
    const url = 'https://swapi.dev/api/people/'
    https.get(url, (resp) => {
        let data = '';

        resp.setEncoding('utf8');
        //trozos de información recibida
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // La respuesta completa ha sido recibida. Imprime el resultado
        resp.on('end', () => {
            let body = JSON.parse(data);
            let result = body.results.sort(function (a, b) {
                return (a.films.length - b.films.length)
            })
            result.sort(function (a, b) {
                return ((a.name, b.name) ? 1 : 0);
            })
            console.log(result);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

getSWAPI();
