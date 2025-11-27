// models/Carrito.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id_lote: { type: mongoose.Schema.Types.ObjectId, ref: "Lote", required: true },
  cantidad: { type: Number, required: true, min: 1, default: 1 }
});

const CarritoSchema = new Schema({
  id_comprador: { type: mongoose.Schema.Types.ObjectId, ref: "Comprador", required: true },
  items: [ItemSchema]
}, { timestamps: true });

export const Carrito = mongoose.model("Carrito", CarritoSchema);
