// controllers/apiT.js
import { Tipo } from "../models/Tipo.js";

// Crear tipo
const crear = async (req, res, next) => {
  try {
    const tipo = new Tipo({ nombre: req.body.nombre });
    await tipo.save();
    res.json(tipo);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Consultar todos
const consulta = async (req, res, next) => {
  try {
    const tipos = await Tipo.find({});
    res.json(tipos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "No se pudieron cargar los tipos" });
  }
};

// Consultar por ID
const consultaId = async (req, res, next) => {
  try {
    const tipo = await Tipo.findById(req.params.id);
    res.json(tipo);
  } catch (error) {
    next(error);
  }
};

// Actualizar
const actualizar = async (req, res, next) => {
  try {
    const tipo = await Tipo.findByIdAndUpdate(req.params.id, { nombre: req.body.nombre }, { new: true });
    res.json(tipo);
  } catch (error) {
    next(error);
  }
};

// Eliminar
const eliminar = async (req, res, next) => {
  try {
    await Tipo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tipo eliminado" });
  } catch (error) {
    next(error);
  }
};

export { crear, consulta, consultaId, actualizar, eliminar };
