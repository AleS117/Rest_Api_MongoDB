import { Comprador } from "../models/Comprador.js";
import { Compra } from "../models/Compra.js";

const login = async (req, res, next) => {
    const { correo, password } = req.body;

    try {
        const comprador = await Comprador.findOne({ correo });

        if (!comprador) {
            return res.status(404).json({
                mensaje: "Correo no encontrado"
            });
        }

        if (comprador.password !== password) {
            return res.status(400).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        res.json({
            mensaje: "Login correcto",
            id: comprador._id,
            nombre: comprador.nombre
        });

    } catch (error) {
        console.log(error);
        next();
    }
};
