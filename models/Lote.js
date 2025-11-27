import mongoose from "mongoose";

const LoteSchema = new mongoose.Schema({
  id_comprador: { type: mongoose.Schema.Types.ObjectId, ref: "Comprador", required: false },
  id_especie: { type: mongoose.Schema.Types.ObjectId, ref: "Especie", required: true },
  id_tipo: { type: mongoose.Schema.Types.ObjectId, ref: "Tipo", required: true },
  kilos: { type: Number, required: true },
  numero_cajas: { type: Number, required: true },
  precio_kilo: { type: Number, required: true },
  fecha: { type: Date, required: true },
});

export const Lote = mongoose.model("Lote", LoteSchema);
