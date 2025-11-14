import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const AdministradorSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        trim: true,
        unique: true
    },
    correo: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    rol: {
        type: String,
        trim: true,
        default: "admin"
    }
});

const Administrador = mongoose.model("Administrador", AdministradorSchema);

export {
    Administrador
}
