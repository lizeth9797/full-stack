console.log('1st line')

//ejemplo 1 de callback  (1st line, terminó, callback)
/*  
const cb=()=>{
    console.log('hola from callback')
}
const time=0
setTimeout(cb,time) */


//ejemplo 2 de callback (1st line, terminó, cb2, cb1)
/* setTimeout(()=>{
    console.log('1er callback')
},2000)

setTimeout(()=>{
    console.log('2do callback')
},500) */


//ejemplo 3 de callback (1st line, terminó, cb1, cb2)
/* 
    setTimeout(()=>{
    console.log('1er callback')
    setTimeout(()=>{
        console.log('2do callback')
    },500)
},2000) */


console.log('terminó la sesion')