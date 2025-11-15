import { Tipo } from "../models/Tipo.js";

const crear = async (req, res, next) => {
    try {
        const tipo = new Tipo(req.body);
        await tipo.save();
        res.json({ mensaje: "Tipo creado" });
    } catch (error) {
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        res.json(await Tipo.find({}));
    } catch (error) {
        next(error);
    }
};

const consultaId = async (req, res, next) => {
    try {
        res.json(await Tipo.findById(req.params.id));
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        await Tipo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Tipo actualizado" });
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Tipo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Tipo eliminado" });
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
