// controllers/apiCarrito.js
import { Carrito } from "../models/Carrito.js";
import { Lote } from "../models/Lote.js";
import { Compra } from "../models/Compra.js";
import mongoose from "mongoose";

/**
 * Helper para obtener id comprador desde req (compatible con distintos middlewares)
 */
const getCompradorId = (req) => {
  if (req.usuario && req.usuario.id) return req.usuario.id;
  if (req.usuario && req.usuario._id) return req.usuario._id;
  if (req.user && req.user.id) return req.user.id;
  if (req.user && req.user._id) return req.user._id;
  if (req.body && req.body.id_comprador) return req.body.id_comprador;
  return null;
};

// Obtener carrito del comprador (o crearlo si no existe)
const obtenerCarrito = async (req, res, next) => {
  try {
    const id_comprador = getCompradorId(req);
    if (!id_comprador) return res.status(400).json({ mensaje: "Comprador no identificado" });

    let carrito = await Carrito.findOne({ id_comprador }).populate("items.id_lote");
    if (!carrito) {
      carrito = await Carrito.create({ id_comprador: new mongoose.Types.ObjectId(id_comprador), items: [] });
      carrito = await Carrito.findById(carrito._id).populate("items.id_lote");
    }
    res.json(carrito);
  } catch (error) {
    next(error);
  }
};

// Agregar al carrito (suma si ya existe)
const agregarAlCarrito = async (req, res, next) => {
  try {
    const id_comprador = getCompradorId(req);
    const { id_lote, cantidad = 1 } = req.body;

    if (!id_comprador) return res.status(400).json({ mensaje: "Comprador no identificado" });
    if (!id_lote) return res.status(400).json({ mensaje: "Falta id_lote" });

    let carrito = await Carrito.findOne({ id_comprador });
    if (!carrito) carrito = await Carrito.create({ id_comprador: new mongoose.Types.ObjectId(id_comprador), items: [] });

    const idx = carrito.items.findIndex(i => i.id_lote.toString() === id_lote.toString());
    if (idx >= 0) {
      carrito.items[idx].cantidad += Number(cantidad);
    } else {
      carrito.items.push({ id_lote: new mongoose.Types.ObjectId(id_lote), cantidad: Number(cantidad) });
    }

    await carrito.save();
    const carritoPop = await Carrito.findById(carrito._id).populate("items.id_lote");
    res.json({ mensaje: "Agregado al carrito", carrito: carritoPop });
  } catch (error) {
    next(error);
  }
};

// Actualizar cantidad de un item
const actualizarItem = async (req, res, next) => {
  try {
    const id_comprador = getCompradorId(req);
    const { id_lote } = req.params;
    const { cantidad } = req.body;

    if (!id_comprador) return res.status(400).json({ mensaje: "Comprador no identificado" });
    if (!id_lote) return res.status(400).json({ mensaje: "Falta id_lote" });

    const carrito = await Carrito.findOne({ id_comprador });
    if (!carrito) return res.status(404).json({ mensaje: "Carrito no encontrado" });

    const item = carrito.items.find(i => i.id_lote.toString() === id_lote.toString());
    if (!item) return res.status(404).json({ mensaje: "Item no encontrado en el carrito" });

    if (Number(cantidad) <= 0) {
      carrito.items = carrito.items.filter(i => i.id_lote.toString() !== id_lote.toString());
    } else {
      item.cantidad = Number(cantidad);
    }

    await carrito.save();
    const carritoPop = await Carrito.findById(carrito._id).populate("items.id_lote");
    res.json({ mensaje: "Carrito actualizado", carrito: carritoPop });
  } catch (error) {
    next(error);
  }
};

// Eliminar item del carrito
const eliminarItem = async (req, res, next) => {
  try {
    const id_comprador = getCompradorId(req);
    const { id_lote } = req.params;
    if (!id_comprador) return res.status(400).json({ mensaje: "Comprador no identificado" });

    const carrito = await Carrito.findOne({ id_comprador });
    if (!carrito) return res.status(404).json({ mensaje: "Carrito no encontrado" });

    carrito.items = carrito.items.filter(i => i.id_lote.toString() !== id_lote.toString());
    await carrito.save();
    const carritoPop = await Carrito.findById(carrito._id).populate("items.id_lote");
    res.json({ mensaje: "Item eliminado", carrito: carritoPop });
  } catch (error) {
    next(error);
  }
};

// Vaciar carrito
const vaciarCarrito = async (req, res, next) => {
  try {
    const id_comprador = getCompradorId(req);
    if (!id_comprador) return res.status(400).json({ mensaje: "Comprador no identificado" });

    await Carrito.findOneAndUpdate(
      { id_comprador },
      { items: [] },
      { upsert: true }
    );
    res.json({ mensaje: "Carrito vaciado" });
  } catch (error) {
    next(error);
  }
};

// Finalizar compra
const comprar = async (req, res, next) => {
  try {
    const id_comprador = getCompradorId(req);
    if (!id_comprador) return res.status(400).json({ mensaje: "Comprador no identificado" });

    const carrito = await Carrito.findOne({ id_comprador }).populate("items.id_lote");
    if (!carrito || carrito.items.length === 0) return res.status(400).json({ mensaje: "Carrito vacío" });

    const comprasCreadas = [];

    for (const item of carrito.items) {
      const lote = item.id_lote;
      const precio_kilo_final = lote.precio_kilo || 0;
      const precio_total = precio_kilo_final * Number(item.cantidad);

      // Aquí usamos el _id de Lote como referencia en la compra
      const nuevaCompra = new Compra({
        id_lte: lote._id, // tipo ObjectId
        codigo_cpr: Number(Date.now().toString().slice(-9)),
        id_comprador: new mongoose.Types.ObjectId(id_comprador),
        precio_kilo_final,
        precio_total,
        fecha: new Date()
      });

      await nuevaCompra.save();
      comprasCreadas.push(nuevaCompra);
    }

    // Vaciar carrito
    carrito.items = [];
    await carrito.save();

    res.json({ mensaje: "Compra realizada", compras: comprasCreadas });
  } catch (error) {
    next(error);
  }
};

export {
  obtenerCarrito,
  agregarAlCarrito,
  actualizarItem,
  eliminarItem,
  vaciarCarrito,
  comprar
};
