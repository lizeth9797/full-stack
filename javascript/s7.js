/* ----------------
Object.assign
----------------
*/

const car = {
    brand: 'Nissan',
    model: 'Sentra',
    year: 2020
  }
/*  //ejemplo de otro target
const x = {
    office:'1',
    arreglo:  [1,2,3],
    objeto: {
        x:'x',
        y:'y'
    }
  } */
  
function addColor(car) {
    const newCar = Object.assign({owner:'raul', office:'1'}, car, {
        color: 'Black'
    });
    return newCar;
}
  
/* console.log('Before calling addColor()', car);
const newCar = addColor(car);
console.log('After calling addColor()', car);
console.log('After calling addColor()', newCar);
console.log('Same car?', car === newCar); // false
  */ 
  

/* ----------------
FUNCION PURA , ejemplo de carrito de compras
----------------
*/
 var cart = [
    {
      item: 'Laptop',
      quantity: 1
    }
  ]
  
  function addItemToCart(cart, item, quantity) {
    const newCart = cart.map(function(element) {
      return element;
    });
     newCart.push({
      item: item,
      quantity: quantity
    }) 
    return newCart;
  }
  cart = addItemToCart(cart, 'Phone', 1);
  //console.log(cart); 
  
  
/* ----------------
RETO 01
----------------
Crear una función flatten que recibe un arreglo de arreglos y retorna un nuevo arreglo con todos los elementos del arreglo original.
*/

function flatten(arrays) {
    const mainarray=arrays.flat();
    return mainarray;
}
  const arrays = [[1, 2, 3], [4, 5], [6]];
  const array = flatten(arrays);
  //console.log(array); // [1, 2, 3, 4, 5, 6]

/* ----------------
RETO 02
----------------
Crear una función compact que recibe un arreglo y retorna un nuevo arreglo sin incluir los valores que sean falsy.
*/

function compact(m) {
  return m.filter(function(n){
		console.log(n);
		return n==true;
  })
   
}
	const m = [0, 1, false, 2, '', 3];
	const compactedArray = compact(m);
	console.log('resp',compactedArray); // [1, 2, 3]
