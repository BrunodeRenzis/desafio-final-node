"use strict";
exports.__esModule = true;
var middlewares_1 = require("./middlewares");
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
routerProductos.post('', middlewares_1.authMiddleware, function (req, res) {
    contenedorProductos.save(productos);
    apiProductos.addProduct(req, res);
});
routerProductos.put('/:id', middlewares_1.authMiddleware, function (req, res) {
    apiProductos.modify(req, res);
});
routerProductos["delete"]('/:id', middlewares_1.authMiddleware, function (req, res) {
    apiProductos["delete"](req, res);
});
routerCarrito.get('/:id', middlewares_1.authMiddleware, function (req, res) {
    apiCarritos.get(req, res);
});
routerCarrito.get('/:id/productos', middlewares_1.authMiddleware, function (req, res) {
    apiCarritos.getProductsOfCarrito(req, res);
});
routerCarrito.post('/:id/productos', middlewares_1.authMiddleware, function (req, res) {
    apiCarritos.postProductsInCarrito(req, res);
});
routerCarrito.post('', middlewares_1.authMiddleware, function (req, res) {
    contenedorProductos.save(carritos);
    apiCarritos.addCarrito(req, res, productos);
});
routerCarrito.put('/:id', middlewares_1.authMiddleware, function (req, res) {
    apiCarritos.modify(req, res);
});
routerCarrito["delete"]('/:id', middlewares_1.authMiddleware, function (req, res) {
    apiCarritos["delete"](req, res);
});
routerCarrito["delete"]('/:id/productos/:id_prod', middlewares_1.authMiddleware, function (req, res) {
    apiCarritos.deleteProductInCarrito(req, res);
});
io.on('connection', function (socket) {
    console.log("Nuevo cliente conectado");
    socket.emit('carritos', carritos);
    socket.emit('productos', productos);
    socket.on('nuevo-producto', function (producto) {
        io.sockets.emit('productos', productos);
        if (productos.length == 0) {
            productos.push(producto);
            console.log("Guardando archivo de productos en el if");
            contenedorProductos.save(productos);
        }
        else {
            productos.push(producto);
            console.log("Guardando archivo de productos en el else");
            contenedorProductos.save(producto);
        }
    });
    socket.on('nuevo-carrito', function (carrito) {
        console.log("Socket de carrito on");
        io.sockets.emit('carritos', carritos);
        if (carritos.length == 0) {
            carritos.push(carrito);
            console.log("Guardando archivo de carrito en el if");
            contenedorCarritos.save(carritos);
        }
        else {
            carritos.push(carrito);
            console.log("Guardando archivo de carrito en el else");
            contenedorCarritos.save(carrito);
        }
    });
});
var PORT = process.env.port || 8080;
httpServer.listen(PORT, function () { return console.log("SERVER ON"); }).on('error', function (error) { return console.log("Error en el servidor ".concat(error)); });
