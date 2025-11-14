import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const CompraSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    id_lte: {
        type: Number,
        required: true
    },
    codigo_cpr: {
        type: Number,
        required: true
    },
    precio_kilo_final: {
        type: Number
    },
    precio_total: {
        type: Number
    },
    fecha: {
        type: Date
    }
});

const Compra = mongoose.model("Compra", CompraSchema);

export {
    Compra
}
