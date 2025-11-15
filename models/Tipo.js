import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.pluralize(null);

const TipoSchema = new Schema({
    _id: { type: Number, required: true },
    nombre: { type: String, trim: true, required: true }
}, { timestamps: true });

export const Tipo = mongoose.model("Tipo", TipoSchema);
