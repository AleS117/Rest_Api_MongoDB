import express from "express"
import { crear, consulta, consultaId, actualizar, eliminar } from "../controllers/apiA.js"

const router = express.Router()

router.post("/crear", crear)
router.get("/consulta", consulta)
router.get("/consulta/:id", consultaId)
router.put("/actualizar/:id", actualizar)
router.delete("/eliminar/:id", eliminar)

export default router
