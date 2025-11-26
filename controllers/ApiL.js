import { Lote } from "../models/Lote.js";

const crear = async (req, res, next) => {
    try {
        const lote = new Lote(req.body);
        await lote.save();
        res.json({ mensaje: "Lote creado" });
    } catch (error) {
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        const lotes = await Lote.find({});
        res.json(lotes);
    } catch (error) {
        next(error);
    }
};

const consultaId = async (req, res, next) => {
    try {
        const lote = await Lote.findById(req.params.id);
        res.json(lote);
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        await Lote.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Lote actualizado" });
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Lote.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Lote eliminado" });
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
