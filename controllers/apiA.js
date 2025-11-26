import { Administrador } from "../models/Administrador.js";
import { generarJWT } from "../helpers/generarJWT.js";

// Crear administrador
const crear = async (req, res, next) => {
  try {
    const admin = new Administrador(req.body);
    await admin.save();
    res.json({ mensaje: "Administrador creado", admin });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Consultar todos los administradores
const consulta = async (req, res, next) => {
  try {
    const admins = await Administrador.find({});
    res.json(admins);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Consultar administrador por ID
const consultaId = async (req, res, next) => {
  try {
    const id = req.params.id; // string, no Number
    const admin = await Administrador.findById(id);
    if (!admin) return res.status(404).json({ mensaje: "Administrador no encontrado" });
    res.json(admin);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Actualizar administrador
const actualizar = async (req, res, next) => {
  try {
    const id = req.params.id; // string
    const { usuario, password } = req.body;

    const admin = await Administrador.findById(id);
    if (!admin) return res.status(404).json({ mensaje: "Administrador no encontrado" });

    if (usuario) admin.usuario = usuario;
    if (password && password.trim() !== "") admin.password = password;

    await admin.save();
    res.json({ mensaje: "Administrador actualizado", admin });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Eliminar administrador
const eliminar = async (req, res, next) => {
  try {
    const id = req.params.id; // string
    const admin = await Administrador.findByIdAndDelete(id);
    if (!admin) return res.status(404).json({ mensaje: "Administrador no encontrado" });
    res.json({ mensaje: "Administrador eliminado" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  const { usuario, password } = req.body;
  try {
    const admin = await Administrador.findOne({ usuario });
    if (!admin) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const bcrypt = await import("bcryptjs");
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = generarJWT({
      id: admin._id,
      correo: admin.correo,
      rol: admin.rol,
    });

    res.json({
      mensaje: "Login correcto",
      token,
      admin: {
        id: admin._id,
        usuario: admin.usuario,
        rol: admin.rol,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  crear,
  consulta,
  consultaId,
  actualizar,
  eliminar,
  login,
};
