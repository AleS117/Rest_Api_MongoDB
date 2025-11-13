import express from "express"
import router from "./routes/rutasE.js"
import mongoose from "mongoose"
import cors from "cors"

mongoose.Promise=global.Promise
mongoose.connect('mongodb+srv://<haloprom091_db_user>:<3zQxbCC7vbVVEuxS>@cluster0.measa7g.mongodb.net/Lonja_Veracruz?appName=Cluster0')
const app=express()

//accesos json
app.use(express.json())

//accesos a los datos del formulario
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api",router)

app.listen(3001)