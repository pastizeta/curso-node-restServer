const { Schema,model} = require('mongoose');


const SubcategoriaSchema = Schema({
     nombre:{
         type:String,
         required: [true,'El nombre es obligatorio'],
         unique:true
     },
     estado:{
        type:Boolean,
        default: true,
        required: true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }


});




module.exports = model('Subcategoria',SubcategoriaSchema);