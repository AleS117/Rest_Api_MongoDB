import mongoose from "mongoose";

const CompraSchema = new mongoose.Schema({
  id_lte: { type: mongoose.Schema.Types.ObjectId, ref: "Lote", required: true },
  codigo_cpr: { type: Number, required: true },
  id_comprador: { type: mongoose.Schema.Types.ObjectId, ref: "Comprador", required: true },
  precio_kilo_final: { type: Number, required: true },
  precio_total: { type: Number, required: true },
  fecha: { type: Date, required: true },
});

export const Compra = mongoose.model("Compra", CompraSchema);
