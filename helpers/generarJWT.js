import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Generador simple de IDs (puede servir para tokens o validaciones)
export const generarID = () =>
    Math.random().toString(32).substring(2) + Date.now().toString(32);

// Generación de JWT
export const generarJWT = (info) =>
    jwt.sign(
        {
            id: info.id,
            correo: info.correo || null, 
            rol: info.rol || "usuario"
        },
        process.env.JWT_SECRET || "clave_super_secreta",
        {
            expiresIn: "1d",
        }
    );
