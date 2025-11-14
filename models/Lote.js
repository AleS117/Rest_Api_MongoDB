import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const LoteSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    kilos: {
        type: Number
    },
    numero_cajas: {
        type: Number
    },
    precio_kilo: {
        type: Number
    },
    fecha: {
        type: Date
    }
});

const Lote = mongoose.model("Lote", LoteSchema);

export {
    Lote
}
