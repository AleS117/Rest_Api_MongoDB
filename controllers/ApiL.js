import { Lote } from "../models/Lote.js";
import { Especie } from "../models/Especie.js";
import { Tipo } from "../models/Tipo.js";

// Crear nuevo lote
const crear = async (req, res, next) => {
  try {
    const lote = new Lote(req.body);
    await lote.save();

    const lotePopulado = await Lote.findById(lote._id)
      .populate("id_especie", "nombre")
      .populate("id_tipo", "nombre");

    res.json({ mensaje: "Lote creado", lote: lotePopulado });
  } catch (error) {
    next(error);
  }
};

// Consultar todos los lotes
const consulta = async (req, res, next) => {
  try {
    const lotes = await Lote.find({})
      .populate("id_especie", "nombre")
      .populate("id_tipo", "nombre");
    res.json(lotes);
  } catch (error) {
    next(error);
  }
};

// Consultar lote por _id
const consultaId = async (req, res, next) => {
  try {
    const lote = await Lote.findById(req.params.id)
      .populate("id_especie", "nombre")
      .populate("id_tipo", "nombre");
    res.json(lote);
  } catch (error) {
    next(error);
  }
};

// Actualizar lote
const actualizar = async (req, res, next) => {
  try {
    const lote = await Lote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const lotePopulado = await Lote.findById(lote._id)
      .populate("id_especie", "nombre")
      .populate("id_tipo", "nombre");
    res.json({ mensaje: "Lote actualizado", lote: lotePopulado });
  } catch (error) {
    next(error);
  }
};

// Eliminar lote
const eliminar = async (req, res, next) => {
  try {
    await Lote.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Lote eliminado" });
  } catch (error) {
    next(error);
  }
};

export { crear, consulta, consultaId, actualizar, eliminar };
