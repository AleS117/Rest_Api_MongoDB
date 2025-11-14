import { Especie } from "../models/Especie.js";

const crear = async (req, res, next) => {
    const datos = req.body;
    const especie = new Especie(datos);

    try {
        await especie.save();
        res.json({ mensaje: "Se creó la especie" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const consulta = async (req, res, next) => {
    try {
        const especies = await Especie.find({});
        res.json(especies);
    } catch (error) {
        console.log(error);
        next();
    }
};

const editar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Especie.findByIdAndUpdate(id, req.body);
        res.json({ mensaje: "Especie actualizada" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const eliminar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Especie.findByIdAndDelete(id);
        res.json({ mensaje: "Especie eliminada" });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const ApiE = {
    crear,
    consulta,
    editar,
    eliminar
};
