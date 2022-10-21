"use strict";
exports.__esModule = true;
var express = require('express');
var ApiClass = require('./public/js/ApiClass.js');
var Contenedor = require('./public/js/Contenedor.js');
var app = express();
var HttpServer = require('http').Server;
var IOServer = require('socket.io').Server;
var httpServer = new HttpServer(app);
var Router = express.Router;
var routerProductos = Router();
var routerCarrito = Router();
var administrador = false;
var io = new IOServer(httpServer);
app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarrito);
app.use(express.static('./public'));
var contenedorProductos = new Contenedor('productos.txt');
var contenedorCarritos = new Contenedor('carritos.txt');
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));
routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }));
var productos = [];
var carritos = [];
var apiProductos = new ApiClass(productos);
var apiCarritos = new ApiClass(carritos);
routerProductos.get('/', function (req, res) {
    res.send({ productos: productos });
});
routerCarrito.get('', function (req, res) {
    res.send({ carrito: carritos });
});
routerProductos.get('/:id', function (req, res) {
    apiProductos.get(req, res);
});
routerProductos.post('', function (req, res) {
    apiProductos.add(req, res);
});
routerProductos.put('/:id', function (req, res) {
    apiProductos.modify(req, res);
});
routerProductos["delete"]('/:id', function (req, res) {
    apiProductos["delete"](req, res);
});
///////////////////////CARRITO////////////////////////
routerCarrito.get('/:id', function (req, res) {
    apiCarritos.get(req, res);
});
routerCarrito.get('/:id/productos', function (req, res) {
    apiCarritos.getProductsOfCarrito(req, res);
});
routerCarrito.post('/:id/productos', function (req, res) {
    apiCarritos.postProductsInCarrito(req, res);
});
routerCarrito.post('', function (req, res) {
    apiCarritos.addCarrito(req, res, productos);
});
routerCarrito.put('/:id', function (req, res) {
    apiCarritos.modify(req, res);
});
routerCarrito["delete"]('/:id', function (req, res) {
    apiCarritos["delete"](req, res);
});
routerCarrito["delete"]('/:id/productos/:id_prod', function (req, res) {
    apiCarritos.deleteProductInCarrito(req, res);
});
////////////////////////////////////////////////////////////////////////////////////////////////////
io.on('connection', function (socket) {
    console.log("Nuevo cliente conectado");
    socket.emit('carritos', carritos);
    socket.emit('productos', productos);
    socket.on('nuevo-producto', function (mensaje) {
        io.sockets.emit('productos', productos);
        if (productos.length == 0) {
            productos.push(mensaje);
            contenedorProductos.save(productos);
        }
        else {
            productos.push(mensaje);
            contenedorProductos.save(mensaje);
        }
    });
    socket.on('nuevo-producto', function (producto) {
        io.sockets.emit('productos', productos);
        if (productos.length == 0) {
            productos.push(producto);
            contenedorProductos.save(productos);
        }
        else {
            productos.push(producto);
            contenedorProductos.save(producto);
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////
var PORT = process.env.port || 8080;
//const server = app.listen(PORT,()=>{console.log('server runing')});
//server.on('error',(error:Error)=>console.log(`Error ${error}`));
httpServer.listen(PORT, function () { return console.log("SERVER ON"); }).on('error', function (error) { return console.log("Error en el servidor ".concat(error)); });
///////////////////////////////////TODO LIST///////////////////////////////////
/*
    1)TRABAJAR CON WEBSOCKET PARA MOSTRAR LOS PRODUCTOS QUE VAS AGREGANDO A LA LISTA
*/ 
