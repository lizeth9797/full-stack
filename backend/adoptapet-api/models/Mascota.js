/* class Mascota{
    constructor(id,nombre,categoria,foto,descripcion,anunciante,ubicacion){
        this.id=id
        this.nombre=nombre
        this.categoria=categoria
        this.foto=foto
        this.descripcion=descripcion
        this.anunciante=anunciante
        this.ubicacion=ubicacion
    }
}

module.exports=Mascota;
 */

 const mongoose=require('mongoose');

 const MascotaSchema=new mongoose.Schema({
     nombre:{type:String, required:true}, //con required le indicamos que es un campo obligatorio
     categoria:{type:String, enum: ['Perro', 'Gato', 'Otro']}, //aqui sólo va a permitir esas 3 categorías
     fotos:String,
     descripcion:{type:String, required:true},
     anunciante:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario'}, //se hace una referencia a los usuarios que ya existen en la BD
     ubicacion:String
 }, {collection:'Mascotas', timestamps:true})

 MascotaSchema.methods.publicData=()=>{  //no como arrow sino como funcion para que ya no de errores
    return {
        id: this.id,
        nombre: this.nombre,
        categoria: this.categoria,
        fotos: this.fotos,
        descripcion: this.descripcion,
        anunciante: this.anunciante,
        ubicacion: this.ubicacion
    }
}

 mongoose.model("Mascota",MascotaSchema)