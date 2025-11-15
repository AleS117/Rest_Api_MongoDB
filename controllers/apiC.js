import { Compra } from "../models/Compra.js";

const crear = async (req, res, next) => {
    try {
        const compra = new Compra(req.body);
        await compra.save();
        res.json({ mensaje: "Compra creada" });
    } catch (error) {
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        res.json(await Compra.find({}));
    } catch (error) {
        next(error);
    }
};

const consultaId = async (req, res, next) => {
    try {
        res.json(await Compra.findById(req.params.id));
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        await Compra.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: "Compra actualizada" });
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Compra.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Compra eliminada" });
    } catch (error) {
        next(error);
    }
};

const comprasPorComprador = async (req, res, next) => {
    try {
        const compras = await Compra.find({ codigo_cpr: req.params.id });
        res.json(compras);
    } catch (error) {
        next(error);
    }
};

export {
    crear,
    consulta,
    consultaId,
    actualizar,
    eliminar,
    comprasPorComprador
};
