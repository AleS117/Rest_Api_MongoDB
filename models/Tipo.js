import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TipoSchema = new Schema({
  nombre: { type: String, trim: true, required: true }
}, { timestamps: true });

export const Tipo = mongoose.model("Tipo", TipoSchema);
