const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth :       '/api/auth',
            buscar :     '/api/buscar',
            usuarios :   '/api/usuarios',
            productos :  '/api/productos',
            categorias : '/api/categorias',
            subcategorias : '/api/subcategorias',
            sesion:      '/api/sesiones',
            uploads:      '/api/uploads'
        }


      
        //conectar a base de datos
        this.conectarDB();
        // Midddlewares
        this.middlewares();
        ///Rutas de mi aplicacion
        this.routes();


    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // Parseo y lectura de body
        this.app.use(express.json()); //cualquier informacion post, put,delete la intenta serializar a json

        //directorio publico
        this.app.use( express.static('public') );

        //Carga de Archivos
        this.app.use( fileUpload({
                        useTempFiles : true,
                        tempFileDir : '/tmp/',
                        createParentPath : true
                    }));
    }

    routes(){
        
        this.app.use(this.paths.auth ,require('../routes/auth'));
        this.app.use(this.paths.buscar ,require('../routes/buscar'));
        this.app.use(this.paths.usuarios ,require('../routes/usuarios'));
        this.app.use(this.paths.productos ,require('../routes/productos'));
        this.app.use(this.paths.categorias ,require('../routes/categorias'));
        this.app.use(this.paths.subcategorias ,require('../routes/subcategorias'));
        this.app.use(this.paths.sesion ,require('../routes/sesiones'));
        this.app.use(this.paths.uploads ,require('../routes/uploads'));
       
    }

    listen(){
         
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en el puerto',this.port);
        });
    }

}

module.exports = Server;