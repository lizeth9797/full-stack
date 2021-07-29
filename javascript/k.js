//RETO 01 
/* const time = -1;
let greeting;
if (time < 12 && time >= 0) {
  greeting = "Good morning";
} else if (time >= 12 && time < 20) {
  greeting = "Good afternoon";
} else if (time > 20 && time <= 24) {
  greeting = "Good evening";
}else if (time > 24 || time < 0) {
    greeting = "Esa es una hora inválida";
}
console.log(greeting) */ 


//EJERCICIO 01 -Mariano
/* - Si el diámetro es superior a 1.4 debe mostrarse el mensaje “La rueda es para un vehículo grande”.
- Si es menor o igual a 1.4 pero mayor que 0.8 debe mostrarse el mensaje “La rueda es para un vehículo mediano”
- Si no se cumplen ninguna de las condiciones anteriores debe mostrarse por pantalla el mensaje “La rueda es para un vehículo pequeño”.
- Si el diámetro es superior a 1.4 con un grosor inferior a 0.4, ó si el diámetro es menor o igual a 1.4 pero mayor que 0.8,
  con un grosor inferior a 0.25, deberá mostrarse el mensaje “El grosor para esta rueda es inferior al recomendado”
 */
  /* let diametro = 0;
  let grosor= 0.2;
  let mensaje;
  if (diametro > 1.4 ) {
    if (grosor<0.4){
      mensaje = "El grosor para esta rueda es inferior al recomendado";
    }
    else{
      mensaje = "La rueda es para un vehículo grande";
    }
  } else if (diametro <= 1.4 && diametro > 0.8) {
    if (grosor<0.25){
      mensaje = "El grosor para esta rueda es inferior al recomendado";
    }
    else{
      mensaje = "La rueda es para un vehículo mediano";
    }
  } else{
    mensaje = "La rueda es para un vehículo pequeño";
  }

  console.log(mensaje) */


//RETO 02 y 03
/*   for(var i=0; i<=100; i++){
    if (i%2 !== 0)
        console.log(i);
  }  */

  
//            ***** CLASE 3, Objetos y Arreglos     *****
const numbers = [1, 3, 4, 7, 2, 1, 9, 0]

const doubled = []

/* for(let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
} */

for (const number of numbers){
  doubled.push(number*2);
}
//console.log(numbers); // [1, 3, 4, 7, 2, 1, 9, 0]
//console.log(doubled);  // [2, 6, 8, 14, 4, 2, 18, 0]


//Reto 01 
//Dado el arreglo numbers compuesto solamente por números enteros mayores que cero, obtener el promedio de todos sus elementos.

const numeros = [5, 3, 4, 7, 2, 1, 9, 7, 7]
let x=0;
for (let i=0; i<numeros.length;i++){
  x+=numeros[i];
}
//console.log("Promedio:",x/numeros.length);

// RETO 02
const car = [['brand', 'Nissan'], ['model', 'Versa'], ['year', 2020]]
const array={};

for (const c of car){
  array[c[0]]=c[1];
}
//console.log(array);


// RETO 03
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
//console.log(fb,ig)


//CLASE 4 RETO 01
function power(base,exponent) {
  let re=1;
  for (let i=0; i<exponent; i++){
    re*= base;
  }
  console.log(re);
}
//power(2,3);


//RETO 02
//Completar la función getLargerInt la cual recibe dos números enteros. La función debe retornar el número mayor.

function getLergerInt(number1, number2) {
  if((number1&&number2)>0){
    return number1>number2? number1:number2; 
  }
  else{
    console.log("No son numeros enteros");  
  }
}
//console.log(getLergerInt(8,9));

let arreglo=[1];
function fibo(x){
  if(x==1){
    console.log(arreglo);
  }else if(x==2){
    arreglo.push(1);
    console.log(arreglo);
  }else{
    
  }

  
}

fibo(2);






