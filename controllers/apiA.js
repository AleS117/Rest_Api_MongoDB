import { Administrador } from "../models/Administrador.js";
import crypto from "crypto";
import { correoRegistro } from "../helpers/correoRegistro.js";

const crear = async (req, res, next) => {
    try {
        const admin = new Administrador(req.body);

        admin.token = crypto.randomBytes(20).toString("hex");
        await admin.save();

        await correoRegistro({
            nombre: admin.usuario,
            correo: admin.correo,
            token: admin.token
        });

        res.json({ mensaje: "Administrador registrado. Revisa tu correo." });
    } catch (error) {
        next(error);
    }
};

const consulta = async (req, res, next) => {
    try {
        res.json(await Administrador.find({}));
    } catch (error) {
        next(error);
    }
};

const consultaId = async (req, res, next) => {
    try {
        res.json(await Administrador.findById(req.params.id));
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        res.json(await Administrador.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Administrador.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Administrador eliminado" });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const admin = await Administrador.findOne({ correo: req.body.correo });
        if (!admin) return res.status(404).json({ mensaje: "Correo no encontrado" });

        const valid = await admin.comparePassword(req.body.password);
        if (!valid) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

        if (!admin.confirmado) {
            return res.status(401).json({ mensaje: "Confirma tu cuenta primero." });
        }

        res.json({
            mensaje: "Login correcto",
            id: admin._id,
            usuario: admin.usuario
        });
    } catch (error) {
        next(error);
    }
};

const confirmarCuenta = async (req, res, next) => {
    try {
        const admin = await Administrador.findOne({ token: req.params.token });
        if (!admin) return res.status(400).json({ mensaje: "Token no válido" });

        admin.confirmado = true;
        admin.token = null;
        await admin.save();

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
