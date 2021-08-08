 /*
 ################################
 #   EJERCICIO 1: DEEP EQUAL    #
 ################################
 
 Escribir una función llamada deepEqual que reciba dos argumentos y retorne true si son el mismo valor o si son objetos con las mismas propiedades, en este último caso los valores de las propiedades deben ser comparados con una llamada recursiva de deepEqual.
 Usando el operador typeof puedes determinar si ambas variables son objetos, de ser así se debe llamar nuevamente deepEqual para comparar las propiedades de dichos objetos, en caso contrario solo es necesario revisar si ambas variables son estrictamente iguales.
 La función Object.keys() es útil para obtener las propiedades de los objetos.
*/
 
 function deepEqual(a,b){
   let valor;
    if(typeof a == "object" && typeof b == "object"){
        const x=Object.keys(a);
        const y=Object.keys(b);
        if(x.length==y.length){
            for(i in x) { 
              //Con ayuda del Object.key va a tomar cada posicion del arreglo y va a llamar a la funcion, diciendole que compare con el valor de la propiedad de la posicion de i
               valor= deepEqual(a[x[i]],b[x[i]]);
               console.log(a[x[i]],b[x[i]]);
              }
              return valor;
        }else{
            console.log('longitud diferente');
            return false;
        }
    }else if(a===b){
        return true;
    }else{
        return false;
    }
}
 
let raul = {
    novia: "kari",
    color: "verde",
  };
let sibaja = {
    novio: "karo",
    color: "verdee",
  };

let john = {
    firstName: "John",
    lastName: "Doe",
  };
 /*  console.log("Test x:", deepEqual(raul, sibaja)); //false
  console.log('Test x1:', deepEqual(john, { firstName: 'juan', lastName: 'dona' })); //false
  console.log('Test x2:', deepEqual(john, { firstName: 'John', otroNombre: 'Doe' })); //false
  console.log("Test 1:", deepEqual(1, 1)); // true
  console.log("Test 2:", deepEqual(1, "1")); // false
  console.log("Test 3:", deepEqual(john, john)); // true
  console.log("Test 4:", deepEqual(john, { firstName: "John", lastName: "Doe" })); // true
  console.log("Test 5:", deepEqual(john, { firstName: "John" })); // false
   */

/*
 #########################
 #   EJERCICIO 2: CHUNK  #
 #########################
 
  
 Escribir una función chunk que recibe un arreglo y un número entero size. 
 La función debe dividir el arreglo en múltiples arreglos del tamaño determinado por size.
*/