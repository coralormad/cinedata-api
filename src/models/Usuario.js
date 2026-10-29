const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nombre: {type: String, required: [true, "Falta nombre"], trim: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  rol: {type: String, enum: ["usuario", "admin"], default: "usuario"},
  password: {
    type: String, 
    required: [true, "La password es obligatorio"], 
    // min es para numeros y minLength es para caracteres
    minlength: [6, "La password debe ser un minimo de 6 caracteres"],
    select: false
   }
});

usuarioSchema.pre("save", async function () {
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})

class Usuario {
  async comprobarPassword(passwordBruta) {
    return bcrypt.compare(passwordBruta, this.password);
  }
}

usuarioSchema.loadClass(Usuario);

usuarioSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      id: doc.id,
      nombre: ret.nombre,
      email: ret.email,
      rol: ret.rol
    }
  }
})

module.exports = mongoose.model("Usuario", usuarioSchema);