import express from "express";
import {
    crear,
    consulta,
    consultaId,
    actualizar,
    eliminar
} from "../controllers/apiE.js";

const router = express.Router();

router.post("/crear", crear);              // Crear nueva especie
router.get("/consulta", consulta);         // Listar todas
router.get("/consulta/:id", consultaId);   // Consultar por id
router.put("/actualizar/:id", actualizar);// Actualizar por id
router.delete("/eliminar/:id", eliminar); // Eliminar por id

export default router;
