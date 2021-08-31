//const { request } = require("express");
const router=require('express').Router()

const {
    crearUsuario,
    obtenerUsuario,
    modificarUsuario,
    eliminarUsuario
}=require('../controllers/usuarios')

router.get('/',obtenerUsuario);
router.post('/',crearUsuario)
router.put('/:id',modificarUsuario)
router.delete('/:id',eliminarUsuario)

module.exports=router;

