import { Tipo } from "../models/Tipo.js";

const crear = async (req, res, next) => {
    const datos = req.body;
    const tipo = new Tipo(datos);

    try {
        await tipo.save();
        res.json({ mensaje: "Se creó el tipo" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const consulta = async (req, res, next) => {
    try {
        const tipos = await Tipo.find({});
        res.json(tipos);
    } catch (error) {
        console.log(error);
        next();
    }
};

const editar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Tipo.findByIdAndUpdate(id, req.body);
        res.json({ mensaje: "Tipo actualizado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const eliminar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Tipo.findByIdAndDelete(id);
        res.json({ mensaje: "Tipo eliminado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const ApiT = {
    crear,
    consulta,
    editar,
    eliminar
};
