// routes/rutasA.js
import express from "express";
import { crear, consulta, consultaId, actualizar, eliminar, login } from "../controllers/apiA.js";
import { checkAuth } from "../middleware/checkkAuth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

// LOGIN público
router.post("/login", login);

// CRUD ADMIN solo puede crear/editar/eliminar
router.post("/crear", checkAuth, checkRole(["ADMIN"]), crear);
router.get("/consulta", checkAuth, checkRole(["ADMIN", "TRABAJADOR"]), consulta);
router.get("/consulta/:id", checkAuth, checkRole(["ADMIN", "TRABAJADOR"]), consultaId);
router.put("/actualizar/:id", checkAuth, checkRole(["ADMIN"]), actualizar);
router.delete("/eliminar/:id", checkAuth, checkRole(["ADMIN"]), eliminar);

export default router;
