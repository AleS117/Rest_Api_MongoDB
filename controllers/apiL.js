import { Lote } from "../models/Lote.js";

const crear = async (req, res, next) => {
    const datos = req.body;
    const lote = new Lote(datos);

    try {
        await lote.save();
        res.json({ mensaje: "Se creó el lote" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const consulta = async (req, res, next) => {
    try {
        const lotes = await Lote.find({});
        res.json(lotes);
    } catch (error) {
        console.log(error);
        next();
    }
};

const editar = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Lote.findByIdAndUpdate(id, req.body);
        res.json({ mensaje: "Lote actualizado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const eliminar = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Lote.findByIdAndDelete(id);
        res.json({ mensaje: "Lote eliminado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const ApiL = {
    crear,
    consulta,
    editar,
    eliminar
};
