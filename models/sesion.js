const { Schema,model} = require('mongoose');


const SesionSchema = Schema({
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    token:{
         type:String,
         required: true
     }
     
});




module.exports = model('Sesion',SesionSchema);