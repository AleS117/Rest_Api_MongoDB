// routes/rutasCarrito.js
import express from "express";
import {
  obtenerCarrito,
  agregarAlCarrito,
  actualizarItem,
  eliminarItem,
  vaciarCarrito,
  comprar
} from "../controllers/apiCarrito.js";

import { checkAuth } from "../middleware/checkkAuth.js"; // usa tu middleware

const router = express.Router();

// Todas protegidas: requiere login comprador
router.get("/", checkAuth, obtenerCarrito);                     // GET /api/carrito
router.post("/agregar", checkAuth, agregarAlCarrito);           // POST /api/carrito/agregar
router.put("/actualizar/:id_lote", checkAuth, actualizarItem); // PUT /api/carrito/actualizar/:id_lote
router.delete("/eliminar/:id_lote", checkAuth, eliminarItem);  // DELETE /api/carrito/eliminar/:id_lote
router.delete("/vaciar", checkAuth, vaciarCarrito);            // DELETE /api/carrito/vaciar
router.post("/comprar", checkAuth, comprar);                   // POST /api/carrito/comprar

export default router;
