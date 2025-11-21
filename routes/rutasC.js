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

const router = express.Router();

// CRUD compras
router.post("/crear", crear);
router.get("/consulta", consulta);
router.get("/consulta/:id", consultaId);
router.put("/actualizar/:id", actualizar);
router.delete("/eliminar/:id", eliminar);

// Obtener compras de un comprador
router.get("/comprador/:id", comprasPorComprador);

// 🔹 Nuevo endpoint: compras de un comprador por fecha
router.get("/por-comprador/:id/fecha/:fecha", comprasPorCompradorPorFecha);

export default router;
