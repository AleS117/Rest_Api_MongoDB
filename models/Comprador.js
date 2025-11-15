import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.pluralize(null);
const Schema = mongoose.Schema;

const CompradorSchema = new Schema({
    _id: { type: Number, required: true },
    nombre: { type: String, trim: true },
    apellido_paterno: { type: String, trim: true },
    apellido_materno: { type: String, trim: true },
    direccion: { type: String, trim: true },
    correo: { type: String, trim: true, lowercase: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    token: { type: String, default: null },
    confirmado: { type: Boolean, default: false }
}, { timestamps: true });

CompradorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

CompradorSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export const Comprador = mongoose.model("Comprador", CompradorSchema);
