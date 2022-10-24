const express = require('express');
const {Router} = express;
const ApiClass = require ('./public/js/ApiClass.js');
const routerProductos = Router();
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: true}));

let apiProductos = new ApiClass(productos);

routerProductos.get('/:id', (req,res)=>{
    apiProductos.get(req,res);
})

routerProductos.post('', (req,res)=>{
    contenedorProductos.save(productos);
    apiProductos.add(req,res);
})

routerProductos.put('/:id',(req,res)=>{
    apiProductos.modify(req,res);
})

routerProductos.delete('/:id',(req,res)=>{
    apiProductos.delete(req,res);
})
