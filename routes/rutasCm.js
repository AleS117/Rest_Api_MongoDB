// routes/rutasCm.js
import express from "express";
import {
    crear,
    consulta,
    consultaId,
    actualizar,
    eliminar,
    login
} from "../controllers/apiCm.js";

const router = express.Router();

// CRUD comprador
router.post("/crear", crear);
router.get("/consulta", consulta);
router.get("/consulta/:id", consultaId);
router.put("/actualizar/:id", actualizar);
router.delete("/eliminar/:id", eliminar);

// LOGIN comprador
router.post("/login", login);

export default router;
