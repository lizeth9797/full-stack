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

 //nombres de esquemas o modelos, en mayuscula y singular y nombres de rutas y controladores en min y plural
 const mongoose=require('mongoose')
 const UsuarioSchema=new mongoose.Schema({
     username:String,
     nombre:String,
     apellido:String,
     email:String,
     password:String,
     tipo:String
 }, {collection: "Usuarios", timestamps:true});  //colocar el nombre exacto de la colección en Compass, timestamp es útil para que quede un registro de en qué momento se modifica un dato

 UsuarioSchema.methods.pubclicData=()=>{ //En este método se define la información publica, i.e cualquiera puede tener acceso a esta info de los usuarios
     return{
         id: this.id,
         username: this.username,
         nombre: this.nombre,
         apellido: this.apellido,
         email: this.email,
         tipo: this.tipo
     }
 }

 mongoose.model("Usuario", UsuarioSchema) // "Usuario" hace referencia al nombre del archivo js