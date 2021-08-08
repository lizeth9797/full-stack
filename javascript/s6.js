/* ----------------
Funcion constructor
----------------
*/

//despues de this podemos colocar el nombre de nuestra preferencia, ese será mostrado en consola asignandolo al atributo correspondiente
//no significa que solo podamos asignar a this lo que se declaro como parametros, es decir podemos crear funciones dentro (Ver reto 01)
const Person = function(name, birthYear, job) {
  this.name = name;
  this.birthYear = birthYear;
  this.job = job;
}
const john = new Person('John', 1990, 'Developer');
//console.log( john ); //el nombre de las propiedades del objeto seran name,birthday,job


const Persona = function(names, birthYears, jobs) {
    this.x = names;
    this.y = birthYears;
    this.z = jobs;
  }
const johan = new Persona('John', 1990, 'Developer');
//console.log( johan ); //el nombre de las propiedades del objeto seran x,y,z
//console.log( typeof johan ); //objeto
//console.log( johan instanceof Persona ); //true

//const Persona = new Persona('John', 1990, 'Developer');
//console.log( Persona ); // ERROR

// ARREGLO DE OBJETOS
const Persons =[  
    new Person('John', 1990, 'Developer'),
    new Person('Kari', 1990, 'Developer'),
    new Person('Raul', 1990, 'Developer')
]
//console.log(Persons)
Persons.push(new Person('Diana', 1990, 'Developer'));
//console.log(Persons)


/*
----------------
RETO 01             
----------------
Crear un function constructor Vec el cual representa un vector en dos dimensiones. Recibe dos parámetros x y y, ambos valores numéricos que deben ser las propiedades del objeto.
Agregar los siguientes métodos al prototype de Vec: plus, mnus, length
*/

const Vec=function(x,y){
    this.x=x;
    this.y=y;
    this.plus=function(v){
        return new Vec(this.x+v.x,this.y+v.y);
    };
    this.minus=function(v){
        return new Vec(this.x-v.x,this.y-v.y);
    };
    this.length=function(){
        return (Math.sqrt(this.x*this.x+this.y+this.y));
    };
};
//Esta era la solución propuesta y la que se entregó en slack:
/* Vec.prototype.plus=function(v){
    return new Vec(this.x+v.x,this.y+v.y);
}
Vec.prototype.minus=function(v){
    return new Vec(this.x-v.x,this.y-v.y);
}
Vec.prototype.length=function(){
    return (Math.sqrt(this.x*this.x+this.y+this.y));
} */

const vec1 = new Vec(1,2);
const vec2 = new Vec(2,3);

//console.log(vec1.plus(vec2)); // Vec { x: 3, y: 5 }
//console.log(vec1.minus(vec2)); // Vec { x: -1, y: -1 }
//console.log(vec1.length()); // 2.23606797749979

/* const Vec=function(k){                 BUSCAR EJEMPLO DE LA CLASE, DESPUES DEL RECESO!
    this.k=k;
    this.hola=function(){
        return new Vec();
    };
}; */

/* ----------------
HERENCIA
----------------
*/

//VARIOS EJEMPLOS


/* ----------------
RETO 02
----------------
Crear un function constructor Group el cual crea una lista (arreglo) vacía.
Agregar los siguientes métodos a Group:
add: Agrega un nuevo valor al grupo solo si no existe.
has: Retorna un booleano indicando si el valor es un miembro del grupo.
from: Método estático que recibe un arreglo y crea un grupo con todos los elementos de dicho arreglo.
*/

const Group = function(arreglo) {
    this.arreglo=[];
    this.add=function(x){
        if(!this.has(x)) //cuando no lo incluye en el metodo has entonces conviertelo a true para que se ejecute el IF
        this.arreglo.push(x);
    }
    this.has=function(x){
        return this.arreglo.includes(x);
    }
  
}
Group.from=function(arr){
    const grupo= new Group();
    for(i=0; i<arr.length;i++){
        grupo.add(arr[i]);
    }
    return grupo;
}
  const group = Group.from([1, 2, 3, 4, 5]);
  console.log(group); // Group { members: [ 1, 2, 3, 4, 5 ] }
  console.log(group.has(5)); // true
  console.log(group.has(10)); // false
  group.add(10);
  console.log(group.has(10)); // true
  

/* ----------------
RETO 03
----------------
Crear un function constructor Triangle con tres parámetros a, b y c. Cada uno representa un lado del triángulo.
Agregar el método getPerimeter al prototype de Triangle, el cual retorna el perímetro del triángulo.
*/

const Triangle=function(a,b,c){
    this.a=a;
    this.b=b;
    this.c=c;
}

Triangle.prototype.getPerimeter=function(){
    return this.a+this.b+this.c
}

const triangle = new Triangle(1, 2, 3);
console.log(triangle); // Triangle { a: 1, b: 2, c: 3 }
console.log(triangle.getPerimeter()); // 6

