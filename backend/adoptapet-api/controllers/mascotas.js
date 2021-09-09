const mongoose=require('mongoose')
const Mascota=mongoose.model("Mascota")
// const Mascota= require('../models/Mascota')  ya NO será usado así

function crearMascota(req,res,next){ //el parámetro NEXT modela el continuar con la ejecución (i.e. modela el paso sig de la app)
    var mascota=new Mascota(req.body)
    //el metodo save nos permite guardar el nuevo registro en la BD, i.e. es un INSERT
    mascota.save().then(mas =>{ //el método then es cuando todo se ejecutó de manera correcta, entonces regresará la información
        res.status(200).send(mas)
    }).catch(next) //si sucede algún error, continua con la ejecución del programa
}

function obtenerMascota(req,res,next){
    //primero verificamos si el cliente nos está pasando el ID que le pertenece a la mascota para después buscar si existe en la BD
    if(req.params.id){
        Mascota.findById(req.params.id) //findById ya sabe cómo buscar el Id de la mascota
        .then(mas =>{
            res.send(mas)
        })
        .catch(next)
    }else{
        Mascota.find()//find trae todo lo que encuentre la colección
        .then(mascotas=>{
            res.send(mascotas)
        })
        .catch(next)
    }
}

function modificarMascota(req,res,next){
    Mascota.findById(req.params.id)
    .then(mascota=>{ 
        // 1. se va a revisar que realmente existe la mascota que quiere modicar
        if (!mascota){return res.sendStatus(401);} //401 quiere decir que la solicitud está mal hecha
        let nuevaInfo = req.body
        if(typeof nuevaInfo.nombre !== "undefined")
            mascota.nombre=nuevaInfo.nombre
        if(typeof nuevaInfo.categoria !== "undefined")
            mascota.categoria=nuevaInfo.categoria
        if(typeof nuevaInfo.fotos !== "undefined")
            mascota.fotos=nuevaInfo.fotos
        if(typeof nuevaInfo.descripcion !== "undefined")
            mascota.descripcion=nuevaInfo.descripcion
        if(typeof nuevaInfo.anunciante !== "undefined")
            mascota.anunciante=nuevaInfo.anunciante
        if(typeof nuevaInfo.ubicacion !== "undefined")
            mascota.ubicacion=nuevaInfo.ubicacion
        
        mascota.save()
        .then(updated =>{
            res.status(200).json(updated.publicData()) //ESTA REGRESANDO UN JSON VACIO! ERROR
        })
        .catch(next)
    })
    .catch(next)
}

function eliminarMascota(req,res,next){
    Mascota.findOneAndDelete({_id:req.params.id}) // es lo mismo que filtar en mongoDB, por eso usamos llaves
    .then(r=>{
        res.status(200).send("La mascota se eliminó")
    })
    .catch(next)
}

// exportamos las funciones definidas
module.exports={
    crearMascota,
    obtenerMascota,
    modificarMascota,
    eliminarMascota
}