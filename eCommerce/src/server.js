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
app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarrito);
app.use(express.static('public'));
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
routerProductos.get('', function (req, res) {
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
routerCarrito.post('', function (req, res) {
    apiCarritos.add(req, res);
});
routerCarrito.put('/:id', function (req, res) {
    apiCarritos.modify(req, res);
});
routerCarrito["delete"]('/:id', function (req, res) {
    apiCarritos["delete"](req, res);
});
var PORT = process.env.port || 8080;
var server = app.listen(PORT, function () { console.log('server runing'); });
server.on('error', function (error) { return console.log("Error ".concat(error)); });
///////////////////////////////////TODO LIST///////////////////////////////////
/*
    1)TRABAJAR CON WEBSOCKET PARA MOSTRAR LOS PRODUCTOS QUE VAS AGREGANDO A LA LISTA
    2)FIJARSE SI SE PUEDE DECIR EL TYPEOF SOBRE EL ELEMENTO QUE SE ESTÁ AGREGANDO CON LA FUNCIÓN ADD O SI HAY QUE CAMBIAR DE INTERFACES A CLASES
*/ 
