import { Lote } from "../models/Lote.js";

const crear = async (req, res, next) => {
    try {
        const lote = new Lote(req.body);
        await lote.save();
        res.json({ mensaje: "Se creó el lote" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        const lotes = await Lote.find({});
        res.json(lotes);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Faltaba
const consultaId = async (req, res, next) => {
    try {
        const lote = await Lote.findById(req.params.id);
        res.json(lote);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const editar = async (req, res, next) => {
    try {
        await Lote.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Lote actualizado" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Lote.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Lote eliminado" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const ApiL = {
    crear,
    consulta,
    consultaId,
    editar,
    eliminar
};
