import {Lote} from "../models/Lote.js"

const crear=async(req,res,next)=>{
    const datos=req.body
    console.log(datos)
    const clientes=new cliente(datos)
    try{
        await clientes.save()
        res.json({
            mensaje:"Se creo el Lote"
        })
    }catch(error){
        res.send(error)
        next()
    }
    
}

const consulta=async(req,res,next)=>{
          
    try{
        const clientes=await cliente.find({})
        res.json(clientes)
    }catch(error){
         res.send(error)
        next()
    }
    
}
const consultaId=async(req,res,next)=>{
          
    try{
        const clientes=await cliente.findById(req.params.id)
        if(!clientes){
            res.json({
                mensaje:"El Lote no existe"
            })
            next
        }
        res.json(clientes)
    }catch(error){
         res.send(error)
        next()
    }
    
}
const actualizar=async(req,res,next)=>{
          
    try{
        console.log(req.params.id)
        const clientes=await cliente.findByIdAndUpdate({_id:req.params.id},
            req.body,{
                new:true
            })
            res.json(clientes)
       
    }catch(error){
         res.send(error)
        next()
    }
    
}
const eliminar=async(req,res,next)=>{
          
    try{
        console.log(req.params.id)
        const clientes=await cliente.findByIdAndDelete({_id:req.params.id},
            req.body,{
                new:true
            })
            res.json(clientes)
       
    }catch(error){
         res.send(error)
        next()
    }
    
}

export{
    crear,
    consulta,
    consultaId,
    actualizar,
    eliminar
}