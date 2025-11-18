import mongoose from "mongoose";

// Modelos
import { Administrador } from "../models/Administrador.js";
import { Comprador } from "../models/Comprador.js";
import { Tipo } from "../models/Tipo.js";
import { Especie } from "../models/Especie.js";
import { Lote } from "../models/Lote.js";
import { Compra } from "../models/Compra.js";

const conectarDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Lonja_Veracruz");
        console.log("MongoDB conectado para seed.");
    } catch (error) {
        console.error("Error al conectar DB:", error);
        process.exit(1);
    }
};

const seed = async () => {
    await conectarDB();

    // BORRAR TODO
    await Administrador.deleteMany({});
    await Comprador.deleteMany({});
    await Tipo.deleteMany({});
    await Especie.deleteMany({});
    await Lote.deleteMany({});
    await Compra.deleteMany({});

    console.log("Colecciones limpiadas.");

    // INSERTAR DATOS
    const admins = await Administrador.insertMany([
        {
            _id: 1,
            usuario: "admin",
            correo: "admin@lonja.com",
            password: "12345",
            rol: "admin"
        }
    ]);

    const compradores = await Comprador.insertMany([
        {
            _id: 1,
            nombre: "Carlos",
            apellido_paterno: "Martínez",
            apellido_materno: "Lopez",
            direccion: "Calle 123",
            correo: "carlos@mail.com",
            password: "12345"
        },
        {
            _id: 2,
            nombre: "Lucia",
            apellido_paterno: "Santos",
            apellido_materno: "Perez",
            direccion: "Av Central 55",
            correo: "lucia@mail.com",
            password: "12345"
        }
    ]);

    const tipos = await Tipo.insertMany([
        { _id: 1, nombre: "Frutas" },
        { _id: 2, nombre: "Verduras" }
    ]);

    const especies = await Especie.insertMany([
        { _id: 1, nombre: "Mango", id_tpo: 1, imagen: "mango.jpg" },
        { _id: 2, nombre: "Aguacate", id_tpo: 1, imagen: "aguacate.jpg" },
        { _id: 3, nombre: "Zanahoria", id_tpo: 2, imagen: "zanahoria.jpg" }
    ]);

    const lotes = await Lote.insertMany([
        { _id: 1, kilos: 120, numero_cajas: 10, precio_kilo: 30, fecha: new Date() },
        { _id: 2, kilos: 80, numero_cajas: 8, precio_kilo: 25, fecha: new Date() }
    ]);

    const compras = await Compra.insertMany([
        {
            _id: 1,
            id_lte: 1,
            codigo_cpr: 1,
            precio_kilo_final: 32,
            precio_total: 3840,
            fecha: new Date()
        },
        {
            _id: 2,
            id_lte: 2,
            codigo_cpr: 2,
            precio_kilo_final: 27,
            precio_total: 2160,
            fecha: new Date()
        }
    ]);

    console.log("Datos insertados correctamente.");
    process.exit();
};

seed();
