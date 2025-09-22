const mongoose = require('mongoose');
//const url = 'mongodb://localhost/universidad';
const express = require('express');
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/universidad",{
    useNewUrlParser:true,
    //useCreateInde,
    useUniFiedTopology:true,
    //useFindAndMod:false,
})
.then(()=>console.log('Base de datos conectada'))
.catch((e)=>console.log('Se detecto un error en la conexion:'+e))

const {Schema} = mongoose;
const useasignaturas = new Schema({
    _id:String,
    Materia:String,
    Creditos:String
});
 
const ModeloAsig = mongoose.model('asignaturas',useasignaturas);
 
//const listar = async () => {
  //  const Listasig = await ModeloAsig.find()
    //console.log(Listasig)
//}
 
//listar();



// Listar todas las asignaturas
app.get('/asignaturas', async (req, res) => {
    try {
        const asignaturas = await ModeloAsig.find();
        res.json(asignaturas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Crear nueva asignatura
app.post('/asignaturas', async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({ error: "Debes enviar un _id en el cuerpo del request" });
        }


        const nueva = new ModeloAsig(req.body);
        await nueva.save();
        res.status(201).json(nueva);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Buscar por ID
app.get('/asignaturas/:id', async (req, res) => {
    try {
        const asignatura = await ModeloAsig.findById(req.params.id);
        if (!asignatura) {
            return res.status(404).json({ error: "Asignatura no encontrada" });
        }
        res.json(asignatura);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Actualizar (PUT reemplaza todo el documento)
app.put('/asignaturas/:id', async (req, res) => {
    try {
        const actualizado = await ModeloAsig.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizado) {
            return res.status(404).json({ error: "Asignatura no encontrada" });
        }
        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Actualizar parcialmente (PATCH)
app.patch('/asignaturas/:id', async (req, res) => {
    try {
        const actualizado = await ModeloAsig.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!actualizado) {
            return res.status(404).json({ error: "Asignatura no encontrada" });
        }
        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Eliminar
app.delete('/asignaturas/:id', async (req, res) => {
    try {
        const eliminado = await ModeloAsig.findByIdAndDelete(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: "Asignatura no encontrada" });
        }
        res.json({ mensaje: '✅ Asignatura eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🚀 Iniciar servidor
app.listen(3000, () => console.log("Servidor corriendo en 👉 http://localhost:3000"));