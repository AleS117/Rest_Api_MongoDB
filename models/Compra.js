import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const CompraSchema = new Schema({
    id_lte: { type: Number, required: true },
    codigo_cpr: { type: Number, required: true },
    id_comprador: { type: mongoose.Schema.Types.ObjectId, ref: "Comprador", required: true },
    precio_kilo_final: Number,
    precio_total: Number,
    fecha: { type: Date, default: Date.now }
});

export const Compra = mongoose.model("Compra", CompraSchema);
