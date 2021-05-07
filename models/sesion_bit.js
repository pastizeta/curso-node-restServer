const { Schema,model} = require('mongoose');


const Sesion_bitSchema = Schema({
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    token:{
         type:String,
         required: true
     },
     fecha_fin:{
         type:Date,
         default: new Date()
     }
     
});




module.exports = model('Sesion_bit',Sesion_bitSchema);