import { Comprador } from "../models/Comprador.js";
import { generarJWT } from "../helpers/generarJWT.js";

// Crear comprador
const crear = async (req, res, next) => {
  try {
    const comprador = new Comprador(req.body);
    await comprador.save();
    res.json({ mensaje: "Comprador creado", comprador });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Consultar todos
const consulta = async (req, res, next) => {
  try {
    const compradores = await Comprador.find({});
    res.json(compradores);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Consultar por ID
const consultaId = async (req, res, next) => {
  try {
    const comprador = await Comprador.findById(req.params.id);
    res.json(comprador);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// **Actualizar comprador**
const actualizar = async (req, res, next) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, direccion, correo, password } = req.body;
    const comprador = await Comprador.findById(req.params.id);
    if (!comprador) return res.status(404).json({ mensaje: "Comprador no encontrado" });

    // Actualizar campos
    comprador.nombre = nombre || comprador.nombre;
    comprador.apellido_paterno = apellido_paterno || comprador.apellido_paterno;
    comprador.apellido_materno = apellido_materno || comprador.apellido_materno;
    comprador.direccion = direccion || comprador.direccion;
    comprador.correo = correo || comprador.correo;

    if (password && password.trim() !== "") {
      comprador.password = password; // bcrypt hará hash automáticamente
    }

    await comprador.save();
    res.json({ mensaje: "Comprador actualizado", comprador });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Eliminar
const eliminar = async (req, res, next) => {
  try {
    await Comprador.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Comprador eliminado" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  const { correo, password } = req.body;

  try {
    const comprador = await Comprador.findOne({ correo });
    if (!comprador) return res.status(404).json({ mensaje: "Correo no encontrado" });

    const validPassword = await comprador.comparePassword(password);
    if (!validPassword) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = generarJWT({ id: comprador._id, correo: comprador.correo, rol: "COMPRADOR" });

    res.json({
      mensaje: "Login correcto",
      token,
      comprador: {
        id: comprador._id,
        nombre: comprador.nombre,
        correo: comprador.correo,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { crear, consulta, consultaId, actualizar, eliminar, login };
