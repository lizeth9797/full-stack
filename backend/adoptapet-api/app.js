const express = require('express');  //importa biblioteca express que permite generar APIs
const app = express(); //definir una constante inicializada como un objeto de express


const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

/* EJEMPLO 01
const gods = [
    { name: 'Zeus' }, 
    { name: 'Hades' }, 
    { name: 'Hermes' }
  ];
*/
app.get('/gods', (req, res, next) => {
res.send(gods);
}); 

//RETO 01
const constelaciones=[
{
    Andromeda : {
	abreviatura : 'And',
	superficie :  722.3,
	num_estrellas : 152,
	estr_mas_brillante : 'Alpheratz' 
    },
    Scorpius : {
	abreviatura : 'Sco',
	superficie :  500.23,
	num_estrellas : 20000,
	estr_mas_brillante : 'OIMK' 
    },
    Aquila : {
	abreviatura : 'Aqu',
	superficie :  115,
	num_estrellas : 1350,
	estr_mas_brillante : 'GJYF' 
    },
    Borealis : {
	abreviatura : 'Bor',
	superficie :  115,
	num_estrellas : 1350,
	estr_mas_brillante : 'ASFG' 
    },
    Corvus : {
	abreviatura : 'Cor',
	superficie :  115,
	num_estrellas : 1350,
	estr_mas_brillante : 'FSWR' 
    }
}];

app.get('/constelaciones', (req, res, next) => {
    res.send(constelaciones);
    });

// EJEMPLO 02
const gods = { 
    Zeus: { live: 'Olympus', symbol: 'Thunderbolt' }, 
    Hades : { live : 'Underworld', symbol: 'Cornucopia' } 
  };
  
 /*  app.get('/gods/:name', (req, res, next) => {
    res.send(gods[req.params.name]);
  }); 
  
 //Codigo de Javier
  app.get('/gods/:name', (req, res) => {
      var name=req.params.name;
    res.send(gods[name]);
  })
 */ 
  
app.get('/gods/:name', (req, res) => {
    const god = gods[req.params.name];
    if (god) {
      res.send(god);
    } else {
      res.status(404).send('Good Not Found');
    }
  });
  
  
/*  RETO 02
Crea nuevos servicios dinámicos de búsqueda de constelaciones por:
nombre
abreviatura
superficie
número estrellas
estrella mas brillante */




  app.get('/constelaciones/:constName', (req, res) => {
    const constName = constelaciones[req.params.constName];
    if (constName) {
      res.send(constName);
    } else {
      res.status(404).send('Constellation Not Found 😫');
    }
  });


  console.log(constelaciones[0].Andromeda.abreviatura)