/* -------------
RETO 02
----------------
La siguiente función async espera un segundo antes de retornar un string Hello World. ¿Cómo podemos llamarla desde una función que no es async y usar el valor que resuelve la promesa para mostrarlo en consola sin usar await?
*/ 
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'Hello World';
}
function log(value) {
    wait().then(value=>console.log(value))
  }
log()