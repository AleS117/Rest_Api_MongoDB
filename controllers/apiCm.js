import { Comprador } from "../models/Comprador.js";

const crear = async (req, res, next) => {
    const datos = req.body;
    const comprador = new Comprador(datos);

    try {
        await comprador.save();
        res.json({ mensaje: "Se creó el comprador" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const consulta = async (req, res, next) => {
    try {
        const compradores = await Comprador.find({});
        res.json(compradores);
    } catch (error) {
        console.log(error);
        next();
    }
};

const editar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Comprador.findByIdAndUpdate(id, req.body);
        res.json({ mensaje: "Comprador actualizado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const eliminar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Comprador.findByIdAndDelete(id);
        res.json({ mensaje: "Comprador eliminado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const ApiCm = {
    crear,
    consulta,
    editar,
    eliminar
};
