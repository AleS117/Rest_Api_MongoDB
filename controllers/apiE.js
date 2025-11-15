import { Especie } from "../models/Especie.js";

const crear = async (req, res, next) => {
    try {
        const especie = new Especie(req.body);
        await especie.save();
        res.json({ mensaje: "Se creó la especie" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        const especies = await Especie.find({});
        res.json(especies);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Faltaba
const consultaId = async (req, res, next) => {
    try {
        const especie = await Especie.findById(req.params.id);
        res.json(especie);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const editar = async (req, res, next) => {
    try {
        await Especie.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Especie actualizada" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Especie.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Especie eliminada" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const ApiE = {
    crear,
    consulta,
    consultaId,
    editar,
    eliminar
};
