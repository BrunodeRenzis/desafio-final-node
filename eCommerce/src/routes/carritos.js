const express = require('express');
const {Router} = express;
const {Contenedor} = require('../public/js/Contenedor')

routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({extended: true}));

const contenedorCarritos = new Contenedor('../carritos.txt');
let apiCarritos = new ApiClass(carritos);

routerProductos.get('/', (req,res)=>{
    res.send({productos: productos});
})

routerCarrito.get('', (req,res)=>{
    res.send({carrito: carritos});
})

routerCarrito.get('/:id', (req,res)=>{
    apiCarritos.get(req,res);
})

routerCarrito.get('/:id/productos',(req,res)=>{
    apiCarritos.getProductsOfCarrito(req,res);
})

routerCarrito.post('/:id/productos',(req,res)=>{
    apiCarritos.postProductsInCarrito(req,res);
})

routerCarrito.post('', (req,res)=>{
    contenedorCarritos.save(carritos);
    apiCarritos.addCarrito(req,res,productos);
})

routerCarrito.put('/:id',(req,res)=>{
    apiCarritos.modify(req,res);
})

routerCarrito.delete('/:id',(req,res)=>{
    apiCarritos.delete(req,res);
})

routerCarrito.delete('/:id/productos/:id_prod',(req,res)=>{
    apiCarritos.deleteProductInCarrito(req,res);
})