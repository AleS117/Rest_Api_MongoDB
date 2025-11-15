import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const CompraSchema = new Schema({
    _id: { type: Number, required: true },
    id_lte: { type: Number, required: true },
    codigo_cpr: { type: Number, required: true },
    precio_kilo_final: Number,
    precio_total: Number,
    fecha: { type: Date, default: Date.now }
}, { timestamps: true });

export const Compra = mongoose.model("Compra", CompraSchema);
