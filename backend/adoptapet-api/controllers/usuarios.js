const Usuario= require('../models/Usuario')

//CRUD

function crearUsuario(req,res){
    var usuario=new Usuario(req.body)
    //aqui podemos perfeccionarlo agregando validaciones sobre si el usuario proporcinó todos los parametros y si son del tipo de dato que se espera
    res.status(200).send(usuario)
}

function obtenerUsuario(req,res){
    var usuario1 = new Usuario(1, 'Juanix', 'Juan', 'Vega', 'juan@vega.com', '123','normal')
    var usuario2 = new Usuario(2, 'Monse', 'Monserrat', 'Vega', 'mon@vega.com','asdf', 'anunciante')
    res.status(200).send([usuario1,usuario2])
}

function modificarUsuario(req,res){
    var usuario=new Usuario(req.params.id,'Juanix', 'Juan', 'Vega', 'juan@vega.com', '123','normal')
    var modificaciones=req.body
    usuario={...usuario,...modificaciones}
    res.send(usuario)
}

function eliminarUsuario(req,res){
    res.status(200).send(`El usuario ${req.params.id} se eliminó`)
}

// exportamos las funciones definidas
module.exports={
    crearUsuario,
    obtenerUsuario,
    modificarUsuario,
    eliminarUsuario
}