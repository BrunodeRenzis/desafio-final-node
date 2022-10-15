class Api{
    constructor(array){
        this.array = array
    }
    findById = (id)=>{
        return this.array.find(elem => elem.id==id);
    }
    
    add = (req,res)=>{
        const elem = req.body;
        elem.id = (this.array.length+1);
        elem.timestamp = Date.now();
        console.log("El tipo del array es: ",typeof(this.array));
        //Fijate si hay una manera de fijarte de que tipo es el array que estás usando
        this.array.push(elem);
        res.json(elem);
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
}

module.exports = Api;