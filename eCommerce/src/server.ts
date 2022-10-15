import { Request, Response } from 'express';
import { Carrito } from './clases/carrito';
import { Producto } from './clases/producto';
const express = require('express');
const ApiClass = require ('./public/js/ApiClass.js');
const Contenedor = require ('./public/js/Contenedor.js');

const app = express();
const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io');
const httpServer = new HttpServer(app);
const {Router} = express;
const routerProductos = Router();
const routerCarrito = Router();
let administrador:Boolean = false;

app.use('/api/productos',routerProductos);
app.use('/api/carritos',routerCarrito);
app.use(express.static('public'));

const contenedorProductos = new Contenedor('productos.txt');
const contenedorCarritos = new Contenedor('carritos.txt');

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: true}));

routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({extended: true}));


const productos:Producto[] = [];
let carritos:Carrito[] = [];

let apiProductos = new ApiClass(productos);
let apiCarritos = new ApiClass(carritos);

routerProductos.get('', (req:Request,res:Response)=>{
    res.send({productos: productos});
})

routerCarrito.get('', (req:Request,res:Response)=>{
    res.send({carrito: carritos});
})

routerProductos.get('/:id', (req:Request,res:Response)=>{
    apiProductos.get(req,res);
})

routerProductos.post('', (req:Request,res:Response)=>{
    apiProductos.add(req,res);
})

routerProductos.put('/:id',(req:Request,res:Response)=>{
    apiProductos.modify(req,res);
})

routerProductos.delete('/:id',(req:Request,res:Response)=>{
    apiProductos.delete(req,res);
})

///////////////////////CARRITO////////////////////////

routerCarrito.get('/:id', (req:Request,res:Response)=>{
    apiCarritos.get(req,res);
})

routerCarrito.post('', (req:Request,res:Response)=>{
    apiCarritos.add(req,res);
})

routerCarrito.put('/:id',(req:Request,res:Response)=>{
    apiCarritos.modify(req,res);
})

routerCarrito.delete('/:id',(req:Request,res:Response)=>{
    apiCarritos.delete(req,res);
})

const PORT = process.env.port || 8080;
const server = app.listen(PORT,()=>{console.log('server runing')});
server.on('error',(error:Error)=>console.log(`Error ${error}`));

///////////////////////////////////TODO LIST///////////////////////////////////
/*
    1)TRABAJAR CON WEBSOCKET PARA MOSTRAR LOS PRODUCTOS QUE VAS AGREGANDO A LA LISTA
    2)FIJARSE SI SE PUEDE DECIR EL TYPEOF SOBRE EL ELEMENTO QUE SE ESTÁ AGREGANDO CON LA FUNCIÓN ADD O SI HAY QUE CAMBIAR DE INTERFACES A CLASES
*/