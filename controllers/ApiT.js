import { Tipo } from "../models/Tipo.js";

const crear = async (req, res, next) => {
    try {
        const tipo = new Tipo(req.body);
        await tipo.save();
        res.json({ mensaje: "Se creó el tipo" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        const tipos = await Tipo.find({});
        res.json(tipos);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Faltaba
const consultaId = async (req, res, next) => {
    try {
        const tipo = await Tipo.findById(req.params.id);
        res.json(tipo);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const editar = async (req, res, next) => {
    try {
        await Tipo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Tipo actualizado" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Tipo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Tipo eliminado" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const ApiT = {
    crear,
    consulta,
    consultaId,
    editar,
    eliminar
};
