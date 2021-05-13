const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png','jpg','gif','jpeg'], carpeta = '' ) =>{

    return new Promise((resolve,reject) =>{

        const { archivo } = files;

        //validar extension  
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
    
        // validar la extension    
        if ( !extensionesValidas.includes(extension) ){
            return reject(`La extension ${ extension } no es permitida, ( ${extensionesValidas} )`)
            
        }
        
        //se asigna un nombre unico con el paquete uuid
        const nombretemp =  uuidv4() + '.' + extension;
        uploadPath = path.join(__dirname, '../uploads/', carpeta , nombretemp);
      
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            
            resolve (nombretemp);
        });
    })
}


module.exports = {
    subirArchivo
}