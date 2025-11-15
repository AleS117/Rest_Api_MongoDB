import { Administrador } from "../models/Administrador.js";

// Crear admin
const crear = async (req, res, next) => {
    try {
        const admin = new Administrador(req.body);
        await admin.save();
        res.json({ mensaje: "Administrador creado" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Consultar todos
const consulta = async (req, res, next) => {
    try {
        const admins = await Administrador.find({});
        res.json(admins);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Consultar por id
const consultaId = async (req, res, next) => {
    try {
        const admin = await Administrador.findById(req.params.id);
        res.json(admin);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Actualizar admin
const actualizar = async (req, res, next) => {
    try {
        const admin = await Administrador.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(admin);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Eliminar admin
const eliminar = async (req, res, next) => {
    try {
        await Administrador.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Administrador eliminado" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// LOGIN seguro
const login = async (req, res, next) => {
    const { usuario, password } = req.body;

    try {
        const admin = await Administrador.findOne({ usuario });

        if (!admin) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        const validPass = await admin.comparePassword(password);
        if (!validPass) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        res.json({
            mensaje: "Login correcto",
            usuario: admin.usuario,
            id: admin._id,
            nombre: admin.nombre
        });

    } catch (error) {
        console.log(error);
        next(error);
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
