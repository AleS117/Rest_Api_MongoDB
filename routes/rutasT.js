import express from "express";
import { crear, consulta, consultaId, actualizar, eliminar } from "../controllers/apiT.js";

const router = express.Router();

// 🔹 Rutas para Tipos
router.post("/nuevo", crear);             // Crear
router.get("/consulta", consulta);        // Listar todos
router.get("/:id", consultaId);           // Consultar por id
router.put("/editar/:id", actualizar);   // Actualizar
router.delete("/eliminar/:id", eliminar);// Eliminar

export default router;
