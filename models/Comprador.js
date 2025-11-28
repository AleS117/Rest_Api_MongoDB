import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.pluralize(null);
const Schema = mongoose.Schema;

const CompradorSchema = new Schema({
  nombre: { type: String, required: true },
  apellido_paterno: { type: String, required: true },
  apellido_materno: { type: String, required: true },
  direccion: { type: String, required: true },
  correo: { type: String, trim: true, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: "COMPRADOR" },
}, { timestamps: true });

// Hash de la contraseña antes de guardar
CompradorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar password
CompradorSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const Comprador = mongoose.model("Comprador", CompradorSchema);
