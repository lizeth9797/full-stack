
//RETO 01
/* function suma(a,b){
console.log(a+b)
}
suma(4,10) */

//RETO 02
/* const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!')); */
/* const saludo=require('./saludo')
console.log(saludo('juan'))
*/

//RETO 03
const random=require('./random')

let desordenado=[]
for (i=0; i<100; i++){
     desordenado.push(random(-1000,1000,10))
}
let ordenado=desordenado.sort((a,b)=>a-b) //manera correcta para sortear, sino, sólo ordenará como String, ASCII
console.log(ordenado)