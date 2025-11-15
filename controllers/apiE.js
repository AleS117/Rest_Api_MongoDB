import { Especie } from "../models/Especie.js";

const crear = async (req, res, next) => {
    try {
        const especie = new Especie(req.body);
        await especie.save();
        res.json({ mensaje: "Especie creada" });
    } catch (error) {
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        res.json(await Especie.find({}));
    } catch (error) {
        next(error);
    }
};

const consultaId = async (req, res, next) => {
    try {
        res.json(await Especie.findById(req.params.id));
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        await Especie.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Especie actualizada" });
    } catch (error) {
        next(error);
    }
};

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
