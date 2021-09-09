/* class Usuario{
    constructor(id,username, nombre, apellido, email, password, tipe){
        this.id=id
        this.username=username
        this.nombre=nombre
        this.apellido=apellido
        this.email=email
        this.password=password
        this.tipe=tipe
    }
}

module.exports=Usuario;
 */

 const mongoose=require('mongoose')
 const UsuarioSchema=new mongoose.Schema({
     username:String,
     nombre:String,
     apellido:String,
     email:String,
     password:String,
     tipo:String
 }, {collection: "Usuarios", timestamps:true})  //colocar el nombre exacto de la colección en Compass, timestamp es útil para que quede un registro de en qué momento se modifica un dato
 