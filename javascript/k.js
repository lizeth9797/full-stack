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


/* 
- Si el diámetro es superior a 1.4 debe mostrarse el mensaje “La rueda es para un vehículo grande”.
- Si es menor o igual a 1.4 pero mayor que 0.8 debe mostrarse el mensaje “La rueda es para un vehículo mediano”
- Si no se cumplen ninguna de las condiciones anteriores debe mostrarse por pantalla el mensaje “La rueda es para un vehículo pequeño”.
- Si el diámetro es superior a 1.4 con un grosor inferior a 0.4, ó si el diámetro es menor o igual a 1.4 pero mayor que 0.8,
  con un grosor inferior a 0.25, deberá mostrarse el mensaje “El grosor para esta rueda es inferior al recomendado”

  const diametro = 1;
  const grosor= 2;
  let mensaje;
  if (diametro > 1.4 ) {
    mensaje = "La rueda es para un vehículo grande";
  } else if (diametro <= 1.4 && diametro > 0.8) {
    mensaje = "La rueda es para un vehículo mediano";
  } else if (diametro <= 1.4 && diametro > 0.8) {
    mensaje = "La rueda es para un vehículo pequeño";
  }else if (diametro > 1.4 && grosor < 0.4) {
    mensaje = "Esa es una hora inválida";
  }

  console.log(mensaje) */



  for(var i=0; i<=100; i++){
    if (i%2 !== 0)
        console.log(i);
  } 