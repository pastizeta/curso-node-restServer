const express = require('express')
var cors = require('cors')

class Server{


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariospath = '/api/usuarios';

        // Midddlewares
        this.middlewares();
        ///Rutas de mi aplicacion
        this.routes();
    }


    middlewares(){

        //CORS
        this.app.use(cors());

        // Parseo y lectura de body
        this.app.use(express.json()); //cualquier informacion post, put,delete la intenta serializar a json

        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        
        this.app.use(this.usuariospath ,require('../routes/usuarios'));
       
    }

    listen(){
         
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en el puerto',this.port);
        });
    }

}

module.exports = Server;