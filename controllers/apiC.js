import { Compra } from "../models/Compra.js";

// Crear compra
const crear = async (req, res, next) => {
    try {
        const compra = new Compra(req.body);
        await compra.save();
        res.json({ mensaje: "Se creó la compra" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Consultar todas
const consulta = async (req, res, next) => {
    try {
        const compras = await Compra.find({});
        res.json(compras);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Consultar por id
const consultaId = async (req, res, next) => {
    try {
        const compra = await Compra.findById(req.params.id);
        res.json(compra);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Editar
const actualizar = async (req, res, next) => {
    try {
        await Compra.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Compra actualizada" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Eliminar
const eliminar = async (req, res, next) => {
    try {
        await Compra.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Compra eliminada" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Compras por comprador
const comprasPorComprador = async (req, res, next) => {
    try {
        const compras = await Compra.find({ codigo_cpr: req.params.id });
        res.json(compras);
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
    comprasPorComprador
};
