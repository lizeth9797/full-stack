/*
----------------
RETO 01             
----------------
Crear una función power que recibe dos argumentos base y exponent. La función debe retornar el resultado de elevar base a la potencia exponent.
Evitar usar el operador de potenciación ** o la función Math.pow()
*/
function power(base,exponent) {
    let re=1;
    for (let i=0; i<exponent; i++){
      re*= base;
    }
    console.log(re);
  }
  power(2,3);
  
/*
----------------
RETO 02             
----------------
Completar la función getLargerInt la cual recibe dos números enteros. La función debe retornar el número mayor.
*/

  function getLergerInt(number1, number2) {
    if((number1&&number2)>0){
      return number1>number2? number1:number2; 
    }
    else{
      console.log("No son numeros enteros");  
    }
  }
  console.log(getLergerInt(8,9));
  
  /*
----------------
RETO 03             
----------------
Completar la función fibonacciSequence la cuál recibe limit, un entero positivo que representa la cantidad de elementos de la serie que queremos.
La función debe mostrar en consola los elementos de la serie hasta que limit sea alcanzado.
*/
  function fibonacciSequence(x){
    let arreglo=[1];
    let suma;
    if(x==1){
      console.log(arreglo);
    }else if(x==2){
        arreglo.push(1);
        console.log(arreglo);
    }else{
        arreglo.push(1);
      for(let i=2;i<x;i++){
          suma=0;
          suma=(arreglo[i-1]+arreglo[i-2]);
          arreglo.push(suma)
      }
      console.log(arreglo);
    }   
  }
  
fibonacciSequence(1); // 1
fibonacciSequence(2); // 1, 1
fibonacciSequence(5); // 1, 1, 2, 3, 5
  
  
  
  
  
  
  
  