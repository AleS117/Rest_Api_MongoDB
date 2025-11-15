import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const LoteSchema = new Schema({
    _id: { type: Number, required: true },
    kilos: Number,
    numero_cajas: Number,
    precio_kilo: Number,
    fecha: { type: Date, default: Date.now }
}, { timestamps: true });

export const Lote = mongoose.model("Lote", LoteSchema);
