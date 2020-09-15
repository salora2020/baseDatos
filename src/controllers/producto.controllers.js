import Producto from '../models/producto';

const cafeteriaCtrl = {};

cafeteriaCtrl.getPrueba = (req, res) => {
    res.send("desde el controlador se realiza prueba")
}

cafeteriaCtrl.crearProducto = async (req, res) => {
    console.log(req.body)
    try{

        const {nombreProducto, precioProducto, categoria} = req.body;
    //creo un objeto para guadar en la bd
    const productoNuevo = new Producto({
        nombreProducto: nombreProducto,
        precioProducto: precioProducto,
        categoria: categoria,
    })
    //guardar el producto en la base de datos
    await productoNuevo.save();
    //enviar una respues al frontend
    res.status(201).json({
        mensaje: "Producto agregado a la BaseDatos"
    })
    }catch(error){
   console.log(error);
   res.status(500).json({
       mensaje:"ocurrio un error"
   })
    }
}
cafeteriaCtrl.listarProductos = async (req, res) =>{
    try{
      const arregloProductos = await Producto.find();//busca todos los ducmentos
      res.status(200).json(arregloProductos)
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurro un error"
        })
    }
}

cafeteriaCtrl.eliminarProducto = async(req, res) =>{
    try{
    console.log(req.params.id);
    //para eliminar necesito el id de lo que quiero eliminar
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({
        mensaje:"producto fue eliminado"
    })
    }catch(error){
        console.log(error)
        res.status(500).json({
            mesaje:"ocurrio un error"
        })
    }
}
cafeteriaCtrl.actualizarProducto = async(req, res) => {
    try{
        await Producto.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            mensaje: "el producto fue modificado"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            mesaje:"ocurrio un error"
        })
    }
}

export default cafeteriaCtrl;