/*
----------------
RETO 01             
----------------
Crear un nuevo mensaje que será usado cuando time sea una hora que no existe en el día.
*/
const time = -1;
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
console.log(greeting) 

/*
----------------
EJERCICIO 01 -Mariano             
----------------
Crea un script en donde dado el diámetro de una rueda y su grosor (en número) y
a través de condicionales if realice las siguientes operaciones:
- Si el diámetro es superior a 1.4 debe mostrarse el mensaje “La rueda es para un vehículo grande”.
- Si es menor o igual a 1.4 pero mayor que 0.8 debe mostrarse el mensaje “La rueda es para un vehículo mediano”.
- Si no se cumplen ninguna de las condiciones anteriores debe mostrarse por pantalla el mensaje “La rueda es para un vehículo pequeño”.
- Si el diámetro es superior a 1.4 con un grosor inferior a 0.4, ó si el diámetro es menor o igual a 1.4 pero mayor que 0.8,
  con un grosor inferior a 0.25, deberá mostrarse el mensaje “El grosor para esta rueda es inferior al recomendado”
*/
  let diametro = 0;
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

  console.log(mensaje) 

/*
----------------
RETO 02           
----------------
Crear un ciclo desde 0 hasta 100.
Mostrar todos los números pares en este ciclo con console.log()
*/
for(var i=0; i<=100; i++){
    if (i%2 == 0)
      console.log(i);
}  

/*
----------------
RETO 03             
----------------
Crear un ciclo desde 0 hasta 100.
Mostrar todos los números primos en este ciclo con console.log()
*/

for(var i=0; i<=100; i++){
    if ((i>1 && i%2 != 0 && i%3 != 0) || (i==2 || i==3))
      console.log(i);
  }  