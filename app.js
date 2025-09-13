const mongoose = require('mongoose');
const url = 'mongodb://localhost/universidad';

mongoose.connect(url,{
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
    materia:String,
    creditos:String
});
 
const ModeloAsig = mongoose.model('asignaturas',useasignaturas);
 
const listar = async () => {
    const Listasig = await ModeloAsig.find()
    console.log(Listasig)
}
 
listar();