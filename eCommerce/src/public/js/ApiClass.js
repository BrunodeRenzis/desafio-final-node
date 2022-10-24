class Api{
    constructor(array){
        this.array = array
    }
    findById = (id)=>{
        return this.array.find(elem => elem.id==id);
    }
    
    addProduct = (req,res)=>{
        const elem = req.body;
        elem.id = (this.array.length+1);
        elem.timestamp = Date.now();
        this.array.push(elem);
        res.redirect('/');
    }

    addCarrito = (req,res,arrayProductos)=>{
        const elem = req.body;
        elem.id = (this.array.length+1);
        elem.timestamp = Date.now();
        elem.productos = arrayProductos;
        this.array.push(elem);
        res.json(elem);
    }

    getProductsOfCarrito = (req,res)=>{
        const {id} = req.params;
        console.log("Log del id parametrizado: ",id);
       
        for(let i=0;i<this.array.length;i++){
            if(id == this.array[i].id){
                res.send(this.array[i].productos);
            } else{
                res.json({error:"No se obtuvieron productos"})
            }
        }
    }

    postProductsInCarrito = (req,res)=>{
        const {id} = req.params;
        const {producto} = req.body;
       
        for(let i=0;i<this.array.length;i++){
            if(id == this.array[i].id){
                producto.id = this.array[i].productos.length+1;
                producto.timestamp = Date.now();
                this.array[i].productos.push(producto);
                res.json(this.array[i].productos);
            } else{
                res.json({error:"Producto no encontrado"})
            }
        }
    }
    
    get = (req,res)=>{
        const {id} = req.params;
        this.findById(id) != null ? res.send({element: this.findById(id)}) : res.send({error:"Elemento no encontrado"});
    }
    
    modify = (req,res)=>{
        const {id} = req.params;
        const {element} = req.body;
        producto.id = id;
        this.array.splice(parseInt(id-1),1,element);
        res.send({elementoModificado: elemento});
    }
    
    delete = (req,res)=>{
        const {id} = req.params;
        console.log(this.array);
        const elemento = this.array.splice(parseInt(id-1),1);
        res.send({borrado:elemento});
    }

    deleteProductInCarrito = (req,res)=>{
        const {id} = req.params;
        const {id_prod} = req.params;
        console.log(id);
        console.log(id_prod);
        for(let i=0;i<this.array.length;i++){
            if(this.array[i].id==id){
                for(let j=0;j<this.array[i].productos.length;j++){
                    if(this.array[i].productos[j].id==id_prod){
                        const elemento = this.array[i].productos.splice((this.array[i].productos[j].id)-1,1);
                        res.send({elementoBorrado:elemento});
                    } else{
                        res.send({error:"Producto no encontrado en el carrito"})
                    }
                }
            }
        }
    }
}

module.exports = Api;