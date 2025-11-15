import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const EspecieSchema = new Schema({
    _id: { type: Number, required: true },
    nombre: { type: String, trim: true, required: true },
    id_tpo: { type: Number, required: true },
    imagen: { type: String, trim: true }
}, { timestamps: true });

export const Especie = mongoose.model("Especie", EspecieSchema);
