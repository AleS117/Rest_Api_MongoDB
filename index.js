import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Rutas
import rutasA from "./routes/rutasA.js";   // Administrador
import rutasC from "./routes/rutasC.js";   // Compras
import rutasCm from "./routes/rutasCm.js"; // Compradores
import rutasE from "./routes/rutasE.js";   // Especies
import rutasL from "./routes/rutasL.js";   // Lotes
import rutasT from "./routes/rutasT.js";   // Tipo

const app = express();

//   Conexión a MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://haloprom091_db_user:3zQxbCC7vbVVEuxS@cluster0.measa7g.mongodb.net/Lonja_Veracruz?appName=Cluster0"
        );
        console.log("📌 MongoDB conectado correctamente.");
    } catch (error) {
        console.log("❌ Error al conectar MongoDB:", error);
    }
};

conectarDB();

//   Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//   Rutas principales
app.use("/api/administrador", rutasA);
app.use("/api/compras", rutasC);
app.use("/api/compradores", rutasCm);
app.use("/api/especies", rutasE);
app.use("/api/lotes", rutasL);
app.use("/api/tipo", rutasT);

//   Servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor API funcionando en el puerto ${PORT}`);
});
