// routes/rutasC.js
import express from "express";
import { 
  crear, 
  consulta, 
  consultaId,
  actualizar, 
  eliminar, 
  comprasPorComprador, 
  comprasPorCompradorPorFecha 
} from "../controllers/apiC.js";

import { checkAuth } from "../middleware/checkkAuth.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

// Consultas generales
router.get("/consulta", checkAuth, checkRole(["ADMIN", "TRABAJADOR"]), consulta);

// Consulta por ID
router.get("/consulta/:id", checkAuth, checkRole(["ADMIN", "TRABAJADOR"]), consultaId);

// Crear compra
router.post("/crear", checkAuth, checkRole(["ADMIN"]), crear);

// Actualizar
router.put("/actualizar/:id", checkAuth, checkRole(["ADMIN"]), actualizar);

// Eliminar
router.delete("/eliminar/:id", checkAuth, checkRole(["ADMIN"]), eliminar);

// Compras de un comprador
router.get("/comprador/:id", checkAuth, checkRole(["ADMIN", "TRABAJADOR", "COMPRADOR"]), comprasPorComprador);

// Compras por fecha exacta de un comprador
router.get("/por-comprador/:id/fecha/:fecha", checkAuth, checkRole(["ADMIN", "TRABAJADOR", "COMPRADOR"]), comprasPorCompradorPorFecha);

export default router;
