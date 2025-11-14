import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const TipoSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        trim: true
    }
});

const Tipo = mongoose.model("Tipo", TipoSchema);

export {
    Tipo
}
