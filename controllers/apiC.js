import { Compra } from "../models/Compra.js";

// Crear compra
const crear = async (req, res, next) => {
  try {
    const compra = new Compra(req.body);
    await compra.save();
    res.json({ mensaje: "Compra creada" });
  } catch (error) {
    next(error);
  }
};

// Consultar todas las compras
const consulta = async (req, res, next) => {
  try {
    res.json(await Compra.find({}));
  } catch (error) {
    next(error);
  }
};

// Consultar por ID de compra
const consultaId = async (req, res, next) => {
  try {
    res.json(await Compra.findById(req.params.id));
  } catch (error) {
    next(error);
  }
};

// Actualizar
const actualizar = async (req, res, next) => {
  try {
    await Compra.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensaje: "Compra actualizada" });
  } catch (error) {
    next(error);
  }
};

// Eliminar
const eliminar = async (req, res, next) => {
  try {
    await Compra.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Compra eliminada" });
  } catch (error) {
    next(error);
  }
};

// Obtener compras de un comprador
// apiC.js - endpoint para compras por comprador
const comprasPorComprador = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fechaInicio, fechaFin } = req.query;

    let filtro = { id_comprador: Number(id) };

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

const comprasPorCompradorPorFecha = async (req, res, next) => {
  try {
    const { id, fecha } = req.params;

    if (!id || !fecha) {
      return res.status(400).json({ mensaje: "Faltan parámetros" });
    }

    // Convierte la fecha recibida a ISODate UTC para incluir todo el día completo
    const inicio = new Date(fecha + "T00:00:00Z");
    const fin    = new Date(fecha + "T23:59:59.999Z");

    const compras = await Compra.find({
      id_comprador: Number(id),
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
