import { Especie } from "../models/Especie.js";

// Crear nueva especie
const crear = async (req, res, next) => {
  try {
    const especie = new Especie(req.body); // Mongo genera _id automáticamente
    await especie.save();

    // Poblamos el tipo para devolver el nombre junto a la especie
    const especiePopulada = await especie.populate("tipo", "nombre");
    res.json({ mensaje: "Especie creada", especie: especiePopulada });
  } catch (error) {
    next(error);
  }
};

// Consultar todas las especies con nombre del tipo
const consulta = async (req, res, next) => {
  try {
    const especies = await Especie.find({}).populate("tipo", "nombre"); // populate tipo
    res.json(especies);
  } catch (error) {
    next(error);
  }
};

// Consultar especie por _id con nombre del tipo
const consultaId = async (req, res, next) => {
  try {
    const especie = await Especie.findById(req.params.id).populate("tipo", "nombre");
    res.json(especie);
  } catch (error) {
    next(error);
  }
};

// Actualizar especie por _id
const actualizar = async (req, res, next) => {
  try {
    const especie = await Especie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const especiePopulada = await especie.populate("tipo", "nombre");
    res.json({ mensaje: "Especie actualizada", especie: especiePopulada });
  } catch (error) {
    next(error);
  }
};

// Eliminar especie por _id
const eliminar = async (req, res, next) => {
  try {
    await Especie.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Especie eliminada" });
  } catch (error) {
    next(error);
  }
};

export {
  crear,
  consulta,
  consultaId,
  actualizar,
  eliminar
};
