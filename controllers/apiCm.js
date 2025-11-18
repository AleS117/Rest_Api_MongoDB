import { Comprador } from "../models/Comprador.js";
import { generarJWT } from "../helpers/generarJWT.js";

const crear = async (req, res, next) => {
    try {
        const comprador = new Comprador(req.body);
        await comprador.save();
        res.json({ mensaje: "Comprador creado" });
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

const consultaId = async (req, res, next) => {
    try {
        const comprador = await Comprador.findById(req.params.id);
        res.json(comprador);
    } catch (error) {
        console.log(error);
        next();
    }
};

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
        next();
    }
};

const eliminar = async (req, res, next) => {
    try {
        await Comprador.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Comprador eliminado" });
    } catch (error) {
        console.log(error);
        next();
    }
};

// LOGIN
const login = async (req, res, next) => {
    const { correo, password } = req.body;

    try {
        const comprador = await Comprador.findOne({ correo });

        if (!comprador) {
            return res.status(404).json({ mensaje: "Correo no encontrado" });
        }

        if (comprador.password !== password) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        const token = generarJWT({
            id: comprador._id,
            correo: comprador.correo,
            rol: "comprador"
        });

        res.json({
            mensaje: "Login correcto",
            token,
            comprador: {
                id: comprador._id,
                nombre: comprador.nombre,
                correo: comprador.correo
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
