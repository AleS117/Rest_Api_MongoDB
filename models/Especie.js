import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EspecieSchema = new Schema({
  nombre: { type: String, trim: true, required: true },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: "Tipo", required: true }, // referenciamos Tipo
  imagen: { type: String, trim: true }
}, { timestamps: true });

export const Especie = mongoose.model("Especie", EspecieSchema);
