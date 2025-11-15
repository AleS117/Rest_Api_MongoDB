import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.pluralize(null);
const Schema = mongoose.Schema;

const AdministradorSchema = new Schema({
    _id: { type: Number, required: true },
    usuario: { type: String, trim: true, required: true, unique: true },
    correo: { type: String, trim: true, lowercase: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    rol: { type: String, default: "admin" },
    token: { type: String, default: null },
    confirmado: { type: Boolean, default: false }
}, { timestamps: true });

AdministradorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

AdministradorSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export const Administrador = mongoose.model("Administrador", AdministradorSchema);
