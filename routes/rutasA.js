import express from "express";
import {
    crear,
    consulta,
    consultaId,
    actualizar,
    eliminar,
    login
} from "../controllers/apiA.js";
import { checkAuth } from "../middleware/checkkAuth.js";

const router = express.Router();

router.post("/login", login);

router.post("/crear", checkAuth, crear);
router.get("/consulta", checkAuth, consulta);
router.get("/consulta/:id", checkAuth, consultaId);
router.put("/actualizar/:id", checkAuth, actualizar);
router.delete("/eliminar/:id", checkAuth, eliminar);

export default router;
