import { Compra } from "../models/Compra.js";

const crear = async (req, res, next) => {
    const datos = req.body;
    const compra = new Compra(datos);

    try {
        await compra.save();
        res.json({ mensaje: "Se creó la compra" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const consulta = async (req, res, next) => {
    try {
        const compras = await Compra.find({});
        res.json(compras);
    } catch (error) {
        console.log(error);
        next();
    }
};

const editar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Compra.findByIdAndUpdate(id, req.body);
        res.json({ mensaje: "Compra actualizada" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const eliminar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Compra.findByIdAndDelete(id);
        res.json({ mensaje: "Compra eliminada" });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const ApiC = {
    crear,
    consulta,
    editar,
    eliminar
};
