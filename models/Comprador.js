import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const CompradorSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        trim: true
    },
    apellido_paterno: {
        type: String,
        trim: true
    },
    apellido_materno: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    correo: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    }
});

const Comprador = mongoose.model("Comprador", CompradorSchema);

export {
    Comprador
}
