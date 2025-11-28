// routes/rutasT.js
import express from "express";
import { crear, consulta, consultaId, actualizar, eliminar } from "../controllers/apiT.js";
import { checkAuth } from "../middleware/checkkAuth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

// ADMIN puede crear/editar/eliminar, TRABAJADOR solo GET
router.post("/nuevo", checkAuth, checkRole(["ADMIN"]), crear);
router.get("/consulta", checkAuth, checkRole(["ADMIN", "TRABAJADOR"]), consulta);
router.get("/:id", checkAuth, checkRole(["ADMIN", "TRABAJADOR"]), consultaId);
router.put("/editar/:id", checkAuth, checkRole(["ADMIN"]), actualizar);
router.delete("/eliminar/:id", checkAuth, checkRole(["ADMIN"]), eliminar);

export default router;
