const mongoose = require("mongoose");

const resenaSchema = mongoose.Schema({
  peliculaId: {type: mongoose.Schema.Types.ObjectId, ref: "Pelicula", required: true},
  usuarioId: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
  texto: {type: String, required: true},
  estrellas: {type: Number, required: true, min: 0, max: 5},
  
}, {timestamps: true});


class Resena {
  get valoracion() {
    return "*".repeat(this.estrellas) + "0".repeat(5 - this.estrellas);
  }
}

resenaSchema.loadClass(Resena);

resenaSchema.set("toJSON", {
  transform(doc, ret) {
    return {
      id: doc.id,
      pelicula: doc.peliculaId.titulo,
      usuario: doc.usuarioId.nombre,
      texto: ret.texto,
      estrellas: ret.estrellas,
      nota: doc.valoracion
    }
  }
});

module.exports = mongoose.model("Resena", resenaSchema);