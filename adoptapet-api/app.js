const express = require('express');  //importa biblioteca express que permite generar APIs
const app = express(); //definir una constante inicializada como un objeto de express

const bodyParser = require('body-parser');
//const { mongo } = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuración de la base de datos
const mongoose = require('mongoose');
/* mongoose.connect(
  process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
); */
mongoose.connect('mongodb+srv://admin:Passw0rd@cluster0.xxifa.mongodb.net/Adoptpet?retryWrites=true&w=majority')
mongoose.set("debug",true)//activación de la función debug
require('./models/Mascota')
require('./models/Usuario')
require('./models/Solicitud')

app.use('/v1',require('./routes'));

const PORT = 4001;
/* app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
}); */

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});