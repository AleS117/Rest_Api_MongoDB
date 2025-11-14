import { Administrador } from "../models/Administrador.js";

const crear = async (req, res, next) => {
    const datos = req.body;
    const admin = new Administrador(datos);

    try {
        await admin.save();
        res.json({ mensaje: "Se creó el administrador" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const consulta = async (req, res, next) => {
    try {
        const admins = await Administrador.find({}).select("-password");
        res.json(admins);
    } catch (error) {
        console.log(error);
        next();
    }
};

const editar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Administrador.findByIdAndUpdate(id, req.body);
        res.json({ mensaje: "Administrador actualizado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const eliminar = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Administrador.findByIdAndDelete(id);
        res.json({ mensaje: "Administrador eliminado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

export const ApiA = {
    crear,
    consulta,
    editar,
    eliminar
};
