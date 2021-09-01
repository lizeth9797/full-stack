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
    const constelaciones=
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
    };
    
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
    
    /*  Esto sólo filtrará constelaciones por nombre, no por valores de las propiedades en las constelaciones
    app.get('/constelaciones/:constName', (req, res) => {
      const constelacion = constelaciones[req.params.constName]
      if (constelacion) {
        res.send(constelacion);
      } else {
        res.status(404).send('Constellation Not Found 😫');
      }
    })
  */
     function searchConst(value){
      const array=Object.keys(constelaciones)
      let response;
      for ( index in array){
         let properties=Object.keys(constelaciones[array[index]])
         for (i in properties){
           let property=properties[i];
             if((constelaciones[array[index]][property]) == value){
             //console.log(array[index])
             response=array[index]
           }  
         }
      } 
        return response;
    } 
    
    //searchConst('Sco')
    
      app.get('/constelaciones/:constName', (req, res) => {
        const constelacion = searchConst(req.params.constName)
        if (constelacion) {
          res.send(constelaciones[constelacion]);
        } else {
          res.status(404).send('Constellation Not Found 😫');
        }
      })
    
    
     //Ejemplo 03
    
     //servicio para modificar los dioses griegos
     app.put('/gods/:name', (req,res) => {
      const god = req.body;
      gods[req.params.name] = god
      res.send(gods);
    })
    
/*     app.post('/gods', (req, res) => {
      const name = req.query.name
      const newGod = req.body;
      gods[name] = newGod;
      res.status(200).send(gods);
    }) */
    
    app.delete('/gods/:name', (req, res) =>{
      const name = req.params.name;
      if (delete gods[name]){
        res.send(gods)
      } else {
        res.status(500)
      }
    })
    
     /*  RETO 03
    Crea nuevos servicios dinámicos de búsqueda de constelaciones por:
    nombre
    abreviatura
    superficie
    número estrellas
    estrella mas brillante */
    
    app.put('/constelaciones/:constName', (req, res) => {
      const constelacionUpdated=req.body
      const constelacionName=constelaciones[req.params.constName]
      constelaciones[req.params.constName]=constelacionUpdated
       if (constelacionName) {
        res.send(constelaciones)
      } else {
        res.status(404).send('Constellation Not Found 😫');
      } 
    }) 

    app.post('/constelaciones', (req, res) => {
      const name = req.query.name
      const newConstelacion = req.body;
      constelaciones[name] = newConstelacion;
      res.status(200).send(constelaciones);
    })

    app.delete('/constelaciones/:name', (req, res) =>{
      const name = req.params.name;
      if (constelaciones[name]){
        delete constelaciones[name]
        res.send(constelaciones)
      } else {
        res.status(500).send('Sorry');
      }
    })
  