import express from "express";
import { ApiL } from "../controllers/apiL.js";

const router = express.Router();

router.post("/crear", ApiL.crear);
router.get("/consulta", ApiL.consulta);
router.get("/consulta/:id", ApiL.consultaId);
router.put("/actualizar/:id", ApiL.editar);
router.delete("/eliminar/:id", ApiL.eliminar);

export default router;
