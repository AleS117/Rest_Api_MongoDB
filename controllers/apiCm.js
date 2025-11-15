import { Comprador } from "../models/Comprador.js";
import crypto from "crypto";
import { correoRegistro } from "../helpers/correoRegistro.js";

const crear = async (req, res, next) => {
    try {
        const comprador = new Comprador(req.body);
        comprador.token = crypto.randomBytes(20).toString("hex");
        await comprador.save();

        await correoRegistro({
            nombre: comprador.nombre,
            correo: comprador.correo,
            token: comprador.token
        });

        res.json({ mensaje: "Comprador registrado. Revisa tu correo." });
    } catch (error) {
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        res.json(await Comprador.find({}));
    } catch (error) {
        next(error);
    }
};

const consultaId = async (req, res, next) => {
    try {
        res.json(await Comprador.findById(req.params.id));
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        res.json(await Comprador.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Comprador.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Comprador eliminado" });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const comprador = await Comprador.findOne({ correo: req.body.correo });
        if (!comprador) return res.status(404).json({ mensaje: "Correo no encontrado" });

        const valid = await comprador.comparePassword(req.body.password);
        if (!valid) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

        if (!comprador.confirmado) {
            return res.status(401).json({ mensaje: "Confirma tu cuenta primero." });
        }

        res.json({
            mensaje: "Login correcto",
            id: comprador._id,
            nombre: comprador.nombre
        });
    } catch (error) {
        next(error);
    }
};

const confirmarCuenta = async (req, res, next) => {
    try {
        const comprador = await Comprador.findOne({ token: req.params.token });
        if (!comprador) return res.status(400).json({ mensaje: "Token no válido" });

        comprador.confirmado = true;
        comprador.token = null;
        await comprador.save();

        res.json({ mensaje: "Cuenta confirmada correctamente" });
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
    login,
    confirmarCuenta
};
