import { Administrador } from "../models/Administrador.js";
import { generarJWT } from "../helpers/generarJWT.js";

const crear = async (req, res, next) => {
    try {
        const admin = new Administrador(req.body);
        await admin.save();
        res.json({ mensaje: "Administrador creado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

const consulta = async (req, res, next) => {
    try {
        const admins = await Administrador.find({});
        res.json(admins);
    } catch (error) {
        console.log(error);
        next();
    }
};

const consultaId = async (req, res, next) => {
    try {
        const admin = await Administrador.findById(req.params.id);
        res.json(admin);
    } catch (error) {
        console.log(error);
        next();
    }
};

const actualizar = async (req, res, next) => {
    try {
        const admin = await Administrador.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(admin);
    } catch (error) {
        console.log(error);
        next();
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Administrador.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Administrador eliminado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

// LOGIN
const login = async (req, res, next) => {
    const { usuario, password } = req.body;

    try {
        const admin = await Administrador.findOne({ usuario });

        if (!admin) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        if (admin.password !== password) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        const token = generarJWT({
            id: admin._id,
            correo: admin.correo,
            rol: admin.rol
        });

        res.json({
            mensaje: "Login correcto",
            token,
            admin: {
                id: admin._id,
                usuario: admin.usuario,
                rol: admin.rol
            }
        });

    } catch (error) {
        console.log(error);
        next();
    }
};

export {
    crear,
    consulta,
    consultaId,
    actualizar,
    eliminar,
    login
};
