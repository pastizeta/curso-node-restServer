const { Schema,model} = require('mongoose');


const CategoriaSchema = Schema({
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
        required: true
    },
    subcategorias:[{
            type:Schema.Types.ObjectId,
            ref:'Subcategoria',
            required:[true,'Las subcategorias son obligatorias']
        }]
});




module.exports = model('Categoria',CategoriaSchema);