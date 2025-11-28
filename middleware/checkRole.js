// middleware/checkRole.js
export const checkRole = (rolesPermitidos) => {
  return (req, res, next) => {
    const user = req.usuario;

    if (!user || !rolesPermitidos.includes(user.rol)) {
      return res.status(403).json({ mensaje: "Acceso denegado" });
    }

    next();
  };
};
