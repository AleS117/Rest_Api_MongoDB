import { Administrador } from "../models/Administrador.js";

const crear = async (req, res, next) => {
    const datos = req.body;
    try {
        const admin = new Administrador(datos);
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


//FUNCIÓN LOGIN

const login = async (req, res, next) => {
    const { usuario, password } = req.body;

    try {

        // Buscar administrador por usuario
        const admin = await Administrador.findOne({ usuario });

        if (!admin) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        // Validar password (sin encriptar por ahora)
        if (admin.password !== password) {
            return res.status(400).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        // Login correcto
        res.json({
            mensaje: "Login correcto",
            usuario: admin.usuario,
            id: admin._id
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
