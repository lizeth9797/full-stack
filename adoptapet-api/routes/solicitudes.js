const router=require('express').Router()

const {
    crearSolicitud,
    obtenerSolicitudes,
    modificarSolicitud,
    eliminarSolicitud
}=require('../controllers/solicitudes')

router.get('/',obtenerSolicitudes);
router.post('/',crearSolicitud)
router.put('/:id',modificarSolicitud)
router.delete('/:id',eliminarSolicitud)

module.exports=router;

