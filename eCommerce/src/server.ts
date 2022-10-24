import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import { Carrito } from './clases/carrito';
import { Producto } from './clases/producto';
import {authMiddleware} from './middlewares'
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
const io = new IOServer(httpServer);

app.use('/api/productos',routerProductos);
app.use('/api/carritos',routerCarrito);
app.use(express.static('./public'));

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

routerProductos.get('/', (req:Request,res:Response)=>{
    res.send({productos: productos});
})

routerCarrito.get('', (req:Request,res:Response)=>{
    res.send({carrito: carritos});
})

routerProductos.get('/:id', (req:Request,res:Response)=>{
    apiProductos.get(req,res);
})

routerProductos.post('',authMiddleware, (req:Request,res:Response)=>{
    contenedorProductos.save(productos);
    apiProductos.addProduct(req,res);
})

routerProductos.put('/:id',authMiddleware,(req:Request,res:Response)=>{
    apiProductos.modify(req,res);
})

routerProductos.delete('/:id',authMiddleware,(req:Request,res:Response)=>{
    apiProductos.delete(req,res);
})


routerCarrito.get('/:id',authMiddleware, (req:Request,res:Response)=>{
    apiCarritos.get(req,res);
})

routerCarrito.get('/:id/productos',authMiddleware,(req:Request,res:Response)=>{
    apiCarritos.getProductsOfCarrito(req,res);
})

routerCarrito.post('/:id/productos',authMiddleware,(req:Request,res:Response)=>{
    apiCarritos.postProductsInCarrito(req,res);
})

routerCarrito.post('',authMiddleware, (req:Request,res:Response)=>{
    contenedorProductos.save(carritos);
    apiCarritos.addCarrito(req,res,productos);
})

routerCarrito.put('/:id',authMiddleware,(req:Request,res:Response)=>{
    apiCarritos.modify(req,res);
})

routerCarrito.delete('/:id',authMiddleware,(req:Request,res:Response)=>{
    apiCarritos.delete(req,res);
})

routerCarrito.delete('/:id/productos/:id_prod',authMiddleware,(req:Request,res:Response)=>{
    apiCarritos.deleteProductInCarrito(req,res);
})

io.on('connection',(socket:Socket)=>{
    console.log("Nuevo cliente conectado");
    socket.emit('carritos',carritos);
    socket.emit('productos',productos);
    socket.on('nuevo-producto',producto=>{
        io.sockets.emit('productos',productos);
        if(productos.length==0){
            productos.push(producto);
            console.log("Guardando archivo de productos en el if");
            contenedorProductos.save(productos);
        }
        else{
            productos.push(producto);
            console.log("Guardando archivo de productos en el else");
            contenedorProductos.save(producto);  
        }
    })
    socket.on('nuevo-carrito',carrito=>{
        console.log("Socket de carrito on");
        
        io.sockets.emit('carritos',carritos);
        if(carritos.length==0){
            carritos.push(carrito);
            console.log("Guardando archivo de carrito en el if");
            
            contenedorCarritos.save(carritos);
        }
        else{
            carritos.push(carrito);
            console.log("Guardando archivo de carrito en el else");
            contenedorCarritos.save(carrito);
        }
    })
})

const PORT = process.env.port || 8080;
httpServer.listen(PORT,()=>console.log("SERVER ON")).on('error',(error:Error)=>console.log(`Error en el servidor ${error}`));

