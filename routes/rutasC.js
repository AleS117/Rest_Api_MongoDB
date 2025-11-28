// compradores.js
import express from "express";
import { crear, consulta, actualizar, eliminar } from "../controllers/apiCm.js";
import { checkAuth } from "../middleware/checkkAuth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

router.get("/consulta", checkAuth, checkRole(["ADMIN", "TRABAJADOR"]), consulta);
router.post("/crear", checkAuth, checkRole(["ADMIN"]), crear);
router.put("/actualizar/:id", checkAuth, checkRole(["ADMIN"]), actualizar);
router.delete("/eliminar/:id", checkAuth, checkRole(["ADMIN"]), eliminar);

export default router;
