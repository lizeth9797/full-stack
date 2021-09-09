const express = require('express');  //importa biblioteca express que permite generar APIs
const app = express(); //definir una constante inicializada como un objeto de express

const bodyParser = require('body-parser');
//const { mongo } = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuración de la base de datos
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:Passw0rd@cluster0.xxifa.mongodb.net/Adoptpet?retryWrites=true&w=majority"); //indicar a qué BD del clúster debe acceder
mongoose.set("debug".true)//activación de la función debug


app.use('/v1',require('./routes'));

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});