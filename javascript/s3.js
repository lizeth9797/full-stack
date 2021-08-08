/*
----------------
Objetos y Arreglos             
----------------
*/

const numbers = [1, 3, 4, 7, 2, 1, 9, 0]
const doubled = []

/* for(let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
} */

for (const number of numbers){
  doubled.push(number*2);
}
console.log(numbers); // [1, 3, 4, 7, 2, 1, 9, 0]
console.log(doubled);  // [2, 6, 8, 14, 4, 2, 18, 0]

/*
----------------
RETO 01             
----------------
Dado el arreglo numbers compuesto solamente por números enteros mayores que cero, obtener el promedio de todos sus elementos.
*/
const numeros = [5, 3, 4, 7, 2, 1, 9, 7, 7]
let x=0;
for (let i=0; i<numeros.length;i++){
  x+=numeros[i];
}
console.log("Promedio:",x/numeros.length);

/*
----------------
RETO 02             
----------------
Tomar un arreglo con pares [key, value] y crear un objeto con sus respectivas propiedades y valores.
*/
const car = [['brand', 'Nissan'], ['model', 'Versa'], ['year', 2020]]
const objeto={};

for (const c of car){
  objeto[c[0]]=c[1];
}
console.log(objeto);

/*
----------------
RETO 03             
----------------
Extraer propiedades de un objeto anidado mediante asignación por destructuring.
Extraer las URLs de facebook e instagram y renombrar las variables por fb e ig respectivamente.
*/
const person = {
  firstName: 'John',
  lastName: 'Doe',
  links: {
    web: {
      blog: 'https://johndoe.com'
    }, 
    social: {
      facebook: 'https://facebook.com/john.doe',
      instagram: 'https://instagram.com/john.doe'
    } 
  }
}
const {facebook:fb, instagram:ig}=person.links.social;
console.log(fb,ig)


/*
----------------
RETO FINAL             
----------------
Unir el array 1, 2 y 3, para después sumar todos los números que sean primos
*/

const array1 = [1, 2, 3, 4, 5];
const array2 = [6, 7, 8, 9, 10];
const calificaciones = {
    array3:[11, 12, 13, 14, 15]
};
const array=[...array1,...array2,...calificaciones.array3]
let primo=0;
for(let i=0; i<=array.length; i++){
  if ((i>1 && i%2 != 0 && i%3 != 0) || (i==2 || i==3)){
    primo += i;
  }
}   
console.log("La suma de los numeros primos es: "+primo);