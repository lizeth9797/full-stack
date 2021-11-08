//RETO 01
/* function suma(a,b){
console.log(a+b)
}
suma(4,10) */

//RETO 02

// Parte 01
/* const http = require('http');
const hostname='127.0.0.1'
const port=3000
const server=http.createServer((req,res)=>{
     res.statusCode=200;
     res.setHeader('Content-Type', 'JSON');
     res.end('Hello')
});

server.listen(port,hostname,()=>{
     console.log(`Server running at http://${hostname}:${port}/`)
})
*/

// Parte 02
/* var colors = require('colors');
console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.red) // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap); // Drops the bass
  */

// Parte 03
/* const saludo=require('./saludo')
console.log(saludo('juan')) */





//RETO 03
/* const random=require('./random')

let desordenado=[]
for (i=0; i<100; i++){
     desordenado.push(random(-1000,1000,10))
}
let ordenado=desordenado.sort((a,b)=>a-b) //manera correcta para sortear, sino, sólo ordenará como String, ASCII
console.log(ordenado) */


