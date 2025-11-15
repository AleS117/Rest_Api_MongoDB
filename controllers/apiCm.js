// controllers/apiCm.js
import { Comprador } from "../models/Comprador.js";

// Crear comprador
const crear = async (req, res, next) => {
    try {
        const comprador = new Comprador(req.body);
        await comprador.save();
        res.json({ mensaje: "Comprador creado correctamente" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Consultar todos los compradores
const consulta = async (req, res, next) => {
    try {
        const compradores = await Comprador.find({});
        res.json(compradores);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Consultar comprador por ID
const consultaId = async (req, res, next) => {
    try {
        const comprador = await Comprador.findById(req.params.id);
        res.json(comprador);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Actualizar comprador
const actualizar = async (req, res, next) => {
    try {
        const comprador = await Comprador.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(comprador);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Eliminar comprador
const eliminar = async (req, res, next) => {
    try {
        await Comprador.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Comprador eliminado" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// LOGIN comprador
const login = async (req, res, next) => {
    const { correo, password } = req.body;

    try {
        const comprador = await Comprador.findOne({ correo });

        if (!comprador) {
            return res.status(404).json({ mensaje: "Correo no encontrado" });
        }

        // Sin encriptar por ahora
        if (comprador.password !== password) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        res.json({
            mensaje: "Login correcto",
            id: comprador._id,
            nombre: comprador.nombre
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
