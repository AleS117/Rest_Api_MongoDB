import express from "express";
import { ApiT } from "../controllers/ApiT.js";

const router = express.Router();

router.post("/crear", ApiT.crear);
router.get("/consulta", ApiT.consulta);
router.get("/consulta/:id", ApiT.consultaId);
router.put("/actualizar/:id", ApiT.editar);
router.delete("/eliminar/:id", ApiT.eliminar);

export default router;
