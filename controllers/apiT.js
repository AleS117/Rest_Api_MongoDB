import { Tipo } from "../models/Tipo.js";
import mongoose from "mongoose";

// Crear nuevo tipo
const crear = async (req, res, next) => {
  try {
    // Mongoose genera automáticamente ObjectId
    const tipo = new Tipo({ nombre: req.body.nombre });
    await tipo.save();
    res.json(tipo); // devolvemos el tipo creado con su _id de Mongo
  } catch (error) {
    next(error);
  }
};

// Consultar todos los tipos
const consulta = async (req, res, next) => {
  try {
    const tipos = await Tipo.find({});
    res.json(tipos);
  } catch (error) {
    next(error);
  }
};

// Consultar tipo por _id
const consultaId = async (req, res, next) => {
  try {
    const tipo = await Tipo.findById(req.params.id);
    res.json(tipo);
  } catch (error) {
    next(error);
  }
};

// Actualizar tipo
const actualizar = async (req, res, next) => {
  try {
    const tipo = await Tipo.findByIdAndUpdate(
      req.params.id,
      { nombre: req.body.nombre },
      { new: true }
    );
    res.json(tipo);
  } catch (error) {
    next(error);
  }
};

// Eliminar tipo
const eliminar = async (req, res, next) => {
  try {
    await Tipo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tipo eliminado" });
  } catch (error) {
    next(error);
  }
};

export { crear, consulta, consultaId, actualizar, eliminar };
