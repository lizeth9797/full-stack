const Mascota= require('../models/Mascota')

//CRUD

function crearMascota(req,res){
    var mascota=new Mascota(req.body)
    res.status(200).send(mascota)
}

function obtenerMascota(req,res){
    var mascota1 = new Mascota(1001, 'Tommy', 'perro', 'url', 'Cabeza de venado', 'Karina','Mexico')
    var mascota2 = new Mascota(2002, 'Poncho', 'gato', 'url', 'con rayas','Romina','NYC')
    res.status(200).send(mascota1,mascota2)
}

function modificarMascota(req,res){
    var mascota=new Mascota(req.params.id, 'Tommy', 'perro', 'url', 'Cabeza de venado', 'Karina','Mexico')
    var edit=req.body
    mascota={...mascota,...edit}
    res.send(mascota)
}

function eliminarMascota(req,res){
    res.status(200).send(`La mascota ${req.params.id} se eliminó`)
}

// exportamos las funciones definidas
module.exports={
    crearMascota,
    obtenerMascota,
    modificarMascota,
    eliminarMascota
}