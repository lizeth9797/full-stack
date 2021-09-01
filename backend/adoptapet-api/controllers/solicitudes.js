const Solicitud = require('../models/Solicitud');

//Crear
function crearSolicitud(req, res) {
    let solicitud = new Solicitud(req.body);
    res.status(200).send(solicitud);

}
//Obtener
function obtenerSolicitudes(req, res) {
  
    let solicitud1 = new Solicitud(1, 1, '25/08/21', 1, 2, 'aprobada')
    let solicitud2 = new Solicitud(2, 2, '30/08/21', 1, 2, 'pendiente')
    res.send([solicitud1, solicitud2])
  }


function modificarSolicitud(req,res){
    var solicitud = new Solicitud(req.params.id, 1,'25/08/21', 1, 2, 'aprobada')
    var modificaciones = req.body
    solicitud = {...solicitud, ...modificaciones}
    res.send(solicitud)
}

function eliminarSolicitud(req,res){
    res.status(200).send(`La solicitud ${req.params.id} se ha eliminado`);
}

module.exports = {
    crearSolicitud,
    obtenerSolicitudes,
    modificarSolicitud,
    eliminarSolicitud
}