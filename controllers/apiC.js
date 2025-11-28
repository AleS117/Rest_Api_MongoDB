// controllers/apiC.js
import { Compra } from "../models/Compra.js";
import mongoose from "mongoose";

// Crear compra
const crear = async (req, res, next) => {
  try {
    const compra = new Compra(req.body);
    await compra.save();
    res.json({ mensaje: "Compra creada", compra });
  } catch (error) {
    next(error);
  }
};

// Consultar todas las compras
const consulta = async (req, res, next) => {
  try {
    const compras = await Compra.find().populate("id_comprador", "nombre correo");
    res.json(compras);
  } catch (error) {
    next(error);
  }
};

// Consultar compra por ID
const consultaId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ mensaje: "ID inválido" });

    const compra = await Compra.findById(id).populate("id_comprador", "nombre correo");
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });

    res.json(compra);
  } catch (error) {
    next(error);
  }
};

// Actualizar compra
const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ mensaje: "ID inválido" });

    const compra = await Compra.findByIdAndUpdate(id, req.body, {
      new: true
    }).populate("id_comprador", "nombre correo");

    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });

    res.json({ mensaje: "Compra actualizada", compra });
  } catch (error) {
    next(error);
  }
};

// Eliminar compra
const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ mensaje: "ID inválido" });

    const compra = await Compra.findByIdAndDelete(id);
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });

    res.json({ mensaje: "Compra eliminada" });
  } catch (error) {
    next(error);
  }
};

// Compras por comprador (opcional por rango)
const comprasPorComprador = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fechaInicio, fechaFin } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ mensaje: "ID inválido" });

    const filtro = { id_comprador: id };

    if (fechaInicio && fechaFin) {
      filtro.fecha = {
        $gte: new Date(fechaInicio + "T00:00:00Z"),
        $lte: new Date(fechaFin + "T23:59:59Z")
      };
    }

    const compras = await Compra.find(filtro).populate("id_comprador", "nombre correo");
    res.json(compras);
  } catch (error) {
    next(error);
  }
};

// Compras por comprador en fecha exacta
const comprasPorCompradorPorFecha = async (req, res, next) => {
  try {
    const { id, fecha } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ mensaje: "ID inválido" });

    const inicio = new Date(fecha + "T00:00:00Z");
    const fin = new Date(fecha + "T23:59:59.999Z");

    const compras = await Compra.find({
      id_comprador: id,
      fecha: { $gte: inicio, $lte: fin }
    }).populate("id_comprador", "nombre correo");

    res.json(compras);
  } catch (error) {
    next(error);
  }
};

export {
  crear,
  consulta,
  consultaId,
  actualizar,
  eliminar,
  comprasPorComprador,
  comprasPorCompradorPorFecha
};
