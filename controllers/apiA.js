import { Administrador } from "../models/Administrador.js";
import { generarJWT } from "../helpers/generarJWT.js";
import bcrypt from "bcryptjs";

// Crear administrador
const crear = async (req, res) => {
  try {
    const { usuario, password, rol, correo } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: "Usuario y contraseña son requeridos" });
    }

    const existe = await Administrador.findOne({ usuario });
    if (existe) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const admin = new Administrador({ usuario, password, rol, correo });
    await admin.save();

    res.json({ mensaje: "Administrador creado", admin });
  } catch (error) {
    console.log(error);

    // Validaciones de Mongoose
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ mensaje: mensajes.join(", ") });
    }

    // Error de duplicado (usuario único)
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: `El usuario '${req.body.usuario}' ya existe.` });
    }

    res.status(500).json({ mensaje: "Error al crear el administrador" });
  }
};

// Consultar todos los administradores
const consulta = async (req, res) => {
  try {
    const admins = await Administrador.find({});
    res.json(admins);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al consultar administradores" });
  }
};

// Consultar por ID
const consultaId = async (req, res) => {
  try {
    const admin = await Administrador.findById(req.params.id);
    if (!admin) return res.status(404).json({ mensaje: "Administrador no encontrado" });
    res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al consultar administrador" });
  }
};

// Actualizar administrador
const actualizar = async (req, res) => {
  try {
    const admin = await Administrador.findById(req.params.id);
    if (!admin) return res.status(404).json({ mensaje: "Administrador no encontrado" });

    const { usuario, password, rol, correo } = req.body;
    if (usuario) admin.usuario = usuario;
    if (rol) admin.rol = rol;
    if (correo) admin.correo = correo;
    if (password && password.trim() !== "") admin.password = password; // Se hashea en pre-save

    await admin.save();
    res.json({ mensaje: "Administrador actualizado", admin });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ mensaje: mensajes.join(", ") });
    }

    if (error.code === 11000) {
      return res.status(400).json({ mensaje: `El usuario '${req.body.usuario}' ya existe.` });
    }

    res.status(500).json({ mensaje: "Error al actualizar el administrador" });
  }
};

// Eliminar administrador
const eliminar = async (req, res) => {
  try {
    const admin = await Administrador.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ mensaje: "Administrador no encontrado" });
    res.json({ mensaje: "Administrador eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al eliminar administrador" });
  }
};

// Login
const login = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const admin = await Administrador.findOne({ usuario });
    if (!admin) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = generarJWT({ id: admin._id, correo: admin.correo, rol: admin.rol });

    res.json({
      mensaje: "Login correcto",
      token,
      admin: { id: admin._id, usuario: admin.usuario, rol: admin.rol },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error en el login" });
  }
};

export { crear, consulta, consultaId, actualizar, eliminar, login };
