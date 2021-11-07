function calculator(){
    console.log('hola')
}

function sumar(num1, num2) {
    console.log(num1 + num2)
}

function substract (x, y) {
    console.log(x - y)
}

//module.exports=sumar;

calculator.sumar=sumar
calculator.substract=substract
module.exports=calculator;

/* module.exports={
    suma:sumar,
    substract //el key y variable tienen el mismo nombre, por eso no le pusimos "resta:", damos por defecto que será substract:substract
} */