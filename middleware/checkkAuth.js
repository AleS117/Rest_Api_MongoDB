// middleware/checkkAuth.js
import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "No autorizado. Token no recibido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "clave_super_secreta");
    req.usuario = decoded; // Incluye id, correo, rol
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};
