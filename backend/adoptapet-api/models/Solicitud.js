/* class Solicitud {
    constructor(id, idMascota, fechaDeCreacion, idUsuarioAnunciante, idUsuarioSolicitante, estado) {
      this.id = id;
      this.idMascota = idMascota;
      this.fechaDeCreacion = fechaDeCreacion;
      this.idUsuarioAnunciante = idUsuarioAnunciante;
      this.idUsuarioSolicitante = idUsuarioSolicitante;
      this.estado = estado;
    }
  }
module.exports=Solicitud; */

const mongoose=require('mongoose');

const SolicitudSchema=new mongoose.Schema({
    idMascota:{type:mongoose.Schema.Types.ObjectId, ref: 'Mascota', required:true}, 
    fechaDeCreacion:Date, //podríamos pensar que es un campo redundante porque ya en el timestamp tenemos la fecha de creación y actualización
    idUsuarioAnunciante:{type:mongoose.Schema.Types.ObjectId, ref: 'Usuario', required:true}, 
    idUsuarioSolicitante:{type:mongoose.Schema.Types.ObjectId, ref: 'Usuario', required:true},
    estado:{type: String, enum:['adoptado', 'disponible', 'pendiente'], required:true}
  }, {collection:'Solicitud', timestamps:true})

SolicitudSchema.methods.publicData=()=>{
   return {
       id: this.id,
       idMascota: this.idMascota,
       fechaDeCreacion: this.fechaDeCreacion,
       idUsuarioAnunciante: this.idUsuarioAnunciante,
       idUsuarioSolicitante: this.idUsuarioSolicitante,
       estado: this.estado
   }
}

mongoose.model("Solicitudes",SolicitudSchema)