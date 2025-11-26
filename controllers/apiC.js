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
    const compras = await Compra.find({});
    res.json(compras);
  } catch (error) {
    next(error);
  }
};

// Consultar compra por ID
const consultaId = async (req, res, next) => {
  try {
    const { id } = req.params;

    let filtro;
    if (mongoose.Types.ObjectId.isValid(id)) {
      filtro = { _id: new mongoose.Types.ObjectId(id) };
    } else if (!isNaN(parseInt(id))) {
      filtro = { _id: parseInt(id) };
    } else {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const compra = await Compra.findOne(filtro);
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

    let filtro;
    if (mongoose.Types.ObjectId.isValid(id)) {
      filtro = { _id: new mongoose.Types.ObjectId(id) };
    } else if (!isNaN(parseInt(id))) {
      filtro = { _id: parseInt(id) };
    } else {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const compra = await Compra.findOneAndUpdate(filtro, req.body, { new: true });
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

    if (!id) return res.status(400).json({ mensaje: "Falta el ID" });

    let filtro;
    if (mongoose.Types.ObjectId.isValid(id)) {
      filtro = { _id: new mongoose.Types.ObjectId(id) };
    } else if (!isNaN(parseInt(id))) {
      filtro = { _id: parseInt(id) };
    } else {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const compra = await Compra.findOneAndDelete(filtro);
    if (!compra) return res.status(404).json({ mensaje: "Compra no encontrada" });

    res.json({ mensaje: "Compra eliminada" });
  } catch (error) {
    next(error);
  }
};

// Obtener compras de un comprador
const comprasPorComprador = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fechaInicio, fechaFin } = req.query;

    if (!id) return res.status(400).json({ mensaje: "Falta el ID de comprador" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID de comprador inválido" });
    }

    let filtro = { id_comprador: new mongoose.Types.ObjectId(id) };

    if (fechaInicio && fechaFin) {
      filtro.fecha = {
        $gte: new Date(fechaInicio + "T00:00:00Z"),
        $lte: new Date(fechaFin + "T23:59:59Z")
      };
    }

    const compras = await Compra.find(filtro);
    res.json(compras);
  } catch (error) {
    next(error);
  }
};

// Obtener compras de un comprador por fecha exacta
const comprasPorCompradorPorFecha = async (req, res, next) => {
  try {
    const { id, fecha } = req.params;

    if (!id || !fecha) {
      return res.status(400).json({ mensaje: "Faltan parámetros" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID de comprador inválido" });
    }

    const inicio = new Date(fecha + "T00:00:00Z");
    const fin = new Date(fecha + "T23:59:59.999Z");

    const compras = await Compra.find({
      id_comprador: new mongoose.Types.ObjectId(id),
      fecha: { $gte: inicio, $lte: fin }
    });

    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las compras" });
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
