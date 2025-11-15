import express from "express";
import { ApiE } from "../controllers/apiE.js";

const router = express.Router();

router.post("/crear", ApiE.crear);
router.get("/consulta", ApiE.consulta);
router.get("/consulta/:id", ApiE.consultaId);
router.put("/actualizar/:id", ApiE.editar);
router.delete("/eliminar/:id", ApiE.eliminar);

export default router;
